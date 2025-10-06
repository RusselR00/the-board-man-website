import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'THE BOARD MAN - Accounting & Auditors',
    short_name: 'THE BOARD MAN',
    description: 'Professional accounting, auditing, tax services, and business setup solutions in Dubai, UAE.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#2563eb',
    orientation: 'portrait',
    scope: '/',
    icons: [
      {
        src: '/favicon.ico',
        sizes: '48x48',
        type: 'image/x-icon',
        purpose: 'any'
      }
    ],
    categories: ['business', 'finance', 'productivity'],
    lang: 'en',
    dir: 'ltr'
  }
}