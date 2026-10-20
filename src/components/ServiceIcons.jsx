// Line icons (48x48). Primary elements brown + rose gold accent, per the Rose Gold Chocolate theme.
const G = '#8B5E3C'
const A = '#C98E7A'

const base = { width: 56, height: 56, viewBox: '0 0 48 48', fill: 'none', strokeWidth: 1.4, strokeLinejoin: 'round', strokeLinecap: 'round' }

const icons = {
  'modular-kitchen': (<><rect x="4" y="6" width="8" height="4" stroke={G} /><rect x="36" y="6" width="8" height="4" stroke={G} /><path d="M20 10l2-5h4l2 5M18 10h12" stroke={A} /><rect x="5" y="26" width="38" height="16" stroke={G} /><path d="M5 34h38M24 26v16" stroke={G} /><path d="M20 30h8" stroke={A} /></>),
  'storage-wardrobe': (<><rect x="8" y="5" width="22" height="38" stroke={G} /><path d="M19 5v38" stroke={G} /><path d="M16 22v4M22 22v4" stroke={A} /><rect x="30" y="14" width="10" height="29" stroke={G} /><path d="M30 24h10M30 34h10" stroke={G} /></>),
  'crockery-units': (<><rect x="9" y="6" width="30" height="36" stroke={G} /><path d="M9 20h30M24 6v14M9 30h30" stroke={G} /><path d="M14 27h6M28 27h4" stroke={G} /><path d="M20 35h8" stroke={A} /></>),
  'space-saving-furniture': (
    <>
      <rect x="10" y="6" width="28" height="36" rx="2" stroke={G} />
      <path d="M10 16h28" stroke={G} />
      <path d="M14 28h20" stroke={G} />
      <path d="M14 28l-4 8h28l-4-8" stroke={A} />
      <path d="M14 36v6M34 36v6" stroke={G} />
      <path d="M21 11a4 4 0 0 1 6 0" stroke={A} />
      <path d="M27 9v3h-3" stroke={A} />
      <rect x="22" y="21" width="4" height="2" rx="0.5" stroke={A} />
    </>
  ),
  'tv-units': (<><rect x="12" y="6" width="24" height="16" stroke={G} /><path d="M24 22v5M16 27h16" stroke={G} /><rect x="6" y="29" width="36" height="12" stroke={G} /><path d="M24 29v12" stroke={G} /><path d="M11 35h6M31 35h6" stroke={A} /></>),
  'study-tables': (<><rect x="6" y="8" width="12" height="9" stroke={G} /><path d="M5 20h22M8 20v22M25 20v22M8 28h17M8 35h17" stroke={G} /><path d="M12 31h4" stroke={A} /><path d="M32 22h8v10h-8zM36 32v10M32 42h8" stroke={G} /></>),
  'false-ceiling': (<><path d="M8 8h32v8H8z" stroke={G} /><path d="M12 16l-3 8h30l-3-8" stroke={G} /><path d="M24 16v14" stroke={A} /><path d="M19 36l5 5 5-5" stroke={A} /></>),
  lights: (<><path d="M24 4v10" stroke={G} /><circle cx="24" cy="8" r="2.5" stroke={G} /><path d="M18 18h12l7 18H11z" stroke={G} /><path d="M18 18l-2-3h16l-2 3" stroke={G} /><path d="M18 38a6 3 0 0 0 12 0" stroke={A} /></>),
  wallpaper: (<><path d="M14 8h26v34H14z" stroke={G} /><path d="M20 16h2M28 16h2M34 22h2M20 26h2M28 30h2M34 36h2" stroke={A} /><rect x="6" y="28" width="16" height="9" rx="4.5" stroke={G} /></>),
  'wall-paint': (<><rect x="14" y="6" width="26" height="12" rx="2" stroke={G} /><path d="M40 12h4v14H26v6" stroke={G} /><rect x="23" y="32" width="6" height="11" rx="1" stroke={G} /><path d="M14 10c-5 0-8 3-8 8v8" stroke={A} /></>),
  bathroom: (<><rect x="6" y="6" width="22" height="36" stroke={G} /><path d="M17 6v36" stroke={G} /><path d="M32 8h6a3 3 0 0 1 3 3v3M32 8v6M30 26h14M32 26c0 8 3 12 8 12" stroke={G} /><path d="M33 17v1M36 19v1M39 17v1M34 21v1" stroke={A} /></>),
  'pooja-unit': (<><rect x="6" y="14" width="36" height="28" stroke={G} /><path d="M24 6l-3 3v2h-6v3M24 6l3 3v2h6v3" stroke={G} /><path d="M12 36V24c0-5 5-9 12-9s12 4 12 9v12" stroke={G} /><path d="M18 36h12v-5H18z" stroke={A} /></>),
  'foyer-designs': (<><rect x="27" y="6" width="15" height="36" stroke={G} /><path d="M27 24h15" stroke={G} /><rect x="7" y="29" width="18" height="13" stroke={G} /><path d="M7 35h18M9 8v18M9 8h6" stroke={G} /><path d="M12 32h6" stroke={A} /></>),
  'movable-furniture': (
    <>
      <path d="M14 10c0-3 3-5 10-5s10 2 10 5v15H14V10z" stroke={G} />
      <rect x="10" y="24" width="28" height="7" rx="2" stroke={G} />
      <path d="M10 18c-2 0-3 2-3 4v3h5" stroke={A} />
      <path d="M38 18c2 0 3 2 3 4v3h-5" stroke={A} />
      <path d="M24 31v6M16 37h16" stroke={G} />
      <circle cx="15" cy="41" r="2.5" stroke={G} />
      <circle cx="33" cy="41" r="2.5" stroke={G} />
      <path d="M6 41h4M38 41h4" stroke={A} />
      <path d="M20 41h8" stroke={A} strokeDasharray="2 2" />
    </>
  ),
  'kids-bedroom': (<><path d="M6 6v38M42 6v38M6 10h36M6 16h36M6 30h36M6 36h36" stroke={G} /><path d="M12 10v6M12 30v6" stroke={A} /><path d="M18 18v12M26 18v12" stroke={A} strokeDasharray="2 3" /><circle cx="34" cy="24" r="1.4" stroke={G} /></>),
}

export default function ServiceIcon({ slug }) {
  return (
    <svg {...base} aria-hidden="true" className="h-14 w-14">
      {icons[slug]}
    </svg>
  )
}