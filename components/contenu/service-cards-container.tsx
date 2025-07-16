"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { IService } from "@/types/service.types";
import { ServiceCards } from "./service-cards";
import { ContentModal, ContentModalField } from "@/components/ui/content-modal";
import { ViewModal } from "@/components/ui/view-modal";
import { toast } from "sonner";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  DollarSign, 
  FileText,
  Users,
  Star,
  HelpCircle
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Données d&apos;exemple enrichies
const sampleServices: IService[] = [
  {
    id: "1",
    nom: "Demande de Passeport Ordinaire",
    description: "Service de délivrance et renouvellement de passeports ordinaires pour les citoyens tchadiens.",
    descriptionComplete: "Ce service permet aux citoyens tchadiens de demander la délivrance d&apos;un nouveau passeport ordinaire ou le renouvellement d&apos;un passeport existant. Le service inclut la vérification des documents, la prise de photos biométriques, et le traitement administratif complet.",
    icone: "passport",
    image: "/images/services/passport-service.jpg",
    categorie: "consulaire",
    tags: ["passeport", "identité", "voyage", "consulaire", "biométrique"],
    status: "actif",
    priorite: "importante",
    dateCreation: "2024-01-15",
    responsable: "Service Consulaire - Mme. Fatima HASSAN",
    contact: {
      email: "consulaire@ambassade-tchad.fr",
      telephone: "+33 1 45 53 36 75",
      bureau: "Bureau 201 - 2ème étage"
    },
    horaires: {
      lundi: "09:00 - 16:00",
      mardi: "09:00 - 16:00",
      mercredi: "09:00 - 16:00",
      jeudi: "09:00 - 16:00",
      vendredi: "09:00 - 15:00"
    },
    documentsRequis: [
      "Ancien passeport (pour renouvellement)",
      "Acte de naissance original",
      "Carte d&apos;identité nationale",
      "2 photos d&apos;identité récentes",
      "Justificatif de domicile",
      "Formulaire de demande rempli"
    ],
    coutEstime: "85€ - 120€",
    delaiEstime: "15 - 21 jours ouvrables",
    procedures: [
      "Prise de rendez-vous en ligne ou par téléphone",
      "Rassembler tous les documents requis",
      "Se présenter au bureau consulaire à l&apos;heure convenue",
      "Remise des documents et paiement des frais",
      "Prise de photos biométriques",
      "Retrait du passeport selon les délais annoncés"
    ],
    faq: [
      {
        question: "Puis-je demander un passeport urgent ?",
        reponse: "Oui, un service express est disponible sous 48-72h pour un supplément de 50€, sur justification d&apos;urgence."
      },
      {
        question: "Mon ancien passeport a expiré, que faire ?",
        reponse: "Vous pouvez faire une demande de renouvellement même avec un passeport expiré, en fournissant les documents supplémentaires requis."
      },
      {
        question: "Puis-je envoyer les documents par courrier ?",
        reponse: "Non, la présence physique est obligatoire pour la prise de photos biométriques et la vérification d&apos;identité."
      }
    ],
    utilisationsCount: 1247,
    satisfactionNote: 4.2,
    featured: true
  },
  {
    id: "2",
    nom: "Légalisation de Documents",
    description: "Service de légalisation et d&apos;authentification de documents officiels pour usage international.",
    descriptionComplete: "Ce service permet la légalisation et l&apos;authentification de documents officiels tchadiens ou étrangers destinés à être utilisés au Tchad ou à l&apos;étranger. Incluant apostille, légalisation consulaire, et certification de traductions.",
    icone: "stamp",
    image: "/images/services/legalization-service.jpg",
    categorie: "juridique",
    tags: ["légalisation", "apostille", "documents", "authentification", "international"],
    status: "actif",
    priorite: "normale",
    dateCreation: "2024-02-10",
    responsable: "Service Juridique - M. Ibrahim MAHAMAT",
    contact: {
      email: "juridique@ambassade-tchad.fr",
      telephone: "+33 1 45 53 36 76",
      bureau: "Bureau 105 - 1er étage"
    },
    horaires: {
      lundi: "10:00 - 16:00",
      mardi: "10:00 - 16:00",
      mercredi: "10:00 - 16:00",
      jeudi: "10:00 - 16:00",
      vendredi: "10:00 - 15:00"
    },
    documentsRequis: [
      "Documents originaux à légaliser",
      "Photocopie des documents",
      "Justificatif d&apos;identité",
      "Formulaire de demande",
      "Justification de l&apos;usage prévu"
    ],
    coutEstime: "25€ - 75€ par document",
    delaiEstime: "5 - 10 jours ouvrables",
    procedures: [
      "Vérification préalable des documents",
      "Dépôt de la demande avec documents originaux",
      "Paiement des frais de légalisation",
      "Traitement et authentification",
      "Notification de fin de traitement",
      "Retrait des documents légalisés"
    ],
    faq: [
      {
        question: "Quels types de documents peuvent être légalisés ?",
        reponse: "Tous documents officiels : actes d&apos;état civil, diplômes, attestations, contrats, procurations, etc."
      },
      {
        question: "Quelle est la différence entre légalisation et apostille ?",
        reponse: "L&apos;apostille est utilisée entre pays signataires de la Convention de La Haye, la légalisation pour les autres pays."
      }
    ],
    utilisationsCount: 892,
    satisfactionNote: 4.5,
    featured: false
  },
  {
    id: "3",
    nom: "Certificat de Coutume",
    description: "Délivrance de certificats de coutume pour les procédures juridiques internationales.",
    descriptionComplete: "Le certificat de coutume atteste des dispositions du droit tchadien applicables dans des situations spécifiques. Requis pour les mariages, divorces, successions et autres actes juridiques à l&apos;étranger.",
    icone: "certificate",
    categorie: "juridique",
    tags: ["certificat", "coutume", "droit", "mariage", "succession"],
    status: "actif",
    priorite: "normale",
    dateCreation: "2024-03-05",
    responsable: "Service Juridique - M. Ibrahim MAHAMAT",
    contact: {
      email: "juridique@ambassade-tchad.fr",
      telephone: "+33 1 45 53 36 76",
      bureau: "Bureau 105 - 1er étage"
    },
    horaires: {
      lundi: "10:00 - 16:00",
      mardi: "10:00 - 16:00",
      mercredi: "10:00 - 16:00",
      jeudi: "10:00 - 16:00",
      vendredi: "10:00 - 15:00"
    },
    documentsRequis: [
      "Demande motivée détaillée",
      "Justificatif d&apos;identité",
      "Documents relatifs à la situation juridique",
      "Traduction certifiée si nécessaire"
    ],
    coutEstime: "50€ - 100€",
    delaiEstime: "10 - 15 jours ouvrables",
    procedures: [
      "Consultation préalable pour définir les besoins",
      "Dépôt de la demande détaillée",
      "Analyse juridique par nos experts",
      "Rédaction du certificat de coutume",
      "Validation et signature officielle",
      "Remise du certificat légalisé"
    ],
    faq: [
      {
        question: "Dans quels cas ai-je besoin d&apos;un certificat de coutume ?",
        reponse: "Pour tout acte juridique à l&apos;étranger impliquant le droit tchadien : mariage, divorce, succession, adoption, etc."
      }
    ],
    utilisationsCount: 234,
    satisfactionNote: 4.7,
    featured: false
  },
  {
    id: "4",
    nom: "Visa d&apos;Entrée au Tchad",
    description: "Traitement des demandes de visa pour l&apos;entrée au Tchad (tourisme, affaires, transit).",
    descriptionComplete: "Service complet de traitement des demandes de visa pour l&apos;entrée au Tchad. Différents types de visas disponibles selon le motif du voyage : tourisme, affaires, transit, visite familiale, etc.",
    icone: "visa",
    image: "/images/services/visa-service.jpg",
    categorie: "consulaire",
    tags: ["visa", "entrée", "tourisme", "affaires", "transit"],
    status: "actif",
    priorite: "importante",
    dateCreation: "2024-01-20",
    responsable: "Service Consulaire - Mme. Fatima HASSAN",
    contact: {
      email: "visa@ambassade-tchad.fr",
      telephone: "+33 1 45 53 36 77",
      bureau: "Bureau 203 - 2ème étage"
    },
    horaires: {
      lundi: "09:00 - 15:00",
      mardi: "09:00 - 15:00",
      mercredi: "09:00 - 15:00",
      jeudi: "09:00 - 15:00",
      vendredi: "09:00 - 14:00"
    },
    documentsRequis: [
      "Passeport valide (6 mois minimum)",
      "Formulaire de demande de visa",
      "2 photos d&apos;identité récentes",
      "Justificatifs selon le type de visa",
      "Assurance voyage",
      "Preuve de moyens financiers"
    ],
    coutEstime: "60€ - 150€ selon le type",
    delaiEstime: "5 - 10 jours ouvrables",
    procedures: [
      "Choix du type de visa approprié",
      "Rassemblement des documents requis",
      "Dépôt de la demande complète",
      "Paiement des frais consulaires",
      "Traitement de la demande",
      "Retrait du passeport avec visa"
    ],
    faq: [
      {
        question: "Puis-je obtenir un visa à l&apos;arrivée ?",
        reponse: "Non, tous les visas doivent être obtenus avant le voyage auprès de nos services consulaires."
      },
      {
        question: "Quelle est la durée de validité d&apos;un visa touristique ?",
        reponse: "Les visas touristiques sont généralement valables 30 jours et peuvent être prolongés sur place."
      }
    ],
    utilisationsCount: 2156,
    satisfactionNote: 4.1,
    featured: true
  },
  {
    id: "5",
    nom: "Assistance aux Entreprises",
    description: "Accompagnement des entreprises françaises souhaitant investir ou commercer au Tchad.",
    descriptionComplete: "Service d&apos;accompagnement complet pour les entreprises françaises intéressées par le marché tchadien. Information sur les opportunités, mise en relation, aide aux démarches administratives et support juridique.",
    icone: "business",
    image: "/images/services/business-service.jpg",
    categorie: "commerce",
    tags: ["entreprises", "investissement", "commerce", "accompagnement", "export"],
    status: "actif",
    priorite: "importante",
    dateCreation: "2024-02-28",
    responsable: "Attaché Commercial - M. Alain KOULAMALLAH",
    contact: {
      email: "commercial@ambassade-tchad.fr",
      telephone: "+33 1 45 53 36 78",
      bureau: "Bureau 301 - 3ème étage"
    },
    horaires: {
      lundi: "09:00 - 17:00",
      mardi: "09:00 - 17:00",
      mercredi: "09:00 - 17:00",
      jeudi: "09:00 - 17:00",
      vendredi: "09:00 - 16:00"
    },
    documentsRequis: [
      "Présentation de l&apos;entreprise",
      "Projet d&apos;investissement ou commercial",
      "Statuts de l&apos;entreprise",
      "Bilan financier récent"
    ],
    coutEstime: "Gratuit - Consultation",
    delaiEstime: "Selon la complexité du projet",
    procedures: [
      "Prise de contact et présentation du projet",
      "Analyse de faisabilité",
      "Information sur le marché tchadien",
      "Mise en relation avec partenaires locaux",
      "Accompagnement dans les démarches",
      "Suivi du projet"
    ],
    faq: [
      {
        question: "Quels secteurs offrent le plus d&apos;opportunités ?",
        reponse: "Agriculture, mines, énergie, télécommunications, et services financiers sont particulièrement porteurs."
      },
      {
        question: "Y a-t-il des accords de protection des investissements ?",
        reponse: "Oui, le Tchad a signé plusieurs accords bilatéraux de protection et de promotion des investissements."
      }
    ],
    utilisationsCount: 456,
    satisfactionNote: 4.6,
    featured: false
  },
  {
    id: "6",
    nom: "Événements Culturels",
    description: "Organisation et promotion d&apos;événements culturels tchadiens en France.",
    descriptionComplete: "Service dédié à l&apos;organisation, la promotion et le soutien d&apos;événements culturels tchadiens en France. Festivals, expositions, concerts, conférences et autres manifestations culturelles.",
    icone: "culture",
    image: "/images/services/cultural-events.jpg",
    categorie: "culture",
    tags: ["culture", "événements", "festivals", "expositions", "promotion"],
    status: "actif",
    priorite: "normale",
    dateCreation: "2024-03-15",
    responsable: "Attaché Culturel - Mme. Aïcha ABDEL-KERIM",
    contact: {
      email: "culture@ambassade-tchad.fr",
      telephone: "+33 1 45 53 36 79",
      bureau: "Bureau 102 - 1er étage"
    },
    horaires: {
      lundi: "10:00 - 17:00",
      mardi: "10:00 - 17:00",
      mercredi: "10:00 - 17:00",
      jeudi: "10:00 - 17:00",
      vendredi: "10:00 - 16:00"
    },
    documentsRequis: [
      "Projet détaillé de l&apos;événement",
      "Budget prévisionnel",
      "CV des organisateurs/artistes",
      "Dossier de présentation"
    ],
    coutEstime: "Support logistique",
    delaiEstime: "Variable selon l&apos;événement",
    procedures: [
      "Soumission du projet culturel",
      "Évaluation et validation",
      "Planification et coordination",
      "Promotion et communication",
      "Réalisation de l&apos;événement",
      "Bilan et suivi"
    ],
    faq: [
      {
        question: "L&apos;ambassade finance-t-elle les événements culturels ?",
        reponse: "L&apos;ambassade peut apporter un soutien logistique et promotionnel, le financement dépend du projet."
      }
    ],
    utilisationsCount: 123,
    satisfactionNote: 4.8,
    featured: false
  }
];

interface ServiceCardsContainerProps {
  className?: string;
}

export default function ServiceCardsContainer({ className }: ServiceCardsContainerProps) {
  const t = useTranslations("contenu.gestionService");
  const [services, setServices] = React.useState<IService[]>(sampleServices);
  const [isLoading, setIsLoading] = React.useState(false);

  // États pour les modals
  const [viewModalOpen, setViewModalOpen] = React.useState(false);
  const [editModalOpen, setEditModalOpen] = React.useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
  const [createModalOpen, setCreateModalOpen] = React.useState(false);
  const [selectedService, setSelectedService] = React.useState<IService | null>(null);

  // Définition des champs du formulaire pour les services
  const formFields: ContentModalField[] = [
    {
      key: "nom",
      type: "text",
      label: t("fields.nom"),
      placeholder: "Entrez le nom du service...",
      required: true
    },
    {
      key: "type",
      type: "select",
      label: t("fields.type"),
      required: true,
      options: [
        { value: "consulaire", label: t("type.consulaire") },
        { value: "visa", label: t("type.visa") },
        { value: "passeport", label: t("type.passeport") },
        { value: "authentification", label: t("type.authentification") },
        { value: "notariat", label: t("type.notariat") }
      ]
    },
    {
      key: "description",
      type: "textarea",
      label: t("fields.description"),
      placeholder: "Description courte du service...",
      required: true,
      rows: 3
    },
    {
      key: "descriptionComplete",
      type: "textarea",
      label: "Description complète",
      placeholder: "Description détaillée du service, procédures, etc...",
      rows: 6
    },
    {
      key: "status",
      type: "select",
      label: t("fields.status"),
      required: true,
      options: [
        { value: "actif", label: t("status.actif") },
        { value: "inactif", label: t("status.inactif") },
        { value: "maintenance", label: t("status.maintenance") }
      ]
    },
    {
      key: "tarif",
      type: "text",
      label: t("fields.tarif"),
      placeholder: "ex: 50€ ou Gratuit"
    },
    {
      key: "delaiTraitement",
      type: "text",
      label: t("fields.delaiTraitement"),
      placeholder: "ex: 5-10 jours ouvrés"
    },
    {
      key: "contact",
      type: "text",
      label: t("fields.contact"),
      placeholder: "Responsable du service"
    },
    {
      key: "horaires",
      type: "text",
      label: t("fields.horaires"),
      placeholder: "ex: Lundi-Vendredi 9h-17h"
    },
    {
      key: "documentsRequis",
      type: "textarea",
      label: t("fields.documentsRequis"),
      placeholder: "Liste des documents nécessaires...",
      rows: 4
    },
    {
      key: "tags",
      type: "text",
      label: "Mots-clés",
      placeholder: "Séparez les mots-clés par des virgules..."
    }
  ];

  // Handlers pour les actions
  const handleView = (service: IService) => {
    setSelectedService(service);
    setViewModalOpen(true);
  };

  const handleEdit = (service: IService) => {
    setSelectedService(service);
    setEditModalOpen(true);
  };

  const handleDelete = (service: IService) => {
    setSelectedService(service);
    setDeleteModalOpen(true);
  };

  const handleCreate = () => {
    setSelectedService(null);
    setCreateModalOpen(true);
  };

  const handleSubmitCreate = async (formData: any) => {
    setIsLoading(true);
    try {
      // Simulation d'une création
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newService: IService = {
        id: Date.now().toString(),
        nom: formData.nom,
        description: formData.description,
        type: formData.type,
        status: formData.status,
        tarif: formData.tarif,
        delaiTraitement: formData.delaiTraitement,
        documentsRequis: formData.documentsRequis ? formData.documentsRequis.split(',').map((doc: string) => doc.trim()) : [],
        contact: formData.contact,
        horaires: formData.horaires,
        dateCreation: new Date().toISOString(),
        priorite: "normale",
        utilisationsCount: 0,
        satisfactionNote: 0,
        featured: false
      };
      
      setServices(prev => [newService, ...prev]);
      setCreateModalOpen(false);
      toast.success("Service créé avec succès");
    } catch (error) {
      toast.error("Erreur lors de la création");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitEdit = async (formData: any) => {
    if (!selectedService) return;
    
    setIsLoading(true);
    try {
      // Simulation d'une modification
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedService: IService = {
        ...selectedService,
        nom: formData.nom,
        description: formData.description,
        type: formData.type,
        status: formData.status,
        tarif: formData.tarif,
        delaiTraitement: formData.delaiTraitement,
        documentsRequis: formData.documentsRequis ? formData.documentsRequis.split(',').map((doc: string) => doc.trim()) : selectedService.documentsRequis || [],
        contact: formData.contact,
        horaires: formData.horaires,
        dateModification: new Date().toISOString()
      };
      
      setServices(prev => prev.map(s => 
        s.id === selectedService.id ? updatedService : s
      ));
      setEditModalOpen(false);
      setSelectedService(null);
      toast.success("Service modifié avec succès");
    } catch (error) {
      toast.error("Erreur lors de la modification");
    } finally {
      setIsLoading(false);
    }
  };

  const confirmDelete = () => {
    if (selectedService) {
      setServices(prev => prev.filter(s => s.id !== selectedService.id));
      setDeleteModalOpen(false);
      setSelectedService(null);
      toast.success("Service supprimé avec succès");
    }
  };

  const getEditData = (service: IService) => {
    return {
      nom: service.nom,
      description: service.description,
      type: service.type,
      status: service.status,
      tarif: service.tarif || '',
      delaiTraitement: service.delaiTraitement || '',
      documentsRequis: service.documentsRequis?.join(', ') || '',
      contact: service.contact || '',
      horaires: service.horaires || ''
    };
  };

  return (
    <div className={className}>
      <ServiceCards
        data={services}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onCreate={handleCreate}
        isLoading={isLoading}
      />

      {/* Modal de visualisation */}
      <Dialog open={viewModalOpen} onOpenChange={setViewModalOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-2">
              {selectedService?.nom}
              {selectedService?.featured && <Star className="w-5 h-5 text-embassy-yellow-500 fill-current" />}
            </DialogTitle>
            <DialogDescription>
              {selectedService?.description}
            </DialogDescription>
          </DialogHeader>
          {selectedService && (
            <div className="space-y-6">
              {/* Image du service */}
              {selectedService.image && (
                <div className="relative h-64 w-full rounded-lg overflow-hidden bg-muted">
                  <Image
                    src={selectedService.image}
                    alt={selectedService.nom}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              
              {/* Description complète */}
              <div>
                <h3 className="font-semibold text-lg mb-2">Description complète</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {selectedService.descriptionComplete}
                </p>
              </div>
              
              {/* Informations détaillées en grille */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Informations générales */}
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-sm text-muted-foreground mb-3">INFORMATIONS GÉNÉRALES</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center gap-2">
                        <Badge className={`text-xs ${selectedService.status === 'actif' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                          {selectedService.status}
                        </Badge>
                        <span>•</span>
                        <span>Catégorie: {selectedService.categorie}</span>
                      </div>
                      <div><span className="font-medium">Responsable:</span> {selectedService.responsable}</div>
                      <div><span className="font-medium">Créé le:</span> {new Date(selectedService.dateCreation).toLocaleDateString('fr-FR')}</div>
                      {selectedService.coutEstime && (
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-muted-foreground" />
                          <span><span className="font-medium">Coût:</span> {selectedService.coutEstime}</span>
                        </div>
                      )}
                      {selectedService.delaiEstime && (
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span><span className="font-medium">Délai:</span> {selectedService.delaiEstime}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Contact */}
                  {selectedService.contact && (
                    <div>
                      <h3 className="font-semibold text-sm text-muted-foreground mb-3">CONTACT</h3>
                      <div className="space-y-2 text-sm">
                        {selectedService.contact.email && (
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-muted-foreground" />
                            <span>{selectedService.contact.email}</span>
                          </div>
                        )}
                        {selectedService.contact.telephone && (
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-muted-foreground" />
                            <span>{selectedService.contact.telephone}</span>
                          </div>
                        )}
                        {selectedService.contact.bureau && (
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-muted-foreground" />
                            <span>{selectedService.contact.bureau}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Statistiques */}
                  <div>
                    <h3 className="font-semibold text-sm text-muted-foreground mb-3">STATISTIQUES</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span>{selectedService.utilisationsCount || 0} utilisations</span>
                      </div>
                      {selectedService.satisfactionNote && (
                        <div className="flex items-center gap-2">
                          <Star className="w-4 h-4 text-embassy-yellow-500" />
                          <span>{selectedService.satisfactionNote}/5 de satisfaction</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Horaires et procédures */}
                <div className="space-y-4">
                  {/* Horaires */}
                  {selectedService.horaires && (
                    <div>
                      <h3 className="font-semibold text-sm text-muted-foreground mb-3">HORAIRES D&apos;OUVERTURE</h3>
                      <div className="space-y-1 text-sm">
                        {Object.entries(selectedService.horaires).map(([jour, horaire]) => (
                          <div key={jour} className="flex justify-between">
                            <span className="capitalize font-medium">{jour}:</span>
                            <span>{horaire || 'Fermé'}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Documents requis */}
                  {selectedService.documentsRequis && selectedService.documentsRequis.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-sm text-muted-foreground mb-3">DOCUMENTS REQUIS</h3>
                      <ul className="space-y-1 text-sm">
                        {selectedService.documentsRequis.map((doc, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <FileText className="w-3 h-3 text-muted-foreground mt-1 flex-shrink-0" />
                            <span>{doc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Tags */}
                  {selectedService.tags && selectedService.tags.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-sm text-muted-foreground mb-3">MOTS-CLÉS</h3>
                      <div className="flex flex-wrap gap-1">
                        {selectedService.tags.map((tag, index) => (
                          <Badge key={index} className="text-xs border border-gray-300">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Procédures */}
              {selectedService.procedures && selectedService.procedures.length > 0 && (
                <div>
                  <h3 className="font-semibold text-lg mb-3">Procédure à suivre</h3>
                  <ol className="space-y-2">
                    {selectedService.procedures.map((procedure, index) => (
                      <li key={index} className="flex items-start gap-3 text-sm">
                        <span className="flex-shrink-0 w-6 h-6 bg-embassy-blue-100 text-embassy-blue-600 rounded-full flex items-center justify-center text-xs font-medium">
                          {index + 1}
                        </span>
                        <span>{procedure}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {/* FAQ */}
              {selectedService.faq && selectedService.faq.length > 0 && (
                <div>
                  <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <HelpCircle className="w-5 h-5" />
                    Questions fréquentes
                  </h3>
                  <Accordion type="single" collapsible className="w-full">
                    {selectedService.faq.map((item, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-left">
                          {item.question}
                        </AccordionTrigger>
                        <AccordionContent>
                          {item.reponse}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewModalOpen(false)}>
              Fermer
            </Button>
            <Button onClick={() => {
              setViewModalOpen(false);
              if (selectedService) handleEdit(selectedService);
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
              Êtes-vous sûr de vouloir supprimer le service &quot;{selectedService?.nom}&quot; ? 
              Cette action est irréversible et affectera les utilisateurs qui dépendent de ce service.
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
        title={t("create_service")}
        description="Créez un nouveau service consulaire"
        fields={formFields}
        isLoading={isLoading}
        translationNamespace="contenu.gestionService"
      />

      {/* Modal d'édition */}
      <ContentModal
        isOpen={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
          setSelectedService(null);
        }}
        onSubmit={handleSubmitEdit}
        title={t("edit_service")}
        description="Modifiez les informations de ce service"
        fields={formFields}
        initialData={selectedService ? getEditData(selectedService) : {}}
        isEditing={true}
        isLoading={isLoading}
        translationNamespace="contenu.gestionService"
      />

      {/* Modal de visualisation */}
      <ViewModal
        isOpen={viewModalOpen}
        onClose={() => {
          setViewModalOpen(false);
          setSelectedService(null);
        }}
        title="Détails du service"
        data={selectedService}
        type="service"
        translationNamespace="contenu.gestionService"
      />
    </div>
  );
}
