import { Metadata } from "next"
import { AdminLayout } from "@/components/admin/layout"
import { ProtectedAdminRoute } from "@/components/admin/protected-route"

export const metadata: Metadata = {
  title: "Admin Dashboard | THE BOARD MAN",
  description: "Administrative dashboard for THE BOARD MAN website management.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedAdminRoute>
      <AdminLayout>
        {children}
      </AdminLayout>
    </ProtectedAdminRoute>
  )
}