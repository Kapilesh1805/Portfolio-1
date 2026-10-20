import { whyUs } from '../data/content'

const stroke = { fill: 'none', strokeWidth: 1.4, strokeLinejoin: 'round', strokeLinecap: 'round' }
const G = '#8B5E3C'
const A = '#C98E7A'

const icons = {
  calendar: (
    <>
      <rect x="8" y="10" width="32" height="30" rx="2" stroke={G} />
      <path d="M8 18h32" stroke={A} />
      <path d="M16 6v8M32 6v8" stroke={G} />
      <path d="M17 33v-9l-3 3M21 32h5v-4h-5v-4h5" stroke={G} />
    </>
  ),
  rupee: (
    <>
      <path d="M5 24c5-8 13-12 19-12s14 4 19 12c-5 8-13 12-19 12S10 32 5 24z" stroke={G} />
      <circle cx="24" cy="24" r="8" stroke={A} />
      <path d="M20.5 20.5h7M20.5 24h7M22 20.5c4 0 4 5 0 5l4 4" stroke={A} />
    </>
  ),
  badge: (
    <>
      <circle cx="24" cy="21" r="12" stroke={G} />
      <circle cx="24" cy="21" r="8" stroke={A} />
      <path d="M20 21l3 3 6-6" stroke={A} />
      <path d="M17 31l-3 12 10-4 10 4-3-12" stroke={G} />
    </>
  ),
  calculator: (
    <>
      <rect x="10" y="5" width="26" height="38" rx="2" stroke={G} />
      <rect x="14" y="9" width="18" height="7" stroke={A} />
      <path d="M15 22h3M22 22h3M29 22h3M15 28h3M22 28h3M15 34h3M22 34h3" stroke={G} />
      <circle cx="32" cy="33" r="7" stroke={A} fill="#FDF8F5" />
      <path d="M29.5 35.5l5-5" stroke={A} />
    </>
  ),
}

function WhyUs() {
  return (
    <section className="bg-section px-[5vw] pb-28 pt-8 max-md:px-[6vw]" id="why-us" data-scroll-section>
      <div className="flex items-center gap-[1.8rem] font-mono text-[.67rem] tracking-[.1em] uppercase text-accent">
        <span className="text-heading">04</span>
        <span>Why us</span>
      </div>

      <div className="mx-auto mt-14 max-w-[1100px] border-t border-surface/40 pt-16">
        <h2 className="text-[clamp(1.8rem,3.2vw,3rem)] font-normal tracking-[-.02em] text-heading">{whyUs.title}</h2>

        <ul className="mt-14 grid grid-cols-4 gap-8 max-md:grid-cols-2">
          {whyUs.items.map((item) => (
            <li key={item.title} className="flex flex-col items-start gap-5 text-heading">
              <svg width="64" height="64" viewBox="0 0 48 48" aria-hidden="true" {...stroke}>
                {icons[item.icon]}
              </svg>
              <span className="text-[.95rem]">{item.title}</span>
            </li>
          ))}
        </ul>

        <div className="mt-14 flex flex-wrap items-center gap-6">
          <a
            href="#estimate"
            className="btn-primary rounded-md px-8 py-4 font-mono text-[.78rem] tracking-[.08em] uppercase shadow-sm"
          >
            Book Free Consultation
          </a>
          {whyUs.footnote && <p className="m-0 text-[.75rem] text-body">{whyUs.footnote}</p>}
        </div>
      </div>
    </section>
  )
}

export default WhyUs