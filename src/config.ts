const config = {
  cameraZoomLevelIn: 160 + window.innerWidth / 10,
  cameraZoomLevelOut: 100 + window.innerWidth / 20,
  cameraPosOffset: [0, 5.5, -10],
  groupOffset: {
    Innovation: [0, 0, 0],
    Exploration: [-7.7, 0, -2.1],
    Inspiration: [-18.25, 0, -1],
  },
  hiddenPlane: {
    innovation: [9, 12],
    exploration: [9, 11],
    inspiration: [9.5, 12],
  },
  nav: {
    header: 'Lebron James Innovation Center',
    subheader: 'Home of the Nike Advanced Innovation team',
    navLinks: [
      { label: 'Join', href: '/join' },
      { label: 'About', href: '/about' },
    ],
    footer: {
      name: '© 2021 Nike. Inc.',
      text: 'All Rights Reserved',
      links: [
        {
          label: 'Terms of Use',
          url: 'https://agreementservice.svs.nike.com/rest/agreement?agreementType=termsOfUse&uxId=com.nike.nikefooter&country=US&language=en&requestType=redirect',
        },
        {
          label: 'Privacy Policy',
          url: 'https://agreementservice.svs.nike.com/rest/agreement?agreementType=privacyPolicy&uxId=com.nike.nikefooter&country=US&language=en&requestType=redirect',
        },
      ],
    },
  },
  shareText:
    'Welcome to Nike’s LeBron James Innovation Center. Go behind the scenes of innovation at Nike and help create the future of sport.',
  about: {
    header: 'Lebron James Innovation Center',
    video: ['/videos/about_LBJ_Innovation_v1.7.webm', '/videos/about_LBJ_Innovation_v1.7.mp4'],
    caption: '/subtitles/LBJ Innovation_v17.vtt',
    poster: '/images/posters/24_posters.jpg',
    posterMobile: '/images/posters/24_posters_mobile.jpg',
    content: [
      'Like the athlete for whom it is named, the LeBron James Innovation Center on the campus of Nike’s World Headquarters in Beaverton, Oregon, is a beacon of athletic performance. The mission of the researchers, scientists, designers, engineers, makers and artisans who work in this building is to make athletes better and make the world better for athletes.',
      'Nike relies on data and insights from athletes like you to solve problems for athletes of all skill levels, across all sport and fitness dimensions, everywhere. <a href="/join">Sign up</a> today to participate in research that will help create the future of sport.',
      'For media inquiries, contact <a href="mailto:media.relations@nike.com">media.relations@nike.com</a>, or visit <a href="https://news.nike.com/">news.nike.com</a>.',
      'For details about the NIKE, Inc. mission, please visit <a href="https://about.nike.com/">about.nike.com</a>. For investor information, visit <a href="https://investors.nike.com/Home/default.aspx">investors.nike.com</a>.',
    ],
  },
  join: {
    header: 'Join us to create the future of sport',
    content: [
      'Your input, actions, and stats can help push sport forward like never before. Register to take part in research and studies with our experts and athletes* to maximize human potential.',
      '*If you have a body, you are an athlete.',
      '<i>Must be an adult and live in the USA to participate.</i>',
    ],
    joinText: 'Join Us',
    joinUrl: 'https://innovation.nike.com',
    healthCheckFallback: 'Coming soon',
    images: [
      {
        url: '/images/join/23.1.jpg',
        alt: '',
      },
      {
        url: '/images/join/23.4.jpg',
        alt: '',
      },
      {
        url: '/images/join/23.7_B_W.jpg',
        alt: '',
      },
      {
        url: '/images/join/23.12.jpg',
        alt: '',
      },
      {
        url: '/images/join/23.5.jpg',
        alt: '',
      },
      {
        url: '/images/join/23.6.jpg',
        alt: '',
      },
      {
        url: '/images/join/23.11.jpg',
        alt: '',
      },
      {
        url: '/images/join/23.8.jpg',
        alt: '',
      },
      {
        url: '/images/join/23.9.jpg',
        alt: '',
      },
      {
        url: '/images/join/23.10.jpg',
        alt: '',
      },
    ],

    mobileImages: [
      {
        url: '/images/join/23.1.jpg',
        alt: '',
      },
      {
        url: '/images/join/23.4.jpg',
        alt: '',
      },
      {
        url: '/images/join/23.7_B_W.jpg',
        alt: '',
      },
      {
        url: '/images/join/23.12.jpg',
        alt: '',
      },
    ],
  },
  fog: {
    startDist: 5,
    endDist: 28,
    color: '#FAFFFF',
  },
  analyticsId: "UA-209176296-1"
};

export default config;
