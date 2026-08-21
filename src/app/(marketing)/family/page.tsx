import React from 'react';
import Link from 'next/link';
import { WaitlistForm } from '@/components/marketing/WaitlistForm';
import { FAQAccordion } from '@/components/marketing/FAQAccordion';
import { FamilyStarFlowCanvas } from '@/components/3d/FamilyStarFlowCanvas';
import { 
  FadeIn, 
  TextReveal, 
  ScrollReveal, 
  StaggerContainer, 
  StaggerItem
} from '@/components/animations/MotionWrappers';
import { 
  Sparkles, 
  Star, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Gift, 
  Target, 
  Heart, 
  Users, 
  Lock,
  Layers
} from 'lucide-react';

export default function FamilyPage() {
  return (
    <div className="space-y-12 sm:space-y-20 pb-20 overflow-hidden relative">
      {/* 1. HERO SECTION WITH 3D STAR FLOW */}
      <section className="relative pt-2 sm:pt-4 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 max-w-6xl mx-auto h-[480px] pointer-events-none z-0 opacity-70 dark:opacity-90">
          <FamilyStarFlowCanvas />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-4 sm:space-y-6">
          <FadeIn delay={0.05}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 dark:bg-sky-950/60 border border-brand-sky/20 text-brand-sky text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Family Financial Education</span>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <h1 className="text-4xl sm:text-6xl font-serif font-bold text-brand-navy dark:text-white tracking-tight leading-tight">
              <TextReveal text="Money habits start early." />
              <span className="block text-brand-sky mt-2 italic font-normal">
                <TextReveal text="Give them a better place to begin." delay={0.25} />
              </span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="max-w-2xl mx-auto text-base sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
              FirstSavvy gives kids a practical way to experience responsibility, earning, saving, and progress, while parents stay connected and in control. It starts with stars and grows into real financial understanding.
            </p>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/signup"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-brand-navy hover:bg-brand-navyDark text-white text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-200 inline-flex items-center justify-center gap-2"
              >
                <span>Create a Child Profile</span>
                <ArrowRight className="w-5 h-5 text-brand-sky" />
              </Link>
            </div>
          </FadeIn>
        </div>

        {/* Visual Family Hub Mockup */}
        <ScrollReveal delay={0.3} direction="up">
          <div className="mt-12 max-w-4xl mx-auto p-6 sm:p-8 rounded-3xl bg-white/90 dark:bg-[#1E293B]/90 backdrop-blur-md border border-slate-200 dark:border-slate-800 shadow-xl grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-4 rounded-2xl bg-sky-50/60 dark:bg-sky-950/40 border border-brand-sky/20 space-y-2 text-center hover:scale-105 transition-transform">
              <div className="w-10 h-10 rounded-full bg-brand-sky text-white flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div className="font-bold text-sm text-brand-navy dark:text-white">Everyday Tasks</div>
              <div className="text-xs text-slate-500">Chores, homework & responsibilities tailored by age.</div>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/40 border border-amber-300/30 space-y-2 text-center hover:scale-105 transition-transform">
              <div className="w-10 h-10 rounded-full bg-amber-400 text-slate-900 flex items-center justify-center mx-auto">
                <Star className="w-5 h-5 fill-slate-900" />
              </div>
              <div className="font-bold text-sm text-brand-navy dark:text-white">Star Rewards Ledger</div>
              <div className="text-xs text-slate-500">Immutable ledger that connects effort directly to earning.</div>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-300/30 space-y-2 text-center hover:scale-105 transition-transform">
              <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto">
                <Target className="w-5 h-5" />
              </div>
              <div className="font-bold text-sm text-brand-navy dark:text-white">Goal Building</div>
              <div className="text-xs text-slate-500">Learning delayed gratification and saving patience.</div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 2. SECTION: IT STARTS WITH RESPONSIBILITY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal direction="left" className="space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-sky">It Starts With Responsibility</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-brand-navy dark:text-white">
              <TextReveal text="Before kids manage money, they can learn what it means to earn it." />
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
              Create everyday tasks and responsibilities your child can understand and complete. As they make progress, they begin connecting effort with earning and seeing that money is something to understand, not simply receive.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {['Tasks', 'Responsibilities', 'Progress'].map((label) => (
                <span key={label} className="px-3.5 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-brand-navy dark:text-slate-200">
                  {label}
                </span>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div className="p-8 rounded-3xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 hover:shadow-md transition-shadow duration-300">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Sample Assigned Tasks</div>
                <div className="space-y-3">
                  {[
                    { title: 'Tidy Bedroom & Make Bed', stars: '2 Stars', schedule: 'Daily' },
                    { title: 'Feed & Walk the Family Pet', stars: '3 Stars', schedule: 'Daily' },
                    { title: 'Complete Math & Reading Time', stars: '4 Stars', schedule: 'Weekdays' },
                  ].map((t, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 text-xs">
                      <div className="flex items-center gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-brand-sky" />
                        <div>
                          <div className="font-bold text-slate-800 dark:text-slate-200">{t.title}</div>
                          <div className="text-[10px] text-slate-500">{t.schedule}</div>
                        </div>
                      </div>
                      <span className="font-bold text-amber-500 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/50 px-2 py-1 rounded">
                        +{t.stars}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 3. SECTION: FROM STARS TO REWARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="scale">
          <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-br from-brand-navy to-brand-navyDark text-white shadow-xl text-center max-w-4xl mx-auto space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-softBlue">From Stars to Rewards</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold">
              <TextReveal text="Make progress visible. Let accomplishment mean something." />
            </h2>
            <p className="text-slate-200 text-base sm:text-lg leading-relaxed">
              For younger children, the journey can start simply: complete a task, earn stars, and work toward a reward. As they grow, those early experiences can progress toward allowances, saving, and more meaningful money decisions.
            </p>
            <div className="pt-2 text-sm font-serif italic text-brand-sky font-bold">
              First the stars. Then the lesson behind them.
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 4. SECTION: ALLOWANCES AND GOALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="p-8 rounded-3xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <div className="font-serif font-bold text-lg text-brand-navy dark:text-white">Goal: Mountain Bike</div>
                <div className="text-xs text-slate-500">Leo's Personal Goal • Target: 80 Stars</div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-600 dark:text-slate-300">Progress</span>
                <span className="text-brand-sky">42 / 80 Stars (52%)</span>
              </div>
              <div className="w-full h-3 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-brand-sky to-emerald-500 rounded-full" style={{ width: '52%' }} />
              </div>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 italic">
              "Goals introduce another important lesson: not everything needs to happen today."
            </p>
          </div>

          <div className="space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-sky">Allowances and Goals</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-brand-navy dark:text-white">
              More than simply handing over money. Give it a purpose.
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
              FirstSavvy helps turn allowances into part of a larger financial experience. Kids can see what they are earning, understand what they have available, and work toward things that matter to them. Goals introduce another important lesson: not everything needs to happen today.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {['Earn', 'Save', 'Work Toward Something'].map((label) => (
                <span key={label} className="px-3.5 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-brand-navy dark:text-slate-200">
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. SECTION: THEIR EXPERIENCE vs BUILT FOR PARENTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 rounded-3xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-sky">Their Experience</span>
          <h3 className="text-2xl font-serif font-bold text-brand-navy dark:text-white">
            Simple enough for them. Separate from yours.
          </h3>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            Kids get their own supervised space centered around tasks, stars, rewards, allowances, and goals without gaining access to the broader financial world their parents manage. The experience is theirs. The control stays with you.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">Built for Parents Too</span>
          <h3 className="text-2xl font-serif font-bold text-brand-navy dark:text-white">
            Their independence. Your visibility.
          </h3>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            Create child profiles, assign responsibilities, review completed tasks, manage allowances and rewards, and control how each child participates. FirstSavvy gives kids room to learn while keeping parents connected to the experience. Different access. Same family.
          </p>
          <div className="pt-2">
            <Link href="/signup" className="text-xs font-bold text-brand-sky hover:underline">
              Get Started as a Parent →
            </Link>
          </div>
        </div>
      </section>

      {/* 6. SECTION: MORE THAN MONEY & GROWING WITH THEM */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-14 rounded-3xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 text-center max-w-4xl mx-auto space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-sky">More Than Money</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-brand-navy dark:text-white">
            The lesson goes beyond dollars. Build the habits behind better financial decisions.
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
            Responsibility. Patience. Choices. Progress. Everyday moments can become opportunities to help children understand how earning works, why saving matters, and what it means to work toward something over time. The goal is not simply to teach them what money is worth. It is to help them understand what goes into building it.
          </p>

          <div className="pt-6 border-t border-slate-200 dark:border-slate-700 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Growing With Them</div>
            <h3 className="text-xl font-serif font-bold text-brand-navy dark:text-white">
              What they need today will not be what they need tomorrow. Start simple. Build from there.
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm max-w-2xl mx-auto">
              A first task can become a first reward. Stars can lead to allowances. Small savings goals can eventually become bigger financial conversations. FirstSavvy is designed around that progression, helping parents introduce financial responsibility in ways that make sense as their children grow.
            </p>
            <div className="text-xs font-serif italic font-bold text-brand-sky pt-2">
              From their first stars to their first real financial decisions.
            </div>
          </div>
        </div>
      </section>

      {/* 7. FAMILY FAQ SECTION */}
      <FAQAccordion
        eyebrow="Family & Kid Space FAQs"
        title="Frequently Asked Questions About Family Tools"
        subtitle="Everything parents want to know about stars, chore routines, child safety, and allowance tracking."
        items={[
          {
            question: 'How do kids earn and redeem stars for real rewards in FirstSavvy?',
            answer:
              'Parents set up age-appropriate chores and responsibilities with assigned star values. When a child marks a chore done in their Kid Space, parents review and approve it. Accumulated stars can be redeemed for parent-created custom rewards (like movie nights, toy purchases, or special outings) or converted into savings goals.',
          },
          {
            question: 'What parental controls and PIN protections are in place for child accounts?',
            answer:
              'Each child account is secured with a simple 4-digit PIN configured by parents. Children only see their assigned chores, star balance, personal wishlists, and rewards. They never see adult bank account balances, sensitive transactions, or household net worth.',
          },
          {
            question: 'How does FirstSavvy comply with the Children’s Online Privacy Protection Act (COPPA)?',
            answer:
              'Before any child profile can be created, parents must review and complete a verifiable parental consent check. FirstSavvy does not collect emails, phone numbers, location data, or behavioral tracking information from children.',
          },
          {
            question: 'Can I automate weekly allowance payouts alongside chore earnings?',
            answer:
              'Yes! FirstSavvy allows parents to schedule recurring allowances (weekly, bi-weekly, or monthly) with optional conditional chore-completion thresholds.',
          },
          {
            question: 'What ages is the FirstSavvy Family experience built for?',
            answer:
              'FirstSavvy is tailored for kids aged 5 to 17. Younger children engage through visual 3D star trophies and fun rewards, while teenagers can track monetary savings goals, chores, and basic budgeting habits as they prepare for adulthood.',
          },
        ]}
      />

      {/* 8. FEATURE UPDATES */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 shadow-sm text-center space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-sky">Feature Updates</span>
          <h2 className="text-3xl font-serif font-bold text-brand-navy dark:text-white">
            There is more ahead. Want to see what comes next?
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
            We're continuing to explore new ways for families to build financial understanding together. Join the feature updates list and be among the first to hear when new FirstSavvy Family experiences become available.
          </p>
          <div className="max-w-md mx-auto pt-2">
            <WaitlistForm category="family" buttonText="Join Feature Updates" />
          </div>
        </div>
      </section>

      {/* 8. FINAL CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-14 rounded-3xl bg-brand-navy text-white shadow-2xl text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold">
            What they learn about money starts long before their first paycheck. Help them start well.
          </h2>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Give your child a practical place to learn responsibility, earning, saving, and progress while you stay connected along the way.
          </p>
          <div className="pt-4">
            <Link
              href="/signup"
              className="px-8 py-4 rounded-xl bg-brand-sky hover:bg-brand-blue text-white text-base font-semibold shadow-lg transition-all duration-200 inline-flex items-center gap-2"
            >
              <span>Start Their Money Journey</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
