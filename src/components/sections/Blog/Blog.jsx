'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SectionBadge from '@/components/ui/SectionBadge';
import SectionContainer from '@/components/layout/SectionContainer';
import ViewMoreButton from '@/components/ui/ViewMoreButton';
import SplitText from '@/components/ui/SplitText';

const ArrowLeft = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ArrowRight = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);


export default function Blog({ blogPosts = [] }) {
  const scrollRef = useRef(null);
  const rafRef = useRef(0);
  const pausedRef = useRef(false);

  // If there are no blogs at all, we could return null or empty state, but let's just render the header and an empty message or skip.
  if (blogPosts.length === 0) {
      return null;
  }

  if (blogPosts.length <= 2) {
    return (
      <SectionContainer
        id="blog"
        className="py-[48px] md:py-[80px] lg:py-[120px] bg-white"
        containerClassName="px-[20px] md:px-[60px] lg:px-[100px]"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-[24px] mb-[32px] md:mb-[48px] lg:mb-[64px]">
          <div>
            <SectionBadge label="Blog & News" className="mb-[16px] md:mb-[20px]" />
            <SplitText
              tag="h2"
              className="font-sans text-[28px] md:text-[44px] lg:text-[52px] font-bold leading-[1.15] text-[#111111] tracking-[-0.03em] max-w-[800px]"
              text="Expert Insights & Business Tips"
              delay={30}
              duration={0.8}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="left"
            />
          </div>
          <ViewMoreButton
            label="View All"
            href="/blogs"
            wrapperClassName="!mt-0 !justify-end"
          />
        </div>

        {blogPosts.length === 1 ? (
          <Link 
            href={`/blogs/${blogPosts[0].url}`}
            className="group block bg-[#FAF9F6] rounded-[24px] overflow-hidden border border-[#F0EFEA] hover:border-[#A2064F]/30 shadow-sm hover:shadow-md transition-all duration-500"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              <div className="lg:col-span-7 relative w-full h-[260px] md:h-[400px] lg:h-[480px] overflow-hidden">
                <Image
                  src={blogPosts[0].image || "/images/placeholder-blog.jpg"}
                  alt={blogPosts[0].title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
              </div>

              <div className="lg:col-span-5 p-[28px] md:p-[40px] lg:p-[48px] flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-[12px] mb-[20px]">
                    {(blogPosts[0].tags || []).map((tag) => (
                      <span
                        key={tag}
                        className="px-[12px] py-[4.5px] bg-[#A2064F]/10 rounded-full text-[11px] font-bold text-[#A2064F] tracking-wider uppercase font-sans"
                      >
                        {tag}
                      </span>
                    ))}
                    {(blogPosts[0].tags && blogPosts[0].tags.length > 0) && (
                        <span className="w-[4px] h-[4px] rounded-full bg-[#CCCCCC]" />
                    )}
                    <span className="text-[12px] text-[#666666] font-medium font-sans">
                      {blogPosts[0].createdAt ? new Date(blogPosts[0].createdAt).toLocaleDateString() : 'Recent'}
                    </span>
                  </div>

                  <h3 className="text-[20px] md:text-[26px] lg:text-[32px] font-bold text-[#111111] leading-[1.25] tracking-tight mb-[16px] font-sans group-hover:text-[#A2064F] transition-colors duration-300">
                    {blogPosts[0].title}
                  </h3>

                  <p className="text-[13px] md:text-[15px] text-[#555555] leading-[1.65] mb-[32px] font-sans line-clamp-4">
                    {blogPosts[0].excerpt || blogPosts[0].metaDescription || "Read more about this topic..."}
                  </p>
                </div>

                <div className="flex items-center gap-[8px] text-[14px] font-bold text-[#A2064F] group-hover:translate-x-2 transition-transform duration-300">
                  Read Full Article
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px] lg:gap-[32px]">
            {blogPosts.map((post) => (
              <Link 
                key={post._id || post.url}
                href={`/blogs/${post.url}`}
                className="group flex flex-col bg-[#FAF9F6] rounded-[24px] overflow-hidden border border-[#F0EFEA] hover:border-[#A2064F]/30 shadow-sm hover:shadow-md transition-all duration-500"
              >
                <div className="relative w-full h-[220px] md:h-[280px] lg:h-[320px] overflow-hidden">
                  <Image
                    src={post.image || "/images/placeholder-blog.jpg"}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
                </div>

                <div className="p-[24px] md:p-[32px] flex flex-col justify-between flex-grow">
                  <div>
                    <div className="flex flex-wrap items-center gap-[12px] mb-[16px]">
                      {(post.tags || []).map((tag) => (
                        <span
                          key={tag}
                          className="px-[10px] py-[3.5px] bg-[#A2064F]/10 rounded-full text-[10px] font-bold text-[#A2064F] tracking-wider uppercase font-sans"
                        >
                          {tag}
                        </span>
                      ))}
                      {(post.tags && post.tags.length > 0) && (
                          <span className="w-[4px] h-[4px] rounded-full bg-[#CCCCCC]" />
                      )}
                      <span className="text-[11px] text-[#666666] font-medium font-sans">
                        {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : 'Recent'}
                      </span>
                    </div>

                    <h3 className="text-[18px] md:text-[22px] lg:text-[24px] font-bold text-[#111111] leading-[1.3] mb-[12px] font-sans group-hover:text-[#A2064F] transition-colors duration-300 line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-[13px] text-[#555555] leading-[1.6] mb-[24px] font-sans line-clamp-3">
                      {post.excerpt || post.metaDescription || "Read more about this topic..."}
                    </p>
                  </div>

                  <div className="flex items-center gap-[8px] text-[13px] font-bold text-[#A2064F] group-hover:translate-x-2 transition-transform duration-300">
                    Read Article
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </SectionContainer>
    );
  }

  const displayPosts = [...blogPosts, ...blogPosts, ...blogPosts];

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const oneSetWidth = el.scrollWidth / 3;
    el.scrollLeft = oneSetWidth;

    const tick = () => {
      if (!pausedRef.current) {
        el.scrollLeft += 0.6;
        if (el.scrollLeft >= oneSetWidth * 2) el.scrollLeft -= oneSetWidth;
        if (el.scrollLeft <= 0) el.scrollLeft += oneSetWidth;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const handleManualScroll = (direction) => {
    const el = scrollRef.current;
    if (!el) return;

    const cardWidth = 340 + 24; // Average card width + gap
    const nudge = cardWidth * (direction === 'left' ? -1 : 1);
    const start = el.scrollLeft;
    const startTime = performance.now();
    const duration = 480;

    pausedRef.current = true;

    const ease = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

    const animate = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      el.scrollLeft = start + nudge * ease(progress);

      const oneSetWidth = el.scrollWidth / 3;
      if (el.scrollLeft >= oneSetWidth * 2) el.scrollLeft -= oneSetWidth;
      if (el.scrollLeft <= 0) el.scrollLeft += oneSetWidth;

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        pausedRef.current = false;
      }
    };

    requestAnimationFrame(animate);
  };

  return (
    <SectionContainer
      id="blog"
      className="py-[48px] md:py-[80px] lg:py-[120px] bg-white"
      containerClassName="px-[20px] md:px-[60px] lg:px-[100px]"
    >
      {/* ── Header ── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-[24px] mb-[32px] md:mb-[48px] lg:mb-[64px]">
        <div>
          <SectionBadge label="Blog & News" className="mb-[16px] md:mb-[20px]" />
          <SplitText
            tag="h2"
            className="font-sans text-[28px] md:text-[44px] lg:text-[52px] font-bold leading-[1.15] text-[#111111] tracking-[-0.03em] max-w-[800px]"
            text="Expert Insights & Business Tips"
            delay={30}
            duration={0.8}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="left"
          />
        </div>

        <ViewMoreButton
          label="View All"
          href="/blogs"
          wrapperClassName="!mt-0 !justify-end"
        />
      </div>

      {/* ── Cards Slider ── */}
      <div className="relative w-full">
        <div
          ref={scrollRef}
          className="flex gap-[16px] md:gap-[20px] lg:gap-[24px] overflow-x-hidden no-scrollbar"
        >
          {displayPosts.map((post, index) => (
            <div
              key={`${post._id || post.url}-${index}`}
              className="flex-shrink-0 w-[220px] md:w-[300px] lg:w-[340px] group cursor-pointer"
              onMouseEnter={() => { pausedRef.current = true; }}
              onMouseLeave={() => { pausedRef.current = false; }}
            >
              {/* Image */}
              <div className="relative w-full h-[200px] md:h-[260px] lg:h-[300px] rounded-[16px] md:rounded-[24px] overflow-hidden mb-[14px] md:mb-[20px]">
                <Image
                  src={post.image || "/images/placeholder-blog.jpg"}
                  alt={`Blog post ${post._id || post.url}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 220px, (max-width: 1024px) 300px, 340px"
                />
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-[6px] md:gap-[8px] mb-[10px] md:mb-[14px]">
                {(post.tags || []).map((tag) => (
                  <span
                    key={tag}
                    className="px-[10px] py-[4px] bg-[#F5F5F5] rounded-[6px] text-[11px] md:text-[13px] font-semibold text-[#666666] font-sans"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Title */}
              <Link href={`/blogs/${post.url}`} className="block">
                <h3 className="text-[15px] md:text-[20px] lg:text-[22px] font-bold text-[#111111] leading-[1.3] mb-[6px] md:mb-[10px] font-sans group-hover:text-[#660033] transition-colors line-clamp-2">
                  {post.title}
                </h3>
              </Link>

              {/* Description */}
              <p className="text-[12px] md:text-[14px] text-[#666666] leading-[1.6] font-sans line-clamp-2">
                {post.excerpt || post.metaDescription || "Read more about this topic..."}
              </p>
            </div>
          ))}
        </div>

        {/* ── Navigation Buttons ── */}
        <div className="flex justify-center gap-[12px] md:gap-[16px] mt-[32px] md:mt-[48px] lg:mt-[56px]">
          <button
            onClick={() => handleManualScroll('left')}
            className="w-[44px] h-[44px] md:w-[56px] md:h-[56px] rounded-full bg-[#111111] flex items-center justify-center hover:bg-[#660033] transition-all duration-300 active:scale-95 shadow-lg group"
            aria-label="Previous posts"
          >
            <div className="group-hover:-translate-x-1 transition-transform">
              <ArrowLeft />
            </div>
          </button>
          <button
            onClick={() => handleManualScroll('right')}
            className="w-[44px] h-[44px] md:w-[56px] md:h-[56px] rounded-full bg-[#111111] flex items-center justify-center hover:bg-[#660033] transition-all duration-300 active:scale-95 shadow-lg group"
            aria-label="Next posts"
          >
            <div className="group-hover:translate-x-1 transition-transform">
              <ArrowRight />
            </div>
          </button>
        </div>
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </SectionContainer>
  );
}