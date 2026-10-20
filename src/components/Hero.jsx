import MaskedHeading from './animations/MaskedHeading'

function Hero({ scrollTo }) {
  return (
    <section
        className="relative h-[100dvh] overflow-hidden bg-section px-[5vw] pt-[clamp(7rem,11vw,10rem)] pb-0 max-md:px-[6vw] max-md:pt-[6rem]"
        id="home"
        data-scroll-section
      >
        <div className="relative z-10">
          <div className="mb-[clamp(4rem,8vw,8rem)] grid grid-cols-2 max-md:mb-[5rem] max-md:block">
            <p className="col-span-2 mb-[3rem] font-mono text-[.67rem] tracking-[.1em] uppercase text-bronze max-md:mb-[3.4rem]">
              Independent creative studio{' '}
              <span className="mx-[.6rem] text-[.5rem] text-heading">●</span> Est. 2014
            </p>

            <MaskedHeading
              tag="h1"
              text={"Your dream becomes reality here..."}
              src="https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=2200&q=90"
              align="center"
              textScale={0.085}
              reveal="rise"
              trigger="view"
              brightness={0.95}
              saturation={1}
              className="col-span-2 mb-0 font-medium tracking-[-.055em] [--masked-heading-stroke:var(--color-heading)]"
            />
            <div className="col-start-2 flex items-end justify-between pt-[4rem] max-md:col-start-1 max-md:block max-md:pt-[3rem]">
              <p className="mb-0 max-w-[290px] text-[.9rem] leading-[1.65] text-body">
                We shape meaningful identities, spaces, and digital experiences for people who care about the
                details.
              </p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-[1.5rem] left-[5vw] right-[5vw] z-10 flex justify-between font-mono text-[.67rem] tracking-[.1em] uppercase text-heading max-md:left-[6vw] max-md:right-[6vw]">          <span>Selected view / 01</span>
          <span>Scroll to explore</span>
        </div>
      </section>
  )
}

export default Hero
