/**
 * Préfixe d'URL du site. Vide en local et sur un domaine propre,
 * "/nom-du-repo" sur GitHub Pages (injecté par la CI au build).
 * next/link l'ajoute tout seul ; il faut l'ajouter à la main pour les <a> et fichiers de /public.
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const asset = (path: string) => `${basePath}${path}`;
