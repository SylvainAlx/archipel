import { SitemapStream, streamToPromise } from "sitemap";
import fs from "fs";
import { routes } from "../src/router/routes.js";

const hostname = "https://archipel.vercel.app";

(async () => {
  const sitemap = new SitemapStream({ hostname });

  routes.forEach(({ path, priority }) => {
    // Remplacer les paramètres dynamiques ":id" par un exemple
    const cleanPath = path.replace(/:\w+/g, "123");

    sitemap.write({ url: cleanPath, priority, changefreq: "monthly" });
  });

  sitemap.end();
  const xml = await streamToPromise(sitemap);

  fs.writeFileSync("public/sitemap.xml", xml);
  console.log("✅ Sitemap généré avec succès!");
})();
