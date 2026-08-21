import React from 'react';
import Link from 'next/link';
import { HeroPreview } from '@/components/marketing/HeroPreview';
import { HowItWorks } from '@/components/marketing/HowItWorks';
import { WaitlistForm } from '@/components/marketing/WaitlistForm';
import { HeroConstellationCanvas } from '@/components/3d/HeroConstellationCanvas';
import { FAQAccordion } from '@/components/marketing/FAQAccordion';
import { 
  FadeIn, 
  AuroraBackground, 
  FloatingBadge, 
  CountUp,
  TextReveal,
  ScrollReveal,
  StaggerContainer,
  StaggerItem
} from '@/components/animations/MotionWrappers';
import { 
  ArrowRight, 
  Sparkles, 
  Wallet, 
  ShieldCheck, 
  TrendingUp, 
  CheckCircle2, 
  Users, 
  Calendar,
  Layers,
  Star,
  Lock,
  DollarSign
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="space-y-12 sm:space-y-20 pb-20 overflow-hidden relative">
      <AuroraBackground />

      {/* 1. HERO SECTION */}
      <section className="relative pt-2 sm:pt-4 px-4 sm:px-6 lg:px-8">
        <HeroConstellationCanvas />
        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-3 sm:space-y-4">
          {/* Eyebrow */}
          <FadeIn delay={0.05}>
            <FloatingBadge duration={5} className="inline-block">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-sky/10 border border-brand-sky/25 text-brand-navy dark:text-brand-softBlue text-xs font-bold tracking-wider uppercase backdrop-blur-md shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-brand-sky" />
                <span>FirstSavvy — Stars to Legacy</span>
              </div>
            </FloatingBadge>
          </FadeIn>

          {/* Headline */}
          <FadeIn delay={0.15}>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold text-brand-navy dark:text-white tracking-tight leading-[1.1]">
              <TextReveal text="Your family. Your money." />
              <span className="block mt-2 text-brand-sky font-normal italic">
                <TextReveal text="From stars to legacy." delay={0.3} />
              </span>
            </h1>
          </FadeIn>

          {/* Body */}
          <FadeIn delay={0.3}>
            <p className="max-w-3xl mx-auto text-base sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
              FirstSavvy brings family money management and personal finance into one connected experience. 
              See your accounts, budgets, transactions, bills, and net worth in one place, while giving your kids a practical way to learn earning, saving, responsibility, and progress.
            </p>
          </FadeIn>

          <FadeIn delay={0.4}>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
              As life becomes more complex, FirstSavvy is designed to grow with you.
            </p>
          </FadeIn>

          {/* CTAs */}
          <FadeIn delay={0.5}>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/signup"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-brand-navy hover:bg-brand-navyDark text-white text-base font-semibold shadow-lg hover:shadow-2xl transition-all duration-200 hover:-translate-y-1 inline-flex items-center justify-center gap-3 group"
              >
                <span>Get Started for Free</span>
                <ArrowRight className="w-5 h-5 text-brand-sky group-hover:translate-x-1 transition-transform" />
              </Link>

              <a
                href="#how-it-works"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-md hover:bg-slate-50 dark:hover:bg-slate-700 text-brand-navy dark:text-white border border-slate-300/80 dark:border-slate-700 text-base font-semibold shadow-sm transition-all duration-200 inline-flex items-center justify-center"
              >
                See How It Works
              </a>
            </div>
          </FadeIn>

          <FadeIn delay={0.6}>
            <div className="pt-2 text-xs font-semibold uppercase tracking-widest text-brand-sky">
              Built for the way money actually moves through life.
            </div>
          </FadeIn>
        </div>

        {/* Hero Composed Product UI Preview */}
        <ScrollReveal delay={0.2} direction="up" distance={30}>
          <div className="mt-12 sm:mt-16">
            <HeroPreview />
          </div>
        </ScrollReveal>

        {/* Dynamic Animated Platform Statistics Strip */}
        <ScrollReveal delay={0.3} direction="up">
          <div className="mt-14 max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 px-4">
            <div className="p-4 rounded-2xl bg-white/70 dark:bg-[#1E293B]/70 backdrop-blur-md border border-slate-200/80 dark:border-slate-700 text-center shadow-xs">
              <div className="text-2xl sm:text-3xl font-bold font-serif text-brand-navy dark:text-white">
                $<CountUp value={14} suffix=".2M+" />
              </div>
              <div className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider mt-1">Household Wealth Tracked</div>
            </div>

            <div className="p-4 rounded-2xl bg-white/70 dark:bg-[#1E293B]/70 backdrop-blur-md border border-slate-200/80 dark:border-slate-700 text-center shadow-xs">
              <div className="text-2xl sm:text-3xl font-bold font-serif text-brand-sky">
                <CountUp value={28500} suffix="+" />
              </div>
              <div className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider mt-1">Chores & Stars Earned</div>
            </div>

            <div className="p-4 rounded-2xl bg-white/70 dark:bg-[#1E293B]/70 backdrop-blur-md border border-slate-200/80 dark:border-slate-700 text-center shadow-xs">
              <div className="text-2xl sm:text-3xl font-bold font-serif text-emerald-600 dark:text-emerald-400">
                <CountUp value={99} suffix=".9%" decimals={1} />
              </div>
              <div className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider mt-1">Plaid Bank Encryption</div>
            </div>

            <div className="p-4 rounded-2xl bg-white/70 dark:bg-[#1E293B]/70 backdrop-blur-md border border-slate-200/80 dark:border-slate-700 text-center shadow-xs">
              <div className="text-2xl sm:text-3xl font-bold font-serif text-amber-500">
                <CountUp value={100} suffix="%" />
              </div>
              <div className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider mt-1">COPPA Child Safe</div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 2. SECTION: MONEY IS CONNECTED */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up">
          <div className="p-8 sm:p-14 rounded-3xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 shadow-sm text-center space-y-4 hover:shadow-md transition-shadow duration-300">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-sky">Money is connected</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-brand-navy dark:text-white">
              <TextReveal text="Your financial tools should be too." />
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              A task completed by your child, an allowance earned, a bill coming due, a balance growing, and a financial goal getting closer may look like separate moments. FirstSavvy brings them into a more connected financial experience.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* 3. SECTION: THE FIRSTSAVVY WAY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-sky">The FirstSavvy Way</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-brand-navy dark:text-white mt-2">
              <TextReveal text="More than tracking money. Learn it. Manage it. Grow it." />
            </h2>
          </div>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <StaggerItem>
            <div className="p-8 rounded-2xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 hover:border-brand-sky/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-sky-50 dark:bg-sky-950/60 flex items-center justify-center text-brand-sky">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif font-bold text-brand-navy dark:text-white">Learn It</h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                Learn real money skills through earning, saving, responsibility, and working toward goals.
              </p>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="p-8 rounded-2xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 hover:border-emerald-500/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600">
                <Wallet className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif font-bold text-brand-navy dark:text-white">Manage It</h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                Manage accounts, transactions, budgets, and recurring financial activity in one place.
              </p>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="p-8 rounded-2xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 hover:border-brand-softBlue/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-navy-50 dark:bg-slate-800 flex items-center justify-center text-brand-navy dark:text-brand-softBlue">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif font-bold text-brand-navy dark:text-white">Grow It</h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                Grow your understanding of net worth and the bigger financial picture as life changes.
              </p>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </section>

      {/* 4. SECTION: PERSONAL FINANCE HIGHLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider">
              <Wallet className="w-3.5 h-3.5" />
              <span>Personal Finance</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-brand-navy dark:text-white leading-tight">
              Now look at the bigger picture. Know what your money is doing.
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
              FirstSavvy brings accounts, transactions, budgets, recurring activity, and net worth into one organized view, helping you understand what came in, what went out, what is coming next, and how your overall financial position is changing.
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {['Accounts', 'Transactions', 'Budgets', 'Recurring Activity', 'Net Worth'].map((label) => (
                <span key={label} className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-brand-navy dark:text-slate-200">
                  {label}
                </span>
              ))}
            </div>

            <div className="pt-2">
              <Link
                href="/personal-finance"
                className="inline-flex items-center gap-2 text-sm font-bold text-brand-sky hover:text-brand-navyDark transition-colors group"
              >
                <span>Explore Personal Finance</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-gradient-to-br from-brand-navy to-brand-navyDark text-white shadow-xl space-y-6">
            <div className="text-xs font-bold uppercase tracking-wider text-brand-softBlue">Your Money, in One View</div>
            <h3 className="text-2xl font-serif font-bold leading-snug">
              Stop checking five places to understand one financial picture. See where you stand.
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Bring connected and manually managed accounts into one financial view. Review balances, organize transactions, identify recurring activity, and reduce repetitive financial organization without piecing everything together across different apps and spreadsheets.
            </p>
            <div className="pt-4 border-t border-slate-700">
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-brand-sky hover:bg-brand-blue text-white text-xs font-bold shadow transition-colors"
              >
                <span>See Your Financial Picture</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SECTION: FAMILY EXPERIENCE HIGHLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 p-8 rounded-3xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div className="text-xs font-bold uppercase tracking-wider text-brand-sky">Built for Parents Too</div>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-brand-navy dark:text-white leading-snug">
              Their independence. Your visibility.
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              Children get a simpler financial experience designed around what matters to them, without gaining access to the parent's broader financial environment. Parents keep the visibility and control needed to guide the experience. Different access. Same family.
            </p>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              <div className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                COPPA-compliant parental consent workflow with audit trails and isolated permissions.
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 dark:bg-sky-950/50 text-brand-sky text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Family Experience</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-brand-navy dark:text-white leading-tight">
              Money habits start before the first paycheck. Let kids learn by doing.
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
              FirstSavvy gives children a supervised way to build real money skills through everyday responsibility. It starts with stars. Kids complete tasks, earn rewards, receive allowances, save toward goals, and gradually begin understanding the relationship between responsibility and money. Parents stay connected with control over profiles, tasks, allowances, rewards, permissions, and approvals.
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {['Tasks', 'Stars and Rewards', 'Allowances', 'Goals'].map((label) => (
                <span key={label} className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-brand-navy dark:text-slate-200">
                  {label}
                </span>
              ))}
            </div>

            <div className="pt-2">
              <Link
                href="/family"
                className="inline-flex items-center gap-2 text-sm font-bold text-brand-sky hover:text-brand-navyDark transition-colors group"
              >
                <span>Explore Family</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SECTION: SEE MORE THAN A BALANCE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-14 rounded-3xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 shadow-sm text-center max-w-4xl mx-auto space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-sky">See More Than a Balance</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-brand-navy dark:text-white">
            Your balance is not your financial position. See the number behind the numbers.
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
            FirstSavvy brings assets and liabilities together so you can understand your net worth and follow how your financial position changes over time. Budgeting adds context by showing how what you planned compares with what actually happened. Your financial calendar helps you see recurring bills, income, and important dates before they arrive.
          </p>
          <div className="pt-2 text-sm font-serif italic text-brand-sky font-semibold">
            Know where you stand. See what comes next.
          </div>
        </div>
      </section>

      {/* 7. SECTION: BUILT TO GROW WITH YOU */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-br from-brand-navy to-brand-navyDark text-white shadow-xl text-center max-w-4xl mx-auto space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-softBlue">Built to Grow With You</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold">
            Your financial life evolves. FirstSavvy is designed to grow with it.
          </h2>
          <p className="text-slate-200 text-base sm:text-lg leading-relaxed">
            What begins with a child earning their first stars can grow into a deeper understanding of money, greater clarity around personal finances, increasingly complex financial lives, and eventually the decisions surrounding what you build and leave behind.
          </p>
          <div className="pt-4 text-base font-serif italic text-brand-sky font-bold">
            From stars to legacy.
          </div>
        </div>
      </section>

      {/* 8. INTERACTIVE HOW IT WORKS SEQUENCE */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <HowItWorks />
      </section>

      {/* 9. PLATFORM FAQ SECTION */}
      <FAQAccordion
        eyebrow="Platform FAQs"
        title="Frequently Asked Questions"
        subtitle="Common questions about how FirstSavvy unifies family chore routines and adult household finances."
        items={[
          {
            question: 'How does FirstSavvy combine family chore tracking with adult personal finance?',
            answer:
              'FirstSavvy connects household routines with real financial management in a single platform. Parents manage real-world accounts, budgets, bills, and net worth in their private dashboard, while assigning supervised chores, stars, allowances, and savings goals to kids in a dedicated, age-appropriate Kid Space.',
          },
          {
            question: 'Is my banking information secure and encrypted?',
            answer:
              'Yes. FirstSavvy uses bank-grade 256-bit AES encryption and integrates with Plaid to securely connect your accounts in read-only mode. We never store or access your banking credentials.',
          },
          {
            question: 'Can both parents manage the household together?',
            answer:
              'Absolutely. FirstSavvy supports multi-parent households where both parents can create chores, approve star redemptions, adjust budgets, and review family financial progress collaboratively.',
          },
          {
            question: 'Is FirstSavvy compliant with child privacy laws (COPPA)?',
            answer:
              'Yes, 100%. We enforce verifiable parental consent before creating any child profile. We never collect personal contact information, emails, or behavioral ad data from children.',
          },
          {
            question: 'Can I start using FirstSavvy for free?',
            answer:
              'Yes! You can get started for free immediately during our early access release with full access to family chore routines, star ledgers, budget planning, and manual account tracking.',
          },
        ]}
      />

      {/* 10. SECTION: FEATURE UPDATES WAITLIST */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 shadow-sm text-center space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-sky">Feature Updates</span>
          <h2 className="text-3xl font-serif font-bold text-brand-navy dark:text-white">
            Want to know what FirstSavvy builds next?
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
            Join the feature updates waitlist and be the first to hear when new Family tools and experiences become available.
          </p>
          <div className="max-w-md mx-auto pt-2">
            <WaitlistForm category="feature_updates" buttonText="Join the Waitlist" />
          </div>
        </div>
      </section>

      {/* 11. SECTION: EARLY ACCESS */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-14 rounded-3xl bg-slate-900 text-white shadow-2xl text-center space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Sparkles className="w-48 h-48" />
          </div>

          <span className="text-xs font-bold uppercase tracking-widest text-brand-sky relative z-10">Early Access</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold relative z-10">
            FirstSavvy is entering its first chapter. Be early enough to help shape the next one.
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed relative z-10">
            We're opening FirstSavvy to an initial group of users as we refine the experience around real families and real financial lives. How early users experience the platform, what they return to, and the feedback they share will help guide how FirstSavvy continues to evolve.
          </p>
          <div className="pt-4 relative z-10">
            <Link
              href="/signup"
              className="px-8 py-4 rounded-xl bg-brand-sky hover:bg-brand-blue text-white text-base font-semibold shadow-lg transition-all duration-200 inline-flex items-center gap-2"
            >
              <span>Get Started for Free</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
