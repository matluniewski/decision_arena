# Decision Arena

Decision Arena is a comparison-first decision tool for everyday life choices. The product flow is:

1. User writes a decision in natural language.
2. Backend proposes options, criteria, and missing information.
3. User edits the frame and adds context.
4. Backend returns a scored report with a verdict and a shareable link.

## Repo structure

- `frontend`: React + TypeScript + Vite client
- `backend`: Spring Boot API with mock AI mode and optional OpenAI mode

## Local setup

### Frontend

1. Copy [frontend/.env.example](/e:/new%20project/frontend/.env.example) to `.env`.
2. Run `npm install` in `frontend`.
3. Run `npm run dev`.

### Backend

1. Copy [backend/.env.example](/e:/new%20project/backend/.env.example) to your environment.
2. Start PostgreSQL with `docker compose up -d`.
3. Install Java 21 and Maven.
4. Run `mvn spring-boot:run` in `backend`.

Default AI mode is `mock`, so the product works end-to-end without paid model calls. To switch to OpenAI, set:

- `APP_AI_MODE=openai`
- `OPENAI_API_KEY=...`

## API overview

- `POST /api/decision-drafts`
- `GET /api/decision-drafts/{draftId}`
- `POST /api/decision-analyses`
- `GET /api/results/{shareSlug}`

## Notes

- Sensitive health, legal, and crisis topics are intentionally blocked in MVP.
- Shared result links are read-only and anonymous.
- Scoring is normalized to `0-100` from weighted criterion scores.
