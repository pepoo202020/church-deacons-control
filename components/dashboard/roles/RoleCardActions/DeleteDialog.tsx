import { CustomDialog } from "@/components/shared/CustomDialog";
import { IRoleWithUserRoles, LanguageType } from "@/types/types";
import { translateRole } from "@/utils/translateRoles";

export const DeleteDialog = ({
  isOpen,
  language,
  onClose,
  role,
}: {
  isOpen: boolean;
  language: LanguageType;
  onClose: () => void;
  role: IRoleWithUserRoles;
}) => {
  const content = <>content</>;

  return (
    <>
      <CustomDialog
        arabicDescription={`هل أنت متأكد من أنك تريد حذف دور "${translateRole(
          role.name
        )}"؟ سيتم إلغاء تعيين ${translateRole(
          role.name
        )} مستخدم من هذا الدور. هذا الإجراء لا يمكن التراجع عنه.`}
        arabicTitle="حذف الدور"
        detailsContent={content}
        englishDescription={`Are you sure you want to delete the "${role.name}" role? This will unassign ${role.users} users from this role. This action cannot be undone.`}
        englishTitle="Delete Role"
        handleClose={onClose}
        isOpen={isOpen}
        language={language}
        mode="alert"
      />
    </>
  );
};
