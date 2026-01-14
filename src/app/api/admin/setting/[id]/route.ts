import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { SettingsRepository } from '@/repositories/settings.repository';
import { UpdateSettingSchema } from '@/validators/setting.schema';

interface RouteParams {
    params: {
        id: string;
    };
}

export async function GET(
    _request: Request,
    { params }: RouteParams
) {
    try {
        await requireAdmin();

        const setting = await SettingsRepository.findById(params.id);

        if (!setting) {
            return NextResponse.json(
                { message: 'Setting not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(setting, { status: 200 });
    } catch (error: any) {
        if (error?.message === 'UNAUTHORIZED') {
            return NextResponse.json(
                { message: 'Unauthorized' },
                { status: 401 }
            );
        }

        console.error(
            `GET /api/admin/settings/${params.id} failed:`,
            error
        );

        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function PATCH(
    request: Request,
    { params }: RouteParams
) {
    try {
        await requireAdmin();

        const body = await request.json();
        const parsed = UpdateSettingSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json(
                { message: 'Invalid payload', errors: parsed.error.flatten() },
                { status: 400 }
            );
        }

        const existing = await SettingsRepository.findById(params.id);

        if (!existing) {
            return NextResponse.json(
                { message: 'Setting not found' },
                { status: 404 }
            );
        }

        const values = parsed.data.values ?? existing.values;
        const active =
            parsed.data.active_value ?? existing.active_value;

        if (!values.includes(active)) {
            return NextResponse.json(
                { message: 'active_value must be one of the allowed values' },
                { status: 400 }
            );
        }

        const updated = await SettingsRepository.update(params.id, {
            values,
            active_value: active,
        });

        return NextResponse.json(updated, { status: 200 });
    } catch (error: any) {
        if (error?.message === 'UNAUTHORIZED') {
            return NextResponse.json(
                { message: 'Unauthorized' },
                { status: 401 }
            );
        }

        console.error(
            `PATCH /api/admin/settings/${params.id} failed:`,
            error
        );

        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function DELETE(
    _request: Request,
    { params }: RouteParams
) {
    try {
        await requireAdmin();

        await SettingsRepository.delete(params.id);

        return NextResponse.json(null, { status: 204 });
    } catch (error: any) {
        if (error?.code === 'P2025') {
            return NextResponse.json(
                { message: 'Setting not found' },
                { status: 404 }
            );
        }

        if (error?.message === 'UNAUTHORIZED') {
            return NextResponse.json(
                { message: 'Unauthorized' },
                { status: 401 }
            );
        }

        console.error(
            `DELETE /api/admin/settings/${params.id} failed:`,
            error
        );

        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}