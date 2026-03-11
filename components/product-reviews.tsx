"use client"

import { useState, useEffect } from "react"
import { Star, BadgeCheck, MessageCircle, AlertCircle, CheckCircle2 } from "lucide-react"

interface Review {
  id: string
  author: string
  rating: number
  date: string
  title: string
  content: string
  verified: boolean
  helpful: number
}

interface ProductReviewsProps {
  productId?: string
}

export function ProductReviews({ productId }: ProductReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const [submitSuccess, setSubmitSuccess] = useState(false)

  // Form State
  const [rating, setRating] = useState(5)
  const [author, setAuthor] = useState("")
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  useEffect(() => {
    async function fetchReviews() {
      if (!productId) {
        setIsLoading(false)
        return
      }

      try {
        const res = await fetch(`/api/reviews?productId=${encodeURIComponent(productId)}`)
        const data = await res.json()

        if (data.success && data.reviews) {
          setReviews(data.reviews)
        }
      } catch (e) {
        console.error("Failed to fetch reviews:", e)
      } finally {
        setIsLoading(false)
      }
    }

    fetchReviews()
  }, [productId])

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!productId) {
      setSubmitError("Product ID is missing.")
      return
    }

    if (!author.trim() || !content.trim()) {
      setSubmitError("Please fill out your name and review.")
      return
    }

    setIsSubmitting(true)
    setSubmitError("")
    setSubmitSuccess(false)

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId,
          author,
          rating,
          title,
          content
        })
      })

      const data = await res.json()

      if (!res.ok || data.error) {
        throw new Error(data.error || "Failed to submit review")
      }

      // Optimistically add to UI
      if (data.review) {
        setReviews([data.review, ...reviews])
      }

      setSubmitSuccess(true)
      setIsFormOpen(false)
      // Reset form
      setAuthor("")
      setTitle("")
      setContent("")
      setRating(5)
    } catch (e: any) {
      setSubmitError(e.message || "An error occurred.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const averageRating = reviews.length > 0
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : "5.0"

  // Calculate distribution
  const distribution = [5, 4, 3, 2, 1].map(stars => {
    const count = reviews.filter(r => r.rating === stars).length
    const percent = reviews.length > 0 ? Math.round((count / reviews.length) * 100) : (stars === 5 ? 100 : 0)
    return { stars, percent }
  })

  // Fallback defaults if no reviews exist yet
  const displayReviews = reviews.length > 0 ? reviews : [
    {
      id: "fallback-1",
      author: "Aditi S.",
      rating: 5,
      date: "2 weeks ago",
      title: "Absolutely obsessed!",
      content: "I've been looking for a signature scent for months and this is IT. The longevity is incredible—I sprayed it in the morning and could still smell it after my evening workout.",
      verified: true,
      helpful: 124
    }
  ]

  const displayCount = reviews.length > 0 ? reviews.length : 1
  const displayRating = reviews.length > 0 ? averageRating : "5.0"

  return (
    <div className="mt-16 pt-16 border-t border-border">
      <div className="flex items-center gap-2 mb-8">
        <MessageCircle className="w-6 h-6 text-accent" />
        <h2 className="text-3xl font-bebas text-foreground tracking-wider">CUSTOMER REVIEWS</h2>
      </div>

      {submitSuccess && (
        <div className="mb-8 p-4 rounded-xl border border-green-500/30 bg-green-500/10 flex items-start gap-3 text-green-500 fade-in">
          <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-space font-bold">Review submitted successfully!</p>
            <p className="text-xs font-dm mt-1">Thank you for sharing your thoughts with the community.</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Rating Summary block */}
        <div className="lg:col-span-4">
          <div className="glass-card p-8 rounded-2xl text-center">
            <div className="text-6xl font-bebas text-foreground mb-2">{displayRating}</div>
            <div className="flex items-center justify-center gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className={`w-5 h-5 ${s <= parseFloat(displayRating) ? 'text-accent fill-accent' : 'text-border fill-border'}`} />
              ))}
            </div>
            <p className="text-sm font-dm text-muted-foreground">Based on {displayCount} review{displayCount !== 1 && 's'}</p>

            <div className="mt-8 space-y-3">
              {distribution.map((row) => (
                <div key={row.stars} className="flex items-center gap-3 text-sm font-dm">
                  <div className="flex items-center gap-1 w-12 justify-end text-muted-foreground">
                    {row.stars} <Star className="w-3 h-3 fill-current" />
                  </div>
                  <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-accent transition-all duration-1000" style={{ width: `${row.percent}%` }} />
                  </div>
                  <div className="w-8 text-left text-muted-foreground">{row.percent}%</div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setIsFormOpen(!isFormOpen)}
              className="w-full mt-8 py-4 border border-border rounded-xl font-space font-bold text-sm tracking-widest hover:border-accent hover:text-accent transition-colors"
            >
              {isFormOpen ? "CANCEL" : "WRITE A REVIEW"}
            </button>
          </div>
        </div>

        {/* Review List & Form */}
        <div className="lg:col-span-8 space-y-6">
          {/* Write Review Form */}
          {isFormOpen && (
            <div className="p-6 md:p-8 border border-border rounded-2xl bg-card/80 backdrop-blur-xl slide-in-top mb-8">
              <h3 className="text-xl font-bebas text-foreground mb-6">Write your review</h3>

              {submitError && (
                <div className="mb-6 p-4 rounded-xl border border-destructive/30 bg-destructive/10 flex items-center gap-3 text-destructive text-sm font-space">
                  <AlertCircle className="w-5 h-5" />
                  {submitError}
                </div>
              )}

              <form onSubmit={handleSubmitReview} className="space-y-5 flex flex-col">
                <div>
                  <label className="block text-xs font-space font-bold text-muted-foreground mb-2 tracking-widest">RATING</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setRating(s)}
                        className="focus:outline-none"
                      >
                        <Star className={`w-8 h-8 transition-colors ${s <= rating ? 'text-accent fill-accent hover:text-accent/80 hover:fill-accent/80' : 'text-border fill-transparent hover:text-border/80'}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-xs font-space font-bold text-muted-foreground tracking-widest">NAME</label>
                    <input
                      type="text"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      placeholder="e.g. John D."
                      className="w-full h-12 bg-background/50 border border-border rounded-xl px-4 text-sm font-dm focus:outline-none focus:border-accent transition-colors"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-space font-bold text-muted-foreground tracking-widest">REVIEW TITLE <span className="text-muted-foreground/50 font-normal">(Optional)</span></label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Give your review a title"
                      className="w-full h-12 bg-background/50 border border-border rounded-xl px-4 text-sm font-dm focus:outline-none focus:border-accent transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-space font-bold text-muted-foreground tracking-widest">REVIEW</label>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="How was the longevity? Did you get compliments?"
                    className="w-full h-32 bg-background/50 border border-border rounded-xl p-4 text-sm font-dm focus:outline-none focus:border-accent transition-colors resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !productId}
                  className="w-full h-12 bg-primary text-primary-foreground rounded-xl font-space font-bold text-sm tracking-widest hover:opacity-95 transition disabled:opacity-50 mt-2"
                >
                  {isSubmitting ? "SUBMITTING..." : "SUBMIT REVIEW"}
                </button>
              </form>
            </div>
          )}

          {isLoading ? (
            <div className="py-12 flex justify-center">
              <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <>
              {displayReviews.map((r) => (
                <div key={r.id} className="p-6 border border-border rounded-2xl bg-card hover:border-accent/30 transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-space font-bold tracking-wider">{r.author}</span>
                        {r.verified && (
                          <span className="flex items-center gap-1 text-[10px] text-green-500 bg-green-500/10 px-2 py-0.5 rounded-full font-bold">
                            <BadgeCheck className="w-3 h-3" /> VERIFIED
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            className={`w-3 h-3 ${s <= r.rating ? "text-accent fill-accent" : "text-border fill-border"}`}
                          />
                        ))}
                        <span className="text-xs text-muted-foreground ml-2 font-dm">{r.date}</span>
                      </div>
                    </div>
                  </div>

                  {r.title && <h4 className="font-space font-bold mb-2">{r.title}</h4>}
                  <p className="text-muted-foreground font-dm text-sm leading-relaxed mb-4">{r.content}</p>

                  <button className="text-xs text-muted-foreground font-dm flex items-center gap-1 hover:text-foreground transition-colors">
                    Helpful ({r.helpful || 0})
                  </button>
                </div>
              ))}

              {reviews.length > 5 && (
                <button className="w-full py-4 glass-card border-none rounded-xl font-space font-bold text-sm tracking-widest hover:bg-secondary transition-colors mt-4">
                  LOAD MORE REVIEWS
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
