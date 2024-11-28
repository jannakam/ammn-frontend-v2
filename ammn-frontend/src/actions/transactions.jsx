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
export const joinGatiyaAccount = async (inviteCode) => {
  const data = { inviteCode: inviteCode };

  try {
    const response = await fetch(`${baseUrl}/users/join`, {
      method: "POST",
      headers: await getHeaders(),
      body: JSON.stringify(data), // Send the object as JSON
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || response.statusText);
    }

    const newGatiyaAccount = await response.json(); // Parse the response data
    return newGatiyaAccount; // Return the Gatiya account data
  } catch (error) {
    console.error("Error in joinGatiyaAccount:", error);
    throw error;
  }
};
export const salifnyReturned = async (id) => {
  const data = { id: id };
  console.log(data);
  try {
    const response = await fetch(`${baseUrl}/wallet/transactions/completed`, {
      method: "PUT",
      headers: await getHeaders(),
      body: JSON.stringify(data),
    });

    revalidatePath("/dashboard");
    // revalidatePath("/dashboard/transactions");
    return response.ok;
  } catch (error) {
    console.error(error);
    return false;
  }
};
export const addUsersToAccount = async (data) => {
  // const data = { };
  const { email, accountName } = data;
  const user = { email: email, accountName: accountName };
  console.log(data);
  try {
    const response = await fetch(`${baseUrl}/users/join`, {
      method: "POST",
      headers: await getHeaders(),
      body: JSON.stringify(user), // Send the object as JSON
    });

    // Parse the response data
  } catch (error) {
    console.error("Error in joinGatiyaAccount:", error);
    throw error;
  }
};
