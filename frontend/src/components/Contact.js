import React, { useRef, useEffect, useState } from "react";
import { faEnvelope, faPhoneAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./Contact.css";

const Contact = () => {
  const sectionRef = useRef(null);
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);
  const [animate, setAnimate] = useState(false);

  // === Vanta Effect ===
  useEffect(() => {
    if (!vantaEffect && window.VANTA && window.VANTA.NET) {
      setVantaEffect(
        window.VANTA.NET({
          el: vantaRef.current,
          color: 0xffd700,
          backgroundColor: 0x000000,
          points: 12.0,
          maxDistance: 20.0,
          spacing: 18.0,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  // === Intersection animation ===
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setAnimate(true);
      },
      { threshold: 0.4 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className={`contact-section ${animate ? "animate" : ""}`}
      id="contact"
      ref={sectionRef}
    >
      <div className="vanta-container">
        <div className="vanta-bg" ref={vantaRef}></div>
        <div className="contact-inner">
          <h1 className="contact-title">Let's Connect</h1>
          <div className="contact-wrapper">
            {/* === Left: Fancy Contact Form === */}
            <div className="contact-card">
              <form>
                <div className="form-group">
                  <input type="text" name="name" required />
                  <label>Your Name</label>
                </div>
                <div className="form-group">
                  <input type="email" name="email" required />
                  <label>Your Email</label>
                </div>
                <div className="form-group">
                  <textarea name="message" required rows="5"></textarea>
                  <label>Your Message</label>
                </div>
                <button type="submit">Send</button>
              </form>
            </div>

            {/* === Right: Info Panel === */}
            <div className="contact-card info-card">
              <p>
                <FontAwesomeIcon icon={faEnvelope} /> fcampoverdeg@vt.edu
              </p>
              <p>
                <FontAwesomeIcon icon={faEnvelope} /> fcampoverdeg@gmail.com
              </p>
              <p>
                <FontAwesomeIcon icon={faPhoneAlt} /> +1 (804) 356-5749
              </p>

              <div className="map-container">
                <iframe
                  title="Blacksburg, VA"
                  src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d9844.811205733566!2d-80.42230521851523!3d37.22903082905911!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1750994904731!5m2!1sen!2sus"
                  width="100%"
                  height="300"
                  style={{ border: 0, borderRadius: "12px" }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>

              <p>
                <em className="end-phrase">
                  If you've made it this far... you're awesome. Let's talk.
                </em>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
