export   const competitions: {
  title: string;
  logo: string;
  desc: string;
  regLink: string;
  abbreviation: string;
  cover: string;
  isOpen?: boolean;
  prize: number;
  reg1: string;
  reg2: string;
}[] = [
  {
    title: 'Business Case Competition',
    logo: '/competition/logo/bcc.png',
    desc: 'Business Case Competition M-Fest 2025, part of M-Festival 2025, challenges Indonesian undergraduate students to develop problem-solving and innovative thinking skills. The competition involves company collaborations to create case books for participants to analyze and provide strategic business solutions.',
    regLink: 'https://www.google.com',
    abbreviation: 'BCC',
    isOpen: false,
    cover: '/competition/bcc-cover.png',
    prize: 10000000,
    reg1: '3 - 12 February 2025',
    reg2: '13 February - 25 February 2025',
  },
  {
    title: 'Inovative Poster and Paper Competition',
    logo: '/competition/logo/paper.png',
    desc: "Innovative Paper and Poster Competition M-Fest 2025, part of M-Festival 2025, is a platform for Indonesian undergraduate students to develop clean energy solutions. The competition aims to generate creative ideas for reducing carbon emissions and accelerating Indonesia's clean energy transition through innovative waste energy utilization.",
    regLink: 'https://www.google.com',
    abbreviation: 'IPPC',
    cover: '/competition/paper-cover.png',
    reg1: '3 - 12 February 2025',
    reg2: '13 February - 25 February 2025',
    prize: 11000000,
  },
  {
    title: 'Pipeline Design Competition',
    logo: '/competition/logo/pipeline.png',
    desc: 'Pipeline Design Competition M-Fest 2025, part of M-Festival 2025, is a platform for Indonesian undergraduate students to develop pipeline design expertise. The competition challenges participants to create economical and reliable pipeline solutions while considering safety and environmental sustainability in energy distribution.',
    regLink: 'https://www.google.com',
    abbreviation: 'Pipeline',
    cover: '/competition/pipeline-cover.png',
    prize: 12500000,
    reg1: '3 - 23 February 2025',
    reg2: '24 February - 30 April 2025',
  },
  {
    title: 'STEM Competition',
    logo: '/competition/logo/stem.png',
    desc: 'STEM Competition M-Fest 2025, part of M-Festival 2025, provides an inspiring platform for Indonesian high school students to enhance their STEM skills. The competition encourages innovation and real contributions to sustainability in Indonesia while accelerating SDGs achievement through STEM-based solutions.',
    regLink: 'https://www.google.com',
    abbreviation: 'STEM',
    cover: '/competition/stem-cover.png',
    prize: 12000000,
    reg1: '18 - 24 February 2025',
    reg2: '25 February - 13 April 2025',
  },
];