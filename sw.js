'use strict';
const PREFIX='exam-sprint-'+new URL(self.registration.scope).pathname+'-';
const CACHE=PREFIX+'v6';
const FILES=['./','index.html','layout.js','layout.css','tuesday.html','friday.html','friday-app.js','friday-data.js','friday.css','news-app.js','news-data.js','news.css','app.js','data.js','style.css','pwa.css','pwa.js','manifest.webmanifest','icons/icon-192.png','icons/icon-512.png','icons/maskable-512.png','icons/apple-touch-icon.png'];
self.addEventListener('install',event=>event.waitUntil((async()=>{const cache=await caches.open(CACHE);await cache.addAll(FILES.map(f=>new Request(new URL(f,self.registration.scope),{cache:'reload'})));await self.skipWaiting()})()));
self.addEventListener('activate',event=>event.waitUntil((async()=>{for(const key of await caches.keys())if(key.startsWith(PREFIX)&&key!==CACHE)await caches.delete(key);await self.clients.claim()})()));
self.addEventListener('message',event=>{if(event.data?.type==='ACTIVATE_UPDATE')self.skipWaiting()});
self.addEventListener('fetch',event=>{const url=new URL(event.request.url);if(event.request.method!=='GET'||!url.href.startsWith(self.registration.scope))return;event.respondWith((async()=>{const cache=await caches.open(CACHE);if(event.request.mode==='navigate'){try{const fresh=await fetch(event.request,{cache:'no-store',signal:AbortSignal.timeout(4000)});if(fresh.ok){await cache.put(new Request(url.origin+url.pathname),fresh.clone());return fresh}}catch{}const page=await cache.match(event.request,{ignoreSearch:true});if(page)return page}const saved=await cache.match(event.request,{ignoreSearch:true});if(saved)return saved;return fetch(event.request)})())});


