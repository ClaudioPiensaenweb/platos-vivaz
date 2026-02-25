export interface Product {
  id: number;
  status: string;
  sort: number | null;
  name: string;
  slug: string;
  subtitle: string | null;
  range_category: "Premium Natura" | "Eco Star Efficiency" | "Special Formats";
  pah_level: "0 mg/kg - Free" | "< 50 mg/kg - Compliant";
  material: "Resina de Pino 100%" | "Híbrido Ecológico";
  diameter_mm: number | null;
  weight_g: number | null;
  color: string | null;
  badge_text: string | null;
  description_short: string | null;
  description: string | null;
  image: string | null;
  image_transparent: string | null;
  logistics_data: LogisticsData | null;
  certifications: string[] | null;
  height_mm: number | null;
  resin_pct: number | null;
  issf_approved: boolean;
  disciplines?: { pim_disciplines_id: Discipline }[];
  featured: boolean;
  translations?: ProductTranslation[];
}

export interface ProductTranslation {
  languages_code: string;
  name: string;
  subtitle: string | null;
  description_short: string | null;
  description: string | null;
  badge_text: string | null;
}

export interface LogisticsData {
  box_units: number;
  pallet_eu: {
    boxes: number;
    total: number;
  };
  container_20: {
    pallets: number;
    method: string;
    total: number;
  };
  container_40: {
    pallets: number;
    type: string;
    total: number;
  };
}

export interface Discipline {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  icon: string | null;
  sort: number | null;
  status: string;
  translations?: DisciplineTranslation[];
}

export interface DisciplineTranslation {
  languages_code: string;
  name: string;
  description: string | null;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  image: string | null;
  category: BlogCategory | number | null;
  published_at: string | null;
  seo_title: string | null;
  seo_description: string | null;
  status: string;
  translations?: BlogPostTranslation[];
}

export interface BlogPostTranslation {
  languages_code: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  seo_title: string | null;
  seo_description: string | null;
}

export interface BlogCategory {
  id: number;
  name: string;
  slug: string;
  description: string | null;
}

export interface CrmLead {
  id?: number;
  name: string;
  apellidos?: string;
  email: string;
  phone: string;
  company?: string;
  market: "Nacional" | "Internacional";
  interest?: "Distribución" | "Club/Campo" | "Tirador";
  message: string;
  source_page: string;
}

export interface RegulationData {
  limit_date: string;
  pah_limit_mg: number;
  banned_substances: string[];
  regulation_name: string;
  regulation_url: string;
  countdown_enabled: boolean;
}

export interface BrandData {
  logo: string | null;
  logo_dark: string | null;
  color_primary: string;
  color_accent: string;
  color_cream: string;
  font_heading: string;
  font_body: string;
  company_name: string;
  tagline: string;
  phone_national: string;
  phone_export: string;
  email_national: string;
  email_export: string;
  whatsapp: string;
  instagram_url: string;
  catalog_pdf: string | null;
  founded_year: number | null;
  address: string | null;
}

export interface WebVideo {
  id: number;
  title: string;
  thumbnail: string | null;
  video_url: string;
  sort: number;
  status: string;
}

export interface WebPage {
  id: number;
  title: string;
  slug: string;
  canvas_content: Record<string, unknown> | null;
  seo_title: string | null;
  seo_description: string | null;
  seo_image: string | null;
  status: string;
  translations?: WebPageTranslation[];
}

export interface WebPageTranslation {
  languages_code: string;
  title: string;
  canvas_content: Record<string, unknown> | null;
  seo_title: string | null;
  seo_description: string | null;
}

export interface MenuItem {
  id: number;
  title: string;
  slug: string;
  url: string;
  parent_id: number | null;
  sort: number;
  status: string;
  translations?: MenuItemTranslation[];
}

export interface MenuItemTranslation {
  languages_code: string;
  title: string;
}
