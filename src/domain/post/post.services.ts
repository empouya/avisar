import { PostRepository } from '@/repositories/post.repository';

export const PostService = {
  getPublicPosts() {
    return PostRepository.findPublished();
  },

  async getPostAndIncrementView(id: string) {
    const post = await PostRepository.findById(id);
    if (!post || !post.is_published) return null;

    await PostRepository.update(id, {
      view_count: post.view_count + 1,
    });

    return post;
  },
};
