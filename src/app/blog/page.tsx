import React from 'react';
import Link from 'next/link';
import { BLOG_POSTS } from '@/lib/blog-data';

const BlogPage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold">Blog</h1>
      <div className="mt-4">
        {BLOG_POSTS.map((post) => (
          <div key={post.slug} className="mb-4">
            <Link
              href={`/blog/${post.slug}`}
              className="text-xl font-bold text-blue-600 hover:underline"
            >
              {post.title}
            </Link>
            <p className="text-sm text-gray-600">
              By {post.author} | {post.date}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
