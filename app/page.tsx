import Image from "next/image";

const exampleOffers = [
  {
    company: "Cursor",
    title: "AI code editor",
    description: "Sharper code edits in your status line.",
    accent: "bg-zinc-950 text-white"
  },
  {
    company: "Railway",
    title: "Free month",
    description: "Deploy faster without leaving the flow.",
    accent: "bg-violet-700 text-white"
  },
  {
    company: "Supabase",
    title: "Launch backend",
    description: "Postgres, auth, storage, and APIs.",
    accent: "bg-emerald-700 text-white"
  },
  {
    company: "OpenRouter",
    title: "New models",
    description: "Find model access when you need it.",
    accent: "bg-sky-700 text-white"
  }
];

const benefits = [
  "No context switching",
  "Useful AI tools",
  "Quiet status line",
  "Built for Claude Code"
];

export default function HomePage() {
  return (
    <main className="bg-white text-zinc-950">
      <section className="mx-auto grid min-h-screen max-w-6xl items-center gap-12 px-6 py-16 lg:grid-cols-[1fr_0.9fr]">
        <div>
          <h1 className="max-w-3xl text-5xl font-semibold tracking-tight md:text-7xl">
            Useful AI offers in your Claude Code status line.
          </h1>
          <p className="mt-6 max-w-xl text-xl leading-8 text-zinc-600">
            Discover relevant tools while Claude thinks, without opening another
            tab.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              className="rounded-md bg-zinc-950 px-5 py-3 text-sm font-medium text-white"
              href="#install"
            >
              Install
            </a>
            <a
              className="rounded-md border border-zinc-300 px-5 py-3 text-sm font-medium"
              href="https://github.com/gorbdan/-vibeperks"
            >
              GitHub
            </a>
          </div>
        </div>

        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-3">
          <Image
            alt="VibePerks status line demo"
            className="w-full rounded-md border border-zinc-200"
            height={500}
            src="/demo.gif"
            unoptimized
            width={900}
          />
        </div>
      </section>

      <section className="border-t border-zinc-200 px-6 py-20" id="install">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-semibold tracking-tight">
            How it works
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {["Install", "Work", "Discover"].map((step, index) => (
              <div className="rounded-lg border border-zinc-200 p-6" key={step}>
                <div className="mb-8 text-sm text-zinc-500">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <h3 className="text-xl font-semibold">{step}</h3>
                <p className="mt-3 text-zinc-600">
                  {index === 0
                    ? "Add VibePerks to your Claude Code status line."
                    : null}
                  {index === 1
                    ? "Keep building while Claude handles the heavy thinking."
                    : null}
                  {index === 2
                    ? "Notice useful AI offers without opening another tab."
                    : null}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-200 bg-zinc-50 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-semibold tracking-tight">
            Example Offers
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {exampleOffers.map((offer) => (
              <article
                className="rounded-lg border border-zinc-200 bg-white p-5"
                key={offer.company}
              >
                <div
                  className={`mb-6 inline-flex rounded-md px-3 py-2 text-sm font-medium ${offer.accent}`}
                >
                  {offer.company}
                </div>
                <h3 className="text-xl font-semibold">{offer.title}</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-600">
                  {offer.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-200 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-semibold tracking-tight">
            Why developers love it
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {benefits.map((benefit) => (
              <div
                className="rounded-lg border border-zinc-200 p-5"
                key={benefit}
              >
                <p className="font-medium">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-200 bg-zinc-950 px-6 py-16 text-white">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">
              Want early access?
            </h2>
            <p className="mt-3 text-zinc-300">
              Join the waitlist for the public alpha.
            </p>
          </div>
          <a
            className="w-fit rounded-md bg-white px-5 py-3 text-sm font-medium text-zinc-950"
            href="mailto:hello@vibeperks.dev?subject=VibePerks%20waitlist"
          >
            Join Waitlist
          </a>
        </div>
      </section>

      <footer className="border-t border-zinc-200 px-6 py-8">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-4 text-sm text-zinc-600">
          <p>VibePerks</p>
          <div className="flex gap-5">
            <a href="https://github.com/gorbdan/-vibeperks">GitHub</a>
            <a href="https://github.com/gorbdan/-vibeperks/blob/main/LICENSE">
              License
            </a>
            <a href="mailto:hello@vibeperks.dev">Contact</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
