// Service Worker for MV3
// Import scripts using importScripts
importScripts('../../js/common/Utilities.js');
importScripts('Storage.js');
importScripts('LgtmImage.js');
importScripts('ImageService.js');
importScripts('Backend.js');

// Initialize the app when service worker starts
let app = {};
app.utilities    = new Utilities();
app.storage      = new Storage(app);
app.imageService = new ImageService(app);
app.backend      = new Backend(app);

app.backend.initialize();