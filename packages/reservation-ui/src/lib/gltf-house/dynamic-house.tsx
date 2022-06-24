import dynamic from 'next/dynamic';

export const DynamicHouse = dynamic(
  async () => (await import('./house')).House,
  {
    ssr: false,
  }
);
