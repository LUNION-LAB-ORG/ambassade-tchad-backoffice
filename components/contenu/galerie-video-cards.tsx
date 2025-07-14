"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
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
  Video,
  Play,
  MapPin,
  Calendar,
  User,
  Star,
  Share2,
  Download
} from "lucide-react";
import { cn } from "@/lib/utils";
import { IGalerieVideo } from "@/types/galerie.types";
import VideoThumbnail from "@/components/ui/video-thumbnail";

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

interface GalerieVideoCardsProps {
  data: IGalerieVideo[];
  onView: (video: IGalerieVideo) => void;
  onEdit: (video: IGalerieVideo) => void;
  onDelete: (video: IGalerieVideo) => void;
  onCreate: () => void;
  isLoading?: boolean;
}

export const GalerieVideoCards: React.FC<GalerieVideoCardsProps> = ({
  data,
  onView,
  onEdit,
  onDelete,
  onCreate,
  isLoading = false
}) => {
  const t = useTranslations("contenu.gestionGalerie.videos");
  const [searchTerm, setSearchTerm] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<string>("all");
  const [categoryFilter, setCategoryFilter] = React.useState<string>("all");
  const [priorityFilter, setPriorityFilter] = React.useState<string>("all");

  // Filtrer les données
  const filteredData = React.useMemo(() => {
    return data.filter((video) => {
      const matchesSearch = 
        video.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        video.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (video.lieu && video.lieu.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (video.tags && video.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
      
      const matchesStatus = statusFilter === "all" || video.status === statusFilter;
      const matchesCategory = categoryFilter === "all" || video.categorie === categoryFilter;
      const matchesPriority = priorityFilter === "all" || video.priorite === priorityFilter;
      
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
        return <Video className="w-4 h-4 text-embassy-blue-600" />;
      case "evenement":
        return <Calendar className="w-4 h-4 text-embassy-blue-600" />;
      case "ceremonie":
        return <Star className="w-4 h-4 text-embassy-blue-600" />;
      case "interview":
        return <User className="w-4 h-4 text-embassy-blue-600" />;
      default:
        return <Video className="w-4 h-4 text-embassy-blue-600" />;
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
      case "interview":
        return "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400";
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

  const isVideoRecent = (datePublication: string) => {
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
              <SelectItem value="ceremonie">Cérémonie</SelectItem>
              <SelectItem value="interview">Interview</SelectItem>
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
          {t("create_video")}
        </Button>
      </div>

      {/* Compteur de résultats */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>
          {filteredData.length} {filteredData.length === 1 ? t("labels.videos_found_singular") : t("labels.videos_found_plural")}
        </span>
      </div>

      {/* Grille des vidéos */}
      {filteredData.length === 0 ? (
        <Card className="p-12 text-center">
          <div className="flex flex-col items-center gap-4">
            <Video className="w-16 h-16 text-muted-foreground/50" />
            <div>
              <h3 className="text-lg font-medium text-muted-foreground">
                {t("no_results")}
              </h3>
              <p className="text-sm text-muted-foreground/70 mt-1">
                Essayez de modifier vos filtres ou ajoutez une nouvelle vidéo
              </p>
            </div>
            <Button 
              onClick={onCreate}
              variant="outline"
              className="mt-2 bg-embassy-blue-600 text-white border-0 hover:bg-embassy-blue-700 cursor-pointer"
            >
              <Plus className="w-4 h-4 mr-2" />
              {t("create_video")}
            </Button>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
          {filteredData.map((video) => (
            <Card 
              key={video.id} 
              className={cn(
                "group hover:shadow-xl transition-all duration-300 cursor-pointer border backdrop-blur-sm overflow-hidden",
                "bg-white/80 dark:bg-default-100/80",
                video.featured && "ring-2 ring-embassy-yellow-500"
              )}
              onClick={() => onView(video)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg text-default-900 leading-tight truncate">
                      {video.titre}
                    </h3>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center gap-1">
                        {getCategoryIcon(video.categorie)}
                        <Badge 
                          className={cn("text-xs", getCategoryColor(video.categorie))}
                        >
                          {video.categorie}
                        </Badge>
                      </div>
                      {getPriorityIcon(video.priorite)}
                      {video.featured && <Star className="w-4 h-4 text-embassy-yellow-500 fill-current" />}
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
                          onView(video);
                        }}
                        className="flex items-center gap-2 hover:bg-embassy-yellow-50 dark:hover:bg-embassy-yellow-900/20"
                      >
                        <Eye className="w-4 h-4 text-embassy-yellow-600" />
                        Voir la vidéo
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={(e) => {
                          e.stopPropagation();
                          onEdit(video);
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
                          onDelete(video);
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
                {/* Thumbnail de la vidéo */}
                <VideoThumbnail
                  src={video.videoUrl}
                  title={video.titre}
                  duration={video.duree}
                  isNew={isVideoRecent(video.datePublication)}
                  onPlay={() => onView(video)}
                  className="h-64"
                />

                {/* Description et détails */}
                <div className="px-4 space-y-3">
                  <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                    {video.description}
                  </p>

                  {/* Détails */}
                  <div className="space-y-2">
                    {/* Date */}
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-embassy-blue-600 flex-shrink-0" />
                      <span className="text-default-700">
                        {formatDate(video.datePublication)}
                      </span>
                    </div>

                    {/* Lieu */}
                    {video.lieu && (
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-embassy-blue-600 flex-shrink-0" />
                        <span className="text-default-700 truncate">
                          {video.lieu}
                        </span>
                      </div>
                    )}

                    {/* Événement associé */}
                    {video.evenementAssocie && (
                      <div className="flex items-center gap-2 text-sm">
                        <Tag className="w-4 h-4 text-embassy-blue-600 flex-shrink-0" />
                        <span className="text-default-700 truncate">
                          {video.evenementAssocie}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Tags */}
                  {video.tags && video.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {video.tags.slice(0, 3).map((tag, index) => (
                        <Badge 
                          key={index} 
                          variant="outline" 
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                      {video.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{video.tags.length - 3}
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
                              {getInitials(video.auteur)}
                            </AvatarFallback>
                          </Avatar>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Vidéo créée par {video.auteur}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(video.datePublication)}
                    </span>
                  </div>
                  
                  <Badge 
                    className={cn("text-xs", getStatusColor(video.status))}
                  >
                    {video.status}
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
