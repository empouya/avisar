import { SettingsRepository } from '@/repositories/settings.repository';

export const SettingsService = {
  async getThemeConfig() {
    const settings = await SettingsRepository.findActive();
    
    if (!settings) {
      return { active_value: 'light', values: ['light', 'dark'] };
    }
    
    return settings;
  },

  async updateSystemTheme(id: string, newTheme: string) {
    const settings = await SettingsRepository.findById(id);
    
    if (settings && !settings.values.includes(newTheme)) {
      throw new Error('INVALID_THEME_VALUE');
    }

    return SettingsRepository.update(id, { active_value: newTheme });
  }
};