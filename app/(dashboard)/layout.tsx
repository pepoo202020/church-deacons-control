import BottomNavigation from "@/components/dashboard/bottomNavigation/BottomNavigation";
import DashboardHeader from "@/components/dashboard/header/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-screen h-screen flex flex-col overflow-hidden">
      {/* Header */}
      <DashboardHeader />

      {/* Main Content (scrollable) */}
      <main
        className="flex-1 overflow-y-auto px-4 py-6"
        style={{
          scrollbarWidth: "revert-layer",
          scrollbarColor: "#3b82f6 #e5e7eb",
        }}
      >
        {children}
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
