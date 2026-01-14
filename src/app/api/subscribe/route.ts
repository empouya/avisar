import { NextResponse } from 'next/server';
import { SubscribeSchema } from '@/validators/subscribe.schema';
import { SubscriberService } from '@/domain/subscriber/subscriber.services';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const parsed = SubscribeSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json(
                { message: 'Invalid request payload', errors: parsed.error.flatten() },
                { status: 400 }
            );
        }

        await SubscriberService.subscribe(parsed.data.email);

        return NextResponse.json(
            { message: 'Successfully subscribed' },
            { status: 201 }
        );
    } catch (error: any) {
        if (error?.message === 'EMAIL_ALREADY_SUBSCRIBED') {
            return NextResponse.json(
                { message: 'Email already subscribed' },
                { status: 200 }
            );
        }

        console.error('POST /api/subscribe failed:', error);

        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}
