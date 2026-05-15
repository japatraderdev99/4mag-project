import { z } from 'zod'

export const subscribeSchema = z.object({
  name: z.string().max(60).trim(),
  email: z.string().email('Please enter a valid email address').trim(),
  honeypot: z.string().max(0, 'Spam detected'),
})

export type SubscribeFormData = z.infer<typeof subscribeSchema>
