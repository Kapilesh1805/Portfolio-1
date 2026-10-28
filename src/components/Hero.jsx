import MaskedHeading from './animations/MaskedHeading'

function Hero() {
  return (
    <section
      className="relative min-h-screen bg-[#FDF8F5] px-[5vw] pt-24 md:pt-[clamp(6rem,10vw,9rem)] pb-10 flex flex-col justify-between max-md:px-[6vw] max-md:pt-20 max-md:pb-8 overflow-hidden"
      id="home"
      data-scroll-section
    >
      <div className="relative z-10">
        <div className="mb-6 md:mb-12 grid grid-cols-2 max-md:block">
          <p className="col-span-2 mb-6 md:mb-10 font-mono text-[.67rem] tracking-widest uppercase text-bronze">
            Independent creative studio{' '}
            <span className="mx-[.6rem] text-[.5rem] text-heading">●</span> Est. 2014
          </p>

          <MaskedHeading
            tag="h1"
            text="Your dream becomes reality here..."
            mediaType="image"
            src="/hero/hero-bg.png"
            align="center"
            textScale={0.085}
            reveal="rise"
            trigger="view"
            brightness={1.05}
            contrast={0.98}
            saturation={1.08}
            fillScale={1.2}
            className="col-span-2 mb-0 font-medium tracking-[-.055em] [--masked-heading-stroke:#654735] [--masked-heading-stroke-width:1.1px] [--masked-heading-pos:center_68%]"
          />

          <div className="col-start-2 flex items-end justify-between -mt-4 md:-mt-6 max-md:col-start-1 max-md:block">
            <p className="mb-0 max-w-[290px] text-[.9rem] leading-[1.65] text-body">
              We shape meaningful identities, spaces, and digital experiences for people who care about the
              details.
            </p>
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-8 flex justify-between font-mono text-[.67rem] tracking-widest uppercase text-heading">
        <span>Selected view / 01</span>
        <span>Scroll to explore</span>
      </div>
    </section>
  )
}

export default Hero

