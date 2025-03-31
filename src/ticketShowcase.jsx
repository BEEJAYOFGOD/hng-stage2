import Ticket from "./ticket";

const TicketShowcase = ({ ...userEventDetails }) => {
  return (
    <div className="text-center">
      <h3 className="md:text-4xl text-3xl font-bold font-alatsi">
        Your Ticket is Booked!
      </h3>

      <p className="text-base">
        You can download or Chek your email for a copy
      </p>
      <Ticket ticketInfo={userEventDetails} />
    </div>
  );
};

export default TicketShowcase;
