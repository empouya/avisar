import { SubscriberRepository } from '@/repositories/subscriber.repository';

export const SubscriberService = {
  async subscribe(email: string) {
    const existing = await SubscriberRepository.findByEmail(email);
    if (existing) {
      throw new Error('EMAIL_ALREADY_SUBSCRIBED');
    }

    return SubscriberRepository.create({ email });
  },

  async unsubscribe(id: string) {
    return SubscriberRepository.delete(id);
  }
};