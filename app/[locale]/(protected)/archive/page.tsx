import { StatusBlock } from "@/components/blocks/status-block";
import UserList from "@/components/users/user-list";
import { Box, ShoppingCart, TrendingUp } from "lucide-react";
import { useTranslations } from "next-intl";

export default function UserLispage() {
  const t = useTranslations("AnalyticsDashboard");
  return (
    <div className="container">
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 ">
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
                      title={t("revenue_chart_title")}
                      total="3,564"
                      iconWrapperClass="bg-info/10"
                      chartColor="#00EBFF"
                      icon={<ShoppingCart className="w-5 h-5  text-info" />}
                    />
                    <StatusBlock
                      title={t("revenue_chart_title")}
                      total="3,564"
                      iconWrapperClass="bg-info/10"
                      chartColor="#00EBFF"
                      icon={<ShoppingCart className="w-5 h-5  text-info" />}
                    />
                    <StatusBlock
                      title={t("sold_chart_title")}
                      total="564"
                      icon={<Box className="w-5 h-5 text-warning" />}
                      iconWrapperClass="bg-warning/10"
                      chartColor="#FB8F65"
                    />
                    <StatusBlock
                      title={t("growth_chart_title")}
                      total="+5.0%"
                      icon={<TrendingUp className="w-5 h-5 text-primary" />}
                      iconWrapperClass="bg-primary/10"
                      chartColor="#2563eb"
                    />
        </div>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12">
          <h1 className="text-2xl font-bold">User List</h1>
        </div>
        <div className="col-span-12">
          <UserList />
        </div>
      </div>
    </div>
  );
}