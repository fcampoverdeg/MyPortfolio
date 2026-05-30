import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Footer from "../../Footer";
import "./VirtualMemory.css";

const techStack = [
  "C", "Linux Kernel", "Kernel Modules", "Virtual Memory", "POSIX", "Makefile",
];

const VirtualMemoryPage = () => {
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
    const reveals = document.querySelectorAll(".vm-reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("vm-visible");
        });
      },
      { threshold: 0.1 }
    );
    reveals.forEach((el) => observer.observe(el));
    return () => reveals.forEach((el) => observer.unobserve(el));
  }, []);

  return (
    <>
      <div id="virtualmemorypagetablewalker-top" className="vm-page">
        {/* ========== HERO ========== */}
        <div className="vm-hero">
          <div className="vm-hero-content">
            <Link to="/portfolio" className="vm-back-btn">
              <FontAwesomeIcon icon={faArrowLeft} /> Back to Portfolio
            </Link>
            <p className="vm-hero-label">Systems Programming &middot; Virginia Tech</p>
            <h1 className="vm-hero-title">Virtual Memory Page Table Walker</h1>
            <p className="vm-hero-subtitle">
              User-space and kernel-space page table walkers in C that visualize
              Linux virtual-to-physical address translation, comparing vmalloc
              vs kmalloc allocation strategies
            </p>
            <div className="vm-hero-buttons">
              <a
                href="https://github.com/fcampoverdeg/virtual_memory"
                target="_blank"
                rel="noopener noreferrer"
                className="vm-btn vm-btn-primary"
              >
                <FontAwesomeIcon icon={faGithub} /> View on GitHub
              </a>
            </div>
          </div>
          <div className="vm-hero-image">
            <img src="/images/general/virtual_memory_arch.svg" alt="Virtual Memory Architecture" />
          </div>
        </div>

        {/* ========== TECH STACK ========== */}
        <div className="vm-section vm-reveal">
          <div className="vm-section-inner">
            <h2 className="vm-section-title">Tech Stack</h2>
            <div className="vm-tech-strip">
              {techStack.map((t, i) => (
                <span key={i} className="vm-tech-chip">{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* ========== OVERVIEW ========== */}
        <div className="vm-section vm-reveal">
          <div className="vm-section-inner">
            <h2 className="vm-section-title">Overview</h2>
            <p className="vm-section-text">
              Every program thinks it has its own private memory, but that's an
              illusion created by the operating system. Behind the scenes, the CPU
              and OS use page tables to translate the virtual addresses your code
              sees into the real physical addresses where data actually lives in RAM.
            </p>
            <p className="vm-section-text">
              This project peels back that layer. It includes two page table walkers:
              one that runs as a normal program and reads the kernel's mappings through
              /proc/self/pagemap, and another that runs inside the kernel itself as a
              loadable module, directly walking the four-level page table hierarchy
              (PGD, P4D, PUD, PTE) to resolve physical addresses.
            </p>
          </div>
        </div>

        {/* ========== TWO WALKERS ========== */}
        <div className="vm-section vm-reveal">
          <div className="vm-section-inner">
            <h2 className="vm-section-title">Two Approaches</h2>
            <div className="vm-walkers">
              <div className="vm-walker-card">
                <span className="vm-walker-label">User Space</span>
                <h3 className="vm-walker-name">memalloc</h3>
                <p className="vm-walker-desc">
                  Allocates memory using two strategies (many 4KB blocks or one
                  large contiguous block), then reads /proc/self/pagemap to
                  translate each page's virtual address to its physical frame.
                  Demonstrates how the kernel maps user-level memory.
                </p>
                <div className="vm-walker-output">
                  <code>VA=0x7fff4a2b1000 → PA=0x00000001a3c5000</code>
                </div>
              </div>

              <div className="vm-walker-card">
                <span className="vm-walker-label">Kernel Space</span>
                <h3 className="vm-walker-name">ko5204</h3>
                <p className="vm-walker-desc">
                  A loadable kernel module that allocates 1MiB of memory using
                  vmalloc and kmalloc, then walks the kernel page tables directly
                  to log virtual-to-physical mappings. Exposes a /proc/pagetable
                  interface for triggering walks from user space.
                </p>
                <div className="vm-walker-output">
                  <code>Vmalloc: VA=0xffff89af... → PA=0x0000000123...</code>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========== VMALLOC vs KMALLOC ========== */}
        <div className="vm-section vm-section-wide vm-reveal">
          <div className="vm-section-inner">
            <h2 className="vm-section-title">vmalloc vs kmalloc</h2>
            <p className="vm-section-text">
              The key insight from this project is the difference between how the
              kernel's two main allocators map memory:
            </p>
            <div className="vm-compare">
              <div className="vm-compare-col">
                <h3>vmalloc</h3>
                <ul>
                  <li>Virtually contiguous</li>
                  <li>Physically <strong>scattered</strong></li>
                  <li>Pages mapped through full page table walk</li>
                  <li>Physical addresses jump between frames</li>
                  <li>Good for large allocations</li>
                </ul>
                <div className="vm-frames">
                  <span className="vm-frame">42</span>
                  <span className="vm-frame">7</span>
                  <span className="vm-frame">193</span>
                  <span className="vm-frame">88</span>
                  <span className="vm-frame-label">scattered</span>
                </div>
              </div>

              <div className="vm-compare-divider" />

              <div className="vm-compare-col">
                <h3>kmalloc</h3>
                <ul>
                  <li>Virtually contiguous</li>
                  <li>Physically <strong>contiguous</strong></li>
                  <li>Direct-mapped region (virt_to_phys)</li>
                  <li>Physical addresses increase smoothly</li>
                  <li>May fail for large sizes</li>
                </ul>
                <div className="vm-frames">
                  <span className="vm-frame vm-frame-seq">100</span>
                  <span className="vm-frame vm-frame-seq">101</span>
                  <span className="vm-frame vm-frame-seq">102</span>
                  <span className="vm-frame vm-frame-seq">103</span>
                  <span className="vm-frame-label">contiguous</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========== USAGE ========== */}
        <div className="vm-section vm-reveal">
          <div className="vm-section-inner">
            <h2 className="vm-section-title">Usage</h2>
            <div className="vm-code-block">
              <div className="vm-code-header">
                <span className="vm-code-dot vm-dot-red" />
                <span className="vm-code-dot vm-dot-yellow" />
                <span className="vm-code-dot vm-dot-green" />
                <span className="vm-code-filename">terminal</span>
              </div>
              <pre className="vm-code"><code>{`# User-space walker
$ cd user_space && make
$ ./memalloc -b 4K -m 64M -o out_4k.txt    # Many 4KB blocks
$ ./memalloc -b 1G -m 64M -o out_big.txt   # One large block

# Kernel module
$ cd kernel_space && make
$ sudo insmod ko5204.ko
$ echo "vmalloc" | sudo tee /proc/pagetable
$ echo "kmalloc" | sudo tee /proc/pagetable
$ sudo dmesg | tail -n 100                  # View mappings
$ sudo rmmod ko5204`}</code></pre>
            </div>
          </div>
        </div>

        {/* ========== PROJECT STRUCTURE ========== */}
        <div className="vm-section vm-reveal">
          <div className="vm-section-inner">
            <h2 className="vm-section-title">Project Structure</h2>
            <div className="vm-code-block">
              <div className="vm-code-header">
                <span className="vm-code-dot vm-dot-red" />
                <span className="vm-code-dot vm-dot-yellow" />
                <span className="vm-code-dot vm-dot-green" />
                <span className="vm-code-filename">tree</span>
              </div>
              <pre className="vm-code"><code>{`virtual_memory/
├── user_space/
│   ├── memalloc.c      # Main program, allocation modes
│   ├── pagemap.c       # /proc/self/pagemap reader
│   ├── pagemap.h       # Header
│   └── Makefile
└── kernel_space/
    ├── ko5204.c        # Kernel module, page table walker
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

export default VirtualMemoryPage;
