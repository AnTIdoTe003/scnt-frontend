"use client"
import { useState } from "react"
import { Truck, ShieldCheck, MapPin } from "lucide-react"

export function DeliveryEstimator() {
  const [pincode, setPincode] = useState("")
  const [isChecking, setIsChecking] = useState(false)
  const [deliveryInfo, setDeliveryInfo] = useState<{ minDate: string, maxDate: string } | null>(null)

  const handleCheck = () => {
    if (pincode.length !== 6) return
    setIsChecking(true)
    setDeliveryInfo(null)

    setTimeout(() => {
      const today = new Date()
      const minDate = new Date(today)
      minDate.setDate(today.getDate() + 5)
      const maxDate = new Date(today)
      maxDate.setDate(today.getDate() + 7)

      const formatOpts: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'short', day: 'numeric' }

      setDeliveryInfo({
        minDate: minDate.toLocaleDateString('en-IN', formatOpts),
        maxDate: maxDate.toLocaleDateString('en-IN', formatOpts)
      })
      setIsChecking(false)
    }, 600)
  }

  return (
    <div className="mt-6 mb-6 rounded-2xl border border-border bg-card p-5 sm:p-6 space-y-6">

      <div className="flex flex-col sm:flex-row gap-4 items-start">
        <div className="w-10 h-10 rounded-full bg-accent/10 items-center justify-center shrink-0 hidden sm:flex">
          <Truck className="w-5 h-5 text-accent" />
        </div>
        <div className="flex-1 w-full">
          <h4 className="font-space font-bold text-sm text-foreground mb-1 flex items-center gap-2">
            <Truck className="w-4 h-4 text-accent sm:hidden" />
            DELIVERY ESTIMATE
          </h4>
          <p className="text-xs text-muted-foreground font-dm mb-4">Enter your pincode to check delivery time</p>

          <div className="flex gap-2">
            <div className="relative flex-1">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                maxLength={6}
                placeholder="Enter Pincode"
                className="w-full h-11 pl-9 pr-4 rounded-xl border border-border bg-background text-sm font-space tracking-widest focus:outline-none focus:border-accent transition-all"
                value={pincode}
                onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
              />
            </div>
            <button
              onClick={handleCheck}
              disabled={pincode.length !== 6 || isChecking}
              className="h-11 px-6 bg-foreground text-background rounded-xl font-space font-bold text-xs tracking-widest hover:bg-foreground/90 transition-all disabled:opacity-50 flex items-center gap-2"
            >
              {isChecking ? "..." : "CHECK"}
            </button>
          </div>

          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${deliveryInfo ? 'max-h-24 mt-4 opacity-100' : 'max-h-0 opacity-0'}`}>
            {deliveryInfo && (
              <div className="rounded-xl bg-green-500/10 border border-green-500/20 p-3 flex items-center justify-between">
                <div>
                  <div className="text-xs font-space font-bold text-green-700 dark:text-green-400 mb-0.5">
                    Standard Delivery
                  </div>
                  <div className="text-sm font-dm font-medium text-foreground">
                    {deliveryInfo.minDate} — {deliveryInfo.maxDate}
                  </div>
                </div>
                <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center">
                  <span className="text-green-600 dark:text-green-400 font-bold text-[10px] tracking-wider">FREE</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <hr className="border-border" />

      {/* Trust Badges */}
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-green-500/10 items-center justify-center shrink-0 hidden sm:flex">
          <ShieldCheck className="w-5 h-5 text-green-500" />
        </div>
        <div>
          <h4 className="font-space font-bold text-sm text-foreground mb-2 mt-1 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-green-500 sm:hidden" />
            SECURE CHECKOUT
          </h4>
          <div className="flex flex-wrap gap-2 mb-2">
            <div className="px-2 py-1 rounded bg-white text-[10px] font-bold text-blue-800 border-b-2 border-r-2 border-gray-200">VISA</div>
            <div className="px-2 py-1 rounded bg-white text-[10px] font-bold text-red-600 border-b-2 border-r-2 border-gray-200 flex items-center gap-0.5">
              <div className="w-2 h-2 rounded-full bg-red-500" />
              <div className="w-2 h-2 rounded-full bg-orange-400 -ml-1 mix-blend-multiply" />
              MC
            </div>
            <div className="px-2 py-1 rounded bg-black text-[10px] font-bold text-white border-b-2 border-r-2 border-gray-800">UPI</div>
          </div>
          <p className="text-[11px] leading-tight text-muted-foreground font-dm max-w-[280px]">
            100% encrypted secure checkout. Your payment information is never stored.
          </p>
        </div>
      </div>

    </div>
  )
}
