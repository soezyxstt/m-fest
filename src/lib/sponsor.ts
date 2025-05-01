export const platinumSponsors = [
  'PT Medco Energi Internasional Tbk',
  'PT Bakrie Pipe',
  'Yayasan Solidarity Forever',
];

export const goldSponsors = ['PT GS Battery', 'PT Pupuk Kalimantan Timur'];

export const silverSponsors = [
  'PT Paragon Corp',
  'PT Pertamina Kilang Internasional',
  'PT Adikari Wisesa Indonesia',
  'PT Sagatrade Murni',
  'PT Arkha Jayati Persada',
  'PT Melu Bangun Wiweka',
  'Astra Vision',
  'Geolyra Energy',
  'PHE',
  'PNRE',
  'PT Komatsu Indonesia',
];

export const bronzeSponsors = ['PT Gexcon', 'PT Aerozeta', 'Goser', 'Revolutek', 'SP MPS'];

export const supportingSponsors = [
  'PT LAPI ITB',
  'PT Geodipa',
  'Yayasan Persada Hati',
  'Pertamina Enduro'
];

export const collaborativeSponsors = [
  'Bentley',
  'Himatika',
  'IAFMI',
  'Neutron Bandung',
  'PT Harbour Energy',
  'PT Lestari',
  'PT My Eco',
  'PT Paragon Corp'
];

export const medpartnerSponsors = [
  '8EH',
  'Acara Bandung Transparent',
  'Event Bandung',
  'Fourier',
  'itbreceh',
  'Jagat Event',
  'LFM',
  'Mahasiswa Teknik Mesin'
];

/**
 * Converts sponsor name to image filename format by replacing spaces with underscores
 * and adding a .png extension.
 * @param sponsorName The name of the sponsor
 * @returns The formatted image filename
 */
export function getImageFilename(
  sponsorName: string,
  type:
    | 'platinum'
    | 'gold'
    | 'silver'
    | 'bronze'
    | 'collaborative'
    | 'supporting_technician'
    | 'media'
): string {
  return '/sponsor/' + type + '/' + sponsorName.replace(/\s+/g, '_') + '.png';
}
