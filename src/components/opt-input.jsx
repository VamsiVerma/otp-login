import { useEffect, useRef, useState } from "react";
import "../App.css";

// eslint-disable-next-line react/prop-types
const OtpInput = ({ length = 4, onOtpSubmit = () => {} }) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index, event) => {
    const value = event.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];
    //allow only 1 input
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    //Otp Submit
    const combinedOtp = newOtp.join("");
    if (combinedOtp.length === length) {
      onOtpSubmit(combinedOtp);
    }

    // Move to next Input filled once the current field is filled
    // the validation "index < length - 1 " checks whether the current input field filled in length -1 and
    //  "inputRefs.current[index + 1])" checks there is a field at index+1.
    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleClick = (index) => {
    inputRefs.current[index].setSelectionRange(1, 1);

    if (index > 0 && !otp[index - 1]) {
      inputRefs.current[otp.indexOf("")].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      //Moving focus to the previous input field after clicking backspace
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <div>
      {otp.map((value, index) => {
        return (
          <input
            key={index}
            type="text"
            ref={(input) => (inputRefs.current[index] = input)}
            value={value}
            onChange={(e) => handleChange(index, e)}
            onClick={() => handleClick(index)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="otp-input"
          />
        );
      })}
    </div>
  );
};

export default OtpInput;
