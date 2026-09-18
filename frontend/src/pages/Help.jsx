import React from 'react';
import './Help.css';

function Help() {
  return (
    <div className="help-me">
      <h1>Help Me</h1>
      <section className="faq">
        <h2>Frequently Asked Questions</h2>
        <ul>
          <li>
            <h3>How do I create an account?</h3>
            <p>To create an account, click on the "Sign Up" button in the top right corner of the homepage and follow the prompts.</p>
          </li>
          <li>
            <h3>I forgot my password. What should I do?</h3>
            <p>Click on the "Forgot Password" link on the login page. You'll be asked to enter your email address, and we'll send you instructions to reset your password.</p>
          </li>
          <li>
            <h3>How can I contact customer support?</h3>
            <p>You can reach our customer support team by emailing at craftbazar.cb@gmail.com or by calling +91 8595032092 during business hours.</p>
          </li>
        </ul>
      </section>
      <section className="contact-support">
        <h2>Still Need Help?</h2>
        <p>If you couldn't find the answer to your question, please don't hesitate to contact us directly.</p>

        <a href="https://wa.me/918800854220" target='_blank' rel="noopener noreferrer"><button>Chat on Whatsapp</button></a>
      </section>
    </div>
  );
}

export default Help;