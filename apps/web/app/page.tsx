export default function HomePage() {
  return (
    <main className="page">
      <header className="topbar">
        <strong>VibePerks</strong>
        <nav className="nav">
          <a href="/admin">Admin</a>
          <a href="mailto:partners@vibeperks.dev">Place an offer</a>
        </nav>
      </header>

      <section className="hero">
        <h1>Useful AI offers while your agent works.</h1>
        <p>
          VibePerks shows one short, safe status-line perk for Claude Code, Codex,
          Cursor and other AI coding workflows. It does not read code, prompts, or
          project files.
        </p>
        <a className="cta" href="#install">Install CLI</a>
      </section>

      <section className="section grid">
        <div>
          <h2>What it shows</h2>
          <p>One active offer, like credits, tools, launches, or services for AI builders.</p>
        </div>
        <div>
          <h2>Why safe</h2>
          <p>The client only asks the API for an offer and records anonymous impressions.</p>
        </div>
        <div>
          <h2>For companies</h2>
          <p>Early MVP placements are handled manually. Send a short offer and target URL.</p>
        </div>
      </section>

      <section id="install" className="section">
        <h2>Install</h2>
        <p>
          Run the CLI with your API URL and use the output as a Claude Code status
          line command.
        </p>
      </section>
    </main>
  );
}
