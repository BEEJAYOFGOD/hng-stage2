const SelectTicketForm = () => {
  return (
    <>
      <div>
        <div className="rounded-2xl  ">
          <h1>Ticket Selection</h1>
          <p>Step 1 / 3</p>

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

        <h3>select ticket type</h3>
        <div className="mb-8 border rounded-2xl p-3  border-[#197686] flex flex-col gap-4">
          <div className="border-[#197686] p-3  border-2 rounded-xl">
            <p>Free</p>
            <p>REGULAR ACCESS</p>
            <p>20/52</p>
          </div>
          <div className="border-[#197686] p-3  border-2 rounded-xl">
            <p>Free</p>
            <p>REGULAR ACCESS</p>
            <p>20/52</p>
          </div>
          <div className="border-[#197686] p-3  border-2 rounded-xl">
            <p>Free</p>
            <p>REGULAR ACCESS</p>
            <p>20/52</p>
          </div>
        </div>
        <p className="mb-4">Number of Tickets</p>
        <select
          className=" flex justify-between w-full"
          name="ticketno"
          id="ticketno"
          required="true"
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

{
  /* 
  <div className="">
        
        <div className="m-4 p-4 border-[#23a0b5] border ">
          <h1>Ticket Selection</h1>
          <p>Step 1 / 3</p>

          <div className="bg-[#0e464e] relative before:absolute h-1 before:h-full before:w-[70%] before:bg-[#23a0b5]"></div>

          <div>
            <h2>Techember Fest 25</h2>
            <p>
              Join us for an unforgettable experience at [Event Name]! Secure
              your spot now
            </p>

            <p>📍 [Event Location]</p>
            <p>March 15, 2025 | 7:00Pm</p>
          </div>

          <div className="bg-[#23a0b5] h-1 relative "></div>
        </div>
        <form action="">
          <h3>select ticket type</h3>
          <div>
            <button>
              <span>Free</span>
              <span>REGULAR ACCESS</span>
              <span>20/52</span>
            </button>
            <button>
              <span>$150</span>
              <span>VIP ACCESS</span>
              <span>20/52</span>
            </button>
            <button>
              <span>$300</span>
              <span>VVIP ACCESS</span>
              <span>20/52</span>
            </button>
          </div>
          <p>Number of Tickets</p>
          <select
            className="flex justify-between w-full"
            name="ticketno"
            id="ticketno"
          >
            <option value="1">1</option>
            <option value="2">two</option>
          </select>
        </form>
        <p>{step} </p>
        
        </div>
        */
}
