import { z } from 'zod';

export const SystemSettingSchema = z.object({
    name: z.string().min(1, "Name is required").max(255),
    values: z.array(z.string()).min(1, "At least one theme option is required"),
    active_value: z.string().min(1, "Active value is required"),
});

export const UpdateThemeSchema = z.object({
    active_value: z.string(),
});