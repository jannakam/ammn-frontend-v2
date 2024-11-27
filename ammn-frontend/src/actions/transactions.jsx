"use server";

import { revalidatePath } from "next/cache";
import { baseUrl, getHeaders } from "./config";

export const myTransactions = async () => {
  const response = await fetch(`${baseUrl}/wallet/transactions`, {
    method: "GET",
    headers: await getHeaders(),
  });
  const transactions = await response.json();
  return transactions;
};

export const depositMoney = async (amount) => {
  try {
    const response = await fetch(`${baseUrl}/wallet/transactions/deposit`, {
      method: "PUT",
      headers: await getHeaders(),
      body: JSON.stringify(amount),
    });

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/transactions");
    return response.ok;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const withdrawMoney = async (amount) => {
  try {
    const response = await fetch(`${baseUrl}/wallet/transactions/withdraw`, {
      method: "PUT",
      headers: await getHeaders(),
      body: JSON.stringify(amount),
    });

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/transactions");
    return response.ok;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const transfer = async (formData) => {
  const userData = Object.fromEntries(formData);

  try {
    const response = await fetch(`${baseUrl}/wallet/transactions/transfer`, {
      method: "POST",
      headers: await getHeaders(),
      body: JSON.stringify(userData),
    });

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/transactions");
    revalidatePath("/users");
    return response.ok;
  } catch (error) {
    console.error(error);
    return false;
  }
};
export const salifny = async (formData) => {
  const userData = Object.fromEntries(formData);

  try {
    const response = await fetch(`${baseUrl}/wallet/transactions/salfni`, {
      method: "POST",
      headers: await getHeaders(),
      body: JSON.stringify(userData),
    });

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/transactions");
    revalidatePath("/users");
    return response.ok;
  } catch (error) {
    console.error(error);
    return false;
  }
};
export const takeFundsfromGityaAccount = async (formData) => {
  const userData = Object.fromEntries(formData);
  try {
    const response = await fetch(
      `${baseUrl}/wallet/takeFundsfromGityaAccount`,
      {
        method: "PUT",
        headers: await getHeaders(),
        body: JSON.stringify(userData),
      }
    );

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/transactions");
    revalidatePath("/users");
    return response.ok;
  } catch (error) {
    console.error(error);
    return false;
  }
};
export const addFundsToGityaAccount = async (formData) => {
  const userData = Object.fromEntries(formData);
  try {
    const response = await fetch(`${baseUrl}/wallet/addFundsToGityaAccount`, {
      method: "PUT",
      headers: await getHeaders(),
      body: JSON.stringify(userData),
    });

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/transactions");
    revalidatePath("/users");
    return response.ok;
  } catch (error) {
    console.error(error);
    return false;
  }
};
