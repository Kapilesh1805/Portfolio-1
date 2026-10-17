export const projects = [
  {
    number: '01',
    title: 'Casa Marea',
    type: 'Hospitality / 2024',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85',
  },
  {
    number: '02',
    title: 'Common Ground',
    type: 'Workplace / 2023',
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=85',
  },
  {
    number: '03',
    title: 'Quiet Forms',
    type: 'Residential / 2023',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85',
  },
]

export const services = ['Brand worlds', 'Spaces & interiors', 'Digital experiences', 'Creative direction']

// ---------------------------------------------------------------------------
// "What we do": 15 services. Each service has its own page (/services/<slug>)
// and its own image folder:  public/services/<slug>/1.webp ... <count>.webp
// To change a photo, just replace the file. To add one, add the file and
// raise `count`. 1.webp is also the hover thumbnail in the grid.
// videos -> later, e.g. ['/services/videos/modular-kitchen-1.mp4']
// needsClientPhotos: true -> not enough matching photos yet, ask the client.
// ---------------------------------------------------------------------------
const area = (slug, label, count, blurb, extra = {}) => ({
  slug,
  label,
  blurb,
  count,
  image: `/services/${slug}/1.webp`,
  gallery: Array.from({ length: count }, (_, i) => `/services/${slug}/${i + 1}.webp`),
  videos: [],
  ...extra,
})

export const serviceAreas = [
  area('modular-kitchen', 'Modular Kitchen', 7, 'Kitchens planned around how you cook: smart storage, easy-clean finishes and clean lines.'),
  area('storage-wardrobe', 'Storage and wardrobe', 6, 'Wardrobes and storage walls built to the room, so every corner earns its place.'),
  area('crockery-units', 'Crockery Units', 5, 'Glass-front and closed units that display what you love and hide what you do not.'),
  area('space-saving-furniture', 'Space Saving Furniture', 6, 'Built-in desks, storage beds and wall units that give the floor back to you.', { needsClientPhotos: true }),
  area('tv-units', 'TV Units', 5, 'Entertainment walls with concealed storage, soft lighting and a tidy finish.', { needsClientPhotos: true }),
  area('study-tables', 'Study Tables', 6, 'Study corners with shelves, drawers and good light for focus.'),
  area('false-ceiling', 'False Ceiling', 7, 'Ceiling profiles and cove lighting that set the mood of the whole room.'),
  area('lights', 'Lights', 7, 'Layered lighting: linear profiles, spots and concealed strips planned with the design.'),
  area('wallpaper', 'Wallpaper', 6, 'Feature walls and textured finishes that add depth without clutter.', { needsClientPhotos: true }),
  area('wall-paint', 'Wall Paint', 7, 'Considered colour and finish, matched to your furniture and light.'),
  area('bathroom', 'Bathroom', 5, 'Bathroom storage, vanities and mirror units designed for daily use.', { needsClientPhotos: true }),
  area('pooja-unit', 'Pooja Unit', 5, 'A calm, well-lit pooja space that fits your home and your practice.', { needsClientPhotos: true }),
  area('foyer-designs', 'Foyer Designs', 6, 'Entrances with shoe storage, mirrors and a first impression to match.', { needsClientPhotos: true }),
  area('movable-furniture', 'Movable furniture', 6, 'Flexible tables, chairs and units you can reposition as life changes.', { needsClientPhotos: true }),
  area('kids-bedroom', 'Kids Bedroom', 6, 'Bedrooms that grow with the child: sleep, study and play planned together.'),
]

// ---------------------------------------------------------------------------
// Contact details used by the estimate form.
// whatsapp: country code + number, digits only, e.g. '919876543210'.
// If whatsapp is empty the form falls back to e-mail.
// ---------------------------------------------------------------------------
export const business = {
  name: 'Balaji Interior Decor',
  whatsapp: '',
  email: 'hello@atelier.studio',
}

// "Why choose us" row. CONFIRM EVERY CLAIM WITH THE CLIENT before publishing.
export const whyUs = {
  title: 'Why Homeowners Love Working With Us',
  items: [
    { icon: 'calendar', title: 'Delivery in 45 days*' },
    { icon: 'rupee', title: 'No Hidden Costs' },
    { icon: 'badge', title: 'Flat 10-Year Warranty' },
    { icon: 'calculator', title: 'Easy EMIs' },
  ],
  footnote: '*Timelines depend on scope and site readiness.',
}

// ---------------------------------------------------------------------------
// Estimate calculator. SAMPLE RATES: replace with the client's real rates.
// base[floorplan] = [min, max] in lakhs (INR). purpose = multiplier on both.
// ---------------------------------------------------------------------------
export const estimateConfig = {
  base: {
    '1 BHK': [2.5, 4],
    '2 BHK': [4, 6.5],
    '3 BHK': [6, 10],
    '3+ BHK': [10, 16],
  },
  purpose: {
    'Move In': 1,
    'Rent Out': 0.7,
    Renovate: 0.85,
  },
}