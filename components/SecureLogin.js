import React, { useState } from "react"

const SecureLogin = ({
  title,
  button,
  href,
  link,
  headerStatement,
  emailInput,
  passwordInput,
  btnFunction,
}) => {
  return (
    // login
    <div className="w-full flex justify-center items-center bg-charcoal-gray">
      {/* login-container */}
      <div className="flex flex-col items-center w-1/3 rounded-md p-4 border-2 border-gray-400 bg-white shadow-md m-4 opacity-75 bg-black-russian">
        {/* login-heading */}
        <h1 className="mb-4 p-4 w-1/2 text-text-1 text-xl text-center">
          {title}
        </h1>
        {/* login-email */}
        <input
          ref={emailInput}
          type="email"
          className="mb-4 p-4 w-1/2 border-none text-base"
          placeholder="Email"
        />
        {/* login-password */}
        <input
          ref={passwordInput}
          type="password"
          className="mb-4 p-4 w-1/2 border-none text-base"
          placeholder="Password"
        />
        {/* Login */}
        {/* login-button */}
        <button
          onClick={btnFunction}
          className="mt-2.5rem mb-1.25rem p-5 w-1/2 border-none bg-gray-400 text-text-1 text-sm font-extrabold rounded-md"
        >
          {button}
        </button>
        {/* links */}
        <div className="flex w-9/12 justify-evenly">
          <p>{headerStatement}</p>
          <a href={href}>{link}</a>
        </div>
      </div>
    </div>
  )
}

export default SecureLogin
