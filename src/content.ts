// Bilingual copy for the lean MarQ site. EN keeps our voice; AR is warm professional MSA.
// `MarQ` is kept Latin in Arabic per the brand book.

export const CONTENT = {
  en: {
    nav: { services: 'Services', work: 'Work', studio: 'Studio', cta: "Let's talk" },
    hero: {
      tagA: 'Branding Solutions',
      tagB: 'Libya · 2026',
      head: ['Brands', 'built to be', 'remembered'], // last word = accent
      sub: 'MarQ is a branding studio in Libya — turning ambitious ideas into identities people recognise, trust, and remember.',
      locLabel: 'Base of operations',
      locValue: 'Tripoli, Libya',
      coords: '32.8872° N · 13.1913° E',
      statNum: '120+',
      statLabel: 'Brands shaped',
      scroll: 'Scroll',
    },
    services: {
      index: '01',
      kicker: ['Our', 'services'],
      head: ['What', 'we do'],
      intro: 'From strategy to production, we deliver one connected system — not a stack of unrelated projects.',
      items: [
        { num: '01', title: 'Brand Strategy' },
        { num: '02', title: 'Identity & Design' },
        { num: '03', title: 'Digital' },
        { num: '04', title: 'Communication' },
        { num: '05', title: 'Production' },
        { num: '06', title: 'Brand Care' },
      ],
    },
    work: {
      index: '02',
      kicker: ['Selected', 'works'],
      head: ['Selected', 'Works'],
      viewAll: 'View all projects',
      items: [
        { name: 'Tikkan F&B', cat: 'Branding & Identity', year: '2026' },
        { name: 'Yalla Logistics', cat: 'Strategy & Digital', year: '2025' },
        { name: 'Noor Clinic', cat: 'Identity & Space', year: '2025' },
        { name: 'Falcon Fintech', cat: 'Brand & Product', year: '2024' },
      ],
    },
    footer: {
      index: '03',
      kicker: ['Ready to', 'leave a mark?'],
      head: ['Leave a', 'mark'],
      blurb: 'Ready to build a brand worth remembering? We take on bold work across Libya and beyond.',
      email: 'hello@marq.studio',
      phone: '+218 21 000 0000',
      copyright: '© 2025 MarQ — Tripoli, Libya.',
    },
  },

  ar: {
    nav: { services: 'خدماتنا', work: 'أعمالنا', studio: 'الاستوديو', cta: 'لنتحدّث' },
    hero: {
      tagA: 'حلول العلامات التجارية',
      tagB: 'ليبيا · 2026',
      head: ['نبني', 'علاماتٍ', 'تُذكر'],
      sub: 'MarQ استوديو علامات تجارية في ليبيا، نحوّل الأفكار الطموحة إلى هويات يتعرّف عليها الناس، ويثقون بها، ويتذكّرونها.',
      locLabel: 'مقرّ العمل',
      locValue: 'طرابلس، ليبيا',
      coords: '32.8872° N · 13.1913° E',
      statNum: '+120',
      statLabel: 'علامة صُمّمت',
      scroll: 'مرّر',
    },
    services: {
      index: '01',
      kicker: ['خدماتنا', ''],
      head: ['ما', 'نقدّمه'],
      intro: 'من الاستراتيجية إلى الإنتاج، نُسلّم العمل كنظامٍ واحدٍ مترابط — لا كمشاريع منفصلة.',
      items: [
        { num: '01', title: 'استراتيجية العلامة' },
        { num: '02', title: 'الهوية والتصميم' },
        { num: '03', title: 'الرقمي' },
        { num: '04', title: 'التواصل' },
        { num: '05', title: 'الإنتاج' },
        { num: '06', title: 'رعاية العلامة' },
      ],
    },
    work: {
      index: '02',
      kicker: ['أعمال', 'مختارة'],
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
      kicker: ['هل أنت مستعد', 'لترك أثر؟'],
      head: ['اترك', 'أثراً'],
      blurb: 'مستعدّ لبناء علامة تُذكر؟ نتولّى الأعمال الجريئة في ليبيا وخارجها.',
      email: 'hello@marq.studio',
      phone: '+218 21 000 0000',
      copyright: '© 2025 MarQ — طرابلس، ليبيا.',
    },
  },
} as const;

export type Content = (typeof CONTENT)['en'];
