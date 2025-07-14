import { IActualite } from "@/types/actualite.types";

export const data: IActualite[] = [
  {
    id: "1",
    createdAt: new Date("2024-01-15T14:30:00Z"),
    updatedAt: new Date("2024-01-15T16:45:00Z"),
    title: "Rencontre diplomatique entre le Tchad et la France",
    content: "Une importante rencontre diplomatique s'est tenue entre les représentants du Tchad et de la France pour discuter des relations bilatérales et des enjeux régionaux. Le ministre des Affaires étrangères du Tchad s'est entretenu avec son homologue français dans le cadre d'une visite officielle. Les discussions ont porté sur le renforcement de la coopération économique, sécuritaire et culturelle entre les deux pays. Cette rencontre s'inscrit dans la continuité des excellentes relations historiques entre le Tchad et la France.",
    imageUrl: "/images/actualites/background.png",
    published: true,
    authorId: "amb-001",
    author: {
      id: "amb-001",
      email: "m.dubois@ambassade-tchad.fr",
      firstName: "Martin",
      lastName: "Dubois"
    }
  },
  {
    id: "2",
    createdAt: new Date("2024-01-10T10:00:00Z"),
    updatedAt: new Date("2024-01-12T09:15:00Z"),
    title: "Célébration de la Fête Nationale du Tchad",
    content: "L'ambassade du Tchad en France a organisé une cérémonie officielle pour célébrer la Fête Nationale du Tchad avec la communauté tchadienne et les invités diplomatiques. Une cérémonie solennelle s'est déroulée dans les locaux de l'ambassade pour marquer cette date importante. L'événement a rassemblé des membres de la diaspora tchadienne, des représentants du corps diplomatique et des personnalités françaises. Un discours a été prononcé par l'Ambassadeur, suivi d'une réception et de prestations culturelles traditionnelles.",
    imageUrl: "/images/actualites/fete-nationale-tchad.jpg",
    published: true,
    authorId: "cons-002",
    author: {
      id: "cons-002",
      email: "s.nguema@ambassade-tchad.fr",
      firstName: "Sarah",
      lastName: "Nguema"
    }
  },
  {
    id: "3",
    createdAt: new Date("2024-01-08T09:00:00Z"),
    updatedAt: new Date("2024-01-08T09:00:00Z"),
    title: "Nouveau service consulaire en ligne",
    content: "L'ambassade lance un nouveau service consulaire numérique pour faciliter les démarches administratives des ressortissants tchadiens en France. Ce nouveau service permet aux citoyens tchadiens de réaliser certaines démarches consulaires en ligne, notamment les demandes de passeports, d'état civil et d'attestations diverses. Cette modernisation s'inscrit dans la volonté d'améliorer l'efficacité des services consulaires et de réduire les délais de traitement. Le service sera progressivement étendu à d'autres types de demandes.",
    imageUrl: "/images/actualites/service-consulaire-numerique.jpg",
    published: false,
    authorId: "cons-003",
    author: {
      id: "cons-003",
      email: "p.mahamat@ambassade-tchad.fr",
      firstName: "Pierre",
      lastName: "Mahamat"
    }
  },
  {
    id: "4",
    createdAt: new Date("2024-01-05T11:30:00Z"),
    updatedAt: new Date("2024-01-06T14:20:00Z"),
    title: "Coopération économique renforcée",
    content: "Signature d'un accord de coopération économique entre le Tchad et plusieurs entreprises françaises dans le secteur de l'agriculture et de l'énergie. Cet accord historique ouvre de nouvelles perspectives de développement pour le Tchad dans les secteurs stratégiques de l'agriculture et de l'énergie renouvelable. Les entreprises françaises partenaires s'engagent à investir dans des projets durables et à former la main-d'œuvre locale. Cette collaboration devrait créer plusieurs milliers d'emplois et contribuer significativement au développement économique du pays.",
    imageUrl: "/images/actualites/cooperation-economique.jpg",
    published: true,
    authorId: "eco-004",
    author: {
      id: "eco-004",
      email: "f.ahmat@ambassade-tchad.fr",
      firstName: "Fatima",
      lastName: "Ahmat"
    }
  },
  {
    id: "5",
    createdAt: new Date("2024-01-03T08:00:00Z"),
    updatedAt: new Date("2024-01-03T08:00:00Z"),
    title: "Programme de bourses d'études 2024",
    content: "Lancement du programme annuel de bourses d'études destiné aux étudiants tchadiens souhaitant poursuivre leurs études supérieures en France. Le programme de bourses 2024 offre 50 bourses complètes pour des études dans diverses disciplines : ingénierie, médecine, sciences sociales, droit et arts. Les candidatures sont ouvertes jusqu'au 31 mars 2024. Ce programme s'inscrit dans le cadre de la coopération éducative franco-tchadienne et vise à former la nouvelle génération de cadres tchadiens.",
    imageUrl: "/images/actualites/bourses-etudes-2024.jpg",
    published: true,
    authorId: "cul-005",
    author: {
      id: "cul-005",
      email: "a.saleh@ambassade-tchad.fr",
      firstName: "Abakar",
      lastName: "Saleh"
    }
  },
  {
    id: "6",
    createdAt: new Date("2023-12-28T16:00:00Z"),
    updatedAt: new Date("2023-12-29T10:30:00Z"),
    title: "Exposition d'art contemporain tchadien",
    content: "Une exposition exceptionnelle d'artistes tchadiens contemporains se tient à la galerie de l'ambassade, mettant en lumière la richesse culturelle du Tchad. Cette exposition présente les œuvres de 15 artistes tchadiens contemporains, explorant les thèmes de l'identité, de la modernité et des traditions. L'événement, qui se déroule sur trois semaines, propose également des conférences et des ateliers pour faire découvrir l'art tchadien au public français. C'est une opportunité unique de découvrir la créativité et le talent artistique du Tchad.",
    imageUrl: "/images/actualites/exposition-art-tchadien.jpg",
    published: false,
    authorId: "cul-005",
    author: {
      id: "cul-005",
      email: "a.saleh@ambassade-tchad.fr",
      firstName: "Abakar",
      lastName: "Saleh"
    }
  }
];

