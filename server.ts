import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import bootstrap from './src/main.server';
import { LOCALE_ID } from '@angular/core';
import compression from 'compression';
import getSitemap from './src/server/sitemap-processor';

// The Express app is exported so that it can be used by serverless Functions.
export function app(locale: string): express.Express {
  const server = express();
  // folders and files respecting locale
  const serverDistFolder = resolve(
    dirname(fileURLToPath(import.meta.url)),
    '../',
    locale
  );
  const browserDistFolder = resolve(serverDistFolder, '../../browser/', locale);
  const indexHtml = join(serverDistFolder, 'index.server.html');
  console.log('indexHtml', indexHtml);

  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);
  // Serve static files from /browser
  server.get(
    `*.*`,
    express.static(browserDistFolder, {
      maxAge: '1y',
    })
  );
  // All regular routes use the Angular engine
  server.get(`*`, (req, res, next) => {
    const { protocol, originalUrl, headers, baseUrl } = req;
    commonEngine
      .render({
        bootstrap,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder + '/',
        providers: [
          { provide: APP_BASE_HREF, useValue: baseUrl },
          //provide locale to the app
          { provide: LOCALE_ID, useValue: locale },
        ],
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;
  const server = express();
  server.use(compression());
  server.get('/', (req, res) => {
    const { headers, protocol } = req;
    res.redirect(`${protocol}://${headers.host}/en`);
  });
  // different instance of express app for each locale
  server.use('/en', app('en-US'));
  server.use('/uk', app('uk'));
  server.use('/de', app('de'));
  server.use('/es', app('es'));
  server.use('/fr', app('fr'));
  server.use('/it', app('it'));
  server.use('/ja', app('ja'));

  server.get('/interface-health', (req, res) => {
    const health = {
      uptime: process.uptime(),
      message: 'Ok',
      date: new Date(),
    };
    res.status(200).send(health);
  });
  server.get('/sitemap.xml', async (req, res) => {
    try {
      const updatedSitemap = await getSitemap(
        dirname(fileURLToPath(import.meta.url)) + '/sitemap.xml'
      );
      res.type('xml').send(updatedSitemap);
    } catch (error) {
      res.status(500).send('Internal Server Error');
    }
  });
  server.get('/robots.txt', (req, res) => {
    res.type('text/plain');
    res.sendFile(dirname(fileURLToPath(import.meta.url)) + '/robots.txt');
  });
  server.get('*', (req, res) => {
    const { headers, protocol } = req;
    res.redirect(`${protocol}://${headers.host}/en`);
  });
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
