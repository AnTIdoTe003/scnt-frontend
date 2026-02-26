"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Mail, Phone, MapPin, Sparkles, Send, MessageCircle } from "lucide-react"

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="pt-32 pb-20">
        {/* Hero Section */}
        <section className="relative mb-16 px-4 overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/50 rounded-full blur-3xl pulse-glow" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/50 rounded-full blur-3xl pulse-glow" style={{ animationDelay: "1s" }} />
          </div>

          <div className="relative max-w-4xl mx-auto text-center py-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 glass-card rounded-full mb-6 scale-fade-in">
              <MessageCircle className="w-4 h-4 text-primary" />
              <span className="text-xs font-space font-bold tracking-widest gradient-text">LET'S TALK</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-bebas mb-6 gradient-text slide-in-bottom">
              GET IN TOUCH
            </h1>
            <p className="text-xl text-muted-foreground font-dm slide-in-bottom" style={{ animationDelay: "0.1s" }}>
              Questions about a fragrance? Need help choosing a signature? We’re here.
            </p>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4">
          {/* Contact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              {
                icon: <Mail className="w-8 h-8" />,
                title: "Email",
                value: "hello@xperfumes.in",
                description: "Drop us a line anytime",
              },
              {
                icon: <Phone className="w-8 h-8" />,
                title: "Phone",
                value: "+1 (555) 123-4567",
                description: "Mon-Fri, 9AM-6PM EST",
              },
              {
                icon: <MapPin className="w-8 h-8" />,
                title: "Location",
                value: "New York, NY",
                description: "Where the magic happens",
              },
            ].map((contact, index) => (
              <div
                key={contact.title}
                className={`glass-card p-6 rounded-2xl hover:glow-subtle transition-all duration-500 hover:-translate-y-2 text-center scale-fade-in`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent text-white mb-4 hover:scale-110 hover:rotate-12 transition-all duration-300">
                  {contact.icon}
                </div>
                <h3 className="text-xl font-bebas gradient-text mb-2">{contact.title}</h3>
                <p className="text-foreground font-space font-bold mb-1">{contact.value}</p>
                <p className="text-xs text-muted-foreground font-dm">{contact.description}</p>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <form className="glass-card p-8 md:p-12 rounded-3xl border-2 border-primary/30 hover:border-primary hover:glow-primary transition-all duration-500 scale-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="flex items-center gap-2 mb-8">
              <Sparkles className="w-6 h-6 text-primary" />
              <h2 className="text-3xl font-bebas gradient-text">SEND US A MESSAGE</h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-space font-bold mb-2 text-foreground">YOUR NAME</label>
                <input
                  type="text"
                  placeholder="What should we call you?"
                  className="w-full px-6 py-4 glass-card border border-primary/30 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all font-dm"
                />
              </div>

              <div>
                <label className="block text-sm font-space font-bold mb-2 text-foreground">EMAIL</label>
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  className="w-full px-6 py-4 glass-card border border-primary/30 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all font-dm"
                />
              </div>

              <div>
                <label className="block text-sm font-space font-bold mb-2 text-foreground">MESSAGE</label>
                <textarea
                  rows={6}
                  placeholder="Tell us what's on your mind..."
                  className="w-full px-6 py-4 glass-card border border-primary/30 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all font-dm resize-none"
                />
              </div>

              <button
                type="submit"
                className="group w-full px-8 py-5 bg-gradient-to-r from-primary to-accent text-white rounded-2xl font-space font-bold text-lg hover:scale-105 hover:rotate-1 transition-all duration-300 glow-primary shadow-2xl flex items-center justify-center gap-3"
              >
                <Send className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                SEND MESSAGE
              </button>
            </div>
          </form>

          {/* Social CTA */}
          <div className="mt-16 text-center glass-card p-8 rounded-2xl">
            <p className="text-lg text-muted-foreground font-dm mb-4">
              Prefer social? Follow for launches and updates.
            </p>
            <div className="flex items-center justify-center gap-4">
              <a
                href="https://www.instagram.com/xperfumes.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 glass-card hover:bg-primary/20 rounded-xl font-space font-bold text-sm hover:scale-105 transition-all duration-300"
              >
                Instagram
              </a>
              <a
                href="#"
                className="px-6 py-3 glass-card hover:bg-primary/20 rounded-xl font-space font-bold text-sm hover:scale-105 transition-all duration-300"
              >
                Twitter
              </a>
              <a
                href="#"
                className="px-6 py-3 glass-card hover:bg-primary/20 rounded-xl font-space font-bold text-sm hover:scale-105 transition-all duration-300"
              >
                TikTok
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
