import Link from "next/link"

export default function Footer() {
  return (
    <>
      {/* ================= MOBILE BRAND STRIP ================= */}
      <div className="md:hidden bg-[#0b0b0b] border-t border-white/10 px-4 py-3 text-center">
        <p className="text-xs text-muted-text tracking-wide">
          Tirupur <span className="text-gold-light">Threads</span> · Premium Knitwear
        </p>
      </div>

      {/* ================= DESKTOP FOOTER ================= */}
      <footer className="hidden md:block bg-[#0b0b0b] border-t border-white/10 text-foreground">
        <div className="max-w-7xl mx-auto px-6 py-12">

          <div className="grid grid-cols-4 gap-12">

            {/* BRAND */}
            <div>
              <h3 className="text-lg font-black tracking-wide mb-4">
                Tirupur <span className="text-gold-light">Threads</span>
              </h3>
              <p className="text-sm text-muted-text leading-relaxed">
                Factory-direct premium knitwear and casual garments
                manufactured in Tirupur, India.
              </p>
            </div>

            {/* SHOP */}
            <div>
              <h4 className="text-xs tracking-widest font-black text-gold-light mb-4">
                SHOP
              </h4>
              <ul className="space-y-2 text-sm text-muted-text">
                <li><Link href="/products">All Products</Link></li>
                <li><Link href="/products?category=tshirts">T-Shirts</Link></li>
                <li><Link href="/products?category=oversized">Oversized</Link></li>
                <li><Link href="/products?category=hoodies">Hoodies</Link></li>
              </ul>
            </div>

            {/* WHOLESALE */}
            <div>
              <h4 className="text-xs tracking-widest font-black text-gold-light mb-4">
                WHOLESALE & B2B
              </h4>
              <ul className="space-y-2 text-sm text-muted-text">
                <li><Link href="/wholesale">Bulk Orders</Link></li>
                <li><Link href="/wholesale">Private Label</Link></li>
                <li><Link href="/wholesale">Factory Pricing</Link></li>
              </ul>
            </div>

            {/* COMPANY */}
            <div>
              <h4 className="text-xs tracking-widest font-black text-gold-light mb-4">
                COMPANY
              </h4>
              <ul className="space-y-2 text-sm text-muted-text">
                <li><Link href="/story">Our Story</Link></li>
                <li><Link href="#">Contact</Link></li>
                <li><Link href="#">Careers</Link></li>
              </ul>
            </div>

          </div>

          {/* GOLD DIVIDER */}
          <div className="mt-10 h-px bg-gradient-to-r from-transparent via-gold-light/30 to-transparent" />

          {/* BOTTOM BAR */}
          <div className="mt-6 flex justify-between items-center text-xs text-muted-text">
            <p>© 2026 Tirupur Threads. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="#">Privacy</Link>
              <Link href="#">Terms</Link>
              <Link href="#">Cookies</Link>
            </div>
          </div>

        </div>
      </footer>
    </>
  )
}
