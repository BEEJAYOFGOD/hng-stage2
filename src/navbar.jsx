import companyLogo from "./assets/compLogo.svg";
import line from "./assets/Line.svg";

const Navbar = () => {
  return (
    <nav className="flex rounded-2xl font-['JejuMyeongjo'] items-center p-4 justify-between  bg-[#052F35] border border-[#197686]">
      <div>
        <img className="w-32" src={companyLogo} alt="techLogo" />
      </div>
      <div>
        <button className="text-sm bg-white rounded-2xl text-black flex gap-2 items-center px-4 py-4">
          MY TICKETS
          <span>
            <img className="w-8" src={line} alt="arrow" />
          </span>{" "}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
