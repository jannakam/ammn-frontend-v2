"use client";

import React from "react";

const StackedCards = () => {
  const items = [
    {
      title: "بوك من غير بنوك",
      subtitle: "Pay Now, Transfer Later!",
      description:
        "A wallet for the modern age. Spend money, manage accounts, and skip the bank—because you deserve financial freedom on your terms.",
      button: "Explore the Wallet",
    },
    {
      title: "قطية",
      subtitle: "Budget as a Team!",
      description:
        "Planning a trip or buying a gift for a mutual friend? Create a joint expenses account and simplify managing group finances.",
      button: "Start Budgeting",
    },
    {
      title: "سلفني",
      subtitle: "Friendship Meets Accountability!",
      description:
        "Track loans with friends, enforce agreements, and manage repayments responsibly—because good friends deserve clarity and fairness.",
      button: "Start Now",
    },
  ];

  return (
    <div className="stacked-cards">
      {items.map((item, index) => (
        <div key={index} className="stacked-card">
          <h1 className="text-xl font-bold text-foreground">{item.title}</h1>
          <h3 className="text-lg font-semibold text-background mt-2">
            {item.subtitle}
          </h3>
          <p className="text-muted-foreground mt-4">{item.description}</p>
          <button className="mt-6 bg-secondary/50 text-foreground px-4 py-2 rounded-md shadow-sm hover:bg-accent-hover transition">
            {item.button}
          </button>
        </div>
      ))}
    </div>
  );
};

export default StackedCards;
