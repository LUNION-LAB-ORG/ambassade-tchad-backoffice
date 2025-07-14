"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { 
  Eye, 
  SquarePen, 
  Trash2, 
  Search,
  Plus,
  MoreVertical,
  Tag,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Camera,
  Download,
  Heart,
  MapPin,
  Calendar,
  User,
  ImageIcon,
  Star,
  Share2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { IGaleriePhoto } from "@/types/galerie.types";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";

interface GaleriePhotoCardsProps {
  data: IGaleriePhoto[];
  onView: (photo: IGaleriePhoto) => void;
  onEdit: (photo: IGaleriePhoto) => void;
  onDelete: (photo: IGaleriePhoto) => void;
  onCreate: () => void;
  isLoading?: boolean;
}

export const GaleriePhotoCards: React.FC<GaleriePhotoCardsProps> = ({
  data,
  onView,
  onEdit,
  onDelete,
  onCreate,
  isLoading = false
}) => {
  const t = useTranslations("contenu.gestionGalerie.photo");
  const [searchTerm, setSearchTerm] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<string>("all");
  const [categoryFilter, setCategoryFilter] = React.useState<string>("all");
  const [priorityFilter, setPriorityFilter] = React.useState<string>("all");

  // Filtrer les données
  const filteredData = React.useMemo(() => {
    return data.filter((photo) => {
      const matchesSearch = 
        photo.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        photo.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (photo.lieu && photo.lieu.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (photo.tags && photo.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
      
      const matchesStatus = statusFilter === "all" || photo.status === statusFilter;
      const matchesCategory = categoryFilter === "all" || photo.categorie === categoryFilter;
      const matchesPriority = priorityFilter === "all" || photo.priorite === priorityFilter;
      
      return matchesSearch && matchesStatus && matchesCategory && matchesPriority;
    });
  }, [data, searchTerm, statusFilter, categoryFilter, priorityFilter]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "publié":
        return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400";
      case "brouillon":
        return "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400";
      case "archivé":
        return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  const getPriorityIcon = (priorite?: string) => {
    switch (priorite) {
      case "urgente":
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case "importante":
        return <Clock className="w-4 h-4 text-orange-500" />;
      default:
        return <CheckCircle2 className="w-4 h-4 text-embassy-yellow-500" />;
    }
  };

  const getCategoryIcon = (category?: string) => {
    switch (category) {
      case "diplomatie":
        return <User className="w-4 h-4 text-embassy-blue-600" />;
      case "culture":
        return <ImageIcon className="w-4 h-4 text-embassy-blue-600" />;
      case "evenement":
        return <Calendar className="w-4 h-4 text-embassy-blue-600" />;
      case "ceremonie":
        return <Star className="w-4 h-4 text-embassy-blue-600" />;
      default:
        return <Camera className="w-4 h-4 text-embassy-blue-600" />;
    }
  };

  const getCategoryColor = (category?: string) => {
    switch (category) {
      case "diplomatie":
        return "bg-embassy-blue-100 text-embassy-blue-700 dark:bg-embassy-blue-900/30 dark:text-embassy-blue-400";
      case "culture":
        return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400";
      case "evenement":
        return "bg-embassy-yellow-100 text-embassy-yellow-700 dark:bg-embassy-yellow-900/30 dark:text-embassy-yellow-400";
      case "ceremonie":
        return "bg-embassy-red-100 text-embassy-red-700 dark:bg-embassy-red-900/30 dark:text-embassy-red-400";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const isPhotoRecent = (datePublication: string) => {
    const pubDate = new Date(datePublication);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - pubDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7; // Récent si publié dans les 7 derniers jours
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        {/* Skeleton pour la barre de recherche */}
        <div className="flex gap-4">
          <div className="h-10 bg-muted rounded-md flex-1 animate-pulse" />
          <div className="h-10 w-32 bg-muted rounded-md animate-pulse" />
          <div className="h-10 w-32 bg-muted rounded-md animate-pulse" />
          <div className="h-10 w-32 bg-muted rounded-md animate-pulse" />
        </div>
        
        {/* Skeleton pour les cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="space-y-3">
                <div className="h-4 bg-muted rounded w-3/4" />
                <div className="h-3 bg-muted rounded w-1/2" />
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="h-48 bg-muted rounded-md" />
                <div className="h-3 bg-muted rounded w-full" />
                <div className="h-3 bg-muted rounded w-2/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Barre de recherche et filtres */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-1 gap-3 w-full sm:w-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder={t("search_placeholder")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="publié">Publié</SelectItem>
              <SelectItem value="brouillon">Brouillon</SelectItem>
              <SelectItem value="archivé">Archivé</SelectItem>
            </SelectContent>
          </Select>

          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Catégorie" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes catégories</SelectItem>
              <SelectItem value="diplomatie">Diplomatie</SelectItem>
              <SelectItem value="culture">Culture</SelectItem>
              <SelectItem value="evenement">Événement</SelectItem>
              <SelectItem value="ceremonie">Réception</SelectItem>
              <SelectItem value="autre">Autre</SelectItem>
            </SelectContent>
          </Select>

          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Priorité" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes priorités</SelectItem>
              <SelectItem value="normale">Normale</SelectItem>
              <SelectItem value="importante">Importante</SelectItem>
              <SelectItem value="urgente">Urgente</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button 
          onClick={onCreate}
          className="bg-gradient-to-r from-embassy-blue-600 to-embassy-blue-700 hover:from-embassy-blue-700 hover:to-embassy-blue-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 border-0"
        >
          <Plus className="w-4 h-4 mr-2" />
          Ajouter une photo
        </Button>
      </div>

      {/* Compteur de résultats */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>
          {filteredData.length} {filteredData.length === 1 ? "photo trouvée" : "photos trouvées"}
        </span>
      </div>

      {/* Grille des photos */}
      {filteredData.length === 0 ? (
        <Card className="p-12 text-center">
          <div className="flex flex-col items-center gap-4">
            <Camera className="w-16 h-16 text-muted-foreground/50" />
            <div>
              <h3 className="text-lg font-medium text-muted-foreground">
                {t("no_results")}
              </h3>
              <p className="text-sm text-muted-foreground/70 mt-1">
                Essayez de modifier vos filtres ou ajoutez une nouvelle photo
              </p>
            </div>
            <Button 
              onClick={onCreate}
              variant="outline"
              className="mt-2 bg-embassy-blue-600 text-white border-0 hover:bg-embassy-blue-700 cursor-pointer"
            >
              <Plus className="w-4 h-4 mr-2" />
              {t("create_photo")}
            </Button>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
          {filteredData.map((photo) => (
            <Card 
              key={photo.id} 
              className={cn(
                "group hover:shadow-xl transition-all duration-300 cursor-pointer border backdrop-blur-sm overflow-hidden",
                "bg-white/80 dark:bg-default-100/80",
                photo.featured && "ring-2 ring-embassy-yellow-500"
              )}
              onClick={() => onView(photo)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg text-default-900 leading-tight truncate">
                      {photo.titre}
                    </h3>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center gap-1">
                        {getCategoryIcon(photo.categorie)}
                        <Badge 
                          className={cn("text-xs", getCategoryColor(photo.categorie))}
                        >
                          {photo.categorie}
                        </Badge>
                      </div>
                      {getPriorityIcon(photo.priorite)}
                      {photo.featured && <Star className="w-4 h-4 text-embassy-yellow-500 fill-current" />}
                    </div>
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent 
                      align="end" 
                      className="w-48 bg-white/95 dark:bg-default-100/95 backdrop-blur-sm border border-default-200/50"
                    >
                      <DropdownMenuItem 
                        onClick={(e) => {
                          e.stopPropagation();
                          onView(photo);
                        }}
                        className="flex items-center gap-2 hover:bg-embassy-yellow-50 dark:hover:bg-embassy-yellow-900/20"
                      >
                        <Eye className="w-4 h-4 text-embassy-yellow-600" />
                        Voir la photo
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={(e) => {
                          e.stopPropagation();
                          onEdit(photo);
                        }}
                        className="flex items-center gap-2 hover:bg-embassy-blue-50 dark:hover:bg-embassy-blue-900/20"
                      >
                        <SquarePen className="w-4 h-4 text-embassy-blue-600" />
                        Modifier
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        onClick={(e) => {
                          e.stopPropagation();
                          onDelete(photo);
                        }}
                        className="flex items-center gap-2 text-destructive hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        <Trash2 className="w-4 h-4" />
                        Supprimer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>

              <CardContent className="space-y-4 p-0">
                {/* Image de la photo */}
                <div className="relative h-64 w-full bg-muted">
                  <Image
                    src={photo.image}
                    alt={photo.imageAlt || photo.titre}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {isPhotoRecent(photo.datePublication) && (
                    <div className="absolute top-2 left-2">
                      <Badge className="bg-embassy-red-500 text-white">
                        Nouveau
                      </Badge>
                    </div>
                  )}
                  
                  {/* Overlay avec les statistiques */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-white text-sm">
                      <div className="flex items-center gap-3">
                        {photo.vuesCount && (
                          <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            <span>{photo.vuesCount}</span>
                          </div>
                        )}
                        {photo.likesCount && (
                          <div className="flex items-center gap-1">
                            <Heart className="w-4 h-4" />
                            <span>{photo.likesCount}</span>
                          </div>
                        )}
                        {photo.downloadCount && (
                          <div className="flex items-center gap-1">
                            <Download className="w-4 h-4" />
                            <span>{photo.downloadCount}</span>
                          </div>
                        )}
                      </div>
                      <Button
                        size="sm"
                        variant="secondary"
                        className="h-8 text-xs bg-white/20 hover:bg-white/30 text-white border-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Action de partage
                        }}
                      >
                        <Share2 className="w-3 h-3 mr-1" />
                        Partager
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Description et détails */}
                <div className="px-4 space-y-3">
                  <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                    {photo.description}
                  </p>

                  {/* Détails */}
                  <div className="space-y-2">
                    {/* Date */}
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-embassy-blue-600 flex-shrink-0" />
                      <span className="text-default-700">
                        {formatDate(photo.datePublication)}
                      </span>
                    </div>

                    {/* Lieu */}
                    {photo.lieu && (
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-embassy-blue-600 flex-shrink-0" />
                        <span className="text-default-700 truncate">
                          {photo.lieu}
                        </span>
                      </div>
                    )}

                    {/* Événement associé */}
                    {photo.evenementAssocie && (
                      <div className="flex items-center gap-2 text-sm">
                        <Tag className="w-4 h-4 text-embassy-blue-600 flex-shrink-0" />
                        <span className="text-default-700 truncate">
                          {photo.evenementAssocie}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Tags */}
                  {photo.tags && photo.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {photo.tags.slice(0, 3).map((tag, index) => (
                        <Badge 
                          key={index} 
                          variant="outline" 
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                      {photo.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{photo.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>

              <CardFooter className="pt-3 border-t border-default-200/50">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Avatar className="w-7 h-7">
                            <AvatarFallback className="text-xs bg-embassy-blue-100 text-embassy-blue-600">
                              {getInitials(photo.auteur)}
                            </AvatarFallback>
                          </Avatar>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Photo prise par {photo.auteur}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(photo.datePublication)}
                    </span>
                  </div>
                  
                  <Badge 
                    className={cn("text-xs", getStatusColor(photo.status))}
                  >
                    {photo.status}
                  </Badge>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
