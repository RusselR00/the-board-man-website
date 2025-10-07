"use client"

import { usePathname } from 'next/navigation'
import { Layout } from './layout'

interface ConditionalLayoutProps {
  children: React.ReactNode
}

export function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname()
  
  // Don't render the main layout (header/footer) for admin pages or auth pages
  const isAdminRoute = pathname.startsWith('/admin')
  const isAuthRoute = pathname.startsWith('/auth')
  
  if (isAdminRoute || isAuthRoute) {
    return <>{children}</>
  }
  
  return <Layout>{children}</Layout>
}