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
    <div>
      <h2>New Contact Form Submission</h2>

      <p>
        <strong>Name:</strong> {firstName} {lastName}
      </p>
      <p>
        <strong>Email:</strong> {email}
      </p>

      <h3>Message:</h3>
      <p>{message}</p>
    </div>
  );
}
