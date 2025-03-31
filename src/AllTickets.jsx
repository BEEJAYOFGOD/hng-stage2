import Ticket from "./ticket";
import { useState } from "react";
import RenderButton from "./RenderButton";

const AllTickets = () => {
  const allTickets = JSON.parse(localStorage.getItem("alltickets")) || [];
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < allTickets.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const isPrevDisabled = currentIndex === 0;
  const isNextDisabled = currentIndex === allTickets.length - 1;

  return (
    <div className="text-center mt-12">
      <h3 className="md:text-4xl text-2xl font-bold font-alatsi">
        These are your booked tickets!
      </h3>
      <p className="text-base">
        You can download or check your email for a copy
      </p>

      <div className="flex overflow-hidden">
        {allTickets.map((ticket) => (
          <div
            className="min-w-full  transition-transform duration-500"
            key={ticket.id}
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            <Ticket ticketInfo={ticket} />
            <button className=" px-10 py-4 rounded-md bg-btn-border">
              Download
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8 gap-4">
        <RenderButton
          onClick={handlePrev}
          isDisabled={isPrevDisabled}
          iconPath={"M15.75 19.5 8.25 12l7.5-7.5"}
        />

        <RenderButton
          onClick={handleNext}
          isDisabled={isNextDisabled}
          iconPath={"m8.25 4.5 7.5 7.5-7.5 7.5"}
        />
      </div>
    </div>
  );
};

export default AllTickets;
