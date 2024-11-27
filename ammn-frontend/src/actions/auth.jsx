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
  const formData = new FormData();
  formData.append("First Name", data.firstName);
  formData.append("Last Name", data.lastName);
  formData.append("Email", data.email);
  formData.append("Password", data.password);
  formData.append("Civil Id", data.civilId);
  formData.append("Phone Number", data.phoneNumber);

  try {
    const response = await fetch(`${baseUrl}/auth/signup`, {
      method: "POST",
      body: formData,
    });

    const { token } = await response.json();
    await setToken(token);
    revalidatePath("/users");
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

// export async function logout() {
//   await deleteToken();
//   redirect('/');
// }
