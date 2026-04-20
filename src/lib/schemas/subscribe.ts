import { z } from 'zod'

export const subscribeSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(60, 'Name must be less than 60 characters')
    .trim(),
  email: z
    .string()
    .email('Please enter a valid email address')
    .trim(),
  honeypot: z
    .string()
    .max(0, 'Spam detected')
    .default(''),
})

export type SubscribeFormData = z.infer<typeof subscribeSchema>