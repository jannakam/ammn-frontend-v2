"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { defineStepper } from "@stepperize/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// Importing required functions
import { getAllUsers } from "@/actions/users";
import { salifny } from "@/actions/transactions";

const { useStepper, steps } = defineStepper(
  {
    id: "Friends",
    title: "Select a Friend",
    description: "Choose a Friend From the List",
  },
  {
    id: "payment",
    title: "Choose Amount",
    description: "Enter Loan Amount and Payment method",
  },
  {
    id: "Date",
    title: "Maturity Date",
    description: "Enter a Due Date for Loan",
  },
  {
    id: "complete",
    title: "Complete",
    description: "Loan Request complete",
  }
);

export default function Page() {
  const stepper = useStepper();

  // State for managing users, form data, and UI state
  const [users, setUsers] = React.useState([]);
  const [selectedUserEmail, setSelectedUserEmail] = React.useState("");
  const [totalBalance, setTotalBalance] = React.useState("");
  const [paymentMethod, setPaymentMethod] = React.useState("onePayment");
  const [installmentValue, setInstallmentValue] = React.useState(2);
  const [dueDate, setDueDate] = React.useState(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Fetch all users on component mount
  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await getAllUsers(); // Fetch all users
        const sortedUsers = fetchedUsers.sort((a, b) =>
          a.firstName.localeCompare(b.firstName)
        ); // Sort users alphabetically by first name
        setUsers(sortedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Handle form submission
  const handleSubmit = async () => {
    if (!selectedUserEmail || !totalBalance) {
      alert("Please select a user and enter an amount.");
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("email", selectedUserEmail); // Add email to FormData
      formData.append("amount", totalBalance); // Add amount to FormData

      const success = await salifny(formData); // Call salifny function with FormData

      if (success) {
        alert("Transaction completed successfully!");
        stepper.reset(); // Reset the stepper after success
        setSelectedUserEmail(""); // Reset selected user
        setTotalBalance(""); // Reset amount
        setDueDate(null); // Reset due date
      } else {
        alert("Transaction failed. Please try again.");
      }
    } catch (error) {
      console.error("Error completing transaction:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[38rem] max-h-[38rem] w-full overflow-scroll p-6">
      <h2 className="text-2xl font-bold mb-4">Salifny</h2>
      <div className="space-y-6 p-6 border rounded-lg w-auto">
        <div className="flex justify-between">
          <h2 className="text-lg font-medium">Checkout</h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Step {stepper.current.index + 1} of {steps.length}
            </span>
          </div>
        </div>
        <nav aria-label="Checkout Steps" className="group my-4">
          <ol className="flex flex-col gap-2" aria-orientation="vertical">
            {stepper.all.map((step, index, array) => (
              <React.Fragment key={step.id}>
                <li className="flex items-center gap-4 flex-shrink-0">
                  <Button
                    type="button"
                    role="tab"
                    variant={
                      index <= stepper.current.index ? "default" : "secondary"
                    }
                    aria-current={
                      stepper.current.id === step.id ? "step" : undefined
                    }
                    aria-posinset={index + 1}
                    aria-setsize={steps.length}
                    aria-selected={stepper.current.id === step.id}
                    className="flex size-10 items-center justify-center rounded-full"
                    onClick={() => stepper.goTo(step.id)}
                  >
                    {index + 1}
                  </Button>
                  <span className="text-sm font-medium">{step.title}</span>
                </li>
                <div className="flex gap-4">
                  {index < array.length - 1 && (
                    <div
                      className="flex justify-center"
                      style={{ paddingInlineStart: "1.25rem" }}
                    >
                      <Separator
                        orientation="vertical"
                        className={`w-[1px] h-full ${
                          index < stepper.current.index
                            ? "bg-primary"
                            : "bg-muted"
                        }`}
                      />
                    </div>
                  )}
                  <div className="flex-1 my-4">
                    {stepper.current.id === step.id &&
                      stepper.switch({
                        Friends: () => (
                          <FriendsComponent
                            users={users}
                            selectedUserEmail={selectedUserEmail}
                            setSelectedUserEmail={setSelectedUserEmail}
                            stepper={stepper}
                          />
                        ),
                        payment: () => (
                          <PaymentComponent
                            totalBalance={totalBalance}
                            setTotalBalance={setTotalBalance}
                            paymentMethod={paymentMethod}
                            setPaymentMethod={setPaymentMethod}
                            installmentValue={installmentValue}
                            setInstallmentValue={setInstallmentValue}
                          />
                        ),
                        Date: () => (
                          <DatePickerComponent
                            dueDate={dueDate}
                            setDueDate={setDueDate}
                          />
                        ),
                        complete: () => (
                          <CompleteComponent
                            selectedUserEmail={selectedUserEmail}
                            totalBalance={totalBalance}
                            paymentMethod={paymentMethod}
                            installmentValue={installmentValue}
                            dueDate={dueDate}
                          />
                        ),
                      })}
                  </div>
                </div>
              </React.Fragment>
            ))}
          </ol>
        </nav>
        <div className="space-y-4">
          {!stepper.isLast ? (
            <div className="flex justify-end gap-4">
              <Button
                variant="secondary"
                onClick={stepper.prev}
                disabled={stepper.isFirst}
              >
                Back
              </Button>
              <Button onClick={stepper.next}>
                {stepper.isLast ? "Complete" : "Next"}
              </Button>
            </div>
          ) : (
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? "Processing..." : "Complete Transaction"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

const FriendsComponent = ({
  users,
  selectedUserEmail,
  setSelectedUserEmail,
  stepper,
}) => (
  <div className="grid gap-4 w-full">
    <h3 className="text-lg font-medium">Select a User</h3>
    {/* Dropdown for selecting users */}
    <Label htmlFor="user-select" className="text-sm font-medium">
      Choose a User:
    </Label>
    <select
      id="user-select"
      value={selectedUserEmail || ""}
      onChange={(e) => setSelectedUserEmail(e.target.value)}
      className="p-2 border rounded-md w-full"
    >
      <option value="" disabled>
        Select a user...
      </option>
      {users.map((user) => (
        <option key={user.id} value={user.email}>
          {`${user.firstName} ${user.lastName}`}
        </option>
      ))}
    </select>

    {/* Next button */}
    <div className="flex justify-end mt-4">
      <Button
        onClick={() => selectedUserEmail && stepper.next()}
        disabled={!selectedUserEmail}
      >
        Next
      </Button>
    </div>
  </div>
);

const PaymentComponent = ({ totalBalance, setTotalBalance }) => (
  <div className="grid gap-4">
    {/* Input for entering amount */}
    <Label htmlFor="amount-input" className="text-sm font-medium mt-4">
      Enter Amount:
    </Label>
    <Input
      id="amount-input"
      type="number"
      placeholder="Enter amount"
      value={totalBalance}
      onChange={(e) => setTotalBalance(e.target.value)}
      className="w-full"
    />
  </div>
);
const DatePickerComponent = ({ dueDate, setDueDate }) => (
  <Popover>
    <PopoverTrigger asChild>
      <Button
        variant="outline"
        className={cn(
          "w-[280px] justify-start text-left font-normal",
          !dueDate && "text-muted-foreground"
        )}
      >
        <CalendarIcon className="mr-2" />
        {dueDate ? format(dueDate, "PPP") : "Pick a date"}
      </Button>
    </PopoverTrigger>
    <PopoverContent
      className="w-auto p-0"
      style={{
        animation: "none", // Removes sliding animations
      }}
    >
      <Calendar
        mode="single"
        selected={dueDate}
        onSelect={setDueDate}
        initialFocus
      />
    </PopoverContent>
  </Popover>
);

const CompleteComponent = ({
  selected,
  totalBalance,
  paymentMethod,
  installmentValue,
  dueDate,
}) => (
  <Card className="mt-4">
    <CardHeader>
      <CardTitle className="text-lg font-medium">
        Salifny Request Summary
      </CardTitle>
      <CardDescription>Review your loan request details</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <span className="font-semibold">Friend:</span>
          <span>{selected?.name || "Not selected"}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Payment Method:</span>
          <span>{paymentMethod}</span>
        </div>
        {paymentMethod === "installment" && (
          <div className="flex justify-between">
            <span className="font-semibold">Installments:</span>
            <span>{installmentValue} months</span>
          </div>
        )}
        <div className="flex justify-between">
          <span className="font-semibold">Loan Amount:</span>
          <span>{totalBalance || "Not provided"}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Due Date:</span>
          <span>
            {dueDate ? format(dueDate, "PPP") : "No due date selected"}
          </span>
        </div>
      </div>
    </CardContent>
  </Card>
);
