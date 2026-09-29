import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import "./globals.css";
import Footer from "@/components/Footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-slate-50 min-h-screen">
        {/* Left Vertical Icon Sidebar (Shudhu Desktop Screen-e Visible Thakbe) */}
        <div className="hidden lg:block">
          <Sidebar />
        </div>

        {/* Main Content Area (Mobile-e pl-0, Desktop-e lg:pl-16) */}
        <div className="w-full pl-0 lg:pl-16">
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
