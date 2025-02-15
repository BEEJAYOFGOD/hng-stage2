/* eslint-disable react/prop-types */
/* eslint-disable no-constant-binary-expression */
import { useRef, useState } from "react";
import cloud from "./assets/cloud-download.svg";
import envelope from "./assets/envelope.svg";
import axios from "axios";

const UserDetailsForm = ({ userName, email, updateUserInfo, profilePhoto }) => {
  const profileUpload = useRef(null);

  const [uploadActionDisplay, setUploadActionDisplay] = useState("flex");

  const [uploadedImageurl, setUploadedImageUrl] = useState("");
  const [uploadState, setUploadState] = useState("");

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    const cloudName = "dvieev0ag";
    const uploadPreset = "profilePhoto";

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", uploadPreset);

    setUploadState("uploading");
    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData
      );
      const optimizedUrl = res.data.secure_url.replace(
        "/upload/",
        "/upload/f_auto,q_auto/"
      );
      setUploadedImageUrl(optimizedUrl);
      console.log("LINK: " + optimizedUrl);
      setUploadState("");
      setUploadActionDisplay("hidden");
      updateUserInfo(e, optimizedUrl);
    } catch (err) {
      console.error("Image upload failed:", err);
    }
  };

  return (
    <>
      <div className="flex justify-between mb-4">
        <h2>Attendee Details</h2>
        <p>Step 2/ 3</p>
      </div>

      <div className="bg-[#0e464e] relative before:absolute h-1 before:h-full before:w-[80%] before:bg-[#23a0b5] my-8"></div>

      <div className="border p-4 rounded-2xl flex flex-col gap-2 border-btn-border">
        <p>Upload Profile Photo</p>

        <div
          style={{
            background: "#0E464F",
            backgroundImage: `url(${uploadedImageurl})`,
            backgroundSize: "cover",
          }}
          className="h-48 border-4 flex flex-col items-center justify-center rounded-4xl border-next group"
          onClick={() => {
            profileUpload.current.click();
          }}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              profileUpload.current.click();
            }
          }}
        >
          <div
            className={`${uploadActionDisplay}
          flex-col items-center md:group-hover:flex`}
          >
            <img className="w-12" src={cloud} alt="cloud download" />
            <h3>Drag & drop or click to upload</h3>
          </div>

          <input
            autoFocus
            accept="image/*"
            className="w-full border hidden"
            ref={profileUpload}
            type="file"
            name="profilePhoto"
            id="profile_photo"
            onChange={async (e) => {
              await handleImageUpload(e);
            }}
          ></input>
        </div>
        <span className={uploadState.length ? "flex justify-end" : "hidden"}>
          {uploadState}
        </span>
      </div>

      <div className="bg-[#07373F] h-1 relative my-8"></div>

      <div className="flex flex-col gap-2 mb-4">
        <label htmlFor="username">Enter your name</label>
        <input
          name="userName"
          value={userName}
          required
          id="username"
          className="border border-next outline-0 w-full rounded-md p-4"
          type="text"
          onChange={(e) => {
            updateUserInfo(e, e.target.value);
          }}
        />
      </div>

      <div className="flex flex-col gap-2 mb-4">
        <label htmlFor="email">Enter your email *</label>
        <div className="border border-next p-4 rounded-md flex gap-2">
          <img src={envelope} alt="" />
          <input
            required
            name="email"
            value={email}
            id="email"
            className="outline-0 w-full "
            type="email"
            onChange={(e) => {
              updateUserInfo(e, e.target.value);
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
