import { SettingsRepository } from '@/repositories/settings.repository';

export const SettingsService = {
  async getAll() {
    return SettingsRepository.findAll();
  },

  async getActiveValueByName(name: string) {
    const setting = await SettingsRepository.findByName(name);
    return setting?.active_value ?? null;
  },

  async create(data: {
    name: string;
    values: string[];
    active_value: string;
    admin_id: string;
  }) {
    return SettingsRepository.create(data);
  },
};