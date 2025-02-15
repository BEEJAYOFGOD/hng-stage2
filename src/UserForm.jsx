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

  return (
    <>
      <div>
        <div className="rounded-2xl">
          <h1>Ticket Selection</h1>
          <p>Step 1 / 3</p>
          <p>{ticketType}</p>

          <div className="bg-[#0e464e] relative before:absolute h-1 before:h-full before:w-[70%] before:bg-[#23a0b5] my-6"></div>

          <div className="text-center event_div">
            <h2 className="font-rage text-6xl leading-normal">
              Techember Fest 25
            </h2>
            <p>
              Join us for an unforgettable experience at [Event Name]! Secure
              your spot now
            </p>
            <p>📍 [Event Location]</p>
            <p>March 15, 2025 | 7:00Pm</p>
          </div>
        </div>
        <div className="bg-[#07373F] h-1 relative my-8"></div>

        <h3>Select Ticket Type</h3>
        <div className="mb-8 border rounded-2xl p-3 border-foreground flex flex-col gap-4">
          <div
            className={`border-[#197686] p-3 border-2 rounded-xl cursor-pointer ${
              selectedTicket === "FREE" ? "activeticketarticle" : ""
            }`}
            onClick={() => handleTicketClick("FREE")}
          >
            <input
              type="radio"
              name="ticketType"
              value="FREE"
              ref={ticketFreeRef}
              className="hidden"
              onChange={(e) => {
                updateUserInfo(e, e.target.value);
              }}
            />
            <p>Free</p>
            <p>REGULAR ACCESS</p>
            <p>20/52</p>
          </div>

          <div
            className={`border-[#197686] p-3 border-2 rounded-xl cursor-pointer ${
              selectedTicket === "VIP" ? "activeticketarticle" : ""
            }`}
            onClick={() => handleTicketClick("VIP")}
          >
            <input
              type="radio"
              name="ticketType"
              value="VIP"
              ref={ticketVipRef}
              onChange={(e) => {
                updateUserInfo(e, e.target.value);
              }}
              className="hidden"
            />
            <p>VIP</p>
            <p>REGULAR ACCESS</p>
            <p>20/52</p>
          </div>

          <div
            className={`border-[#197686] p-3 border-2 rounded-xl cursor-pointer ${
              selectedTicket === "VVIP" ? "activeticketarticle" : ""
            }`}
            onClick={() => handleTicketClick("VVIP")}
          >
            <input
              type="radio"
              name="ticketType"
              value="VVIP"
              ref={ticketVvipRef}
              onChange={(e) => {
                updateUserInfo(e, e.target.value);
              }}
              className="hidden"
            />
            <p>VVIP</p>
            <p>REGULAR ACCESS</p>
            <p>20/52</p>
          </div>
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
