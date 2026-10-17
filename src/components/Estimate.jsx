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
      {options.map((opt) => (
        <label key={opt} className="cursor-pointer">
          <input
            type="radio"
            name={name}
            value={opt}
            checked={value === opt}
            onChange={() => onChange(opt)}
            className="peer sr-only"
          />
          <span className="flex h-11 items-center justify-center rounded border border-bronze px-2 text-[.8rem] text-bronze transition-colors peer-checked:bg-bronze peer-checked:text-ivory peer-focus-visible:ring-2 peer-focus-visible:ring-espresso hover:bg-bronze/10 peer-checked:hover:bg-bronze">
            {opt}
          </span>
        </label>
      ))}
    </div>
  )
}

function Field({ id, label, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-[.72rem] font-semibold text-espresso">
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
  'h-11 w-full rounded border border-espresso/25 bg-white px-3 text-[.9rem] text-espresso outline-none focus:border-bronze focus:ring-1 focus:ring-bronze'

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
      className="relative min-h-[100dvh] overflow-hidden bg-espresso px-[5vw] pb-28 pt-28 text-ivory max-md:px-[6vw]"
      id="estimate"
      data-scroll-section
    >
      <div className="absolute inset-0" aria-hidden="true">
        <img src="/services/modular-kitchen/1.webp" alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-espresso/70" />
        {/* fades into the Contact section below so the two read as one continuous flow */}
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-b from-transparent to-espresso" />
      </div>

      {/* same label row as every other section */}
      <div className="relative z-10 flex items-center gap-[1.8rem] font-mono text-[.67rem] tracking-[.1em] uppercase">
        <span className="text-ivory">06</span>
        <span className="text-bronze-light">Free estimate</span>
      </div>

      {/* same 1100px content column as Services / Why us / Contact */}
      <div className="relative z-10 mx-auto mt-24 grid w-full max-w-[1100px] grid-cols-[1.2fr_.8fr] items-center gap-[5vw] max-lg:mt-16 max-lg:grid-cols-1">
        <div>
          <h2 className="text-[clamp(2rem,3.9vw,3.7rem)] font-semibold leading-[1.12] tracking-[-.03em]">
            Want Clarity on Your Interior Budget?
            <br />
            Get a FREE Quote Now.
          </h2>
        </div>

        <div className="rounded-xl bg-ivory p-7 text-espresso shadow-2xl max-sm:p-5">
          {step < 3 && (
            <>
              <h3 className="m-0 text-[1.05rem] font-medium leading-snug">
                Personalized Interior Design
                <br />
                Quote in 30 Seconds
              </h3>
              <p className="mb-5 mt-3 text-[.7rem] uppercase tracking-wide">
                Step <span className="text-bronze">{step}</span> of 2
              </p>
            </>
          )}

          {step === 1 && (
            <form onSubmit={next} noValidate>
              <fieldset className="m-0 border-0 p-0">
                <legend className="mb-2 p-0 text-[.72rem] font-semibold">Your Floorplan</legend>
                <Choice name={`${uid}-fp`} options={floorplans} value={floorplan} onChange={setFloorplan} cols="grid-cols-4 max-sm:grid-cols-2" />
                {errors.floorplan && <p className="mt-1 text-[.72rem] text-red-700" role="alert">{errors.floorplan}</p>}
              </fieldset>

              <fieldset className="m-0 mt-5 border-0 p-0">
                <legend className="mb-2 p-0 text-[.72rem] font-semibold">Purpose</legend>
                <Choice name={`${uid}-pu`} options={purposes} value={purpose} onChange={setPurpose} cols="grid-cols-3 max-sm:grid-cols-1" />
                {errors.purpose && <p className="mt-1 text-[.72rem] text-red-700" role="alert">{errors.purpose}</p>}
              </fieldset>

              <button
                type="submit"
                className="mt-6 flex h-12 w-full items-center justify-between rounded bg-bronze px-5 text-[.85rem] font-semibold text-ivory transition-colors hover:bg-espresso"
              >
                Get Free Estimate <ArrowRight size={18} />
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={submit} noValidate className="grid gap-4">
              <p className="m-0 text-[.8rem] text-espresso/70">
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
                  <span className="flex h-11 items-center rounded-l border border-r-0 border-espresso/25 bg-ivory-deep px-3 text-[.85rem]">+91</span>
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
                className="flex h-12 w-full items-center justify-between rounded bg-bronze px-5 text-[.85rem] font-semibold text-ivory transition-colors hover:bg-espresso disabled:opacity-60"
              >
                {sending ? 'Calculating…' : 'Show my estimate'} <ArrowRight size={18} />
              </button>
              <button type="button" onClick={() => setStep(1)} className="bg-transparent text-left text-[.78rem] text-espresso/70 underline hover:text-bronze">
                Back
              </button>
            </form>
          )}

          {step === 3 && result && (
            <div aria-live="polite">
              <p className="m-0 text-[.72rem] uppercase tracking-wide text-bronze">Your estimated budget</p>
              <p className="mb-1 mt-2 font-serif text-[2.2rem] leading-tight">{formatRange(result.lead.estimate)}</p>
              <p className="m-0 text-[.8rem] text-espresso/70">
                {result.lead.floorplan} · {result.lead.purpose}
              </p>
              <p className="mb-5 mt-4 text-[.78rem] leading-relaxed text-espresso/70">
                This is an indicative range. The final quote comes after a free consultation and site visit.
              </p>

              {result.delivered ? (
                <p className="mb-4 rounded bg-green-100 px-3 py-2 text-[.8rem] text-green-900">
                  Thanks {result.lead.name.trim().split(' ')[0]}! We have your details and will call you on +91 {cleanPhone(result.lead.phone)}.
                </p>
              ) : (
                <p className="mb-4 text-[.8rem]">
                  {result.deliveryFailed ? 'We could not send your details automatically. ' : ''}
                  Send these details to our team to book your free consultation:
                </p>
              )}

              <a
                href={actionLink}
                target={waLink ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="flex h-12 w-full items-center justify-center gap-2 rounded bg-bronze text-[.85rem] font-semibold text-ivory transition-colors hover:bg-espresso"
              >
                <MessageCircle size={18} />
                {waLink ? 'Send details on WhatsApp' : 'Send details by email'}
              </a>
              <button type="button" onClick={reset} className="mt-4 bg-transparent text-[.78rem] text-espresso/70 underline hover:text-bronze">
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