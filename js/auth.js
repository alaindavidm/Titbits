import { db } from "./db.js";

const SESSION_KEY = "titbits:session";

async function hash(password, salt) {
  const enc = new TextEncoder();
  const data = enc.encode(salt + ":" + password);
  const buf = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

function randomSalt() {
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  return Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join("");
}

export function getSession() {
  return localStorage.getItem(SESSION_KEY);
}

export function getCurrentUser() {
  const id = getSession();
  if (!id) return null;
  return db.find("users", id);
}

export function isAuthenticated() {
  return !!getCurrentUser();
}

export async function signup(email, password) {
  email = email.trim().toLowerCase();
  const existing = db.where("users", (u) => u.email === email);
  if (existing.length) throw new Error("EMAIL_EXISTS");
  const salt = randomSalt();
  const password_hash = await hash(password, salt);
  const user = db.insert("users", {
    email,
    password_hash,
    salt,
    onboarded: false,
    currency: "USD",
    salary: 0,
    pay_frequency: "monthly",
    notification_preferences: { channel_inapp: true, channel_email: false, channel_push: false }
  });
  localStorage.setItem(SESSION_KEY, user.id);
  return user;
}

export async function login(email, password) {
  email = email.trim().toLowerCase();
  const user = db.where("users", (u) => u.email === email)[0];
  if (!user) throw new Error("INVALID_CREDENTIALS");
  const attempt = await hash(password, user.salt);
  if (attempt !== user.password_hash) throw new Error("INVALID_CREDENTIALS");
  localStorage.setItem(SESSION_KEY, user.id);
  return user;
}

export function logout() {
  localStorage.removeItem(SESSION_KEY);
}
