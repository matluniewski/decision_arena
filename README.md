# Decision Arena

Decision Arena is a comparison-first decision tool for everyday life choices. The product flow is:

1. User writes a decision in natural language.
2. Backend proposes options, criteria, and missing information.
3. User edits the frame and adds context.
4. Backend returns a scored report with a verdict and a shareable link.

## Repo structure

- `frontend`: Next.js App Router + React + vanilla-extract
- `backend`: Spring Boot API with mock AI mode and optional OpenAI or Gemini mode

Frontend structure follows a feature/component split:

- `src/app`: Next.js routes and providers
- `src/features`: page-level feature views
- `src/components`: reusable layout and result components
- `src/lib`: API client and shared helpers
- `src/i18n`: locale state and messages
- `src/styles`: tokens and shared styling primitives

## Local setup

### Frontend

1. Copy `frontend/.env.example` to `.env.local`.
2. Run `npm install` in `frontend`.
3. Run `npm run dev`.

The frontend expects:

- `NEXT_PUBLIC_API_URL=http://localhost:8080`

### Backend

1. Copy `backend/.env.example` or one of the provider-specific examples in `backend/` to a local env file.
2. Start PostgreSQL with `docker compose up -d`.
3. Install Java 21 and Maven.
4. Run `mvn spring-boot:run` in `backend`.

Recommended local setup:

- copy `backend/.env.mock.example` to `backend/.env.mock.local`
- copy `backend/.env.gemini.example` to `backend/.env.gemini.local`
- copy `backend/.env.openai.example` to `backend/.env.openai.local`

Then start the backend with one command:

- `./run-mock.ps1`
- `./run-gemini.ps1`
- `./run-openai.ps1`

The local example env files disable request rate limiting by default, so repeated draft/analysis testing is not throttled during development.

Default AI mode is `mock`, so the product works end-to-end without paid model calls.

To switch to OpenAI, set:

- `APP_AI_MODE=openai`
- `APP_AI_API_KEY=...`
- `APP_AI_MODEL=gpt-5.4-mini`

To switch to Gemini, set:

- `APP_AI_MODE=gemini`
- `APP_AI_API_KEY=...`
- `APP_AI_MODEL=gemini-2.5-flash-lite`

If you prefer provider-specific env vars, the backend still accepts `OPENAI_API_KEY`, `OPENAI_MODEL`, `OPENAI_BASE_URL`, and `GEMINI_API_KEY` as fallbacks.

## Deploy setup

Recommended split for a free staging environment:

- `frontend`: Vercel
- `backend`: Render
- `database`: Neon PostgreSQL

### Frontend on Vercel

1. Import the repository into Vercel.
2. Set the project root to `frontend`.
3. Set `NEXT_PUBLIC_API_URL` to your backend URL, for example `https://decision-arena-api.onrender.com`.
4. Deploy.

No custom `vercel.json` rewrite is needed anymore. Next.js handles route serving natively.

### Backend on Render

1. Create a web service from this repository or use `render.yaml`.
2. Set the root directory to `backend`.
3. Build command: `mvn -DskipTests package`
4. Start command: `java -jar target/decision-arena-backend-0.0.1-SNAPSHOT.jar`
5. Health check path: `/actuator/health`

Required env vars for backend hosting:

- `DATABASE_URL`
- `DATABASE_USERNAME`
- `DATABASE_PASSWORD`
- `CORS_ALLOWED_ORIGINS`
- optional: `APP_AI_MODE`, `APP_AI_API_KEY`, `APP_AI_MODEL`, `APP_AI_BASE_URL`

The backend is already configured to bind to the hosting provider port through `server.port=${PORT:8080}`.

### Database on Neon

Create a PostgreSQL database in Neon and copy the connection details into the Render env vars above.

## API overview

- `POST /api/decision-drafts`
- `GET /api/decision-drafts/{draftId}`
- `POST /api/decision-analyses`
- `GET /api/results/{shareSlug}`

## Notes

- Sensitive health, legal, and crisis topics are intentionally blocked in MVP.
- Shared result links are read-only and anonymous.
- Scoring is normalized to `0-100` from weighted criterion scores.
