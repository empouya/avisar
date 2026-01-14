import { NextResponse } from 'next/server';
import { SettingsService } from '@/domain/setting/setting.services';

interface RouteParams {
    params: {
        name: string;
    };
}

export async function GET(
    _request: Request,
    { params }: RouteParams
) {
    try {
        const active = await SettingsService.getActiveValueByName(params.name);

        if (!active) {
            return NextResponse.json(
                { message: 'Setting not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { active },
            { status: 200 }
        );
    } catch (error) {
        console.error(`GET /api/settings/${params.name} failed:`, error);

        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}
