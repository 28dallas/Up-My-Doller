import Navbar from '@/components/layout/Navbar'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 px-4 sm:px-6 lg:px-8 pb-10 max-w-screen-2xl mx-auto">
        {children}
      </main>
    </div>
  )
}
