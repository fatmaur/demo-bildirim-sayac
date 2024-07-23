self.addEventListener("install", function (event) {
  self.skipWaiting();
});

self.addEventListener("activate", function (event) {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  // Bildirime tıklanınca yapılacaklar
});

self.addEventListener("message", function (event) {
  if (event.data && event.data.type === "START_TIMER") {
    startTimer(event.data.duration);
  }
});

function startTimer(duration) {
  let timeLeft = duration;
  const interval = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      showNotification("Timer", {
        body: `Time left: ${Math.floor(timeLeft / 60)}:${timeLeft % 60}`,
        tag: "timer",
      });
    } else {
      showNotification("Timer", {
        body: "Time is up!",
        tag: "timer",
      });
      clearInterval(interval);
    }
  }, 1000);
}

function showNotification(title, options) {
  self.registration.showNotification(title, options);
}
