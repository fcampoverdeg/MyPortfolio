import React, { useRef, useEffect, useState } from "react";
import { faEnvelope, faPhoneAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./Contact.css";

const Contact = () => {
  const sectionRef = useRef(null);
  const [animate, setAnimate] = useState(false);

  // === Intersection animation === //
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setAnimate(true);
      },
      { threshold: 0.4 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // === Communications === //
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    console.log("Sending data to backend:", data);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );

      const result = await response.json();
      console.log("Response status:", response.status);
      console.log("Response body:", result);

      if (response.ok) {
        alert("Message sent successfully!");
        e.target.reset();
      } else {
        alert("Failed to send message.");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong.");
    }
  };

  return (
    <section
      className={`contact-section ${animate ? "animate" : ""}`}
      id="contact"
      ref={sectionRef}
    >
      {/* ════════════════════════════════════════════════════════ */}
      {/* ROS GRAPH v2 — dense, animated computation graph           */}
      {/* ════════════════════════════════════════════════════════ */}
      <div className="ros-bg" aria-hidden="true">

        {/* ── Computation Graph (carousel — two copies for seamless loop) ── */}
        <div className="ros-graph-carousel">
          {[0, 1].map((copy) => (
          <svg key={copy} className="ros-graph-copy" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice">

            {/* ── Flowing edges ── */}
            <g className="ros-edges">
              <line x1="180" y1="200" x2="440" y2="280" className="ros-edge-flow rf-1" />
              <line x1="150" y1="420" x2="440" y2="310" className="ros-edge-flow rf-2" />
              <line x1="200" y1="580" x2="480" y2="510" className="ros-edge-flow rf-3" />
              <line x1="520" y1="290" x2="700" y2="200" className="ros-edge-flow rf-4" />
              <line x1="500" y1="320" x2="500" y2="490" className="ros-edge-flow rf-5" />
              <line x1="780" y1="200" x2="950" y2="300" className="ros-edge-flow rf-6" />
              <line x1="560" y1="510" x2="930" y2="330" className="ros-edge-flow rf-7" />
              <line x1="1010" y1="340" x2="1050" y2="500" className="ros-edge-flow rf-8" />
              <line x1="1050" y1="540" x2="880" y2="600" className="ros-edge-flow rf-9" />
            </g>

            {/* ── Data pulses ── */}
            <g className="ros-pulses">
              <circle className="ros-pulse rp-a1" r="3" /><circle className="ros-pulse rp-a2" r="2.5" /><circle className="ros-pulse rp-a3" r="2" />
              <circle className="ros-pulse rp-b1" r="3" /><circle className="ros-pulse rp-b2" r="2.5" />
              <circle className="ros-pulse rp-c1" r="2.5" /><circle className="ros-pulse rp-c2" r="2" />
              <circle className="ros-pulse rp-d1" r="3" /><circle className="ros-pulse rp-d2" r="2.5" />
              <circle className="ros-pulse rp-e1" r="3" /><circle className="ros-pulse rp-e2" r="2.5" />
              <circle className="ros-pulse rp-f1" r="3" /><circle className="ros-pulse rp-f2" r="2" />
              <circle className="ros-pulse rp-g1" r="2.5" /><circle className="ros-pulse rp-g2" r="2" />
              <circle className="ros-pulse rp-h1" r="2.5" />
            </g>

            {/* ── Topic labels ── */}
            <g className="ros-labels">
              <text x="290" y="228" className="ros-topic-label">/scan</text>
              <text x="265" y="375" className="ros-topic-label">/image_raw</text>
              <text x="610" y="230" className="ros-topic-label">/map</text>
              <text x="855" y="238" className="ros-topic-label">/costmap</text>
              <text x="1055" y="425" className="ros-topic-label">/cmd_vel</text>
              <text x="310" y="570" className="ros-topic-label">/imu/data</text>
              <text x="488" y="410" className="ros-topic-label">/tf</text>
              <text x="740" y="430" className="ros-topic-label">/odom</text>
              <text x="950" y="580" className="ros-topic-label">/motor_cmd</text>
            </g>

            {/* ── Nodes ── */}
            <g className="ros-nodes">
              <g className="ros-node-group rng-1">
                <circle cx="150" cy="200" r="30" className="ros-node" />
                <circle cx="150" cy="200" r="34" className="ros-node-ring rn-1" />
                <text x="150" y="196" className="ros-node-name">lidar</text>
                <text x="150" y="211" className="ros-node-sub">_driver</text>
              </g>
              <g className="ros-node-group rng-2">
                <circle cx="120" cy="420" r="28" className="ros-node" />
                <circle cx="120" cy="420" r="32" className="ros-node-ring rn-2" />
                <text x="120" y="416" className="ros-node-name">camera</text>
                <text x="120" y="431" className="ros-node-sub">_driver</text>
              </g>
              <g className="ros-node-group rng-3">
                <circle cx="180" cy="580" r="24" className="ros-node" />
                <circle cx="180" cy="580" r="28" className="ros-node-ring rn-3" />
                <text x="180" y="576" className="ros-node-name">imu</text>
                <text x="180" y="591" className="ros-node-sub">_driver</text>
              </g>
              <g className="ros-node-group rng-4">
                <circle cx="480" cy="300" r="42" className="ros-node ros-node-main" />
                <circle cx="480" cy="300" r="48" className="ros-node-ring rn-4" />
                <circle cx="480" cy="300" r="55" className="ros-node-ring-outer rno-4" />
                <text x="480" y="296" className="ros-node-name ros-name-lg">slam</text>
                <text x="480" y="313" className="ros-node-sub">_toolbox</text>
              </g>
              <g className="ros-node-group rng-5">
                <circle cx="740" cy="195" r="32" className="ros-node" />
                <circle cx="740" cy="195" r="36" className="ros-node-ring rn-5" />
                <text x="740" y="191" className="ros-node-name">costmap</text>
                <text x="740" y="206" className="ros-node-sub">_2d</text>
              </g>
              <g className="ros-node-group rng-6">
                <circle cx="510" cy="510" r="28" className="ros-node" />
                <circle cx="510" cy="510" r="32" className="ros-node-ring rn-6" />
                <text x="510" y="506" className="ros-node-name">ekf</text>
                <text x="510" y="521" className="ros-node-sub">_localization</text>
              </g>
              <g className="ros-node-group rng-7">
                <circle cx="970" cy="320" r="40" className="ros-node ros-node-main" />
                <circle cx="970" cy="320" r="46" className="ros-node-ring rn-7" />
                <circle cx="970" cy="320" r="53" className="ros-node-ring-outer rno-7" />
                <text x="970" y="316" className="ros-node-name ros-name-lg">nav2</text>
                <text x="970" y="333" className="ros-node-sub">_planner</text>
              </g>
              <g className="ros-node-group rng-8">
                <circle cx="1040" cy="520" r="30" className="ros-node" />
                <circle cx="1040" cy="520" r="34" className="ros-node-ring rn-8" />
                <text x="1040" y="516" className="ros-node-name">controller</text>
                <text x="1040" y="531" className="ros-node-sub">_server</text>
              </g>
              <g className="ros-node-group rng-9">
                <circle cx="860" cy="610" r="26" className="ros-node" />
                <circle cx="860" cy="610" r="30" className="ros-node-ring rn-9" />
                <text x="860" y="606" className="ros-node-name">motor</text>
                <text x="860" y="621" className="ros-node-sub">_driver</text>
              </g>
            </g>
          </svg>
          ))}
        </div>

        {/* ── Vignette ── */}
        <div className="ros-vignette" />
      </div>

      <div className="vanta-container">
        <div className="contact-inner">
          <h1 className="contact-title">Let's Connect</h1>
          <div className="contact-wrapper">
            {/* === Left: Fancy Contact Form === */}
            <div className="contact-card">
              <form onSubmit={handleSubmit}>
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
                  title="San Francisco, CA"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d70136.34707211575!2d-122.44828245477996!3d37.73963365023949!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80859a6d00690021%3A0x4a501367f076adff!2sSan%20Francisco%2C%20CA!5e1!3m2!1sen!2sus!4v1775716589557!5m2!1sen!2sus"
                  width="100%"
                  height="300"
                  style={{ border: 0, borderRadius: "12px" }}
                  allowfullscreen=""
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
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
