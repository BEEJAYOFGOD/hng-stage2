import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./navbar";
import MultiStepForm from "./MultiStepForm";
import AllTickets from "./AllTickets";
import "./App.css";

function App() {
  return (
    <Router>
      <main className="min-h-full bg-[#02191D] p-4 text-white font-roboto md:pb-32 md:bg-[radial-gradient(52.52%_32.71%_at_50%_97.66%,_rgba(36,160,181,0.2)_0%,_rgba(36,160,181,0)_100%)]">
        <Navbar />
        <Routes>
          <Route path="/" element={<MultiStepForm />} />
          <Route path="/ticket" element={<AllTickets />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
