/* eslint-disable react/prop-types */
import { useRef, useState } from "react";

const SelectTicketForm = ({ noOfTicket, ticketType, updateUserInfo }) => {
  const ticketFreeRef = useRef(null);
  const ticketVipRef = useRef(null);
  const ticketVvipRef = useRef(null);

  // State to track the selected ticket type
  const [selectedTicket, setSelectedTicket] = useState(ticketType);

  const handleTicketClick = (ticket) => {
    setSelectedTicket(ticket); // Set the clicked ticket as active

    // Trigger the hidden radio button's click event
    if (ticket === "FREE") ticketFreeRef.current.click();
    else if (ticket === "VIP") ticketVipRef.current.click();
    else if (ticket === "VVIP") ticketVvipRef.current.click();
  };

  const ticketOptions = [
    {
      type: "FREE",
      price: "Free",
      access: "REGULAR ACCESS",
      available: "20/52",
    },
    { type: "VIP", price: "$150", access: "VIP ACCESS", available: "20/52" },
    { type: "VVIP", price: "$300", access: "VVIP ACCESS", available: "20/52" },
  ];
  return (
    <>
      <div>
        <div className="rounded-2xl">
          <div className="text-center event_div">
            <h2 className="font-rage md:text-7xl text-5xl leading-normal">
              Techember Fest 25
            </h2>
            <p className="md:w-sm md:m-auto text-sm leading-[1.5rem]">
              Join us for an unforgettable experience at [Event Name]! Secure
              your spot now
            </p>

            <div className="flex justify-center gap-4">
              <p>📍 [Event Location]</p>
              <p className="hidden md:flex">||</p>
              <p>March 15, 2025 | 7:00Pm</p>
            </div>
            {/* <p className="md:inline">📍 [Event Location]</p>
            <p className="md:inline mx-4 hidden">||</p>
            <p className="md:inline">March 15, 2025 | 7:00Pm</p> */}
          </div>
        </div>
        <div className="bg-[#07373F] h-1 relative my-8"></div>

        <h3>Select Ticket Type</h3>
        <div className="mb-8 border rounded-2xl p-3 border-foreground flex flex-col gap-4 md:flex-row md:items-stretch">
          {ticketOptions.map((ticket) => (
            <div
              key={ticket.type}
              className={`border-[#197686] p-3 border-2 rounded-xl cursor-pointer flex-1 min-w-0 md:basis-1/3 md:hover:bg-[#2C545B] ${
                selectedTicket === ticket.type ? "activeticketarticle" : ""
              }`}
              onClick={() => handleTicketClick(ticket.type)}
            >
              <input
                type="radio"
                name="ticketType"
                value={ticket.type}
                ref={
                  ticket.type === "FREE"
                    ? ticketFreeRef
                    : ticket.type === "VIP"
                    ? ticketVipRef
                    : ticketVvipRef
                }
                className="hidden"
                onChange={(e) => {
                  updateUserInfo(e, e.target.value);
                }}
              />
              <p className="text-2xl font-bold">{ticket.price}</p>
              <p className="text-base">{ticket.access}</p>
              <p className="text-sm opacity-60">{ticket.available}</p>
            </div>
          ))}
        </div>

        <p className="mb-4">Number of Tickets</p>

        <select
          className="flex justify-between w-full my-4 outline-0 border-next border rounded-md p-3"
          name="noOfTicket"
          id="noOfTicket"
          required
          value={noOfTicket}
          onChange={(e) => {
            updateUserInfo(e, e.target.value);
          }}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>
    </>
  );
};

export default SelectTicketForm;
