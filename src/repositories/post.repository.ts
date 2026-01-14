import { prisma } from '@/lib/prisma';
import { Post } from '@/generated/prisma/client';

export const PostRepository = {
    findPublished() {
        return prisma.post.findMany({
            where: { is_published: true },
            orderBy: { created_at: 'desc' },
        });
    },

    findById(id: string) {
        return prisma.post.findUnique({ where: { id } });
    },

    create(data: Omit<Post, 'id' | 'created_at' | 'updated_at' | 'view_count'>) {
        return prisma.post.create({ data });
    },

    update(id: string, data: Partial<Post>) {
        return prisma.post.update({ where: { id }, data });
    },

    delete(id: string) {
        return prisma.post.delete({ where: { id } });
    },
};
