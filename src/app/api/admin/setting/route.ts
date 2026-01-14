import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { SettingsService } from '@/domain/setting/setting.services';
import { SystemSettingSchema } from '@/validators/setting.schema';


export async function GET() {
    try {
        await requireAdmin();

        const settings = await SettingsService.getAll();

        return NextResponse.json(settings, { status: 200 });
    } catch (error: any) {
        if (error?.message === 'UNAUTHORIZED') {
            return NextResponse.json(
                { message: 'Unauthorized' },
                { status: 401 }
            );
        }

        console.error('GET /api/admin/settings failed:', error);

        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const admin = await requireAdmin();

        const body = await request.json();
        const parsed = SystemSettingSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json(
                { message: 'Invalid payload', errors: parsed.error.flatten() },
                { status: 400 }
            );
        }

        const { name, values, active_value } = parsed.data;

        if (!values.includes(active_value)) {
            return NextResponse.json(
                { message: 'active_value must be one of the allowed values' },
                { status: 400 }
            );
        }

        const setting = await SettingsService.create({
            name,
            values,
            active_value,
            admin_id: admin.id,
        });

        return NextResponse.json(setting, { status: 201 });
    } catch (error: any) {
        if (error?.code === 'P2002') {
            return NextResponse.json(
                { message: 'Setting with this name already exists' },
                { status: 409 }
            );
        }

        if (error?.message === 'UNAUTHORIZED') {
            return NextResponse.json(
                { message: 'Unauthorized' },
                { status: 401 }
            );
        }

        console.error('POST /api/admin/settings failed:', error);

        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}
