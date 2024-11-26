// "use client";
// import React from "react";
// import { useState, useEffect, useRef } from "react";
// import { Button } from "@/components/ui/button"
// import { InputText } from "primereact/inputtext";
// import { Slider } from "primereact/slider";
// import { Stepper } from "primereact/stepper";
// import { StepperPanel } from "primereact/stepperpanel";
// import { ListBox } from "primereact/listbox";

// import { Label } from "@/components/ui/label"
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"



// export default function Friends() {
//   //Person who needs the loan pov:
//   // Go to their user's list choose a friend then set the amount of money wanted and sends the request to the choosen friend

//   //!!! ADD the date thingy to choose the date where the loan will be payed 

//   //////////////////////////////////////

//   //1. display the friends lists

//   const [friends, setFriends] = useState([]);
//   const [selectedFriend, setSelectedFriend] = useState(null);

//   //by Library
//   const stepperRef = useRef(null);

//   useEffect(() => {
//     const fetchFriends = async () => {
//       const response = await fetch("http://localhost:3001/dashboard/friends");
//       const data = await response.json();
//       // Sort alphabetically by name
//       const sortedFriends = data.sort((a, b) => a.name.localeCompare(b.name));
//       setFriends(sortedFriends);
//     };
//     fetchFriends();
//   }, []);

//   //Library logic
//   const groupTemplate = (option) => {
//     return (
//       <div className="flex align-items-center gap-2">
//         <div>{option.label}</div>
//       </div>
//     );
//   };

//   // Organize friends into groups by the first letter of their names
//   const groupedFriends = friends.reduce((acc, friend) => {
//     const firstLetter = friend.name[0].toUpperCase();
//     const group = acc.find((g) => g.label === firstLetter);
//     if (group) {
//       group.items.push({ label: friend.name, value: friend.id });
//     } else {
//       acc.push({
//         label: firstLetter,
//         items: [{ label: friend.name, value: friend.id }],
//       });
//     }
//     return acc;
//   }, []);

//   //2. set balance and payment method (slider thingy)
//   const [totalBalance, setTotalBalance] = useState(" ");
//   const [paymentMethod, setPaymentMethod] = useState("onePayment");

//   //By library
//   //   const [value, setValue] = useState(2);
//   //   const allowedValues = [2, 3, 4];
//   const [installmentValue, setInstallmentValue] = useState(2);
//   const allowedInstallments = [2, 3, 4];

//   //By library
//   const handleChange = (e) => {
//     const nearestValue = allowedValues.reduce((prev, curr) =>
//       Math.abs(curr - e.value) < Math.abs(prev - e.value) ? curr : prev
//     );
//     setValue(nearestValue);
//   };

//   const handleInstallmentChange = (e) => {
//     setInstallmentValue(e.value); // Update the installment value
//   };

//   //3. terms and conditions
//   const [terms, setTerms] = useState(false);

//   // Randomly generated terms and conditions preview
//   const generateTerms = () => {
//     const terms = [
//       "Terms 1: User must repay the loan within 30 days.",
//       "Terms 2: Late fees will apply if payment is delayed.",
//       "Terms 3: The loan is non-transferable.",
//       "Terms 4: Loan default may affect your credit score.",
//     ];
//     return terms[Math.floor(Math.random() * terms.length)];
//   };

 
//   return (
//       <div className="flex flex-col justify-center items-center h-screen w-full">
//         <h1 className="text-2xl">SALIFNY</h1>

//         <div className="card">
//           <Stepper
//             ref={stepperRef}
//             style={{ flexBasis: "50rem" }}
//             orientation="vertical"
//           >
//             {/* Step 1: Select a Friend */}
//             <StepperPanel header="Select A Friend">
//               <div className="flex flex-column h-12rem">
//                 <div className="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">
//                   <div className="card flex justify-content-center">
//                     <ListBox
//                       value={selectedFriend}
//                       onChange={(e) => setSelectedFriend(e.value)}
//                       options={[] /* Populate with your friends list */}
//                       optionLabel="label"
//                       optionGroupLabel="label"
//                       optionGroupChildren="items"
//                       className="w-full md:w-14rem"
//                       listStyle={{ maxHeight: "250px" }}
//                     />
//                   </div>
//                 </div>
//               </div>
//               <div className="flex py-4">
//                 <Button
//                   label="Next"
//                   icon="pi pi-arrow-right"
//                   iconPos="right"
//                   onClick={() => stepperRef.current.nextCallback()}
//                 />
//               </div>
//             </StepperPanel>
//             {/* Step 2: Set Amount */}
//             <StepperPanel header="Set Amount">
//               <div className="flex flex-column h-12rem">
//                 <div className="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">
//                   <div className="flex flex-col gap-4">
//                     <label>Salaf wanted:</label>
//                     <InputText
//                       id="totalBalance"
//                       value={totalBalance}
//                       onChange={(e) => setTotalBalance(e.target.value)}
//                       placeholder="Enter total balance of gatiya"
//                       className="p-inputtext-sm w-20 border border-gray-300 h-10"
//                     />
//                     <label>Choose payment method:</label>
//                     <div className="flex gap-3">
//                       <div>
//                         <RadioButton
//                           inputId="onePayment"
//                           name="paymentMethod"
//                           value="onePayment"
//                           onChange={(e) => setPaymentMethod(e.value)}
//                           checked={paymentMethod === "onePayment"}
//                         />
//                         <label htmlFor="onePayment" className="ml-2">
//                           One Payment
//                         </label>
//                       </div>
//                       <div>
//                         <RadioButton
//                           inputId="installment"
//                           name="paymentMethod"
//                           value="installment"
//                           onChange={(e) => setPaymentMethod(e.value)}
//                           checked={paymentMethod === "installment"}
//                         />
//                         <label htmlFor="installment" className="ml-2">
//                           Installments
//                         </label>
//                       </div>
//                     </div>

//                     {/* Show checkboxes only if Installments is selected */}
//                     {paymentMethod === "installment" && (
//                       <div
//                         className="flex  flex-column gap-2 mt-4"
//                         style={{ width: "300px" }}
//                       >
//                         <label>Choose installments types:</label>
//                         <div className="flex gap-2">
//                           {/* Checkbox options for installments */}
//                           {allowedInstallments.map((v) => (
//                             <div key={v} className="flex align-items-center">
//                               <input
//                                 type="checkbox"
//                                 id={installment-${v}}
//                                 value={v}
//                                 checked={installmentValue === v}
//                                 onChange={() => setInstallmentValue(v)}
//                               />
//                               <label
//                                 htmlFor={installment-${v}}
//                                 className="ml-2"
//                               >
//                                 {v} Installments
//                               </label>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//               <div className="flex py-10 gap-2">
//                 <Button
//                   label="Back"
//                   severity="secondary"
//                   icon="pi pi-arrow-left"
//                   onClick={() => stepperRef.current.prevCallback()}
//                 />
//                 <Button
//                   label="Next"
//                   icon="pi pi-arrow-right"
//                   iconPos="right"
//                   onClick={() => stepperRef.current.nextCallback()}
//                 />
//               </div>
//             </StepperPanel>

//             {/* Step 3: Terms and Conditions */}
//             <StepperPanel header="Terms And Conditions">
//               <div className="flex flex-column h-12rem">
//                 <div className="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">
//                   {/* Details and conditions */}
//                   <div className="flex flex-column gap-4">
//                     <div>
//                       <p>
//                         <strong>Lender:</strong>
//                         {/* {selectedFriend.name} */}
//                       </p>
//                       <p>
//                         <strong>Amount of Loan:</strong>
//                         {totalBalance}
//                       </p>
//                       <p>
//                         <strong>Payment Method:</strong>
//                         {paymentMethod === "onePayment"
//                           ? "One Payment"
//                           : " Installments (" +
//                             installmentValue +
//                             " installments)"}
//                       </p>
//                     </div>

//                     <div className="flex align-items-center gap-2">
//                       <input
//                         type="checkbox"
//                         checked={terms}
//                         onChange={() => setTerms(!terms)}
//                       />
//                       <label>
//                         I have read and accept the terms and conditions: "
//                         {generateTerms()}"
//                       </label>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="flex py-4 gap-2">
//                 <Button
//                   label="Back"
//                   severity="secondary"
//                   icon="pi pi-arrow-left"
//                   onClick={() => stepperRef.current.prevCallback()}
//                 />
//                 <Button
//                   label="Submit"
//                   icon="pi pi-arrow-right"
//                   iconPos="right"
//                   onClick={() => stepperRef.current.nextCallback()}
//                 />
//               </div>
//               {/* Don't forget to add a popup of confirming when pressing the submit button (called show dialog in the library)  */}
//             </StepperPanel>
//           </Stepper>
//         </div>
//       </div>
//   );
// }