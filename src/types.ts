export type ProjectCategory = 'Sites' | 'Apps' | 'Sistemas' | 'IA';

export interface Project {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  longDescription?: string;
  category: ProjectCategory;
  imageUrl: string;
  technologies: string[];
  projectUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  metrics?: { label: string; value: string }[];
  keyFeatures?: string[];
  createdAt: string;
  updatedAt?: string;
}

export interface Technology {
  name: string;
  category: 'Frontend' | 'Backend' | 'Database' | 'DevOps & Tools' | 'AI & Data';
  iconName: string;
  level: number; // 1-100
  description: string;
  experienceYears?: string;
  color: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  description: string;
  highlights: string[];
  icon: string;
  badge?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  projectType: string;
  message: string;
}

export interface SupabaseConfig {
  url: string;
  anonKey: string;
  isConfigured: boolean;
}
