import { ArrowUpRight } from 'lucide-react'
import { services } from '../data/content'

function Services() {
  return (
       <section className="h-[100dvh] overflow-hidden bg-ivory px-[5vw] pt-28 pb-36 max-md:px-[6vw]" id="services" data-scroll-section>
      <div className="flex items-center gap-[1.8rem] font-mono text-[.67rem] tracking-[.1em] uppercase text-bronze">
        <span className="text-espresso">04</span>
        <span>What we do</span>
      </div>

      <div className="mb-24 mt-28 grid grid-cols-[1.1fr_1fr] gap-[6vw] max-md:mb-16 max-md:block">
        <h2 className="mb-0 text-[clamp(3.2rem,7vw,7.4rem)] font-medium leading-[.94] tracking-[-.055em]">
          Many disciplines.
          <br />
          <em className="font-serif font-medium text-bronze">One point of view.</em>
        </h2>
        <p className="self-end max-w-[330px] text-[1rem] leading-[1.65] max-md:mt-8">
          We bring strategy, story, and sensibility together to create work that lasts beyond the launch.
        </p>
      </div>

      <div className="border-t border-espresso/[0.18]">
        {services.map((service, index) => (
          <button
            key={service}
            className="grid w-full grid-cols-[8%_1fr_auto] items-center gap-8 border-b border-espresso/[0.18] py-[1.45rem] text-left text-espresso transition-[color,padding] duration-300 hover:pl-[.8rem] hover:text-bronze max-md:grid-cols-[12%_1fr_auto] max-md:gap-[.8rem]"
          >
            <span className="font-mono text-[.67rem] text-bronze">0{index + 1}</span>
            <strong className="font-serif text-[clamp(1.7rem,3vw,3rem)] font-medium">{service}</strong>
            <ArrowUpRight size={20} />
          </button>
        ))}
      </div>
    </section>
  )
}

export default Services
