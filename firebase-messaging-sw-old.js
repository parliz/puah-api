// firebase-messaging-sw.js
// importScripts('https://www.gstatic.com/firebasejs/3.6.8/firebase-app.js');
// importScripts('https://www.gstatic.com/firebasejs/3.6.8/firebase-messaging.js');

const firebaseConfig = {    
    apiKey: "AIzaSyDQuF0_5D_uNL9Cg5AOAktG_LIuTNEirUk",
    authDomain: "push-api-f23f9.firebaseapp.com",
    projectId: "push-api-f23f9",
    storageBucket: "push-api-f23f9.appspot.com",
    messagingSenderId: "386514831306",
    appId: "1:386514831306:web:3bc7a921de80dd1a33b133",
    measurementId: "G-51B86SQVYC"
};

// firebase_subscribe.js
firebase.initializeApp(firebaseConfig);

// браузер поддерживает уведомления
// вообще, эту проверку должна делать библиотека Firebase, но она этого не делает
if ('Notification' in window) {
    var messaging = firebase.messaging();

    // пользователь уже разрешил получение уведомлений
    // подписываем на уведомления если ещё не подписали
    // if (Notification.permission === 'granted') {
        subscribe();
    // }

    // по клику, запрашиваем у пользователя разрешение на уведомления
    // и подписываем его
    // $('#subscribe').on('click', function () {
    //     subscribe();
    // });
}

function subscribe() {
    // запрашиваем разрешение на получение уведомлений
    messaging.requestPermission()
        .then(function () {
            // получаем ID устройства
            // if ("serviceWorker" in navigator) {
            //     navigator.serviceWorker
            //       .register("./firebase-messaging-sw.js")
            //       .then(function(registration) {
            //         console.log("Registration successful, scope is:", registration.scope); 

            if ("serviceWorker" in navigator) {
                // Register a service worker hosted at the root of the
                // site using the default scope.
                navigator.serviceWorker.register("/firebase-messaging-sw.js").then(
                  (registration) => {
                    console.log("Service worker registration succeeded:", registration);
                  },
                  (error) => {
                    console.error(`Service worker registration failed: ${error}`);
                  },
                );
              } else {
                console.error("Service workers are not supported.");
              }

                        messaging.getToken({vapidKey: "BF0tXDbR87XZMZ-jnDJQoAQ0vZrw3CFab85MRlZgUNREKB92sg5bdqOulwkEU579qdTgyagvyR-zvm6k9EyBEVI"})
                            .then(function (currentToken) {
                                console.log(currentToken);

                                if (currentToken) {
                                    sendTokenToServer(currentToken);
                                } else {
                                    console.warn('Не удалось получить токен.');
                                    setTokenSentToServer(false);
                                }
                            })
                            .catch(function (err) {
                                console.warn('При получении токена произошла ошибка.', err);
                                setTokenSentToServer(false);
                            });
            // })}
    })
    .catch(function (err) {
        console.warn('Не удалось получить разрешение на показ уведомлений.', err);
    });
}

// отправка ID на сервер
function sendTokenToServer(currentToken) {
    if (!isTokenSentToServer(currentToken)) {
        console.log('Отправка токена на сервер...');

        var url = ''; // адрес скрипта на сервере который сохраняет ID устройства
        $.post(url, {
            token: currentToken
        });

        setTokenSentToServer(currentToken);
    } else {
        console.log('Токен уже отправлен на сервер.');
    }
}

// используем localStorage для отметки того,
// что пользователь уже подписался на уведомления
function isTokenSentToServer(currentToken) {
    return window.localStorage.getItem('sentFirebaseMessagingToken') == currentToken;
}

function setTokenSentToServer(currentToken) {
    window.localStorage.setItem(
        'sentFirebaseMessagingToken',
        currentToken ? currentToken : ''
    );
}
