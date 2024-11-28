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
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectGroup,
  SelectLabel,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

// Importing required functions
import { getAllUsers } from "@/actions/users";
import { salifny } from "@/actions/transactions";

// Stepper setup
const { useStepper, steps } = defineStepper(
  {
    id: "Friends",
    title: "Select a Friend",
    description: "Choose a friend from the list",
  },
  {
    id: "payment",
    title: "Choose Amount",
    description: "Enter loan amount and payment method",
  },
  {
    id: "Date",
    title: "Maturity Date",
    description: "Enter a due date for loan",
  }
  // {
  //   id: "complete",
  //   title: "Complete",
  //   description: "Loan request complete",
  // }
);

export default function Page() {
  const stepper = useStepper();
  const { toast } = useToast();

  // State for managing users, form data, and UI state
  const [users, setUsers] = React.useState([]);
  const [selectedUserEmail, setSelectedUserEmail] = React.useState("");
  const [totalBalance, setTotalBalance] = React.useState("");
  const [paymentMethod, setPaymentMethod] = React.useState("onePayment");
  const [installmentValue, setInstallmentValue] = React.useState(2);
  const [dueDate, setDueDate] = React.useState(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [showSummary, setShowSummary] = React.useState(false);


  // Fetch all users on component mount
  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await getAllUsers();
        const sortedUsers = fetchedUsers.sort((a, b) =>
          a.firstName.localeCompare(b.firstName)
        );
        setUsers(sortedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Handle form submission
  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("email", selectedUserEmail);
      formData.append("amount", totalBalance);
  
      const success = await salifny(formData);
  
      if (success) {
        toast({
          title: "Success",
          description: "Transaction completed successfully!",
          variant: "default",
        });
        stepper.reset();
        setSelectedUserEmail("");
        setTotalBalance("");
        setDueDate(null);
      } else {
        toast({
          title: "Transaction Failed",
          description: "Transaction failed. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error completing transaction:", error);
      toast({
        title: "Error",
        description: "An error occurred while completing the transaction.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[38rem] max-h-[38rem] w-full overflow-scroll p-6">
      <h2 className="text-2xl font-bold mb-4">Salifny</h2>
      {!showSummary ? (
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
                      className="flex size-10 items-center justify-center rounded-full"
                      onClick={() => stepper.goTo(step.id)}
                    >
                      {index + 1}
                    </Button>
                    <span className="text-sm font-medium">{step.title}</span>
                  </li>
                  <div className="flex gap-4">
                    {index < array.length - 1 && (
                      <Separator
                        orientation="vertical"
                        className={`w-[1px] h-full ${
                          index < stepper.current.index
                            ? "bg-primary"
                            : "bg-muted"
                        }`}
                      />
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
                          // complete: () => (
                          //   <CompleteComponent
                          //     selectedUserEmail={selectedUserEmail}
                          //     totalBalance={totalBalance}
                          //     paymentMethod={paymentMethod}
                          //     installmentValue={installmentValue}
                          //     dueDate={dueDate}
                          //   />
                          // ),
                        })}
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </ol>
          </nav>
          <div className="space-y-4">
            {/* {!stepper.isLast ? ( */}
            <div className="flex justify-end gap-4">
              <Button
                variant="secondary"
                onClick={stepper.prev}
                disabled={stepper.isFirst}
              >
                Back
              </Button>
              <Button
                onClick={() => {
                  setShowSummary(true);
                  stepper.next();
                }}
              >
                Next
              </Button>
            </div>
            {/* ) : (
              // <Button onClick={handleSubmit} disabled={isSubmitting}>
              //   {isSubmitting ? "Processing..." : "Complete Transaction"}
              // </Button>
              <h3>Completed</h3>
            )} */}
          </div>
        </div>
      ) : (
        <>
          <CompleteComponent
            selectedUserEmail={selectedUserEmail}
            totalBalance={totalBalance}
            paymentMethod={paymentMethod}
            installmentValue={installmentValue}
            dueDate={dueDate}
          />
          <div style={{ marginTop: "20px" }}>
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? "Processing..." : "Complete Transaction"}
            </Button>
          </div>
        </>
      )}
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
    <Select onValueChange={setSelectedUserEmail}>
      <SelectTrigger>
        <SelectValue placeholder="Select a user..." />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Friends</SelectLabel>
          {users.map((user) => (
            <SelectItem key={user.id} value={user.email}>
              {`${user.firstName} ${user.lastName}`}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
    <Button
      onClick={() => selectedUserEmail && stepper.next()}
      disabled={!selectedUserEmail}
      className="w-1/4 justify-self-end"
    >
      Next
    </Button>
  </div>
);

const PaymentComponent = ({
  totalBalance,
  setTotalBalance,
  paymentMethod,
  setPaymentMethod,
  installmentValue,
  setInstallmentValue,
}) => (
  <div className="grid gap-4">
    {/* Input for entering amount */}
    <div className="grid gap-2">
      <Label htmlFor="total-balance" className="text-sm font-medium">
        Add Amount
      </Label>
      <Input
        id="total-balance"
        value={totalBalance}
        onChange={(e) => setTotalBalance(e.target.value)}
        placeholder="Enter total balance"
        className="w-full"
      />
    </div>

    {/* Payment Method Selection */}
    <div className="grid gap-2">
      <Label className="text-sm font-medium">Choose Payment Method</Label>
      <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <RadioGroupItem id="onePayment" value="onePayment" />
            <Label htmlFor="onePayment">One Payment</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem id="installment" value="installment" />
            <Label htmlFor="installment">Installments</Label>
          </div>
        </div>
      </RadioGroup>
    </div>

    {/* Installment Options */}
    {paymentMethod === "installment" && (
      <div className="grid gap-2">
        <Label className="text-sm font-medium">Choose Installments</Label>
        <RadioGroup
          value={installmentValue.toString()}
          onValueChange={(value) => setInstallmentValue(Number(value))}
        >
          <div className="flex gap-4">
            {[2, 3, 4, 5].map((value) => (
              <div key={value} className="flex items-center gap-2">
                <RadioGroupItem
                  id={`installment-${value}`}
                  value={value.toString()}
                />
                <Label htmlFor={`installment-${value}`}>{value} months</Label>
              </div>
            ))}
          </div>
        </RadioGroup>
      </div>
    )}
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
  selectedUserEmail,
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
        {/* Friend Email */}
        <div className="flex justify-between">
          <span className="font-semibold">Friend:</span>
          <span>{selectedUserEmail || "Not selected"}</span>
        </div>

        {/* Payment Method */}
        <div className="flex justify-between">
          <span className="font-semibold">Payment Method:</span>
          <span>
            {paymentMethod === "onePayment" ? "One Payment" : "Installments"}
          </span>
        </div>

        {/* Installments (if applicable) */}
        {paymentMethod === "installment" && (
          <div className="flex justify-between">
            <span className="font-semibold">Installments:</span>
            <span>{installmentValue} months</span>
          </div>
        )}

        {/* Loan Amount */}
        <div className="flex justify-between">
          <span className="font-semibold">Loan Amount:</span>
          <span>{totalBalance || "Not provided"}</span>
        </div>

        {/* Due Date */}
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
