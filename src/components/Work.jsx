import { ArrowUpRight } from 'lucide-react'
import { projects } from '../data/content'

function Work() {
  return (
       <section className="h-[100dvh] overflow-hidden bg-ivory px-[5vw] pt-28 pb-36 max-md:px-[6vw]" id="work" data-scroll-section>
      <div className="mb-28 flex justify-between max-md:mb-16 max-md:block">
        <div className="flex items-center gap-[1.8rem] font-mono text-[.67rem] tracking-[.1em] uppercase text-bronze">
          <span className="text-espresso">02</span>
          <span>Selected work</span>
        </div>
        <p className="mb-0 text-right font-serif text-[1.55rem] leading-[1.1] max-md:mt-8 max-md:text-left">
          Thoughtful solutions
          <br />
          for real places.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-[2.1rem] max-md:block">
        {projects.map((project, i) => (
          <article className={`group max-md:mb-16 ${i === 1 ? 'mt-28 max-md:mt-0' : ''}`} key={project.number}>
            <div className="mb-4 flex items-center justify-between font-mono text-[.67rem] tracking-[.1em] uppercase text-bronze">
              <span className="text-espresso">{project.number}</span>
              <span>{project.type}</span>
            </div>
            <div className="relative overflow-hidden">
              <img
                className="aspect-[.78/1] saturate-[.7] transition-transform duration-[650ms] ease-[cubic-bezier(.2,.8,.2,1)] group-hover:scale-[1.04] max-md:aspect-[1/1.15]"
                src={project.image}
                alt={`${project.title} project`}
              />
              <div className="absolute right-4 top-4 flex h-16 w-16 translate-y-2 items-center justify-center rounded-full bg-bronze text-ivory opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <ArrowUpRight size={22} />
              </div>
            </div>
            <h3 className="mb-0 mt-4 font-serif text-[1.7rem] font-medium">{project.title}</h3>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Work
