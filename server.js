const fs = require("node:fs");
const http = require("node:http");
const https = require("node:https");
const path = require("node:path");

const rootDir = __dirname;
const port = Number(process.env.PORT || 3000);

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".mp3": "audio/mpeg",
  ".png": "image/png",
  ".webp": "image/webp",
};

function loadEnv(filePath = path.join(rootDir, ".env")) {
  if (!fs.existsSync(filePath)) return {};

  const values = {};
  const lines = fs.readFileSync(filePath, "utf8").split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const separatorIndex = trimmed.indexOf("=");
    if (separatorIndex === -1) continue;

    const key = trimmed.slice(0, separatorIndex).trim();
    const value = trimmed.slice(separatorIndex + 1).trim();
    values[key] = value;
  }

  return values;
}

function formatRsvpMessage({ guestName, attendance }) {
  const attendanceText = attendance === "yes" ? "Да, с удовольствием" : "К сожалению, не смогу";

  return [
    "Новая заявка с приглашения",
    "",
    `Гость: ${guestName}`,
    `Присутствие: ${attendanceText}`,
  ].join("\n");
}

function sendTelegramMessage({ token, chatId, text }) {
  const payload = JSON.stringify({
    chat_id: chatId,
    text,
  });

  return new Promise((resolve, reject) => {
    const request = https.request(
      {
        hostname: "api.telegram.org",
        path: `/bot${token}/sendMessage`,
        method: "POST",
        headers: {
          "content-type": "application/json",
          "content-length": Buffer.byteLength(payload),
        },
      },
      (response) => {
        let body = "";
        response.setEncoding("utf8");
        response.on("data", (chunk) => {
          body += chunk;
        });
        response.on("end", () => {
          if (response.statusCode >= 200 && response.statusCode < 300) {
            resolve();
            return;
          }

          reject(new Error(`Telegram API responded with ${response.statusCode}: ${body}`));
        });
      },
    );

    request.on("error", reject);
    request.end(payload);
  });
}

function readJsonRequest(request) {
  return new Promise((resolve, reject) => {
    let body = "";

    request.setEncoding("utf8");
    request.on("data", (chunk) => {
      body += chunk;
      if (body.length > 10_000) {
        reject(new Error("request_too_large"));
        request.destroy();
      }
    });
    request.on("end", () => {
      try {
        resolve(JSON.parse(body || "{}"));
      } catch (error) {
        reject(new Error("invalid_json"));
      }
    });
    request.on("error", reject);
  });
}

function sendJson(response, statusCode, payload) {
  const body = JSON.stringify(payload);
  response.writeHead(statusCode, {
    "content-type": "application/json; charset=utf-8",
    "content-length": Buffer.byteLength(body),
  });
  response.end(body);
}

function sanitizeErrorMessage(error, env) {
  let message = error instanceof Error ? error.message : String(error);
  const secrets = [env.TELEGRAM_BOT_TOKEN, env.TELEGRAM_CHAT_ID].filter(Boolean);

  for (const secret of secrets) {
    message = message.split(secret).join("[hidden]");
  }

  return message;
}

function serveStatic(request, response) {
  const requestUrl = new URL(request.url, "http://localhost");
  const pathname = requestUrl.pathname === "/" ? "/index.html" : requestUrl.pathname;
  let filePath = path.normalize(path.join(rootDir, decodeURIComponent(pathname)));

  if (!filePath.startsWith(rootDir)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  if (pathname.startsWith("/assets/") && path.extname(filePath) === ".png") {
    const optimizedFilePath = filePath.slice(0, -4) + ".jpg";
    if (fs.existsSync(optimizedFilePath)) {
      filePath = optimizedFilePath;
    }
  }

  fs.readFile(filePath, (error, content) => {
    if (error) {
      response.writeHead(404);
      response.end("Not found");
      return;
    }

    response.writeHead(200, {
      "content-type": mimeTypes[path.extname(filePath)] || "application/octet-stream",
      "cache-control": pathname.startsWith("/assets/")
        ? "public, max-age=31536000, immutable"
        : "public, max-age=300",
    });
    response.end(content);
  });
}

function createServer({
  env = { ...loadEnv(), ...process.env },
  logger = console,
  sendTelegramMessage: sendMessage = sendTelegramMessage,
} = {}) {
  return http.createServer(async (request, response) => {
    if (request.method === "GET" && request.url === "/health") {
      sendJson(response, 200, { ok: true });
      return;
    }

    if (request.method === "POST" && request.url === "/api/rsvp") {
      const token = env.TELEGRAM_BOT_TOKEN;
      const chatId = env.TELEGRAM_CHAT_ID;

      if (!token || !chatId) {
        sendJson(response, 500, { ok: false, error: "telegram_not_configured" });
        return;
      }

      try {
        const payload = await readJsonRequest(request);
        const guestName = String(payload.guestName || "").trim();
        const attendance = String(payload.attendance || "").trim();

        if (!guestName || !["yes", "no"].includes(attendance)) {
          sendJson(response, 400, { ok: false, error: "invalid_rsvp" });
          return;
        }

        await sendMessage({
          token,
          chatId,
          text: formatRsvpMessage({ guestName, attendance }),
        });

        sendJson(response, 200, { ok: true });
      } catch (error) {
        logger.error("Telegram RSVP send failed:", sanitizeErrorMessage(error, env));
        sendJson(response, 500, { ok: false, error: "telegram_send_failed" });
      }
      return;
    }

    if (request.method === "GET") {
      serveStatic(request, response);
      return;
    }

    response.writeHead(405);
    response.end("Method not allowed");
  });
}

if (require.main === module) {
  createServer().listen(port, () => {
    console.log(`Wedding invitation server is running at http://localhost:${port}`);
  });
}

module.exports = {
  createServer,
  formatRsvpMessage,
  loadEnv,
  sanitizeErrorMessage,
  sendTelegramMessage,
};
