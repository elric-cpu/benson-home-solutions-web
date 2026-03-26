import React from 'react';
import { marked } from 'marked';
import { notFound } from 'next/navigation';
import { BLOG_POSTS } from '@/lib/blog-data';

type PostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const PostPage = async ({ params }: PostPageProps) => {
  const { slug } = await params;

  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return notFound();
  }

  const htmlContent = marked(post.content);

  return (
    <article>
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <div className="text-gray-600 text-sm mb-4">
        <span>By {post.author}</span> | <span>{post.date}</span>
      </div>
      <div
        className="prose lg:prose-xl"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </article>
  );
};

export default PostPage;
