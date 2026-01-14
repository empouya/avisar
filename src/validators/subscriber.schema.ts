import { z } from 'zod';

export const SubscriberSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
});