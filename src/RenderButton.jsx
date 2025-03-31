/* eslint-disable react/prop-types */
const RenderButton = ({
  onClick,
  isDisabled,
  iconPath,
  additionalClasses = "",
}) => {
  return (
    <button
      className={`border w-12 h-12 rounded-full flex justify-center items-center bg-btn-border border-next ${
        isDisabled ? "opacity-50" : ""
      } ${additionalClasses}`}
      onClick={onClick}
      disabled={isDisabled}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d={iconPath} />
      </svg>
    </button>
  );
};

export default RenderButton;
