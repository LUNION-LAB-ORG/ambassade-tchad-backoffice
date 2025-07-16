export interface IActualite {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  content: string;
  imageUrl?: string;
  published: boolean;
  authorId: string;
  author?: {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
  };
}

export interface IActualiteFormData {
  title: string;
  content: string;
  imageUrl?: string | File;
  published: boolean;
  authorId: string;
}

export interface IActualiteSearchParams {
  search?: string;
  published?: boolean;
  authorId?: string;
  startDate?: Date | string;
  endDate?: Date | string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface IActualiteStats {
  totalNews: number;
  publishedNews: number;
  unpublishedNews: number;
  recentNews: number;
} 