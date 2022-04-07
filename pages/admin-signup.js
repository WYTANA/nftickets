import React, { useRef } from "react"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../utils/firebase"
import SecureLogin from "../components/SecureLogin"

export default function Home() {
  // Grab a reference to the input fields
  const emailRef = useRef()
  const passwordRef = useRef()

  const register = async () => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      )
      window.location = "/admin-login"
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <div>
      <SecureLogin
        title="Admin Sign Up"
        button="Approved Only!"
        // href="/admin-login"
        // link="Sign In"
        // headerStatement="Already Have an Account?"
        emailInput={emailRef}
        passwordInput={passwordRef}
        btnFunction={register}
      />
    </div>
  )
}
