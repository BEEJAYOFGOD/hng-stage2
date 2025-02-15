/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";
import Navbar from "./navbar";
import "./App.css";
import useMultiStepForm from "./useMultiStepForms";
import SelectTicketForm from "./UserForm";
import UserDetailsForm from "./userDetailsForm";
import TicketShowcase from "./ticketShowcase";

function App() {
  const defualtUserInfo = {
    userName: "",
    email: "",
    noOfTicket: 1,
    ticketType: "FREE",
    profilePhoto: "",
  };
  const [userEventDetails, setUserEventDetails] = useState(defualtUserInfo);

  const updateUserInfo = (event, value) => {
    setUserEventDetails((prev) => {
      return {
        ...prev,
        [event.target.name]: value,
      };
    });
  };
  // console.log("DEBUG:", defualtUserInfo);
  const {
    currentStepIndex,
    setCurrentStepIndex,
    step,
    isLastStep,
    next,
    back,
  } = useMultiStepForm([
    <SelectTicketForm {...userEventDetails} updateUserInfo={updateUserInfo} />,
    <UserDetailsForm {...userEventDetails} updateUserInfo={updateUserInfo} />,
    <TicketShowcase {...userEventDetails} updateUserInfo={updateUserInfo} />,
  ]);

  let pageIndex;

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (currentStepIndex == 1) {
      const userJson = JSON.stringify(userEventDetails);

      alert(userJson);
      localStorage.setItem("userJson", userJson);
    }

    pageIndex = localStorage.setItem("pageIndex", currentStepIndex + 1);

    next();
  };

  useEffect(() => {
    window.addEventListener("load", () => {
      const userjson = JSON.parse(localStorage.getItem("userJson"));

      if (pageIndex) {
        setUserEventDetails(userjson);
        setCurrentStepIndex(pageIndex);
      }
    });
  }, []);
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
              type="button"
              className="border border-next rounded-md py-2"
              onClick={() => {
                if (isLastStep) {
                  setUserEventDetails(defualtUserInfo);
                  next();
                } else {
                  back();
                }
              }}
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
