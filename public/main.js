const BASE_URL = "";

const debugOut = document.getElementById("debugOut");
function logDebug(obj) {
  debugOut.textContent = typeof obj === "string" ? obj : JSON.stringify(obj, null, 2);
}

function getToken() {
  return localStorage.getItem("token");
}

async function api(path, { method = "GET", body } = {}) {
  const token = getToken();

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    body: body ? JSON.stringify(body) : undefined
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message = data.message || `Request failed: ${res.status}`;
    throw new Error(message);
  }
  return data;
}

// Register
document.getElementById("btnRegister").addEventListener("click", async () => {
  try {
    const username = document.getElementById("regUsername").value.trim();
    const email = document.getElementById("regEmail").value.trim();
    const password = document.getElementById("regPassword").value;

    const data = await api("/api/auth/register", {
      method: "POST",
      body: { username, email, password }
    });

    // Auto store token
    if (data.token) localStorage.setItem("token", data.token);
    logDebug(data);
    alert("Registered (and token saved).");
  } catch (e) {
    logDebug({ error: e.message });
    alert(e.message);
  }
});

// Login
document.getElementById("btnLogin").addEventListener("click", async () => {
  try {
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;

    const data = await api("/api/auth/login", {
      method: "POST",
      body: { email, password }
    });

    localStorage.setItem("token", data.token);
    logDebug(data);
    alert("Logged in (token saved).");
  } catch (e) {
    logDebug({ error: e.message });
    alert(e.message);
  }
});

// Logout
document.getElementById("btnLogout").addEventListener("click", () => {
  localStorage.removeItem("token");
  logDebug("Logged out (token removed).");
  alert("Logged out.");
});

// Profile
document.getElementById("btnProfile").addEventListener("click", async () => {
  try {
    const data = await api("/api/users/profile");
    document.getElementById("profileOut").textContent = JSON.stringify(data, null, 2);
    logDebug(data);
  } catch (e) {
    logDebug({ error: e.message });
    alert(e.message);
  }
});

// Create Habit
document.getElementById("btnCreateHabit").addEventListener("click", async () => {
  try {
    const name = document.getElementById("habitName").value.trim();
    const description = document.getElementById("habitDesc").value.trim();

    const weeklyStatus = {
      mon: document.getElementById("mon").checked,
      tue: document.getElementById("tue").checked,
      wed: document.getElementById("wed").checked,
      thu: document.getElementById("thu").checked,
      fri: document.getElementById("fri").checked,
      sat: document.getElementById("sat").checked,
      sun: document.getElementById("sun").checked
    };

    const data = await api("/api/habits", {
      method: "POST",
      body: { name, description, weeklyStatus }
    });

    logDebug(data);
    alert("Habit created.");
  } catch (e) {
    logDebug({ error: e.message });
    alert(e.message);
  }
});

// Load Habits
document.getElementById("btnLoadHabits").addEventListener("click", async () => {
  try {
    const data = await api("/api/habits");
    const container = document.getElementById("habitsOut");
    container.innerHTML = "";

    for (const h of data.habits || []) {
      const div = document.createElement("div");
      div.className = "habit";
      div.innerHTML = `
        <strong>${escapeHtml(h.name)}</strong>
        <div class="muted">${escapeHtml(h.description || "")}</div>
        <div class="muted">Created: ${new Date(h.createdAt).toLocaleString()}</div>
        <div class="muted">Weekly: ${formatWeekly(h.weeklyStatus)}</div>
      `;
      container.appendChild(div);
    }

    logDebug(data);
  } catch (e) {
    logDebug({ error: e.message });
    alert(e.message);
  }
});

// Quote
document.getElementById("btnQuote").addEventListener("click", async () => {
  try {
    const data = await api("/api/external/quote");
    document.getElementById("quoteOut").textContent = JSON.stringify(data, null, 2);
    logDebug(data);
  } catch (e) {
    logDebug({ error: e.message });
    alert(e.message);
  }
});

function formatWeekly(ws) {
  if (!ws) return "-";
  const map = { mon: "Mon", tue: "Tue", wed: "Wed", thu: "Thu", fri: "Fri", sat: "Sat", sun: "Sun" };
  const done = Object.entries(ws).filter(([, v]) => v).map(([k]) => map[k]);
  return done.length ? done.join(", ") : "none";
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (m) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[m]));
}