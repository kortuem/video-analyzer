# Changelog

## 0.1.0 · 2026-10-29

Early experimental prototype. First explicitly versioned cleanup of the 2025 teaching application; not a production-readiness claim.

- Removed build-time API-key injection; users enter their own session key.
- Moved authentication from request URLs to headers; sanitized provider and network errors while preserving cancellation.
- Replaced the old experimental model default with Gemini 2.5 Flash, based on Google's documentation. Live availability is unverified.
- Added mocked API tests and test/lint checks before Pages builds.
- Corrected privacy, setup, runtime requirements and verification documentation.
- Removed dead code and repaired React context exports and video replacement cleanup.
- Preserved historical reports, starter assets and repository history. Licence confirmation remains an owner decision.
