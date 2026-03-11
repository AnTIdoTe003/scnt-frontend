import { Metadata } from "next";
import { MoveLeft } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Return & Refund Policy | XPerfumes",
  description: "Industry-standard return and refund policy for XPerfumes.",
};

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-primary pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-700/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Grain overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-3xl mx-auto relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white/50 hover:text-amber-400 transition-colors mb-8 font-space text-sm tracking-wider group"
        >
          <MoveLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          BACK TO HOME
        </Link>

        <h1 className="font-bebas text-5xl md:text-6xl lg:text-7xl text-white mb-6 tracking-wide">
          RETURN & <span className="text-amber-500">REFUND POLICY</span>
        </h1>

        <div className="space-y-8 text-white/70 font-dm leading-relaxed">
          <p className="text-lg text-white/90">
            At XPerfumes, we want you to be completely satisfied with your purchase.
            Because fragrances are personal care items, we strictly adhere to industry-standard hygiene protocols. Please read our policy below before initiating a return.
          </p>

          <section className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-md">
            <h2 className="font-space font-bold text-xl text-white mb-4 tracking-widest uppercase">
              1. Return Window
            </h2>
            <p className="mb-4">
              We offer a <strong className="text-amber-400">2-day return policy</strong>. You have 14 days after receiving your item to request a return.
            </p>
            <p>
              To be eligible for a return, your item must be in the same condition that you received it: <strong className="text-white">unworn, unused, unopened, with tags, and in its original packaging (the cellophane seal must be perfectly intact).</strong> You will also need the receipt or proof of purchase.
            </p>
          </section>

          <section className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-md">
            <h2 className="font-space font-bold text-xl text-white mb-4 tracking-widest uppercase">
              2. Non-Returnable Items
            </h2>
            <p className="mb-4">
              Certain types of items cannot be returned due to hygiene and safety reasons. We do not accept returns on:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Perfumes that have been unsealed, opened, or sprayed (even once).</li>
              <li>Discovery sets, sample boxes, or decants.</li>
              <li>Items purchased during a final sale, clearance, or flash sale.</li>
              <li>Gift cards.</li>
            </ul>
          </section>

          <section className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-md">
            <h2 className="font-space font-bold text-xl text-white mb-4 tracking-widest uppercase">
              3. Damages and Issues
            </h2>
            <p>
              Please inspect your order upon reception. If the item is defective, damaged in transit, or if you receive the wrong item, contact us immediately at <a href="mailto:support@xperfumes.in" className="text-amber-400 hover:text-amber-300 underline underline-offset-4">support@xperfumes.in</a> within 48 hours of delivery. We will evaluate the issue and make it right via replacement.
            </p>
          </section>

          <section className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-md">
            <h2 className="font-space font-bold text-xl text-white mb-4 tracking-widest uppercase">
              4. Return Process
            </h2>
            <p className="mb-4">
              To start a return, you can contact us at <a href="mailto:returns@xperfumes.in" className="text-amber-400 hover:text-amber-300 underline underline-offset-4">returns@xperfumes.in</a>. Do not send items back without requesting a return first.
            </p>
            <p>
              If your return is accepted, we will provide instructions on how and where to send your package. <strong className="text-white">Please note: Customers are entirely responsible for paying the return shipping costs.</strong> Shipping costs are non-refundable. We recommend using a trackable shipping service or purchasing shipping insurance, as we cannot guarantee that we will receive your returned item.
            </p>
          </section>

          <section className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-md">
            <h2 className="font-space font-bold text-xl text-white mb-4 tracking-widest uppercase">
              5. Refunds
            </h2>
            <p>
              We will notify you once we’ve received and meticulously inspected your return. If the return is approved (i.e. the fragrance seal is fully intact), you’ll be automatically refunded on your original payment method within 7-10 business days. Please remember it can take some time for your bank or credit card company to process and post the refund.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
