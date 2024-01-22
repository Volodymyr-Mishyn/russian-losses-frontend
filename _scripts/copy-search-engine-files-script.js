const fs = require("fs");
const path = require("path");

const sourceDir = path.join(__dirname, "..");
const sitemapPath = path.join(sourceDir, "sitemap.xml");
const robotsPath = path.join(sourceDir, "robots.txt");

const serverDir = path.join(
  __dirname,
  "..",
  "dist/russian-losses-frontend/server"
);

const getDirectories = (source) =>
  fs
    .readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

(() => {
  const locales = getDirectories(serverDir);

  locales.forEach((locale) => {
    const destDir = path.join(serverDir, locale);

    fs.copyFileSync(sitemapPath, path.join(destDir, "sitemap.xml"));
    fs.copyFileSync(robotsPath, path.join(destDir, "robots.txt"));

    console.log(`Copied files to ${destDir}`);
  });
})();
