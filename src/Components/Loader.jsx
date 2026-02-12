import React from "react";

const Loader = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-3">
        {/* Spinner */}
        <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-500 rounded-full animate-spin"></div>

        {/* Text */}
        <p className="text-indigo-500 text-sm font-medium tracking-wide">
          Loading data...
        </p>
      </div>
    </>
  );
};

export default Loader;
