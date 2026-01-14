import { SettingsRepository } from '@/repositories/settings.repository';

export const SettingsService = {
  async getActiveValueByName(name: string) {
    const setting = await SettingsRepository.findByName(name);
    return setting?.active_value ?? null;
  },
};