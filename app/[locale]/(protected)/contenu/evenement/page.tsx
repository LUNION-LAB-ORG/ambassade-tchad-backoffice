import { StatusBlock } from "@/components/blocks/status-block";
import EvenementCardsContainer from "@/components/contenu/evenement-cards-container";
import { Calendar, CalendarCheck, CalendarX, Users } from "lucide-react";
import { useTranslations } from "next-intl";

export default function EvenementListPage() {
  const t = useTranslations("contenu.gestionEvenement");
  return (
    <div className="space-y-8">
      {/* En-tête avec titre et description */}
      <div className="bg-gradient-to-r from-embassy-blue-600 to-embassy-blue-700 dark:from-embassy-blue-800 dark:to-embassy-blue-900 rounded-xl p-8 text-white shadow-lg dark:shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white/20 dark:bg-white/10 rounded-lg backdrop-blur-sm">
            <Calendar className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">{t("title")}</h1>
            <p className="text-embassy-blue-100 dark:text-embassy-blue-200 mt-2">
              Gérez et organisez vos événements avec une interface moderne et intuitive
            </p>
          </div>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatusBlock
          title={t("total_brouillon")}
          total="12"
          iconWrapperClass="bg-orange-100 dark:bg-orange-900/30"
          chartColor="#FB923C"
          icon={<CalendarX className="w-5 h-5 text-orange-600" />}
        />
        <StatusBlock
          title={t("total_publie")}
          total="28"
          iconWrapperClass="bg-emerald-100 dark:bg-emerald-900/30"
          chartColor="#10B981"
          icon={<CalendarCheck className="w-5 h-5 text-emerald-600" />}
        />
        <StatusBlock
          title={t("total_evenement")}
          total="45"
          icon={<Calendar className="w-5 h-5 text-embassy-blue-600" />}
          iconWrapperClass="bg-embassy-blue-100 dark:bg-embassy-blue-900/30"
          chartColor="#2563EB"
        />
        <StatusBlock
          title="Participants Total"
          total="1,247"
          icon={<Users className="w-5 h-5 text-embassy-yellow-600" />}
          iconWrapperClass="bg-embassy-yellow-100 dark:bg-embassy-yellow-900/30"
          chartColor="#FBBF24"
        />
      </div>

      {/* Composant principal des événements */}
      <div className="bg-white dark:bg-default-100 rounded-xl shadow-sm border border-default-200/50 p-6">
        <EvenementCardsContainer />
      </div>
    </div>
  );
}
