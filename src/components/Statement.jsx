function Statement() {
  return (
    <section className="flex h-[100dvh] overflow-hidden flex-col items-center justify-center bg-section px-[5vw] pb-32 pt-36 text-center text-heading max-md:px-[6vw] max-md:py-28" data-scroll-section>
      <div className="h-16 font-serif text-[7rem] leading-none text-accent">&ldquo;</div>
      <blockquote className="mx-auto mb-12 mt-16 max-w-[1050px] text-[clamp(2.2rem,5vw,5.4rem)] leading-[1.08] tracking-[-.04em] max-md:mt-12 text-heading">
        Good design does not ask
        <br />
        to be noticed. <em className="font-serif font-medium text-accent">It is remembered.</em>
      </blockquote>
      <p className="font-mono text-[.67rem] tracking-[.1em] uppercase text-body">
        — Our working philosophy
      </p>
    </section>
  )
}

export default Statement
