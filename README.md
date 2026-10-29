# Video Analyzer

**v0.1.0 · Early experimental prototype**

An educational prototype by Gerd Kortuem, TU Delft, for the IDEM307 Generative AI and Design course. It samples frames from a video and asks Google Gemini for descriptions from a chosen perspective. Continuous mode also builds a narrative across frames. Reports download as plain text.

This is an experimental teaching artifact, not a production service. Outputs may be wrong, biased or incomplete. Do not use it for consequential safety, accessibility or other assessments. Ongoing support and classroom availability are not guaranteed. This repository is distinct from the later [IDEM307 Video Analyzer](https://github.com/kortuem/idem307-video-analyzer).

## Run locally

Prerequisites: Git, npm, Node.js **20.19+ or 22.12+** (as required by the current Vite dependency), a modern browser, and your own Gemini API access. Google requests may consume quota or incur charges.

```sh
git clone https://github.com/kortuem/video-analyzer.git
cd video-analyzer/video-analyzer
npm ci
npm run dev
```

Open the URL printed by Vite, normally `http://localhost:5173/video-analyzer/`. Paste your own API key into the app. Do not put keys into source files or build environment variables. Stop the server with Ctrl+C.

For a small example, use a short fictional or permission-cleared MP4, select Objective Description and Isolated Mode, and start analysis. Expected result: sampled frames with descriptions, followed by a downloadable text report. Results are nondeterministic. No sample run against the live API was performed for the October 2026 cleanup.

The [GitHub Pages edition](https://kortuem.github.io/video-analyzer/) uses the same browser-only design. A successful build does not establish that live API access works for your account.

## Privacy and credentials

The browser loads the video locally and sends sampled JPEG frames and prompts to Google Gemini. Continuous analysis also sends text derived from earlier results for summarization. Google's terms and your account configuration govern processing and retention; this project cannot promise that Google stores nothing.

Your manually entered key stays in application memory until cleared or the page is reloaded. Requests send it to Google in an authentication header. It is not persisted by this application in localStorage or cookies. Browser extensions, developer tools and scripts running on the page can still access browser-held data. This is a personal-key prototype, not a way to distribute a shared secret securely. A shared-key service would need a separately designed backend.

Build-time API-key injection has been removed. `VITE_*` values are public browser-bundle configuration, not secret storage; see [Vite's guidance](https://vite.dev/guide/env-and-mode#env-variables). The app uses safe status-based errors rather than saving raw provider error bodies. The debug log can still contain the selected video's filename. Exported reports contain filenames and generated analysis; review them before sharing. Use fictional or cleared media, and do not submit private student or client material without appropriate permission.

## Model and limits

The configured model is `gemini-2.5-flash` in `video-analyzer/src/services/geminiClient.js`. Google's [deprecation documentation](https://ai.google.dev/gemini-api/docs/deprecations?hl=en), checked 2026-10-29, lists it without an announced shutdown date. Availability for a particular key/account and live output quality were not tested. The old experimental model default has been replaced. Recheck Google's documentation before teaching or deploying.

Large videos can exhaust browser memory or take a long time. Browser compatibility and cancellation during every processing stage are not comprehensively tested. API limits, charges and model availability can change. A 403 error calls for checking account access; 404 may indicate model availability; 429 indicates quota or rate limits. Never paste keys or private payloads into an issue.

## Checks and deployment

From the nested `video-analyzer/` application directory:

```sh
npm test
npm run build
npm run lint
```

Tests mock network requests and require no key or paid API calls. They cover request authentication, payloads, safe failure messages and cancellation. They do not prove live model availability or browser playback. See [cleanup verification](docs/cleanup-2026-10-29.md) for results and limits.

The GitHub Pages workflow installs dependencies with `npm ci`, builds the nested app and publishes its `dist/` directory on pushes to main. There is no backend. Keep secrets out of build variables. Report issues through [GitHub Issues](https://github.com/kortuem/video-analyzer/issues), including the browser, operating system, revision and a small fictional reproduction.

## Repository contents and rights

`video-analyzer/src/` contains the React app and Gemini client. The two root-level dated analysis reports are historical development outputs, not required runtime inputs or validated examples. They are retained pending an owner decision about their usefulness and sharing rights. Starter SVG assets remain as harmless unused files; the template favicon reference has been removed.

Original code and technical documentation are available under the [MIT License](LICENSE). See [RIGHTS.md](RIGHTS.md) for exclusions covering historical analysis reports and third-party assets.
