import TicketShowcase from "./ticketShowcase";

const Tickets = () => {
  const Tickets = [
    {
      userName: "ade",
      email: "adem@gmail.com",
      noOfTicket: 1,
      ticketType: "FREE",
      profilePhoto: "",
    },
    {
      userName: "ade",
      email: "adem@gmail.com",
      noOfTicket: 1,
      ticketType: "FREE",
      profilePhoto: "",
    },
  ];
  return (
    <>
      {Tickets.map((index, ticket) => (
        <div className="flex flex-col" key={index}>
          <TicketShowcase {...ticket} />
        </div>
      ))}
    </>
  );
};

export default Tickets;
<></>;
