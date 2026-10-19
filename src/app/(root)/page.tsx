import { defaultLocale } from "@/content/i18n";
import { basePath } from "@/lib/paths";

/**
 * Page "/" : redirige vers /fr/ ou /en/ selon la langue du navigateur.
 * Fonctionne en statique pur (GitHub Pages, Nginx) : pas de serveur requis.
 */
const redirect = `(function(){var l=(navigator.language||'').slice(0,2)==='en'?'en':'${defaultLocale}';location.replace('${basePath}/'+l+'/');})();`;

export default function Root() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: redirect }} />
      <noscript>
        <meta httpEquiv="refresh" content={`0; url=${basePath}/${defaultLocale}/`} />
      </noscript>
      <p style={{ padding: 24, fontFamily: "system-ui" }}>
        <a href={`${basePath}/fr/`}>Français</a> · <a href={`${basePath}/en/`}>English</a>
      </p>
    </>
  );
}
