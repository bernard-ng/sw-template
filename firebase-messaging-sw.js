importScripts("https://www.gstatic.com/firebasejs/5.9.2/firebase-app.js")
importScripts("https://www.gstatic.com/firebasejs/5.9.2/firebase-messaging.js")

const config = {
    apiKey: "AIzaSyALMlWqWAboT4x52Sw4vCt6aLieDwIf--4",
    authDomain: "learn-coder23.firebaseapp.com",
    databaseURL: "https://learn-coder23.firebaseio.com",
    projectId: "learn-coder23",
    storageBucket: "learn-coder23.appspot.com",
    messagingSenderId: "999237071096"
}

const messaging = firebase.initializeApp(config).messaging();


messaging.setBackgroundMessageHandler(function(playload) {
    console.log('[firebase] Received background message ');
    let notificationTitle = "New Notification";
    let notificationOptions = {
        body: "lorem  ipsum",
        icon: 'https://larytech.com/imgs/icon.png'
    };
    
    return self.registration.showNotification(notificationTitle, notificationOptions);
});