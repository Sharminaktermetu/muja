"use client";

import { useState } from "react";
import { PACKAGES, SIZES, deliveryFee } from "@/lib/pricing";
import Image from "next/image";

/* ---------- Existing product data ---------- */
const BRAND = "dailtshopbd";
const PRODUCT = "সিনথেটিক লেদার জিপার মোজা";
const PHONE = "01XXXXXXXXX";
const WHATSAPP = "8801XXXXXXXXX";

const GALLERY = [
  ["/images/muja.jpeg", "রাতের ইবাদতে পা থাকুক উষ্ণ"],
  ["/images/parent1.png", "পাশের চেইন — পরা ও খোলা সহজ"],
  ["/images/product.png", "সফরে লোফারের সাথে মানানসই"],
  ["/images/product2.png", "মসজিদে যাওয়ার পথে আরামের সঙ্গী"],
];

const BENEFITS = [
  [
    "নরম সিনথেটিক লেদার",
    "পায়ে নরম অনুভূতি, সাথে প্রয়োজনীয় মজবুতি।",
    "layers",
  ],
  ["পাশে চেইন", "টেনে পরতে হয় না। চেইন খুলে সহজে পরুন ও খুলুন।", "zap"],
  [
    "জুতার ভেতরে পরার জন্য",
    "লোফার, স্নিকার, স্যান্ডেল বা অফিস শু-র সাথে।",
    "footprints",
  ],
  ["শীতে আরাম", "ঠান্ডা মেঝে আর শীতের ভোরে পা থাকে উষ্ণ।", "flame"],
  [
    "১ বছরের ওয়ারেন্টি",
    "ওয়ারেন্টি কার্ডসহ, সমস্যা হলে রিপ্লেসমেন্ট।",
    "shield",
  ],
  ["সাইজ এক্সচেঞ্জ", "ছোট-বড় হলে বদলে দেওয়া হবে।", "refresh"],
];

const STEPS = [
  [
    "প্যাকেজ ও সাইজ বেছে নিন",
    "নিচের ফর্মে প্যাকেজ, জুতার সাইজ, নাম, ফোন ও ঠিকানা দিন।",
  ],
  ["আমরা কল করব", "আমাদের প্রতিনিধি ফোন করে সাইজ নিশ্চিত করবেন।"],
  [
    "হাতে পেয়ে টাকা দিন",
    "ঢাকায় ২৪–৪৮ ঘণ্টা, বাইরে ৩–৪ দিন। প্রোডাক্ট দেখে মূল্য পরিশোধ করুন।",
  ],
];

const FAQ = [
  [
    "ডেলিভারি চার্জ কত?",
    "১ জোড়ায় ঢাকার ভিতরে ৬০ টাকা, বাইরে ১০০ টাকা। ২ ও ৩ জোড়ায় সারা বাংলাদেশে ফ্রি।",
  ],
  ["কতদিনে ডেলিভারি পাব?", "ঢাকার ভিতরে ২৪–৪৮ ঘণ্টা, ঢাকার বাইরে ৩–৪ দিন।"],
  [
    "সাইজ ছোট-বড় হলে?",
    "অর্ডারের পর ফোন করে সাইজ নিশ্চিত করা হয়। তারপরও ছোট-বড় হলে এক্সচেঞ্জ করে দেব।",
  ],
  [
    "ওয়ারেন্টি কীভাবে কাজ করে?",
    "১ বছরের রিপ্লেসমেন্ট গ্যারান্টি। সমস্যা হলে ওয়ারেন্টি কার্ডসহ যোগাযোগ করুন।",
  ],
];

/* ---------- Small icons ---------- */

function Icon({ name, size = 20, className = "" }) {
  const paths = {
    check: <path d="m5 12 4 4L19 6" />,
    phone: (
      <>
        <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
      </>
    ),
    cart: (
      <>
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
      </>
    ),
    shield: (
      <>
        <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
    zap: <path d="m13 2-3 8h7l-6 12 2-9H6l7-11z" />,
    flame: (
      <path d="M8.5 14.5A4.5 4.5 0 0 0 13 19a4.5 4.5 0 0 0 4.5-4.5c0-2.5-1.5-4-3.5-7.5-.5 3-2 4-3 4.5C11 8 8 5 8 5c0 4-3 6.5-3 10a7 7 0 0 0 14 0" />
    ),
    refresh: (
      <>
        <path d="M20 7v5h-5" />
        <path d="M4 17v-5h5" />
        <path d="M5.6 9A7 7 0 0 1 18 6l2 6" />
        <path d="M18.4 15A7 7 0 0 1 6 18l-2-6" />
      </>
    ),
    layers: (
      <>
        <path d="m12 2 9 5-9 5-9-5 9-5z" />
        <path d="m3 12 9 5 9-5" />
        <path d="m3 17 9 5 9-5" />
      </>
    ),
    footprints: (
      <>
        <path d="M8 13c-2 0-3 2-3 4s1 3 3 3 3-1 3-3-1-4-3-4z" />
        <path d="M16 4c-2 0-3 2-3 4s1 3 3 3 3-1 3-3-1-4-3-4z" />
      </>
    ),
    arrow: <path d="M5 12h14m-7-7 7 7-7 7" />,
    truck: (
      <>
        <path d="M10 17h4V5H2v12h3" />
        <path d="M14 9h5l3 4v4h-2" />
        <circle cx="7.5" cy="17.5" r="2.5" />
        <circle cx="16.5" cy="17.5" r="2.5" />
      </>
    ),
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths[name] || paths.check}
    </svg>
  );
}

function SectionHeading({ eyebrow, title, description, light = false }) {
  return (
    <div className="mx-auto mb-12 max-w-xl text-center">
      <span
        className={`mb-4 inline-block rounded-full px-4 py-2 text-xs font-bold uppercase tracking-widest ${
          light
            ? "bg-white/10 text-orange-300"
            : "bg-orange-100 text-orange-700"
        }`}
      >
        {eyebrow}
      </span>
      <h2
        className={`text-3xl font-black tracking-tight md:text-4xl ${
          light ? "text-white" : "text-[#191919]"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 leading-7 ${
            light ? "text-white/65" : "text-gray-500"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}

export default function Home() {
  const [pkg, setPkg] = useState(2);
  const [sizes, setSizes] = useState(["", "", ""]);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    area: "inside",
  });
  const [state, setState] = useState({
    loading: false,
    error: "",
    done: false,
  });

  const p = PACKAGES[pkg];
  const delivery = deliveryFee(p.pairs, form.area);
  const total = p.price + delivery;

  const setSize = (i, v) =>
    setSizes((s) => s.map((x, idx) => (idx === i ? v : x)));

  const setField = (k) => (e) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));


async function submit(e) {
  e.preventDefault();

  setState({
    loading: true,
    error: "",
    done: false,
  });

const res = await fetch(
  `${process.env.NEXT_PUBLIC_API_URL}/api/orders`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      customer: {
        name: form.name,
        phone: form.phone,
      },

      items: [
        {
          productId: "synthetic-leather-zipper-socks",
          name: PRODUCT,
          price: p.price,
          quantity: p.pairs,
          sizes: sizes.slice(0, p.pairs),
        },
      ],

      shippingAddress: {
        address: form.address,
        area: form.area,
      },

      shippingCharge: delivery,
      paymentMethod: "COD",
    }),
  }
);

const data = await res.json();

if (!res.ok) {
  throw new Error(data.message || "অর্ডার করতে সমস্যা হয়েছে");
}

setState({
  loading: false,
  error: "",
  done: true,
});

console.log("Order created:", data.data);
}

  const inputCls =
    "w-full rounded-xl border border-[#e7ded3] bg-white px-4 py-3.5 text-base text-[#191919] outline-none transition placeholder:text-gray-400 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10";

  if (state.done) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#faf6f0] p-6 text-center">
        <div className="w-full max-w-md rounded-[2rem] bg-white p-10 shadow-xl">
          <div className="mx-auto mb-6 grid h-20 w-20 place-items-center rounded-full bg-orange-100 text-orange-600">
            <Icon name="check" size={40} />
          </div>
          <h1 className="text-3xl font-black text-[#191919]">
            অর্ডার কনফার্ম হয়েছে!
          </h1>
          <p className="mt-3 leading-7 text-gray-500">
            আমাদের প্রতিনিধি শীঘ্রই কল করে আপনার সাইজ নিশ্চিত করবেন।
          </p>
          <div className="mt-6 rounded-2xl bg-[#faf3e9] p-5">
            <p className="text-sm text-gray-500">সর্বমোট মূল্য</p>
            <p className="mt-1 text-3xl font-black text-orange-600">
              {total} ৳
            </p>
            <p className="mt-2 text-sm font-semibold">ক্যাশ অন ডেলিভারি</p>
          </div>
          <a
            href="/"
            className="mt-7 inline-flex w-full justify-center rounded-xl bg-[#191919] px-6 py-4 font-bold text-white transition hover:bg-orange-600"
          >
            হোমপেজে ফিরে যান
          </a>
        </div>
      </main>
    );
  }

  return (
   <main className="overflow-x-clip bg-[#faf7f2] text-[#191919] antialiased">
      {/* ANNOUNCEMENT BAR */}
      <div className="bg-[#191919] px-4 py-2.5 text-center text-xs font-semibold tracking-wide text-white sm:text-sm">
        <span className="text-orange-400">WINTER COLLECTION</span>
        <span className="mx-2 text-white/30">|</span>১ বছরের রিপ্লেসমেন্ট
        গ্যারান্টি · ক্যাশ অন ডেলিভারি
      </div>

      {/* NAVBAR */}
      <header className="sticky top-0 z-50 w-full border-b border-black/5 bg-[#faf7f2]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8">
          <a href="#" className="flex items-center gap-2">
            <span>
              <span className="block text-xl font-black tracking-tight">
                <img src="/images/logo.jpeg" width={60} height={60} />
              </span>
              <span className="block text-[9px] font-bold tracking-[.22em] text-gray-400">
                EVERYDAY COMFORT
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-8 text-sm font-semibold text-gray-600 md:flex">
            <a href="#features" className="transition hover:text-orange-600">
              বৈশিষ্ট্য
            </a>
            <a href="#gallery" className="transition hover:text-orange-600">
              গ্যালারি
            </a>
            <a href="#packages" className="transition hover:text-orange-600">
              প্যাকেজ
            </a>
            <a href="#faq" className="transition hover:text-orange-600">
              প্রশ্নোত্তর
            </a>
          </nav>

          <a
            href={`tel:${PHONE}`}
            className="flex items-center gap-2 rounded-full bg-[#191919] px-5 py-3 text-sm font-bold text-white transition hover:bg-orange-600"
          >
            <Icon name="phone" size={16} />
            <span className="hidden sm:inline">কল করুন</span>
          </a>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative mx-auto max-w-6xl px-5 pb-20 pt-12 md:px-8 md:pb-28 md:pt-20">
        <div className="pointer-events-none absolute -right-40 top-0 -z-0 h-[550px] w-[550px] rounded-full bg-orange-200/40 blur-[100px]" />

        <div className="relative z-10 grid items-center gap-12 lg:grid-cols-[.9fr_1.1fr]">
          {/* LEFT CONTENT */}
          <div className="order-2 lg:order-1">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-4 py-2 text-xs font-bold tracking-wide text-orange-700 shadow-sm">
              <span className="h-2 w-2 animate-pulse rounded-full bg-orange-500" />
              WINTER COMFORT COLLECTION
            </div>

            <h1 className="max-w-xl text-[36px] font-black leading-[1.2] tracking-tight sm:text-5xl lg:text-[46px]">
              এই শীতে পায়ের জন্য
              <span className="mt-2 block text-orange-600">উষ্ণতা ও আরাম।</span>
            </h1>

            <p className="mt-6 max-w-lg text-base leading-8 text-gray-500 md:text-lg">
              {PRODUCT}। নরম সিনথেটিক লেদার আর পাশে চেইন। জুতা, লোফার বা
              স্যান্ডেলের ভেতরে সারাদিন আরামে পরুন।
            </p>

            {/* HERO BENEFITS */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                ["১ বছর", "রিপ্লেসমেন্ট গ্যারান্টি"],
                ["সহজ", "সাইজ এক্সচেঞ্জ"],
                ["COD", "হাতে পেয়ে পেমেন্ট"],
                ["২ জোড়া", "নিলেই ডেলিভারি ফ্রি"],
              ].map(([a, b]) => (
                <div key={b} className="flex items-center gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-orange-100 text-orange-600">
                    <Icon name="check" size={19} />
                  </span>
                  <div>
                    <p className="font-black">{a}</p>
                    <p className="text-xs text-gray-500">{b}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-10 flex flex-wrap items-center gap-5">
              <a
                href="#order"
                className="group inline-flex items-center gap-3 rounded-full bg-orange-600 px-8 py-4 font-bold text-white shadow-xl shadow-orange-600/20 transition hover:-translate-y-1 hover:bg-orange-700"
              >
                এখনই অর্ডার করুন
                <Icon
                  name="arrow"
                  className="transition group-hover:translate-x-1"
                />
              </a>

              <div>
                <p className="text-xs font-semibold text-gray-400">
                  মাত্র শুরু
                </p>
                <p className="text-3xl font-black text-[#191919]">
                  690 <span className="text-lg text-orange-600">৳</span>
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT PRODUCT IMAGE */}
          <div className="order-1 lg:order-2">
            <div className="relative mx-auto max-w-[620px]">
              <div className="absolute inset-8 rotate-6 rounded-[3rem] bg-orange-500" />
              <div className="absolute inset-4 -rotate-3 rounded-[3rem] bg-[#f0d6bb]" />

              <div className="relative overflow-hidden rounded-[2.5rem] border border-white/70 bg-[#f3e8dc] p-3 shadow-2xl shadow-orange-900/10">
                <img
                  src="/images/parent1.png"
                  alt={PRODUCT}
                  className="aspect-square w-full rounded-[2rem] object-cover"
                />
              </div>

              {/* FLOATING PRICE */}
              <div className="absolute -left-2 top-10 rounded-2xl border border-white bg-white/95 p-4 shadow-xl backdrop-blur sm:-left-8">
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                  PREMIUM QUALITY
                </p>
                <p className="mt-1 text-lg font-black">Daily Hut</p>
                <p className="text-xs font-semibold text-orange-600">
                  Winter Collection
                </p>
              </div>

              {/* FLOATING DELIVERY */}
              <div className="absolute -bottom-5 right-2 flex items-center gap-3 rounded-2xl bg-[#191919] px-5 py-4 text-white shadow-2xl sm:right-[-15px]">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-orange-500">
                  <Icon name="truck" size={23} />
                </span>
                <div>
                  <p className="text-xs text-white/60">২ জোড়া কিনলেই</p>
                  <p className="font-bold">ফ্রি ডেলিভারি</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="border-y border-black/5 bg-white">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-5 py-7 md:grid-cols-4 md:px-8">
          {[
            ["shield", "১ বছরের ওয়ারেন্টি"],
            ["refresh", "সাইজ এক্সচেঞ্জ"],
            ["truck", "সারা দেশে ডেলিভারি"],
            ["cart", "ক্যাশ অন ডেলিভারি"],
          ].map(([icon, text]) => (
            <div key={text} className="flex items-center justify-center gap-3">
              <span className="text-orange-600">
                <Icon name={icon} size={23} />
              </span>
              <span className="text-xs font-bold sm:text-sm">{text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <SectionHeading
            eyebrow="PRODUCT GALLERY"
            title="প্রতিটি মুহূর্তে আরামের সঙ্গী"
            description="ঘরে, বাইরে, সফরে কিংবা শীতের ভোরে — আপনার প্রতিদিনের ব্যবহারের জন্য।"
          />

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {GALLERY.map(([src, cap], i) => (
              <figure key={cap} className="group">
                <div className="overflow-hidden rounded-[1.5rem] bg-[#f0e6da]">
                  <img
                    src={src}
                    alt={cap}
                    loading="lazy"
                    className="aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>
                <figcaption className="mt-4 flex items-start gap-3 text-sm font-bold leading-6">
                  <span className="text-orange-600">0{i + 1}</span>
                  {cap}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section id="features" className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <SectionHeading
            eyebrow="WHY DAILY HUT"
            title="কেন এই মোজা আপনার পছন্দ হবে?"
            description="আরাম, ব্যবহারিক সুবিধা এবং নিশ্চিন্ত কেনাকাটা — সবকিছু একসাথে।"
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {BENEFITS.map(([title, description, icon], i) => (
              <div
                key={title}
                className="group rounded-[1.5rem] border border-[#eee7de] bg-[#faf7f2] p-7 transition duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl hover:shadow-orange-900/5"
              >
                <div className="mb-6 flex items-center justify-between">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-orange-100 text-orange-600 transition group-hover:bg-orange-600 group-hover:text-white">
                    <Icon name={icon} size={27} />
                  </span>
                  <span className="text-3xl font-black text-orange-100">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="text-lg font-black">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-gray-500">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARENTS OFFER */}
      <section className="relative overflow-hidden bg-[#191919] py-20 md:py-28">
        <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-orange-600/20 blur-[100px]" />

        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 md:px-8 lg:grid-cols-2">
          <div>
            <span className="inline-block rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-2 text-xs font-bold tracking-widest text-orange-400">
              A GIFT OF CARE
            </span>

            <h2 className="mt-7 text-3xl font-black leading-tight text-white md:text-4xl">
              এই শীতে বাবা-মায়ের জন্য
              <span className="block text-orange-500">কিছু একটা হোক।</span>
            </h2>

            <p className="mt-6 max-w-lg leading-8 text-gray-400">
              ছোটবেলায় শীতের দিনে তাঁরা খেয়াল রাখতেন আমরা যেন কষ্ট না পাই।
              ভোরে মসজিদে যাওয়া বা রাতের ইবাদতে তাঁদের পা থাকুক উষ্ণ।
            </p>

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="font-bold text-white">
                ২ জোড়া নিন, একটা বাবার জন্য, একটা মায়ের জন্য।
              </p>
              <p className="mt-2 text-sm text-orange-400">
                সারা বাংলাদেশে ডেলিভারি ফ্রি।
              </p>
            </div>

            <a
              href="#order"
              onClick={() => setPkg(2)}
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-orange-600 px-8 py-4 font-bold text-white transition hover:bg-orange-700"
            >
              বাবা-মায়ের জন্য অর্ডার করুন
              <Icon name="arrow" />
            </a>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <img
              src="/images/parent2.png"
              alt="মায়ের রাতের ইবাদতে"
              loading="lazy"
              className="h-72 scale-110 w-80 rounded-[2rem] object-center"
            />
            <img
              src="/images/parent2.png"
              alt="বাবার মসজিদে যাওয়ার পথে"
              loading="lazy"
              className="mt-16 h-72 scale-110 w-80 rounded-[2rem] object-center"
             
            />
          </div>
        </div>
      </section>

      {/* HOW TO ORDER */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <SectionHeading
            eyebrow="SIMPLE ORDER PROCESS"
            title="অর্ডার করা খুব সহজ"
            description="মাত্র তিনটি ধাপে আপনার পছন্দের পণ্যটি হাতে পেয়ে যাবেন।"
          />

          <div className="grid gap-5 md:grid-cols-3">
            {STEPS.map(([title, description], i) => (
              <div
                key={title}
                className="relative rounded-[1.5rem] border border-[#eee7de] bg-white p-8"
              >
                <span className="text-5xl font-black text-orange-100">
                  0{i + 1}
                </span>
                <h3 className="mt-6 text-lg font-black">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-gray-500">
                  {description}
                </p>
                {i !== 2 && (
                  <div className="absolute right-5 top-10 hidden text-orange-300 md:block">
                    <Icon name="arrow" size={24} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PACKAGE SELECTOR + ORDER FORM */}
      <section id="order" className="scroll-mt-24 bg-[#f0e8dd] py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <SectionHeading
            eyebrow="PLACE YOUR ORDER"
            title="আপনার পছন্দের প্যাকেজটি বেছে নিন"
            description="প্যাকেজ নির্বাচন করুন, তথ্য দিন এবং অর্ডার কনফার্ম করুন।"
          />

          <div className="grid items-start gap-8 lg:grid-cols-[.9fr_1.1fr]">
            {/* PACKAGE CARDS */}
            <div
              id="packages"
              className="rounded-[2rem] bg-[#191919] p-6 text-white shadow-2xl md:p-8"
            >
              <p className="text-xs font-bold tracking-widest text-orange-400">
                SELECT YOUR PACKAGE
              </p>
              <h3 className="mt-3 text-2xl font-black">
                প্যাকেজ নির্বাচন করুন
              </h3>
              <p className="mt-2 text-sm text-white/50">
                আপনার প্রয়োজন অনুযায়ী সেরা অফারটি বেছে নিন।
              </p>

              <div className="mt-8 grid gap-4">
                {Object.entries(PACKAGES).map(([k, v]) => {
                  const active = pkg == k;

                  return (
                    <button
                      type="button"
                      role="radio"
                      aria-checked={active}
                      key={k}
                      onClick={() => setPkg(Number(k))}
                      className={`relative flex items-center gap-4 rounded-2xl border p-5 text-left transition ${
                        active
                          ? "border-orange-500 bg-orange-500/10"
                          : "border-white/10 bg-white/5 hover:border-white/30"
                      }`}
                    >
                      <span
                        className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border ${
                          active
                            ? "border-orange-500 bg-orange-500 text-white"
                            : "border-white/30"
                        }`}
                      >
                        {active && <Icon name="check" size={15} />}
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="flex flex-wrap items-center gap-2 font-bold">
                          {v.label}
                          {v.tag && (
                            <span className="rounded-full bg-orange-500 px-2 py-1 text-[10px] font-bold text-white">
                              {v.tag}
                            </span>
                          )}
                          {v.pairs === 3 && (
                            <span className="rounded-full bg-red-500 px-2 py-1 text-[10px] font-bold text-white">
                              ২৮% ছাড়
                            </span>
                          )}
                        </span>

                        <span className="mt-1 block text-xs text-white/50">
                          {v.pairs >= 2
                            ? `প্রতি জোড়া ${Math.round(v.price / v.pairs)} ৳ · ডেলিভারি ফ্রি`
                            : "ডেলিভারি চার্জ ৬০–১০০ ৳"}
                        </span>
                      </span>

                      <span className="text-right">
                        {v.pairs === 3 && (
                          <span className="block text-xs text-white/40 line-through">
                            2070 ৳
                          </span>
                        )}
                        <span className="text-xl font-black text-orange-400">
                          {v.price} ৳
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-8 border-t border-white/10 pt-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/60">নিরাপদ কেনাকাটা</span>
                  <span className="flex items-center gap-2 font-bold text-orange-400">
                    <Icon name="shield" size={17} />১ বছরের গ্যারান্টি
                  </span>
                </div>
              </div>
            </div>

            {/* FORM */}
            <div className="rounded-[2rem] bg-white p-6 shadow-xl shadow-orange-900/5 md:p-9">
              <h3 className="text-2xl font-black">আপনার তথ্য দিন</h3>
              <p className="mt-2 text-sm text-gray-500">
                সঠিক তথ্য দিয়ে অর্ডারটি সম্পন্ন করুন।
              </p>

              <form onSubmit={submit} className="mt-8 grid gap-5">
                {/* SIZES */}
                <div>
                  <p className="mb-4 font-bold">জুতার সাইজ নির্বাচন করুন</p>

                  <div className="grid gap-4 sm:grid-cols-2">
                    {Array.from({ length: p.pairs }).map((_, i) => (
                      <label
                        key={i}
                        className="grid gap-2 text-sm font-semibold"
                      >
                        {i === 0 ? "জুতার সাইজ" : `${i + 1}য় জোড়ার সাইজ`}

                        <select
                          required
                          value={sizes[i]}
                          onChange={(e) => setSize(i, e.target.value)}
                          className={inputCls}
                        >
                          <option value="">সাইজ নির্বাচন করুন</option>
                          <optgroup label="বাটা">
                            {SIZES.slice(0, 6).map((s) => (
                              <option key={s}>{s}</option>
                            ))}
                          </optgroup>
                          <optgroup label="এপেক্স">
                            {SIZES.slice(6).map((s) => (
                              <option key={s}>{s}</option>
                            ))}
                          </optgroup>
                        </select>

                        {i === 0 && (
                          <span className="text-xs font-normal text-gray-400">
                            জুতার সাইজ দিন, মোজার সাইজ নয়।
                          </span>
                        )}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="h-px bg-gray-100" />

                {/* CUSTOMER DETAILS */}
                <p className="font-bold">ডেলিভারির তথ্য</p>

                <label className="grid gap-2 text-sm font-semibold">
                  আপনার নাম
                  <input
                    required
                    autoComplete="name"
                    placeholder="সম্পূর্ণ নাম লিখুন"
                    value={form.name}
                    onChange={setField("name")}
                    className={inputCls}
                  />
                </label>

                <label className="grid gap-2 text-sm font-semibold">
                  মোবাইল নম্বর
                  <input
                    required
                    autoComplete="tel"
                    inputMode="numeric"
                    placeholder="01XXXXXXXXX"
                    value={form.phone}
                    onChange={setField("phone")}
                    className={inputCls}
                  />
                </label>

                <label className="grid gap-2 text-sm font-semibold">
                  সম্পূর্ণ ঠিকানা
                  <textarea
                    required
                    autoComplete="street-address"
                    placeholder="বাসা, রোড, এলাকা, জেলা লিখুন"
                    value={form.address}
                    onChange={setField("address")}
                    className={inputCls}
                    rows={3}
                  />
                </label>

                {/* DELIVERY AREA */}
                <fieldset>
                  <legend className="mb-3 text-sm font-bold">
                    ডেলিভারি এলাকা
                  </legend>

                  <div className="grid grid-cols-2 gap-3">
                    {[
                      ["inside", "ঢাকার ভিতরে"],
                      ["outside", "ঢাকার বাইরে"],
                    ].map(([v, l]) => (
                      <label
                        key={v}
                        className={`cursor-pointer rounded-xl border p-4 text-center text-sm font-bold transition ${
                          form.area === v
                            ? "border-orange-500 bg-orange-50 text-orange-700"
                            : "border-gray-200 hover:border-orange-300"
                        }`}
                      >
                        <input
                          type="radio"
                          name="area"
                          value={v}
                          checked={form.area === v}
                          onChange={setField("area")}
                          className="sr-only"
                        />
                        {l}
                      </label>
                    ))}
                  </div>
                </fieldset>

                {/* PRICE SUMMARY */}
                <div className="rounded-2xl bg-[#faf7f2] p-5">
                  <p className="mb-4 text-sm font-bold">অর্ডার সামারি</p>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">
                      মোজা ({p.pairs} জোড়া)
                    </span>
                    <span className="font-bold">{p.price} ৳</span>
                  </div>

                  <div className="mt-3 flex justify-between text-sm">
                    <span className="text-gray-500">ডেলিভারি চার্জ</span>
                    <span className="font-bold">
                      {delivery === 0 ? "ফ্রি" : `${delivery} ৳`}
                    </span>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-dashed border-gray-300 pt-4">
                    <span className="font-black">সর্বমোট</span>
                    <span className="text-2xl font-black text-orange-600">
                      {total} ৳
                    </span>
                  </div>
                </div>

                {state.error && (
                  <p
                    role="alert"
                    className="rounded-xl bg-red-50 p-4 text-sm font-semibold text-red-600"
                  >
                    {state.error}
                  </p>
                )}

                {/* SUBMIT */}
                <button
                  type="submit"
                  disabled={state.loading}
                  className="flex w-full items-center justify-center gap-3 rounded-full bg-orange-600 px-6 py-4 text-base font-black text-white shadow-xl shadow-orange-600/20 transition hover:bg-orange-700 disabled:opacity-60"
                >
                  <Icon name="cart" size={20} />
                  {state.loading
                    ? "অপেক্ষা করুন..."
                    : `অর্ডার কনফার্ম করুন — ${total} ৳`}
                </button>

                <p className="text-center text-xs leading-6 text-gray-400">
                  ক্যাশ অন ডেলিভারি। প্রোডাক্ট হাতে পেয়ে টাকা দিন।
                </p>
              </form>

              <div className="mt-6 border-t border-gray-100 pt-5 text-center text-sm text-gray-500">
                অর্ডারে সমস্যা হলে কল করুন{" "}
                <a
                  className="font-bold text-orange-600 underline"
                  href={`tel:${PHONE}`}
                >
                  {PHONE}
                </a>{" "}
                বা{" "}
                <a
                  className="font-bold text-orange-600 underline"
                  href={`https://wa.me/${WHATSAPP}`}
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <SectionHeading
            eyebrow="NEED TO KNOW"
            title="সাধারণ কিছু প্রশ্ন"
            description="অর্ডার করার আগে আপনার প্রয়োজনীয় তথ্যগুলো জেনে নিন।"
          />

          <div className="overflow-hidden rounded-[1.5rem] border border-[#eee7de] bg-white px-6 md:px-8">
            {FAQ.map(([q, a]) => (
              <details
                key={q}
                className="group border-b border-gray-100 py-5 last:border-0"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold">
                  {q}
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-orange-100 text-lg text-orange-600 transition group-open:rotate-45">
                    +
                  </span>
                </summary>

                <p className="mt-4 pr-8 text-sm leading-7 text-gray-500">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-5 pb-20 md:px-8">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-orange-600 px-7 py-14 text-center md:py-20">
          <div className="absolute -right-20 -top-32 h-72 w-72 rounded-full border-[40px] border-white/10" />
          <div className="absolute -bottom-40 -left-20 h-72 w-72 rounded-full border-[40px] border-white/10" />

          <div className="relative">
            <p className="text-xs font-bold tracking-[.2em] text-white/70">
              DAILY HUT · WINTER COLLECTION
            </p>
            <h2 className="mt-5 text-3xl font-black text-white md:text-5xl">
              শীতের প্রস্তুতি আজই নিন!
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/80 md:text-base">
              নিজের জন্য কিংবা পরিবারের জন্য নিয়ে নিন আরামদায়ক এই জিপার মোজা।
            </p>
            <a
              href="#order"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-white px-9 py-4 font-black text-orange-600 shadow-xl transition hover:-translate-y-1"
            >
              এখনই অর্ডার করুন
              <Icon name="arrow" />
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#191919] px-5 pb-28 pt-12 text-white md:px-8 md:pb-12">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
          <div>
            <Image src={"/images/bgremove.png"} alt="" width={80} height={80}/>
            <p className="mt-2 text-xs text-white/40">
              Everyday comfort, everyday style.
            </p>
          </div>

          <div className="text-sm text-white/50">
            <p>© 2026 {BRAND}। সর্বস্বত্ব সংরক্ষিত।</p>
            <p className="mt-2">সারাদেশে ক্যাশ অন ডেলিভারি।</p>
          </div>

          <a
            href={`tel:${PHONE}`}
            className="flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-bold transition hover:border-orange-500 hover:text-orange-400"
          >
            <Icon name="phone" size={16} />
            যোগাযোগ করুন
          </a>
        </div>
      </footer>

      {/* MOBILE STICKY ORDER BAR */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-gray-200 bg-white/95 px-4 py-3 shadow-[0_-5px_25px_rgba(0,0,0,0.07)] backdrop-blur-xl md:hidden">
        <div className="mx-auto flex max-w-xl items-center justify-between gap-3">
          <div>
            <p className="text-[10px] font-semibold text-gray-400">
              মোট মূল্য থেকে
            </p>
            <p className="text-xl font-black text-orange-600">
              690 ৳
              <span className="ml-1 text-xs font-medium text-gray-400">
                থেকে
              </span>
            </p>
          </div>

          <a
            href="#order"
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-orange-600 px-5 py-3.5 text-sm font-black text-white"
          >
            <Icon name="cart" size={18} />
            অর্ডার করুন
          </a>
        </div>
      </div>
    </main>
  );
}
