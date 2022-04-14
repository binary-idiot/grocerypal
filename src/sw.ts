/// <reference lib="webworker" />
import { precacheAndRoute, cleanupOutdatedCaches, createHandlerBoundToURL } from 'workbox-precaching';
import { NavigationRoute, registerRoute } from 'workbox-routing';
import { NetworkOnly } from 'workbox-strategies'
import { BackgroundSyncPlugin } from 'workbox-background-sync';

declare const self: ServiceWorkerGlobalScope;

const _API: string = import.meta.env.VITE_API_BASE_URL;
const endpointsToReplay: Array<string> = ['items', 'lists'];
const requestQueueName: string = 'grocerypal_request-queue';

// Handle update request
self.addEventListener('message', (event) => {
	if (event.data && event.data.type === 'SKIP_WAITING'){
		self.skipWaiting();
	}
});

// Handle caching
precacheAndRoute(self.__WB_MANIFEST);
cleanupOutdatedCaches();

// Handle failed requests by replaying when back online
const replayRegex: RegExp = new RegExp(`${_API.replace(/\./g, '\\.')}/(${endpointsToReplay.join('|')}).*`);
const bgSync: BackgroundSyncPlugin = new BackgroundSyncPlugin(requestQueueName);

registerRoute(replayRegex, new NetworkOnly({plugins: [bgSync] }), 'POST');
registerRoute(replayRegex, new NetworkOnly({plugins: [bgSync] }), 'PUT');
registerRoute(replayRegex, new NetworkOnly({plugins: [bgSync] }), 'PATCH');
registerRoute(replayRegex, new NetworkOnly({plugins: [bgSync] }), 'DELETE');

// Fallback navigation
registerRoute(new NavigationRoute(createHandlerBoundToURL('/index.html')));
