# Decision Intelligence Frontend

React + Vite + TypeScript frontend for comparing support-ticket analysis outputs from the backend.

## Features

- Business-friendly analysis dashboard
- Single-query comparison view
- RAG answer vs non-RAG answer
- ML priority prediction vs LLM priority prediction
- Retrieved source evidence display

## Backend Dependency

The frontend is built to call the backend `POST /analyze` endpoint.

Expected request shape:

```json
{
  "query": "I was charged twice and cannot log in",
  "top_k": 5
}
```

## Environment Variable

- `VITE_API_BASE_URL`

Examples:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000
```

or for deployment:

```env
VITE_API_BASE_URL=https://your-backend-service.up.railway.app
```

The production container injects this at runtime through `env.js`, so the frontend does not need to be rebuilt just to change the backend URL.

## Local Development

Install dependencies:

```bash
npm install
```

Run the dev server:

```bash
npm run dev
```

## Production Build

Build:

```bash
npm run build
```

Preview locally:

```bash
npm run preview
```

## Docker

Build:

```bash
docker build -t decision-intelligence-frontend .
```

Run:

```bash
docker run -e VITE_API_BASE_URL=http://host.docker.internal:8000 -p 3000:3000 decision-intelligence-frontend
```

Open:

```text
http://127.0.0.1:3000
```

## Deployment Notes

- The frontend uses a multi-stage Docker build.
- Static assets are served with a lightweight Node runtime using `serve`.
- Runtime config is written into `dist/env.js` on container startup.
