function Footer() {
  return (
    <footer className="grid grid-cols-[1fr_1fr_1fr_auto] items-end gap-8 border-t border-ivory/20 bg-espresso px-[5vw] py-10 text-ivory max-md:grid-cols-2 max-md:items-start max-md:px-[6vw]">
      <div className="font-mono text-[.82rem] font-medium tracking-[.12em] text-ivory">
        ATELIER<span className="text-bronze">.</span>
      </div>
      <p className="m-0 text-[.7rem] leading-[1.5] text-ivory/[.63]">
        Independent creative studio
        <br />
        for spaces &amp; stories.
      </p>
      <div className="flex gap-[1.2rem] max-md:flex-col max-md:gap-[.7rem]">
        <a className="font-mono text-[.67rem] uppercase text-bronze-light" href="mailto:hello@atelier.studio">
          Email
        </a>
        <a className="font-mono text-[.67rem] uppercase text-bronze-light" href="#home">
          Instagram
        </a>
        <a className="font-mono text-[.67rem] uppercase text-bronze-light" href="#home">
          LinkedIn
        </a>
      </div>
      <p className="font-mono text-[.67rem] tracking-[.1em] uppercase max-md:col-span-2 max-md:mt-8">
        © 2024 Atelier Studio
      </p>
    </footer>
  )
}

export default Footer
