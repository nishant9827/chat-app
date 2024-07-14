// Spinner.js
import React from "react";
import { BeatLoader } from "react-spinners";

const Spinner = ({ loading }) => {
  return (
    <div className="spinner">
      <BeatLoader color="#fff" loading={loading} size={15} />
    </div>
  );
};

export default Spinner;
