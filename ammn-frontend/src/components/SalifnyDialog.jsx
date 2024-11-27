import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { getAllUsers } from "@/actions/users";
import { salifny, transfer } from "@/actions/transactions"; // Import the transfer function

export function SalifniDialog() {
  const [users, setUsers] = useState([]); // State to store fetched users
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [query, setQuery] = useState(""); // Search query for filtering users
  const [transferData, setTransferData] = useState({
    amount: "",
    email: "",
  });

  // Fetch users when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const fetchedUsers = await getAllUsers();
        setUsers(fetchedUsers); // Set fetched users to state
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Filter friends based on the search query
  const filteredFriends = users.filter(
    (user) =>
      user.firstName.toLowerCase().includes(query.toLowerCase()) ||
      user.lastName.toLowerCase().includes(query.toLowerCase()) ||
      user.email.toLowerCase().includes(query.toLowerCase())
  );

  // Handle changes in the transfer data
  const handleTransferChange = (field, value) => {
    setTransferData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle form submission
  const handleTransferSubmit = async () => {
    if (!transferData.amount || !transferData.email) {
      alert("Please fill in all fields before transferring.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("amount", transferData.amount);
      formData.append("email", transferData.email);

      const success = await salifny(formData); // Call the imported transfer function

      if (success) {
        alert("Transfer successful!");
        console.log("Transfer Data:", Object.fromEntries(formData));
      } else {
        alert("Transfer failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during transfer:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="outline">Transfer</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Transfer Funds</DialogTitle>
          <DialogDescription>Transfer funds between accounts</DialogDescription>
        </DialogHeader>

        {/* Recipient Dropdown */}
        <Label htmlFor="recipient" className="mt-4">
          Recipient
        </Label>
        <Input
          type="text"
          placeholder="Search friends..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="mb-2"
        />
        <Select
          onValueChange={(value) => {
            const selectedUser = users.find(
              (user) => user.id === parseInt(value)
            );
            handleTransferChange("email", selectedUser?.email || "");
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Friend" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup label="Friends">
              {filteredFriends.length > 0 ? (
                filteredFriends.map((friend) => (
                  <SelectItem key={friend.id} value={friend.id}>
                    {friend.firstName + " " + friend.lastName}
                  </SelectItem>
                ))
              ) : (
                <div className="p-2 text-muted-foreground">
                  No friends found.
                </div>
              )}
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* Amount Input */}
        <Label htmlFor="amount" className="mt-4">
          Amount
        </Label>
        <Input
          type="number"
          id="amount"
          placeholder="Enter amount"
          value={transferData.amount}
          onChange={(e) => handleTransferChange("amount", e.target.value)}
        />

        {/* Action Buttons */}
        <div className="flex flex-row justify-between mt-4">
          <Button variant="outline">Cancel</Button>
          <Button variant="primary" onClick={handleTransferSubmit}>
            Transfer
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
