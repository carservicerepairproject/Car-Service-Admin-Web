"use client";

import React, { useState } from "react";
import "./page.css";
import FormInput from "@/app/core/FormInput/FormInput";

export default function SignUpView() {
  return (
    <section>
      <div className="intro-screen">
        <div className="logo">
          <img src="\assets\Drawing_Light.svg" alt="Logo" />
          <h1 className="logo-text">
            <span style={{ animationDelay: "0.3s" }}>C</span>
            <span style={{ animationDelay: "0.4s" }}>O</span>
            <span style={{ animationDelay: "0.5s" }}>N</span>
            <span style={{ animationDelay: "0.6s" }}>T</span>
            <span style={{ animationDelay: "0.7s" }}>R</span>
            <span style={{ animationDelay: "0.8s" }}>O</span>
            <span style={{ animationDelay: "0.9s" }}>L</span>
          </h1>
        </div>
      </div>
      <div className="form-screen">
        <div className="top-bar">
          <span className="top-bar-logo">CONTROL</span>
        </div>
      </div>
    </section>
  );
}
