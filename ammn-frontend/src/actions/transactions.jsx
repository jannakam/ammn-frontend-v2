"use server";

import { revalidatePath } from "next/cache";
import { baseUrl, getHeaders } from "./config";

export const myTransactions = async () => {
  const response = await fetch(`${baseUrl}/mini-project/api/transactions/my`, {
    headers: await getHeaders(),
  });
  const transactions = await response.json();
  return transactions.reverse();
};

export const depositMoney = async (formData) => {
  const userData = Object.fromEntries(formData);

  try {
    const response = await fetch(
      `${baseUrl}/mini-project/api/transactions/deposit`,
      {
        method: "PUT",
        headers: await getHeaders(),
        body: JSON.stringify(userData),
      }
    );

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/transactions");
    return response.ok;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const withdrawMoney = async (formData) => {
  const userData = Object.fromEntries(formData);

  try {
    const response = await fetch(
      `${baseUrl}/mini-project/api/transactions/withdraw`,
      {
        method: "PUT",
        headers: await getHeaders(),
        body: JSON.stringify(userData),
      }
    );

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/transactions");
    return response.ok;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const transfer = async (formData, username) => {
  const userData = Object.fromEntries(formData);

  try {
    const response = await fetch(
      `${baseUrl}/mini-project/api/transactions/transfer/${username}`,
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

export const salifny = async (formData, username) => {
  const userData = Object.fromEntries(formData);

  try {
    const response = await fetch(
      `${baseUrl}/mini-project/api/transactions/transfer/${username}`,
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
