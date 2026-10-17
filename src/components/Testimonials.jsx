function Testimonials() {
  return (
       <section className="h-[100dvh] overflow-hidden bg-ivory px-[5vw] pb-40 pt-28 max-md:px-[6vw]" data-scroll-section>
      <div className="flex items-center gap-[1.8rem] font-mono text-[.67rem] tracking-[.1em] uppercase text-bronze">
        <span className="text-espresso">05</span>
        <span>Kind words</span>
      </div>

      <div className="mx-auto mt-32 grid max-w-[1060px] grid-cols-[1.4fr_1fr] gap-[8vw] max-md:mt-20 max-md:block">
        <blockquote className="m-0 font-serif text-[clamp(2rem,4vw,4rem)] leading-[1.05]">
          &ldquo;Balaji Interior Decor understood the feeling before we had the words for it. The result is a place that feels
          exactly like us.&rdquo;
        </blockquote>
        <div className="max-md:mt-12">
          <p className="mb-0 text-bronze">Founder, Mr.Balaji </p>
          <div className="mt-16 flex gap-2">
            <span className="h-[7px] w-[7px] rounded-full bg-bronze" />
            <span className="h-[7px] w-[7px] rounded-full bg-ivory-deep" />
            <span className="h-[7px] w-[7px] rounded-full bg-ivory-deep" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
