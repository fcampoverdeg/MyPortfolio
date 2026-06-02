import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Footer from "../../Footer";
import "./ConcurrencyWebserver.css";

const techStack = [
  "C", "POSIX Threads", "TCP/IP", "HTTP/1.0", "Sockets", "Mutex/Condvar", "Makefile", "Linux",
];

const components = [
  {
    name: "wserver.c",
    role: "Main Server",
    description: "Parses command-line flags, opens the listening socket, spawns the thread pool, and pushes incoming connections into the scheduler queue.",
  },
  {
    name: "scheduler.c",
    role: "Bounded Buffer Queue",
    description: "Implements the producer/consumer model with mutex and condition variables. Controls how requests are ordered using Smallest File First (SFF) scheduling.",
  },
  {
    name: "thread_pool.c",
    role: "Worker Threads",
    description: "Dequeues file descriptors from the scheduler and calls request_handle(). Runs in parallel to handle multiple clients simultaneously.",
  },
  {
    name: "request.c",
    role: "HTTP Handler",
    description: "Parses the URI, validates paths for security (no directory traversal), serves static files, and sends HTTP headers + body.",
  },
  {
    name: "io_helper.c",
    role: "Networking Utilities",
    description: "Safe wrappers for socket creation, accept(), reading/writing. Handles the low-level TCP communication.",
  },
];

const ConcurrencyWebserverPage = () => {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: "auto" });
    } else {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, []);

  useEffect(() => {
    const reveals = document.querySelectorAll(".cw-reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("cw-visible");
        });
      },
      { threshold: 0.1 }
    );
    reveals.forEach((el) => observer.observe(el));
    return () => reveals.forEach((el) => observer.unobserve(el));
  }, []);

  return (
    <>
      <div id="concurrencywebserver-top" className="cw-page">
        {/* ========== HERO ========== */}
        <div className="cw-hero">
          <div className="cw-hero-content">
            <Link to="/portfolio" className="cw-back-btn">
              <FontAwesomeIcon icon={faArrowLeft} /> Back to Portfolio
            </Link>
            <p className="cw-hero-label">Systems Programming &middot; Virginia Tech</p>
            <h1 className="cw-hero-title">Concurrency Web Server</h1>
            <p className="cw-hero-subtitle">
              A multi-threaded HTTP/1.0 web server in C featuring a configurable
              thread pool, bounded scheduler queue with Smallest File First
              scheduling, and secure filesystem sandboxing
            </p>
            <div className="cw-hero-buttons">
              <a
                href="https://github.com/fcampoverdeg/Concurrency_Webserver"
                target="_blank"
                rel="noopener noreferrer"
                className="cw-btn cw-btn-primary"
              >
                <FontAwesomeIcon icon={faGithub} /> View on GitHub
              </a>
            </div>
          </div>

          {/* Animated architecture diagram as hero visual */}
          <div className="cw-hero-diagram">
            <div className="cw-arch">
              {/* Clients */}
              <div className="cw-arch-col cw-arch-clients">
                <span className="cw-arch-label">Clients</span>
                <div className="cw-client cw-client-1" />
                <div className="cw-client cw-client-2" />
                <div className="cw-client cw-client-3" />
                <div className="cw-client cw-client-4" />
              </div>

              {/* Arrow */}
              <div className="cw-arch-arrow">
                <div className="cw-arrow-line" />
                <span className="cw-arrow-label">HTTP/1.0</span>
              </div>

              {/* Server */}
              <div className="cw-arch-col cw-arch-server">
                <span className="cw-arch-label">Server</span>
                <div className="cw-server-box">
                  <span className="cw-server-text">accept()</span>
                </div>
              </div>

              {/* Arrow */}
              <div className="cw-arch-arrow">
                <div className="cw-arrow-line" />
                <span className="cw-arrow-label">enqueue</span>
              </div>

              {/* Queue */}
              <div className="cw-arch-col cw-arch-queue">
                <span className="cw-arch-label">Scheduler</span>
                <div className="cw-queue-box">
                  <div className="cw-queue-slot cw-slot-fill cw-slot-1" />
                  <div className="cw-queue-slot cw-slot-fill cw-slot-2" />
                  <div className="cw-queue-slot cw-slot-fill cw-slot-3" />
                  <div className="cw-queue-slot" />
                  <div className="cw-queue-slot" />
                </div>
                <span className="cw-queue-label">SFF Order</span>
              </div>

              {/* Arrow */}
              <div className="cw-arch-arrow">
                <div className="cw-arrow-line" />
                <span className="cw-arrow-label">dequeue</span>
              </div>

              {/* Thread Pool */}
              <div className="cw-arch-col cw-arch-pool">
                <span className="cw-arch-label">Thread Pool</span>
                <div className="cw-thread cw-thread-active">T1</div>
                <div className="cw-thread cw-thread-active">T2</div>
                <div className="cw-thread cw-thread-idle">T3</div>
                <div className="cw-thread cw-thread-idle">T4</div>
              </div>
            </div>
          </div>
        </div>

        {/* ========== OVERVIEW ========== */}
        <div className="cw-section cw-reveal">
          <div className="cw-section-inner">
            <h2 className="cw-section-title">Overview</h2>
            <p className="cw-section-text">
              When you open a website, your browser sends a request to a server.
              A simple server handles one request at a time, but what happens when
              hundreds of users connect at once? They wait in line. This project
              solves that problem by building a server that handles many requests
              simultaneously using threads, like having multiple workers at a
              counter instead of just one.
            </p>
            <p className="cw-section-text">
              The server uses a producer/consumer architecture: the main thread
              accepts incoming connections and places them into a bounded queue.
              Worker threads pull requests from the queue and serve files. The
              queue uses Smallest File First (SFF) scheduling, so small files
              get served quickly even when large downloads are in progress.
            </p>
          </div>
        </div>

        {/* ========== TECH STACK ========== */}
        <div className="cw-section cw-reveal">
          <div className="cw-section-inner">
            <h2 className="cw-section-title">Tech Stack</h2>
            <div className="cw-tech-strip">
              {techStack.map((t, i) => (
                <span key={i} className="cw-tech-chip">{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* ========== HOW IT WORKS (animated) ========== */}
        <div className="cw-section cw-section-wide cw-reveal">
          <div className="cw-section-inner">
            <h2 className="cw-section-title">How It Works</h2>
            <div className="cw-flow">
              <div className="cw-flow-step">
                <div className="cw-flow-num">1</div>
                <h3>Client Connects</h3>
                <p>A browser sends an HTTP/1.0 request to the server's listening socket</p>
              </div>
              <div className="cw-flow-arrow" />
              <div className="cw-flow-step">
                <div className="cw-flow-num">2</div>
                <h3>Server Accepts</h3>
                <p>The main thread calls accept() and gets a file descriptor for the connection</p>
              </div>
              <div className="cw-flow-arrow" />
              <div className="cw-flow-step">
                <div className="cw-flow-num">3</div>
                <h3>Enqueue (SFF)</h3>
                <p>The connection is placed into the bounded buffer, sorted by file size</p>
              </div>
              <div className="cw-flow-arrow" />
              <div className="cw-flow-step">
                <div className="cw-flow-num">4</div>
                <h3>Worker Dequeues</h3>
                <p>A worker thread picks up the smallest request and serves the file</p>
              </div>
              <div className="cw-flow-arrow" />
              <div className="cw-flow-step">
                <div className="cw-flow-num">5</div>
                <h3>Response Sent</h3>
                <p>HTTP headers and file body are sent back to the client over TCP</p>
              </div>
            </div>
          </div>
        </div>

        {/* ========== COMPONENTS ========== */}
        <div className="cw-section cw-reveal">
          <div className="cw-section-inner">
            <h2 className="cw-section-title">Core Components</h2>
            <div className="cw-comp-grid">
              {components.map((c, i) => (
                <div key={i} className="cw-comp-card">
                  <code className="cw-comp-file">{c.name}</code>
                  <h3 className="cw-comp-role">{c.role}</h3>
                  <p className="cw-comp-desc">{c.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ========== USAGE ========== */}
        <div className="cw-section cw-reveal">
          <div className="cw-section-inner">
            <h2 className="cw-section-title">Usage</h2>
            <div className="cw-code-block">
              <div className="cw-code-header">
                <span className="cw-code-dot cw-dot-red" />
                <span className="cw-code-dot cw-dot-yellow" />
                <span className="cw-code-dot cw-dot-green" />
                <span className="cw-code-filename">terminal</span>
              </div>
              <pre className="cw-code"><code>{`# Build
$ make clean && make

# Run the server (4 threads, buffer size 5, port 8000)
$ ./wserver -d www -p 8000 -t 4 -b 5

# Test with curl (in another terminal)
$ curl http://localhost:8000/small.html
$ curl http://localhost:8000/huge.html

# Run automated stress tests
$ cd tests
$ ./test_sff.sh          # SFF scheduling under load
$ ./test_starvation.sh   # Ensures large files get served
$ ./test_traversal.sh    # Queue ordering verification`}</code></pre>
            </div>
          </div>
        </div>

        {/* ========== PROJECT STRUCTURE ========== */}
        <div className="cw-section cw-reveal">
          <div className="cw-section-inner">
            <h2 className="cw-section-title">Project Structure</h2>
            <div className="cw-code-block">
              <div className="cw-code-header">
                <span className="cw-code-dot cw-dot-red" />
                <span className="cw-code-dot cw-dot-yellow" />
                <span className="cw-code-dot cw-dot-green" />
                <span className="cw-code-filename">tree</span>
              </div>
              <pre className="cw-code"><code>{`Concurrency_Webserver/
├── src/
│   ├── wserver.c         # Main server logic
│   ├── wclient.c         # HTTP test client
│   ├── io_helper.c       # Socket utilities
│   ├── request.c         # HTTP request handler
│   ├── scheduler.c       # Bounded buffer (SFF)
│   └── thread_pool.c     # Worker thread management
├── include/              # Header files
├── www/                  # Static HTML files served
├── tests/                # Automated test scripts
├── docs/                 # Project report
└── Makefile`}</code></pre>
            </div>
          </div>
        </div>
      </div>

      <section id="footer" className="footer-section">
        <Footer />
      </section>
    </>
  );
};

export default ConcurrencyWebserverPage;
