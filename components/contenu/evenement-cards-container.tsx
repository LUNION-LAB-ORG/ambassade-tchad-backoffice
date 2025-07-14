"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { IEvenement } from "@/types/evenement.types";
import { EvenementCards } from "./evenement-cards";
import { ContentModal, ContentModalField } from "@/components/ui/content-modal";
import { ViewModal } from "@/components/ui/view-modal";
import { toast } from "sonner";

// Données d'exemple pour les événements
const evenementsData: IEvenement[] = [
  {
    id: 1,
    titre: "Conférence Diplomatique Franco-Tchadienne",
    description: "Une conférence diplomatique importante pour renforcer les relations entre la France et le Tchad dans les domaines économiques et culturels.",
    contenu: "Cette conférence rassemblera des diplomates, des experts économiques et des représentants culturels des deux pays pour discuter des opportunités de coopération future. Les thèmes abordés incluront le développement économique, les échanges culturels, et la coopération dans le domaine de l'éducation.",
    dateDebut: "2024-02-15",
    dateFin: "2024-02-16",
    heureDebut: "09:00",
    heureFin: "17:00",
    lieu: "Ambassade du Tchad",
    adresse: "65 Rue des Belles Feuilles, 75116 Paris",
    user: "Dr. Sarah Mbali",
    organisateur: {
      id: "1",
      nom: "Dr. Sarah Mbali",
      email: "s.mbali@ambassade-tchad.fr",
      avatar: "/images/avatar/av-1.jpg"
    },
    image: "/images/all-img/conference.png",
    status: "publié",
    categorie: "Diplomatie",
    tags: ["diplomatie", "coopération", "france-tchad"],
    vues: 245,
    priorite: "importante",
    langue: "fr",
    capaciteMax: 150,
    participantsInscrits: 89,
    prixEntree: 0,
    gratuit: true,
    inscriptionRequise: true,
    lienInscription: "https://ambassade-tchad.fr/conference-2024",
    typeEvenement: "conference",
    contact: {
      nom: "Mme. Aminata Konaté",
      email: "a.konate@ambassade-tchad.fr",
      telephone: "+33 1 45 53 36 75"
    },
    datePublication: "2024-01-10"
  },
  {
    id: 2,
    titre: "Célébration de la Fête Nationale du Tchad",
    description: "Célébration officielle de la fête nationale tchadienne avec des activités culturelles et un cocktail diplomatique.",
    contenu: "Une journée festive pour célébrer l'indépendance du Tchad avec des performances culturelles, des expositions d'art tchadien et un cocktail diplomatique. Cette célébration mettra en valeur la richesse culturelle du Tchad et renforcera les liens avec la diaspora tchadienne en France.",
    dateDebut: "2024-08-11",
    dateFin: "2024-08-11",
    heureDebut: "14:00",
    heureFin: "22:00",
    lieu: "Jardin de l'Ambassade",
    adresse: "65 Rue des Belles Feuilles, 75116 Paris",
    user: "M. Ibrahim Mahamat",
    organisateur: {
      id: "2",
      nom: "M. Ibrahim Mahamat",
      email: "i.mahamat@ambassade-tchad.fr",
      avatar: "/images/avatar/av-2.jpg"
    },
    image: "/images/all-img/celebration.png",
    status: "publié",
    categorie: "Culture",
    tags: ["fête nationale", "culture", "indépendance"],
    vues: 456,
    priorite: "urgente",
    langue: "fr",
    capaciteMax: 300,
    participantsInscrits: 267,
    prixEntree: 0,
    gratuit: true,
    inscriptionRequise: true,
    lienInscription: "https://ambassade-tchad.fr/fete-nationale-2024",
    typeEvenement: "ceremonie",
    contact: {
      nom: "M. Ibrahim Mahamat",
      email: "i.mahamat@ambassade-tchad.fr",
      telephone: "+33 1 45 53 36 75"
    },
    datePublication: "2024-06-15"
  },
  {
    id: 3,
    titre: "Atelier sur l'Investissement au Tchad",
    description: "Un atelier informatif destiné aux entrepreneurs français intéressés par les opportunités d'investissement au Tchad.",
    contenu: "Cet atelier présentera les secteurs d'investissement porteurs au Tchad, les procédures administratives et les avantages fiscaux pour les investisseurs étrangers. Des experts économiques et des représentants du gouvernement tchadien partageront leurs connaissances sur le climat des affaires et les opportunités d'investissement.",
    dateDebut: "2024-03-20",
    dateFin: "2024-03-20",
    heureDebut: "10:00",
    heureFin: "16:00",
    lieu: "Salle de conférence de l'Ambassade",
    adresse: "65 Rue des Belles Feuilles, 75116 Paris",
    user: "Mme. Fatima Al-Hassan",
    organisateur: {
      id: "3",
      nom: "Mme. Fatima Al-Hassan",
      email: "f.alhassan@ambassade-tchad.fr",
      avatar: "/images/avatar/av-3.jpg"
    },
    image: "/images/all-img/workshop.png",
    status: "brouillon",
    categorie: "Économie",
    tags: ["investissement", "économie", "entrepreneuriat"],
    vues: 12,
    priorite: "normale",
    langue: "fr",
    capaciteMax: 50,
    participantsInscrits: 23,
    prixEntree: 25,
    gratuit: false,
    inscriptionRequise: true,
    lienInscription: "https://ambassade-tchad.fr/atelier-investissement",
    typeEvenement: "atelier",
    contact: {
      nom: "Mme. Fatima Al-Hassan",
      email: "f.alhassan@ambassade-tchad.fr",
      telephone: "+33 1 45 53 36 75"
    },
    datePublication: "2024-02-01"
  }
];

const EvenementCardsContainer: React.FC = () => {
  const t = useTranslations("contenu.gestionEvenement");
  const [data, setData] = useState<IEvenement[]>(evenementsData);
  const [isLoading, setIsLoading] = useState(false);

  // État des modals
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [currentEvenement, setCurrentEvenement] = useState<IEvenement | null>(null);

  // Définition des champs du formulaire
  const formFields: ContentModalField[] = [
    {
      key: "titre",
      type: "text",
      label: t("fields.titre"),
      placeholder: "Entrez le titre de l'événement...",
      required: true
    },
    {
      key: "typeEvenement",
      type: "select",
      label: t("fields.typeEvenement"),
      required: true,
      options: [
        { value: "conference", label: t("type.conference") },
        { value: "seminaire", label: t("type.seminaire") },
        { value: "atelier", label: t("type.atelier") },
        { value: "ceremonie", label: t("type.ceremonie") },
        { value: "reception", label: t("type.reception") },
        { value: "formation", label: t("type.formation") },
        { value: "autre", label: t("type.autre") }
      ]
    },
    {
      key: "description",
      type: "textarea",
      label: t("fields.description"),
      placeholder: "Décrivez l'événement...",
      required: true,
      rows: 3
    },
    {
      key: "contenu",
      type: "textarea",
      label: t("fields.contenu"),
      placeholder: "Rédigez le contenu complet de l'événement...",
      rows: 6
    },
    {
      key: "dateDebut",
      type: "date",
      label: t("fields.dateDebut"),
      required: true
    },
    {
      key: "dateFin",
      type: "date",
      label: t("fields.dateFin"),
      required: true
    },
    {
      key: "heureDebut",
      type: "text",
      label: t("fields.heureDebut"),
      placeholder: "HH:MM"
    },
    {
      key: "heureFin",
      type: "text",
      label: t("fields.heureFin"),
      placeholder: "HH:MM"
    },
    {
      key: "lieu",
      type: "text",
      label: t("fields.lieu"),
      placeholder: "Nom du lieu...",
      required: true
    },
    {
      key: "adresse",
      type: "text",
      label: t("fields.adresse"),
      placeholder: "Adresse complète..."
    },
    {
      key: "capaciteMax",
      type: "text",
      label: t("fields.capaciteMax"),
      placeholder: "Nombre de participants maximum"
    },
    {
      key: "prixEntree",
      type: "text",
      label: t("fields.prixEntree") + " (€)",
      placeholder: "0.00"
    },
    {
      key: "lienInscription",
      type: "text",
      label: t("fields.lienInscription"),
      placeholder: "https://..."
    },
    {
      key: "contactNom",
      type: "text",
      label: "Nom du contact",
      placeholder: "Nom complet"
    },
    {
      key: "contactEmail",
      type: "email",
      label: "Email du contact",
      placeholder: "email@exemple.com"
    },
    {
      key: "contactTelephone",
      type: "text",
      label: "Téléphone du contact",
      placeholder: "+33 X XX XX XX XX"
    },
    {
      key: "categorie",
      type: "text",
      label: t("fields.categorie"),
      placeholder: "Ex: Diplomatie, Culture, Économie..."
    },
    {
      key: "status",
      type: "select",
      label: t("fields.status"),
      required: true,
      options: [
        { value: "brouillon", label: t("status.brouillon") },
        { value: "publié", label: t("status.publie") },
        { value: "annulé", label: t("status.annule") },
        { value: "archivé", label: t("status.archive") }
      ]
    },
    {
      key: "priorite",
      type: "select",
      label: t("fields.priorite"),
      options: [
        { value: "normale", label: t("priority.normale") },
        { value: "importante", label: t("priority.importante") },
        { value: "urgente", label: t("priority.urgente") }
      ]
    },
    {
      key: "image",
      type: "file",
      label: t("fields.image"),
      accept: "image/*"
    }
  ];

  const handleCreate = () => {
    setIsCreateModalOpen(true);
  };

  const handleView = (evenement: IEvenement) => {
    setCurrentEvenement(evenement);
    setIsViewModalOpen(true);
  };

  const handleEdit = (evenement: IEvenement) => {
    setCurrentEvenement(evenement);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (evenement: IEvenement) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer l'événement "${evenement.titre}" ?`)) {
      try {
        setIsLoading(true);
        
        // Simulation d'un appel API
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setData(prev => prev.filter(e => e.id !== evenement.id));
        toast.success("Événement supprimé avec succès");
      } catch (error) {
        toast.error("Erreur lors de la suppression");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSubmitCreate = async (formData: any) => {
    try {
      setIsLoading(true);
      
      // Simulation d'un appel API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newEvenement: IEvenement = {
        id: Date.now(),
        titre: formData.titre,
        description: formData.description,
        contenu: formData.contenu || "",
        dateDebut: formData.dateDebut,
        dateFin: formData.dateFin,
        heureDebut: formData.heureDebut || "",
        heureFin: formData.heureFin || "",
        lieu: formData.lieu,
        adresse: formData.adresse || "",
        user: "Utilisateur actuel",
        organisateur: {
          id: "current-user",
          nom: "Utilisateur actuel",
          email: "user@ambassade-tchad.fr"
        },
        image: formData.image as string || "/images/all-img/default-event.png",
        status: formData.status,
        categorie: formData.categorie || "",
        tags: [],
        vues: 0,
        priorite: formData.priorite || "normale",
        langue: "fr",
        capaciteMax: formData.capaciteMax ? parseInt(formData.capaciteMax) : undefined,
        participantsInscrits: 0,
        prixEntree: formData.prixEntree ? parseFloat(formData.prixEntree) : undefined,
        gratuit: !formData.prixEntree || parseFloat(formData.prixEntree) === 0,
        inscriptionRequise: !!formData.lienInscription,
        lienInscription: formData.lienInscription || "",
        typeEvenement: formData.typeEvenement || "conference",
        contact: {
          nom: formData.contactNom || "",
          email: formData.contactEmail || "",
          telephone: formData.contactTelephone || ""
        },
        datePublication: new Date().toISOString().split('T')[0]
      };

      setData(prev => [newEvenement, ...prev]);
      setIsCreateModalOpen(false);
      toast.success("Événement créé avec succès");
    } catch (error) {
      toast.error("Erreur lors de la création");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitEdit = async (formData: any) => {
    if (!currentEvenement) return;

    try {
      setIsLoading(true);
      
      // Simulation d'un appel API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const updatedEvenement: IEvenement = {
        ...currentEvenement,
        titre: formData.titre,
        description: formData.description,
        contenu: formData.contenu || currentEvenement.contenu,
        dateDebut: formData.dateDebut,
        dateFin: formData.dateFin,
        heureDebut: formData.heureDebut || "",
        heureFin: formData.heureFin || "",
        lieu: formData.lieu,
        adresse: formData.adresse || "",
        image: (typeof formData.image === 'string') ? formData.image : currentEvenement.image,
        status: formData.status,
        categorie: formData.categorie || "",
        priorite: formData.priorite || currentEvenement.priorite,
        capaciteMax: formData.capaciteMax ? parseInt(formData.capaciteMax) : undefined,
        prixEntree: formData.prixEntree ? parseFloat(formData.prixEntree) : undefined,
        gratuit: !formData.prixEntree || parseFloat(formData.prixEntree) === 0,
        lienInscription: formData.lienInscription || "",
        typeEvenement: formData.typeEvenement || currentEvenement.typeEvenement,
        contact: {
          nom: formData.contactNom || "",
          email: formData.contactEmail || "",
          telephone: formData.contactTelephone || ""
        },
        dateModification: new Date().toISOString().split('T')[0]
      };

      setData(prev => 
        prev.map(item => 
          item.id === currentEvenement.id ? updatedEvenement : item
        )
      );
      setIsEditModalOpen(false);
      toast.success("Événement modifié avec succès");
    } catch (error) {
      toast.error("Erreur lors de la modification");
    } finally {
      setIsLoading(false);
    }
  };

  const getInitialDataForEdit = React.useMemo(() => {
    if (!currentEvenement) return {};
    
    return {
      titre: currentEvenement.titre,
      description: currentEvenement.description,
      contenu: currentEvenement.contenu,
      dateDebut: currentEvenement.dateDebut,
      dateFin: currentEvenement.dateFin,
      heureDebut: currentEvenement.heureDebut,
      heureFin: currentEvenement.heureFin,
      lieu: currentEvenement.lieu,
      adresse: currentEvenement.adresse,
      image: currentEvenement.image,
      status: currentEvenement.status,
      categorie: currentEvenement.categorie,
      priorite: currentEvenement.priorite,
      typeEvenement: currentEvenement.typeEvenement,
      capaciteMax: currentEvenement.capaciteMax?.toString(),
      prixEntree: currentEvenement.prixEntree?.toString(),
      lienInscription: currentEvenement.lienInscription,
      contactNom: currentEvenement.contact?.nom,
      contactEmail: currentEvenement.contact?.email,
      contactTelephone: currentEvenement.contact?.telephone
    };
  }, [currentEvenement]);

  return (
    <>
      <EvenementCards
        data={data}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onCreate={handleCreate}
        isLoading={isLoading}
      />

      {/* Modal de création */}
      <ContentModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleSubmitCreate}
        title={t("create_event")}
        description="Créez un nouvel événement pour votre ambassade"
        fields={formFields}
        isEditing={false}
        isLoading={isLoading}
        translationNamespace="contenu.gestionEvenement"
      />

      {/* Modal d'édition */}
      <ContentModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleSubmitEdit}
        title={t("edit_event")}
        description="Modifiez les informations de cet événement"
        fields={formFields}
        initialData={getInitialDataForEdit}
        isEditing={true}
        isLoading={isLoading}
        translationNamespace="contenu.gestionEvenement"
      />

      {/* Modal de visualisation */}
      <ViewModal
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false);
          setCurrentEvenement(null);
        }}
        title="Détails de l'événement"
        data={currentEvenement}
        type="evenement"
        translationNamespace="contenu.gestionEvenement"
      />
    </>
  );
};

export default EvenementCardsContainer; 