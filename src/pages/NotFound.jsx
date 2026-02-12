import React from "react";
import { Link } from "react-router-dom";

const NotfoundPage = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 px-4">
        <h1 className="text-8xl font-extrabold text-gray-200">404</h1>

        <p className="mt-4 text-2xl font-semibold text-gray-200">
          Page Not Found
        </p>

        <p className="mt-2 text-white text-center max-w-md">
          Sorry, the page you are looking for doesn’t exist or has been moved.
        </p>

        <Link
          to="/"
          className="mt-6 inline-block rounded-lg bg-indigo-500 px-6 py-3 text-white font-medium transition hover:bg-indigo-700"
        >
          Go Back Home
        </Link>
      </div>
    </>
  );
};

export default NotfoundPage;
