"use client";

import React, { useState } from "react";
import "./page.css";
import { PasswordChecklist, Validation } from "./../../validation/validation";
import { FaEnvelope, FaLock } from "react-icons/fa";
import InputWrapper from "../../core/InputWrapper/InputWrapper";
import CustomButton from "../../core/CustomButton/CustomButton";
import { useRouter } from "next/navigation";
import ErrorAlert from "@/app/core/CustomAlert/ErrorAlert";
import { PasswordInput } from "@/app/core/PasswordInput/PasswordInput";
import { signIn } from "@/app/api/auth/auth-backend";
import { pass } from "three/tsl";

const AuthView: React.FC = () => {
  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  // Error state
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Validation Requirements
  const checkList = React.useMemo<PasswordChecklist>(
    () => Validation.passwordChecklist(password),
    [password]
  );

  const allGood = Validation.isPasswordStrong(password);

  type RequirementItem = { ok: boolean; text: string };
  const items: RequirementItem[] = [
    { ok: checkList.length12, text: "At least 12 Characters" },
    { ok: checkList.lower, text: "At least 1 Lower Case Letter" },
    { ok: checkList.upper, text: "At least 1 Upper Case Letter" },
    { ok: checkList.symbol, text: "At least 1 Symbol" },
    { ok: checkList.number, text: "At least 1 Number" },
  ];

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const emailErr = Validation.validateEmail(email);
    const passwordErr = Validation.validatePassword(password);

    setEmailError(emailErr ?? "");
    setPasswordError(passwordErr ?? "");

    if (emailErr || passwordErr) {
      setIsLoading(false);
      return;
    }

    try {
      if (isSignUp) {
        if (!allGood) {
          const firstIssue =
            Validation.passwordIssues(password)[0] ?? "Invalid password.";
          setPasswordError(firstIssue);
          setIsLoading(false);
          return;
        }
        alert("Sign up successful! Please implement your sign-up logic.");
      } else {
        const { access_token } = await signIn({ email, password });

        const storage = rememberMe ? localStorage : sessionStorage;
        storage.setItem("shop_token", access_token);

        alert("Hello Buddy!");
      }
    } catch (err) {
      console.error("Auth error in component:", err);

      let errorMessage = isSignUp
        ? "Sign up failed. Please try again."
        : "Login failed. Please try again.";

      if (err instanceof Error) errorMessage = err.message;
      else if (typeof err === "string") errorMessage = err;

      if (errorMessage.includes("Credentials Incorrect")) {
        errorMessage = "Invalid email or password";
      } else if (errorMessage.includes("Failed to fetch")) {
        errorMessage =
          "Cannot connect to server. Please check if the backend is running.";
      } else if (errorMessage.includes("CORS")) {
        errorMessage =
          "Connection blocked by CORS policy. Please check server configuration.";
      }

      setEmailError(errorMessage);
      setPasswordError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAuthMode = () => {
    setIsAnimating(true);
    setEmailError("");
    setPasswordError("");
    setTimeout(() => {
      setIsSignUp((prev) => !prev);
      setEmail("");
      setPassword("");
      setRememberMe(false);
      setIsAnimating(false);
    }, 700);
  };

  return (
    <div className="auth-screen">
      <div className="auth-hero-container">
        <h1>Control</h1>
        <div className="flex flex-col gap-4">
          <h2>
            Welcome To Control!
            <br />
            Your All In One Car <br />
            Service Platform
          </h2>
        </div>
      </div>

      <div className={`auth-container ${isAnimating ? "slide-out" : ""}`}>
        <form onSubmit={handleSubmit} className="auth-form" noValidate>
          <label>{isSignUp ? "SIGN UP" : "SIGN IN"}</label>
          <div className="auth-form-content">
            {emailError && <ErrorAlert message={emailError} />}

            <InputWrapper
              placeholder="E-mail"
              icon={<FaEnvelope />}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              error={emailError}
            />

            {passwordError && <ErrorAlert message={passwordError} />}
            <PasswordInput
              placeholder="Password"
              icon={<FaLock />}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              error={passwordError}
            />

            {!isSignUp && (
              <div className="remember-me">
                <input
                  type="checkbox"
                  className="remember-me"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Remember Me</span>
              </div>
            )}
          </div>

          <div className="flex flex-col w-full items-center gap-4">
            <CustomButton
              type="submit"
              disabled={isLoading}
              text={
                isLoading
                  ? isSignUp
                    ? "Signing Up..."
                    : "Signing In..."
                  : isSignUp
                  ? "SIGN UP"
                  : "SIGN IN"
              }
            />

            <span className="switch">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  toggleAuthMode();
                }}
              >
                {isSignUp ? "SIGN IN" : "SIGN UP"}
              </a>
            </span>
          </div>
          {isSignUp && (
            <div className="requirements">
              {items.map((r) => (
                <div
                  key={r.text}
                  className={`requirement ${r.ok ? "ok" : "bad"}`}
                >
                  <div className={`circle ${r.ok ? "ok" : "bad"}`} />
                  <span>{r.text}</span>
                </div>
              ))}
            </div>
          )}
        </form>

        <ul className="auth-container-items">
          <li>
            <a href="">Contact Us</a>
          </li>
          <li>
            <a href="">Privacy</a>
          </li>
          <li>
            <a href="">Terms</a>
          </li>
          <li>
            <a href="">Legal</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AuthView;
