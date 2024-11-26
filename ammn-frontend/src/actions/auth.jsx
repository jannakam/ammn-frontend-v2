"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { baseUrl, getHeaders } from "./config";
import { deleteToken, setToken } from "./token";

export async function login(formData) {
  try {
    const response = await fetch(`${baseUrl}/auth/login`, {
      method: "POST",
      headers: await getHeaders(),
      body: JSON.stringify(formData),
    });
    const { token } = await response.json();
    await setToken(token);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
export async function signup(data) {
  try {
    const response = await fetch(`${baseUrl}/auth/signup`, {
      method: "POST",
      headers: await getHeaders(),
      body: JSON.stringify(data),
    });
    console.log(formData);
    const { token } = await response.json();
    await setToken(token);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function logout() {
  await deleteToken();
  redirect('/');
}
