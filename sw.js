importScripts("https://www.gstatic.com/firebasejs/5.9.2/firebase-app.js")
importScripts("https://www.gstatic.com/firebasejs/5.9.2/firebase-messaging.js")

let cacheVersion = 'v8';
const config = {
    apiKey: "*******************",
    authDomain: "NAMESPACE.firebaseapp.com",
    databaseURL: "https://NAMESPACE.firebaseio.com",
    projectId: "NAMESPACE",
    storageBucket: "NAMESPACE.appspot.com",
    messagingSenderId: "999237071096"
}

const cacheFiles = [
    'style.css',
    'manifest.json',
    'https://www.gstatic.com/firebasejs/5.9.2/firebase-app.js',
    'https://www.gstatic.com/firebasejs/5.9.2/firebase-messaging.js'
];

const messaging = firebase.initializeApp(config).messaging();

self.addEventListener('install', e => {
    console.log('[SW] installed')

    e.waitUntil(
        caches.open(cacheVersion).then(cache => {
            return cache.addAll(cacheFiles)
        }).catch(err => console.info("[SW] Faild to Cache files : ", err))
    )
})

self.addEventListener('activate', e => {
    console.log('[SW] activated')

    e.waitUntil(
        caches.keys().then(cacheVersions => {
            return Promise.all(cacheVersions.map(thisCacheVersion => {
                if (thisCacheVersion !== cacheVersion) {
                    console.log("[SW] removing cached files form : " + thisCacheVersion)
                    return caches.delete(thisCacheVersion)
                }
            }))
        })
    )
    return self.clients.claim();
})

self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request).then(response => {
            if (response) {
                return response
            }

            fetch(e.request.clone()).then(response => {
                if (!response) {
                    return response
                }

                caches.open(cacheVersion).then(cache => {
                    if (e.request.method === "GET") {
                        cache.put(e.request, response.clone())
                    }
                    return response
                }) 
            }).catch(err => console.info("[SW] Error Fetching and Caching : ", err))
        })
    )
})

messaging.setBackgroundMessageHandler(playload => {
    console.log('[SW] Received background message ');
    var notificationTitle = "New Notification";
    var notificationOptions = {
      body: "lorem  ipsum",
      icon: 'https://larytech.com/imgs/icon.png'
    };
  
    return self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclose', e => console.log('[SW] notification close'))
self.addEventListener('notificationclick', e => console.log('[SW] notification clicked'))
self.addEventListener('push', e => {
    console.log('[SW] incoming form push')
    e.waitUntil (
        self.registration.showNotification(e.data.text)
    )
})