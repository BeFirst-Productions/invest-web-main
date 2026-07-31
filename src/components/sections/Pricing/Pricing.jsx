"use client";

import React, { useEffect, useRef, useState } from "react";
import SectionBadge from "@/components/ui/SectionBadge";
import PricingCard from "@/components/ui/PricingCard";
import { gsap } from "@/lib/gsap";
import SplitText from "@/components/ui/SplitText";

const fallbackPlans = [
  {
    id: "fallback-1",
    title: "Ajman Nuventures Centre Free Zone",
    description: "One of the most affordable free zones in the UAE",
    price: "AED 4,888",
    features: [
      "Unlimited shareholders",
      "Upto 10 business activities",
      "Mix and match any activities",
      "Trade License, Lease agreement, MOA",
      "Fully digital process"
    ],
    featured: false,
    ctaText: "Let's Do This",
    ctaHref: "#contact"
  },
  {
    id: "fallback-2",
    title: "Meydan Free Zone",
    description: "Dubai's most flexible and affordable free zone license.",
    price: "AED 12,250",
    features: [
      "Add upto 5 business activitie",
      "Add upto 5 shareholders",
      "Trade license, lease agreement, MOA",
      "Fully digital process"
    ],
    featured: true,
    ctaText: "Let's Do This",
    ctaHref: "#contact"
  },
  {
    id: "fallback-3",
    title: "Ras Al Khaimah Economic Zone",
    description: "One of the best free zones in the UAE with world class facilities",
    price: "AED 6,000",
    features: [
      "Upto 5 business activities in one license",
      "Mix and match business activities",
      "Upto 5 shareholders",
      "Installment payment options available",
      "Free access to flexi desk",
      "Fully digital process"
    ],
    featured: false,
    ctaText: "Let's Do This",
    ctaHref: "#contact"
  }
];

export default function Pricing() {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL;
        if (baseUrl) {
          const res = await fetch(`${baseUrl}public/v1/packages/common-packages`);
          const data = await res.json();
          if (data.success && data.data && data.data.length > 0) {
            // Transform backend data to match the PricingCard props
            const formattedPlans = data.data.map((pkg, index) => ({
              id: pkg._id,
              title: pkg.title,
              description: pkg.description,
              price: `AED ${Number(pkg.amount).toLocaleString()}`,
              features: pkg.points,
              featured: index === 1, // Make the middle card featured (maroon background)
              ctaText: pkg.ctaText || "Let's Do This",
              ctaHref: pkg.ctaHref || "#contact"
            }));
            setPlans(formattedPlans);
            return;
          }
        }
        setPlans(fallbackPlans);
      } catch (err) {
        console.error("Failed to fetch packages:", err);
        setPlans(fallbackPlans);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  useEffect(() => {
    if (loading || plans.length === 0) return;

    const ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        // Desktop Spread Animation
        const cards = cardsRef.current;
        if (cards.length >= 3) {
          gsap.fromTo(
            cards[0],
            { x: "100px", y: "20px", rotate: -5, opacity: 0 },
            {
              x: 0,
              y: 0,
              rotate: 0,
              opacity: 1,
              duration: 1.5,
              ease: "power4.out",
              scrollTrigger: {
                trigger: cards[0],
                start: "top 95%",
              },
            },
          );
          gsap.fromTo(
            cards[2],
            { x: "-100px", y: "20px", rotate: 5, opacity: 0 },
            {
              x: 0,
              y: 0,
              rotate: 0,
              opacity: 1,
              duration: 1.5,
              ease: "power4.out",
              scrollTrigger: {
                trigger: cards[2],
                start: "top 95%",
              },
            },
          );
          gsap.fromTo(
            cards[1],
            { y: "40px", opacity: 0, scale: 0.95 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 1.2,
              ease: "power4.out",
              scrollTrigger: {
                trigger: cards[1],
                start: "top 95%",
              },
            },
          );
        } else if (cards.length > 0) {
          // If fewer than 3 cards, do a simple fade-in so they still animate
          gsap.from(cards, {
            y: 40,
            opacity: 0,
            duration: 1,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cards[0],
              start: "top 95%",
            },
          });
        }
      });

      mm.add("(max-width: 1023px)", () => {
        // Mobile simple entry
        cardsRef.current.forEach((card) => {
          if (card) {
            gsap.fromTo(
              card,
              { y: 40, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: card,
                  start: "top 95%",
                },
              },
            );
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [loading, plans]);

  return (
    <section
      ref={containerRef}
      className="py-[60px] lg:py-[100px] px-[20px] md:px-[40px] lg:px-[80px] bg-white overflow-hidden"
    >
      {/* Section Header — centred */}
      <div className="flex flex-col items-center text-center mb-[48px] md:mb-[64px]">
        <SectionBadge label="Pricing Plan" className="mb-[20px]" />
        <SplitText
          tag="h2"
          className="font-sans text-[28px] md:text-[36px] lg:text-[40px] font-semibold leading-[1.25] text-[#111111] tracking-tight max-w-[620px]"
          text="Choose the right UAE license package for business setup "
          delay={30}
          duration={0.8}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-100px"
          textAlign="center"
        />
      </div>

      {/* Cards grid — 1 col on mobile, 3 cols on lg+ */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px] lg:gap-[24px] items-stretch max-w-[1200px] mx-auto">
        {loading ? (
          <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center text-gray-500 py-10">
            Loading packages...
          </div>
        ) : plans.length > 0 ? (
          plans.map((plan, index) => (
            <div
              key={plan.id}
              ref={(el) => (cardsRef.current[index] = el)}
            >
              <PricingCard
                title={plan.title}
                description={plan.description}
                price={plan.price}
                features={plan.features}
                featured={plan.featured}
                ctaText={plan.ctaText}
                ctaHref={plan.ctaHref}
              />
            </div>
          ))
        ) : (
          <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center text-gray-500 py-10">
            No packages available at the moment.
          </div>
        )}
      </div>
    </section>
  );
}
