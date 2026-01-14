import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { SubscriberService } from '@/domain/subscriber/subscriber.services';


export async function GET() {
    try {
        await requireAdmin();

        const subscribers = await SubscriberService.getAll();

        return NextResponse.json(subscribers, { status: 200 });
    } catch (error: any) {
        if (error?.message === 'UNAUTHORIZED') {
            return NextResponse.json(
                { message: 'Unauthorized' },
                { status: 401 }
            );
        }

        console.error('GET /api/admin/subscribers failed:', error);

        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}
