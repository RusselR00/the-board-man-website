import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Authentication | THE BOARD MAN",
  description: "Authentication pages for THE BOARD MAN website.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  )
}