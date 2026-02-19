import * as React from "react";

interface EmailTemplateProps {
  firstName: string;
}

export function EmailTemplate({ firstName }: EmailTemplateProps) {
  return (
    <div>
      <h2>Thank you for contacting us, {firstName}!</h2>

      <p>
        We have received your message and will get back to you shortly.
      </p>

      <p>
        — Manjula Vijh Photography
      </p>
    </div>
  );
}
