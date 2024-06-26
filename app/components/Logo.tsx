import React from "react";
import { useDispatch } from "react-redux";
import { activateToast } from "../store/toastsSlice";

function Logo() {
  const dispatch = useDispatch();

  return (
    <a
      href="https://console.tableland.xyz"
      target="_new"
      title="logo"
      onClick={(e) => {
        e.preventDefault();
        dispatch(
          activateToast({
            message: `Copy link to visit full app: https://console.tableland.xyz`,
            type: "success",
          })
        );
      }}
    >
      <svg
        className="logo"
        width="102"
        height="50"
        viewBox="0 0 102 50"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16.4707 14.2203C16.6139 13.5901 16.9663 13.0276 17.47 12.6255C17.9736 12.2233 18.5985 12.0056 19.2418 12.008H30.4644C31.9578 12.008 32.6312 11.3573 33.5203 10.0819L38.4583 1.34534C38.6992 0.931185 39.045 0.588568 39.4605 0.352356C39.876 0.116144 40.3463 -0.00523196 40.8236 0.000580451H82.0881C82.5871 -0.0114616 83.0727 0.164235 83.4495 0.493238C83.8264 0.822241 84.0674 1.28083 84.1254 1.77913C85.7829 21.2478 87.8893 34.4438 101.21 46.3905C101.521 46.674 101.738 47.0461 101.833 47.4572C101.928 47.8682 101.896 48.2987 101.741 48.691C101.587 49.0832 101.316 49.4187 100.967 49.6526C100.617 49.8864 100.205 50.0075 99.7852 49.9996H2.0972C1.67752 50.0048 1.26617 49.8817 0.917623 49.6467C0.569072 49.4118 0.299757 49.0759 0.145332 48.6837C-0.00909301 48.2915 -0.0413439 47.8614 0.0528479 47.4503C0.14704 47.0392 0.36323 46.6666 0.672802 46.3818C10.212 37.784 14.0363 28.4314 16.0477 16.3199C16.1513 15.7126 16.2808 15.1313 16.4016 14.5413L16.4707 14.2203Z"
          fill="black"
        />
      </svg>
    </a>
  );
}

export default Logo;
