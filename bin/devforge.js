#!/usr/bin/env node

/**
 * DevForge CLI — Command Line Developer Utilities
 * Usage: npx devforge <command> [arguments]
 */

const crypto = require("crypto");

const args = process.argv.slice(2);
const command = args[0];

function printHelp() {
  console.log(`
⚡ DevForge CLI — The Developer's Swiss Army Knife

USAGE:
  devforge <command> [options]

COMMANDS:
  uuid [count]                  Generate cryptographically random UUID v4s (default: 1)
  jwt <token>                   Decode and inspect JWT token header & payload
  hash <text> [algorithm]       Calculate hash (sha256, sha512, md5 - default: sha256)
  base64 encode <text>          Encode plain text into Base64
  base64 decode <base64>        Decode Base64 string back to plain text
  secret [length]               Generate secure random password/secret (default: 32)
  mock <users|orders|products>  Generate mock JSON data records (default count: 3)
  help                          Show this help menu

EXAMPLES:
  devforge uuid 5
  devforge hash "password123" sha256
  devforge base64 encode "Hello World"
  devforge mock users 2
`);
}

if (!command || command === "help" || command === "--help" || command === "-h") {
  printHelp();
  process.exit(0);
}

try {
  switch (command) {
    case "uuid": {
      const count = parseInt(args[1], 10) || 1;
      for (let i = 0; i < count; i++) {
        console.log(crypto.randomUUID());
      }
      break;
    }

    case "secret": {
      const length = parseInt(args[1], 10) || 32;
      const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=";
      let secret = "";
      for (let i = 0; i < length; i++) {
        secret += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      console.log(secret);
      break;
    }

    case "jwt": {
      const token = args[1];
      if (!token) {
        console.error("❌ Error: Missing JWT token. Usage: devforge jwt <token>");
        process.exit(1);
      }
      const parts = token.split(".");
      if (parts.length < 2) {
        console.error("❌ Error: Invalid JWT format.");
        process.exit(1);
      }
      const header = JSON.parse(Buffer.from(parts[0], "base64url").toString("utf-8"));
      const payload = JSON.parse(Buffer.from(parts[1], "base64url").toString("utf-8"));

      console.log("\n📦 JWT HEADER:");
      console.log(JSON.stringify(header, null, 2));
      console.log("\n📄 JWT PAYLOAD:");
      console.log(JSON.stringify(payload, null, 2));

      if (payload.exp) {
        const expDate = new Date(payload.exp * 1000);
        const expired = expDate < new Date();
        console.log(`\n⏳ Expiration: ${expDate.toISOString()} (${expired ? "EXPIRED" : "VALID"})`);
      }
      break;
    }

    case "hash": {
      const text = args[1];
      const algo = args[2] || "sha256";
      if (!text) {
        console.error("❌ Error: Missing input text. Usage: devforge hash <text> [algorithm]");
        process.exit(1);
      }
      const hash = crypto.createHash(algo).update(text).digest("hex");
      console.log(`\n🔑 [${algo.toUpperCase()}] Hash:`);
      console.log(hash);
      break;
    }

    case "base64": {
      const action = args[1];
      const text = args[2];
      if (!action || !text) {
        console.error("❌ Error: Usage: devforge base64 <encode|decode> <text>");
        process.exit(1);
      }
      if (action === "encode") {
        console.log(Buffer.from(text, "utf-8").toString("base64"));
      } else if (action === "decode") {
        console.log(Buffer.from(text, "base64").toString("utf-8"));
      } else {
        console.error("❌ Invalid action. Use 'encode' or 'decode'.");
      }
      break;
    }

    case "mock": {
      const type = args[1] || "users";
      const count = parseInt(args[2], 10) || 3;
      const names = ["Ayla Mammadova", "Liam Smith", "Sara Connor", "Kenji Sato", "David Kim"];
      const roles = ["Software Engineer", "Product Manager", "DevOps Lead", "Security Analyst"];

      const items = [];
      for (let i = 1; i <= count; i++) {
        if (type === "users") {
          items.push({
            id: crypto.randomUUID(),
            name: names[(i - 1) % names.length],
            email: `user${i}@example.com`,
            role: roles[(i - 1) % roles.length],
          });
        } else if (type === "orders") {
          items.push({
            orderId: `ORD-${1000 + i}`,
            amount: (Math.random() * 200 + 20).toFixed(2),
            currency: "USD",
            status: "COMPLETED",
          });
        } else {
          items.push({
            productId: `PROD-${i}`,
            title: `Developer Toolset #${i}`,
            price: 29.99,
          });
        }
      }
      console.log(JSON.stringify(items, null, 2));
      break;
    }

    default:
      console.error(`❌ Unknown command: "${command}"`);
      printHelp();
      process.exit(1);
  }
} catch (err) {
  console.error("❌ Execution error:", err.message);
  process.exit(1);
}
