import Sidebar from "@/components/Sidebar";
import Header from "@/components/header/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { CartProvider } from "@/context/CartContext";
import "./globals.css";
import NavProgress from "@/components/NavProgress";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-slate-50 min-h-screen">
        <NavProgress />
        <CartProvider>
          <div className="hidden lg:block">
            <Sidebar />
          </div>

          <div className="w-full pl-0 lg:pl-16">
            <Header />
            <main>{children}</main>
            <Footer />
          </div>

          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
