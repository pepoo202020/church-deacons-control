"use client";
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
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { useIsMobile } from "@/hooks/useIsMobile";
import { EditRoleFormValues, editRoleSchema } from "@/schemas/editRoleSchema";
import { IRoleWithUserRoles, LanguageType } from "@/types/types";
import { translateRole } from "@/utils/translateRoles";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const EditRoleDialog = ({
  isOpen,
  onClose,
  language,
  role,
}: {
  isOpen: boolean;
  onClose: () => void;
  language: LanguageType;
  role: IRoleWithUserRoles;
}) => {
  const isMobile = useIsMobile();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form = useForm<EditRoleFormValues>({
    resolver: zodResolver(editRoleSchema(language)),
    defaultValues: {
      description: "",
    },
  });

  const handleSubmit = async (values: EditRoleFormValues) => {
    form.clearErrors();
    form.reset();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate API call
    // Save role changes
    toast(language === "AR" ? "تم تحديث الدور" : "Role Updated", {
      description:
        language === "AR"
          ? `تم تحديث الدور ${translateRole(role.name)} بنجاح`
          : `${role.name} role has been updated successfully`,
    });
    setIsLoading(false);
    onClose();
  };

  const detailsContent = (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={`space-y-6`}>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {language === "AR" ? "الوصف" : "Description"}
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder={
                    language === "AR"
                      ? "وصف مختصر للدور..."
                      : "Brief description of the role..."
                  }
                  className="bg-white dark:bg-gray-800"
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );

  const handleClose = () => {
    form.clearErrors();
    form.reset();
    onClose();
  };

  const actionButtons = (
    <div className={`flex  gap-2 justify-end`}>
      <Button type="button" variant="outline" onClick={handleClose}>
        {language === "AR" ? "إلغاء" : "Cancel"}
      </Button>
      <Button
        type="submit"
        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
        onClick={form.handleSubmit(handleSubmit)}
      >
        <Save className="h-4 w-4 mr-2" />
        {language === "AR" ? "حفظ التغييرات" : "Save Changes"}
      </Button>
    </div>
  );
  return (
    <>
      <CustomDialog
        actionButtons={actionButtons}
        arabicDescription={`View details and users for ${role.name} role`}
        arabicTitle={`تفاصيل الدور: ${translateRole(role.name)}`}
        detailsContent={detailsContent}
        englishDescription={`View details and users for ${role.name} role`}
        englishTitle={`Role Details: ${role.name}`}
        handleClose={handleClose}
        isOpen={isOpen}
        language={language}
      />
    </>
  );
};
