// Service Worker'ı kayıt ettirme
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js")
    .then(function (registration) {
      console.log("Service Worker registered with scope:", registration.scope);
    })
    .catch(function (error) {
      console.log("Service Worker registration failed:", error);
    });
}

// Bildirim izni isteme
if (Notification.permission !== "granted") {
  Notification.requestPermission().then(function (permission) {
    if (permission === "granted") {
      console.log("Bildirim izni verildi.");
    }
  });
}

function startTimer(minutes) {
  const duration = minutes * 60;
  const timerElement = document.getElementById("timer");
  let timeLeft = duration;

  // Tarayıcıda sayacı güncelleme
  const interval = setInterval(() => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerElement.textContent = `${minutes}:${
      seconds < 10 ? "0" + seconds : seconds
    }`;

    if (timeLeft <= 0) {
      clearInterval(interval);
      showNotification("Time is up!");
    } else {
      timeLeft--;
    }
  }, 1000);

  // Service Worker'a sayaç süresini gönderme
  if ("serviceWorker" in navigator && navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage({
      type: "START_TIMER",
      duration: duration,
    });
  }
}

function showNotification(message) {
  if (Notification.permission === "granted") {
    new Notification(message);
  } else {
    alert(message);
  }
}
