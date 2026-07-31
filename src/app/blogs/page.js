import React from 'react';
import CommonHeroSection from '@/components/Common/Banner/CommonHerosection';
import Image from 'next/image';
import Link from 'next/link';
import Schedule from '@/components/sections/Schedule';
import { getSeoMetadata } from '@/services/seoService';

export async function generateMetadata() {
    const seo = await getSeoMetadata('/blogs');
    return seo;
}

import { blogPosts as mockBlogPosts } from '@/data/blogData';

// Fetch blogs from backend
async function getBlogsData() {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL;
        if (baseUrl) {
            const res = await fetch(`${baseUrl}public/v1/blog/get-blogs`, {
                next: { revalidate: 60 }
            });
            const data = await res.json();
            console.log(data,"data");
            
            if (data.success && data.data && data.data.length > 0) {
                return data.data;
            }
        }
    } catch (error) {
        console.error("Failed to fetch blogs:", error);
    }
    // Fallback to mock data
    return mockBlogPosts.map(post => ({
        ...post,
        url: post.slug,
        _id: post.id,
        excerpt: post.description,
        metaDescription: post.description,
        createdAt: post.date
    }));
}

export default async function BlogsPage() {
    const blogPosts = await getBlogsData();

    return (
        <main>
            <CommonHeroSection
                highlightedTitle="Blogs &"
                plainTitle="Articles"
                description="UAE Business Growth Insights experts in Dubai business setup, mainland company formation, and UAE investor visa services."
                imageUrl="/images/blog/blog-banner.png"
                imageAlt="Blogs and Articles"
                breadcrumbs={[
                    { label: 'Home', href: '/' },
                    { label: 'Blogs & Articles', href: '/blogs' }
                ]}
            />

            <section className="px-[20px] md:px-[60px] lg:px-[100px] py-[48px] md:py-[80px] lg:py-[120px] bg-white">
                <div className="max-w-[1400px] mx-auto">
                    {blogPosts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[24px] gap-y-[48px] md:gap-y-[64px]">
                            {blogPosts.map((post) => (
                                <Link
                                    href={`/blogs/${post.url}`}
                                    key={post._id || post.url}
                                    className="group cursor-pointer flex flex-col"
                                >
                                    {/* Image */}
                                    <div className="relative w-full h-[200px] md:h-[260px] lg:h-[300px] rounded-[16px] md:rounded-[24px] overflow-hidden mb-[14px] md:mb-[20px]">
                                        <Image
                                            src={post.image || "/images/placeholder-blog.jpg"}
                                            alt={post.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        />
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-[15px] md:text-[20px] lg:text-[22px] font-bold text-[#111111] leading-[1.3] mb-[6px] md:mb-[10px] font-sans group-hover:text-[#660033] transition-colors line-clamp-2">
                                        {post.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-[12px] md:text-[14px] text-[#666666] leading-[1.6] font-sans line-clamp-2">
                                        {post.excerpt || post.metaDescription || "Read more about this topic..."}
                                    </p>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-[#666666] py-10">
                            <p className="text-lg">No blogs available at the moment.</p>
                        </div>
                    )}
                </div>
            </section>

            <Schedule />
        </main>
    );
}
