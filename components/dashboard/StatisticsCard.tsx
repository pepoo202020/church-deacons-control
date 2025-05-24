import {
  Book,
  Calendar,
  Eye,
  Layers,
  Layout,
  PenTool,
  Shield,
  User,
  Users,
} from "lucide-react";
import { useLanguage } from "../providers/LanguageProvider";
import { Card, CardContent } from "../ui/card";
import Link from "next/link";

interface StatisticsCardProps {
  title: string;
  count: number;
  icon: string;
}
export function StatisticsCard({ title, count, icon }: StatisticsCardProps) {
  const { isRTL } = useLanguage();

  // Map string icon names to Lucide icons and icon colors
  const IconComponent = () => {
    switch (icon) {
      case "users":
        return <Users className="h-8 w-8 text-blue-500" />;
      case "book":
        return <Book className="h-8 w-8 text-purple-500" />;
      case "calendar":
        return <Calendar className="h-8 w-8 text-amber-500" />;
      case "layout-grid":
        return <Layout className="h-8 w-8 text-emerald-500" />;
      case "layers":
        return <Layers className="h-8 w-8 text-indigo-600" />;
      case "shield":
        return <Shield className="h-8 w-8 text-red-500" />;
      case "user":
        return <User className="h-8 w-8 text-cyan-500" />;
      case "eye":
        return <Eye className="h-8 w-8 text-pink-500" />;
      case "pen-tool":
        return <PenTool className="h-8 w-8 text-orange-500" />;
      default:
        return <Users className="h-8 w-8 text-blue-500" />;
    }
  };

  // Define color classes based on icon type
  const getGradientClass = () => {
    switch (icon) {
      case "users":
        return "from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/20 hover:shadow-blue-100 dark:hover:shadow-blue-900/30";
      case "book":
        return "from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-900/20 hover:shadow-purple-100 dark:hover:shadow-purple-900/30";
      case "calendar":
        return "from-amber-50 to-amber-100 dark:from-amber-950/30 dark:to-amber-900/20 hover:shadow-amber-100 dark:hover:shadow-amber-900/30";
      case "layout-grid":
        return "from-emerald-50 to-emerald-100 dark:from-emerald-950/30 dark:to-emerald-900/20 hover:shadow-emerald-100 dark:hover:shadow-emerald-900/30";
      case "layers":
        return "from-indigo-50 to-indigo-100 dark:from-indigo-950/30 dark:to-indigo-900/20 hover:shadow-indigo-100 dark:hover:shadow-indigo-900/30";
      case "shield":
        return "from-red-50 to-red-100 dark:from-red-950/30 dark:to-red-900/20 hover:shadow-red-100 dark:hover:shadow-red-900/30";
      case "user":
        return "from-cyan-50 to-cyan-100 dark:from-cyan-950/30 dark:to-cyan-900/20 hover:shadow-cyan-100 dark:hover:shadow-cyan-900/30";
      case "eye":
        return "from-pink-50 to-pink-100 dark:from-pink-950/30 dark:to-pink-900/20 hover:shadow-pink-100 dark:hover:shadow-pink-900/30";
      case "pen-tool":
        return "from-orange-50 to-orange-100 dark:from-orange-950/30 dark:to-orange-900/20 hover:shadow-orange-100 dark:hover:shadow-orange-900/30";
      default:
        return "from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/20 hover:shadow-blue-100 dark:hover:shadow-blue-900/30";
    }
  };

  // Define text color classes based on icon type
  const getTextColorClass = () => {
    switch (icon) {
      case "users":
        return "text-blue-600 dark:text-blue-400";
      case "book":
        return "text-purple-600 dark:text-purple-400";
      case "calendar":
        return "text-amber-600 dark:text-amber-400";
      case "layout-grid":
        return "text-emerald-600 dark:text-emerald-400";
      case "layers":
        return "text-indigo-600 dark:text-indigo-400";
      case "shield":
        return "text-red-600 dark:text-red-400";
      case "user":
        return "text-cyan-600 dark:text-cyan-400";
      case "eye":
        return "text-pink-600 dark:text-pink-400";
      case "pen-tool":
        return "text-orange-600 dark:text-orange-400";
      default:
        return "text-blue-600 dark:text-blue-400";
    }
  };

  // Define icon background color classes based on icon type
  const getIconBgClass = () => {
    switch (icon) {
      case "users":
        return "bg-blue-100 dark:bg-blue-900/30";
      case "book":
        return "bg-purple-100 dark:bg-purple-900/30";
      case "calendar":
        return "bg-amber-100 dark:bg-amber-900/30";
      case "layout-grid":
        return "bg-emerald-100 dark:bg-emerald-900/30";
      case "layers":
        return "bg-indigo-100 dark:bg-indigo-900/30";
      case "shield":
        return "bg-red-100 dark:bg-red-900/30";
      case "user":
        return "bg-cyan-100 dark:bg-cyan-900/30";
      case "eye":
        return "bg-pink-100 dark:bg-pink-900/30";
      case "pen-tool":
        return "bg-orange-100 dark:bg-orange-900/30";
      default:
        return "bg-blue-100 dark:bg-blue-900/30";
    }
  };

  return (
    <Card
      className={`overflow-hidden transition-all duration-300 hover:scale-[1.025] hover:shadow-xl border-0 bg-gradient-to-br ${getGradientClass()} rounded-2xl`}
    >
      <CardContent className="p-4 sm:p-6">
        <div
          className={`flex flex-col sm:flex-row items-center sm:items-start ${
            isRTL ? "sm:flex-row-reverse" : ""
          } justify-between gap-3 sm:gap-6`}
        >
          <div className="flex-1 flex flex-col items-center sm:items-start text-center sm:text-left">
            <h3 className="text-base sm:text-lg font-semibold text-foreground mb-1">
              {title}
            </h3>
            <p
              className={`text-2xl sm:text-3xl font-extrabold ${getTextColorClass()} drop-shadow`}
            >
              {count}
            </p>
          </div>
          <div
            className={`flex-shrink-0 p-3 sm:p-4 rounded-full shadow-md ${getIconBgClass()} transition-transform duration-300 hover:rotate-6`}
          >
            <IconComponent />
          </div>
        </div>
        {/* Show Details Link */}
        <div className=" flex justify-end">
          <Link
            href="#"
            className="inline-flex items-center gap-1 text-sm font-medium text-blue-700 dark:text-blue-300 hover:underline hover:text-blue-900 dark:hover:text-blue-100 transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
            Show Details
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
