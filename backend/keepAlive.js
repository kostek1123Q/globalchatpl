import fetch from "node-fetch";

const BACKEND_URL = "https://twoj-backend.onrender.com"; // <-- tutaj podmień na swój link z Render

function ping() {
  fetch(BACKEND_URL)
    .then((res) => {
      console.log(`[${new Date().toISOString()}] ✅ Ping OK: ${res.status}`);
    })
    .catch((err) => {
      console.error(`[${new Date().toISOString()}] ❌ Ping error:`, err.message);
    });
}

// uruchamianie co 10 minut (600000 ms)
setInterval(ping, 600000);

// pierwszy ping od razu po starcie
ping();
