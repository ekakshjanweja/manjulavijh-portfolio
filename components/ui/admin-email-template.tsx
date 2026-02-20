import * as React from "react";

interface AdminEmailProps {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}

export function AdminEmailTemplate({
  firstName,
  lastName,
  email,
  message,
}: AdminEmailProps) {
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
        <h2 style={{ margin: "0 0 16px", fontSize: "22px" }}>
          New Contact Form Submission
        </h2>
        <p style={{ margin: "0 0 8px" }}>
          <strong>Name:</strong> {firstName} {lastName}
        </p>
        <p style={{ margin: "0 0 16px" }}>
          <strong>Email:</strong> {email}
        </p>
        <h3 style={{ margin: "0 0 8px", fontSize: "16px" }}>Message</h3>
        <p style={{ margin: 0, lineHeight: "1.6" }}>{message}</p>
      </div>
    </div>
  );
}
