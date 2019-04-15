const serverRegistrationUrl = "http://localhost:1000/notifications/subscribe"

const sendTokenToServer = token => {
    
}


if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js', { scope: '/' })
        .then(r => console.log('SW register'))
        .catch(e => console.info("SW Failed to register : " + e.toString()))

    if (firebase !== undefined) {
        const config = {
            apiKey: "**************************",
            authDomain: "NAMESPACE.firebaseapp.com",
            databaseURL: "https://NAMESPACE.firebaseio.com",
            projectId: "NAMESPACE",
            storageBucket: "NAMESPACE.appspot.com",
            messagingSenderId: "999237071096"
        }
        const messaging = firebase.initializeApp(config).messaging();
    
    
        messaging.requestPermission().then(() => {
            console.log('[firebase] Notification permission granted.');
            messaging.getToken().then(function (currentToken) {
                if (currentToken) {
                    console.log('[Firebase] token : ', currentToken)
                    //sendTokenToServer(currentToken);
                    //updateUIForPushEnabled(currentToken);
                } else {
                    console.log('[Firebase] No Instance ID token available. Request permission to generate one.');
                    //updateUIForPushPermissionRequired();
                    //setTokenSentToServer(false);
                }
            }).catch(function (err) {
                console.log('[Firebase] An error occurred while retrieving token. ', err);
                //showToken('[Firebase] Error retrieving Instance ID token. ', err);
                //setTokenSentToServer(false);
            });
        }).catch(err => console.log('Unable to get permission to notify.', err));
    
        messaging.onTokenRefresh(function() {
            messaging.getToken().then(function(refreshedToken) {
                console.log('[Firebase] Token refreshed.');
                //setTokenSentToServer(false);
                //sendTokenToServer(refreshedToken);
            }).catch(function(err) {
                console.log('[Firebaase] Unable to retrieve refreshed token ', err);
                //showToken('[Firebase] Unable to retrieve refreshed token ', err);
            });
        });
    
        messaging.onMessage(function(playload) {
            console.log(playload)
        })
    }
}