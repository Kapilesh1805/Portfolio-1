function Gallery() {
  return (       <section className="grid h-[100dvh] overflow-hidden grid-cols-[.8fr_1.2fr] items-center gap-16 overflow-hidden bg-espresso px-[10vw] py-28 text-ivory max-md:block max-md:h-[100dvh] max-md:overflow-hidden max-md:px-[6vw] max-md:py-24 max-md:pb-32" data-scroll-section>

      <div>
        <div className="flex items-center gap-[1.8rem] font-mono text-[.67rem] tracking-[.1em] uppercase">
          <span className="text-ivory">02</span>
          <span className="text-bronze-light">A wider view</span>
        </div>
        <h2 className="mb-10 mt-20 text-[clamp(3.2rem,7vw,7.4rem)] font-medium leading-[.94] tracking-[-.055em] max-md:mb-8 max-md:mt-16">
          Details make
          <br />
          <em className="font-serif font-medium text-bronze">the room.</em>
        </h2>
        <p className="max-w-[270px] text-[.9rem] leading-[1.7] text-ivory/[.64]">
          A collection of textures, tones, and small moments found along the way.
        </p>
      </div>

      <div
        className="relative h-[min(60vw,600px)] w-[min(60vw,600px)] justify-self-end before:absolute before:inset-[8%] before:rounded-full before:border before:border-bronze before:opacity-50 before:content-[''] max-md:mx-auto max-md:mt-16 max-md:h-[88vw] max-md:w-[88vw]"
        aria-label="Gallery of details"
      >
        <div className="absolute left-[1%] top-[31%] w-[38%] overflow-hidden rounded-full border-[7px] border-espresso">
          <img
            className="aspect-square saturate-[.7]"
            src="https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=700&q=80"
            alt="Curved chair and art"
          />
        </div>
        <div className="absolute right-[3%] top-[2%] w-[36%] overflow-hidden rounded-full border-[7px] border-espresso">
          <img
            className="aspect-square saturate-[.7]"
            src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=700&q=80"
            alt="Minimal kitchen detail"
          />
        </div>
        <div className="absolute bottom-[2%] right-[10%] w-[35%] overflow-hidden rounded-full border-[7px] border-espresso">
          <img
            className="aspect-square saturate-[.7]"
            src="https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=700&q=80"
            alt="Architectural shadow"
          />
        </div>
        <div className="absolute left-[35%] top-[34%] flex h-[32%] w-[32%] flex-col items-center justify-center rounded-full bg-bronze text-center font-serif text-[1.7rem] leading-[.85] text-ivory">
          collect
          <span className="italic text-espresso">quietly</span>
        </div>
      </div>
    </section>
  )
}

export default Gallery
