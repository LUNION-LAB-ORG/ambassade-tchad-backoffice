"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { 
  Eye, 
  SquarePen, 
  Trash2, 
  Calendar, 
  User, 
  Search,
  Filter,
  Plus,
  MoreVertical,
  Tag,
  AlertTriangle,
  Clock,
  CheckCircle2,
  MapPin,
  Users,
  Euro,
  ExternalLink,
  CalendarClock
} from "lucide-react";
import { cn } from "@/lib/utils";
import { IEvenement } from "@/types/evenement.types";

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

interface EvenementCardsProps {
  data: IEvenement[];
  onView: (evenement: IEvenement) => void;
  onEdit: (evenement: IEvenement) => void;
  onDelete: (evenement: IEvenement) => void;
  onCreate: () => void;
  isLoading?: boolean;
}

export const EvenementCards: React.FC<EvenementCardsProps> = ({
  data,
  onView,
  onEdit,
  onDelete,
  onCreate,
  isLoading = false
}) => {
  const t = useTranslations("contenu.gestionEvenement");
  const [searchTerm, setSearchTerm] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<string>("all");
  const [priorityFilter, setPriorityFilter] = React.useState<string>("all");
  const [typeFilter, setTypeFilter] = React.useState<string>("all");

  // Filtrer les données
  const filteredData = React.useMemo(() => {
    return data.filter((evenement) => {
      const matchesSearch = 
        evenement.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        evenement.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        evenement.lieu.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === "all" || evenement.status === statusFilter;
      const matchesPriority = priorityFilter === "all" || evenement.priorite === priorityFilter;
      const matchesType = typeFilter === "all" || evenement.typeEvenement === typeFilter;
      
      return matchesSearch && matchesStatus && matchesPriority && matchesType;
    });
  }, [data, searchTerm, statusFilter, priorityFilter, typeFilter]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "publié":
        return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400";
      case "brouillon":
        return "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400";
      case "annulé":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
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

  const getTypeIcon = (type?: string) => {
    switch (type) {
      case "conference":
        return <Users className="w-4 h-4 text-embassy-blue-600" />;
      case "seminaire":
        return <CalendarClock className="w-4 h-4 text-embassy-blue-600" />;
      case "atelier":
        return <Calendar className="w-4 h-4 text-embassy-blue-600" />;
      case "ceremonie":
        return <Tag className="w-4 h-4 text-embassy-blue-600" />;
      case "reception":
        return <Users className="w-4 h-4 text-embassy-blue-600" />;
      case "formation":
        return <CalendarClock className="w-4 h-4 text-embassy-blue-600" />;
      default:
        return <Calendar className="w-4 h-4 text-embassy-blue-600" />;
    }
  };

  const getTypeColor = (type?: string) => {
    switch (type) {
      case "conference":
        return "bg-embassy-blue-100 text-embassy-blue-700 dark:bg-embassy-blue-900/30 dark:text-embassy-blue-400";
      case "seminaire":
        return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400";
      case "atelier":
        return "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400";
      case "ceremonie":
        return "bg-embassy-red-100 text-embassy-red-700 dark:bg-embassy-red-900/30 dark:text-embassy-red-400";
      case "reception":
        return "bg-embassy-yellow-100 text-embassy-yellow-700 dark:bg-embassy-yellow-900/30 dark:text-embassy-yellow-400";
      case "formation":
        return "bg-embassy-yellow-100 text-embassy-yellow-700 dark:bg-embassy-yellow-900/30 dark:text-embassy-yellow-400";
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

  const formatDateRange = (dateDebut: string, dateFin: string) => {
    try {
      const debut = new Date(dateDebut);
      const fin = new Date(dateFin);
      
      if (debut.toDateString() === fin.toDateString()) {
        return debut.toLocaleDateString('fr-FR', {
          day: '2-digit',
          month: 'long',
          year: 'numeric'
        });
      } else {
        return `${debut.toLocaleDateString('fr-FR', {
          day: '2-digit',
          month: 'short'
        })} - ${fin.toLocaleDateString('fr-FR', {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        })}`;
      }
    } catch {
      return `${dateDebut} - ${dateFin}`;
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

  const isEventUpcoming = (dateDebut: string) => {
    return new Date(dateDebut) > new Date();
  };

  const isEventPast = (dateFin: string) => {
    return new Date(dateFin) < new Date();
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
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="space-y-3">
                <div className="h-4 bg-muted rounded w-3/4" />
                <div className="h-3 bg-muted rounded w-1/2" />
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="h-32 bg-muted rounded-md" />
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
              <SelectItem value="all">{t("filters.all_status")}</SelectItem>
              <SelectItem value="publié">{t("status.publie")}</SelectItem>
              <SelectItem value="brouillon">{t("status.brouillon")}</SelectItem>
              <SelectItem value="annulé">{t("status.annule")}</SelectItem>
              <SelectItem value="archivé">{t("status.archive")}</SelectItem>
            </SelectContent>
          </Select>

          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Type d'événement" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("filters.all_types")}</SelectItem>
              <SelectItem value="conference">{t("type.conference")}</SelectItem>
              <SelectItem value="seminaire">{t("type.seminaire")}</SelectItem>
              <SelectItem value="atelier">{t("type.atelier")}</SelectItem>
              <SelectItem value="ceremonie">{t("type.ceremonie")}</SelectItem>
              <SelectItem value="reception">{t("type.reception")}</SelectItem>
              <SelectItem value="formation">{t("type.formation")}</SelectItem>
              <SelectItem value="autre">{t("type.autre")}</SelectItem>
            </SelectContent>
          </Select>

          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Priorité" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("filters.all_priorities")}</SelectItem>
              <SelectItem value="normale">{t("priority.normale")}</SelectItem>
              <SelectItem value="importante">{t("priority.importante")}</SelectItem>
              <SelectItem value="urgente">{t("priority.urgente")}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button 
          onClick={onCreate}
          className="bg-gradient-to-r from-embassy-blue-600 to-embassy-blue-700 hover:from-embassy-blue-700 hover:to-embassy-blue-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 border-0"
        >
          <Plus className="w-4 h-4 mr-2" />
          {t("create_event")}
        </Button>
      </div>

      {/* Compteur de résultats */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>
          {filteredData.length} {filteredData.length === 1 ? t("labels.events_found_singular") : t("labels.events_found_plural")}
        </span>
      </div>

      {/* Grille des événements */}
      {filteredData.length === 0 ? (
        <Card className="p-12 text-center">
          <div className="flex flex-col items-center gap-4">
            <Calendar className="w-16 h-16 text-muted-foreground/50" />
            <div>
              <h3 className="text-lg font-medium text-muted-foreground">
                {t("empty_state.title")}
              </h3>
              <p className="text-sm text-muted-foreground/70 mt-1">
                {t("empty_state.description")}
              </p>
            </div>
            <Button 
              onClick={onCreate}
              variant="outline"
              className="mt-2  bg-embassy-blue-600 text-white border-0 hover:bg-embassy-blue-700 cursor-pointer"
            >
              <Plus className="w-4 h-4 mr-2" />
              {t("empty_state.create_button")}
            </Button>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredData.map((evenement) => (
            <Card 
              key={evenement.id} 
              className={cn(
                "group hover:shadow-lg transition-all duration-300 cursor-pointer border backdrop-blur-sm",
                "bg-white/80 dark:bg-default-100/80",
                isEventPast(evenement.dateFin) && "opacity-75"
              )}
              onClick={() => onView(evenement)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg text-default-900 leading-tight truncate">
                      {evenement.titre}
                    </h3>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center gap-1">
                        {getTypeIcon(evenement.typeEvenement)}
                        <Badge 
                          variant="secondary" 
                          className={cn("text-xs", getTypeColor(evenement.typeEvenement))}
                        >
                          {t(`type.${evenement.typeEvenement}`) || evenement.typeEvenement}
                        </Badge>
                      </div>
                      {getPriorityIcon(evenement.priorite)}
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
                          onView(evenement);
                        }}
                        className="flex items-center gap-2 hover:bg-embassy-yellow-50 dark:hover:bg-embassy-yellow-900/20"
                      >
                        <Eye className="w-4 h-4 text-embassy-yellow-600" />
                        {t("view_event")}
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={(e) => {
                          e.stopPropagation();
                          onEdit(evenement);
                        }}
                        className="flex items-center gap-2 hover:bg-embassy-red-50 dark:hover:bg-embassy-red-900/20"
                      >
                        <SquarePen className="w-4 h-4 text-embassy-red-600" />
                        {t("edit_event")}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        onClick={(e) => {
                          e.stopPropagation();
                          onDelete(evenement);
                        }}
                        className="flex items-center gap-2 text-destructive hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        <Trash2 className="w-4 h-4" />
                        {t("delete_event")}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Image de l'événement */}
                {evenement.image && (
                  <div className="relative h-48 w-full rounded-lg overflow-hidden bg-muted">
                    <Image
                      src={evenement.image}
                      alt={evenement.titre}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {evenement.gratuit && (
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-embassy-yellow-500 text-white">
                          {t("labels.free")}
                        </Badge>
                      </div>
                    )}
                    {evenement.prixEntree && evenement.prixEntree > 0 && (
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-embassy-blue-500 text-white">
                          {evenement.prixEntree}€
                        </Badge>
                      </div>
                    )}
                  </div>
                )}

                {/* Description */}
                <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                  {evenement.description}
                </p>

                {/* Détails de l'événement */}
                <div className="space-y-2">
                  {/* Date */}
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-embassy-blue-600 flex-shrink-0" />
                    <span className="text-default-700">
                      {formatDateRange(evenement.dateDebut, evenement.dateFin)}
                    </span>
                    {isEventUpcoming(evenement.dateDebut) && (
                      <Badge variant="outline" className="text-xs ml-auto">
                        {t("labels.upcoming")}
                      </Badge>
                    )}
                  </div>

                  {/* Lieu */}
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-embassy-blue-600 flex-shrink-0" />
                    <span className="text-default-700 truncate">
                      {evenement.lieu}
                    </span>
                  </div>

                  {/* Capacité et participants */}
                  {(evenement.capaciteMax || evenement.participantsInscrits) && (
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="w-4 h-4 text-embassy-blue-600 flex-shrink-0" />
                      <span className="text-default-700">
                        {evenement.participantsInscrits || 0}
                        {evenement.capaciteMax && ` / ${evenement.capaciteMax}`} {t("labels.participants")}
                      </span>
                    </div>
                  )}

                  {/* Lien d'inscription */}
                  {evenement.lienInscription && (
                    <div className="flex items-center gap-2 text-sm">
                      <ExternalLink className="w-4 h-4 text-embassy-blue-600 flex-shrink-0" />
                      <span className="text-embassy-blue-600 hover:underline cursor-pointer">
                        {t("labels.registration_link")}
                      </span>
                    </div>
                  )}
                </div>

                {/* Tags */}
                {evenement.tags && evenement.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {evenement.tags.slice(0, 3).map((tag, index) => (
                      <Badge 
                        key={index} 
                        variant="outline" 
                        className="text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                    {evenement.tags.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{evenement.tags.length - 3}
                      </Badge>
                    )}
                  </div>
                )}
              </CardContent>

              <CardFooter className="pt-3 border-t border-default-200/50">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Avatar className="w-7 h-7">
                            <AvatarImage 
                              src={evenement.organisateur?.avatar} 
                              alt={evenement.organisateur?.nom || evenement.user}
                            />
                            <AvatarFallback className="text-xs bg-embassy-blue-100 text-embassy-blue-600">
                              {getInitials(evenement.organisateur?.nom || evenement.user)}
                            </AvatarFallback>
                          </Avatar>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{t("labels.organized_by")} {evenement.organisateur?.nom || evenement.user}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(evenement.datePublication || evenement.dateDebut)}
                    </span>
                  </div>
                  
                  <Badge 
                    variant="secondary" 
                    className={cn("text-xs", getStatusColor(evenement.status))}
                  >
                    {t(`status.${evenement.status}`) || evenement.status}
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