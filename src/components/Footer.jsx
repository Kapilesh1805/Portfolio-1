function Footer() {
  return (
    <footer className="grid grid-cols-[1fr_1fr_1fr_auto] items-end gap-8 border-t border-surface/20 bg-dark px-[5vw] py-10 text-white max-md:grid-cols-2 max-md:items-start max-md:px-[6vw]">
      <div className="font-mono text-[.82rem] font-medium tracking-[.12em] text-white">
        Balaji Interior Decor<span className="text-accent">.</span>
      </div>
      <p className="m-0 text-[.7rem] leading-[1.5] text-surface/80">
        Independent creative studio
        <br />
        for spaces &amp; stories.
      </p>
      <div className="flex gap-[1.2rem] max-md:flex-col max-md:gap-[.7rem]">
        <a className="font-mono text-[.67rem] uppercase text-surface transition-colors hover:text-accent" href="mailto:hello@atelier.studio">
          Email
        </a>
        <a className="font-mono text-[.67rem] uppercase text-surface transition-colors hover:text-accent" href="tel:9841183855">
          Contact
        </a>
        <a
          className="font-mono text-[.67rem] uppercase text-surface transition-colors hover:text-accent"
          href="https://www.instagram.com/balajiinterior.ideas?stkn=MWp1cXNybmJ2Zmcwcw=="
          target="_blank"
          rel="noopener noreferrer"
        >
          Instagram
        </a>
      </div>
      <p className="font-mono text-[.67rem] tracking-[.1em] uppercase text-surface/70 max-md:col-span-2 max-md:mt-8">
        © 2024 Balaji Interior Decor
      </p>
    </footer>
  )
}

export default Footer
