export default function Header() {
  return (
    <header className="fixed left-0 top-0 z-50 w-full ">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 sm:px-10 lg:px-16">

        {/* Logo */}
        <a
          href="/"
          className="text-xl font-bold tracking-tight text-white"
        >
          CAMP<span className="text-orange-400">.</span>
        </a>

        {/* Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <a
            href="#home"
            className="text-sm font-medium text-white/70 transition hover:text-white"
          >
            Home
          </a>

          <a
            href="#rules"
            className="text-sm font-medium text-white/70 transition hover:text-white"
          >
            Rules
          </a>

          <a
            href="#safety"
            className="text-sm font-medium text-white/70 transition hover:text-white"
          >
            Safety
          </a>

          <a
            href="#contact"
            className="text-sm font-medium text-white/70 transition hover:text-white"
          >
            Contact
          </a>
        </nav>

        {/* Contact button */}
        <a
          href="#contact"
          className="rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/10"
        >
          Get in touch
        </a>

      </div>
    </header>
  );
}