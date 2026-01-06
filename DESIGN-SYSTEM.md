# 🎨 NOXÉRA Design System

## Color Palette

### Primary Colors
```css
--primary: #ff0080        /* Hot Pink - Main brand color */
--primary-foreground: #ffffff

--accent: #00f0ff         /* Neon Cyan - Secondary accent */
--accent-foreground: #0a0a0f

--background: #0a0a0f     /* Deep Dark */
--foreground: #ffffff     /* White */
```

### UI Colors
```css
--card: #15151f
--secondary: #1f1f2e
--muted: #2a2a3e
--muted-foreground: #a0a0b8
--border: #2a2a3e
--destructive: #ff3366
```

### Additional Neon Colors
```css
--neon-yellow: #ffff00
--neon-green: #00ff88
--hot-pink: #ff006e
--electric-blue: #0066ff
```

## Typography

### Font Families
```typescript
--font-space-grotesk: "Space Grotesk"  // Headings, labels
--font-dm-sans: "DM Sans"              // Body text
--font-bebas: "Bebas Neue"             // Display text
```

### Font Classes
```css
.font-space    /* Space Grotesk */
.font-dm       /* DM Sans */
.font-bebas    /* Bebas Neue */
```

### Type Scale
```css
text-xs: 0.75rem      /* 12px */
text-sm: 0.875rem     /* 14px */
text-base: 1rem       /* 16px */
text-lg: 1.125rem     /* 18px */
text-xl: 1.25rem      /* 20px */
text-2xl: 1.5rem      /* 24px */
text-3xl: 1.875rem    /* 30px */
text-4xl: 2.25rem     /* 36px */
text-5xl: 3rem        /* 48px */
text-6xl: 3.75rem     /* 60px */
text-7xl: 4.5rem      /* 72px */
text-8xl: 6rem        /* 96px */
text-9xl: 8rem        /* 128px */
```

## Spacing

### Border Radius
```css
--radius: 1rem          /* 16px */
--radius-sm: 0.75rem    /* 12px */
--radius-md: 0.875rem   /* 14px */
--radius-lg: 1rem       /* 16px */
--radius-xl: 1.25rem    /* 20px */

rounded-xl: 0.75rem     /* 12px */
rounded-2xl: 1rem       /* 16px */
rounded-3xl: 1.5rem     /* 24px */
```

### Spacing Scale
```css
p-4: 1rem      /* 16px */
p-6: 1.5rem    /* 24px */
p-8: 2rem      /* 32px */
p-12: 3rem     /* 48px */
p-16: 4rem     /* 64px */
```

## Effects

### Glassmorphism
```css
.glass {
  background: rgba(26, 26, 40, 0.7);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.glass-card {
  background: rgba(21, 21, 31, 0.8);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 0, 128, 0.2);
}
```

### Glow Effects
```css
.glow-primary {
  box-shadow:
    0 0 30px rgba(255, 0, 128, 0.5),
    0 0 60px rgba(255, 0, 128, 0.3),
    0 0 90px rgba(255, 0, 128, 0.1);
}

.glow-accent {
  box-shadow:
    0 0 30px rgba(0, 240, 255, 0.5),
    0 0 60px rgba(0, 240, 255, 0.3),
    0 0 90px rgba(0, 240, 255, 0.1);
}

.glow-subtle {
  box-shadow:
    0 0 20px rgba(255, 0, 128, 0.2),
    0 0 40px rgba(0, 240, 255, 0.1);
}
```

### Text Effects
```css
.gradient-text {
  background: linear-gradient(135deg, #ff0080 0%, #00f0ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.gradient-text-alt {
  background: linear-gradient(135deg, #00f0ff 0%, #ffff00 50%, #ff0080 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.text-glow {
  text-shadow:
    0 0 20px rgba(255, 0, 128, 0.5),
    0 0 40px rgba(255, 0, 128, 0.3);
}
```

## Animations

### Transitions
```css
.transition-smooth {
  transition: all 500ms ease-out;
}

.transition-fast {
  transition: all 300ms ease-out;
}

.transition-bounce {
  transition: all 500ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
```

### Keyframe Animations
```css
/* Floating */
.float {
  animation: float 6s ease-in-out infinite;
}

/* Pulse Glow */
.pulse-glow {
  animation: pulse-glow 2s ease-in-out infinite;
}

/* Slide In Bottom */
.slide-in-bottom {
  animation: slide-in-bottom 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}

/* Scale Fade In */
.scale-fade-in {
  animation: scale-fade-in 0.5s cubic-bezier(0.39, 0.575, 0.565, 1) both;
}

/* Animated Gradient */
.animated-gradient {
  background: linear-gradient(-45deg, #ff0080, #ff006e, #0066ff, #00f0ff);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
}
```

### Hover Effects
```css
.hover-lift:hover {
  transform: translateY(-0.5rem);
}

.hover-scale:hover {
  transform: scale(1.05);
}

.hover-glow:hover {
  /* Applies glow-primary */
}
```

## Components

### Button Styles

#### Primary Button
```jsx
<button className="px-10 py-5 bg-gradient-to-r from-primary to-accent text-white rounded-2xl font-space font-bold text-lg hover:scale-110 hover:rotate-1 transition-all duration-300 glow-primary shadow-2xl">
  BUTTON TEXT
</button>
```

#### Secondary Button
```jsx
<button className="px-8 py-4 glass-card border-2 border-primary/50 hover:bg-primary/20 rounded-xl font-space font-bold hover:scale-105 transition-all duration-300">
  BUTTON TEXT
</button>
```

#### Icon Button
```jsx
<button className="p-3 glass-card rounded-xl hover:scale-110 hover:glow-primary transition-all duration-300">
  <Icon className="w-5 h-5" />
</button>
```

### Card Styles

#### Glass Card
```jsx
<div className="glass-card p-8 rounded-3xl hover:glow-subtle transition-all duration-500 hover:-translate-y-2">
  {/* Content */}
</div>
```

#### Product Card
```jsx
<div className="glass-card rounded-3xl overflow-hidden hover:glow-subtle transition-all duration-500 hover:-translate-y-2">
  {/* Image */}
  <div className="relative h-72 bg-gradient-to-b from-secondary/50 to-background">
    {/* ... */}
  </div>
  {/* Content */}
  <div className="p-6">
    {/* ... */}
  </div>
</div>
```

### Badge Styles

#### Gradient Badge
```jsx
<div className="inline-flex items-center gap-2 px-6 py-3 glass-card rounded-full border border-primary/30">
  <Sparkles className="w-5 h-5 text-primary animate-pulse" />
  <span className="text-sm font-space font-bold tracking-widest gradient-text">
    BADGE TEXT
  </span>
</div>
```

#### Discount Badge
```jsx
<div className="px-4 py-2 bg-gradient-to-r from-primary to-accent text-white rounded-full text-sm font-space font-bold pulse-glow">
  SAVE 25%
</div>
```

### Input Styles

#### Text Input
```jsx
<input
  type="text"
  className="w-full px-6 py-4 glass-card border border-primary/30 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all font-dm"
/>
```

#### Textarea
```jsx
<textarea
  className="w-full px-6 py-4 glass-card border border-primary/30 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all font-dm resize-none"
/>
```

## Icons

### Recommended Icons
- `Sparkles` - Premium, special
- `Zap` - Fast, energy
- `Heart` - Love, favorite
- `Star` - Rating, featured
- `ShoppingBag` - Cart, purchase
- `Gift` - Bundle, offer
- `Mail` - Email, contact
- `MessageCircle` - Chat, FAQ
- `ChevronRight` - Navigation
- `Plus/Minus` - Quantity
- `X` - Close, remove

### Icon Sizes
```css
w-3 h-3: 12px
w-4 h-4: 16px
w-5 h-5: 20px
w-6 h-6: 24px
w-8 h-8: 32px
```

## Emojis

### Strategic Emoji Use
```
🔥 - Fire, hot, trending
✨ - Sparkle, magic, special
💫 - Stars, cosmic, unique
🚀 - Launch, fast, growth
💜 - Love, brand color
🎁 - Gift, bundle, offer
💯 - 100%, authentic
🌙 - Night, evening
⏰ - Time, duration
📦 - Shipping, delivery
💚 - Eco, sustainable
🎨 - Creative, custom
💬 - Chat, conversation
💡 - Idea, tip
🤝 - Partnership, trust
```

## Layout Patterns

### Hero Section
```jsx
<section className="relative min-h-screen flex items-center justify-center overflow-hidden">
  <div className="absolute inset-0 animated-gradient opacity-20" />
  <div className="absolute top-20 right-20 w-96 h-96 bg-primary/30 rounded-full blur-3xl float opacity-40" />
  <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
    {/* Content */}
  </div>
</section>
```

### Section with Background
```jsx
<section className="relative py-32 px-4 overflow-hidden">
  <div className="absolute inset-0 opacity-20">
    <div className="absolute top-0 right-0 w-96 h-96 bg-primary/50 rounded-full blur-3xl pulse-glow" />
  </div>
  <div className="relative max-w-7xl mx-auto">
    {/* Content */}
  </div>
</section>
```

### Grid Layout
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {items.map((item, index) => (
    <div
      key={item.id}
      className="scale-fade-in"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Item */}
    </div>
  ))}
</div>
```

## Best Practices

### Do's ✅
- Use gradient text for headings
- Add glow effects on hover
- Include emojis strategically
- Use glassmorphism for overlays
- Animate on scroll/entrance
- Keep animations smooth (300-500ms)
- Use bold, large typography
- Add micro-interactions
- Make everything clickable feel responsive

### Don'ts ❌
- Don't overuse animations
- Don't use too many colors at once
- Don't make text too small
- Don't forget mobile responsiveness
- Don't use corporate language
- Don't skip hover states
- Don't make buttons too small
- Don't use boring gray

## Accessibility

### Focus States
Always include visible focus states:
```css
focus:outline-none focus:ring-2 focus:ring-primary/50
```

### Color Contrast
- Primary text on dark: WCAG AAA compliant
- All interactive elements have sufficient contrast
- Hover states are clearly visible

### Keyboard Navigation
- All interactive elements are keyboard accessible
- Tab order is logical
- Focus indicators are visible

## Responsive Breakpoints

```css
sm: 640px   /* Small devices */
md: 768px   /* Medium devices */
lg: 1024px  /* Large devices */
xl: 1280px  /* Extra large devices */
```

### Mobile-First Approach
```jsx
<div className="text-4xl md:text-6xl lg:text-8xl">
  {/* Scales up on larger screens */}
</div>
```

---

**Remember:** Keep it bold, keep it vibrant, keep it Gen Z! 🔥✨

