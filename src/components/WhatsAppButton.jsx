import React from 'react'
import { useWhatsAppLink } from '../utils/whatsapp'

export default function WhatsAppButton({
  phoneNumber = '919500005400',
  message = "Hi Balaji Interior Decor, I'd like to enquire about your interior design services.",
}) {
  const { url, onClick } = useWhatsAppLink(phoneNumber, message)

  return (
    <a
      href={url}
      onClick={onClick}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Balaji Interior Decor on WhatsApp"
      className="group fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-full bg-[#25D366] p-3.5 md:px-4 md:py-3 text-white shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-[#20bd5a] hover:shadow-[0_8px_30px_rgba(37,211,102,0.4)] focus:outline-none focus:ring-4 focus:ring-[#25D366]/40 cursor-pointer"
    >
      {/* Pulsing subtle ambient radar wave */}
      <span className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-[#25D366] animate-ping opacity-25" />

      {/* Official WhatsApp SVG Icon */}
      <svg
        className="h-6 w-6 fill-current shrink-0"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.276-.1-.477-.15-.678.15-.2.301-.778.978-.954 1.179-.176.2-.351.226-.652.075-.301-.15-1.27-.468-2.42-1.494-.894-.799-1.498-1.786-1.674-2.087-.176-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.176.2-.301.3-.502.101-.2.05-.376-.025-.527-.075-.15-.678-1.631-.929-2.234-.244-.587-.492-.507-.678-.516-.176-.009-.376-.011-.577-.011-.201 0-.527.075-.803.376-.276.301-1.054 1.029-1.054 2.509 0 1.48 1.079 2.91 1.23 3.111.15.2 2.124 3.243 5.146 4.55.719.311 1.28.497 1.718.636.723.23 1.38.198 1.9.12.58-.088 1.78-.728 2.031-1.431.251-.703.251-1.305.176-1.431-.075-.126-.276-.201-.577-.351zM12.042 21.672c-1.761 0-3.486-.474-5.006-1.371l-.359-.213-3.722.976.993-3.627-.233-.371c-.985-1.569-1.505-3.383-1.505-5.244 0-5.414 4.405-9.82 9.825-9.82 2.623 0 5.089 1.022 6.944 2.879 1.855 1.856 2.877 4.323 2.876 6.947 0 5.416-4.406 9.823-9.823 9.823zm8.334-18.157c-2.226-2.228-5.186-3.455-8.334-3.455-6.49 0-11.77 5.279-11.77 11.77 0 2.073.541 4.098 1.568 5.882l-1.666 6.087 6.227-1.634c1.716.936 3.654 1.43 5.641 1.43 6.49 0 11.77-5.28 11.77-11.77 0-3.143-1.226-6.103-3.436-8.31z" />
      </svg>

      {/* Label (shown on desktop, compact on small screens) */}
      <span className="hidden md:inline font-sans text-xs font-semibold tracking-wide">
        Chat on WhatsApp
      </span>
    </a>
  )
}
