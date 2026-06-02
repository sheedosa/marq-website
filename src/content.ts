// Bilingual copy — EN keeps our voice; AR is warm professional MSA.
// MarQ stays Latin in Arabic per the brand book.

export const CONTENT = {
  en: {
    nav: { services: 'Services', work: 'Work', studio: 'Studio', cta: "Let's Talk" },
    hero: {
      tagA: 'Branding Solutions',
      tagB: 'Libya · 2026',
      head: ['Brands', 'Remembered'],
      sub: 'MarQ is a Libyan branding studio that transforms ambitious ideas into identities people recognise, trust, and remember.',
      locLabel: 'Base of Operations',
      locValue: 'Tripoli, Libya',
      coords: '32.8872° N, 13.1913° E',
      statNum: '120+',
      statLabel: 'Brands Shaped',
      scroll: 'Scroll',
      explore: 'Explore',
    },
    services: {
      index: '01',
      kicker: 'Our Services',
      head: ['What', 'We Do'],
      intro: 'From strategy to production, we deliver one connected brand system — not a stack of unrelated projects.',
      items: [
        { num: '01', title: 'Brand Strategy', desc: 'Positioning, architecture, naming, audience insight, and brand voice.' },
        { num: '02', title: 'Identity & Design', desc: 'Logos, visual systems, typography, guidelines, and art direction.' },
        { num: '03', title: 'Digital', desc: 'Websites, UI/UX, social systems, motion, and digital experiences.' },
        { num: '04', title: 'Communication', desc: 'Campaigns, content strategy, social management, and internal comms.' },
        { num: '05', title: 'Production', desc: 'Print, packaging, photography, video, and event design.' },
        { num: '06', title: 'Brand Care', desc: 'Ongoing design partnership, templates, and asset systems.' },
      ],
    },
    work: {
      index: '02',
      kicker: 'Selected Work',
      head: ['Selected', 'Works'],
      viewAll: 'View All Projects',
      items: [
        { name: 'Tikkan F&B', cat: 'Branding & Identity', year: '2026' },
        { name: 'Yalla Logistics', cat: 'Strategy & Digital', year: '2025' },
        { name: 'Noor Clinic', cat: 'Identity & Space', year: '2025' },
        { name: 'Falcon Fintech', cat: 'Brand & Product', year: '2024' },
      ],
    },
    footer: {
      index: '03',
      kicker: 'Start a Conversation',
      head: ['Leave a', 'Mark'],
      blurb: 'Ready to build a brand worth remembering? We take on bold projects across Libya and beyond.',
      email: 'hello@marq.studio',
      phone: '+218 21 000 0000',
      copyright: '© 2025 MarQ — Tripoli, Libya.',
      socials: ['Instagram', 'LinkedIn', 'Behance'],
    },
  },

  ar: {
    nav: { services: 'خدماتنا', work: 'أعمالنا', studio: 'الاستوديو', cta: 'لنتحدّث' },
    hero: {
      tagA: 'حلول العلامات التجارية',
      tagB: 'ليبيا · 2026',
      head: ['علامات', 'تُذكر'],
      sub: 'MarQ استوديو ليبي للعلامات التجارية — نحوّل الأفكار الطموحة إلى هويات يتعرّف عليها الناس، ويثقون بها، ويتذكّرونها.',
      locLabel: 'مقرّ العمل',
      locValue: 'طرابلس، ليبيا',
      coords: '32.8872° N, 13.1913° E',
      statNum: '120+',
      statLabel: 'علامة صُمّمت',
      scroll: 'مرّر',
      explore: 'استكشف',
    },
    services: {
      index: '01',
      kicker: 'خدماتنا',
      head: ['ما', 'نقدّمه'],
      intro: 'من الاستراتيجية إلى الإنتاج، نُسلّم نظاماً واحداً مترابطاً — لا مشاريع منفصلة.',
      items: [
        { num: '01', title: 'استراتيجية العلامة', desc: 'التموضع، هيكلة العلامة، التسمية، دراسة الجمهور، وصوت العلامة.' },
        { num: '02', title: 'الهوية والتصميم', desc: 'الشعارات، الأنظمة البصرية، الخطوط، الإرشادات، والإدارة الفنية.' },
        { num: '03', title: 'الرقمي', desc: 'المواقع، تجربة المستخدم، أنظمة التواصل الاجتماعي، والتجارب الرقمية.' },
        { num: '04', title: 'التواصل', desc: 'الحملات، استراتيجية المحتوى، إدارة التواصل الاجتماعي، والتواصل الداخلي.' },
        { num: '05', title: 'الإنتاج', desc: 'الطباعة، التغليف، التصوير، الفيديو، وتصميم الفعاليات.' },
        { num: '06', title: 'رعاية العلامة', desc: 'شراكة تصميم مستمرة، قوالب، وأنظمة أصول.' },
      ],
    },
    work: {
      index: '02',
      kicker: 'أعمال مختارة',
      head: ['أعمال', 'مختارة'],
      viewAll: 'عرض كل الأعمال',
      items: [
        { name: 'تِكان للأطعمة', cat: 'علامة وهوية', year: '2026' },
        { name: 'يلا لوجستيك', cat: 'استراتيجية ورقمي', year: '2025' },
        { name: 'عيادة نور', cat: 'هوية ومكان', year: '2025' },
        { name: 'فالكون فينتك', cat: 'علامة ومنتج', year: '2024' },
      ],
    },
    footer: {
      index: '03',
      kicker: 'ابدأ محادثة',
      head: ['اترك', 'أثراً'],
      blurb: 'مستعدّ لبناء علامة تُذكر؟ نتولّى المشاريع الجريئة في ليبيا وخارجها.',
      email: 'hello@marq.studio',
      phone: '+218 21 000 0000',
      copyright: '© 2025 MarQ — طرابلس، ليبيا.',
      socials: ['Instagram', 'LinkedIn', 'Behance'],
    },
  },
} as const;

export type Content = (typeof CONTENT)['en'];
