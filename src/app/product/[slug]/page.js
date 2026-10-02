import Link from "next/link";
import { Truck, ShieldCheck, Headphones, Star } from "lucide-react";
import { getProductBySlug } from "@/lib/woocommerce";
import { decodeHtml } from "@/lib/html";
import ProductGallery from "@/components/ProductGallery";
import ProductPurchaseSection from "@/components/ProductPurchaseSection";
import ProductSpecifications from "@/components/ProductSpecifications";

const TRUST = [
  { Icon: Truck, title: "Fast Delivery", text: "24-48 Hours Nationwide" },
  {
    Icon: ShieldCheck,
    title: "Official Warranty",
    text: "100% Genuine Guaranteed",
  },
  {
    Icon: Headphones,
    title: "Expert Support",
    text: "Free Solar Consultation",
  },
];

export default async function ProductDetailsPage({ params }) {
  const { slug } = await params;

  let product = null;
  try {
    product = await getProductBySlug(slug);
  } catch (error) {
    console.error("Error fetching product:", error);
  }

  if (!product) {
    return (
      <div className="container mx-auto flex min-h-[50vh] flex-col items-center justify-center px-4 py-20 text-center">
        <h1 className="mb-2 text-2xl font-bold text-slate-800 md:text-3xl">
          Product Not Found
        </h1>
        <p className="mb-6 text-base text-gray-500">
          Sorry, we could not find this product. It may have been moved or
          removed.
        </p>
        <Link
          href="/shop"
          className="rounded-lg bg-[#002147] px-6 py-2.5 font-medium text-white transition hover:bg-slate-800"
        >
          Browse All Products
        </Link>
      </div>
    );
  }

  const images = product.images?.length > 0 ? product.images : [];
  const price = parseFloat(product.sale_price || product.price || "0") || 0;
  const regularPrice = product.regular_price
    ? parseFloat(product.regular_price)
    : null;

  const productName = decodeHtml(product.name);
  const category = product.categories?.[0];
  const categoryName = decodeHtml(category?.name || "Energy Storage");
  const categoryHref = category?.slug
    ? `/shop?category=${category.slug}`
    : "/shop";

  const averageRating = parseFloat(product.average_rating) || 0;
  const ratingCount = Number(product.rating_count) || 0;
  const inStock = product.stock_status === "instock" || !product.stock_status;

  return (
    <div className="min-h-screen bg-slate-50/60 py-4 md:py-10">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-4 flex items-center gap-2 overflow-x-auto whitespace-nowrap pb-1 text-sm text-slate-500 md:mb-6"
        >
          <Link href="/" className="transition-colors hover:text-[#00a651]">
            Home
          </Link>
          <span>/</span>
          <Link
            href={categoryHref}
            className="transition-colors hover:text-[#00a651]"
          >
            {categoryName}
          </Link>
          <span>/</span>
          <span className="max-w-[220px] truncate font-medium text-slate-800 sm:max-w-md">
            {productName}
          </span>
        </nav>

        {/* Hero */}
        <div className="grid grid-cols-1 gap-6 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm sm:p-6 md:p-8 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5 lg:self-start">
            <ProductGallery
              key={product.id}
              images={images}
              productName={productName}
            />
          </div>

          <div className="flex flex-col lg:col-span-7">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <Link
                href={categoryHref}
                className="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#00a651]"
              >
                {categoryName}
              </Link>

              {averageRating > 0 && ratingCount > 0 && (
                <div className="flex items-center gap-1.5 rounded-full border border-amber-100 bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-800">
                  <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                  <span>{averageRating.toFixed(1)}</span>
                  <span className="text-amber-700/70">
                    ({ratingCount} reviews)
                  </span>
                </div>
              )}
            </div>

            <h1 className="mb-3 text-xl font-extrabold leading-snug text-slate-800 sm:text-2xl md:text-3xl">
              {productName}
            </h1>

            <div className="mb-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-slate-100 pb-3 text-sm text-slate-500">
              {product.sku && (
                <span>
                  SKU: <strong className="text-slate-700">{product.sku}</strong>
                </span>
              )}
              <span className="flex items-center gap-1.5">
                Status:
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                    inStock
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-rose-100 text-rose-800"
                  }`}
                >
                  {inStock ? "In Stock" : "Out of Stock"}
                </span>
              </span>
            </div>

            <ProductPurchaseSection
              product={product}
              basePrice={price}
              regularPrice={regularPrice}
            />

            {/* Trust badges */}
            <div className="mt-6 grid grid-cols-1 gap-3 rounded-xl border-t border-slate-100 bg-slate-50/70 p-4 pt-5 sm:grid-cols-3">
              {TRUST.map(({ Icon, title, text }) => (
                <div
                  key={title}
                  className="flex items-center gap-3 text-slate-700"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-[#00a651]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">{title}</p>
                    <p className="text-xs text-slate-500">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Specifications */}
        <ProductSpecifications
          htmlContent={product.description || product.short_description}
          attributes={product.attributes}
        />
      </div>
    </div>
  );
}
