/* Full version of subscriber.repository.ts
   Consistent with the designs defined in the Post repository.
*/
import { prisma } from '@/lib/prisma';
import { Subscriber } from '@/generated/prisma/client';

export const SubscriberRepository = {
    findAll() {
        return prisma.subscriber.findMany({
            orderBy: { subscribed_at: 'desc' },
        });
    },

    findByEmail(email: string) {
        return prisma.subscriber.findUnique({ where: { email } });
    },

    create(data: Omit<Subscriber, 'id' | 'subscribed_at'>) {
        return prisma.subscriber.create({ data });
    },

    delete(id: string) {
        return prisma.subscriber.delete({ where: { id } });
    },
};