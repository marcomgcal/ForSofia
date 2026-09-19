const CACHE_NAME = "for-sofia-v2";

const urlsToCache = [
  "./",
  "./index.html",
  "./style.css",
  "./script.js",
  "./manifest.json",

  "./041569D8-1E29-4ADB-8D2C-907D2EEA402F.png",
  "./3E532DB9-1744-4FA3-B695-7530707F9E5F.jpeg",
  "./645BDD27-2ACF-427F-8FB8-E530815554EF.jpeg",
  "./D96AAB3F-820E-4A5B-94A3-75F0CD6899A4.jpeg"
];

self.addEventListener("install",event=>{

event.waitUntil(

caches.open(CACHE_NAME).then(cache=>cache.addAll(urlsToCache))

);

self.skipWaiting();

});

self.addEventListener("activate",event=>{

event.waitUntil(

caches.keys().then(keys=>

Promise.all(

keys.map(key=>{

if(key!==CACHE_NAME){

return caches.delete(key);

}

})

)

).then(()=>self.clients.claim())

);

});

self.addEventListener("fetch",event=>{

if(event.request.method!=="GET")return;

event.respondWith(

caches.match(event.request).then(response=>{

return response||fetch(event.request);

})

);

});