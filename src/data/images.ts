/**
 * Centralised royalty-free photography (Unsplash). Keeping image URLs in one
 * module means listings, sections and pages stay visually consistent and are
 * easy to swap when real property photography is available.
 */
const u = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const images = {
  // Cinematic full-page backdrop — luxury villa with infinity pool at sunset.
  backdrop: u('photo-1613490493576-7fde63acd811', 1920),
  hero: u('photo-1613490493576-7fde63acd811', 2000),
  aboutAdvisor: u('photo-1573497019940-1c28c88b4f3e', 1400),
  contactArchitecture: u('photo-1600607687920-4e2a09cf159d', 1600),
} as const;

export const propertyImages = {
  hillsideVilla: [
    u('photo-1613490493576-7fde63acd811'),
    u('photo-1600607687939-ce8a6c25118c'),
    u('photo-1600566753086-00f18fb6b3ea'),
    u('photo-1613977257363-707ba9348227'),
  ],
  glassMansion: [
    u('photo-1600596542815-ffad4c1539a9'),
    u('photo-1600210492486-724fe5c67fb0'),
    u('photo-1600585154526-990dced4db0d'),
    u('photo-1512918728675-ed5a9ecdebfd'),
  ],
  waterfrontEstate: [
    u('photo-1600047509807-ba8f99d2cdde'),
    u('photo-1580587771525-78b9dba3b914'),
    u('photo-1600607687920-4e2a09cf159d'),
    u('photo-1502672260266-1c1ef2d93688'),
  ],
  skyPenthouse: [
    u('photo-1582268611958-ebfd161ef9cf'),
    u('photo-1568605114967-8130f3a36994'),
    u('photo-1497366216548-37526070297c'),
    u('photo-1523217582562-09d0def993a6'),
  ],
  coastalRetreat: [
    u('photo-1605276374104-dee2a0ed3cd6'),
    u('photo-1564013799919-ab600027ffc6'),
    u('photo-1570129477492-45c003edd2be'),
    u('photo-1600585154340-be6161a56a0c'),
  ],
  modernEstate: [
    u('photo-1512917774080-9991f1c4c750'),
    u('photo-1600880292203-757bb62b4baf'),
    u('photo-1560518883-ce09059eeffa'),
    u('photo-1600607687939-ce8a6c25118c'),
  ],
} as const;
