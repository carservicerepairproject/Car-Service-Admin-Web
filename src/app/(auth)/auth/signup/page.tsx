"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import FormInput from "@/app/core/FormInput/FormInput";
import PhoneNumberInput from "@/app/core/PhoneNumberInput/PhoneNumberInput";

export default function SignUpView() {
  return (
    <section className={styles.formScreen}>
      <div className={styles.topBar}>
        <img src="/assets/Dark Themed Logo.svg" alt="" />
        <div className={styles.topBarItems}>
          <span>Help Center</span>
          <span>Login</span>
          <div className={styles.language}>
            <img src="/assets/language-svgrepo-com.svg" alt="" />
            <span>EN</span>
          </div>
        </div>
      </div>
      {/* FORM */}
      <div className={styles.form}>
        <div className={styles.topDesign}></div>
        <div className={styles.formInputs}>
          {/* Business Owner Information Section */}
          <div className={styles.formSection}>
            <h1>Business Owner Information</h1>
            <div className={styles.formRow}>
              <FormInput
                className={styles.span5}
                placeholder="Firstname"
              ></FormInput>
              <FormInput
                className={styles.span5}
                placeholder="Surname"
              ></FormInput>
            </div>
            <div className={styles.formRow}>
              <PhoneNumberInput className={styles.span5}></PhoneNumberInput>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
