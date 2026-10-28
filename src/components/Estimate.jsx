import { useId, useState } from 'react'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { business, estimateConfig } from '../data/content'
import {
  calcEstimate,
  cleanPhone,
  formatRange,
  isValidName,
  isValidPhone,
  mailtoLink,
  submitLead,
  whatsappLink,
} from '../utils/estimate'

const floorplans = Object.keys(estimateConfig.base)
const purposes = Object.keys(estimateConfig.purpose)

function Choice({ name, options, value, onChange, cols }) {
  return (
    <div className={`grid gap-3 ${cols}`}>
      {options.map((opt) => {
        const optionId = `${name}-${opt.replace(/[^a-zA-Z0-9_-]/g, '-').toLowerCase()}`
        return (
          <label key={opt} htmlFor={optionId} className="cursor-pointer">
            <input
              id={optionId}
              type="radio"
              name={name}
              value={opt}
              checked={value === opt}
              onChange={() => onChange(opt)}
              className="peer sr-only"
            />
            <span className="flex h-11 items-center justify-center rounded border border-[#D7B89F]/70 bg-white/60 text-[.82rem] font-medium text-body transition-all peer-checked:bg-[#A06A42] peer-checked:border-[#A06A42] peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-heading hover:border-accent hover:text-heading">
              {opt}
            </span>
          </label>
        )
      })}
    </div>
  )
}

function Field({ id, label, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-[.72rem] font-semibold text-heading">
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-1 text-[.72rem] text-red-700" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

const inputCls =
  'h-11 w-full rounded border border-surface/80 bg-white px-3 text-[.9rem] text-heading outline-none focus:border-accent focus:ring-1 focus:ring-accent'

function Estimate() {
  const uid = useId()
  const [step, setStep] = useState(1) // 1 = floorplan + purpose, 2 = contact, 3 = result
  const [floorplan, setFloorplan] = useState('')
  const [purpose, setPurpose] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [errors, setErrors] = useState({})
  const [sending, setSending] = useState(false)
  const [result, setResult] = useState(null) // { estimate, delivered, deliveryFailed }

  const next = (e) => {
    e.preventDefault()
    const errs = {}
    if (!floorplan) errs.floorplan = 'Please pick your floorplan.'
    if (!purpose) errs.purpose = 'Please pick the purpose.'
    setErrors(errs)
    if (Object.keys(errs).length === 0) setStep(2)
  }

  const submit = async (e) => {
    e.preventDefault()
    const errs = {}
    if (!isValidName(name)) errs.name = 'Please enter your name.'
    if (!isValidPhone(phone)) errs.phone = 'Enter a valid 10-digit mobile number.'
    setErrors(errs)
    if (Object.keys(errs).length) return

    const estimate = calcEstimate(floorplan, purpose, estimateConfig)
    if (!estimate) return
    const lead = { name, phone, floorplan, purpose, estimate }

    setSending(true)
    let delivered = false
    let deliveryFailed = false
    try {
      delivered = (await submitLead(lead)).sent
    } catch {
      deliveryFailed = true
    }
    setSending(false)
    setResult({ lead, delivered, deliveryFailed })
    setStep(3)
  }

  const reset = () => {
    setStep(1)
    setFloorplan('')
    setPurpose('')
    setName('')
    setPhone('')
    setErrors({})
    setResult(null)
  }

  const waLink = result && whatsappLink(result.lead, business)
  const actionLink = result && (waLink || mailtoLink(result.lead, business))

  return (
    <section
      className="relative min-h-screen bg-black px-[5vw] py-20 md:py-28 text-white max-md:px-[6vw]"
      id="estimate"
      data-scroll-section
    >
      <div className="absolute inset-0" aria-hidden="true">
        <img
          src="/services/modular-kitchen/1.webp"
          alt="Modular kitchen interior preview"
          className="h-full w-full object-cover object-center"
        />
        {/* Clean image background with neutral scrim for readability - NO brown tint */}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/25 to-black/40" />
      </div>

      {/* same label row as every other section */}
      <div className="relative z-10 flex items-center gap-[1.8rem] font-mono text-[.67rem] tracking-widest uppercase">
        <span className="text-white/80">04</span>
        <span className="text-accent">Free estimate</span>
      </div>

      {/* same 1100px content column as Services / Why us / Contact */}
      <div className="relative z-10 mx-auto mt-12 md:mt-24 grid w-full max-w-275 grid-cols-[1.2fr_.8fr] items-center gap-[5vw] max-lg:mt-10 max-lg:grid-cols-1">
        <div>
          <h2
            className="text-[clamp(2.2rem,4.4vw,4.4rem)] font-semibold leading-[1.08] tracking-[-.04em] !text-white"
            style={{ color: '#FFFFFF' }}
          >
            Want Clarity on Your
            <br />
            Interior Budget?
            <br />
            Get a FREE Quote Now.
          </h2>
        </div>

        <div className="rounded-2xl bg-[#FAF5F0] p-8 text-heading shadow-2xl border border-surface/30 max-sm:p-6">
          {step < 3 && (
            <>
              <h3 className="m-0 text-[1.12rem] font-semibold leading-snug text-heading">
                Personalized Interior Design
                <br />
                Quote in 30 Seconds
              </h3>
              <p className="mb-5 mt-3 font-mono text-[.7rem] uppercase tracking-wide text-body">
                Step <span className="text-accent font-semibold">{step}</span> of 2
              </p>
            </>
          )}

          {step === 1 && (
            <form onSubmit={next} noValidate>
              <fieldset className="m-0 border-0 p-0">
                <legend className="mb-2 p-0 text-[.72rem] font-semibold text-heading">Your Floorplan</legend>
                <Choice name={`${uid}-fp`} options={floorplans} value={floorplan} onChange={setFloorplan} cols="grid-cols-4 max-sm:grid-cols-2" />
                {errors.floorplan && <p className="mt-1 text-[.72rem] text-red-700" role="alert">{errors.floorplan}</p>}
              </fieldset>

              <fieldset className="m-0 mt-5 border-0 p-0">
                <legend className="mb-2 p-0 text-[.72rem] font-semibold text-heading">Purpose</legend>
                <Choice name={`${uid}-pu`} options={purposes} value={purpose} onChange={setPurpose} cols="grid-cols-3 max-sm:grid-cols-1" />
                {errors.purpose && <p className="mt-1 text-[.72rem] text-red-700" role="alert">{errors.purpose}</p>}
              </fieldset>

              <button
                type="submit"
                className="mt-6 flex h-12 w-full items-center justify-between rounded bg-[#A06A42] px-5 text-[.85rem] font-semibold text-white shadow-md transition-all hover:bg-espresso cursor-pointer"
              >
                Get Free Estimate <ArrowRight size={18} aria-hidden="true" />
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={submit} noValidate className="grid gap-4">
              <p className="m-0 text-[.8rem] text-body">
                {floorplan} · {purpose}
              </p>
              <Field id={`${uid}-name`} label="Your name" error={errors.name}>
                <input
                  id={`${uid}-name`}
                  className={inputCls}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  placeholder="Full name"
                />
              </Field>
              <Field id={`${uid}-phone`} label="Mobile number" error={errors.phone}>
                <div className="flex">
                  <span className="flex h-11 items-center rounded-l border border-r-0 border-surface/80 bg-section px-3 text-[.85rem] text-body">+91</span>
                  <input
                    id={`${uid}-phone`}
                    className={`${inputCls} rounded-l-none`}
                    value={phone}
                    onChange={(e) => setPhone(cleanPhone(e.target.value))}
                    inputMode="numeric"
                    autoComplete="tel-national"
                    placeholder="10-digit number"
                  />
                </div>
              </Field>

              <button
                type="submit"
                disabled={sending}
                className="flex h-12 w-full items-center justify-between rounded bg-[#A06A42] px-5 text-[.85rem] font-semibold text-white shadow-md transition-all hover:bg-espresso cursor-pointer disabled:opacity-60"
              >
                {sending ? 'Calculating…' : 'Show my estimate'} <ArrowRight size={18} aria-hidden="true" />
              </button>
              <button type="button" onClick={() => setStep(1)} className="btn-secondary mt-2 w-max rounded px-4 py-1.5 text-[.78rem]">
                Back
              </button>
            </form>
          )}

          {step === 3 && result && (
            <div aria-live="polite">
              <p className="m-0 text-[.72rem] uppercase tracking-wide text-accent font-semibold">Your estimated budget</p>
              <p className="mb-1 mt-2 font-serif text-[2.2rem] leading-tight text-heading">{formatRange(result.lead.estimate)}</p>
              <p className="m-0 text-[.8rem] text-body">
                {result.lead.floorplan} · {result.lead.purpose}
              </p>
              <p className="mb-5 mt-4 text-[.78rem] leading-relaxed text-body">
                This is an indicative range. The final quote comes after a free consultation and site visit.
              </p>

              {result.delivered ? (
                <p className="mb-4 rounded bg-green-100 px-3 py-2 text-[.8rem] text-green-900">
                  Thanks {result.lead.name.trim().split(' ')[0]}! We have your details and will call you on +91 {cleanPhone(result.lead.phone)}.
                </p>
              ) : (
                <p className="mb-4 text-[.8rem] text-body">
                  {result.deliveryFailed ? 'We could not send your details automatically. ' : ''}
                  Send these details to our team to book your free consultation:
                </p>
              )}

              <a
                href={actionLink}
                target={waLink ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="flex h-12 w-full items-center justify-center gap-2 rounded bg-[#A06A42] text-[.85rem] font-semibold text-white shadow-md transition-all hover:bg-espresso cursor-pointer"
              >
                <MessageCircle size={18} aria-hidden="true" />
                {waLink ? 'Send details on WhatsApp' : 'Send details by email'}
              </a>
              <button type="button" onClick={reset} className="btn-secondary mt-4 w-max rounded px-4 py-1.5 text-[.78rem]">
                Start over
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Estimate