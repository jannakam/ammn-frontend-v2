"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { baseUrl, getHeaders } from "./config";
import { deleteToken, setToken } from "./token";

export async function login(data) {
  try {
    const response = await fetch(`${baseUrl}/auth/login`, {
      method: "POST",
      headers: await getHeaders({ auth: false }),
      body: JSON.stringify(data),
    });
    const isJson = response.headers
      .get("content-type")
      ?.includes("application/json");
    if (!response.ok) {
      throw new Error("Invalid or empty response from server.");
    } else if (!isJson) {
      ("no response");
    }

    const { token } = await response.json();
    await setToken(token);
    return true;
  } catch (error) {
    console.error("Signup Error:", error);
    return false;
  }
}
export async function signup(data) {
  try {
    const response = await fetch(`${baseUrl}/auth/signup`, {
      method: "POST",
      headers: await getHeaders({ auth: false }),
      body: JSON.stringify(data),
    });

    // Check if the response is OK and contains JSON
    const isJson = response.headers
      .get("content-type")
      ?.includes("application/json");
    if (!response.ok || !isJson) {
      throw new Error("Invalid or empty response from server.");
    }

    const { token } = await response.json();
    await setToken(token);
    return true;
  } catch (error) {
    console.error("Signup Error:", error);
    return false;
  }
}

export async function logout() {
  await deleteToken();
  redirect("/");
}
