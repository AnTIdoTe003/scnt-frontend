import { Truck, ShieldCheck, Zap } from "lucide-react"

export function DeliveryEstimator() {
  // Simple logic to calculate delivery dates
  const today = new Date()

  // Expedited (2-3 days)
  const expeditedDate = new Date(today)
  expeditedDate.setDate(today.getDate() + 2)
  const expeditedStr = expeditedDate.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' })

  // Standard (4-5 days)
  const standardDate = new Date(today)
  standardDate.setDate(today.getDate() + 4)
  const standardStr = standardDate.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' })

  return (
    <div className="mt-6 mb-6 rounded-2xl border border-primary/20 bg-card p-5 space-y-4">

      {/* Dynamic Delivery Dates */}
      <div className="flex items-start gap-3">
        <Truck className="w-5 h-5 text-accent shrink-0 mt-0.5" />
        <div>
          <h4 className="font-space font-bold text-sm text-foreground">DELIVERY ESTIMATE</h4>
          <div className="mt-2 space-y-2">
            <div className="flex justify-between items-center text-sm font-dm rounded-lg p-2 bg-secondary/50 border border-border">
              <span className="text-muted-foreground flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                Express
              </span>
              <span className="font-medium text-foreground">{expeditedStr}</span>
            </div>
            <div className="flex justify-between items-center text-sm font-dm rounded-lg p-2 hover:bg-secondary/20 transition-colors">
              <span className="text-muted-foreground ml-5">Standard (Free)</span>
              <span className="font-medium text-foreground">{standardStr}</span>
            </div>
          </div>
        </div>
      </div>

      <hr className="border-border" />

      {/* Trust Badges */}
      <div className="flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
        <div>
          <h4 className="font-space font-bold text-sm text-foreground mb-2">SECURE CHECKOUT</h4>
          <div className="flex flex-wrap gap-2">
            {/* Visual indicators for payment methods using Tailwind styling to mimic cards */}
            <div className="px-2 py-1 rounded bg-white text-[10px] font-bold text-blue-800 border-b-2 border-r-2 border-gray-200">VISA</div>
            <div className="px-2 py-1 rounded bg-white text-[10px] font-bold text-red-600 border-b-2 border-r-2 border-gray-200 flex items-center gap-0.5">
              <div className="w-2 h-2 rounded-full bg-red-500" />
              <div className="w-2 h-2 rounded-full bg-orange-400 -ml-1 mix-blend-multiply" />
              MC
            </div>
            <div className="px-2 py-1 rounded bg-black text-[10px] font-bold text-white border-b-2 border-r-2 border-gray-800">UPI</div>
            <div className="px-2 py-1 rounded bg-green-500 text-[10px] font-bold text-white border-b-2 border-r-2 border-green-700">COD</div>
          </div>
          <p className="text-xs text-muted-foreground font-dm mt-2">
            256-bit encrypted secure checkout. We do not store your payment information.
          </p>
        </div>
      </div>

    </div>
  )
}
