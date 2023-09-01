importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

// Инициализация Firebase в сервисном работнике
var firebaseConfig = {
  // Ваш конфигурационный объект Firebase
  // Здесь должны содержаться ваши ключи, токены и т.д.
  apiKey: "AIzaSyDQuF0_5D_uNL9Cg5AOAktG_LIuTNEirUk",
  authDomain: "push-api-f23f9.firebaseapp.com",
  projectId: "push-api-f23f9",
  storageBucket: "push-api-f23f9.appspot.com",
  messagingSenderId: "386514831306",
  appId: "1:386514831306:web:3bc7a921de80dd1a33b133",
  measurementId: "G-51B86SQVYC"
};
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// Обработка приема уведомления в фоновом режиме
messaging.setBackgroundMessageHandler(function(payload) {
  console.log('Получено уведомление в фоновом режиме:', payload);

  // Тут вы можете отобразить уведомление на рабочем столе или выполнить другие действия
});
