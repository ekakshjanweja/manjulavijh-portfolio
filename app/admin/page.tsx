import Link from "next/link";

import AdminTable from "@/app/admin/admin-table";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });

  const serializedMessages = messages.map((message) => ({
    id: message.id,
    name: `${message.firstName} ${message.lastName}`.trim(),
    email: message.email,
    message: message.message,
    createdAt: message.createdAt.toISOString(),
  }));

  return (
    <section className="space-y-6">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Admin Dashboard</p>
          <h1 className="text-2xl font-semibold text-slate-900">Contact Messages</h1>
          <p className="text-sm text-slate-500">Review recent contact submissions.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/admin/photos"
            className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
          >
            Manage galleries
          </Link>
          <Link
            href="/admin/clients"
            className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
          >
            Manage clients
          </Link>
          <form action="/api/admin/logout" method="post">
            <button
              type="submit"
              className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
            >
              Sign out
            </button>
          </form>
        </div>
      </header>

      <AdminTable messages={serializedMessages} />
    </section>
  );
}
