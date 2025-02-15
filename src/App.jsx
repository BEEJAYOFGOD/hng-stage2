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
  let userJson;

  const updateUserInfo = (event, value) => {
    setUserEventDetails((prev) => {
      ////////////////////////
      const updatedDetails = {
        ...prev,
        [event.target.name]: value,
      };
      ///////////////////////
      userJson = JSON.stringify(updatedDetails);
      localStorage.setItem("userJson", userJson);
      //////////////////////
      return updatedDetails;
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

  const handleFormSubmit = (event) => {
    event.preventDefault();

    localStorage.setItem("pageIndex", currentStepIndex + 1);
    userJson = JSON.stringify(userEventDetails);
    localStorage.setItem("userJson", userJson);

    // if (
    //   (currentStepIndex == 1 && userEventDetails.userName.length <= 0) ||
    //   userEventDetails.email.length <= 3 ||
    //   userEventDetails.profilePhoto.length == 0
    // ) {
    //   return;
    // }
    if (currentStepIndex == 1) {
      if (
        userEventDetails.userName.length <= 0 ||
        userEventDetails.email.length <= 3 ||
        userEventDetails.profilePhoto.length == 0
      ) {
        return;
      }
    }
    next();
  };

  useEffect(() => {
    // Get saved data from localStorage
    const savedUserJson = JSON.parse(localStorage.getItem("userJson"));
    const savedPageIndex = parseInt(localStorage.getItem("pageIndex"));

    // Check if there's saved data and a valid page index
    if (savedUserJson && !isNaN(savedPageIndex)) {
      setUserEventDetails(savedUserJson);
      setCurrentStepIndex(savedPageIndex);
    }
  }, []);

  return (
    <>
      <main className="min-h-full bg-[#02191D] p-4 text-white font-roboto ">
        <Navbar />

        <form
          onSubmit={handleFormSubmit}
          className="border border-btn-border rounded-2xl p-4 md:p-8 mt-8 max-w-[43.75rem] m-auto md:rounded-4xl"
        >
          {step}

          <div className="flex flex-col gap-4 md:flex-row-reverse md:gap-2">
            <button
              className="bg-next rounded-md py-2 flex-1 cursor-pointer"
              type="submit"
            >
              {currentStepIndex == 0
                ? "Next"
                : currentStepIndex == 1
                ? "Get Your Free Tickets"
                : "Download Ticket"}
            </button>
            <button
              type="button"
              className="border border-next rounded-md py-2 flex-1 cursor-pointer"
              onClick={() => {
                localStorage.setItem("pageIndex", currentStepIndex - 1);

                if (isLastStep) {
                  setUserEventDetails(defualtUserInfo);
                  userJson = JSON.stringify(userEventDetails);
                  localStorage.setItem("userJson", userJson);
                  localStorage.setItem("pageIndex", 0);
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
