import Topbar from '@/app/builder/components/Topbar'
import Sidebar from '@/app/builder/components/Sidebar'


export default function BuilderLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Area */}
      <div className="flex flex-col flex-1">
        {/* Topbar */}
        <Topbar />

        {/* Page Content */}
        <main className="flex-1 p-4 bg-gray-50 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
