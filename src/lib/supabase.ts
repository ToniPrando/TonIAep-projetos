import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Project } from '../types';
import { INITIAL_PROJECTS } from '../data/initialData';

const LOCAL_STORAGE_PROJECTS_KEY = 'tech_portfolio_projects_v5';
const LEGACY_STORAGE_PROJECTS_KEY = 'tech_portfolio_projects_v4';
const LOCAL_STORAGE_SUPABASE_CONFIG_KEY = 'tech_portfolio_supabase_config_v2';

export interface SupabaseSettings {
  url: string;
  anonKey: string;
}

// Retrieve custom stored config or environment variables
export function getSupabaseSettings(): SupabaseSettings {
  try {
    const stored = localStorage.getItem(LOCAL_STORAGE_SUPABASE_CONFIG_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed && typeof parsed.url === 'string' && typeof parsed.anonKey === 'string') {
        return parsed;
      }
    }
  } catch {
    // Quiet fallback
  }

  return {
    url: (import.meta as any).env?.VITE_SUPABASE_URL || '',
    anonKey: (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || '',
  };
}

export function saveSupabaseSettings(settings: SupabaseSettings): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_SUPABASE_CONFIG_KEY, JSON.stringify(settings));
    _supabaseClient = null; // Reset cached client
  } catch {
    // Quiet fallback if localStorage quota exceeded
  }
}

let _supabaseClient: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient | null {
  if (_supabaseClient) return _supabaseClient;

  const { url, anonKey } = getSupabaseSettings();
  if (url && anonKey && url.startsWith('http')) {
    try {
      _supabaseClient = createClient(url, anonKey);
      return _supabaseClient;
    } catch {
      return null;
    }
  }
  return null;
}

export function isSupabaseConnected(): boolean {
  const settings = getSupabaseSettings();
  return Boolean(settings.url && settings.anonKey && settings.url.startsWith('http'));
}

// SQL helper script to set up the projects table in Supabase
export const SUPABASE_SETUP_SQL = `-- 1. Criar a tabela de projetos
CREATE TABLE IF NOT EXISTS public.projects (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT NOT NULL,
  long_description TEXT,
  category TEXT NOT NULL CHECK (category IN ('Sites', 'Apps', 'Sistemas', 'IA')),
  image_url TEXT NOT NULL,
  technologies TEXT[] NOT NULL DEFAULT '{}',
  project_url TEXT,
  github_url TEXT,
  featured BOOLEAN DEFAULT false,
  metrics JSONB,
  key_features TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Habilitar Row Level Security (RLS)
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- 3. Políticas: Leitura pública para todos os visitantes
CREATE POLICY "Public Read Access"
  ON public.projects FOR SELECT
  USING (true);

-- 4. Políticas: Modificação apenas para usuários autenticados
CREATE POLICY "Authenticated Insert"
  ON public.projects FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated Update"
  ON public.projects FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated Delete"
  ON public.projects FOR DELETE
  USING (auth.role() = 'authenticated');

-- 5. Bucket de imagens (opcional)
-- Crie um bucket público chamado 'project-images' no painel Supabase Storage.

-- 6. Tabela para registro de acessos em tempo real (opcional)
CREATE TABLE IF NOT EXISTS public.site_visits (
  id BIGSERIAL PRIMARY KEY,
  visited_at TIMESTAMPTZ DEFAULT NOW(),
  path TEXT,
  user_agent TEXT
);

ALTER TABLE public.site_visits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public Insert Visits"
  ON public.site_visits FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Public Read Visits"
  ON public.site_visits FOR SELECT
  USING (true);
`;

// Fetch all projects (with cloud sync and local cache fallback)
export async function fetchProjects(): Promise<Project[]> {
  const client = getSupabaseClient();

  if (client) {
    try {
      const { data, error } = await client
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        const mapped: Project[] = data.map((item) => ({
          id: item.id,
          title: item.title,
          subtitle: item.subtitle || '',
          description: item.description,
          longDescription: item.long_description || '',
          category: item.category,
          imageUrl: item.image_url,
          technologies: Array.isArray(item.technologies) ? item.technologies : [],
          projectUrl: item.project_url || '',
          githubUrl: item.github_url || '',
          featured: Boolean(item.featured),
          metrics: item.metrics || [],
          keyFeatures: Array.isArray(item.key_features) ? item.key_features : [],
          createdAt: item.created_at || new Date().toISOString(),
        }));

        // Cache locally for fast subsequent loads
        saveLocalProjects(mapped);
        return mapped;
      }
    } catch {
      // Quiet fallback to local data
    }
  }

  // Fallback to local storage
  return getLocalProjects();
}

// Local storage helpers
export function getLocalProjects(): Project[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_PROJECTS_KEY) || localStorage.getItem(LEGACY_STORAGE_PROJECTS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Automatically sync updated titles requested by user
        const normalized = parsed.map((p: Project) => {
          if (
            p.id === 'proj-1' || 
            p.title === 'Sites com Sistemas Integrados' || 
            p.title === 'Sites com Sistemas Integrados e Land pages' ||
            p.title.toLowerCase().includes('land page')
          ) {
            return { ...p, title: 'Sites com Sistemas Integrados e Landing Pages' };
          }
          if (p.id === 'proj-3' || p.title === 'Controle de Banco de Horas Empresarial' || p.title.toLowerCase().includes('banco de horas')) {
            return {
              ...p,
              title: 'Serviços Empresariais',
              subtitle: p.subtitle || 'Gestão corporativa, jornadas de trabalho, controle de horas e processos internos'
            };
          }
          return p;
        });
        localStorage.setItem(LOCAL_STORAGE_PROJECTS_KEY, JSON.stringify(normalized));
        return normalized;
      }
    }
  } catch {
    // Quiet fallback to initial dataset
  }
  // Default to initial dataset
  return INITIAL_PROJECTS;
}

export function saveLocalProjects(projects: Project[]): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_PROJECTS_KEY, JSON.stringify(projects));
  } catch {
    // Quiet fallback
  }
}

// Create or update project
export async function saveProject(project: Project): Promise<{ success: boolean; error?: string }> {
  const client = getSupabaseClient();

  // Always update local cache
  const localProjects = getLocalProjects();
  const existingIndex = localProjects.findIndex((p) => p.id === project.id);
  let updatedProjects: Project[];

  if (existingIndex >= 0) {
    updatedProjects = [
      ...localProjects.slice(0, existingIndex),
      { ...project, updatedAt: new Date().toISOString() },
      ...localProjects.slice(existingIndex + 1),
    ];
  } else {
    updatedProjects = [{ ...project, createdAt: new Date().toISOString() }, ...localProjects];
  }
  saveLocalProjects(updatedProjects);

  // Sync with Supabase if configured
  if (client) {
    try {
      const payload = {
        id: project.id,
        title: project.title,
        subtitle: project.subtitle || null,
        description: project.description,
        long_description: project.longDescription || null,
        category: project.category,
        image_url: project.imageUrl,
        technologies: project.technologies,
        project_url: project.projectUrl || null,
        github_url: project.githubUrl || null,
        featured: project.featured || false,
        metrics: project.metrics || [],
        key_features: project.keyFeatures || [],
        updated_at: new Date().toISOString(),
      };

      const { error } = await client.from('projects').upsert(payload);
      if (error) {
        return { success: true, error: `Salvo localmente (Supabase retornou: ${error.message})` };
      }
    } catch (e: any) {
      return { success: true, error: `Salvo localmente (${e?.message || 'Erro Supabase'})` };
    }
  }

  return { success: true };
}

// Delete project
export async function deleteProject(projectId: string): Promise<{ success: boolean; error?: string }> {
  const localProjects = getLocalProjects();
  const filtered = localProjects.filter((p) => p.id !== projectId);
  saveLocalProjects(filtered);

  const client = getSupabaseClient();
  if (client) {
    try {
      const { error } = await client.from('projects').delete().eq('id', projectId);
      if (error) {
        return { success: true, error: `Removido localmente (${error.message})` };
      }
    } catch (e: any) {
      return { success: true, error: `Removido localmente (${e?.message || 'Erro'})` };
    }
  }

  return { success: true };
}

// Reset to default sample projects
export function resetToInitialProjects(): Project[] {
  saveLocalProjects(INITIAL_PROJECTS);
  return INITIAL_PROJECTS;
}
