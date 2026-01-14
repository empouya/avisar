import { z } from 'zod';

export const PostSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  content: z.string().min(1, "Content cannot be empty"),
  tags: z.array(z.string()).optional().default([]),
  image_urls: z.array(z.string().url()).optional().default([]),
  event_date: z.string().datetime().nullable().optional(),
  is_published: z.boolean().optional().default(false),
});

export const UpdatePostSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  content: z.string().min(1, "Content cannot be empty"),
  tags: z.array(z.string()).optional(),
  image_urls: z.array(z.string().url()).optional(),
  event_date: z.string().datetime().nullable().optional(),
  is_published: z.boolean().optional(),
});