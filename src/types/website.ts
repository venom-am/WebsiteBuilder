export type CompanyDetails = {
  name: string;
  tagline: string;
  description: string;
  industry: string;
  foundedYear: string;
  logo?: File | null;
  colorScheme: 'blue' | 'teal' | 'purple' | 'amber' | 'rose';
};

export type ContactInfo = {
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  socialMedia: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
};

export type ProductInfo = {
  id: string;
  name: string;
  description: string;
  features: string[];
  image?: File | null;
};

export type WebsiteData = {
  companyDetails: CompanyDetails;
  contactInfo: ContactInfo;
  products: ProductInfo[];
  currentStep: number;
};

export const defaultWebsiteData: WebsiteData = {
  companyDetails: {
    name: '',
    tagline: '',
    description: '',
    industry: '',
    foundedYear: new Date().getFullYear().toString(),
    logo: null,
    colorScheme: 'blue',
  },
  contactInfo: {
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    socialMedia: {
      facebook: '',
      twitter: '',
      instagram: '',
      linkedin: '',
    },
  },
  products: [
    {
      id: '1',
      name: '',
      description: '',
      features: [''],
      image: null,
    },
  ],
  currentStep: 0,
};

export const colorSchemes = {
  blue: {
    primary: 'bg-blue-700',
    primaryHover: 'hover:bg-blue-800',
    secondary: 'bg-blue-100',
    text: 'text-blue-700',
    accent: 'bg-orange-500',
    gradient: 'from-blue-800 to-blue-600',
  },
  teal: {
    primary: 'bg-teal-600',
    primaryHover: 'hover:bg-teal-700',
    secondary: 'bg-teal-100',
    text: 'text-teal-600',
    accent: 'bg-pink-500',
    gradient: 'from-teal-700 to-teal-500',
  },
  purple: {
    primary: 'bg-purple-600',
    primaryHover: 'hover:bg-purple-700',
    secondary: 'bg-purple-100',
    text: 'text-purple-600',
    accent: 'bg-yellow-500',
    gradient: 'from-purple-700 to-purple-500',
  },
  amber: {
    primary: 'bg-amber-600',
    primaryHover: 'hover:bg-amber-700',
    secondary: 'bg-amber-100',
    text: 'text-amber-600',
    accent: 'bg-indigo-500',
    gradient: 'from-amber-700 to-amber-500',
  },
  rose: {
    primary: 'bg-rose-600',
    primaryHover: 'hover:bg-rose-700',
    secondary: 'bg-rose-100',
    text: 'text-rose-600',
    accent: 'bg-cyan-500',
    gradient: 'from-rose-700 to-rose-500',
  }
};