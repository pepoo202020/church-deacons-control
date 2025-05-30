"use client";
import { LoginFormValues, loginSchema } from "@/schemas/login";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import ForgotPasswordModal from "./ForgotPasswordModal";
import { toast } from "sonner";
import { signIn } from "next-auth/react";

export default function LoginFormFields({
  isLoading,
  setIsLoading,
}: {
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
}) {
  const { language } = useLanguage();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] =
    useState<boolean>(false);
  // Initialize react-hook-form with zod resolver
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema(language)),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  async function onSubmit(values: LoginFormValues) {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const res = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });
      if (res && !res.error) {
        toast.success(
          language === "AR"
            ? "تم تسجيل الدخول بنجاح"
            : "Logged in successfully",
          {
            description: language === "AR" ? "مرحبًا بك" : "Welcome back",
          }
        );
        router.push("/dashboard");
      } else {
        toast.error(language === "AR" ? "حدث خطأ ما" : "Something went wrong", {
          description:
            language === "AR"
              ? "يرجى المحاولة مرة أخرى"
              : "Please try again later",
        });
      }
    } catch (error) {
      toast(language === "AR" ? "حدث خطأ ما" : "Something went wrong", {
        description:
          language === "AR"
            ? "يرجى المحاولة مرة أخرى"
            : "Please try again later",
      });
    } finally {
      setIsLoading(false);
      form.reset();
    }
  }
  return (
    <CardContent className="space-y-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
          id="login-form"
        >
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
                    placeholder={
                      language === "AR"
                        ? "name@example.com"
                        : "name@example.com"
                    }
                    {...field}
                    disabled={isLoading}
                    dir={language === "AR" ? "rtl" : "ltr"}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {language === "AR" ? "كلمة المرور" : "Password"}
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder={language === "AR" ? "••••••••" : "••••••••"}
                      {...field}
                      disabled={isLoading}
                      dir={language === "AR" ? "rtl" : "ltr"}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute end-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      disabled={isLoading}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <Button
              variant="link"
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer"
              type="button"
              onClick={() => setIsForgotPasswordOpen(true)}
            >
              {language === "AR" ? "نسيت كلمة المرور؟" : "Forgot password?"}
            </Button>
          </div>
        </form>
      </Form>
      <ForgotPasswordModal
        isOpen={isForgotPasswordOpen}
        onClose={() => setIsForgotPasswordOpen(false)}
      />
    </CardContent>
  );
}
