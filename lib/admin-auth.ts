const ADMIN_SESSION_COOKIE = "admin_session";
const ADMIN_SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

const encoder = new TextEncoder();

function getAdminPassword() {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) {
    throw new Error("ADMIN_PASSWORD is not set");
  }
  return password;
}

function toBase64Url(bytes: Uint8Array) {
  if (typeof Buffer !== "undefined") {
    return Buffer.from(bytes)
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/g, "");
  }

  let binary = "";
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function timingSafeEqual(a: string, b: string) {
  if (a.length !== b.length) {
    return false;
  }

  let result = 0;
  for (let i = 0; i < a.length; i += 1) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }

  return result === 0;
}

async function getSigningKey() {
  const secret = getAdminPassword();
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

async function signPayload(payload: string) {
  const key = await getSigningKey();
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
  return toBase64Url(new Uint8Array(signature));
}

export async function createAdminSessionValue() {
  const issuedAt = Date.now().toString();
  const signature = await signPayload(issuedAt);
  return `${issuedAt}.${signature}`;
}

export async function verifyAdminSessionValue(value: string | undefined) {
  if (!value) {
    return false;
  }

  if (!process.env.ADMIN_PASSWORD) {
    return false;
  }

  const [payload, signature] = value.split(".");
  if (!payload || !signature) {
    return false;
  }

  const issuedAt = Number(payload);
  if (!Number.isFinite(issuedAt)) {
    return false;
  }

  const ageSeconds = (Date.now() - issuedAt) / 1000;
  if (ageSeconds > ADMIN_SESSION_MAX_AGE_SECONDS) {
    return false;
  }

  const expectedSignature = await signPayload(payload);
  return timingSafeEqual(signature, expectedSignature);
}

export { ADMIN_SESSION_COOKIE, ADMIN_SESSION_MAX_AGE_SECONDS };
