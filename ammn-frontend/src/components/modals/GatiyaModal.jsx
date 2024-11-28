"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { createGityaAccount, getAllUsers } from "@/actions/users";
import { addUsersToAccount } from "@/actions/transactions";

export default function GatiyaAccountModal() {
  const [accountName, setAccountName] = React.useState("");
  const [jointAccountBalance, setJointAccountBalance] = React.useState("");
  const [availableUsers, setAvailableUsers] = React.useState([]);
  const [selectedUsers, setSelectedUsers] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Fetch all users when the component mounts
  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await getAllUsers();
        setAvailableUsers(users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  // Function to handle account creation
  const handleCreateAccount = async () => {
    if (!accountName || !jointAccountBalance) {
      alert("Please provide both account name and amount.");
      return;
    }

    try {
      setIsSubmitting(true);
      const accountData = {
        accountName,
        jointAccountBalance: parseFloat(jointAccountBalance),
      };
      await createGityaAccount(accountData);
      setCurrentPage(2); // Move to the next page after creating the account
    } catch (error) {
      console.error("Error creating Gatiya account:", error);
      alert("Failed to create Gatiya account.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Function to add users to the created account
  const handleAddUsers = async () => {
    try {
      const addUserPromises = selectedUsers.map((user) => {
        return addUsersToAccount({
          email: user.email,
          jointAccountBalance,
        });
      });
      await Promise.all(addUserPromises);
      alert("All users added successfully!");
    } catch (error) {
      console.error("Error adding users:", error);
      alert("Failed to add some users.");
    }
  };

  // Function to move a user from available to selected
  const selectUser = (user) => {
    setSelectedUsers([...selectedUsers, user]);
    setAvailableUsers(availableUsers.filter((u) => u.id !== user.id));
  };

  return (
    <Dialog open>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {currentPage === 1 ? "Create Gatiya Account" : "Add Users"}
          </DialogTitle>
        </DialogHeader>

        {currentPage === 1 && (
          <div className="space-y-4">
            <Input
              label="Account Name"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              placeholder="Enter Account Name"
            />
            <Input
              label="Amount"
              type="number"
              value={jointAccountBalance}
              onChange={(e) => setJointAccountBalance(e.target.value)}
              placeholder="Enter Amount"
            />
            <Button onClick={handleCreateAccount} disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Account"}
            </Button>
          </div>
        )}

        {currentPage === 2 && (
          <div className="space-y-4">
            <h3>Select Users to Add</h3>
            <div className="flex flex-col space-y-2">
              {availableUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex justify-between items-center"
                >
                  <span>{`${user.firstName} ${user.lastName}`}</span>
                  <Button onClick={() => selectUser(user)}>Add</Button>
                </div>
              ))}
            </div>
            <Button onClick={handleAddUsers}>Add Users to Account</Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
