import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { SubscriberService } from '@/domain/subscriber/subscriber.services';

interface RouteParams {
    params: {
        id: string;
    };
}


export async function DELETE(
    _request: Request,
    { params }: RouteParams
) {
    try {
        await requireAdmin();

        await SubscriberService.unsubscribe(params.id);

        return NextResponse.json(null, { status: 204 });
    } catch (error: any) {
        if (error?.code === 'P2025') {
            return NextResponse.json(
                { message: 'Subscriber not found' },
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
            `DELETE /api/admin/subscribers/${params.id} failed:`,
            error
        );

        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}
