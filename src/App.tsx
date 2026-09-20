import { type ReactNode, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ArrowDown, ArrowUpRight, Check, ChevronDown, Clock3, Gift, Heart, Music2, RotateCcw, Send, Sparkles, Star, Ticket, Zap } from 'lucide-react';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();

const memories = [
  { date: 'THE EARLY DAYS', title: 'Somehow, the plan was “just one chai.”', copy: 'Three hours later, we had solved absolutely nothing and still decided it was a productive evening. Very on brand.', color: 'bg-[#f6c85f]', icon: Clock3 },
  { date: 'THE RUNNING JOKE', title: 'You are technically never late.', copy: 'You simply arrive during the extended opening ceremony. A distinction you have defended with remarkable commitment.', color: 'bg-[#d8674b]', icon: Star },
  { date: 'THE REAL THING', title: 'You make ordinary days less ordinary.', copy: 'You notice when someone is quiet. You remember the small stuff. You show up with snacks. This is the bit I hope you know I notice too.', color: 'bg-[#4e7e76]', icon: Heart },
];

const birthMonth = 8;
const birthDay = 20;
const birthYear = 2012;
const timeUnits = ['years', 'days', 'hours', 'minutes', 'seconds'] as const;
type TimeUnit = (typeof timeUnits)[number];

function getAgeParts(now: Date): Record<TimeUnit, number> {
  let years = now.getFullYear() - birthYear;
  const anniversaryThisYear = new Date(now.getFullYear(), birthMonth, birthDay);
  const hasHadBirthday = now >= anniversaryThisYear;

  if (!hasHadBirthday) years -= 1;

  const lastBirthday = new Date(
    hasHadBirthday ? now.getFullYear() : now.getFullYear() - 1,
    birthMonth,
    birthDay,
  );
  let remaining = Math.max(0, now.getTime() - lastBirthday.getTime());
  const day = 24 * 60 * 60 * 1000;
  const hour = 60 * 60 * 1000;
  const minute = 60 * 1000;

  const days = Math.floor(remaining / day);
  remaining -= days * day;
  const hours = Math.floor(remaining / hour);
  remaining -= hours * hour;
  const minutes = Math.floor(remaining / minute);
  remaining -= minutes * minute;
  const seconds = Math.floor(remaining / 1000);

  return { years, days, hours, minutes, seconds };
}

function Home() {
  const [opened, setOpened] = useState(false);
  const [memoryIndex, setMemoryIndex] = useState(0);
  const [wish, setWish] = useState('');
  const [sent, setSent] = useState(false);
  const [age, setAge] = useState(() => getAgeParts(new Date()));
  const [celebrating, setCelebrating] = useState(false);
  const memory = memories[memoryIndex];

  useEffect(() => {
    document.title = 'For Yuvraj, on his birthday';
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => setAge(getAgeParts(new Date())), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  const nextMemory = () => setMemoryIndex((current) => (current + 1) % memories.length);
  const launchCelebration = () => {
    setCelebrating(true);
    window.setTimeout(() => setCelebrating(false), 4200);
  };

  return (
    <main className="birthday-page min-h-[100dvh]">
      <nav className="section-shell relative z-20 flex items-center justify-between py-5" aria-label="Page navigation">
        <button data-testid="button-home" className="flex items-center gap-2 text-left" onClick={() => scrollTo('top')}>
          <span className="grid h-9 w-9 place-items-center rounded-full bg-[#d8674b] text-[#fff8eb] shadow-[3px_3px_0_#48242f]">
            <Gift size={17} strokeWidth={2.5} />
          </span>
          <span className="serif text-lg font-bold tracking-tight">a small thing for Y</span>
        </button>
        <button data-testid="button-nav-message" onClick={() => scrollTo('letter')} className="group hidden items-center gap-2 font-mono text-[.68rem] font-bold uppercase tracking-[.16em] text-[#6b4a4d] sm:flex">
          Skip to the good bit <ArrowDown size={14} className="transition-transform group-hover:translate-y-1" />
        </button>
      </nav>

      <section id="top" className="hero-grid section-shell relative mt-3 overflow-hidden rounded-[2rem] border border-[#d7c5ae] px-6 pb-12 pt-10 sm:px-12 sm:pb-16 sm:pt-14">
        <div className="pointer-events-none absolute -right-10 top-7 h-36 w-36 rounded-full border-[18px] border-[#d8674b]/20 sm:h-56 sm:w-56" />
        <div className="pointer-events-none absolute bottom-8 right-[13%] h-4 w-4 rotate-12 bg-[#4e7e76]" />
        <div className="pointer-events-none absolute left-[45%] top-8 h-3 w-12 -rotate-12 bg-[#d8674b]" />
        <div className="relative max-w-4xl">
          <div className="reveal flex items-center gap-3">
            <span className="eyebrow">A birthday field note · 08.11</span>
            <span className="h-px w-12 bg-[#d8674b]" />
          </div>
          <h1 className="reveal reveal-delay-1 serif mt-7 max-w-4xl text-[clamp(3.7rem,12vw,9.4rem)] font-bold leading-[.82] tracking-[-.07em] text-[#48242f]">
            Yuvraj,<br />
            <span className="text-[#d8674b]">you absolute</span><br />
            <span className="scribble">legend.</span>
          </h1>
          <div className="reveal reveal-delay-2 mt-9 grid max-w-2xl gap-8 sm:grid-cols-[1fr_auto] sm:items-end">
            <p className="max-w-lg text-base leading-7 text-[#6b4a4d] sm:text-lg">
              This is not a card. Cards are too easy to lose in a drawer. This is a tiny corner of the internet dedicated to the fact that knowing you has made life considerably funnier, kinder, and louder.
            </p>
            <button data-testid="button-scroll-story" onClick={() => scrollTo('evidence')} className="group flex w-fit items-center gap-3 rounded-full border border-[#48242f] bg-[#48242f] px-5 py-3 font-mono text-xs font-bold uppercase tracking-[.12em] text-[#fff8eb] transition-transform hover:-translate-y-1">
              Start the evidence <ArrowDown size={15} className="transition-transform group-hover:translate-y-1" />
            </button>
          </div>
        </div>
        <div className="reveal reveal-delay-3 mt-12 flex items-end justify-between gap-4 border-t border-[#d7c5ae] pt-4">
          <p className="max-w-xs font-mono text-[.65rem] uppercase leading-5 tracking-[.1em] text-[#9b7775]">Filed under: excellent people / questionable decisions / birthday business</p>
          <div className="hidden -rotate-3 rounded-sm bg-[#f6c85f] px-4 py-2 font-mono text-[.62rem] font-bold uppercase tracking-widest text-[#48242f] shadow-[3px_3px_0_#48242f] sm:block">Handle with feeling</div>
        </div>
      </section>

      <section className="section-shell py-20 sm:py-28" aria-label="Yuvraj's live age">
        <div className={`signal-card ${celebrating ? 'is-celebrating' : ''} relative overflow-hidden rounded-[2rem] bg-[#48242f] p-6 text-[#fff8eb] sm:p-10`}>
          <div className="pointer-events-none absolute inset-0 opacity-60">
            <span className="signal-grid" />
            <span className="signal-spark spark-one" />
            <span className="signal-spark spark-two" />
            <span className="signal-spark spark-three" />
          </div>
          <div className="relative z-10 grid gap-10 md:grid-cols-[.8fr_1.2fr] md:items-center">
            <div>
              <p className="eyebrow text-[#f6c85f]">Live from the birthday department</p>
              <h2 className="serif mt-4 max-w-md text-4xl font-bold leading-[.95] tracking-[-.05em] sm:text-6xl">
                Yuvraj is <span className="text-[#f6c85f]">{age.years}</span>.
              </h2>
              <p className="mt-5 max-w-sm text-sm leading-6 text-[#fff8eb]/70">
                Born 20 September 2012. This counter keeps going because apparently being a legend is a full-time job.
              </p>
              <button
                data-testid="button-launch-celebration"
                onClick={launchCelebration}
                className="mt-7 flex items-center gap-2 rounded-full bg-[#f6c85f] px-5 py-3 font-mono text-xs font-bold uppercase tracking-[.12em] text-[#48242f] transition-transform hover:-translate-y-1"
              >
                {celebrating ? 'Signal received' : 'Make some noise'} <Zap size={15} fill="currentColor" />
              </button>
            </div>
            <div className="relative">
              <div className="age-counter rounded-[1.5rem] border border-[#fff8eb]/15 bg-[#fff8eb]/[.07] p-4 sm:p-6">
                <div className="mb-4 flex items-center justify-between gap-4 border-b border-[#fff8eb]/15 pb-4">
                  <span className="font-mono text-[.62rem] uppercase tracking-[.16em] text-[#fff8eb]/55">Age, in very specific detail</span>
                  <Clock3 size={16} className="text-[#f6c85f]" />
                </div>
                <div className="grid grid-cols-5 gap-2 sm:gap-3">
                  {timeUnits.map((unit) => (
                    <div key={unit} className="min-w-0 text-center">
                      <div className="age-value serif text-2xl font-bold text-[#fff8eb] sm:text-4xl">{String(age[unit]).padStart(2, '0')}</div>
                      <div className="mt-2 font-mono text-[.52rem] uppercase tracking-[.12em] text-[#f6c85f] sm:text-[.6rem]">{unit}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="signal-stage" aria-hidden="true">
                <div className="signal-ring signal-ring-one" />
                <div className="signal-ring signal-ring-two" />
                <div className="signal-core"><Gift size={18} /></div>
                <span className="burst-dot burst-dot-one" />
                <span className="burst-dot burst-dot-two" />
                <span className="burst-dot burst-dot-three" />
                <span className="burst-dot burst-dot-four" />
                <span className="burst-dot burst-dot-five" />
                <span className="burst-dot burst-dot-six" />
              </div>
            </div>
          </div>
          <p className={`celebration-caption ${celebrating ? 'is-visible' : ''}`} aria-live="polite">
            {celebrating ? '14 years of excellent decisions and questionable ones.' : 'Press the button. It is scientifically proven to improve birthdays.'}
          </p>
        </div>
      </section>

      <section id="evidence" className="section-shell py-24 sm:py-32">
        <div className="grid gap-10 md:grid-cols-[.75fr_1.25fr] md:items-start">
          <div className="md:sticky md:top-10">
            <p className="eyebrow">01 / Exhibit A</p>
            <h2 className="serif mt-4 max-w-sm text-5xl font-bold leading-[.95] tracking-[-.05em] text-[#48242f] sm:text-6xl">The official case for celebrating you.</h2>
            <p className="mt-6 max-w-sm text-sm leading-6 text-[#6b4a4d]">A few things that feel very specifically, unmistakably Yuvraj. No witnesses were bribed in the making of this list.</p>
          </div>
          <div className="grid gap-4">
            <div className="paper-shadow-small relative rotate-[-2deg] border border-[#d7c5ae] bg-[#fff8eb] p-6 sm:p-8">
              <span className="absolute -top-3 right-8 block h-7 w-16 rotate-3 bg-[#d8674b]/70" />
              <p className="eyebrow">Observation no. 01</p>
              <div className="mt-5 flex gap-4">
                <span className="mt-1 text-[#d8674b]"><Sparkles size={21} /></span>
                <div><h3 className="serif text-2xl font-bold text-[#48242f]">You turn up.</h3><p className="mt-2 leading-7 text-[#6b4a4d]">Not just to the fun parts. You turn up when it is awkward, inconvenient, or raining sideways. That counts for more than you think.</p></div>
              </div>
            </div>
            <div className="paper-shadow-small relative ml-5 rotate-[1.5deg] border border-[#d7c5ae] bg-[#f6c85f] p-6 sm:ml-16 sm:p-8">
              <p className="eyebrow text-[#48242f]">Observation no. 02</p>
              <div className="mt-5 flex gap-4">
                <span className="mt-1 text-[#48242f]"><Music2 size={21} /></span>
                <div><h3 className="serif text-2xl font-bold text-[#48242f]">You bring the atmosphere.</h3><p className="mt-2 leading-7 text-[#48242f]/75">Every group needs one person who can make a dead room feel like something is about to happen. Unfortunately, you are very good at this.</p></div>
              </div>
            </div>
            <div className="paper-shadow-small relative rotate-[-1deg] border border-[#d7c5ae] bg-[#4e7e76] p-6 text-[#fff8eb] sm:p-8">
              <p className="eyebrow text-[#f6c85f]">Observation no. 03</p>
              <div className="mt-5 flex gap-4">
                <span className="mt-1 text-[#f6c85f]"><Heart size={21} fill="currentColor" /></span>
                <div><h3 className="serif text-2xl font-bold">You make people feel kept.</h3><p className="mt-2 leading-7 text-[#fff8eb]/75">There is a difference between being liked and being trusted. You have somehow managed both. Annoyingly impressive.</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#48242f] py-24 text-[#fff8eb] sm:py-32">
        <div className="section-shell">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div><p className="eyebrow text-[#f6c85f]">02 / The archive</p><h2 className="serif mt-4 max-w-xl text-5xl font-bold leading-[.92] tracking-[-.05em] sm:text-7xl">Things I hope we never grow out of.</h2></div>
            <button data-testid="button-next-memory" onClick={nextMemory} className="group flex w-fit items-center gap-2 border-b border-[#f6c85f] pb-2 font-mono text-xs font-bold uppercase tracking-widest text-[#f6c85f]">Another one <RotateCcw size={14} className="transition-transform group-hover:rotate-180" /></button>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-[.9fr_1.1fr] md:items-center">
            <div className="relative min-h-60 overflow-hidden rounded-[1.4rem] border border-[#fff8eb]/15 bg-[#d8674b] p-7 sm:min-h-72 sm:p-10">
              <div className="absolute right-8 top-8 h-28 w-28 rounded-full border border-[#f6c85f]/50" />
              <div className="absolute bottom-[-2rem] right-[-1rem] h-44 w-44 rounded-full border-[22px] border-[#48242f]/30" />
              <span className="relative z-10 block font-mono text-xs uppercase tracking-[.18em] text-[#f6c85f]">{memory.date}</span>
              <p className="relative z-10 mt-20 max-w-sm font-mono text-xs leading-6 text-[#fff8eb]/70">A completely accurate record, except for the parts that have been improved by memory.</p>
            </div>
            <div key={memoryIndex} className="reveal">
              <span className="eyebrow text-[#f6c85f]">Entry {String(memoryIndex + 1).padStart(2, '0')} / {memory.date.toLowerCase()}</span>
              <h3 className="serif mt-4 max-w-xl text-4xl font-bold leading-tight sm:text-5xl">{memory.title}</h3>
              <p className="mt-5 max-w-lg text-lg leading-8 text-[#fff8eb]/70">{memory.copy}</p>
              <div className="mt-8 flex items-center gap-3 text-[#f6c85f]"><memory.icon size={18} /><span className="font-mono text-[.68rem] uppercase tracking-[.16em]">Filed with affection</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell py-24 sm:py-32">
        <div className="grid gap-12 md:grid-cols-[1.1fr_.9fr] md:items-center">
          <div>
            <p className="eyebrow">03 / A tiny interruption</p>
            <h2 className="serif mt-4 max-w-2xl text-5xl font-bold leading-[.94] tracking-[-.05em] text-[#48242f] sm:text-7xl">You have unlocked a very small surprise.</h2>
            <p className="mt-6 max-w-lg text-base leading-7 text-[#6b4a4d]">It is not expensive. It is not sensible. It is, however, entirely yours.</p>
          </div>
          <div className="relative">
            <div className="absolute -inset-3 rotate-3 rounded-2xl border border-[#d8674b]/30" />
            <div className="relative rounded-2xl border border-[#d7c5ae] bg-[#f6c85f] p-7 paper-shadow sm:p-9">
              <div className="flex items-center justify-between border-b border-[#48242f]/20 pb-5"><span className="eyebrow text-[#48242f]">Personal voucher</span><Ticket size={20} /></div>
              <div className={`surprise-content ${opened ? '' : 'is-hidden'}`}>
                <p className="serif mt-8 text-3xl font-bold leading-tight text-[#48242f]">One unreasonable amount of your favourite snack, on me.</p>
                <p className="mt-5 text-sm leading-6 text-[#48242f]/75">Redeemable whenever the day has been too much, the plan has gone sideways, or you simply say the magic words: “I deserve a snack.”</p>
                <div className="mt-8 flex items-center gap-2 font-mono text-[.65rem] font-bold uppercase tracking-[.15em] text-[#48242f]"><Check size={15} /> Valid forever, obviously</div>
              </div>
              {!opened && <div className="py-14 text-center font-mono text-xs uppercase tracking-[.16em] text-[#48242f]/60">Sealed for dramatic effect</div>}
              <button data-testid="button-open-surprise" onClick={() => setOpened(!opened)} className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-[#48242f] px-5 py-3 font-mono text-xs font-bold uppercase tracking-[.12em] text-[#fff8eb] transition-transform hover:-translate-y-1">{opened ? 'Fold it back up' : 'Open the voucher'} {opened ? <ChevronDown size={15} /> : <ArrowUpRight size={15} />}</button>
            </div>
          </div>
        </div>
      </section>

      <section id="letter" className="bg-[#f1dfcf] py-24 sm:py-32">
        <div className="section-shell">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow">04 / The actual message</p>
            <h2 className="serif mt-5 text-5xl font-bold leading-[.93] tracking-[-.05em] text-[#48242f] sm:text-8xl">Happy birthday,<br /><span className="text-[#d8674b]">Yuvraj.</span></h2>
            <div className="mx-auto mt-10 max-w-2xl border-y border-[#d7c5ae] py-9 text-left sm:py-12">
              <p className="serif text-2xl leading-[1.45] text-[#48242f] sm:text-3xl">I hope this year is gentle with you in the places that have been heavy, loud in the places that deserve celebrating, and full of the kind of ordinary Tuesday moments that you look back on and realise were the good ones.</p>
              <p className="mt-7 text-base leading-7 text-[#6b4a4d]">Thank you for being easy to call, impossible to replace, and consistently willing to make one more plan even when the last plan was objectively a lot. I am very lucky you are my person.</p>
              <p className="mt-9 font-mono text-xs font-bold uppercase tracking-[.16em] text-[#d8674b]">— from the friend who knows you are pretending not to cry</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell py-24 sm:py-32">
        <div className="grid gap-10 md:grid-cols-[.8fr_1.2fr] md:items-start">
          <div><p className="eyebrow">05 / Your next chapter</p><h2 className="serif mt-4 text-5xl font-bold leading-[.94] tracking-[-.05em] text-[#48242f] sm:text-6xl">Things worth making room for.</h2><p className="mt-6 max-w-sm text-sm leading-6 text-[#6b4a4d]">Not resolutions. Resolutions have too much paperwork. Just a few invitations for the year ahead.</p></div>
          <div className="relative ml-2 border-l-2 border-[#d8674b]/40 pl-7 sm:pl-10">
            <div className="timeline-line absolute -left-[3px] top-0 h-full w-1" />
            {[
              ['More plans that start with “this will be quick.”', '01'],
              ['A win so good you have to tell the story twice.', '02'],
              ['Rest that does not need to be earned first.', '03'],
              ['The courage to keep choosing what feels like you.', '04'],
            ].map(([text, number]) => (
              <div key={number} className="relative mb-8 flex gap-5 last:mb-0">
                <span className="absolute -left-[2.25rem] grid h-8 w-8 -translate-x-1/2 place-items-center rounded-full border-2 border-[#fff8eb] bg-[#d8674b] font-mono text-[.62rem] font-bold text-[#fff8eb] sm:-left-[2.75rem]">{number}</span>
                <p className="serif max-w-xl text-2xl leading-tight text-[#48242f]">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#4e7e76] py-24 text-[#fff8eb] sm:py-32">
        <div className="section-shell grid gap-12 md:grid-cols-[1fr_.8fr] md:items-end">
          <div>
            <p className="eyebrow text-[#f6c85f]">06 / Add to the scrapbook</p>
            <h2 className="serif mt-4 max-w-xl text-5xl font-bold leading-[.92] tracking-[-.05em] sm:text-7xl">Leave Yuvraj a wish.</h2>
            <p className="mt-6 max-w-md leading-7 text-[#fff8eb]/75">Write one thing you hope he gets more of this year. It stays right here in this little browser tab.</p>
            <div className="mt-8 max-w-xl">
              <textarea data-testid="input-birthday-wish" value={wish} onChange={(event) => { setWish(event.target.value); setSent(false); }} placeholder="More late-night walks, fewer meetings that could have been emails..." className="min-h-32 w-full resize-none rounded-xl border border-[#fff8eb]/25 bg-[#fff8eb]/10 p-4 font-sans text-sm leading-6 text-[#fff8eb] outline-none placeholder:text-[#fff8eb]/45 focus:border-[#f6c85f]" maxLength={160} />
              <div className="mt-3 flex items-center justify-between gap-4"><span className="font-mono text-[.62rem] uppercase tracking-widest text-[#fff8eb]/50">{wish.length} / 160</span><button data-testid="button-send-wish" disabled={!wish.trim()} onClick={() => setSent(true)} className="flex items-center gap-2 rounded-full bg-[#f6c85f] px-5 py-3 font-mono text-xs font-bold uppercase tracking-[.12em] text-[#48242f] transition-transform hover:-translate-y-1 disabled:cursor-not-allowed disabled:opacity-40">Pin this wish <Send size={14} /></button></div>
              {sent && <p data-testid="status-wish-sent" className="mt-4 flex items-center gap-2 text-sm text-[#f6c85f]"><Check size={16} /> Kept safe. That is a good one.</p>}
            </div>
          </div>
          <div className="relative hidden min-h-72 md:block">
            <div className="drift absolute right-6 top-0 h-52 w-52 rotate-[-6deg] border border-[#48242f]/20 bg-[#f6c85f] p-6 text-[#48242f] shadow-[8px_10px_0_#48242f33]"><p className="eyebrow text-[#48242f]">A note for later</p><p className="serif mt-8 text-3xl font-bold leading-tight">You are doing better than you think.</p><p className="mt-5 font-mono text-[.62rem] uppercase tracking-widest">Keep this one.</p></div>
          </div>
        </div>
      </section>

      <footer className="section-shell flex flex-col gap-8 py-14 sm:flex-row sm:items-end sm:justify-between">
        <div><p className="eyebrow">End of the page. Not the friendship.</p><p className="serif mt-3 text-3xl font-bold text-[#48242f]">Go have a very good birthday.</p></div>
        <div className="flex items-center gap-5"><button data-testid="button-back-top" onClick={() => scrollTo('top')} className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[.12em] text-[#d8674b]">Back to the top <ArrowUpRight size={15} /></button><span className="text-[#d7c5ae]">|</span><span className="font-mono text-[.62rem] uppercase tracking-[.15em] text-[#9b7775]">Made with unreasonable fondness</span></div>
      </footer>
    </main>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;