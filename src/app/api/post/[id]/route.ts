import { NextResponse } from 'next/server';
import { PostService } from '@/domain/post/post.services';

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
        const post = await PostService.getPostAndIncrementView(params.id);

        if (!post) {
            return NextResponse.json(
                { message: 'Post not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(post, { status: 200 });
    } catch (error) {
        console.error(`GET /api/posts/${params.id} failed:`, error);

        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}
