import tikcet_bg from "./assets/ticket-bg.svg";

const TicketShowcase = () => {
  return (
    <div className="text-center">
      <div className="flex justify-between">
        <h2>Ready</h2>

        <p>Step 3 / 3</p>
      </div>
      <div className="bg-[#0e464e] relative before:absolute before:left-0 h-1 before:h-full before:w-[90%] before:bg-[#23a0b5] my-8"></div>

      <h3 className="text-2xl">Your Ticket is Booked!</h3>

      <p>You can download or Chek your email for a copy</p>

      <div
        className="w-[18.75rem] h-[37.5rem]  m-auto p-[1.3rem] my-12"
        style={{ backgroundImage: `url(${tikcet_bg})` }}
      >
        <div className="w-[16.25rem] h-[27.875rem] border m-auto rounded-2xl border-next"></div>
      </div>
    </div>
  );
};

export default TicketShowcase;
