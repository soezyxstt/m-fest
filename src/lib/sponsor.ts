export const platinumSponsors = [
  'PT Medco Energi Internasional Tbk',
  'PT Bakrie Pipe',
];

export const goldSponsors = ['PT GS Battery', 'PT Pupuk Kalimantan Timur'];

export const silverSponsors = [
  'PT Paragon Corp',
  'PT Pertamina Kilang Internasional',
  'PT Adikari Wisesa Indonesia',
  'PT Sagatrade Murni',
  'PT Arkha Jayati Persada',
  'PT Melu Bangun Wiweka',
];

export const bronzeSponsors = ['PT Gexcon', 'PT Aerozeta'];

export const supportingSponsors = [
  'PT LAPI ITB',
  'PT Geodipa',
  'Yayasan Persada Hati',
];

export const collaborativeSponsors = [
  'Himpunan Mahasiswa Teknik Kimia ITB',
  'Himpunan Mahasiswa Teknik Pertambangan ITB',
  'Himpunan Mahasiswa Teknik Perminyakan ITB',
  'Himpunan Mahasiswa Teknik Metalurgi ITB',
  'AIChE ITB Student Chapter',
  'SPE ITB Student Chapter',
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
): string {
  return '/sponsor/' + type + '/' + sponsorName.replace(/\s+/g, '_') + '.png';
}
