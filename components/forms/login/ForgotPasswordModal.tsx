"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { CustomDialog } from "@/components/shared/CustomDialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/useIsMobile";
import { forgetPassword } from "@/lib/actions/login/forgetPassword.action";
import {
  ForgotPasswordFormValues,
  forgotPasswordSchema,
} from "@/schemas/forgotPasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export default function ForgotPasswordModal({
  isOpen,
  onClose,
}: ForgotPasswordModalProps) {
  const { language } = useLanguage();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isMobile = useIsMobile();

  // Initialize form with zod resolver
  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema(language)),
    defaultValues: {
      email: "",
    },
  });
  // Handle form submission
  const onSubmit = async (values: ForgotPasswordFormValues) => {
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate API call

      const result = await forgetPassword(values.email, language);
      if (result.success) {
        toast.success(
          language === "AR"
            ? "تم إرسال البريد الإلكتروني بنجاح"
            : "Email sent successfully",
          {
            description:
              language === "AR"
                ? "يرجى فحص بريدك الإلكتروني"
                : "Please check your email",
          }
        );
        onClose();
        form.reset();
      } else {
        toast.error(language === "AR" ? "حدث خطأ" : "Error", {
          description: result.error,
        });
      }
    } catch (error) {
      toast.error(language === "AR" ? "شيء ما خطأ" : "Something went wrong", {
        description:
          language === "AR"
            ? "حدث خطأ أثناء إرسال البريد الإلكتروني"
            : "An error occurred while sending the email",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formContent = (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {language === "AR" ? "البريد الإلكتروني" : "Email"}
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="name@example.com"
                  {...field}
                  disabled={isLoading}
                  dir={language === "AR" ? "rtl" : "ltr"}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <DialogFooter className={language === "AR" ? "flex-row-reverse" : ""}>
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
          >
            {language === "AR" ? "إلغاء" : "Cancel"}
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {language === "AR" ? "جاري الإرسال..." : "Sending..."}
              </>
            ) : language === "AR" ? (
              "إرسال للمسؤول"
            ) : (
              "Send to Admin"
            )}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );

  const handleClose = () => {
    form.clearErrors();
    form.reset();
    setIsLoading(false);
    onClose();
  };

  return (
    <>
      <CustomDialog
        arabicDescription="أدخل بريدك الإلكتروني وسنرسل لك رابطًا لإعادة تعيين كلمة المرور"
        arabicTitle="نسيت كلمة المرور"
        detailsContent={formContent}
        englishDescription="Enter your email and we'll send you a link to reset your password"
        englishTitle="Forgot Password"
        handleClose={handleClose}
        isOpen={isOpen}
        language={language}
      />
    </>
  );
}
