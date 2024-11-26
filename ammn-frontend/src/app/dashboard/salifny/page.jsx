"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
//import { Textarea } from "@/components/ui/textarea";
// import { defineStepper } from "@stepperize/react";
//import "./App.css";
//import "./styles/App.css";

//Date imports
// import { DayPicker } from "react-day-picker";
// import "react-day-picker/style.css";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState, useEffect } from "react";

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
  { id: "complete", title: "Complete", description: "Checkout complete" }
);

export default function page() {
  //Library imports
  const stepper = useStepper();

  //const [terms, setTerms] = useState(false);

  useEffect(() => {
    const fetchFriends = async () => {
      const response = await fetch("http://localhost:3000/dashboard/friends");
      const data = await response.json();
      // Sort alphabetically by name
      const sortedFriends = data.sort((a, b) => a.name.localeCompare(b.name));
      setFriends(sortedFriends);
    };
    fetchFriends();
  }, []);

  //1. display the friends lists
  const [friends, setFriends] = useState([]);

  const [selected, setSelected] = useState(null);
  //2. set balance and payment method (slider thingy)
  const [totalBalance, setTotalBalance] = useState(" ");
  const [paymentMethod, setPaymentMethod] = useState("onePayment");

  const [installmentValue, setInstallmentValue] = useState(2);
  const allowedInstallments = [2, 3, 4];

  const handleInstallmentChange = (e) => {
    setInstallmentValue(e.value);
  };

  //3. Set a Due date
  const [dueDate, SetDueDate] = useState(null);

  const handleDateSelect = (selectedDate) => {
    setDueDate(selectedDate);
  };


  //4. terms and conditions
  const [terms, setTerms] = useState(false);

  // Randomly generated terms and conditions preview
  const generateTerms = () => {
    const terms = [
      "Terms 1: User must repay the loan within 30 days.",
      "Terms 2: Late fees will apply if payment is delayed.",
      "Terms 3: The loan is non-transferable.",
      "Terms 4: Loan default may affect your credit score.",
    ];
    return terms[Math.floor(Math.random() * terms.length)];
  };

  return (
    <div className="space-y-6 p-6 border rounded-lg w-[450px]">
      <div className="flex justify-between">
        <h2 className="text-lg font-medium">Checkout</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            Step {stepper.current.index + 1} of {steps.length}
          </span>
          <div />
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
                    style={{
                      paddingInlineStart: "1.25rem",
                    }}
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
                          friends={friends}
                          selected={selected}
                          setSelected={setSelected}
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
                        <DateComponent date={dueDate} setDate={SetDueDate} />
                      ),
                      complete: () => (
                        <CompleteComponent
                          selected={selected}
                          totalBalance={totalBalance}
                          paymentMethod={paymentMethod}
                          installmentValue={installmentValue}
                          dueDate={dueDate}
                          terms={generateTerms()}
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
          <Button onClick={stepper.reset}>Reset</Button>
        )}
      </div>
    </div>
  );
}

const FriendsComponent = ({ friends, selected, setSelected, stepper }) => {
  //   const handleSelectFriend = (friend) => {
  //     setSelected(friend);
  //   };

  return (
    <div className="grid gap-4 w-full">
      {/* <div className="grid gap-2">
        <label htmlFor="name" className="text-sm font-medium text-start">
          Name
        </label>
        <Input id="name" placeholder="John Doe" className="w-full" />
      </div> */}

      {/* add a button to submit ? */}
      <h3 className="text-lg font-medium">Select a Friend</h3>

      {friends.length > 0 ? (
        <ul className="space-y-2">
          {friends.map((friend) => (
            <li key={friend.id} className="flex items-center gap-2">
              <input
                type="radio"
                id={`friend-${friend.id}`}
                name="selectedFriend"
                value={friend.id}
                onChange={() => setSelected(friend)}
                checked={selected?.id === friend.id}
                className="w-4 h-4"
              />
              <label
                htmlFor={`friend-${friend.id}`}
                className="text-sm font-medium"
              >
                {friend.name}
              </label>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-muted-foreground">No friends available.</p>
      )}

      <div className="flex justify-end">
        <Button
          onClick={() => {
            if (selected) {
              stepper.next();
            } else {
              alert("Please select a friend before proceeding.");
            }
          }}
          disabled={!selected}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

const PaymentComponent = ({
  totalBalance,
  setTotalBalance,
  paymentMethod,
  setPaymentMethod,
  installmentValue,
  setInstallmentValue,
}) => {
  const allowedInstallments = [2, 3, 4];

  return (
    <div className="grid gap-4">
      {/* Input for the total balance */}
      <div className="grid gap-2">
        <label
          htmlFor="total-balance"
          className="text-sm font-medium text-start"
        >
          Add Amount
        </label>
        <Input
          id="total-balance"
          value={totalBalance}
          onChange={(e) => setTotalBalance(e.target.value)}
          placeholder="Enter total balance of gatiya"
          className="w-full"
        />
      </div>

      {/* Payment method selection */}
      <div className="grid gap-2">
        <label className="text-sm font-medium text-start">
          Choose Payment Method
        </label>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <input
              type="radio"
              id="onePayment"
              name="paymentMethod"
              value="onePayment"
              checked={paymentMethod === "onePayment"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label htmlFor="onePayment" className="text-sm font-medium">
              One Payment
            </label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="radio"
              id="installment"
              name="paymentMethod"
              value="installment"
              checked={paymentMethod === "installment"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label htmlFor="installment" className="text-sm font-medium">
              Installments
            </label>
          </div>
        </div>
      </div>

      {/* Installment options */}
      {paymentMethod === "installment" && (
        <div className="grid gap-2">
          <label className="text-sm font-medium text-start">
            Choose Installment Type
          </label>
          <div className="flex gap-4">
            {allowedInstallments.map((installment) => (
              <div key={installment} className="flex items-center gap-2">
                <input
                  type="radio"
                  id={`installment-${installment}`}
                  name="installmentValue"
                  value={installment}
                  checked={installmentValue === installment}
                  onChange={(e) => setInstallmentValue(Number(e.target.value))}
                />
                <label
                  htmlFor={`installment-${installment}`}
                  className="text-sm font-medium"
                >
                  {installment} months
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// const DateComponent = ({ date, setDate }) => (
//   <Popover>
//     <PopoverTrigger asChild>
//       <Button
//         variant={"outline"}
//         className={cn(
//           "w-[280px] justify-start text-left font-normal",
//           !date && "text-muted-foreground"
//         )}
//       >
//         <CalendarIcon />
//         {date ? format(date, "PPP") : <span>Pick a date</span>}
//       </Button>
//     </PopoverTrigger>
//     <PopoverContent className="w-auto p-0">
//       <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
//     </PopoverContent>
//   </Popover>
// );

const DateComponent = () => {
  const [date, setDate] = useState(null);
  //const [duedate, setDueDate] = useState(null);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn("w-[280px] justify-start text-left font-normal", !date && "text-muted-foreground")}
        >
          <CalendarIcon />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

const CompleteComponent = ({
  selected,
  totalBalance,
  paymentMethod,
  installmentValue,
  dueDate,
}) => (
  <div className="py-4">
    <h3 className="text-lg font-medium">Salifny Request: </h3>
    <p>Friend: {selected?.name}</p>
    <p>Payment Method: {paymentMethod}</p>
    {paymentMethod === "installment" && <p>Installments: {installmentValue}</p>}
    <p>Loan Amount: {totalBalance}</p>
    <p>Due Date: {dueDate ? format(dueDate, "PPP") : "No due date selected"}</p>
    <p className="text-sm font-medium mt-4">Terms and Conditions:</p>
    {/* fix this later!!!!!!! */}
    {/* <p className="text-sm">{terms || "Default terms and conditions."}</p> */}
  </div>
);
