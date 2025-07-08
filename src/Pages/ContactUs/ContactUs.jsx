import React from "react";
import styles from "./ContactUs.module.scss";

const ContactUs = () => {
  return (
    <div className={styles.container}>
      <h1>Contact Us</h1>
      <p>We’d love to hear from you! Fill out the form below or reach out directly.</p>

      <div className={styles.formSection}>
        <form>
          <input type="text" placeholder="Your Name" className={styles.input} />
          <input type="email" placeholder="Your Email" className={styles.input} />
          <textarea placeholder="Your Message" className={styles.textarea}></textarea>
          <button type="submit" className={styles.button}>Send Message</button>
        </form>

        <div className={styles.contactInfo}>
          <h3>Get in Touch</h3>
          <p>Email: support@indianmaidan.in</p>
          <p>Phone: +91 98765 43210</p>
          <p>Address: Udaipur, Rajasthan, India</p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
