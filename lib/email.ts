// lib/email.ts
import fs from "fs";
import path from "path";

export function loadEmailTemplate(
  templateName: string,
  variables: Record<string, string>
): string {
  const templatePath = path.join(
    process.cwd(),
    "templates",
    `${templateName}.html`
  );
  let template = fs.readFileSync(templatePath, "utf-8");

  // Replace placeholders like {{name}} with actual values
  for (const [key, value] of Object.entries(variables)) {
    template = template.replace(new RegExp(`{{${key}}}`, "g"), value);
  }

  return template;
}
