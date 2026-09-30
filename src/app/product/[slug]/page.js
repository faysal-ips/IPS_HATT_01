import Link from "next/link";
import { getProductBySlug } from "@/lib/woocommerce";
import ProductGallery from "@/components/ProductGallery";
import ProductPurchaseSection from "@/components/ProductPurchaseSection";
import ProductSpecifications from "@/components/ProductSpecifications";
import {
  Star,
  Truck,
  ShieldCheck,
  Headphones,
  ChevronRight,
} from "lucide-react";

export default async function ProductDetailsPage({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  let product = null;
  try {
    product = await getProductBySlug(slug);
  } catch (error) {
    console.error("Error fetching product:", error);
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center min-h-[50vh] flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">
          Product Not Found
        </h1>
        <p className="text-slate-600 text-base mb-6">
          Apnar khunja product-ti paowa jayni (Slug: {slug}).
        </p>
        <Link
          href="/"
          className="bg-[#002147] hover:bg-slate-800 text-white font-semibold text-base px-6 py-3 rounded-xl transition"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  const images =
    product.images?.length > 0 ? product.images : [{ src: "/placeholder.svg" }];
  const price = parseFloat(product.sale_price || product.price || "0");
  const regularPrice = product.regular_price
    ? parseFloat(product.regular_price)
    : null;
  const categoryName = product.categories?.[0]?.name || "Energy Storage";
  const ratingCount = product.rating_count || 12;
  const averageRating = product.average_rating || "4.8";

  return (
    <div className="bg-slate-50/60 min-h-screen py-8 md:py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Breadcrumb Navigation - Min 14px Font */}
        <nav className="text-sm font-medium text-slate-600 mb-6 flex items-center gap-2 overflow-x-auto whitespace-nowrap pb-1">
          <Link href="/" className="hover:text-[#00a651] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
          <span className="capitalize hover:text-[#00a651] cursor-pointer">
            {categoryName}
          </span>
          <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
          <span className="text-slate-900 font-semibold truncate max-w-[200px] sm:max-w-md">
            {product.name}
          </span>
        </nav>

        {/* Top Product Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200">
          {/* Left Column: Image Gallery (5 cols) */}
          <div className="lg:col-span-5">
            <ProductGallery images={images} productName={product.name} />
          </div>

          {/* Right Column: Interactive Details & Actions (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              {/* Category & Rating Row */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <span className="text-sm font-bold text-[#00a651] bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 rounded-full uppercase tracking-wide">
                  {categoryName}
                </span>

                {/* Rating Badge */}
                <div className="flex items-center gap-2 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-200 text-sm font-bold text-amber-900">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                  <span>{averageRating}</span>
                  <span className="text-slate-500 font-normal">
                    ({ratingCount} reviews)
                  </span>
                </div>
              </div>

              {/* Product Title - Prominent Font */}
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-snug mb-4">
                {product.name}
              </h1>

              {/* SKU & Stock Availability - Min 14px Font */}
              <div className="flex items-center gap-6 text-sm text-slate-600 mb-6 border-b border-slate-100 pb-4">
                {product.sku && (
                  <span>
                    SKU:{" "}
                    <strong className="text-slate-800 font-semibold">
                      {product.sku}
                    </strong>
                  </span>
                )}
                <span className="flex items-center gap-2">
                  Status:
                  <span
                    className={`font-semibold px-3 py-1 rounded-full text-xs ${
                      product.stock_status === "instock" ||
                      !product.stock_status
                        ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                        : "bg-rose-100 text-rose-800 border border-rose-200"
                    }`}
                  >
                    {product.stock_status === "instock" || !product.stock_status
                      ? "In Stock"
                      : "Out of Stock"}
                  </span>
                </span>
              </div>

              {/* Interactive Purchase Component */}
              <ProductPurchaseSection
                product={product}
                basePrice={price}
                regularPrice={regularPrice}
              />
            </div>

            {/* Trust Badges - Min 14px Font with Vector Icons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-6 border-t border-slate-200 bg-slate-50/80 p-5 rounded-2xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#00a651] flex items-center justify-center flex-shrink-0">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm">
                    Fast Delivery
                  </p>
                  <p className="text-xs text-slate-600">
                    24-48 Hours Nationwide
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm">
                    Official Warranty
                  </p>
                  <p className="text-xs text-slate-600">
                    100% Genuine Guaranteed
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center flex-shrink-0">
                  <Headphones className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm">
                    Expert Support
                  </p>
                  <p className="text-xs text-slate-600">
                    Free Solar Consultation
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications Section - Organized Tables */}
        <div className="mt-10 bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-slate-200">
          <ProductSpecifications
            htmlContent={product.description || product.short_description}
          />
        </div>
      </div>
    </div>
  );
}
