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
}) => {
  const isMobile = useIsMobile();

  return (
    <>
      {isMobile ? (
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
