// components/OpenGraph.js
import { useEffect } from 'react';

const OpenGraph = ({
  title,
  description,
  image,
  url = window.location.href,
  type = 'website',
  price,
  currency = 'USD',
  availability = 'instock' // 'instock' or 'outofstock'
}) => {
  useEffect(() => {
    const updateMetaTag = (property, content) => {
      // Remove existing tag
      const existingTag = document.querySelector(`meta[property="${property}"]`);
      if (existingTag) existingTag.remove();

      // Create new tag
      const meta = document.createElement('meta');
      meta.setAttribute('property', property);
      meta.setAttribute('content', content);
      document.head.appendChild(meta);
    };

    const updateNameMetaTag = (name, content) => {
      const existingTag = document.querySelector(`meta[name="${name}"]`);
      if (existingTag) existingTag.remove();

      const meta = document.createElement('meta');
      meta.setAttribute('name', name);
      meta.setAttribute('content', content);
      document.head.appendChild(meta);
    };

    // Update standard meta
    if (title) {
      document.title = title;
      updateMetaTag('og:title', title);
    }
    if (description) {
      updateNameMetaTag('description', description);
      updateMetaTag('og:description', description);
    }
    if (image) {
      updateMetaTag('og:image', image);
      updateMetaTag('og:image:width', '1200');
      updateMetaTag('og:image:height', '630');
      updateMetaTag('og:image:alt', title || 'Product image');
    }

    // Always update these
    updateMetaTag('og:url', url);
    updateMetaTag('og:type', type);
    updateMetaTag('og:site_name', 'Your Store Name');
    updateMetaTag('og:locale', 'en_US');

    // Product-specific (for e-commerce)
    if (type === 'product' && price !== undefined) {
      updateMetaTag('product:price:amount', String(price));
      updateMetaTag('product:price:currency', currency);
      updateMetaTag('product:availability', availability);
    }

    // Cleanup on unmount
    return () => {
      // Optional: remove tags when component unmounts
      // But usually not needed in SPA unless navigating between very different pages
    };
  }, [title, description, image, url, type, price, currency, availability]);

  return null; // This component renders nothing
};

export default OpenGraph;