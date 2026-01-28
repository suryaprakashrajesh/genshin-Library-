@font-face {
  font-family: "EthnocentricLightItalic";
  src: url("Ethnocentric-Lt-Italic.ttf") format("truetype");
  font-weight: 300;
  font-style: italic;
  font-display: swap;
}
/* =========================
   RESET
========================= */
html {
  scroll-behavior: smooth;
}


* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: system-ui, sans-serif;
}

@keyframes pageFade {
  from { opacity: 0; }
  to   { opacity: 1; }
}

body {
  background: #ffffff;
  color: #222;
  opacity: 0;
  animation: pageFade 0.6s ease forwards;
}
/* Prevent horizontal scroll when using full-bleed sections */
body {
  overflow-x: hidden;
}
/* =========================
   HERO FONT (ETHNOCENTRIC)
========================= */

.hero h1 {
  text-align: center;
  line-height: 1.15;
}

.title-top {
  display: block;
  font-size: 3rem;
  margin-bottom: 0.4rem;
}

.title-bottom {
  display: block;
  font-size: 2.6rem;
  letter-spacing: 3px;
  white-space: nowrap;
}

.title-top,
.title-bottom {
  font-family: "EthnocentricLightItalic", sans-serif;
}

@media (max-width: 768px) {
  .title-bottom {
    font-size: 2rem;
    letter-spacing: 2px;
  }
}

.hero p,
.hero .btn-primary {
  font-family: system-ui, sans-serif;
}
/* =========================
   NAVBAR
========================= */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 40px;
  background: #ffc0cb;
}

.logo {
  font-weight: 700;
  color: #ffc0cb;
  background: #ffffff;
  padding: 8px 18px;
  border-radius: 24px;
  font-size: 0.95rem;
  transition: all 0.25s ease;
}

.navbar nav a {
  text-decoration: none;
  color: #ffc0cb;
  background: #ffffff;
  margin-left: 14px;
  padding: 7px 16px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.25s ease;
}

.navbar nav a:hover {
  background: #ffc0cb;
  color: #ffffff;
  transform: translateY(-2px);
  border: 1px solid #ffffff;
}

.logo:hover {
  transform: translateY(-1px);
}

.section-title {
  position: relative;
  text-align: center;
  margin: 3rem 0 2rem;
  font-family: "EthnocentricLightItalic", sans-serif;
  font-size: 2.2rem;
}

/* Animated underline */
.section-title::after {
  content: "";
  display: block;
  width: 0;
  height: 3px;
  background: #ffc0cb;
  margin: 12px auto 0;
  border-radius: 2px;
  animation: underlineGrow 1.2s ease forwards;
}

@keyframes underlineGrow {
  from { width: 0; }
  to { width: 120px; }
}



/* =========================
   SEARCH BAR
========================= */
.search-bar {
  position: relative;
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}

.search-bar input {
  width: 340px;
  padding: 12px 18px;
  border-radius: 30px;
  border: 1px solid #ffc0cb;
  outline: none;
}

.search-bar input:focus {
  border-color: #ffc0cb;
  box-shadow: 0 0 0 2px rgba(255,192,203,0.3);
}

#suggestions {
  position: absolute;
  top: 48px;
  width: 340px;
  background: #ffffff;
  border-radius: 14px;
  list-style: none;
  padding: 6px 0;
  box-shadow: 0 8px 18px rgba(0,0,0,0.12);
  display: none;
  z-index: 5;
}

#suggestions li {
  padding: 8px 16px;
  cursor: pointer;
}

#suggestions li:hover {
  background: #fff0f5;
}

/* =========================
   HERO
========================= */
.hero {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4rem 2rem;
  background: #fff5f8;
  border-bottom: 1px solid #f3c2cd;
}

.hero-box {
  text-align: center;
  max-width: 600px;
}

.hero-box p {
  color: #555;
  margin-bottom: 2rem;
}

.btn-primary {
   background: #ffc0cb;
  padding: 14px 34px;
  color: #222;
  text-decoration: none;
  border-radius: 999px;
  font-size: 0.95rem;
  font-weight: 500;
  display: inline-block;
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease,
    background-color 0.25s ease;
}

.btn-primary:hover {
  transform: translateY(-3px);
  background: #ffb6c1; /* slightly deeper pink */
  box-shadow:
    0 10px 24px rgba(255, 192, 203, 0.6),
    0 0 0 6px rgba(255, 192, 203, 0.18);
}
.btn-primary:active {
  transform: translateY(-1px);
  box-shadow:
    0 6px 14px rgba(255, 192, 203, 0.45);
}

/* =========================
   GALLERY
========================= */
.gallery-section {
  max-width: 1200px;
  margin: auto;
  padding: 2.5rem 2rem;
}

.filter-bar {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 2rem;
}

.filter-bar button {
  padding: 8px 18px;
  border-radius: 20px;
  border: 1px solid #ffc0cb;
  background: white;
  cursor: pointer;
}

.filter-bar button.active {
  background: #ffc0cb;
}

.gallery {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.featured {
  grid-column: span 2;
  height: 420px;
}

.featured img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.img-card {
  border-radius: 24px;
  position: relative;
  height: 260px;
  border-radius: 16px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 6px 14px rgba(0,0,0,0.12);
 transition: transform 0.35s ease, box-shadow 0.35s ease;
}
.img-card,
.btn-primary,
.social-links a {
  will-change: transform;
}

.img-card:hover {
  transform: translateY(-6px);
  box-shadow:
    0 12px 26px rgba(0,0,0,0.15),
    0 0 18px rgba(255,192,203,0.45); /* pink glow */
}

.img-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.tag {
  position: absolute;
  bottom: 12px;
  left: 12px;
  background: rgba(255,192,203,0.9);
  padding: 4px 10px;
  font-size: 0.75rem;
  border-radius: 12px;
}

/* =========================
   FOOTER (ABOUT + LINKS)
========================= */
/* Soft divider above footer */
.footer-divider {
  height: 1px;
  width: 100%;
  background: linear-gradient(
    to right,
    transparent,
    #ffc0cb,
    transparent
  );
  margin-top: 4rem;
}

.footer {
  background: #ffc0cb;
  padding: 2.5rem 2rem;
}

/* Make footer background span full viewport width (full-bleed) */
.footer {
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  width: 100vw;
}

.footer-content {
  max-width: 1200px;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 40px;
}
/* Ethnocentric brand in footer */
.footer-brand {
  font-family: "EthnocentricLightItalic", sans-serif;
  font-weight: 300;
  letter-spacing: 2px;
}

/* LEFT: ABOUT */
.footer-about {
  max-width: 520px;
}

.footer-title {
  font-size: 1.4rem;
  margin-bottom: 0.8rem;
  color: #ffffff;
}

.footer-text {
  font-size: 0.95rem;
  color: #ffffff;
  line-height: 1.6;
  margin-bottom: 0.5rem;
}
/* LIVE BADGES */
.live-badges {
  margin-top: 1rem;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.live-badge {
  font-size: 0.75rem;
  padding: 6px 12px;
  border-radius: 14px;
  color: #ffffff;
  font-weight: 600;
  letter-spacing: 0.5px;
  animation: livePulse 1.8s infinite;
}

/* Platform colors */
.live-badge.youtube {
  background: #ff4d4d;
}

.live-badge.twitch {
  background: #9146ff;
}

/* Pulse animation */
@keyframes livePulse {
  0% { opacity: 1; }
  50% { opacity: 0.6; }
  100% { opacity: 1; }
}
@media (max-width: 768px) {
  .live-badges {
    justify-content: center;
  }
}

/* RIGHT: SOCIAL LINKS */
.social-links {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.social-links a {
  text-decoration: none;
  background: #ffffff;
  color: #ffc0cb;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.85rem;
  transition: all 0.25s ease;
}

.social-links a:hover {
  background: #ffc0cb;
  color: #ffffff;
  border: 1px solid #ffffff;
  transform: translateY(-2px);
}
.footer-copy {
  margin-top: 1.5rem;
  font-size: 0.8rem;
  color: rgba(255,255,255,0.85);
}

@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    text-align: center;
  }

  .footer-about {
    max-width: 100%;
  }

  .social-links {
    justify-content: center;
  }

}

/* =========================
   MODAL
========================= */
.modal {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.95);
  display: none;
  justify-content: center;
  align-items: center;
  z-index: 99999;
}

.modal.active {
  display: flex;
}

.modal-img {
  width: 100vw;
  height: 100vh;
  object-fit: contain;
}

.modal-close {
  position: fixed;
  top: 16px;
  right: 16px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #ffc0cb;
  color: #ffffff;
  font-size: 1.8rem;
  cursor: pointer;
  border: none;
}

/* =========================
   FOX CARD
========================= */
.fox-card {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 180px;
  border-radius: 22px;
  background: #fff;
  box-shadow: 0 14px 30px rgba(0,0,0,0.2);
  overflow: hidden;
  z-index: 100000;
  animation: foxFloat 4s ease-in-out infinite;
}

/* Strong override to prevent any ancestor transforms or scripts from changing fixed positioning */
.fox-card {
  position: fixed !important;
  bottom: 20px !important;
  right: 20px !important;
  z-index: 99999 !important;
}
@media (max-width: 600px) {
  .fox-card {
    display: none;
  }
}

@keyframes foxFloat {
  0%,100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

.fox-card video {
  width: 100%;
  display: block;
  pointer-events: none;
}

.fox-actions {
  padding: 10px;
  text-align: center;
}

.fox-subscribe {
  background: #ffc0cb;
  color: #ffffff;
  padding: 8px 18px;
  border-radius: 22px;
  font-size: 0.9rem;
  text-decoration: none;
}
.fox-subscribe:hover {
  background: #ffffff;
  color: #ffc0cb;
  transform: translateY(-2px);
  border: 1px solid #ffc0cb;
}

/* =========================
   MOBILE UX IMPROVEMENTS
========================= */
@media (max-width: 768px) {

  .navbar {
    padding: 12px 14px;
  }

  .navbar nav a {
    margin-left: 6px;
    padding: 6px 12px;
    font-size: 0.85rem;
  }

  .logo {
    font-size: 0.9rem;
    padding: 6px 14px;
  }

  .hero {
    padding: 2.5rem 1.5rem;
  }

  .hero-box h1 {
    font-size: 2rem;
  }

  .gallery {
    grid-template-columns: repeat(2, 1fr);
    gap: 14px;
  }

  .img-card {
    height: 200px;
    border-radius: 14px;
  }

  .tag {
    font-size: 0.7rem;
    padding: 3px 8px;
  }

  .search-bar {
    padding: 0 12px;
  }

  .search-bar input {
    width: 100%;
  }

  #suggestions {
    width: calc(100% - 24px);
    left: 12px;
  }

  .fox-card {
    width: 120px;
    bottom: 12px;
    right: 12px;
    animation: none;
  }

  .fox-subscribe {
    font-size: 0.75rem;
    padding: 6px 12px;
  }
}
