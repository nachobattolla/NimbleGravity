# Nimble Gravity — Challenge Postulación

Mini aplicación en React que se conecta a la API de Nimble Gravity para listar posiciones abiertas y enviar tu postulación.

## Requisitos

- Node.js 18+
- npm (o pnpm/yarn)

## Cómo correr el proyecto

```bash
npm install
npm run dev
```

La app se abre en [http://localhost:5173](http://localhost:5173).

## Uso (pasos del challenge)

1. **Step 2:** Ingresá tu email (el mismo con el que te postulaste) y hacé clic en "Continuar". La app obtiene tus datos de candidato vía `GET /api/candidate/get-by-email`.
2. **Step 3–4:** Se muestra el listado de posiciones (desde `GET /api/jobs/get-list`). Cada ítem incluye:
   - Título de la posición
   - Input para la URL de tu repositorio de GitHub
   - Botón **Submit**
3. **Step 5:** Para la posición a la que te postulás, ingresá la URL de tu repo (ej. `https://github.com/tu-usuario/tu-repo`) y hacé clic en **Submit**. Se envía `POST /api/candidate/apply-to-job` con `uuid`, `jobId`, `candidateId` y `repoUrl`.

Si algo falla, el mensaje de error de la API se muestra en pantalla (la API devuelve mensajes descriptivos en el body).

**Idiomas:** La app está en español e inglés. Podés cambiar el idioma con el selector ES/EN en la esquina superior derecha. La preferencia se guarda en `localStorage`.

## Build

```bash
npm run build
```

Los archivos de producción quedan en `dist/`.

## Estructura del código

- **`src/api/`** — Cliente HTTP (`client.ts`), llamadas: `candidate.ts` (get-by-email), `jobs.ts` (get-list), `apply.ts` (apply-to-job).
- **`src/components/`** — `EmailStep`, `JobsStep`, `JobCard`, `JobCardSkeleton`, `LanguageSwitcher`.
- **`src/components/jobs/`** — Piezas del paso de posiciones: `JobsStepHeader`, `JobSearchInput`, `JobsPagination`.
- **`src/components/ui/`** — Button, Input, Label, Card, Skeleton, Alert, FormField, EmptyState, ErrorState.
- **`src/types.ts`** — Tipos para Candidate, Job, payload de apply y estados async.
- **`src/App.tsx`** — Flujo en dos pasos: email → listado de posiciones con postulación.
- **`src/i18n.ts`** — Configuración de i18next (es/en). Traducciones en `src/locales/`. Selector de idioma: `LanguageSwitcher`.

## Convención Server / Client

Los componentes interactivos (con estado, hooks o eventos) llevan la directiva **`"use client"`** en la primera línea. Así se marca explícitamente el límite de código que debe ejecutarse en el cliente y el proyecto queda alineado con el modelo de Next.js (App Router) por si se migra más adelante.

- **Client** (`"use client"`): `App`, `EmailStep`, `JobsStep`, `JobCard`, `LanguageSwitcher` y todos los de `ui/` (Button, Input, Label, Card, Skeleton).
- **Sin directiva**: módulos de lógica compartida como `src/api/`, `src/types.ts`, `src/i18n.ts` y `src/locales/` (no son componentes React).

## Checklist del challenge

| Requisito | Cumplido |
|-----------|----------|
| React | ✅ |
| Listado de posiciones desde la API | ✅ |
| Por posición: título, input URL repo, botón "Submit" | ✅ |
| Submit hace POST con body correcto (uuid, jobId, candidateId, repoUrl) | ✅ |
| Estados de carga y error en la UI | ✅ |
