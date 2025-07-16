import { StatusBlock } from "@/components/blocks/status-block";
import GaleriePhotoCardsContainer from "@/components/contenu/galerie-photo-cards-container";
import { Camera, Image as ImageIcon, Eye, Users } from "lucide-react";
import { useTranslations } from "next-intl";

export default function PhotoListPage() {
  const t = useTranslations("contenu.gestionGalerie.photo");
  return (
    <div className="space-y-8">
      {/* En-tête avec titre et description */}
      <div className="bg-gradient-to-r from-embassy-blue-600 to-embassy-blue-700 dark:from-embassy-blue-800 dark:to-embassy-blue-900 rounded-xl p-8 text-white shadow-lg dark:shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white/20 dark:bg-white/10 rounded-lg backdrop-blur-sm">
            <Camera className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">{t("title")}</h1>
            <p className="text-embassy-blue-100 dark:text-embassy-blue-200 mt-2">
              Gérez et organisez votre galerie photo avec une interface moderne et intuitive
            </p>
          </div>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatusBlock
          title="Photos en brouillon"
          total="12"
          iconWrapperClass="bg-orange-100 dark:bg-orange-900/30"
          chartColor="#FB923C"
          icon={<ImageIcon className="w-5 h-5 text-orange-600" />}
        />
        <StatusBlock
          title="Photos publiées"
          total="156"
          iconWrapperClass="bg-emerald-100 dark:bg-emerald-900/30"
          chartColor="#10B981"
          icon={<Eye className="w-5 h-5 text-emerald-600" />}
        />
        <StatusBlock
          title="Total photos"
          total="168"
          icon={<Camera className="w-5 h-5 text-embassy-blue-600" />}
          iconWrapperClass="bg-embassy-blue-100 dark:bg-embassy-blue-900/30"
          chartColor="#2563EB"
        />
        <StatusBlock
          title="Vues totales"
          total="12,458"
          icon={<Users className="w-5 h-5 text-embassy-yellow-600" />}
          iconWrapperClass="bg-embassy-yellow-100 dark:bg-embassy-yellow-900/30"
          chartColor="#F59E0B"
        />
      </div>

      {/* Galerie de photos */}
      <GaleriePhotoCardsContainer />
    </div>
  );
}
