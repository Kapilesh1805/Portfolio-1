// Pure helpers for the estimate form (no React) so they are easy to test.

const round1 = (n) => Math.round(n * 10) / 10

/** floorplan + purpose -> { min, max } in lakhs, or null if either is unknown. */
export function calcEstimate(floorplan, purpose, cfg) {
  const base = cfg.base[floorplan]
  const mult = cfg.purpose[purpose]
  if (!base || typeof mult !== 'number') return null
  return { min: round1(base[0] * mult), max: round1(base[1] * mult) }
}

export function formatLakhs(l) {
  if (l >= 100) return `₹${(l / 100).toFixed(2).replace(/\.?0+$/, '')} Cr`
  return `₹${l.toFixed(1).replace(/\.0$/, '')} L`
}

export const formatRange = (e) => `${formatLakhs(e.min)} – ${formatLakhs(e.max)}`

/** Keep digits only, drop a leading 91 / 0, max 10 digits. */
export function cleanPhone(v) {
  let d = String(v).replace(/\D/g, '')
  if (d.length > 10 && d.startsWith('91')) d = d.slice(2)
  if (d.length > 10 && d.startsWith('0')) d = d.slice(1)
  return d.slice(0, 10)
}

export const isValidPhone = (v) => /^[6-9]\d{9}$/.test(cleanPhone(v))
export const isValidName = (v) => v.trim().length >= 2

export function leadMessage({ name, phone, floorplan, purpose, estimate }, business) {
  return [
    `Hi ${business.name}, I'd like a free interior estimate.`,
    `Name: ${name.trim()}`,
    `Phone: +91 ${cleanPhone(phone)}`,
    `Floorplan: ${floorplan}`,
    `Purpose: ${purpose}`,
    `Estimate shown: ${formatRange(estimate)}`,
  ].join('\n')
}

export function whatsappLink(lead, business) {
  if (!business.whatsapp) return null
  return `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(leadMessage(lead, business))}`
}

export function mailtoLink(lead, business) {
  const subject = `Free estimate request: ${lead.floorplan}, ${lead.purpose}`
  return `mailto:${business.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(leadMessage(lead, business))}`
}

/**
 * Optional: POST the lead to a form service (Formspree, Web3Forms, your own API).
 * Set VITE_LEAD_ENDPOINT in .env. With no endpoint this is a no-op and the
 * visitor sends the lead through WhatsApp / e-mail instead.
 */
export async function submitLead(lead) {
  const endpoint = import.meta.env.VITE_LEAD_ENDPOINT
  if (!endpoint) return { sent: false, skipped: true }
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      name: lead.name.trim(),
      phone: cleanPhone(lead.phone),
      floorplan: lead.floorplan,
      purpose: lead.purpose,
      estimate: formatRange(lead.estimate),
    }),
  })
  if (!res.ok) throw new Error(`Lead endpoint returned ${res.status}`)
  return { sent: true }
}