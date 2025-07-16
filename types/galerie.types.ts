export interface IGaleriePhoto {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  title?: string;
  description?: string;
  imageUrl: string;
}

export interface IGalerieVideo {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  title?: string;
  description?: string;
  youtubeUrl: string;
  likesCount?: number;
  shareCount?: number;
  featured?: boolean;
}

export interface IService {
  id: string;
  nom: string;
  description: string;
  descriptionComplete: string;
  icone?: string;
  image?: string;
  categorie: "consulaire" | "administratif" | "juridique" | "culture" | "commerce" | "autre";
  tags?: string[];
  status: "actif" | "inactif" | "maintenance" | "bientot_disponible";
  priorite?: "normale" | "importante" | "urgente";
  dateCreation: string;
  dateModification?: string;
  responsable: string;
  contact?: {
    email?: string;
    telephone?: string;
    bureau?: string;
  };
  horaires?: {
    lundi?: string;
    mardi?: string;
    mercredi?: string;
    jeudi?: string;
    vendredi?: string;
    samedi?: string;
    dimanche?: string;
  };
}

export interface IGaleriePhotoFormData {
  title?: string;
  description?: string;
  imageUrl: string | File;
}

export interface IGalerieVideoFormData {
  title?: string;
  description?: string;
  youtubeUrl: string;
}