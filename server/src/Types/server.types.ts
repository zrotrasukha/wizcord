import { server } from '@/Database/schemas/schema';
import { z } from 'zod/v4';

export const createServerSchema = z.object({
    name: z.string().min(2, 'Server name is required').max(225, 'Server name must be less than 225 characters'),
    description: z.string().min(1, 'Description is required').max(500, 'Description must be less than 500 characters'),
    icon: z.url().optional()
});

export const updateServerSchema = z.object({
    name: z.string().min(2, 'Server name is required').max(225, 'Server name must be less than 225 characters').optional(),
    description: z.string().min(1, 'Description is required').max(500, 'Description must be less than 500 characters').optional(),
    icon: z.url().optional()
})

export type createServerType = z.infer<typeof createServerSchema>;
export type ServerType = typeof server.$inferSelect;