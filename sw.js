const CACHE_NAME='dedbod-v2.0.0';
const ASSETS=['./','./index.html','./style.css','./app.js','./manifest.json','./version.json','./dedbod_icon_192.png','./dedbod_icon_512.png'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(ASSETS)))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;let r=e.request;if(r.mode==='navigate'||r.url.includes('index.html')||r.url.includes('version.json')){e.respondWith(fetch(r,{cache:'no-store'}).then(res=>{let copy=res.clone();caches.open(CACHE_NAME).then(c=>c.put(r,copy));return res}).catch(()=>caches.match('./index.html')));return}e.respondWith(caches.match(r).then(c=>c||fetch(r).then(res=>{let copy=res.clone();caches.open(CACHE_NAME).then(cache=>cache.put(r,copy));return res})))});
