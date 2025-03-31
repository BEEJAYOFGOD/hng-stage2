/* eslint-disable react/prop-types */
import tikcet_bg from "./assets/ticket-bg.svg";
import barcode from "./assets/barcode.svg";

const Ticket = ({ ticketInfo }) => {
  return (
    <>
      <div
        className="w-[18.75rem] h-[37.5rem]  m-auto p-[1.3rem] my-12 bg-cover relative"
        style={{ backgroundImage: `url(${tikcet_bg})` }}
      >
        <div className="w-[16.25rem] h-[27.875rem] border m-auto rounded-2xl border-next p-2 text-[0.625rem] ">
          <h2 className="font-rage text-3xl">{`Techember fest "25`}</h2>
          <p>📍04 Runners road, Ikoyi, Lagos</p>
          <p>📅 March 15, 2025 | 7:00PM</p>

          <div
            style={{ backgroundImage: `url(${ticketInfo.profilePhoto})` }}
            className="my-2 h-[5.8rem] w-[5.8rem] m-auto rounded-xl  bg-cover border-4 border-next"
          ></div>
          <table className="table-fixed border-separate border border-[#133D44] w-full text-xs rounded-md shadow-md text-left ">
            <thead>
              <tr>
                <th className="border-r border-b border-gray-300 align-top opacity-100">
                  <label> Enter your name</label>
                  <p id="ticketcontent" className="text-white opacity-100">
                    {ticketInfo.userName}
                  </p>
                </th>
                <th className="border-b">
                  <label>Enter your email</label>
                  <p className="break-words text-white">{ticketInfo.email}</p>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-r border-b border-gray-300 align-top">
                  <label>Ticket Type:</label>
                  <p className="leading-[150%]">{ticketInfo.ticketType}</p>
                </td>
                <td className="border-b">
                  <label>Ticket for: </label>
                  <p>{ticketInfo.noOfTicket}</p>
                </td>
              </tr>
              <tr>
                <td colSpan="2" className=" border-gray-300 align-top">
                  <label htmlFor="Special request?"></label>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. In
                    provident magni voluptates animi reprehenderit tempora,
                    beatae obcaecati consequatur qui, necessitatibus et illum
                    velit architecto quisquam, amet facere accusamus commodi
                    ducimus.
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between absolute bottom-4 left-7">
          <img className="w-full" src={barcode} alt="" />
        </div>
      </div>
    </>
  );
};

export default Ticket;
