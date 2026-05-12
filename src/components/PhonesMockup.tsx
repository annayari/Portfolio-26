"use client";

import styles from "./PhonesMockup.module.css";

export default function PhonesMockup() {
  return (
    <div className={styles.stage}>
      <div className={styles.glow} />

      {/* LEFT — Design Studio paywall */}
      <div className={`${styles.phone} ${styles.phoneL}`}>
        <img src="/cases/phone-paywall.png" alt="Design Studio" />
      </div>

      {/* RIGHT — Change floor */}
      <div className={`${styles.phone} ${styles.phoneR}`}>
        <img src="/cases/phone-change-floor.png" alt="Change floor" />
      </div>
    </div>
  );
}
