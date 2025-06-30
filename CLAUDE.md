# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Chrome extension called "Easy LGTM" that adds LGTM (Looks Good To Me) buttons to GitHub pull request pages. The extension fetches LGTM images from a server and allows users to easily insert them into GitHub comments.

## Architecture

The extension follows a typical Chrome extension architecture with manifest v2:

- **Backend** (`js/backend/`): Background scripts that handle image fetching and storage
  - `Backend.js`: Main coordinator that listens for messages from content scripts
  - `ImageService.js`: Manages image preloading and retrieval from storage
  - `LgtmImage.js`: Represents individual LGTM images
  - `Storage.js`: Handles persistent storage of images
  
- **Frontend** (`js/frontend/`): Content scripts injected into GitHub pages
  - `Frontend.js`: Main coordinator that detects GitHub pages and creates LGTM buttons
  - `LgtmButton.js`: Creates and manages the LGTM button UI with Vue.js
  - `LgtmImage.js`: Handles image display and insertion into comment fields
  - `Templater.js`: Manages HTML template rendering

- **Templates** (`templates/`): HTML templates for UI components
- **Libraries** (`js/lib/`): jQuery, Vue.js, and jQuery Color plugins

## Key Components

### URL Detection
The extension targets specific GitHub URLs:
- Pull request pages: `/pull/\d+(?:$|#|\?)/`
- Review pages: `/pull/\d+\/(?:commits|files)/`

### Image Flow
1. Backend preloads up to 6 images from `http://suikatyan.sakura.ne.jp/*`
2. Frontend requests images via Chrome messaging API
3. Images are displayed in a modal for user selection
4. Selected images are inserted into GitHub comment fields

### Storage System
Uses Chrome extension storage API to cache images locally for offline use.

## Development Notes

- The extension has been upgraded to manifest v3 for Chrome Web Store compatibility
- Background scripts run as a service worker (`js/backend/service-worker.js`)
- All JavaScript is written in ES6 classes
- Vue.js is used for reactive UI components
- jQuery is used for DOM manipulation
- Code is written in Japanese with Japanese comments
- No build system or package manager - all dependencies are committed

## Manifest V3 Migration

Key changes made for MV3 compatibility:
- Updated `manifest_version` from 2 to 3
- Changed `permissions` to `host_permissions` for external URLs
- Replaced `background.scripts` with `background.service_worker`
- Updated `web_accessible_resources` to new object format
- Changed `chrome.extension.onMessage` to `chrome.runtime.onMessage`