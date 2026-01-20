import type React from "react"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className="bg-background text-foreground pt-8 md:pt-12 px-4">
      <div className="w-full max-w-md mx-auto">
        {children}
      </div>
    </section>
  )
}
