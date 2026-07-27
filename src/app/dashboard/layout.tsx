import DemoModeNotice from '@/components/shared/DemoModeNotice'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="pt-24 px-4 sm:px-6 lg:px-8 pb-10 max-w-screen-2xl mx-auto">
      <DemoModeNotice />
      {children}
    </main>
  )
}
