/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";
import useMultiStepForm from "./useMultiStepForms";
import SelectTicketForm from "./UserForm";
import UserDetailsForm from "./userDetailsForm";
import TicketShowcase from "./ticketShowcase";

function MultiStepForm() {
  const defualtUserInfo = {
    userName: "",
    email: "",
    noOfTicket: 1,
    ticketType: "FREE",
    profilePhoto: "",
  };

  const [userEventDetails, setUserEventDetails] = useState(defualtUserInfo);
  // const navigate = useNavigate();

  const updateUserInfo = (event, value) => {
    setUserEventDetails((prev) => {
      /// this is because of the asynchronous nature of setState
      const updatedDetails = {
        ...prev,
        [event.target.name]: value,
      };

      localStorage.setItem("userJson", JSON.stringify(updatedDetails));

      return updatedDetails;
    });
  };

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
    window.scrollTo(0, 0);

    localStorage.setItem("userJson", JSON.stringify(userEventDetails));

    if (currentStepIndex == 1) {
      if (
        userEventDetails.userName.length <= 0 ||
        userEventDetails.email.length <= 3 ||
        userEventDetails.profilePhoto.length == 0
      ) {
        return;
      }
    }

    if (currentStepIndex <= steps.length - 2) {
      next();
    }

    if (currentStepIndex === steps.length - 2) {
      /// i.e before moving to last index
      const updatedTickets = JSON.parse(
        localStorage.getItem("alltickets") || "[]"
      );
      updatedTickets.push(userEventDetails);
      localStorage.setItem("alltickets", JSON.stringify(updatedTickets));
    }
  };

  useEffect(() => {
    const savedUserJson = JSON.parse(localStorage.getItem("userJson"));
    const savedPageIndex = parseInt(localStorage.getItem("pageIndex"));

    if (savedUserJson && !isNaN(savedPageIndex)) {
      setUserEventDetails(savedUserJson);
      setCurrentStepIndex(savedPageIndex);
    }
  }, []);

  return (
    <div
      className={`border border-btn-border max-w-[43.75rem] rounded-4xl p-5 m-auto md:bg-[#041E23] ${
        currentStepIndex != 2 ? "bg-[#08252B]" : "bg-[#041E23]"
      } mt-10 `}
    >
      <div className="flex justify-between">
        <h1>
          {currentStepIndex === 0 ? "Ticket Selection" : "Attendee Details"}
        </h1>
        <p>
          {currentStepIndex + 1} / {steps.length}
        </p>
      </div>

      {/* progress bar */}

      <div
        className={`bg-[#0e464e] relative before:absolute h-1 before:h-full before:transition-all before:duration-500 ${
          currentStepIndex == 0
            ? "before:w-[50%]"
            : currentStepIndex == 1
            ? "before:w-[75%]"
            : "before:w-[100%]"
        } before:bg-[#23a0b5] my-6 rounded-md before:rounded-md`}
      ></div>
      {/* progress bar */}

      <form
        onSubmit={handleFormSubmit}
        className={`${
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
              localStorage.setItem("pageIndex", currentStepIndex - 1); // this saves the page index for refresh.
              window.scrollTo(0, 0);
              if (isLastStep) {
                setUserEventDetails(defualtUserInfo);

                localStorage.setItem(
                  "userJson",
                  JSON.stringify(userEventDetails)
                );
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
  );
}

export default MultiStepForm;