export interface CaseStudy {
  slug: string;
  company: string;
  title: string;
  category: string;
  coverImage: string;
  year: number;
  featured?: boolean;
  description?: string;
  links?: { label: string; url: string }[];
}

export interface Article {
  slug: string;
  title: string;
  platform: string;
  language: string;
  hasPage: boolean;
  externalUrl?: string;
  date?: string;
  readTime?: number;
}

export interface NavItem {
  label: string;
  href: string;
  hasIndicator?: boolean;
}

export interface CaseSection {
  id: string;
  label: string;
}
