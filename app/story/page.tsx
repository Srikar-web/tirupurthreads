"use client"

import Link from "next/link"

export default function StoryPage() {
  return (
    <main className="bg-background text-foreground">

      {/* ================= HERO ================= */}
      <section className="relative px-6 pt-24 pb-20 sm:pt-32 sm:pb-28 border-b border-border-luxury">
        <div className="max-w-6xl mx-auto text-center">
          <span className="inline-block mb-4 px-4 py-1.5 border border-gold-light text-gold-light text-[11px] tracking-widest font-black">
            OUR JOURNEY
          </span>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black mb-5">
            Crafted in Tirupur,<br />Trusted Everywhere
          </h1>

          <p className="text-muted-text max-w-3xl mx-auto text-sm sm:text-lg">
            From the heart of India’s knitwear capital to brands across the globe,
            Tirupur Threads stands for quality, consistency, and craftsmanship.
          </p>
        </div>
      </section>

      {/* ================= STORY ================= */}
      <section className="py-20 sm:py-28 px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-gold-light text-2xl sm:text-3xl font-black mb-4">
              Where It All Began
            </h2>

            <p className="text-muted-text text-sm sm:text-base leading-relaxed mb-4">
              Tirupur Threads was born from a deep-rooted passion for textiles and
              a commitment to create garments that meet international standards.
              What started as a focused manufacturing initiative has grown into
              a trusted partner for brands seeking reliability and quality.
            </p>

            <p className="text-muted-text text-sm sm:text-base leading-relaxed">
              Every product we manufacture carries the legacy of Tirupur’s
              craftsmanship, refined with modern processes and quality systems.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-center">
            {[
              ["10+", "Years Experience"],
              ["50K+", "Monthly Capacity"],
              ["25+", "B2B Clients"],
              ["100%", "Quality Focus"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="border border-border-luxury rounded-xl py-6"
              >
                <p className="text-gold-light text-2xl font-black">{value}</p>
                <p className="text-muted-text text-sm">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TIRUPUR ================= */}
      <section className="py-20 sm:py-28 px-6 bg-card border-y border-border-luxury">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-black mb-6">
            Tirupur — The Knitwear Capital of India
          </h2>

          <p className="text-muted-text text-sm sm:text-base leading-relaxed mb-4 max-w-4xl">
            Tirupur supplies knitwear to some of the world’s most demanding
            fashion markets. Being located at the center of this ecosystem gives
            us direct access to skilled labor, advanced dyeing units, and
            world-class supply chains.
          </p>

          <p className="text-muted-text text-sm sm:text-base leading-relaxed max-w-4xl">
            At Tirupur Threads, we combine this regional strength with strict
            quality control, ethical sourcing, and consistent delivery timelines.
          </p>
        </div>
      </section>

      {/* ================= VALUES ================= */}
      <section className="py-20 sm:py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center text-2xl sm:text-3xl font-black mb-12">
            What We Stand For
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              {
                title: "Quality First",
                desc: "Every garment goes through multi-stage quality checks before dispatch.",
              },
              {
                title: "Ethical Manufacturing",
                desc: "We follow responsible sourcing and fair manufacturing practices.",
              },
              {
                title: "Long-Term Partnerships",
                desc: "We focus on building lasting relationships, not one-time orders.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="border border-border-luxury rounded-xl p-6 hover:border-gold-light transition"
              >
                <h3 className="text-gold-light font-black mb-3">
                  {item.title}
                </h3>
                <p className="text-muted-text text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CONTACT ================= */}
      <section className="py-20 sm:py-28 px-6 bg-card border-t border-border-luxury">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-black mb-4">
            Let’s Work Together
          </h2>

          <p className="text-muted-text text-sm sm:text-base mb-10 max-w-2xl mx-auto">
            Whether you’re a growing brand or an established business, we’re
            ready to support your manufacturing needs.
          </p>

          <div className="grid sm:grid-cols-2 gap-6 mb-12">
            <div className="border border-border-luxury rounded-xl p-6">
              <p className="text-gold-light font-black mb-2">📞 Phone</p>
              <p className="text-muted-text text-sm">
                +91 96882 98821
              </p>
            </div>

            <div className="border border-border-luxury rounded-xl p-6">
              <p className="text-gold-light font-black mb-2">✉ Email</p>
              <p className="text-muted-text text-sm">
                enquirytirupurthreads@gmail.com
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/wholesale"
              className="px-10 py-3 bg-gold-light text-background font-black hover:bg-gold-accent transition"
            >
              WHOLESALE ENQUIRY
            </Link>

            <Link
              href="/products"
              className="px-10 py-3 border-2 border-gold-light text-gold-light font-black hover:bg-gold-light hover:text-background transition"
            >
              VIEW COLLECTIONS
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}
