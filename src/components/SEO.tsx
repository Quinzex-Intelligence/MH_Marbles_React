import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  type?: 'website' | 'article' | 'product';
  canonical?: string;
}

const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  image = '/logo.png', 
  type = 'website',
  canonical 
}) => {
  const siteName = 'MH MARBLES';
  const fullTitle = title ? `${title} | ${siteName}` : `${siteName} | Visionary Architectural Gallery`;
  const defaultDescription = 'Curators of the earth\'most exquisite architectural statements for the discerning visionary since 1980.';
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description || defaultDescription} />
      <meta name="twitter:image" content={image} />

      {/* Structured Data (JSON-LD) - Standard Organization Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": siteName,
          "url": "https://mhmarbles.com",
          "logo": "https://mhmarbles.com/logo.png",
          "description": defaultDescription,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "PLOT NO : 5/A, DOMMARA POCHAMPALLY",
            "addressLocality": "HYDERABAD",
            "addressRegion": "TELANGANA",
            "postalCode": "500043",
            "addressCountry": "IN"
          }
        })}
      </script>
    </Helmet>
  );
};

export default SEO;
