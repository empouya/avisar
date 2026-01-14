import { z } from 'zod';

export const SubscribeSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
});