"use client";

import { useMemo, useState } from "react";

type ContactMessage = {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
};

type AdminTableProps = {
  messages: ContactMessage[];
};

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
  timeStyle: "short",
});

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "-";
  }
  return dateFormatter.format(date);
}

export default function AdminTable({ messages }: AdminTableProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const activeMessage = useMemo(
    () => messages.find((message) => message.id === activeId) ?? null,
    [activeId, messages],
  );

  if (messages.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-12 text-center">
        <p className="text-sm text-slate-500">No messages yet.</p>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full text-left">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Message</th>
              <th className="px-4 py-3 font-medium">Received</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
            {messages.map((message) => (
              <tr
                key={message.id}
                className="cursor-pointer transition hover:bg-slate-50"
                onClick={() => setActiveId(message.id)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setActiveId(message.id);
                  }
                }}
                role="button"
                tabIndex={0}
              >
                <td className="px-4 py-3 font-medium text-slate-900">{message.name}</td>
                <td className="px-4 py-3 text-slate-600">{message.email}</td>
                <td className="px-4 py-3">
                  <div className="max-w-[360px] truncate text-slate-600">{message.message}</div>
                </td>
                <td className="px-4 py-3 text-slate-500">{formatDate(message.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {activeMessage ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button
            type="button"
            aria-label="Close message"
            className="absolute inset-0 bg-slate-900/40"
            onClick={() => setActiveId(null)}
          />
          <div className="relative w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Message details</p>
                <h2 className="text-xl font-semibold text-slate-900">{activeMessage.name}</h2>
                <p className="text-sm text-slate-500">{activeMessage.email}</p>
              </div>
              <button
                type="button"
                onClick={() => setActiveId(null)}
                className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-800"
              >
                Close
              </button>
            </div>
            <div className="space-y-4 pt-4">
              <div className="text-xs uppercase tracking-wider text-slate-400">Received</div>
              <p className="text-sm text-slate-700">{formatDate(activeMessage.createdAt)}</p>
              <div className="text-xs uppercase tracking-wider text-slate-400">Message</div>
              <p className="whitespace-pre-wrap text-sm text-slate-700">{activeMessage.message}</p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
