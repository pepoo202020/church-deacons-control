"use client";

import { useIsMobile } from "@/hooks/useIsMobile";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import { LanguageType } from "@/types/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { AlertTriangle } from "lucide-react";

export const CustomDialog = ({
  isOpen,
  handleClose,
  language,
  arabicTitle,
  englishTitle,
  arabicDescription,
  englishDescription,
  detailsContent,
  actionButtons,
  mode = "show",
  handleDelete,
}: {
  isOpen: boolean;
  handleClose: () => void;
  language: LanguageType;
  arabicTitle: string;
  englishTitle: string;
  arabicDescription: string;
  englishDescription: string;
  detailsContent: React.ReactNode;
  actionButtons?: React.ReactNode;
  mode?: "alert" | "show";
  handleDelete?: () => void;
}) => {
  const isMobile = useIsMobile();

  return (
    <>
      {mode === "alert" ? (
        <AlertDialog open={isOpen} onOpenChange={handleClose}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <div className="flex flex-col items-center gap-2 text-center">
                <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-full">
                  <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
                </div>
                <AlertDialogTitle className="text-xl">
                  {language === "AR" ? arabicTitle : englishTitle}
                </AlertDialogTitle>
              </div>
              <AlertDialogDescription className="text-center pt-2">
                {language === "AR" ? arabicDescription : englishDescription}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className={`flex  gap-2`}>
              <AlertDialogCancel>
                {language === "AR" ? "إلغاء" : "Cancel"}
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className="bg-red-600 text-white hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600"
              >
                {language === "AR" ? "نعم، حذف الدور" : "Yes, delete role"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ) : isMobile ? (
        <Sheet open={isOpen} onOpenChange={handleClose}>
          <SheetContent side="bottom" className="min-h-fit p-5">
            <SheetHeader className="text-center">
              <SheetTitle>
                {language === "AR" ? arabicTitle : englishTitle}
              </SheetTitle>
              <SheetDescription>
                {language === "AR" ? arabicDescription : englishDescription}
              </SheetDescription>
            </SheetHeader>
            {detailsContent}
            <SheetFooter className="mt-6">{actionButtons}</SheetFooter>
          </SheetContent>
        </Sheet>
      ) : (
        <Dialog open={isOpen} onOpenChange={handleClose}>
          <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-center">
                {language === "AR" ? arabicTitle : englishTitle}
              </DialogTitle>
              <DialogDescription className="text-center">
                {language === "AR" ? arabicDescription : englishDescription}
              </DialogDescription>
            </DialogHeader>
            {detailsContent}
            <DialogFooter className="mt-6">{actionButtons}</DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};
