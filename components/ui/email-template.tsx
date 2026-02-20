import * as React from "react";

interface EmailTemplateProps {
  firstName: string;
}

export function EmailTemplate({ firstName }: EmailTemplateProps) {
  return (
    <div
      style={{
        backgroundColor: "#f6f6f6",
        padding: "32px 16px",
        fontFamily: "Helvetica, Arial, sans-serif",
        color: "#111827",
      }}
    >
      <div
        style={{
          maxWidth: "560px",
          margin: "0 auto",
          backgroundColor: "#ffffff",
          border: "1px solid #e5e7eb",
          borderRadius: "8px",
          padding: "28px",
        }}
      >
        <h2 style={{ margin: "0 0 12px", fontSize: "22px" }}>
          Thanks for contacting us, {firstName}!
        </h2>
        <p style={{ margin: "0 0 12px", lineHeight: "1.6" }}>
          I have received your message and will get back to you shortly.
        </p>
        <p style={{ margin: "0 0 20px", lineHeight: "1.6" }}>
          If you have any additional details to share, feel free to reply to
          this email.
        </p>
        <p style={{ margin: "0", fontWeight: 600 }}>
          — Manjula Vijh Photography
        </p>
      </div>
    </div>
  );
}
