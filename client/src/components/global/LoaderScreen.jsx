import PropTypes from "prop-types";
import React from "react";

export function Loader({ size = 24 }) {
  const style = {
    width: typeof size === "number" ? `${size}px` : size,
    height: typeof size === "number" ? `${size}px` : size,
  };

  return <span className="loader" style={style}></span>;
}

Loader.propTypes = {
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default function LoaderScreen({ message }) {
  return (
    <div className="loader-screen">
      <Loader size={70} />
      <p>{message}</p>
    </div>
  );
}

LoaderScreen.propTypes = {
  message: PropTypes.string,
};
