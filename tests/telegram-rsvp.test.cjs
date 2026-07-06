const assert = require("node:assert/strict");
const fs = require("node:fs");
const http = require("node:http");
const path = require("node:path");

const rootDir = path.join(__dirname, "..");

const script = fs.readFileSync(path.join(rootDir, "script.js"), "utf8");
const gitignore = fs.readFileSync(path.join(rootDir, ".gitignore"), "utf8");

assert.match(
  gitignore,
  /^\.env$/m,
  ".env should be ignored so Telegram credentials are not committed",
);

assert.match(
  script,
  /fetch\("\/api\/rsvp"/,
  "Guest form should submit RSVP data to the local API endpoint",
);

assert.match(
  script,
  /guestName/,
  "Guest form submission should include the guest name",
);

assert.match(
  script,
  /attendance/,
  "Guest form submission should include the attendance answer",
);

const { createServer, formatRsvpMessage } = require(path.join(rootDir, "server.js"));

assert.equal(
  formatRsvpMessage({ guestName: "Иван Иванов", attendance: "yes" }),
  [
    "Новая заявка с приглашения",
    "",
    "Гость: Иван Иванов",
    "Присутствие: Да, с удовольствием",
  ].join("\n"),
  "RSVP message should be readable in Telegram",
);

async function request(server, payload) {
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const { port } = server.address();

  return new Promise((resolve, reject) => {
    const req = http.request(
      {
        hostname: "127.0.0.1",
        port,
        path: "/api/rsvp",
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
      },
      (res) => {
        let body = "";
        res.setEncoding("utf8");
        res.on("data", (chunk) => {
          body += chunk;
        });
        res.on("end", () => {
          server.close(() => {
            resolve({ statusCode: res.statusCode, body: JSON.parse(body) });
          });
        });
      },
    );

    req.on("error", reject);
    req.end(JSON.stringify(payload));
  });
}

(async () => {
  const sentMessages = [];
  const server = createServer({
    env: {
      TELEGRAM_BOT_TOKEN: "test-token",
      TELEGRAM_CHAT_ID: "12345",
    },
    sendTelegramMessage: async ({ token, chatId, text }) => {
      sentMessages.push({ token, chatId, text });
    },
  });

  const response = await request(server, {
    guestName: "Мария",
    attendance: "no",
  });

  assert.equal(response.statusCode, 200);
  assert.deepEqual(response.body, { ok: true });
  assert.deepEqual(sentMessages, [
    {
      token: "test-token",
      chatId: "12345",
      text: [
        "Новая заявка с приглашения",
        "",
        "Гость: Мария",
        "Присутствие: К сожалению, не смогу",
      ].join("\n"),
    },
  ]);

  const missingEnvServer = createServer({
    env: {},
    sendTelegramMessage: async () => {
      throw new Error("Should not send without env");
    },
  });

  const missingEnvResponse = await request(missingEnvServer, {
    guestName: "Мария",
    attendance: "yes",
  });

  assert.equal(missingEnvResponse.statusCode, 500);
  assert.deepEqual(missingEnvResponse.body, { ok: false, error: "telegram_not_configured" });

  const loggedErrors = [];
  const failingServer = createServer({
    env: {
      TELEGRAM_BOT_TOKEN: "secret-token",
      TELEGRAM_CHAT_ID: "secret-chat",
    },
    logger: {
      error: (...parts) => loggedErrors.push(parts.join(" ")),
    },
    sendTelegramMessage: async () => {
      throw new Error("Telegram API responded with 400: Bad Request: chat not found");
    },
  });

  const failingResponse = await request(failingServer, {
    guestName: "Мария",
    attendance: "yes",
  });

  assert.equal(failingResponse.statusCode, 500);
  assert.deepEqual(failingResponse.body, { ok: false, error: "telegram_send_failed" });
  assert.match(loggedErrors.join("\n"), /chat not found/);
  assert.doesNotMatch(loggedErrors.join("\n"), /secret-token|secret-chat/);

  console.log("telegram RSVP tests passed");
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
