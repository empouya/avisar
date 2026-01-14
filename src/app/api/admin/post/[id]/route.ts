import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { UpdatePostSchema } from '@/validators/post.schema';
import { PostRepository } from '@/repositories/post.repository';

interface RouteParams {
    params: {
        id: string;
    };
}

export async function PATCH(
    request: Request,
    { params }: RouteParams
) {
    try {
        await requireAdmin();

        const body = await request.json();
        const parsed = UpdatePostSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json(
                { message: 'Invalid payload', errors: parsed.error.flatten() },
                { status: 400 }
            );
        }

        const updated = await PostRepository.update(params.id, {
            ...parsed.data,
            event_date:
                parsed.data.event_date !== undefined
                    ? parsed.data.event_date
                        ? new Date(parsed.data.event_date)
                        : null
                    : undefined,
        });

        return NextResponse.json(updated, { status: 200 });
    } catch (error: any) {
        if (error?.code === 'P2025') {
            return NextResponse.json(
                { message: 'Post not found' },
                { status: 404 }
            );
        }

        if (error?.message === 'UNAUTHORIZED') {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        console.error(`PATCH /api/admin/posts/${params.id} failed:`, error);

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

        await PostRepository.delete(params.id);

        return NextResponse.json(null, { status: 204 });
    } catch (error: any) {
        if (error?.code === 'P2025') {
            return NextResponse.json(
                { message: 'Post not found' },
                { status: 404 }
            );
        }

        if (error?.message === 'UNAUTHORIZED') {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        console.error(`DELETE /api/admin/posts/${params.id} failed:`, error);

        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}
