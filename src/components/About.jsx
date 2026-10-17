import { ArrowDownRight } from 'lucide-react'

function About({ scrollTo }) {
  return (
    <section
      className="relative h-[100dvh] overflow-hidden bg-espresso px-[5vw] py-24 text-ivory max-md:px-[6vw] max-md:pb-32"
      id="about"
      data-scroll-section
    >
      <div className="flex items-center gap-[1.8rem] font-mono text-[.67rem] tracking-[.1em] uppercase">
        <span className="text-ivory">01</span>
        <span className="text-bronze-light">About Balaji Interior Decor</span>
      </div>

      <div className="mx-auto mt-[10rem] grid max-w-[1100px] grid-cols-[1.15fr_1fr] gap-[8vw] max-md:mt-[6rem] max-md:block">
        <h2 className="mb-0 text-[clamp(3.2rem,7vw,7.4rem)] font-medium leading-[.94] tracking-[-.055em]">
          We make the
          <br />
          <em className="font-serif font-medium text-bronze">ordinary</em> felt.
        </h2>
        <div className="self-end pb-[.7rem] max-md:mt-[4rem]">
          <p className="max-w-[400px] text-[1.18rem] leading-[1.55]">
            Balaji Interior Decor is a small, independent studio working across disciplines and borders. We find the quiet point
            where a clear idea becomes something you can feel.
          </p>
          <p className="my-[3rem] max-w-[400px] text-[.9rem] leading-[1.7] text-ivory/65">
            From a first sketch to the final surface, our work is guided by curiosity, restraint, and a deep respect
            for craft. We collaborate with people building the next considered thing.
          </p>
          <button
            className="inline-flex items-center gap-4 border-b border-bronze pb-[.8rem] text-bronze-light"
            onClick={() => scrollTo('contact')}
          >
            More about us <ArrowDownRight size={17} />
          </button>
        </div>
      </div>

    </section>
  )
}

export default About
