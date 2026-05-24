# Environment Variables

Environment variables are managed using Vite.

---

## Setup

Copy:

```bash
cp .env.example .env
```

Then update the values inside `.env`.

---

## Environment Access

Environment variables are centralized in:

```txt
src/config/env.ts
```

Avoid directly accessing:

```ts
import.meta.env;
```

throughout the application.

---

## Notes

- Only variables prefixed with `VITE_` are exposed to the client
- All environment variables are loaded as strings
- Restart the dev server after changing environment variables
