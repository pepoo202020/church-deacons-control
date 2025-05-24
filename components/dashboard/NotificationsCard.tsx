"use client";
import { useState } from "react";
import { useLanguage } from "../providers/LanguageProvider";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Bell, Check } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

export function NotificationsCard() {
  const { language, isRTL } = useLanguage();
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: language === "AR" ? "تم إضافة طالب جديد" : "New student added",
      time: "5m",
      read: false,
    },
    {
      id: 2,
      message:
        language === "AR"
          ? "اكتمل جدول الفصل الدراسي"
          : "Class schedule completed",
      time: "2h",
      read: false,
    },
    {
      id: 3,
      message:
        language === "AR" ? "تم تعيين معلم جديد" : "New teacher assigned",
      time: "3h",
      read: false,
    },
    {
      id: 4,
      message:
        language === "AR" ? "تحديث في معلومات المادة" : "Subject info updated",
      time: "5h",
      read: true,
    },
    {
      id: 5,
      message:
        language === "AR" ? "موعد الامتحان القادم" : "Upcoming exam date",
      time: "1d",
      read: true,
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <div
          className={`flex items-center ${
            isRTL ? "flex-row-reverse" : ""
          } justify-between`}
        >
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            {language === "AR" ? "الإشعارات" : "Notifications"}
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-2">
                {unreadCount}
              </Badge>
            )}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-[500px] overflow-auto">
          {notifications.length === 0 ? (
            <p className="text-center text-muted-foreground py-4">
              {language === "AR" ? "لا توجد إشعارات" : "No notifications"}
            </p>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-3 rounded-md flex items-center justify-between ${
                  notification.read
                    ? "bg-background"
                    : "bg-primary/5 dark:bg-primary/10"
                }`}
              >
                <div
                  className={`flex flex-col ${
                    isRTL ? "items-end" : "items-start"
                  }`}
                >
                  <p className="font-medium">{notification.message}</p>
                  <span className="text-xs text-muted-foreground">
                    {language === "AR" ? "منذ" : ""} {notification.time}{" "}
                    {language === "AR" ? "" : "ago"}
                  </span>
                </div>
                {!notification.read && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => markAsRead(notification.id)}
                    className="h-8 w-8 p-0"
                  >
                    <Check className="h-4 w-4" />
                    <span className="sr-only">
                      {language === "AR" ? "تحديد كمقروء" : "Mark as read"}
                    </span>
                  </Button>
                )}
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
