/**
 * DevForge Core Utilities
 * High performance, zero-dependency engine for Web and CLI.
 */

export interface JwtDecoded {
  header: Record<string, unknown>;
  payload: Record<string, unknown>;
  signature: string;
  isExpired?: boolean;
  expiresAt?: string;
  issuedAt?: string;
}

export function parseJwt(token: string): JwtDecoded {
  const parts = token.trim().split(".");
  if (parts.length < 2) {
    throw new Error("Invalid JWT token format: Expected minimum 2 parts separated by dots.");
  }

  const decodeBase64Url = (str: string): string => {
    let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
    while (base64.length % 4) {
      base64 += "=";
    }
    if (typeof atob === "function") {
      return decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
    }
    return Buffer.from(base64, "base64").toString("utf-8");
  };

  const header = JSON.parse(decodeBase64Url(parts[0]));
  const payload = JSON.parse(decodeBase64Url(parts[1]));
  const signature = parts[2] || "(unsigned)";

  let isExpired = false;
  let expiresAt: string | undefined;
  let issuedAt: string | undefined;

  if (payload.exp && typeof payload.exp === "number") {
    const expDate = new Date(payload.exp * 1000);
    isExpired = expDate < new Date();
    expiresAt = expDate.toISOString();
  }

  if (payload.iat && typeof payload.iat === "number") {
    issuedAt = new Date(payload.iat * 1000).toISOString();
  }

  return { header, payload, signature, isExpired, expiresAt, issuedAt };
}

export function formatJson(jsonString: string, indent: number = 2): string {
  const parsed = JSON.parse(jsonString);
  return JSON.stringify(parsed, null, indent);
}

export function minifyJson(jsonString: string): string {
  const parsed = JSON.parse(jsonString);
  return JSON.stringify(parsed);
}

export function jsonToTypeScript(jsonString: string, rootInterface: string = "RootObject"): string {
  const data = JSON.parse(jsonString);

  function getType(val: unknown): string {
    if (val === null) return "null";
    if (Array.isArray(val)) {
      if (val.length === 0) return "any[]";
      return `${getType(val[0])}[]`;
    }
    if (typeof val === "object") {
      return "Record<string, any>";
    }
    return typeof val;
  }

  if (Array.isArray(data)) {
    const itemType = data.length > 0 ? getType(data[0]) : "any";
    return `export type ${rootInterface} = ${itemType}[];`;
  }

  if (typeof data !== "object" || data === null) {
    return `export type ${rootInterface} = ${typeof data};`;
  }

  const lines: string[] = [`export interface ${rootInterface} {`];
  for (const [key, val] of Object.entries(data)) {
    const optional = val === null || val === undefined ? "?" : "";
    const typeStr = getType(val);
    lines.push(`  ${key}${optional}: ${typeStr};`);
  }
  lines.push("}");
  return lines.join("\n");
}

export function encodeBase64(str: string): string {
  if (typeof btoa === "function") {
    return btoa(unescape(encodeURIComponent(str)));
  }
  return Buffer.from(str, "utf-8").toString("base64");
}

export function decodeBase64(str: string): string {
  if (typeof atob === "function") {
    return decodeURIComponent(escape(atob(str)));
  }
  return Buffer.from(str, "base64").toString("utf-8");
}

export function encodeUrl(str: string): string {
  return encodeURIComponent(str);
}

export function decodeUrl(str: string): string {
  return decodeURIComponent(str);
}

export function generateUuid(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function generateSecret(
  length: number = 32,
  options: { numbers?: boolean; symbols?: boolean; uppercase?: boolean } = {
    numbers: true,
    symbols: true,
    uppercase: true,
  }
): string {
  let chars = "abcdefghijklmnopqrstuvwxyz";
  if (options.uppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (options.numbers) chars += "0123456789";
  if (options.symbols) chars += "!@#$%^&*()_+~|}{[]:;?><,.-=";

  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function formatSql(sql: string): string {
  const keywords = [
    "SELECT", "FROM", "WHERE", "AND", "OR", "GROUP BY", "ORDER BY",
    "JOIN", "LEFT JOIN", "RIGHT JOIN", "INNER JOIN", "LIMIT", "OFFSET",
    "INSERT INTO", "VALUES", "UPDATE", "SET", "DELETE FROM", "HAVING", "UNION"
  ];

  let formatted = sql.trim().replace(/\s+/g, " ");
  for (const kw of keywords) {
    const regex = new RegExp(`\\b${kw}\\b`, "gi");
    formatted = formatted.replace(regex, `\n${kw}`);
  }
  return formatted.trim();
}

export function generateMockData(type: "users" | "products" | "orders", count: number = 5): unknown[] {
  const names = ["Ayla Mammadova", "Liam Smith", "Sara Connor", "Kenji Sato", "Elena Rostova", "David Kim"];
  const roles = ["Software Engineer", "Product Manager", "DevOps Lead", "Security Analyst", "Designer"];
  const products = ["Cloud Analytics API", "Vector Indexer", "Kubernetes Mesh", "Redis Accelerator", "DevForge Pro"];

  const results: unknown[] = [];
  for (let i = 1; i <= count; i++) {
    if (type === "users") {
      const name = names[(i - 1) % names.length];
      const email = `${name.toLowerCase().replace(/\s+/g, ".")}@example.com`;
      results.push({
        id: generateUuid(),
        name,
        email,
        role: roles[(i - 1) % roles.length],
        active: i % 2 === 0,
        createdAt: new Date(Date.now() - i * 86400000).toISOString(),
      });
    } else if (type === "products") {
      results.push({
        id: generateUuid(),
        name: `${products[(i - 1) % products.length]} v${i}.0`,
        price: Math.floor(Math.random() * 90) + 10,
        currency: "USD",
        inventory: Math.floor(Math.random() * 500) + 50,
      });
    } else if (type === "orders") {
      results.push({
        orderId: `ORD-${1000 + i}`,
        customerId: generateUuid(),
        amount: (Math.random() * 200 + 20).toFixed(2),
        status: i % 3 === 0 ? "SHIPPED" : "DELIVERED",
        timestamp: new Date().toISOString(),
      });
    }
  }
  return results;
}
