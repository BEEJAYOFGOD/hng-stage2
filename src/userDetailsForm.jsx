/* eslint-disable react/prop-types */
/* eslint-disable no-constant-binary-expression */
import { useEffect, useRef, useState } from "react";
import cloud from "./assets/cloud-download.svg";
import envelope from "./assets/envelope.svg";
import axios from "axios";

const UserDetailsForm = ({ userName, email, profilePhoto, updateUserInfo }) => {
  const profileUpload = useRef(null);

  const [uploadState, setUploadState] = useState("");

  // Validation States
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  const [imageError, setImageError] = useState("no image uploaded");

  useEffect(() => {
    window.addEventListener("load", () => {
      const UserDetailsError = JSON.parse(
        localStorage.getItem("userDetailsError")
      );

      setImageError(UserDetailsError.imageError);
    });
  }, []);

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

      setUploadState("");
      setImageError("");

      updateUserInfo(e, optimizedUrl);
    } catch (err) {
      console.error("Image upload failed:", err);
    }
  };

  // Validation Handlers
  const validateName = (name) => {
    if (!name.trim()) {
      setNameError("Name is required.");
      return false;
    } else if (name.length < 3) {
      setNameError("Name must be at least 3 characters long.");
      return false;
    }
    setNameError("");
    return true;
  };

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      setEmailError("Email is required.");
      return false;
    } else if (!emailPattern.test(email)) {
      setEmailError("Please enter a valid email address.");
      return false;
    }
    setEmailError("");
    return true;
  };

  return (
    <>
      <div className="flex justify-between mb-4">
        <h2>Attendee Details</h2>
        <p>Step 2/ 3</p>
      </div>

      <div className="border p-4 rounded-2xl flex flex-col gap-2 border-btn-border">
        <p>Upload Profile Photo</p>
        <div className="relative z-100">
          <div
            style={{
              background: "#0E464F",
              backgroundImage: `url(${profilePhoto})`,
              backgroundSize: "cover",
            }}
            className="h-48 border-4 flex flex-col items-center justify-center rounded-4xl border-next group md:w-[15rem] md:h-[15rem] md:mx-auto hover:opacity-65"
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
              className={
                profilePhoto.length
                  ? "hidden flex-col items-center md:group-hover:flex group-hover:opacity-100"
                  : "flex flex-col items-center "
              }
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
            />
          </div>
          <div className="bg-upload-input-bg h-42 w-full absolute top-[15%] z-[-1] md:flex hidden"></div>
        </div>
        <span className="text-red-600">
          {profilePhoto.length ? "" : imageError}
        </span>
        <span className={uploadState.length ? "flex justify-end" : "hidden"}>
          {uploadState}
          <div className="flex gap-[1px]">
            <span className="animate-bounce text-2xl">.</span>
            <span className="animate-bounce [animation-delay:0.2s]  text-2xl">
              .
            </span>
            <span className="animate-bounce [animation-delay:0.4s]  text-2xl">
              .
            </span>
          </div>
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
          aria-invalid={nameError ? "true" : "false"}
          onChange={(e) => {
            updateUserInfo(e, e.target.value);
            validateName(e.target.value);
          }}
          onBlur={(e) => validateName(e.target.value)}
        />
        <p
          className="text-red-600 text-sm"
          aria-live="polite"
          role="alert"
          id="name-error"
        >
          {nameError}
        </p>
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
            className="outline-0 w-full"
            type="email"
            aria-invalid={emailError ? "true" : "false"}
            onChange={(e) => {
              updateUserInfo(e, e.target.value);
              validateEmail(e.target.value);
            }}
            onBlur={(e) => validateEmail(e.target.value)}
          />
        </div>
        <p
          className="text-red-600 text-sm"
          aria-live="polite"
          role="alert"
          id="email-error"
        >
          {emailError}
        </p>
      </div>

      <div className="flex flex-col gap-2 mb-4">
        <label htmlFor="about">About the project</label>

        <textarea
          rows="2"
          placeholder="About the project"
          required
          className="h-45 border border-next p-4 rounded-md outline-0"
        ></textarea>
      </div>
    </>
  );
};

export default UserDetailsForm;
