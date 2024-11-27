"use server";
import { baseUrl, getHeaders } from "./config";
import { revalidatePath } from "next/cache";

export const getAllUsers = async () => {
  try {
    const headers = await getHeaders();
    const response = await fetch(`${baseUrl}/users`, {
      method: "GET",
      headers,
    });

    const users = await response.json();
    return users;
  } catch (error) {
    console.error("Error in getAllUsers:", error);
    throw error;
  }
};
export const getWallet = async () => {
  try {
    const response = await fetch(`${baseUrl}/wallet`, {
      method: "GET",
      headers: await getHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Error fetching wallet: ${response.statusText}`);
    }

    const wallet = await response.json();
    return wallet;
  } catch (error) {
    console.error("Error in getWallet:", error);
    throw error;
  }
};

export const findUserByEmail = async (email) =>
  fetch(`${baseUrl}/mini-project/api/auth/find-user`, {
    method: "POST",
    headers: await getHeaders(),
    body: JSON.stringify({ email }),
  }).then((response) =>
    response.ok
      ? response.json()
      : Promise.reject(`Error finding user: ${response.statusText}`)
  );

export const createGityaAccount = async (accountData) => {
  const response = await fetch(
    `${baseUrl}/mini-project/api/auth/create-account`,
    {
      method: "POST",
      headers: await getHeaders(),
      body: JSON.stringify(accountData),
    }
  );

  if (!response.ok) {
    return Promise.reject(`Error creating account: ${response.statusText}`);
  }
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/transactions");
  revalidatePath("/users");
  return response.json();
};
