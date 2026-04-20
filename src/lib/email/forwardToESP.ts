interface ESPForwardParams {
  name: string
  email: string
}

export async function forwardToESP({ name, email }: ESPForwardParams) {
  // Development stub - logs to console
  if (process.env.NODE_ENV === 'development') {
    console.log('📧 ESP Forward (Development Mode):')
    console.log(`   Name: ${name}`)
    console.log(`   Email: ${email}`)
    console.log(`   Timestamp: ${new Date().toISOString()}`)
    return { success: true }
  }

  // Production ESP integration
  const ESP_TYPE = process.env.NEWSLETTER_ESP || 'beehiiv'
  const API_KEY = process.env.NEWSLETTER_API_KEY
  const LIST_ID = process.env.NEWSLETTER_LIST_ID

  if (!API_KEY || !LIST_ID) {
    throw new Error('Missing ESP configuration')
  }

  try {
    switch (ESP_TYPE) {
      case 'beehiiv':
        const response = await fetch(`https://api.beehiiv.com/v2/publications/${LIST_ID}/subscriptions`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            name,
            reactivate_existing: false,
            send_welcome_email: true,
          }),
        })

        if (!response.ok) {
          const errorData = await response.json()
          console.error('Beehiiv API error:', errorData)
          throw new Error('Failed to subscribe to newsletter')
        }

        return { success: true }

      case 'buttondown':
        // Implement Buttondown integration
        throw new Error('Buttondown integration not yet implemented')

      case 'mailchimp':
        // Implement Mailchimp integration
        throw new Error('Mailchimp integration not yet implemented')

      default:
        throw new Error(`Unsupported ESP: ${ESP_TYPE}`)
    }
  } catch (error) {
    console.error('ESP Forward Error:', error)
    throw error
  }
}