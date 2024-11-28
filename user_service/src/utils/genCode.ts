import crypto from "crypto";

export default function genCode() {
  return crypto.randomBytes(10).toString("hex").slice(0, 5).toUpperCase();
}
