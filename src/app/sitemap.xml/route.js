export const dynamic = 'force-static';
export const revalidate = 3600;

const STATIC_PATHS = [
  '/',
  '/about-us',
  '/why-uae',
  '/founders',
  '/contact-us',
  '/cost-calculator',
  '/terms-conditions',
  '/privacy-policy',
  '/services',
  '/services/government-approvals-in-uae',
  '/services/pro-services',
  '/investor-visa',
  '/mainland-company-formation-uae',
  '/mainland/mainland-company-formation-in-dubai',
  '/mainland/abu-dhabi',
  '/dubai-freezone-company-formation',
  '/freezone/dubai',
  '/freezone/abudhabi-freezone-company-formation',
  '/freezone/sharjah/sharjah-freezone-company-formation',
  '/freezone/ajman-freezone-company-setup',
  '/freezone/umm-al-quwain-freezone-company-setup',
  '/freezone/ras-al-khaimah-company-formation',
  '/offshore',
  '/offshore/jafza-offshore',
  '/offshore/rakicc-offshore',
  '/offshore/ajman-offshore',
  '/freezone/dubai/meydan-freezone-setup-in-dubai',
  '/freezone/dubai/ifza-freezone-company-setup-dubai',
  '/freezone/dubai/DMCC-company-setup-in-dubai',
  '/freezone/dubai/jafza-company-formation-dubai',
  '/freezone/dubai/DDA-freezone-company-setup-in-dubai',
  '/freezone/dubai/dafza-company-setup-in-dubai',
  '/freezone/dubai/DIFC-setup-in-dubai',
  '/freezone/dubai/dubai-south-setup-in-dubai',
  '/freezone/dubai/dubai-healthcare-city-company-setup',
  '/freezone/abu-dhabi/masdar-city-company-setup-in-abudhabi',
  '/freezone/abu-dhabi/abudhabi-airport-freezone-setup',
  '/freezone/sharjah/sharjah-media-city-shams-setup-in-sharjah',
  '/freezone/sharjah/SPCFZ-company-setup-in-sharjah',
  '/freezone/sharjah/SRTIP-freezone-setup-in-sharjah',
  '/freezone/sharjah/hamriyah-freezone-setup-in-dubai',
  '/services/pro-services/virtual-pro-uae',
  '/services/pro-services/local-sponsership-uae',
  '/services/pro-services/license-renewal-uae',
  '/services/pro-services/visa-renewal-uae',
  '/services/pro-services/banking-assistance-uae',
  '/services/pro-services/office-solutions-uae',
  '/services/visa-services/uae-investor-visa',
  '/services/visa-services/uae-employment-visa',
  '/services/visa-services/dependent-visa-uae',
  '/services/visa-services/uae-golden-visa',
  '/services/visa-services/uae-green-visa',
  '/services/visa-services/uae-blue-visa',
  '/services/visa-services/uae-remote-work-visa',
  '/services/visa-services/uae-tourist-visa-services',
  '/services/document-services/uae-attestation-services',
  '/services/document-services/legal-transalation-dubai',
  '/services/document-services/typing-services-uae',
  '/services/license-services/professional-license-in-uae',
  '/services/license-services/commercial-license-in-uae',
  '/services/license-services/industrial-license-in-uae',
  '/services/license-services/e-trader-license-in-uae',
  '/services/license-services/travel-license-in-uae',
  '/services/value-added-services/vat-corporate-tax',
  '/services/value-added-services/medical-insurance',
  '/services/value-added-services/trademark-registration',
  '/services/value-added-services/branding-design',
  '/services/value-added-services/digital-marketing',
  '/services/value-added-services/web-development',
  '/blogs'
];

export async function GET() {
  const domain = 'https://investfirst.ae';
  const currentDate = new Date().toISOString();

  // Create sitemap records for static pages
  const staticRecords = STATIC_PATHS.map((path) => `
    <url>
      <loc>${domain}${path === '/' ? '' : path}</loc>
      <lastmod>${currentDate}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>${path === '/' ? '1.0' : '0.7'}</priority>
    </url>
  `).join('');

  let blogRecords = '';
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    if (baseUrl) {
      const res = await fetch(`${baseUrl}public/v1/blog/get-blogs`, { next: { revalidate: 3600 } });
      const data = await res.json();
      if (data.success && data.data) {
        blogRecords = data.data.map((post) => `
      <url>
        <loc>${domain}/blogs/${post.url}</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
      </url>
    `).join('');
      }
    }

  } catch (error) {
    console.error("Failed to fetch blogs for sitemap:", error);
  }

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${staticRecords}
      ${blogRecords}
    </urlset>
  `.trim();

  return new Response(sitemapXml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=60'
    }
  });
}
