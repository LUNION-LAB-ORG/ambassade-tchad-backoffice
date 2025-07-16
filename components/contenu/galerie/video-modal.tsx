'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import VideoPlayer from "@/components/ui/video-player";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Calendar, MapPin, User, Tag, Eye, Share2 } from "lucide-react";

interface VideoModalProps {
  video: any;
  isOpen: boolean;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  video,
  isOpen,
  onClose,
}) => {
  if (!video) return null;

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <DialogTitle className="text-2xl font-bold text-default-900 leading-tight">
                {video.titre}
              </DialogTitle>
              <div className="flex items-center gap-2 mt-2">
                {video.categorie && (
                  <Badge className={cn("text-sm", getCategoryColor(video.categorie))}>
                    {video.categorie}
                  </Badge>
                )}
                {video.duree && (
                  <Badge variant="outline" className="text-sm">
                    {video.duree}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Lecteur vidéo */}
          <div className="w-full">
            <VideoPlayer
              src={video.videoUrl}
              className="w-full rounded-lg"
              controls={true}
              autoPlay={false}
            />
          </div>

          {/* Description et détails */}
          <div className="space-y-4">
            {video.description && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {video.description}
                </p>
              </div>
            )}

            {/* Métadonnées */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="font-medium text-default-900">Informations</h4>
                
                {/* Date de publication */}
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-embassy-blue-600 flex-shrink-0" />
                  <span className="text-default-700">
                    Publié le {formatDate(video.datePublication)}
                  </span>
                </div>

                {/* Auteur */}
                {video.auteur && (
                  <div className="flex items-center gap-2 text-sm">
                    <User className="w-4 h-4 text-embassy-blue-600 flex-shrink-0" />
                    <span className="text-default-700">
                      {video.auteur}
                    </span>
                  </div>
                )}

                {/* Lieu */}
                {video.lieu && (
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-embassy-blue-600 flex-shrink-0" />
                    <span className="text-default-700">
                      {video.lieu}
                    </span>
                  </div>
                )}

                {/* Événement associé */}
                {video.evenementAssocie && (
                  <div className="flex items-center gap-2 text-sm">
                    <Tag className="w-4 h-4 text-embassy-blue-600 flex-shrink-0" />
                    <span className="text-default-700">
                      {video.evenementAssocie}
                    </span>
                  </div>
                )}
              </div>

              {/* Statistiques */}
              <div className="space-y-3">
                <h4 className="font-medium text-default-900">Statistiques</h4>
                
                <div className="space-y-2">
                  {video.vuesCount && (
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <Eye className="w-4 h-4 text-embassy-blue-600" />
                        <span>Vues</span>
                      </div>
                      <span className="font-medium">{video.vuesCount}</span>
                    </div>
                  )}

                  {video.shareCount && (
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <Share2 className="w-4 h-4 text-embassy-blue-600" />
                        <span>Partages</span>
                      </div>
                      <span className="font-medium">{video.shareCount}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Tags */}
            {video.tags && video.tags.length > 0 && (
              <div>
                <h4 className="font-medium text-default-900 mb-2">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {video.tags.map((tag: string, index: number) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VideoModal;
