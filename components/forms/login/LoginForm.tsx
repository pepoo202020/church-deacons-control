"use client";
import { useState } from "react";
import { LoginFooter } from "./LoginFooter";
import LoginFormFields from "./LoginFormFields";
import { LoginHeader } from "./LoginHeader";
import { Card } from "@/components/ui/card";

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  return (
    <Card className="w-full max-w-md shadow-lg">
      <LoginHeader />
      <LoginFormFields isLoading={isLoading} setIsLoading={setIsLoading} />
      <LoginFooter isLoading={isLoading} />
    </Card>
  );
}
