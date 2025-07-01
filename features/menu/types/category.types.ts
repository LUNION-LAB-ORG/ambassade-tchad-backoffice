export interface ICategory {
    id: string;
    name: string;
    description: string;
    image: string | null;
    entity_status: 'ACTIVE' | 'INACTIVE'; // ou `string` si ce n'est pas enuméré
    created_at: string; // ou `Date` si tu les parses
    updated_at: string;
  }
