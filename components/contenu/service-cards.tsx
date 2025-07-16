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
  Settings,
  Mail,
  Phone,
  MapPin,
  Calendar,
  User,
  Star,
  Users,
  FileText,
  DollarSign,
  HelpCircle,
  ExternalLink,
  Building2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { IService } from "@/types/service.types";

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

interface ServiceCardsProps {
  data: IService[];
  onView: (service: IService) => void;
  onEdit: (service: IService) => void;
  onDelete: (service: IService) => void;
  onCreate: () => void;
  isLoading?: boolean;
}

export const ServiceCards: React.FC<ServiceCardsProps> = ({
  data,
  onView,
  onEdit,
  onDelete,
  onCreate,
  isLoading = false
}) => {
  const t = useTranslations("contenu.gestionService");
  const [searchTerm, setSearchTerm] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<string>("all");
  const [categoryFilter, setCategoryFilter] = React.useState<string>("all");
  const [priorityFilter, setPriorityFilter] = React.useState<string>("all");

  // Filtrer les données
  const filteredData = React.useMemo(() => {
    return data.filter((service) => {
      const matchesSearch = 
        service.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.descriptionComplete.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (service.responsable && service.responsable.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (service.tags && service.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
      
      const matchesStatus = statusFilter === "all" || service.status === statusFilter;
      const matchesCategory = categoryFilter === "all" || service.categorie === categoryFilter;
      const matchesPriority = priorityFilter === "all" || service.priorite === priorityFilter;
      
      return matchesSearch && matchesStatus && matchesCategory && matchesPriority;
    });
  }, [data, searchTerm, statusFilter, categoryFilter, priorityFilter]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "actif":
        return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400";
      case "inactif":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
      case "maintenance":
        return "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400";
      case "bientot_disponible":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
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
      case "consulaire":
        return <FileText className="w-4 h-4 text-embassy-blue-600" />;
      case "administratif":
        return <Settings className="w-4 h-4 text-embassy-blue-600" />;
      case "juridique":
        return <Building2 className="w-4 h-4 text-embassy-blue-600" />;
      case "culture":
        return <Star className="w-4 h-4 text-embassy-blue-600" />;
      case "commerce":
        return <DollarSign className="w-4 h-4 text-embassy-blue-600" />;
      default:
        return <Settings className="w-4 h-4 text-embassy-blue-600" />;
    }
  };

  const getCategoryColor = (category?: string) => {
    switch (category) {
      case "consulaire":
        return "bg-embassy-blue-100 text-embassy-blue-700 dark:bg-embassy-blue-900/30 dark:text-embassy-blue-400";
      case "administratif":
        return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400";
      case "juridique":
        return "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400";
      case "culture":
        return "bg-embassy-yellow-100 text-embassy-yellow-700 dark:bg-embassy-yellow-900/30 dark:text-embassy-yellow-400";
      case "commerce":
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

  const isServiceRecent = (dateCreation: string) => {
    const creationDate = new Date(dateCreation);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - creationDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30; // Récent si créé dans les 30 derniers jours
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
              <SelectItem value="actif">{t("status.actif")}</SelectItem>
              <SelectItem value="inactif">{t("status.inactif")}</SelectItem>
              <SelectItem value="maintenance">{t("status.maintenance")}</SelectItem>
              <SelectItem value="bientot_disponible">{t("status.bientot_disponible")}</SelectItem>
            </SelectContent>
          </Select>

          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Catégorie" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("filters.all_categories")}</SelectItem>
              <SelectItem value="consulaire">{t("category.consulaire")}</SelectItem>
              <SelectItem value="administratif">{t("category.administratif")}</SelectItem>
              <SelectItem value="juridique">{t("category.juridique")}</SelectItem>
              <SelectItem value="culture">{t("category.culture")}</SelectItem>
              <SelectItem value="commerce">{t("category.commerce")}</SelectItem>
              <SelectItem value="autre">{t("category.autre")}</SelectItem>
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
          {t("create_service")}
        </Button>
      </div>

      {/* Compteur de résultats */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>
          {filteredData.length} {filteredData.length === 1 ? t("labels.services_found_singular") : t("labels.services_found_plural")}
        </span>
      </div>

      {/* Grille des services */}
      {filteredData.length === 0 ? (
        <Card className="p-12 text-center">
          <div className="flex flex-col items-center gap-4">
            <Settings className="w-16 h-16 text-muted-foreground/50" />
            <div>
              <h3 className="text-lg font-medium text-muted-foreground">
                {t("no_results")}
              </h3>
              <p className="text-sm text-muted-foreground/70 mt-1">
                Essayez de modifier vos filtres ou ajoutez un nouveau service
              </p>
            </div>
            <Button 
              onClick={onCreate}
              variant="outline"
              className="mt-2 bg-embassy-blue-600 text-white border-0 hover:bg-embassy-blue-700 cursor-pointer"
            >
              <Plus className="w-4 h-4 mr-2" />
              {t("create_service")}
            </Button>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredData.map((service) => (
            <Card 
              key={service.id} 
              className={cn(
                "group hover:shadow-xl transition-all duration-300 cursor-pointer border backdrop-blur-sm",
                "bg-white/80 dark:bg-default-100/80",
                service.featured && "ring-2 ring-embassy-yellow-500"
              )}
              onClick={() => onView(service)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg text-default-900 leading-tight truncate">
                      {service.nom}
                    </h3>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center gap-1">
                        {getCategoryIcon(service.categorie)}
                        <Badge 
                          variant="secondary" 
                          className={cn("text-xs", getCategoryColor(service.categorie))}
                        >
                          {service.categorie}
                        </Badge>
                      </div>
                      {getPriorityIcon(service.priorite)}
                      {service.featured && <Star className="w-4 h-4 text-embassy-yellow-500 fill-current" />}
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
                          onView(service);
                        }}
                        className="flex items-center gap-2 hover:bg-embassy-yellow-50 dark:hover:bg-embassy-yellow-900/20"
                      >
                        <Eye className="w-4 h-4 text-embassy-yellow-600" />
                        Voir le service
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={(e) => {
                          e.stopPropagation();
                          onEdit(service);
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
                          onDelete(service);
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

              <CardContent className="space-y-4">
                {/* Image du service si disponible */}
                {service.image && (
                  <div className="relative h-48 w-full rounded-lg overflow-hidden bg-muted">
                    <Image
                      src={service.image}
                      alt={service.nom}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {isServiceRecent(service.dateCreation) && (
                      <div className="absolute top-2 left-2">
                        <Badge className="bg-embassy-red-500 text-white">
                          Nouveau
                        </Badge>
                      </div>
                    )}
                  </div>
                )}

                {/* Description */}
                <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                  {service.description}
                </p>

                {/* Détails du service */}
                <div className="space-y-2">
                  {/* Responsable */}
                  <div className="flex items-center gap-2 text-sm">
                    <User className="w-4 h-4 text-embassy-blue-600 flex-shrink-0" />
                    <span className="text-default-700">
                      {service.responsable}
                    </span>
                  </div>

                  {/* Contact */}
                  {service.contact && (
                    <div className="flex items-center gap-2 text-sm">
                      {service.contact.email && (
                        <>
                          <Mail className="w-4 h-4 text-embassy-blue-600 flex-shrink-0" />
                          <span className="text-default-700 truncate">
                            {service.contact.email}
                          </span>
                        </>
                      )}
                    </div>
                  )}

                  {/* Coût estimé */}
                  {service.coutEstime && (
                    <div className="flex items-center gap-2 text-sm">
                      <DollarSign className="w-4 h-4 text-embassy-blue-600 flex-shrink-0" />
                      <span className="text-default-700">
                        {service.coutEstime}
                      </span>
                    </div>
                  )}

                  {/* Délai estimé */}
                  {service.delaiEstime && (
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-embassy-blue-600 flex-shrink-0" />
                      <span className="text-default-700">
                        {service.delaiEstime}
                      </span>
                    </div>
                  )}

                  {/* Note de satisfaction */}
                  {service.satisfactionNote && (
                    <div className="flex items-center gap-2 text-sm">
                      <Star className="w-4 h-4 text-embassy-yellow-500 flex-shrink-0" />
                      <span className="text-default-700">
                        {service.satisfactionNote}/5 ({service.utilisationsCount || 0} avis)
                      </span>
                    </div>
                  )}
                </div>

                {/* Tags */}
                {service.tags && service.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {service.tags.slice(0, 3).map((tag, index) => (
                      <Badge 
                        key={index} 
                        variant="outline" 
                        className="text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                    {service.tags.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{service.tags.length - 3}
                      </Badge>
                    )}
                  </div>
                )}

                {/* Statistiques d&apos;utilisation */}
                {service.utilisationsCount && service.utilisationsCount > 0 && (
                  <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2 border-t border-default-200/50">
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      <span>{service.utilisationsCount} utilisations</span>
                    </div>
                    {service.faq && service.faq.length > 0 && (
                      <div className="flex items-center gap-1">
                        <HelpCircle className="w-3 h-3" />
                        <span>{service.faq.length} FAQ</span>
                      </div>
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
                            <AvatarFallback className="text-xs bg-embassy-blue-100 text-embassy-blue-600">
                              {getInitials(service.responsable)}
                            </AvatarFallback>
                          </Avatar>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Géré par {service.responsable}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <span className="text-xs text-muted-foreground">
                      Créé le {formatDate(service.dateCreation)}
                    </span>
                  </div>
                  
                  <Badge 
                    variant="secondary" 
                    className={cn("text-xs", getStatusColor(service.status))}
                  >
                    {service.status === "actif" && "Actif"}
                    {service.status === "inactif" && "Inactif"}
                    {service.status === "maintenance" && "Maintenance"}
                    {service.status === "bientot_disponible" && "Bientôt"}
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
