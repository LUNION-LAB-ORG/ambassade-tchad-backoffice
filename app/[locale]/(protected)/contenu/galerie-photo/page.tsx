import { StatusBlock } from "@/components/blocks/status-block";
import ActualiteList from "@/components/contenu/actualite-list";
import EvenementList from "@/components/contenu/evenement-list";
import PhotoList from "@/components/contenu/galerie/photo-list";
import { Box, ShoppingCart, TrendingUp } from "lucide-react";
import { useTranslations } from "next-intl";

export default function PhotoListPage() {
  const t = useTranslations("contenu.gestionGalerie.photo");
  return (
    <div className="container">
      <div className="grid grid-cols-12 gap-6 mt-6">
        <div className="col-span-12">
          <h1 className="text-2xl font-bold">{t("title")}</h1>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
          {/* <WelcomeBlock>
                      <div className="max-w-[180px] relative z-10">
                        <h4 className="text-xl font-medium text-primary-foreground dark:text-default-900 mb-2">
                          <span className="block font-normal"> {t("widget_title")}</span>
                          <span className="block">Mr. Dianne Russell</span>
                        </h4>
                        
                      </div>
                      <Image
                        src="/images/all-img/widget-bg-2.png"
                        width={400}
                        height={150}
                        priority
                        alt="Description of the image"
                        className="absolute top-0 start-0 w-full h-full object-cover rounded-md"
                      />
                    </WelcomeBlock> */}
          <StatusBlock
            title={t("total_brouillon")}
            total="50"
            iconWrapperClass="bg-info/10"
            chartColor="#00EBFF"
            icon={<ShoppingCart className="w-5 h-5  text-info" />}
          />
          <StatusBlock
            title={t("total_publie")}
            total="150"
            iconWrapperClass="bg-info/10"
            chartColor="#00EBFF"
            icon={<ShoppingCart className="w-5 h-5  text-info" />}
          />
          <StatusBlock
            title={t("total_photo")}
            total="564"
            icon={<Box className="w-5 h-5 text-warning" />}
            iconWrapperClass="bg-warning/10"
            chartColor="#FB8F65"
          />
        
        </div>
        </div>

       
        <div className="col-span-12">
          <PhotoList />
        </div>
      </div>
    </div>
  );
}
