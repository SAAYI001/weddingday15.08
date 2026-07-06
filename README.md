# Wedding Invitation

Static wedding invitation with a small Node.js server for Telegram RSVP messages.

## Local Run

Create `.env` from `.env.example` and fill in Telegram values:

```env
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
```

Run:

```bash
npm start
```

Open `http://localhost:3000`.

## Dokploy Deployment

Deploy this repository as a Docker application in Dokploy.

Use these settings:

- Build type: Dockerfile
- Dockerfile path: `Dockerfile`
- Port: `3000`
- Health path: `/health`
- Start command: handled by Dockerfile with `npm start`

Add these environment variables in Dokploy:

```env
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
```

Do not commit the real `.env` file. It is ignored by Git and Docker.
