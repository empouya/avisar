import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { PostSchema } from '@/validators/post.schema';
import { PostRepository } from '@/repositories/post.repository';

export async function GET() {
    try {
        await requireAdmin();

        const posts = await PostRepository.findAll();

        return NextResponse.json(posts, { status: 200 });
    } catch (error: any) {
        if (error?.message === 'UNAUTHORIZED') {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        console.error('GET /api/admin/posts failed:', error);

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
        const parsed = PostSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json(
                { message: 'Invalid payload', errors: parsed.error.flatten() },
                { status: 400 }
            );
        }

        const data = parsed.data;

        const post = await PostRepository.create({
            title: data.title,
            content: data.content,
            tags: data.tags,
            image_urls: data.image_urls,
            event_date: data.event_date ? new Date(data.event_date) : null,
            is_published: data.is_published,
            admin_id: admin.id,
        });

        return NextResponse.json(post, { status: 201 });
    } catch (error: any) {
        if (error?.message === 'UNAUTHORIZED') {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        console.error('POST /api/admin/posts failed:', error);

        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}
