/* eslint-disable no-constant-binary-expression */
import { useRef, useState } from "react";
import cloud from "./assets/cloud-download.svg";
import envelope from "./assets/envelope.svg";

const UserDetailsForm = () => {
  const profileUpload = useRef(null);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [fileName, setFileName] = useState("Drag & drop or click to upload");

  return (
    <>
      <div className="flex justify-between mb-4">
        <h2>Attendee Details</h2>
        <p>Step 2/ 3</p>
      </div>

      <div className="bg-[#0e464e] relative before:absolute h-1 before:h-full before:w-[80%] before:bg-[#23a0b5] my-8"></div>

      <div className="border p-4 rounded-2xl flex flex-col gap-4 border-btn-border">
        <p>Upload Profile Photo</p>

        <div
          className="h-48 border-4 flex flex-col items-center justify-center rounded-4xl border-next"
          onClick={() => {
            profileUpload.current.click();
          }}
          role="button"
          autoFocus
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              profileUpload.current.click();
            }
          }}
        >
          <img src={cloud} alt="cloud download" />
          <h3>{fileName}</h3>
          <input
            required
            className="w-full border hidden"
            ref={profileUpload}
            type="file"
            name="profile_proto"
            id="profile_photo"
            onChange={(e) => {
              setFileName(e.target.files[0].name);
            }}
          ></input>
        </div>
      </div>
      <div className="bg-[#07373F] h-1 relative my-8"></div>

      <div className="flex flex-col gap-2 mb-4">
        <label htmlFor="username">Enter your name</label>
        <input
          name="username"
          required
          id="username"
          className="border bg-foreground border-next outline-0 w-full rounded-md p-4"
          type="text"
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />
      </div>

      <div className="flex flex-col gap-2 mb-4">
        <label htmlFor="email">Enter your email *</label>
        <div className="border border-next p-4 rounded-md ">
          <input
            required
            name="email"
            id="email"
            className="outline-0 w-full "
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2 mb-4">
        <label htmlFor="about">About the project</label>

        <textarea
          placeholder="About the project"
          required
          className="h-45 border border-next p-4 rounded-md outline-0"
        ></textarea>
      </div>
    </>
  );
};

export default UserDetailsForm;
