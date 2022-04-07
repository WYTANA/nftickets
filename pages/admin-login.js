import React, { useRef } from "react"
import SecureLogin from "../components/SecureLogin"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../utils/firebase"
// import axios from "axios"
// import { useRouter } from "next/router"

export default function Home() {
  const emailRef = useRef()
  const passwordRef = useRef()

  const login = async () => {
    try {
      await signInWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      ).then((user) => {
        if (user) {
          window.location = "/create-item"
        }
      })
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <div>
      <SecureLogin
        title="Admin Login"
        button="Admin Sign In"
        // href="/signup"
        // link="Sign Up"
        // headerStatement="Can't Log In?"
        emailInput={emailRef}
        passwordInput={passwordRef}
        btnFunction={login}
      />
    </div>
  )
}
