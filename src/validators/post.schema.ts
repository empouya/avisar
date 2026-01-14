import { z } from 'zod';

export const PostSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  content: z.string().min(1, "Content cannot be empty"),
  tags: z.array(z.string()).default([]),
  image_urls: z.array(z.string().url()).default([]),
  admin_id: z.string().uuid("Invalid Admin ID format"),
  is_published: z.boolean().default(false),
  event_date: z.date().nullable().optional(),
});


export const UpdatePostSchema = PostSchema.partial();