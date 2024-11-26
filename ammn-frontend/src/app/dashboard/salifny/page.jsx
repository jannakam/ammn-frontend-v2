"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { defineStepper } from "@stepperize/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";


import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

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
  { id: "complete", title: "Complete", description: "Loan Request complete" }
);

export default function Page() {
  const stepper = useStepper();

  React.useEffect(() => {
    const fetchFriends = async () => {
      const response = await fetch("http://localhost:3000/dashboard/friends");
      const data = await response.json();
      const sortedFriends = data.sort((a, b) => a.name.localeCompare(b.name));
      setFriends(sortedFriends);
    };
    fetchFriends();
  }, []);

  const [friends, setFriends] = React.useState([]);
  const [selected, setSelected] = React.useState(null);
  const [totalBalance, setTotalBalance] = React.useState("");
  const [paymentMethod, setPaymentMethod] = React.useState("onePayment");
  const [installmentValue, setInstallmentValue] = React.useState(2);
  const [dueDate, setDueDate] = React.useState(null);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="space-y-6 p-6 border rounded-lg w-[450px]">
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
                          <DatePickerComponent
                            dueDate={dueDate}
                            setDueDate={setDueDate}
                          />
                        ),
                        complete: () => (
                          <CompleteComponent
                            selected={selected}
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
            <Button onClick={stepper.reset}>Reset</Button>
          )}
        </div>
      </div>
    </div>
  );
}

const FriendsComponent = ({ friends, selected, setSelected, stepper }) => (
  <div className="grid gap-4 w-full">
    <h3 className="text-lg font-medium">Select a Friend</h3>
    <RadioGroup
      value={selected?.id || ""}
      onValueChange={(value) => {
        const friend = friends.find((f) => f.id === value);
        setSelected(friend);
      }}
    >
      {friends.map((friend) => (
        <div key={friend.id} className="flex items-center gap-2">
          <RadioGroupItem id={`friend-${friend.id}`} value={friend.id} />
          <Label htmlFor={`friend-${friend.id}`}>{friend.name}</Label>
        </div>
      ))}
    </RadioGroup>
    <div className="flex justify-end">
      <Button
        onClick={() => {
          if (selected) stepper.next();
        }}
        disabled={!selected}
      >
        Next
      </Button>
    </div>
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
    {paymentMethod === "installment" && (
      <div className="grid gap-2">
        <Label className="text-sm font-medium">Choose Installments</Label>
        <RadioGroup
          value={installmentValue.toString()}
          onValueChange={(value) => setInstallmentValue(Number(value))}
        >
          <div className="flex gap-4">
            {[2, 3, 4].map((value) => (
              <div key={value} className="flex items-center gap-2">
                <RadioGroupItem id={`installment-${value}`} value={value.toString()} />
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
  selected,
  totalBalance,
  paymentMethod,
  installmentValue,
  dueDate,
}) => (
  <Card className="mt-4">
    <CardHeader>
      <CardTitle className="text-lg font-medium">Salifny Request Summary</CardTitle>
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
          <span>{dueDate ? format(dueDate, "PPP") : "No due date selected"}</span>
        </div>
      </div>
    </CardContent>
  </Card>
);
