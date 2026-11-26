"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Check,
  ChevronDown,
  Flame,
  Gauge,
  Hand,
  Rotate3D,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Thermometer,
  Truck,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: Thermometer,
    title: "Hot & Cold Water",
    description:
      "আপনার প্রয়োজন অনুযায়ী গরম অথবা ঠান্ডা পানির সুবিধা উপভোগ করুন।",
  },
  {
    icon: Gauge,
    title: "Digital Display",
    description:
      "ডিজিটাল ডিসপ্লেতে পানির তাপমাত্রা সহজেই দেখতে পারবেন।",
  },
  {
    icon: Rotate3D,
    title: "360° Rotation",
    description:
      "ফ্লেক্সিবল 360° rotation design ব্যবহারে আরও সুবিধাজনক।",
  },
  {
    icon: Hand,
    title: "Hand Shower",
    description:
      "সাথে থাকা hand shower দিয়ে বিভিন্ন কাজে সহজে পানি ব্যবহার করুন।",
  },
];

const benefits = [
  "দ্রুত গরম পানির সুবিধা",
  "Digital temperature display",
  "Hot & Cold water support",
  "360° rotating design",
  "Hand shower included",
  "Modern premium design",
];

const faqs = [
  {
    question: "এই tap-এ কি গরম ও ঠান্ডা দুই ধরনের পানি পাওয়া যায়?",
    answer:
      "হ্যাঁ, product-এর design অনুযায়ী hot & cold water ব্যবহারের সুবিধা রয়েছে।",
  },
  {
    question: "পানির temperature কি দেখা যাবে?",
    answer:
      "হ্যাঁ। Digital display-এর মাধ্যমে temperature দেখতে পারবেন।",
  },
  {
    question: "Hand shower কি সাথে থাকবে?",
    answer:
      "হ্যাঁ, product-এর সাথে hand shower রয়েছে।",
  },
  {
    question: "Tap কি 360° ঘোরানো যায়?",
    answer:
      "হ্যাঁ, product-এ 360° rotation feature রয়েছে।",
  },
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const unitPrice = 2490;
  const deliveryCharge = 80;
  const total = unitPrice * quantity + deliveryCharge;

  const scrollToOrder = () => {
    document.getElementById("order")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <main className="min-h-screen bg-[#090909] text-white">

      {/* ================= HEADER ================= */}
      <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8">
          
          <div className="flex items-center gap-2">
           

            <div>
              <Image   
              src="/images/logo.jpeg"
                alt="Instant Electric Hot Water Tap"
                width={40}
                height={40}
                priority
                className="h-auto w-full object-cover rounded-full"/>
             
            </div>
          </div>

          <button
            onClick={scrollToOrder}
            className="rounded-full bg-[#ff7a00] px-5 py-2.5 text-sm font-bold text-black transition hover:bg-[#ff8c1a]"
          >
            Order Now
          </button>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden pt-28">
        
        {/* Background glow */}
        <div className="absolute left-[-200px] top-[150px] h-[400px] w-[400px] rounded-full bg-orange-500/10 blur-[120px]" />
        <div className="absolute right-[-200px] top-[100px] h-[500px] w-[500px] rounded-full bg-orange-500/10 blur-[140px]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 pb-20 pt-8 lg:grid-cols-2 lg:px-8 lg:pb-28">

          {/* LEFT */}
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-2 text-sm font-medium text-orange-400">
              <Sparkles size={15} />
              Smart Kitchen Solution
            </div>

            <h1 className="max-w-3xl text-4xl font-black leading-[1.05] sm:text-5xl lg:text-7xl">
              Instant
              <span className="block text-[#ff7a00]">
                Hot Water
              </span>
              Tap
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-white/60">
              আধুনিক design, digital temperature display এবং
              hand shower-এর সুবিধাসহ আপনার রান্নাঘরের জন্য
              একটি smart hot water solution।
            </p>

            {/* Feature pills */}
            <div className="mt-7 flex flex-wrap gap-3">
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm">
                <Thermometer size={16} className="text-orange-400" />
                Hot & Cold
              </div>

              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm">
                <Rotate3D size={16} className="text-orange-400" />
                360° Rotation
              </div>

              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm">
                <Gauge size={16} className="text-orange-400" />
                Digital Display
              </div>
            </div>

            {/* Price */}
            <div className="mt-8 flex items-end gap-4">
              <div>
                <p className="text-sm text-white/40">Special Price</p>

                <div className="flex items-center gap-3">
                  <span className="text-4xl font-black text-[#ff7a00]">
                    ৳2,490
                  </span>

                  <span className="text-lg text-white/30 line-through">
                    ৳3,200
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={scrollToOrder}
                className="group flex items-center justify-center gap-3 rounded-xl bg-[#ff7a00] px-7 py-4 font-black text-black transition hover:scale-[1.02] hover:bg-[#ff8c1a]"
              >
                <ShoppingCart size={20} />
                অর্ডার করুন
              </button>

              <a
                href="tel:+8801715000000"
                className="flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-7 py-4 font-bold transition hover:bg-white/10"
              >
                কল করুন
              </a>
            </div>

            {/* Trust */}
            <div className="mt-8 flex flex-wrap gap-5 text-sm text-white/50">
              <div className="flex items-center gap-2">
                <Truck size={17} className="text-orange-400" />
                সারাদেশে Delivery
              </div>

              <div className="flex items-center gap-2">
                <ShieldCheck size={17} className="text-orange-400" />
                Quality Product
              </div>
            </div>
          </div>

          {/* RIGHT PRODUCT */}
          <div className="relative">
            <div className="absolute inset-10 rounded-full bg-orange-500/20 blur-[100px]" />

            <div className="relative overflow-hidden rounded-[35px] border border-white/10 bg-[#111] shadow-2xl shadow-orange-500/10">
              <Image
                src="/images/watertap.jpeg"
                alt="Instant Electric Hot Water Tap"
                width={1200}
                height={1200}
                priority
                className="h-auto w-full object-cover"
              />
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-5 -left-3 rounded-2xl border border-orange-500/30 bg-black/90 px-5 py-4 shadow-xl backdrop-blur-xl sm:left-[-25px]">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-500/10">
                  <Flame className="text-orange-500" />
                </div>

                <div>
                  <p className="text-xs text-white/40">
                    Instant Heating
                  </p>
                  <p className="font-bold">
                    Smart Water Solution
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="border-y border-white/10 bg-[#0e0e0e]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-white/10 lg:grid-cols-4">
          
          {[
            ["360°", "Rotation"],
            ["50°C", "Digital Display"],
            ["2 IN 1", "Hot & Cold"],
            ["1", "Hand Shower"],
          ].map(([number, text]) => (
            <div
              key={text}
              className="px-4 py-7 text-center sm:py-9"
            >
              <div className="text-2xl font-black text-[#ff7a00] sm:text-3xl">
                {number}
              </div>

              <div className="mt-1 text-xs text-white/40 sm:text-sm">
                {text}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold uppercase tracking-[4px] text-orange-500">
            Product Features
          </span>

          <h2 className="mt-3 text-3xl font-black sm:text-5xl">
            আপনার প্রয়োজনীয়
            <span className="text-[#ff7a00]"> সব সুবিধা</span>
          </h2>

          <p className="mt-5 text-white/50">
            একটি modern tap-এর মধ্যে প্রয়োজনীয় smart features
            একসাথে।
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group rounded-3xl border border-white/10 bg-white/[0.03] p-7 transition duration-300 hover:-translate-y-1 hover:border-orange-500/40 hover:bg-orange-500/[0.04]"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500/10 transition group-hover:bg-orange-500">
                  <Icon
                    size={26}
                    className="text-orange-500 group-hover:text-black"
                  />
                </div>

                <h3 className="mt-6 text-xl font-bold">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-white/45">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= PRODUCT SHOWCASE ================= */}
      <section className="relative overflow-hidden bg-[#0e0e0e]">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/10 blur-[140px]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 lg:grid-cols-2 lg:px-8 lg:py-28">

          <div className="overflow-hidden rounded-[30px] border border-white/10">
            <Image
              src="/images/watertap.jpeg"
              alt="DailyHut Hot Water Tap"
              width={1200}
              height={1200}
              className="w-full object-cover transition duration-700 hover:scale-105"
            />
          </div>

          <div>
            <span className="text-sm font-bold uppercase tracking-[4px] text-orange-500">
              Why Choose This?
            </span>

            <h2 className="mt-4 text-3xl font-black leading-tight sm:text-5xl">
              Kitchen-এ আনুন
              <span className="text-[#ff7a00]">
                {" "}আরও Smart Experience
              </span>
            </h2>

            <p className="mt-6 leading-8 text-white/50">
              প্রচলিত tap-এর পরিবর্তে modern hot water solution
              ব্যবহার করুন। Digital display এবং flexible hand shower
              ব্যবহারের অভিজ্ঞতাকে আরও সহজ করে।
            </p>

            <div className="mt-8 space-y-4">
              {benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="flex items-center gap-3"
                >
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-orange-500/10">
                    <Check
                      size={16}
                      className="text-orange-500"
                    />
                  </div>

                  <span className="text-white/75">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={scrollToOrder}
              className="mt-9 rounded-xl bg-[#ff7a00] px-8 py-4 font-black text-black transition hover:bg-[#ff8c1a]"
            >
              এখনই অর্ডার করুন
            </button>
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <div className="text-center">
          <span className="text-sm font-bold uppercase tracking-[4px] text-orange-500">
            Simple Process
          </span>

          <h2 className="mt-3 text-3xl font-black sm:text-5xl">
            অর্ডার করবেন যেভাবে
          </h2>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {[
            {
              number: "01",
              title: "অর্ডার করুন",
              text: "নিচের order form পূরণ করে আপনার তথ্য দিন।",
            },
            {
              number: "02",
              title: "Confirmation",
              text: "আমাদের প্রতিনিধি আপনার order confirm করার জন্য যোগাযোগ করবে।",
            },
            {
              number: "03",
              title: "পণ্য গ্রহণ করুন",
              text: "আপনার ঠিকানায় product পৌঁছে যাবে।",
            },
          ].map((item) => (
            <div
              key={item.number}
              className="relative rounded-3xl border border-white/10 bg-white/[0.03] p-8"
            >
              <div className="text-6xl font-black text-orange-500/10">
                {item.number}
              </div>

              <h3 className="mt-3 text-xl font-bold">
                {item.title}
              </h3>

              <p className="mt-3 leading-7 text-white/45">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= OFFER ================= */}
      <section className="px-4 py-10">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[30px] border border-orange-500/20 bg-gradient-to-br from-orange-500/20 to-transparent p-8 sm:p-12">

          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-orange-500 px-4 py-2 text-xs font-black text-black">
                LIMITED OFFER
              </div>

              <h2 className="text-3xl font-black sm:text-5xl">
                আজকের Special Price
              </h2>

              <p className="mt-4 max-w-lg text-white/50">
                সীমিত সময়ের জন্য বিশেষ মূল্যে productটি
                অর্ডার করুন।
              </p>
            </div>

            <div className="md:text-right">
              <div className="text-lg text-white/30 line-through">
                Regular Price ৳3,200
              </div>

              <div className="mt-1 text-5xl font-black text-orange-500">
                ৳2,490
              </div>

              <button
                onClick={scrollToOrder}
                className="mt-6 rounded-xl bg-orange-500 px-8 py-4 font-black text-black transition hover:bg-orange-400"
              >
                অর্ডার করতে চাই
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="mx-auto max-w-4xl px-4 py-20">
        <div className="text-center">
          <span className="text-sm font-bold uppercase tracking-[4px] text-orange-500">
            FAQ
          </span>

          <h2 className="mt-3 text-3xl font-black sm:text-5xl">
            সাধারণ প্রশ্ন
          </h2>
        </div>

        <div className="mt-10 space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;

            return (
              <div
                key={faq.question}
                className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]"
              >
                <button
                  onClick={() =>
                    setOpenFaq(isOpen ? null : index)
                  }
                  className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left"
                >
                  <span className="font-bold">
                    {faq.question}
                  </span>

                  <ChevronDown
                    size={20}
                    className={`shrink-0 text-orange-500 transition ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="border-t border-white/10 px-5 pb-5 pt-4 text-sm leading-7 text-white/50">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= ORDER ================= */}
      <section
        id="order"
        className="relative overflow-hidden bg-[#0e0e0e] px-4 py-20"
      >
        <div className="absolute right-[-200px] top-[-200px] h-[500px] w-[500px] rounded-full bg-orange-500/10 blur-[130px]" />

        <div className="relative mx-auto max-w-5xl">
          
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-bold uppercase tracking-[4px] text-orange-500">
              Order Now
            </span>

            <h2 className="mt-3 text-3xl font-black sm:text-5xl">
              আপনার অর্ডারটি দিন
            </h2>

            <p className="mt-4 text-white/50">
              নিচের তথ্যগুলো পূরণ করুন। আমাদের প্রতিনিধি
              আপনার সাথে যোগাযোগ করবে।
            </p>
          </div>

          <div className="mt-10 grid gap-8 rounded-[30px] border border-white/10 bg-black/50 p-5 sm:p-8 lg:grid-cols-[1fr_360px]">

            {/* FORM */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Order submitted!");
              }}
              className="space-y-5"
            >
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  আপনার নাম
                </label>

                <input
                  type="text"
                  required
                  placeholder="আপনার নাম লিখুন"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-4 outline-none transition placeholder:text-white/25 focus:border-orange-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  মোবাইল নম্বর
                </label>

                <input
                  type="tel"
                  required
                  placeholder="01XXXXXXXXX"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-4 outline-none transition placeholder:text-white/25 focus:border-orange-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  সম্পূর্ণ ঠিকানা
                </label>

                <textarea
                  required
                  rows={4}
                  placeholder="আপনার সম্পূর্ণ ঠিকানা লিখুন"
                  className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-4 outline-none transition placeholder:text-white/25 focus:border-orange-500"
                />
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#ff7a00] py-4 font-black text-black transition hover:bg-[#ff8c1a]"
              >
                <ShoppingCart size={20} />
                অর্ডার কনফার্ম করুন
              </button>
            </form>

            {/* ORDER SUMMARY */}
            <div className="h-fit rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              
              <div className="flex gap-4">
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl">
                  <Image
                    src="/images/watertap.jpeg"
                    alt="Product"
                    fill
                    className="object-cover"
                  />
                </div>

                <div>
                  <h3 className="font-bold">
                    Instant Electric Hot Water Tap
                  </h3>

                  <p className="mt-1 text-sm text-white/40">
                    With Hand Shower
                  </p>
                </div>
              </div>

              <div className="mt-6 border-t border-white/10 pt-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/50">
                    Quantity
                  </span>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        setQuantity(Math.max(1, quantity - 1))
                      }
                      className="h-8 w-8 rounded-lg border border-white/10 bg-white/5"
                    >
                      -
                    </button>

                    <span className="w-5 text-center font-bold">
                      {quantity}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        setQuantity(quantity + 1)
                      }
                      className="h-8 w-8 rounded-lg border border-white/10 bg-white/5"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="mt-5 space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/50">
                      Product Price
                    </span>

                    <span>
                      ৳{unitPrice * quantity}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-white/50">
                      Delivery
                    </span>

                    <span>৳{deliveryCharge}</span>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-5">
                  <span className="font-bold">
                    Total
                  </span>

                  <span className="text-2xl font-black text-orange-500">
                    ৳{total}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-white/10 bg-black px-4 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">

          <div>
            <h3 className="text-xl font-black">
              Daily<span className="text-orange-500">Hut</span>
            </h3>

            <p className="mt-1 text-xs text-white/30">
              Smart products for everyday living.
            </p>
          </div>

          <p className="text-xs text-white/30">
            {/* © {new Date().getFullYear()} DailyHut. All rights reserved. */}
          </p>
        </div>
      </footer>

      {/* ================= MOBILE STICKY CTA ================= */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-black/90 p-3 backdrop-blur-xl lg:hidden">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <p className="text-[10px] text-white/40">
              Special Price
            </p>

            <p className="text-xl font-black text-orange-500">
              ৳2,490
            </p>
          </div>

          <button
            onClick={scrollToOrder}
            className="flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 font-black text-black"
          >
            <ShoppingCart size={18} />
            Order Now
          </button>
        </div>
      </div>

    </main>
  );
}