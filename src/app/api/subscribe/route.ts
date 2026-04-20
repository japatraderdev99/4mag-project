import { NextRequest, NextResponse } from 'next/server'
import { subscribeSchema } from '@/lib/schemas/subscribe'
import { forwardToESP } from '@/lib/email/forwardToESP'

// In-memory rate limiting store
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

// Rate limiting configuration
const RATE_LIMIT_MAX = 5
const RATE_LIMIT_WINDOW = 10 * 60 * 1000 // 10 minutes in ms

function getClientIP(request: NextRequest): string {
  const forwardedFor = request.headers.get('x-forwarded-for')
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim()
  }
  
  const realIP = request.headers.get('x-real-ip')
  if (realIP) {
    return realIP
  }
  
  return 'unknown'
}

function checkRateLimit(ip: string): { allowed: boolean; resetTime?: number } {
  const now = Date.now()
  const record = rateLimitStore.get(ip)
  
  if (!record || now > record.resetTime) {
    // Create new record or reset expired record
    rateLimitStore.set(ip, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW
    })
    return { allowed: true }
  }
  
  if (record.count >= RATE_LIMIT_MAX) {
    return { allowed: false, resetTime: record.resetTime }
  }
  
  // Increment count
  record.count += 1
  rateLimitStore.set(ip, record)
  
  return { allowed: true }
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientIP = getClientIP(request)
    const rateCheck = checkRateLimit(clientIP)
    
    if (!rateCheck.allowed) {
      const retryAfter = rateCheck.resetTime ? Math.ceil((rateCheck.resetTime - Date.now()) / 1000) : 600
      
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { 
          status: 429,
          headers: {
            'Retry-After': retryAfter.toString()
          }
        }
      )
    }

    // Parse request body
    const body = await request.json()
    
    // Validate with Zod schema
    const result = subscribeSchema.safeParse(body)
    
    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: result.error.flatten() },
        { status: 400 }
      )
    }

    const { name, email, honeypot } = result.data

    // Honeypot check - if filled, silently return success
    if (honeypot && honeypot.length > 0) {
      console.log('🍯 Honeypot triggered:', { ip: clientIP, honeypot })
      return NextResponse.json({ success: true })
    }

    // Forward to ESP
    await forwardToESP({ name, email })
    
    console.log('✅ Subscription successful:', { ip: clientIP, email })
    
    return NextResponse.json({ success: true })
    
  } catch (error) {
    console.error('❌ Subscription error:', error)
    
    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again.' },
      { status: 500 }
    )
  }
}

// Only allow POST requests
export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}

export async function PUT() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}

export async function DELETE() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}