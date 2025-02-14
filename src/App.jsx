/* eslint-disable react/jsx-key */
import { useState } from "react";
import Navbar from "./navbar";
import "./App.css";
import useMultiStepForm from "./useMultiStepForms";
import SelectTicketForm from "./UserForm";
import UserDetailsForm from "./userDetailsForm";
import TicketShowcase from "./ticketShowcase";

function App() {
  const { steps, currentStepIndex, step, isFirstStep, next, back } =
    useMultiStepForm([
      <SelectTicketForm />,
      <UserDetailsForm />,
      <TicketShowcase />,
    ]);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    next();
  };
  return (
    <>
      <main className="min-h-full bg-[#02191D] p-4 text-white font-roboto">
        <Navbar />

        <form
          onSubmit={handleFormSubmit}
          className="border border-btn-border rounded-2xl p-4 mt-8"
        >
          {step}

          <div className="flex flex-col gap-4">
            <button
              className="bg-next rounded-md py-2"
              type="submit"
              // onClick={next}
            >
              {currentStepIndex == 0
                ? "Next"
                : currentStepIndex == 1
                ? "Get Your Free Tickets"
                : "Download Ticket"}
            </button>
            <button
              className="border border-next rounded-md py-2"
              onClick={back}
            >
              {currentStepIndex == 0
                ? "Cancel"
                : currentStepIndex == 1
                ? "Back"
                : "Book Another Ticket"}
            </button>
          </div>
        </form>
      </main>
    </>
  );
}

export default App;
