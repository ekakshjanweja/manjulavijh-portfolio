import { NextResponse } from "next/server";

import {
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_MAX_AGE_SECONDS,
  createAdminSessionValue,
} from "@/lib/admin-auth";
import { checkRateLimit } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const formData = await request.formData();
  const password = formData.get("password");

  const clientIp = request.headers.get("x-forwarded-for")?.split(",")[0] 
    ?? request.headers.get("x-real-ip") 
    ?? "unknown";

  if (!checkRateLimit(clientIp)) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("error", "rate_limited");
    return NextResponse.redirect(loginUrl, 303);
  }

  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("error", "config");
    return NextResponse.redirect(loginUrl, 303);
  }

  if (typeof password !== "string" || password !== adminPassword) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("error", "1");
    return NextResponse.redirect(loginUrl, 303);
  }

  const sessionValue = await createAdminSessionValue();
  const response = NextResponse.redirect(new URL("/admin", request.url), 303);
  response.cookies.set(ADMIN_SESSION_COOKIE, sessionValue, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: ADMIN_SESSION_MAX_AGE_SECONDS,
  });

  return response;
}
