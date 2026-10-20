import { ArrowUpRight } from 'lucide-react'

function Contact() {
  return (
    <section className="min-h-screen bg-section px-[5vw] pb-32 pt-28 text-body max-md:px-[6vw]" id="contact" data-scroll-section>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[1.8rem] font-mono text-[.67rem] tracking-[.1em] uppercase">
          <span className="text-heading">07</span>
          <span className="text-accent">Have a good feeling?</span>
        </div>
        <span className="font-mono text-[.67rem] tracking-[.1em] uppercase text-body">
          Let&apos;s make it real.
        </span>
      </div>

      <div className="mx-auto mb-16 mt-44 flex max-w-[1100px] items-end justify-between max-md:mb-8 max-md:mt-28 max-md:block max-md:items-start">
        <h2 className="text-[clamp(4rem,9vw,9.5rem)] font-medium leading-[.94] tracking-[-.055em] text-heading">
          Start a
          <br />
          <em className="font-serif font-medium text-accent">conversation.</em>
        </h2>
        <a
          className="flex items-center gap-6 border-b border-accent px-[.2rem] pb-4 font-mono text-[.8rem] text-accent transition-colors duration-[250ms] hover:border-heading hover:text-heading max-md:mt-16 max-md:w-max"
          href="mailto:hello@atelier.studio"
        >
        </a>
      </div>
    </section>
  )
}

export default Contact
