import { SubscriberRepository } from '@/repositories/subscriber.repository';

export const SubscriberService = {
  async subscribeUser(email: string) {
    const existing = await SubscriberRepository.findByEmail(email);
    if (existing) {
      throw new Error('EMAIL_ALREADY_SUBSCRIBED');
    }

    return SubscriberRepository.create({ email });
  },

  async unsubscribeUser(id: string) {
    return SubscriberRepository.delete(id);
  }
};