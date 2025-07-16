"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { IGalerieVideo } from "@/types/galerie.types";
import { GalerieVideoCards } from "./galerie-video-cards";
import { ContentModal, ContentModalField } from "@/components/ui/content-modal";
import { ViewModal } from "@/components/ui/view-modal";
import VideoModal from "@/components/contenu/galerie/video-modal";
import { toast } from "sonner";
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
const sampleVideos: IGalerieVideo[] = [
  {
    id: "1",
    titre: "Discours du Ministre des Affaires Étrangères - Coopération Internationale",
    description: "Intervention du Ministre des Affaires Étrangères du Tchad lors de la conférence internationale sur la coopération Sud-Sud. Présentation des priorités diplomatiques et des partenariats stratégiques du Tchad.",
    videoUrl: "/video/tchad.mp4",
    thumbnailUrl: "/images/videos/minister-speech-thumb.jpg",
    categorie: "diplomatie",
    tags: ["diplomatie", "ministre", "coopération", "international", "discours"],
    status: "publié",
    priorite: "importante",
    datePublication: "2025-01-06",
    auteur: "Service Audiovisuel",
    lieu: "Salle de conférence internationale",
    evenementAssocie: "Conférence Sur-Sud 2025",
    duree: "15:42",
    metadata: {
      resolution: "1920x1080",
      format: "MP4",
      taille: "245 MB",
      qualite: "Full HD"
    },
    vuesCount: 3456,
    likesCount: 267,
    shareCount: 89,
    featured: true
  },
  {
    id: "2",
    titre: "Festival de Musique Traditionnelle Tchadienne",
    description: "Spectacle musical mettant en valeur la richesse culturelle du Tchad. Performance d'artistes traditionnels avec instruments authentiques et chants ancestraux des différentes ethnies du pays.",
    videoUrl: "/video/tchad.mp4",
    thumbnailUrl: "/images/videos/music-festival-thumb.jpg",
    categorie: "culture",
    tags: ["musique", "tradition", "festival", "culture", "artistes"],
    status: "publié",
    priorite: "normale",
    datePublication: "2025-01-04",
    auteur: "Équipe Culturelle",
    lieu: "Centre culturel",
    evenementAssocie: "Semaine culturelle tchadienne",
    duree: "22:18",
    metadata: {
      resolution: "4K",
      format: "MP4",
      taille: "892 MB",
      qualite: "Ultra HD"
    },
    vuesCount: 1892,
    likesCount: 234,
    shareCount: 156,
    featured: false
  },
  {
    id: "3",
    titre: "Interview Exclusive - Ambassadeur du Tchad",
    description: "Entretien exclusif avec Son Excellence l&apos;Ambassadeur du Tchad sur les relations bilatérales, les projets de développement et les perspectives d&apos;avenir pour la coopération internationale.",
    videoUrl: "/video/tchad.mp4",
    thumbnailUrl: "/images/videos/ambassador-interview-thumb.jpg",
    categorie: "interview",
    tags: ["interview", "ambassadeur", "diplomatie", "relations", "développement"],
    status: "publié",
    priorite: "urgente",
    datePublication: "2025-01-02",
    auteur: "Journaliste Diplomatique",
    lieu: "Bureau de l&apos;Ambassadeur",
    duree: "28:35",
    metadata: {
      resolution: "1920x1080",
      format: "MP4",
      taille: "567 MB",
      qualite: "Full HD"
    },
    vuesCount: 2845,
    likesCount: 312,
    shareCount: 178,
    featured: true
  },
  {
    id: "4",
    titre: "Cérémonie de Signature d&apos;Accords Commerciaux",
    description: "Signature solennelle des accords commerciaux bilatéraux en présence des délégations officielles. Moment historique pour le renforcement des échanges économiques.",
    videoUrl: "/video/tchad.mp4",
    thumbnailUrl: "/images/videos/signing-ceremony-thumb.jpg",
    categorie: "ceremonie",
    tags: ["cérémonie", "signature", "accords", "commerce", "officiel"],
    status: "publié",
    priorite: "importante",
    datePublication: "2024-12-30",
    auteur: "Service Protocole",
    lieu: "Salle de réception",
    evenementAssocie: "Mission commerciale 2024",
    duree: "12:24",
    metadata: {
      resolution: "1920x1080",
      format: "MP4",
      taille: "234 MB",
      qualite: "Full HD"
    },
    vuesCount: 1567,
    likesCount: 189,
    shareCount: 67,
    featured: false
  },
  {
    id: "5",
    titre: "Conférence : Développement Durable au Tchad",
    description: "Conférence sur les initiatives de développement durable au Tchad avec la participation d&apos;experts internationaux et de représentants de la société civile.",
    videoUrl: "/video/tchad.mp4",
    thumbnailUrl: "/images/videos/conference-sustainable-thumb.jpg",
    categorie: "evenement",
    tags: ["conférence", "développement", "durable", "environnement", "experts"],
    status: "brouillon",
    priorite: "normale",
    datePublication: "2024-12-28",
    auteur: "Service Environnement",
    lieu: "Auditorium",
    evenementAssocie: "Semaine du développement durable",
    duree: "45:12",
    metadata: {
      resolution: "1920x1080",
      format: "MP4",
      taille: "1.2 GB",
      qualite: "Full HD"
    },
    vuesCount: 892,
    likesCount: 134,
    shareCount: 45,
    featured: false
  },
  {
    id: "6",
    titre: "Documentaire - Histoire Diplomatique du Tchad",
    description: "Mini-documentaire retraçant l&apos;histoire des relations diplomatiques du Tchad depuis son indépendance. Archives historiques et témoignages d&apos;anciens diplomates.",
    videoUrl: "/video/tchad.mp4",
    thumbnailUrl: "/images/videos/history-documentary-thumb.jpg",
    categorie: "culture",
    tags: ["documentaire", "histoire", "diplomatie", "archives", "témoignages"],
    status: "publié",
    priorite: "normale",
    datePublication: "2024-12-25",
    auteur: "Équipe Documentaire",
    lieu: "Archives diplomatiques",
    duree: "18:56",
    metadata: {
      resolution: "1920x1080",
      format: "MP4",
      taille: "378 MB",
      qualite: "Full HD"
    },
    vuesCount: 1234,
    likesCount: 156,
    shareCount: 89,
    featured: true
  }
];

interface GalerieVideoCardsContainerProps {
  className?: string;
}

export default function GalerieVideoCardsContainer({ className }: GalerieVideoCardsContainerProps) {
  const t = useTranslations("contenu.gestionGalerie.videos");
  const [videos, setVideos] = React.useState<IGalerieVideo[]>(sampleVideos);
  const [isLoading, setIsLoading] = React.useState(false);

  // États pour les modals
  const [videoModalOpen, setVideoModalOpen] = React.useState(false);
  const [viewModalOpen, setViewModalOpen] = React.useState(false);
  const [editModalOpen, setEditModalOpen] = React.useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
  const [createModalOpen, setCreateModalOpen] = React.useState(false);
  const [selectedVideo, setSelectedVideo] = React.useState<IGalerieVideo | null>(null);

  // Définition des champs du formulaire pour les vidéos
  const formFields: ContentModalField[] = [
    {
      key: "titre",
      type: "text",
      label: t("gestionGalerie.videos.fields.titre"),
      placeholder: "Entrez le titre de la vidéo...",
      required: true
    },
    {
      key: "categorie",
      type: "select",
      label: t("gestionGalerie.videos.fields.categorie"),
      required: true,
      options: [
        { value: "evenement", label: t("gestionGalerie.videos.category.evenement") },
        { value: "interview", label: t("gestionGalerie.videos.category.interview") },
        { value: "presentation", label: t("gestionGalerie.videos.category.presentation") },
        { value: "culture", label: t("gestionGalerie.videos.category.culture") },
        { value: "documentaire", label: t("gestionGalerie.videos.category.documentaire") }
      ]
    },
    {
      key: "description",
      type: "textarea",
      label: t("gestionGalerie.videos.fields.description"),
      placeholder: "Décrivez la vidéo...",
      required: true,
      rows: 3
    },
    {
      key: "url",
      type: "text",
      label: t("gestionGalerie.videos.fields.url"),
      placeholder: "https://www.youtube.com/watch?v=...",
      required: true
    },
    {
      key: "thumbnail",
      type: "file",
      label: t("gestionGalerie.videos.fields.thumbnail"),
      accept: "image/*",
      required: false
    },
    {
      key: "status",
      type: "select",
      label: t("gestionGalerie.videos.fields.status"),
      required: true,
      options: [
        { value: "brouillon", label: t("gestionGalerie.videos.status.brouillon") },
        { value: "publié", label: t("gestionGalerie.videos.status.publie") }
      ]
    },
    {
      key: "tags",
      type: "text",
      label: t("gestionGalerie.videos.fields.tags"),
      placeholder: "Séparez les mots-clés par des virgules..."
    },
    {
      key: "duree",
      type: "text",
      label: t("gestionGalerie.videos.fields.duree"),
      placeholder: "ex: 15:30 (minutes:secondes)"
    },
    {
      key: "qualite",
      type: "select",
      label: t("gestionGalerie.videos.fields.qualite"),
      options: [
        { value: "HD", label: "HD (720p)" },
        { value: "Full HD", label: "Full HD (1080p)" },
        { value: "4K", label: "4K (2160p)" }
      ]
    }
  ];

  // Handlers pour les actions
  const handleView = (video: IGalerieVideo) => {
    setSelectedVideo(video);
    setVideoModalOpen(true);
  };

  const handleEdit = (video: IGalerieVideo) => {
    setSelectedVideo(video);
    setEditModalOpen(true);
  };

  const handleDelete = (video: IGalerieVideo) => {
    setSelectedVideo(video);
    setDeleteModalOpen(true);
  };

  const handleCreate = () => {
    setSelectedVideo(null);
    setCreateModalOpen(true);
  };

  const handleSubmitCreate = async (formData: any) => {
    setIsLoading(true);
    try {
      // Simulation d'une création
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newVideo: IGalerieVideo = {
        id: Date.now().toString(),
        titre: formData.titre,
        description: formData.description,
        videoUrl: formData.url,
        thumbnailUrl: formData.thumbnail || "/images/default-video-thumb.jpg",
        categorie: formData.categorie,
        tags: formData.tags ? formData.tags.split(',').map((tag: string) => tag.trim()) : [],
        status: formData.status,
        priorite: "normale",
        datePublication: new Date().toISOString(),
        auteur: "Utilisateur actuel",
        duree: formData.duree || "",
        metadata: {
          resolution: formData.qualite || "HD",
          taille: "À calculer",
          format: "MP4",
          qualite: formData.qualite || "HD"
        },
        vuesCount: 0,
        likesCount: 0,
        shareCount: 0,
        featured: false
      };
      
      setVideos(prev => [newVideo, ...prev]);
      setCreateModalOpen(false);
      toast.success("Vidéo ajoutée avec succès");
    } catch (error) {
      toast.error("Erreur lors de l'ajout");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitEdit = async (formData: any) => {
    if (!selectedVideo) return;
    
    setIsLoading(true);
    try {
      // Simulation d'une modification
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedVideo: IGalerieVideo = {
        ...selectedVideo,
        titre: formData.titre,
        description: formData.description,
        videoUrl: formData.url,
        thumbnailUrl: formData.thumbnail || selectedVideo.thumbnailUrl,
        categorie: formData.categorie,
        tags: formData.tags ? formData.tags.split(',').map((tag: string) => tag.trim()) : selectedVideo.tags || [],
        status: formData.status,
        duree: formData.duree || selectedVideo.duree,
        metadata: {
          ...selectedVideo.metadata,
          qualite: formData.qualite || selectedVideo.metadata?.qualite
        },
        dateModification: new Date().toISOString()
      };
      
      setVideos(prev => prev.map(v => 
        v.id === selectedVideo.id ? updatedVideo : v
      ));
      setEditModalOpen(false);
      setSelectedVideo(null);
      toast.success("Vidéo modifiée avec succès");
    } catch (error) {
      toast.error("Erreur lors de la modification");
    } finally {
      setIsLoading(false);
    }
  };

  const confirmDelete = () => {
    if (selectedVideo) {
      setVideos(prev => prev.filter(v => v.id !== selectedVideo.id));
      setDeleteModalOpen(false);
      setSelectedVideo(null);
      toast.success("Vidéo supprimée avec succès");
    }
  };

  const getEditData = (video: IGalerieVideo) => {
    return {
      titre: video.titre,
      description: video.description,
      url: video.videoUrl,
      thumbnail: video.thumbnailUrl,
      categorie: video.categorie,
      status: video.status,
      tags: video.tags?.join(', ') || '',
      duree: video.duree || '',
      qualite: video.metadata?.qualite || 'HD'
    };
  };

  return (
    <div className={className}>
      <GalerieVideoCards
        data={videos}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onCreate={handleCreate}
        isLoading={isLoading}
      />

      {/* Modal de visualisation */}
      <Dialog open={viewModalOpen} onOpenChange={setViewModalOpen}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">{selectedVideo?.titre}</DialogTitle>
            <DialogDescription>
              {selectedVideo?.description}
            </DialogDescription>
          </DialogHeader>
          {selectedVideo && (
            <div className="space-y-6">
              {/* Lecteur vidéo ou thumbnail */}
              <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-muted">
                {selectedVideo.thumbnailUrl ? (
                  <Image
                    src={selectedVideo.thumbnailUrl}
                    alt={selectedVideo.titre}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-embassy-blue-100 to-embassy-blue-200 dark:from-embassy-blue-900/30 dark:to-embassy-blue-800/30">
                    <div className="text-center">
                      <div className="w-24 h-24 mx-auto mb-4 bg-embassy-blue-600 rounded-full flex items-center justify-center">
                        <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-lg font-medium text-embassy-blue-600">Cliquez pour lire la vidéo</p>
                    </div>
                  </div>
                )}
                
                {/* Durée overlay */}
                {selectedVideo.duree && (
                  <div className="absolute bottom-4 right-4">
                    <span className="px-2 py-1 bg-black/70 text-white text-sm rounded">
                      {selectedVideo.duree}
                    </span>
                  </div>
                )}
              </div>
              
              {/* Informations détaillées */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-sm text-muted-foreground mb-2">DÉTAILS</h3>
                    <div className="space-y-2 text-sm">
                      <div><span className="font-medium">Catégorie:</span> {selectedVideo.categorie}</div>
                      <div><span className="font-medium">Auteur:</span> {selectedVideo.auteur}</div>
                      <div><span className="font-medium">Date:</span> {new Date(selectedVideo.datePublication).toLocaleDateString('fr-FR')}</div>
                      <div><span className="font-medium">Durée:</span> {selectedVideo.duree}</div>
                      {selectedVideo.lieu && <div><span className="font-medium">Lieu:</span> {selectedVideo.lieu}</div>}
                      {selectedVideo.evenementAssocie && <div><span className="font-medium">Événement:</span> {selectedVideo.evenementAssocie}</div>}
                    </div>
                  </div>
                  
                  {selectedVideo.tags && selectedVideo.tags.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-sm text-muted-foreground mb-2">TAGS</h3>
                      <div className="flex flex-wrap gap-1">
                        {selectedVideo.tags.map((tag, index) => (
                          <span key={index} className="px-2 py-1 bg-muted rounded-md text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-sm text-muted-foreground mb-2">STATISTIQUES</h3>
                    <div className="space-y-2 text-sm">
                      <div><span className="font-medium">Vues:</span> {selectedVideo.vuesCount || 0}</div>
                      <div><span className="font-medium">J&apos;aime:</span> {selectedVideo.likesCount || 0}</div>
                      <div><span className="font-medium">Partages:</span> {selectedVideo.shareCount || 0}</div>
                    </div>
                  </div>
                  
                  {selectedVideo.metadata && (
                    <div>
                      <h3 className="font-semibold text-sm text-muted-foreground mb-2">MÉTADONNÉES</h3>
                      <div className="space-y-2 text-sm">
                        {selectedVideo.metadata.resolution && <div><span className="font-medium">Résolution:</span> {selectedVideo.metadata.resolution}</div>}
                        {selectedVideo.metadata.taille && <div><span className="font-medium">Taille:</span> {selectedVideo.metadata.taille}</div>}
                        {selectedVideo.metadata.format && <div><span className="font-medium">Format:</span> {selectedVideo.metadata.format}</div>}
                        {selectedVideo.metadata.qualite && <div><span className="font-medium">Qualité:</span> {selectedVideo.metadata.qualite}</div>}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewModalOpen(false)}>
              Fermer
            </Button>
            <Button onClick={() => {
              setViewModalOpen(false);
              if (selectedVideo) handleEdit(selectedVideo);
            }}>
              Modifier
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal de suppression */}
      <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmer la suppression</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer la vidéo &quot;{selectedVideo?.titre}&quot; ? 
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
        title={t("gestionGalerie.videos.create_video")}
        description="Ajoutez une nouvelle vidéo à votre galerie"
        fields={formFields}
        isLoading={isLoading}
        translationNamespace="contenu"
      />

      {/* Modal d'édition */}
      <ContentModal
        isOpen={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
          setSelectedVideo(null);
        }}
        onSubmit={handleSubmitEdit}
        title={t("gestionGalerie.videos.edit_video")}
        description="Modifiez les informations de cette vidéo"
        fields={formFields}
        initialData={selectedVideo ? getEditData(selectedVideo) : {}}
        isEditing={true}
        isLoading={isLoading}
        translationNamespace="contenu"
      />

      {/* Modal de visualisation */}
      <ViewModal
        isOpen={viewModalOpen}
        onClose={() => {
          setViewModalOpen(false);
          setSelectedVideo(null);
        }}
        title="Détails de la vidéo"
        data={selectedVideo}
        type="galerie-video"
        translationNamespace="contenu"
      />

      {/* Modal de lecture vidéo */}
      <VideoModal
        video={selectedVideo}
        isOpen={videoModalOpen}
        onClose={() => {
          setVideoModalOpen(false);
          setSelectedVideo(null);
        }}
      />
    </div>
  );
}
