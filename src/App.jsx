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
    steps,
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
      <main className="min-h-full bg-[#02191D] p-4 text-white font-roboto md:pb-32 md:bg-[radial-gradient(52.52%_32.71%_at_50%_97.66%,_rgba(36,160,181,0.2)_0%,_rgba(36,160,181,0)_100%)]">
        <Navbar />

        <div
          className={`border border-btn-border max-w-[43.75rem] rounded-4xl  p-5 m-auto md:bg-[#041E23] ${
            currentStepIndex != 2 ? "bg-[#08252B]" : "bg-[#041E23]"
          }  mt-10`}
        >
          <div className="flex justify-between">
            <h1>
              {currentStepIndex === 0
                ? "Ticket Selection"
                : currentStepIndex == 1
                ? " Attendee Details"
                : "Ready"}
            </h1>
            <p>
              {currentStepIndex + 1} / {steps.length}
            </p>
          </div>

          {/* progressbar */}
          <div
            className={`bg-[#0e464e] relative before:absolute h-1 before:h-full ${
              currentStepIndex == 0
                ? "before:w-[50%]"
                : currentStepIndex == 1
                ? "before:w-[75%]"
                : "before:w-[100%]"
            }  before:bg-[#23a0b5] my-6 rounded-md before:rounded-md`}
          ></div>
          {/* progressbar */}

          <form
            onSubmit={handleFormSubmit}
            className={` ${
              currentStepIndex !== 2
                ? "md:border-btn-border md:border md:bg-[#08252B]"
                : ""
            }   rounded-2xl p-0 md:p-8 mt-8  m-auto md:rounded-4xl `}
          >
            {step}

            <div className="flex flex-col gap-4 md:flex-row-reverse md:gap-2">
              <button
                className="bg-next rounded-md py-2 flex-1 cursor-pointer"
                type="submit"
              >
                <span className="capitalize">
                  {currentStepIndex == 0
                    ? "Next"
                    : currentStepIndex == 1
                    ? `Get Your ${userEventDetails.ticketType.toLowerCase()} Tickets`
                    : "Download Ticket"}
                </span>
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
                <span className="capitalize">
                  {currentStepIndex == 0
                    ? "Cancel"
                    : currentStepIndex == 1
                    ? "Back"
                    : "Book Another Ticket"}
                </span>
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}

export default App;
