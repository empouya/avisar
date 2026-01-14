import { NextResponse } from 'next/server';
import { PostService } from '@/domain/post/post.services';

export async function GET() {
    try {
        const posts = await PostService.getPublicPosts();

        return NextResponse.json(posts, { status: 200 });
    } catch (error) {
        console.error('GET /api/posts failed:', error);

        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}
