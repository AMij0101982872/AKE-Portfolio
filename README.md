# Portfolio — Ivan Aké

Portfolio bilingue (FR/EN) en **Next.js 16 + Tailwind 4**, exporté en statique.
Un seul `Dockerfile` sert au local, à la CI et à la production : ce que tu vois en local est exactement ce qui est publié.

```
            ┌──────────── Dockerfile (multi-stage) ────────────┐
            │ deps → dev        (hot-reload, local)            │
            │ deps → build      (lint + types + next build)    │
            │          ├→ export   (./out statique)  → GitHub Pages
            │          └→ runtime  (Nginx :8080)     → GHCR / VPS / local
            └──────────────────────────────────────────────────┘
```

## Modifier le contenu

Tout le texte est dans **`src/content/profile.ts`** (projets, expériences, compétences, liens), chaque champ en `fr` et `en`.
Les libellés d'interface sont dans `src/content/i18n.ts`. Mets ton CV PDF dans `public/cv-ivan-ake.pdf`.

## Local (Docker)

| Commande | Effet | URL |
|---|---|---|
| `make dev` | serveur de dev, hot-reload | http://localhost:3000/fr/ |
| `make prod` | image de production Nginx | http://localhost:8080 |
| `make check` | lint + types + build, comme la CI | — |
| `make export` | génère `./out` via Docker | — |

Sans `make` : `docker compose up dev` et `docker compose up --build prod`.
Sans Docker : `npm ci && npm run dev`.

## Production (GitHub Actions)

| Workflow | Déclencheur | Ce qu'il fait |
|---|---|---|
| `ci.yml` | Pull Request / branches | build Docker (lint, types, build) + smoke test de l'image Nginx |
| `deploy.yml` | push sur `main` | export statique via Docker → **GitHub Pages**, et image → **ghcr.io** |

### Mise en route (une seule fois)

1. Crée le repo sur GitHub et pousse le code :
   ```bash
   git remote add origin git@github.com:<ton-user>/<repo>.git
   git push -u origin main
   ```
   Astuce : nomme le repo **`<ton-user>.github.io`** pour avoir l'URL courte `https://<ton-user>.github.io/`.
   Avec un autre nom, le site sera sur `https://<ton-user>.github.io/<repo>/` (le préfixe est géré automatiquement).
2. Sur GitHub : **Settings → Pages → Source : GitHub Actions**.
3. Protège `main` (Settings → Branches) en exigeant le check **CI** : on travaille sur une branche, on ouvre une PR, la CI valide, on merge → déploiement automatique.

### Passer sur un VPS plus tard

L'image est déjà publiée à chaque push :
```bash
docker run -d -p 80:8080 --restart unless-stopped ghcr.io/<ton-user>/<repo>:latest
```
