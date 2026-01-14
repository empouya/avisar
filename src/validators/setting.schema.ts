import { z } from 'zod';

export const SystemSettingSchema = z.object({
    values: z.array(z.string()).min(1, "At least one theme option is required"),
    active_value: z.string().min(1, "Active value is required"),
    admin_id: z.string().uuid("Invalid Admin ID format"),
});

export const UpdateThemeSchema = z.object({
    active_value: z.string(),
});