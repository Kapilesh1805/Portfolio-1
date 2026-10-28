import { ArrowUpRight } from 'lucide-react'

function Contact() {
  return (
    <section className="min-h-screen bg-section px-[5vw] py-20 md:py-28 flex flex-col justify-between text-body max-md:px-[6vw]" id="contact" data-scroll-section>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[1.8rem] font-mono text-[.67rem] tracking-widest uppercase">
          <span className="text-heading">06</span>
          <span className="text-accent">Have a good feeling?</span>
        </div>
        <span className="font-mono text-[.67rem] tracking-widest uppercase text-body">
          Let&apos;s make it real.
        </span>
      </div>

      <div className="mx-auto my-auto mb-12 mt-16 md:mt-28 flex w-full max-w-275 items-end justify-between max-md:block">
        <h2 className="text-[clamp(3.5rem,8.5vw,9.5rem)] font-medium leading-[.96] tracking-[-.055em] text-heading">
          Start a
          <br />
          <em className="font-serif font-medium text-accent">conversation.</em>
        </h2>
        <a
          className="flex items-center gap-4 border-b border-accent px-[.2rem] pb-3 font-mono text-[.8rem] text-accent transition-colors duration-[250ms] hover:border-heading hover:text-heading max-md:mt-10 max-md:w-max"
          href="mailto:hello@atelier.studio"
        >
          <span>Get in touch</span>
          <ArrowUpRight size={18} aria-hidden="true" />
        </a>
      </div>

      <div className="h-4" aria-hidden="true" />
    </section>
  )
}

export default Contact
