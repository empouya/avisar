import { NextResponse } from 'next/server';
import { SettingsService } from '@/domain/setting/setting.services';

const THEME_SETTING_NAME = 'theme';

export async function GET() {
    try {
        const theme = await SettingsService.getActiveValueByName(
            THEME_SETTING_NAME
        );

        if (!theme) {
            return NextResponse.json(
                { message: 'Theme not configured' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { theme },
            { status: 200 }
        );
    } catch (error) {
        console.error('GET /api/settings/theme failed:', error);

        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}
