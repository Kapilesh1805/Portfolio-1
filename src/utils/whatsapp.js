import { useState, useEffect } from 'react'

const DEFAULT_PHONE = '919500005400'

export function isWhatsAppAlreadyOpened(phone = DEFAULT_PHONE) {
  try {
    return (
      sessionStorage.getItem(`wa_opened_${phone}`) === 'true' ||
      localStorage.getItem(`wa_opened_${phone}`) === 'true'
    )
  } catch {
    return false
  }
}

export function markWhatsAppAsOpened(phone = DEFAULT_PHONE) {
  try {
    sessionStorage.setItem(`wa_opened_${phone}`, 'true')
    localStorage.setItem(`wa_opened_${phone}`, 'true')
    // Notify all active WhatsApp buttons on the page instantly
    window.dispatchEvent(new Event('whatsapp_chat_opened'))
  } catch {
    // Ignore storage restrictions
  }
}

/**
 * Custom hook to manage single-use prefilled message for WhatsApp.
 * First click sends the greeting message.
 * Subsequent clicks open the existing chat directly without duplicate messages.
 */
export function useWhatsAppLink(phone = DEFAULT_PHONE, message = '') {
  const [opened, setOpened] = useState(() => isWhatsAppAlreadyOpened(phone))

  useEffect(() => {
    const handleOpened = () => setOpened(true)
    window.addEventListener('whatsapp_chat_opened', handleOpened)
    return () => window.removeEventListener('whatsapp_chat_opened', handleOpened)
  }, [])

  const onClick = (e) => {
    // If it was already opened, make sure the target href doesn't have the text query
    if (opened || isWhatsAppAlreadyOpened(phone)) {
      if (e?.currentTarget) {
        e.currentTarget.href = `https://wa.me/${phone}`
      }
    } else {
      markWhatsAppAsOpened(phone)
      setOpened(true)
    }
  }

  const url = opened
    ? `https://wa.me/${phone}`
    : `https://wa.me/${phone}${message ? `?text=${encodeURIComponent(message)}` : ''}`

  return { url, onClick, opened }
}

