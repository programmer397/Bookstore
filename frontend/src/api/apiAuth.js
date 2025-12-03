export async function apiLogin(data) {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const loginmessage = await res.json();

  return loginmessage;
}

export async function apiLogout() {
  const res = await fetch("/api/auth/logout", { method: "POST" });
  const logoutResult = await res.json();
  if (!res.ok) {
    throw new Error("Logout failed");
  }
  return logoutResult;
}

export async function apiCreateAccount(data) {
  const res = await fetch("/api/auth/createaccount", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const result = await res.json();

  return result;
}
