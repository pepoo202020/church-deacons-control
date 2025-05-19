import { LoginFooter } from "./LoginFooter";
import LoginFormFields from "./LoginFormFields";
import { LoginHeader } from "./LoginHeader";
import { Card } from "@/components/ui/card";

export default function LoginForm() {
  return (
    <Card className="w-full max-w-md shadow-lg">
      <LoginHeader />
      <LoginFormFields />
      <LoginFooter />
    </Card>
  );
}
