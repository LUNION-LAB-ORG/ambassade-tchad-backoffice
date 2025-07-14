"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { IGaleriePhoto } from "@/types/galerie.types";
import { GaleriePhotoCards } from "./galerie-photo-cards";
import { ContentModal, ContentModalField } from "@/components/ui/content-modal";
import { ViewModal } from "@/components/ui/view-modal";
import { toast } from "sonner";

// Modal content component (you would create actual modals based on your existing ones)
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Données d'exemple enrichies
const samplePhotos: IGaleriePhoto[] = [
  {
    id: "1",
    titre: "Cérémonie de remise de diplômes - Programme de bourses",
    description: "Remise solennelle des diplômes aux étudiants tchadiens ayant bénéficié du programme de bourses d'excellence. Cette cérémonie marque l'aboutissement de plusieurs années d'études supérieures à l'étranger.",
    image: "/images/diplomatie/ceremony-1.jpg",
    imageAlt: "Cérémonie de remise de diplômes dans la grande salle de l'ambassade",
    categorie: "diplomatie",
    tags: ["éducation", "bourses", "excellence", "cérémonie", "jeunesse"],
    status: "publié",
    priorite: "importante",
    datePublication: "2025-01-05",
    auteur: "Service Culturel",
    lieu: "Grande salle de l'Ambassade du Tchad",
    evenementAssocie: "Programme de bourses d'excellence 2024-2025",
    metadata: {
      resolution: "4032x3024",
      taille: "2.4 MB",
      format: "JPEG",
      cameraNotes: "Canon EOS R5, 24-105mm f/4"
    },
    vuesCount: 1247,
    likesCount: 89,
    downloadCount: 23,
    featured: true
  },
  {
    id: "2",
    titre: "Festival culturel tchadien - Danse traditionnelle",
    description: "Spectacle de danse traditionnelle lors du festival culturel annuel. Les danseuses en costume traditionnel présentent les danses ancestrales des différentes régions du Tchad.",
    image: "/images/culture/dance-traditional.jpg",
    imageAlt: "Danseuses en costume traditionnel tchadien",
    categorie: "culture",
    tags: ["culture", "tradition", "danse", "festival", "patrimoine"],
    status: "publié",
    priorite: "normale",
    datePublication: "2025-01-03",
    auteur: "Attaché Culturel",
    lieu: "Centre culturel de l'ambassade",
    evenementAssocie: "Festival culturel tchadien 2025",
    metadata: {
      resolution: "3840x2160",
      taille: "3.1 MB",
      format: "JPEG",
      cameraNotes: "Sony A7R IV, 85mm f/1.4"
    },
    vuesCount: 892,
    likesCount: 156,
    downloadCount: 45,
    featured: false
  },
  {
    id: "3",
    titre: "Réunion ministérielle - Coopération économique",
    description: "Réunion de haut niveau entre les ministres tchadiens et leurs homologues pour discuter des accords de coopération économique et des projets d'investissement bilatéraux.",
    image: "/images/diplomatie/meeting-ministers.jpg",
    imageAlt: "Ministres en réunion autour d'une table de conférence",
    categorie: "diplomatie",
    tags: ["diplomatie", "économie", "coopération", "ministres", "accords"],
    status: "publié",
    priorite: "urgente",
    datePublication: "2025-01-01",
    auteur: "Service Diplomatique",
    lieu: "Salle de conférence principale",
    evenementAssocie: "Sommet économique bilatéral 2025",
    metadata: {
      resolution: "6000x4000",
      taille: "4.2 MB",
      format: "RAW/JPEG",
      cameraNotes: "Nikon D850, 24-70mm f/2.8"
    },
    vuesCount: 2156,
    likesCount: 234,
    downloadCount: 67,
    featured: true
  },
  {
    id: "4",
    titre: "Exposition d'art contemporain tchadien",
    description: "Vernissage de l'exposition mettant en avant les œuvres d'artistes contemporains tchadiens. L'exposition présente peintures, sculptures et installations modernes.",
    image: "/images/culture/art-exhibition.jpg",
    imageAlt: "Visiteurs admirant les œuvres d'art dans la galerie",
    categorie: "culture",
    tags: ["art", "exposition", "contemporain", "artistes", "vernissage"],
    status: "publié",
    priorite: "normale",
    datePublication: "2024-12-28",
    auteur: "Coordinateur Culturel",
    lieu: "Galerie d'art de l'ambassade",
    evenementAssocie: "Mois de l'art tchadien",
    metadata: {
      resolution: "4000x2667",
      taille: "2.8 MB",
      format: "JPEG",
      cameraNotes: "Canon EOS 5D Mark IV, 50mm f/1.8"
    },
    vuesCount: 743,
    likesCount: 98,
    downloadCount: 31,
    featured: false
  },
  {
    id: "5",
    titre: "Célébration de la Fête Nationale",
    description: "Cérémonie officielle de célébration de la Fête Nationale du Tchad avec la présence de personnalités diplomatiques et de la communauté tchadienne.",
    image: "/images/ceremonie/national-day.jpg",
    imageAlt: "Cérémonie officielle avec drapeaux et personnalités",
    categorie: "ceremonie",
    tags: ["fête nationale", "cérémonie", "officiel", "drapeaux", "communauté"],
    status: "publié",
    priorite: "importante",
    datePublication: "2024-12-25",
    auteur: "Protocole Diplomatique",
    lieu: "Jardins de l'ambassade",
    evenementAssocie: "Fête Nationale du Tchad 2024",
    metadata: {
      resolution: "5472x3648",
      taille: "3.7 MB",
      format: "JPEG",
      cameraNotes: "Canon EOS R6, 70-200mm f/2.8"
    },
    vuesCount: 1689,
    likesCount: 187,
    downloadCount: 56,
    featured: true
  },
  {
    id: "6",
    titre: "Atelier de formation - Entrepreneuriat féminin",
    description: "Session de formation dédiée à l'entrepreneuriat féminin avec des femmes entrepreneuses tchadiennes et des experts en développement économique.",
    image: "/images/evenement/women-entrepreneurship.jpg",
    imageAlt: "Femmes participantes à l'atelier de formation",
    categorie: "evenement",
    tags: ["formation", "entrepreneuriat", "femmes", "économie", "développement"],
    status: "brouillon",
    priorite: "normale",
    datePublication: "2024-12-20",
    auteur: "Service Économique",
    lieu: "Salle de formation",
    evenementAssocie: "Programme d'autonomisation des femmes",
    metadata: {
      resolution: "3840x2560",
      taille: "2.1 MB",
      format: "JPEG",
      cameraNotes: "Sony A7 III, 35mm f/1.4"
    },
    vuesCount: 456,
    likesCount: 67,
    downloadCount: 18,
    featured: false
  }
];

interface GaleriePhotoCardsContainerProps {
  className?: string;
}

export default function GaleriePhotoCardsContainer({ className }: GaleriePhotoCardsContainerProps) {
  const t = useTranslations("contenu");
  const [photos, setPhotos] = React.useState<IGaleriePhoto[]>(samplePhotos);
  const [isLoading, setIsLoading] = React.useState(false);

  // États pour les modals
  const [viewModalOpen, setViewModalOpen] = React.useState(false);
  const [editModalOpen, setEditModalOpen] = React.useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
  const [createModalOpen, setCreateModalOpen] = React.useState(false);
  const [selectedPhoto, setSelectedPhoto] = React.useState<IGaleriePhoto | null>(null);

  // Définition des champs du formulaire
  const formFields: ContentModalField[] = [
    {
      key: "titre",
      type: "text",
      label: t("gestionGalerie.photo.fields.titre"),
      placeholder: "Entrez le titre de la photo...",
      required: true
    },
    {
      key: "categorie",
      type: "select",
      label: t("gestionGalerie.photo.fields.categorie"),
      required: true,
      options: [
        { value: "evenement", label: t("gestionGalerie.photo.category.evenement") },
        { value: "reception", label: t("gestionGalerie.photo.category.reception") },
        { value: "conference", label: t("gestionGalerie.photo.category.conference") },
        { value: "culture", label: t("gestionGalerie.photo.category.culture") },
        { value: "diplomatie", label: t("gestionGalerie.photo.category.diplomatie") }
      ]
    },
    {
      key: "description",
      type: "textarea",
      label: t("gestionGalerie.photo.fields.description"),
      placeholder: "Décrivez la photo...",
      required: true,
      rows: 3
    },
    {
      key: "image",
      type: "file",
      label: t("gestionGalerie.photo.fields.image"),
      accept: "image/*",
      required: true
    },
    {
      key: "status",
      type: "select",
      label: t("gestionGalerie.photo.fields.status"),
      required: true,
      options: [
        { value: "brouillon", label: t("gestionGalerie.photo.status.brouillon") },
        { value: "publié", label: t("gestionGalerie.photo.status.publie") }
      ]
    },
    {
      key: "tags",
      type: "text",
      label: t("gestionGalerie.photo.fields.tags"),
      placeholder: "Séparez les mots-clés par des virgules..."
    },
    {
      key: "lieu",
      type: "text",
      label: "Lieu de prise de vue",
      placeholder: "Où la photo a-t-elle été prise..."
    },
    {
      key: "evenementAssocie",
      type: "text",
      label: "Événement associé",
      placeholder: "Si la photo est liée à un événement..."
    }
  ];

  // Handlers pour les actions
  const handleView = (photo: IGaleriePhoto) => {
    setSelectedPhoto(photo);
    setViewModalOpen(true);
  };

  const handleEdit = (photo: IGaleriePhoto) => {
    setSelectedPhoto(photo);
    setEditModalOpen(true);
  };

  const handleDelete = (photo: IGaleriePhoto) => {
    setSelectedPhoto(photo);
    setDeleteModalOpen(true);
  };

  const handleCreate = () => {
    setSelectedPhoto(null);
    setCreateModalOpen(true);
  };

  const handleSubmitCreate = async (formData: any) => {
    setIsLoading(true);
    try {
      // Simulation d'une création
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newPhoto: IGaleriePhoto = {
        id: Date.now().toString(),
        titre: formData.titre,
        description: formData.description,
        image: formData.image,
        imageAlt: formData.titre,
        categorie: formData.categorie,
        tags: formData.tags ? formData.tags.split(',').map((tag: string) => tag.trim()) : [],
        status: formData.status,
        priorite: "normale",
        datePublication: new Date().toISOString(),
        auteur: "Utilisateur actuel",
        lieu: formData.lieu || "",
        evenementAssocie: formData.evenementAssocie || "",
        metadata: {
          resolution: "Auto-détecté",
          taille: "À calculer",
          format: "JPEG"
        },
        vuesCount: 0,
        likesCount: 0,
        downloadCount: 0,
        featured: false
      };
      
      setPhotos(prev => [newPhoto, ...prev]);
      setCreateModalOpen(false);
      toast.success("Photo ajoutée avec succès");
    } catch (error) {
      toast.error("Erreur lors de l'ajout");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitEdit = async (formData: any) => {
    if (!selectedPhoto) return;
    
    setIsLoading(true);
    try {
      // Simulation d'une modification
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedPhoto: IGaleriePhoto = {
        ...selectedPhoto,
        titre: formData.titre,
        description: formData.description,
        image: formData.image || selectedPhoto.image,
        categorie: formData.categorie,
        tags: formData.tags ? formData.tags.split(',').map((tag: string) => tag.trim()) : selectedPhoto.tags || [],
        status: formData.status,
        lieu: formData.lieu || selectedPhoto.lieu,
        evenementAssocie: formData.evenementAssocie || selectedPhoto.evenementAssocie,
        dateModification: new Date().toISOString()
      };
      
      setPhotos(prev => prev.map(p => 
        p.id === selectedPhoto.id ? updatedPhoto : p
      ));
      setEditModalOpen(false);
      setSelectedPhoto(null);
      toast.success("Photo modifiée avec succès");
    } catch (error) {
      toast.error("Erreur lors de la modification");
    } finally {
      setIsLoading(false);
    }
  };

  const confirmDelete = () => {
    if (selectedPhoto) {
      setPhotos(prev => prev.filter(p => p.id !== selectedPhoto.id));
      setDeleteModalOpen(false);
      setSelectedPhoto(null);
      toast.success("Photo supprimée avec succès");
    }
  };

  const getEditData = (photo: IGaleriePhoto) => {
    return {
      titre: photo.titre,
      description: photo.description,
      image: photo.image,
      categorie: photo.categorie,
      status: photo.status,
      tags: photo.tags?.join(', ') || '',
      lieu: photo.lieu || '',
      evenementAssocie: photo.evenementAssocie || ''
    };
  };

  return (
    <div className={className}>
      <GaleriePhotoCards
        data={photos}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onCreate={handleCreate}
        isLoading={isLoading}
      />

      {/* Modal de suppression */}
      <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmer la suppression</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer la photo &quot;{selectedPhoto?.titre}&quot; ? 
              Cette action est irréversible.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteModalOpen(false)}>
              Annuler
            </Button>
            <Button 
              className="bg-red-600 hover:bg-red-700 text-white" 
              onClick={confirmDelete}
            >
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal de création */}
      <ContentModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleSubmitCreate}
        title={t("gestionGalerie.photo.create_photo")}
        description="Ajoutez une nouvelle photo à votre galerie"
        fields={formFields}
        isLoading={isLoading}
        translationNamespace="contenu"
      />

      {/* Modal d'édition */}
      <ContentModal
        isOpen={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
          setSelectedPhoto(null);
        }}
        onSubmit={handleSubmitEdit}
        title={t("gestionGalerie.photo.edit_photo")}
        description="Modifiez les informations de cette photo"
        fields={formFields}
        initialData={selectedPhoto ? getEditData(selectedPhoto) : {}}
        isEditing={true}
        isLoading={isLoading}
        translationNamespace="contenu"
      />

      {/* Modal de visualisation */}
      <ViewModal
        isOpen={viewModalOpen}
        onClose={() => {
          setViewModalOpen(false);
          setSelectedPhoto(null);
        }}
        title="Détails de la photo"
        data={selectedPhoto}
        type="galerie-photo"
        translationNamespace="contenu"
      />
    </div>
  );
}
