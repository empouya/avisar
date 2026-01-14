/* Full version of settings.repository.ts
   Consistent with the designs defined in the Post repository.
*/
import { prisma } from '@/lib/prisma';
import { System_Setting } from '@/generated/prisma/client';

export const SettingsRepository = {
    findAll() {
        return prisma.system_Setting.findMany();
    },

    findById(id: string) {
        return prisma.system_Setting.findUnique({ where: { id } });
    },

    // Useful for fetching the active configuration directly
    findActive() {
        return prisma.system_Setting.findFirst({
            orderBy: { updated_at: 'desc' }
        });
    },

    create(data: Omit<System_Setting, 'id' | 'updated_at'>) {
        return prisma.system_Setting.create({ data });
    },

    update(id: string, data: Partial<System_Setting>) {
        return prisma.system_Setting.update({ where: { id }, data });
    },

    delete(id: string) {
        return prisma.system_Setting.delete({ where: { id } });
    },
};