import { RTLTranslations } from '@/types/translations.generated';

export const getNavItems = (pageText: RTLTranslations['navBar']) => [
  { label: pageText.home, href: '/' },
  { label: pageText.proposals, href: '/proposals' },
  { label: pageText.aboutUs, href: '/about' },
];
