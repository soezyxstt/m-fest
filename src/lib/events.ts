export   const events = [
  {
    title: 'M-Care',
    desc: 'We want to show that we care, Save Blood Save Lives! Register yourself, donate your blood, and get a free medical check up!',
    img: '/event/mcare.jpg',
    url: 'https://bit.ly/RegistrasiMCare',
  },
  {
    title: 'M-Run',
    desc: 'Improve your health and build connection in the process, with us and M-Run.',
    img: ['/event/mrun1.jpg', '/event/mrun2.jpeg'],
  },
  {
    title: 'Engine Tune Up',
    desc: 'Make sure your vehicle always at its prime, come visit us for free engine tune up service!',
    img: ['/event/etu1.jpg', '/event/etu2.jpg'],
  },
  {
    title: 'M-Expo',
    desc: 'Meet some exciting mechanical related companies, projects, machinery, and so many more in this mechanical exhibition.',
    img: '/event/expo.jpeg',
  },
  {
    title: 'Solidarity Forever Summit',
    desc: 'Address important issues, mechanical engineering related, and discuss how we might approach and even solve this problems.',
    img: '/event/solvermit.jpg',
  },
  {
    title: 'M-Talks',
    desc: "Delve deep into the conversation with professionals and experts to better understand the issues we're facing.",
    img: '/event/mtalks.jpg',
  },
  {
    title: 'Ceremony',
    desc: 'End this journey with exhilarating celebration, together with us and our performers!',
    img: '/event/cere.jpg',
  },
];

export function eventTitleFormater(title: string) {
  return title.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toLowerCase());
}