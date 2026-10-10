import { describe, it, expect } from "vitest";
import {
  parseJwt,
  formatJson,
  minifyJson,
  jsonToTypeScript,
  encodeBase64,
  decodeBase64,
  generateUuid,
  generateSecret,
  formatSql,
  generateMockData,
} from "@/lib/tools-core";

describe("DevForge Core Tools Suite", () => {
  it("parseJwt should correctly decode header and payload", () => {
    const sampleToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFsZXgiLCJpYXQiOjE1MTYyMzkwMjJ9.signature";
    const res = parseJwt(sampleToken);
    expect(res.header.alg).toBe("HS256");
    expect(res.payload.name).toBe("Alex");
    expect(res.signature).toBe("signature");
  });

  it("formatJson and minifyJson should format and compress correctly", () => {
    const raw = '{"a":1,"b":[2,3]}';
    const formatted = formatJson(raw, 2);
    expect(formatted).toContain('\n  "a": 1');
    const minified = minifyJson(formatted);
    expect(minified).toBe(raw);
  });

  it("jsonToTypeScript should generate accurate TypeScript interface", () => {
    const raw = JSON.stringify({ id: "123", active: true, count: 5 });
    const ts = jsonToTypeScript(raw, "User");
    expect(ts).toContain("export interface User {");
    expect(ts).toContain("id: string;");
    expect(ts).toContain("active: boolean;");
    expect(ts).toContain("count: number;");
  });

  it("encodeBase64 and decodeBase64 should be reversible", () => {
    const text = "Open Source Developer Tools";
    const enc = encodeBase64(text);
    const dec = decodeBase64(enc);
    expect(dec).toBe(text);
  });

  it("generateUuid should return valid UUID v4 format", () => {
    const uuid = generateUuid();
    expect(uuid).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    );
  });

  it("generateSecret should produce secret of requested length", () => {
    const secret = generateSecret(48);
    expect(secret.length).toBe(48);
  });

  it("formatSql should properly split SQL keywords", () => {
    const raw = "SELECT id, name FROM users WHERE active = 1;";
    const formatted = formatSql(raw);
    expect(formatted).toContain("SELECT");
    expect(formatted).toContain("\nFROM");
    expect(formatted).toContain("\nWHERE");
  });

  it("generateMockData should return mock data objects", () => {
    const users = generateMockData("users", 4);
    expect(users.length).toBe(4);
    expect((users[0] as any).email).toContain("@example.com");
  });
});
