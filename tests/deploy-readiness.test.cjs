const assert = require("node:assert/strict");
const fs = require("node:fs");
const http = require("node:http");
const path = require("node:path");

const rootDir = path.join(__dirname, "..");
const dockerfile = fs.readFileSync(path.join(rootDir, "Dockerfile"), "utf8");
const dockerignore = fs.readFileSync(path.join(rootDir, ".dockerignore"), "utf8");
const envExample = fs.readFileSync(path.join(rootDir, ".env.example"), "utf8");
const readme = fs.readFileSync(path.join(rootDir, "README.md"), "utf8");
const packageJson = JSON.parse(fs.readFileSync(path.join(rootDir, "package.json"), "utf8"));

const { createServer } = require(path.join(rootDir, "server.js"));

assert.match(dockerfile, /FROM node:24-alpine/, "Dockerfile should pin the Node runtime used locally");
assert.match(dockerfile, /EXPOSE 3000/, "Dockerfile should expose the app port for Dokploy");
assert.match(dockerfile, /CMD \["npm", "start"\]/, "Dockerfile should start the app through npm");

assert.match(dockerignore, /^\.env$/m, ".dockerignore should keep real secrets out of Docker builds");
assert.match(dockerignore, /^\.git$/m, ".dockerignore should keep git metadata out of Docker builds");

assert.match(envExample, /^TELEGRAM_BOT_TOKEN=$/m, ".env.example should document the bot token variable");
assert.match(envExample, /^TELEGRAM_CHAT_ID=$/m, ".env.example should document the chat id variable");

assert.equal(packageJson.scripts.start, "node server.js");
assert.match(readme, /Dokploy/i, "README should include Dokploy deployment notes");

async function request(server, pathname) {
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const { port } = server.address();

  return new Promise((resolve, reject) => {
    const req = http.get(
      {
        hostname: "127.0.0.1",
        port,
        path: pathname,
      },
      (res) => {
        let body = "";
        res.setEncoding("utf8");
        res.on("data", (chunk) => {
          body += chunk;
        });
        res.on("end", () => {
          server.close(() => resolve({ statusCode: res.statusCode, body }));
        });
      },
    );

    req.on("error", reject);
  });
}

(async () => {
  const health = await request(createServer(), "/health");

  assert.equal(health.statusCode, 200);
  assert.deepEqual(JSON.parse(health.body), { ok: true });

  console.log("deploy readiness tests passed");
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
