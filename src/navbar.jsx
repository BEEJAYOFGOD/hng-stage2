import companyLogo from "./assets/compLogo.svg";
import line from "./assets/Line.svg";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex rounded-2xl font-['JejuMyeongjo'] items-center p-4 justify-between  bg-[#052F35] border border-[#197686]">
      <Link to="/">
        <img className="w-32" src={companyLogo} alt="techLogo" />
      </Link>

      <div className="gap-4 font-roboto hidden md:flex">
        <a
          className="opacity-80 hover:opacity-80 active:opacity-100 visited:opacity-100 md:opacity-80 md:hover:opacity-80 md:active:opacity-100 cursor-pointer"
          to="/"
        >
          Events
        </a>
        <Link
          className="opacity-80 hover:opacity-80 active:opacity-100 visited:opacity-100 md:opacity-80 md:hover:opacity-80 md:active:opacity-100 cursor-pointer"
          to="/ticket"
        >
          My Tickets
        </Link>
        <a
          className="opacity-80 hover:opacity-80 active:opacity-100 visited:opacity-100 md:opacity-80 md:hover:opacity-80 md:active:opacity-100 cursor-pointer"
          to="/about"
        >
          About
        </a>
      </div>
      <div>
        <Link
          to="ticket"
          className="text-sm bg-white rounded-2xl text-black flex gap-2 items-center px-4 py-4"
        >
          MY TICKETS
          <span>
            <img className="w-8" src={line} alt="arrow" />
          </span>{" "}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
