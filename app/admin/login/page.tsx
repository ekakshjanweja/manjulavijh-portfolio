type AdminLoginPageProps = {
  searchParams?: Promise<{ error?: string }>;
};

export const metadata = {
  title: "Admin Login",
};

export default async function AdminLoginPage({ searchParams }: AdminLoginPageProps) {
  const resolvedSearchParams = await searchParams;
  const error = resolvedSearchParams?.error;
  const hasError = error === "1";
  const hasConfigError = error === "config";

  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Admin</p>
          <h1 className="text-2xl font-semibold text-slate-900">Sign in</h1>
          <p className="text-sm text-slate-500">Enter the admin password to continue.</p>
        </div>

        <form action="/api/admin/login" method="post" className="mt-6 space-y-4">
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-slate-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
            />
          </div>

          {hasConfigError ? (
            <p className="text-sm text-red-600">
              Admin password is not configured. Set ADMIN_PASSWORD and redeploy.
            </p>
          ) : hasError ? (
            <p className="text-sm text-red-600">Incorrect password. Try again.</p>
          ) : null}

          <button
            type="submit"
            className="w-full rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}
