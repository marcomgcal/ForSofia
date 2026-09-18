const CACHE_NAME="for-sofia-v1";

const urlsToCache=[
"/",
"/index.html",
"/style.css",
"/script.js",
"/manifest.json",
"/images/photo1.jpg",
"/images/photo2.jpg",
"/images/photo3.jpg",
"/images/photo4.jpg"
];

self.addEventListener("install",event=>{

event.waitUntil(

caches.open(CACHE_NAME)

.then(cache=>cache.addAll(urlsToCache))

);

});

self.addEventListener("fetch",event=>{

event.respondWith(

caches.match(event.request)

.then(response=>{

return response||fetch(event.request);

})

);

});

self.addEventListener("activate",event=>{

event.waitUntil(

caches.keys()

.then(keys=>{

return Promise.all(

keys.map(key=>{

if(key!==CACHE_NAME){

return caches.delete(key);

}

})

);

})

);

});