import React, { useState } from "react";

/* ─────────────────────────── GLOBAL STYLES ─────────────────────────── */
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { width: 100%; overflow-x: hidden; }
  body { font-family: 'DM Sans', sans-serif; color: #2d2d2d; background: #fff; }
  #root { width: 100%; min-width: 320px; }
  .page-wrap { width: 100%; max-width: 1400px; margin: 0 auto; }
  :root {
    --green: #2d5c1e; --green-mid: #4a7c3f; --green-light: #6fa85a;
    --orange: #f07c3e; --orange-light: #ffa96a;
    --cream: #fdf8f3; --warm-gray: #f5f0eb;
    --text-dark: #1a2b1a; --text-mid: #4a5e4a; --text-light: #7a907a;
  }

  /* ── TOP BAR ── */
  .top-bar {
    background: var(--green-mid); color: #fff;
    font-size: 0.85rem; font-weight: 500;
    display: flex; align-items: center; justify-content: center;
    width: 100%;
  }
  .top-bar-inner {
    width: 100%; max-width: 1400px; padding: 7px 5%;
    display: flex; align-items: center; gap: 6px;
  }
  .top-bar a { color: #fff; text-decoration: none; }

  /* ── NAV ── */
  .nav {
    position: sticky; top: 0; z-index: 200;
    background: #fff; border-bottom: 1px solid #e0dbd5;
    box-shadow: 0 2px 10px rgba(0,0,0,0.07);
    width: 100%; display: flex; justify-content: center;
  }
  .nav-inner {
    width: 100%; max-width: 1400px; padding: 0 5%;
    display: flex; align-items: center; justify-content: space-between;
    height: 88px;
  }
  .nav-logo { cursor: pointer; display: flex; flex-direction: column; align-items: flex-start; }
  .nav-logo-main {
    font-family: 'Playfair Display', serif; font-size: 2rem; font-weight: 700;
    color: var(--green); letter-spacing: -0.5px; line-height: 1.1;
  }
  .nav-logo-main em { font-style: italic; }
  .nav-logo-sub {
    font-size: 0.68rem; color: var(--green); letter-spacing: 0.07em;
    text-transform: uppercase; margin-top: 3px;
    border-top: 1px solid #b5c9ae; padding-top: 3px; width: 100%; text-align: center;
  }
  .nav-links { display: flex; align-items: center; }
  .nav-links button {
    background: none; border: none; cursor: pointer;
    font-family: 'DM Sans', sans-serif; font-size: 0.92rem; font-weight: 500;
    color: #2d2d2d; padding: 8px 16px;
    transition: color .2s; display: flex; align-items: center; gap: 4px;
  }
  .nav-links button:hover { color: var(--green); }
  .nav-links button.active { color: var(--green); font-weight: 700; }
  .nav-links .chevron { font-size: 0.6rem; opacity: 0.6; transition: transform .2s; }
  .nav-links .chevron.open { transform: rotate(180deg); opacity: 1; }

  /* ── NAV DROPDOWN ── */
  .nav-item { position: relative; }
  .nav-dropdown {
    position: absolute; top: calc(100% + 8px); left: 0;
    background: #fff; border-radius: 10px; min-width: 220px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.13); border: 1px solid #ede8e1;
    z-index: 300; overflow: hidden;
    animation: dropIn .18s ease;
  }
  @keyframes dropIn { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
  .nav-dropdown-item {
    display: block; width: 100%; background: none; border: none;
    padding: 11px 18px; text-align: left; cursor: pointer;
    font-family: 'DM Sans', sans-serif; font-size: 0.88rem; color: #2d2d2d;
    transition: background .15s, color .15s; border-bottom: 1px solid #f0ebe5;
  }
  .nav-dropdown-item:last-child { border-bottom: none; }
  .nav-dropdown-item:hover { background: var(--cream); color: var(--green); font-weight: 600; }

  /* ── PAGE HERO BANNER (reused across pages) ── */
  .page-banner {
    background: linear-gradient(135deg, var(--green) 0%, var(--green-mid) 100%);
    color: #fff; position: relative; overflow: hidden; width: 100%;
    display: flex; justify-content: center;
  }
  .page-banner-inner {
    width: 100%; max-width: 1400px; padding: 70px 5% 60px; position: relative; z-index: 1;
  }
  .page-banner::after {
    content: ''; position: absolute; right: -60px; top: -60px;
    width: 400px; height: 400px; border-radius: 50%;
    background: rgba(255,255,255,0.05);
  }
  .page-banner-label {
    font-size: 0.75rem; font-weight: 700; text-transform: uppercase;
    letter-spacing: 0.12em; color: rgba(255,255,255,0.65); margin-bottom: 12px;
  }
  .page-banner h1 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2rem, 4vw, 3.2rem); font-weight: 700; line-height: 1.15;
    margin-bottom: 16px;
  }
  .page-banner p { font-size: 1rem; color: rgba(255,255,255,0.82); max-width: 560px; line-height: 1.65; }

  /* ── SECTION UTILS ── */
  .section { padding: 72px 0; width: 100%; display: flex; justify-content: center; }
  .section-inner { width: 100%; max-width: 1400px; padding: 0 5%; }
  .section-label {
    font-size: 0.75rem; font-weight: 700; text-transform: uppercase;
    letter-spacing: 0.12em; color: var(--orange); margin-bottom: 10px;
  }
  .section-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.7rem, 3vw, 2.5rem); color: var(--text-dark); line-height: 1.2; margin-bottom: 14px;
  }
  .section-sub { color: var(--text-mid); font-size: 0.97rem; line-height: 1.65; max-width: 560px; }
  .section-header { margin-bottom: 52px; }
  .bg-cream { background: var(--cream); }
  .bg-warm { background: var(--warm-gray); }
  .bg-green { background: var(--green); }

  /* ── CARDS ── */
  .card-grid-3 { display: grid; grid-template-columns: repeat(3,1fr); gap: 28px; }
  .card-grid-2 { display: grid; grid-template-columns: repeat(2,1fr); gap: 28px; }
  .card-grid-4 { display: grid; grid-template-columns: repeat(4,1fr); gap: 24px; }
  .card {
    background: #fff; border-radius: 20px; border: 1px solid #ede8e1;
    overflow: hidden; transition: transform .25s, box-shadow .25s;
  }
  .card:hover { transform: translateY(-6px); box-shadow: 0 16px 40px rgba(0,0,0,0.09); }
  .card-img { height: 200px; overflow: hidden; }
  .card-img img { width: 100%; height: 100%; object-fit: cover; transition: transform .4s; }
  .card:hover .card-img img { transform: scale(1.05); }
  .card-body { padding: 22px; }
  .card-tag {
    display: inline-block; background: rgba(45,92,30,0.1); color: var(--green);
    border-radius: 20px; padding: 3px 11px; font-size: 0.72rem; font-weight: 700;
    text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 10px;
  }
  .card-title { font-weight: 700; font-size: 1rem; margin-bottom: 8px; color: var(--text-dark); }
  .card-desc { color: var(--text-mid); font-size: 0.88rem; line-height: 1.55; }

  /* ── BUTTONS ── */
  .btn-primary {
    background: var(--green); color: #fff; border: none; border-radius: 30px;
    padding: 13px 28px; font-size: 0.95rem; font-weight: 600;
    cursor: pointer; transition: all .2s; font-family: 'DM Sans', sans-serif;
  }
  .btn-primary:hover { background: var(--green-mid); transform: translateY(-2px); box-shadow: 0 8px 20px rgba(45,92,30,0.25); }
  .btn-orange {
    background: var(--orange); color: #fff; border: none; border-radius: 30px;
    padding: 13px 28px; font-size: 0.95rem; font-weight: 600;
    cursor: pointer; transition: all .2s; font-family: 'DM Sans', sans-serif;
  }
  .btn-orange:hover { background: var(--orange-light); transform: translateY(-2px); }
  .btn-outline {
    background: transparent; color: var(--green); border: 2px solid var(--green);
    border-radius: 30px; padding: 12px 26px; font-size: 0.95rem; font-weight: 600;
    cursor: pointer; transition: all .2s; font-family: 'DM Sans', sans-serif;
  }
  .btn-outline:hover { background: var(--green); color: #fff; }

  /* ── FOOTER ── */
  .footer { background: var(--text-dark); color: rgba(255,255,255,0.65); width: 100%; display: flex; justify-content: center; }
  .footer-inner { width: 100%; max-width: 1400px; padding: 56px 5% 28px; }
  .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 40px; margin-bottom: 44px; }
  .footer-logo {
    font-family: 'Playfair Display', serif; font-size: 1.4rem;
    color: #fff; margin-bottom: 12px;
  }
  .footer-logo em { font-style: italic; }
  .footer-logo span { color: var(--orange-light); }
  .footer-desc { font-size: 0.86rem; line-height: 1.6; margin-bottom: 18px; }
  .footer-col-title { color: #fff; font-weight: 700; font-size: 0.88rem; margin-bottom: 14px; }
  .footer-links { list-style: none; display: flex; flex-direction: column; gap: 9px; }
  .footer-links button {
    background: none; border: none; cursor: pointer;
    color: rgba(255,255,255,0.55); font-size: 0.86rem;
    font-family: 'DM Sans', sans-serif; text-align: left; padding: 0;
    transition: color .2s;
  }
  .footer-links button:hover { color: var(--green-light); }
  .footer-bottom {
    border-top: 1px solid rgba(255,255,255,0.08); padding-top: 22px;
    display: flex; justify-content: space-between; font-size: 0.8rem;
  }

  /* ── HOME HERO ── */
  .hero {
    width: 100%; position: relative; overflow: hidden; min-height: 520px;
    display: flex; justify-content: center; align-items: stretch;
  }
  .hero-bg {
    position: absolute; inset: 0; z-index: 0;
  }
  .hero-bg img { width: 100%; height: 100%; object-fit: cover; object-position: center top; }
  .hero-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to right, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0.3) 100%);
  }
  .hero-inner {
    width: 100%; max-width: 1400px; padding: 60px 5%;
    display: grid; grid-template-columns: 1fr 400px; gap: 60px; align-items: center;
    position: relative; z-index: 1;
  }
  .hero-text h1 {
    font-family: 'Playfair Display', serif; font-style: italic;
    font-size: clamp(2rem, 4vw, 3.2rem); line-height: 1.2;
    color: #fff; margin-bottom: 12px;
  }
  .hero-text p { font-size: 0.95rem; color: rgba(255,255,255,0.88); line-height: 1.6; margin-top: 10px; }

  /* hero contact form card */
  .hero-form-card {
    background: #fff; border-radius: 6px; padding: 24px 22px;
    box-shadow: 0 6px 28px rgba(0,0,0,0.18);
  }
  .hero-form-card h3 {
    font-family: 'Playfair Display', serif; font-size: 1.3rem;
    color: var(--text-dark); margin-bottom: 14px; text-align: center;
  }
  .hf-row { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 10px; }
  .hf-input {
    width: 100%; padding: 9px 12px; border: 1px solid #ccc; border-radius: 4px;
    font-size: 0.85rem; font-family: 'DM Sans', sans-serif; color: var(--text-dark);
    outline: none; transition: border-color .2s; background: #fff;
  }
  .hf-input:focus { border-color: var(--green); }
  .hf-input.full { grid-column: 1 / -1; }
  .hf-select {
    width: 100%; padding: 9px 12px; border: 1px solid #ccc; border-radius: 4px;
    font-size: 0.85rem; font-family: 'DM Sans', sans-serif; color: var(--text-dark);
    outline: none; background: #fff; margin-bottom: 10px;
  }
  .hf-textarea {
    width: 100%; padding: 9px 12px; border: 1px solid #ccc; border-radius: 4px;
    font-size: 0.85rem; font-family: 'DM Sans', sans-serif; color: var(--text-dark);
    outline: none; resize: vertical; min-height: 80px; margin-bottom: 12px; background: #fff;
  }
  .hf-submit {
    width: 100%; background: var(--orange); color: #fff; border: none;
    border-radius: 4px; padding: 11px; font-size: 0.95rem; font-weight: 700;
    cursor: pointer; font-family: 'DM Sans', sans-serif; transition: background .2s;
  }
  .hf-submit:hover { background: #d96a2e; }

  /* ── WHO/WHAT/MISSION strip ── */
  .info-strip {
    width: 100%; display: flex; justify-content: center; background: #f7f4ef;
  }
  .info-strip-inner {
    width: 100%; max-width: 1400px; padding: 56px 5%;
    display: grid; grid-template-columns: repeat(3,1fr); gap: 40px;
  }
  .info-col-icon {
    width: 48px; height: 48px; background: var(--green); border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 1.3rem; margin-bottom: 14px;
  }
  .info-col h3 {
    font-family: 'Playfair Display', serif; font-size: 1.2rem;
    color: var(--green); margin-bottom: 10px;
  }
  .info-col p { font-size: 0.88rem; color: #555; line-height: 1.65; }

  /* ── OUR SERVICES grid ── */
  .home-services-section {
    width: 100%; display: flex; justify-content: center; background: #fff;
  }
  .home-services-inner {
    width: 100%; max-width: 1400px; padding: 60px 5%;
  }
  .home-services-title {
    font-family: 'Playfair Display', serif; font-size: clamp(1.8rem,3vw,2.4rem);
    color: var(--text-dark); text-align: center; margin-bottom: 40px;
  }
  .services-icon-grid {
    display: grid; grid-template-columns: repeat(4,1fr); gap: 0;
    border: 1px solid #e5e5e5; border-radius: 6px; overflow: hidden;
  }
  .svc-item {
    padding: 24px 20px; border-right: 1px solid #e5e5e5; border-bottom: 1px solid #e5e5e5;
    transition: background .2s;
  }
  .svc-item:hover { background: #f7f4ef; }
  .svc-item:nth-child(4n) { border-right: none; }
  .svc-item:nth-last-child(-n+4) { border-bottom: none; }
  .svc-icon { color: var(--green); font-size: 1.5rem; margin-bottom: 10px; }
  .svc-name { font-weight: 700; font-size: 0.95rem; color: var(--text-dark); margin-bottom: 6px; }
  .svc-desc { font-size: 0.82rem; color: #666; line-height: 1.55; }

  /* ── DIFFERENCE section ── */
  .difference-section {
    width: 100%; display: flex; justify-content: center; background: #f7f4ef;
  }
  .difference-inner {
    width: 100%; max-width: 1400px; padding: 60px 5%;
    display: grid; grid-template-columns: 1fr auto; gap: 60px; align-items: center;
  }
  .difference-inner h2 {
    font-family: 'Playfair Display', serif; font-size: 1.3rem;
    color: var(--text-dark); margin-bottom: 16px;
  }
  .difference-inner p { font-size: 0.9rem; color: #555; line-height: 1.7; margin-bottom: 24px; }
  .gold-seal {
    width: 120px; height: 120px; background: radial-gradient(circle, #d4a017 0%, #a67c00 100%);
    border-radius: 50%; display: flex; flex-direction: column; align-items: center;
    justify-content: center; box-shadow: 0 4px 20px rgba(166,124,0,0.4); flex-shrink: 0;
    border: 4px solid #f0c040;
  }
  .gold-seal-text { color: #fff; font-size: 0.62rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.06em; text-align: center; line-height: 1.3; padding: 0 10px; }
  .gold-seal-year { color: #fff3; font-size: 0.7rem; margin-top: 4px; }

  /* ── BOLD BANNER ── */
  .bold-banner {
    width: 100%; display: flex; justify-content: center;
    background: #4a5c2a;
  }
  .bold-banner-inner {
    width: 100%; max-width: 1400px; padding: 60px 5%; text-align: center;
  }
  .bold-banner h2 {
    font-family: 'Playfair Display', serif; font-size: clamp(1.8rem, 3.5vw, 3rem);
    font-weight: 900; color: #fff; line-height: 1.2; text-transform: uppercase;
    letter-spacing: 0.02em;
  }

  /* ── CARE TYPES grid ── */
  .care-types-section {
    width: 100%; display: flex; justify-content: center; background: #fff;
  }
  .care-types-inner {
    width: 100%; max-width: 1400px; padding: 60px 5%;
    display: grid; grid-template-columns: repeat(2,1fr); gap: 32px;
  }
  .care-card { padding: 0; }
  .care-card h3 {
    font-family: 'Playfair Display', serif; font-size: 1.15rem;
    color: var(--green); margin-bottom: 12px;
  }
  .care-card p { font-size: 0.87rem; color: #555; line-height: 1.65; margin-bottom: 16px; }
  .care-card p strong { color: var(--text-dark); font-weight: 700; }
  .btn-learn {
    display: inline-block; background: var(--orange); color: #fff; border: none;
    border-radius: 4px; padding: 9px 22px; font-size: 0.85rem; font-weight: 700;
    cursor: pointer; font-family: 'DM Sans', sans-serif; transition: background .2s;
  }
  .btn-learn:hover { background: #d96a2e; }

  @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }

  .faq-wrap { max-width: 700px; margin: 0 auto; }
  .faq-item { border-bottom: 1px solid #e0d8cf; padding: 18px 0; }
  .faq-q { display: flex; justify-content: space-between; align-items: center; font-weight: 600; font-size: 0.96rem; cursor: pointer; color: var(--text-dark); }
  .faq-icon { font-size: 1.1rem; color: var(--green); transition: transform .3s; }
  .faq-icon.open { transform: rotate(45deg); }
  .faq-a { font-size: 0.88rem; color: var(--text-mid); line-height: 1.65; padding-top: 12px; }

  /* kept for other pages */
  .steps-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 28px; }
  .step-card { background: var(--cream); border-radius: 20px; padding: 34px 28px; border: 1px solid #ede8e1; position: relative; transition: transform .25s, box-shadow .25s; }
  .step-card:hover { transform: translateY(-5px); box-shadow: 0 14px 36px rgba(0,0,0,0.08); }
  .step-num { font-family: 'Playfair Display', serif; font-size: 3rem; font-weight: 700; color: rgba(45,92,30,0.1); position: absolute; top: 18px; right: 22px; line-height: 1; }
  .step-icon { width: 52px; height: 52px; border-radius: 14px; background: var(--green); display: flex; align-items: center; justify-content: center; font-size: 1.4rem; margin-bottom: 18px; }
  .step-title { font-weight: 700; font-size: 1.05rem; margin-bottom: 8px; color: var(--text-dark); }
  .step-desc { color: var(--text-mid); font-size: 0.9rem; line-height: 1.6; }
  .testimonials-wrap { display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; }
  .tcard { background: rgba(255,255,255,0.09); border: 1px solid rgba(255,255,255,0.14); border-radius: 20px; padding: 30px; transition: background .2s; }
  .tcard:hover { background: rgba(255,255,255,0.14); }
  .tcard-quote { font-size: 2.2rem; color: var(--orange-light); line-height: 1; margin-bottom: 14px; }
  .tcard-text { color: rgba(255,255,255,0.85); font-size: 0.92rem; line-height: 1.65; margin-bottom: 22px; }
  .tcard-author { display: flex; align-items: center; gap: 12px; }
  .tcard-avatar { width: 46px; height: 46px; border-radius: 50%; overflow: hidden; border: 2px solid rgba(255,255,255,0.25); }
  .tcard-avatar img { width: 100%; height: 100%; object-fit: cover; }
  .tcard-name { color: #fff; font-weight: 600; font-size: 0.88rem; }
  .tcard-loc { color: rgba(255,255,255,0.5); font-size: 0.75rem; margin-top: 2px; }

  /* ── SERVICES PAGE ── */
  .service-hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; margin-bottom: 28px; }
  .service-big { border-radius: 20px; overflow: hidden; position: relative; height: 340px; }
  .service-big img { width: 100%; height: 100%; object-fit: cover; }
  .service-big-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 55%);
    display: flex; flex-direction: column; justify-content: flex-end; padding: 28px;
  }
  .service-big-title { color: #fff; font-family: 'Playfair Display', serif; font-size: 1.5rem; font-weight: 700; }
  .service-big-desc { color: rgba(255,255,255,0.8); font-size: 0.88rem; margin-top: 6px; }

  /* ── SERVICE DETAIL PAGE ── */
  .svc-detail-hero {
    width: 100%; position: relative; overflow: hidden; min-height: 420px;
    display: flex; justify-content: center; align-items: stretch;
  }
  .svc-detail-hero-bg { position: absolute; inset: 0; z-index: 0; }
  .svc-detail-hero-bg img { width: 100%; height: 100%; object-fit: cover; object-position: center; }
  .svc-detail-hero-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to right, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.3) 100%);
  }
  .svc-detail-hero-inner {
    width: 100%; max-width: 1400px; padding: 60px 5%;
    display: grid; grid-template-columns: 1fr 380px; gap: 60px; align-items: center;
    position: relative; z-index: 1;
  }
  .svc-detail-hero-text .svc-label {
    font-size: 0.75rem; font-weight: 700; text-transform: uppercase;
    letter-spacing: 0.12em; color: var(--orange-light); margin-bottom: 10px;
  }
  .svc-detail-hero-text h1 {
    font-family: 'Playfair Display', serif; font-weight: 700;
    font-size: clamp(2rem, 4vw, 3rem); color: #fff; line-height: 1.2; margin-bottom: 14px;
  }
  .svc-detail-hero-text p { font-size: 0.97rem; color: rgba(255,255,255,0.85); line-height: 1.65; max-width: 520px; }
  .svc-detail-form {
    background: #fff; border-radius: 10px; padding: 28px 24px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.2);
  }
  .svc-detail-form h3 {
    font-family: 'Playfair Display', serif; font-size: 1.25rem;
    color: var(--text-dark); margin-bottom: 16px; text-align: center;
  }
  .sdf-group { margin-bottom: 11px; }
  .sdf-row { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 11px; }
  .sdf-input, .sdf-select, .sdf-textarea {
    width: 100%; padding: 9px 12px; border: 1px solid #d0d0d0; border-radius: 6px;
    font-size: 0.86rem; font-family: 'DM Sans', sans-serif; color: var(--text-dark);
    background: #fff; outline: none; transition: border-color .2s;
  }
  .sdf-input:focus, .sdf-select:focus, .sdf-textarea:focus { border-color: var(--green); }
  .sdf-textarea { resize: vertical; min-height: 70px; }
  .sdf-submit {
    width: 100%; background: var(--orange); color: #fff; border: none;
    border-radius: 6px; padding: 12px; font-size: 0.95rem; font-weight: 700;
    cursor: pointer; font-family: 'DM Sans', sans-serif; transition: background .2s; margin-top: 4px;
  }
  .sdf-submit:hover { background: #d96a2e; }

  .svc-content-grid { display: grid; grid-template-columns: 1fr 420px; gap: 60px; align-items: start; }
  .svc-body-text p { font-size: 0.92rem; color: #555; line-height: 1.75; margin-bottom: 18px; }
  .svc-included-box {
    background: var(--cream); border: 1px solid #e0d8cf; border-radius: 16px;
    padding: 28px 32px; margin-bottom: 28px;
  }
  .svc-included-box h3 {
    font-family: 'Playfair Display', serif; font-size: 1.15rem;
    color: var(--green); margin-bottom: 16px;
  }
  .svc-included-list { list-style: none; display: flex; flex-direction: column; gap: 10px; }
  .svc-included-list li { display: flex; gap: 10px; align-items: flex-start; font-size: 0.88rem; color: var(--text-mid); }
  .svc-included-list li::before { content: "✓"; color: var(--green); font-weight: 700; flex-shrink: 0; margin-top: 1px; }
  .svc-sidebar-img { border-radius: 18px; overflow: hidden; height: 320px; margin-bottom: 24px; }
  .svc-sidebar-img img { width: 100%; height: 100%; object-fit: cover; }
  .svc-sidebar-links { background: var(--green); border-radius: 16px; padding: 24px; }
  .svc-sidebar-links h4 { color: #fff; font-weight: 700; font-size: 0.9rem; margin-bottom: 14px; text-transform: uppercase; letter-spacing: 0.06em; }
  .svc-sidebar-link-btn {
    display: block; width: 100%; background: rgba(255,255,255,0.12); color: #fff;
    border: 1px solid rgba(255,255,255,0.2); border-radius: 8px;
    padding: 10px 14px; font-size: 0.86rem; font-weight: 500; text-align: left;
    cursor: pointer; font-family: 'DM Sans', sans-serif; margin-bottom: 8px;
    transition: background .2s;
  }
  .svc-sidebar-link-btn:hover { background: rgba(255,255,255,0.22); }
  .svc-sidebar-link-btn.active-svc { background: rgba(255,255,255,0.9); color: var(--green); font-weight: 700; }
  .svc-back-btn {
    display: inline-flex; align-items: center; gap: 6px;
    background: none; border: none; cursor: pointer; color: var(--green);
    font-size: 0.88rem; font-weight: 600; font-family: 'DM Sans', sans-serif;
    padding: 0; margin-bottom: 24px; transition: color .2s;
  }
  .svc-back-btn:hover { color: var(--green-mid); }

  @media (max-width: 1000px) {
    .svc-detail-hero-inner { grid-template-columns: 1fr; }
    .svc-detail-form { max-width: 480px; }
    .svc-content-grid { grid-template-columns: 1fr; }
  }

  /* ── ABOUT PAGE ── */
  .about-split { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
  .about-img { border-radius: 24px; overflow: hidden; height: 460px; }
  .about-img img { width: 100%; height: 100%; object-fit: cover; }
  .about-list { list-style: none; display: flex; flex-direction: column; gap: 16px; margin-top: 28px; }
  .about-list li { display: flex; gap: 12px; align-items: flex-start; }
  .about-check { width: 26px; height: 26px; border-radius: 50%; background: var(--green); color: #fff; display: flex; align-items: center; justify-content: center; font-size: 0.8rem; flex-shrink: 0; margin-top: 1px; }
  .about-list-title { font-weight: 700; font-size: 0.95rem; color: var(--text-dark); }
  .about-list-desc { font-size: 0.86rem; color: var(--text-mid); margin-top: 3px; line-height: 1.5; }
  .team-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 24px; }
  .team-card { background: #fff; border-radius: 18px; overflow: hidden; border: 1px solid #ede8e1; text-align: center; transition: transform .25s, box-shadow .25s; }
  .team-card:hover { transform: translateY(-5px); box-shadow: 0 14px 36px rgba(0,0,0,0.09); }
  .team-img { height: 200px; overflow: hidden; }
  .team-img img { width: 100%; height: 100%; object-fit: cover; }
  .team-body { padding: 18px 14px; }
  .team-name { font-weight: 700; font-size: 0.96rem; color: var(--text-dark); }
  .team-role { font-size: 0.8rem; color: var(--text-mid); margin-top: 4px; }
  .values-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; }
  .value-card { background: #fff; border-radius: 18px; padding: 30px; border: 1px solid #ede8e1; }
  .value-icon { font-size: 2rem; margin-bottom: 14px; }
  .value-title { font-weight: 700; font-size: 1rem; margin-bottom: 8px; color: var(--text-dark); }
  .value-desc { font-size: 0.88rem; color: var(--text-mid); line-height: 1.55; }

  /* ── RESOURCES PAGE ── */
  .resource-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; }
  .resource-card { background: #fff; border-radius: 18px; border: 1px solid #ede8e1; overflow: hidden; transition: transform .25s, box-shadow .25s; }
  .resource-card:hover { transform: translateY(-5px); box-shadow: 0 14px 36px rgba(0,0,0,0.09); }
  .resource-img { height: 180px; overflow: hidden; }
  .resource-img img { width: 100%; height: 100%; object-fit: cover; }
  .resource-body { padding: 22px; }
  .resource-type { font-size: 0.72rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--orange); margin-bottom: 8px; }
  .resource-title { font-weight: 700; font-size: 0.98rem; margin-bottom: 8px; color: var(--text-dark); }
  .resource-excerpt { font-size: 0.86rem; color: var(--text-mid); line-height: 1.55; }
  .resource-date { font-size: 0.76rem; color: var(--text-light); margin-top: 12px; }
  .guide-card { background: var(--cream); border: 1px solid #e0d8cf; border-radius: 18px; padding: 28px; display: flex; gap: 18px; align-items: flex-start; }
  .guide-icon { font-size: 2rem; }
  .guide-title { font-weight: 700; font-size: 1rem; margin-bottom: 6px; color: var(--text-dark); }
  .guide-desc { font-size: 0.86rem; color: var(--text-mid); line-height: 1.5; }

  /* ── LOCATIONS PAGE ── */
  .locations-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; }
  .loc-card { background: #fff; border-radius: 18px; padding: 28px; border: 1px solid #ede8e1; transition: transform .25s, box-shadow .25s; }
  .loc-card:hover { transform: translateY(-5px); box-shadow: 0 14px 36px rgba(0,0,0,0.09); }
  .loc-city { font-family: 'Playfair Display', serif; font-size: 1.3rem; font-weight: 700; color: var(--text-dark); margin-bottom: 6px; }
  .loc-state { font-size: 0.78rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--green); margin-bottom: 14px; }
  .loc-detail { font-size: 0.86rem; color: var(--text-mid); margin-bottom: 6px; display: flex; align-items: center; gap: 8px; }
  .loc-btn { margin-top: 18px; }
  .map-placeholder { background: var(--warm-gray); border-radius: 20px; height: 360px; display: flex; align-items: center; justify-content: center; margin-bottom: 56px; border: 1px solid #e0d8cf; }
  .map-placeholder-inner { text-align: center; }
  .map-placeholder-icon { font-size: 3rem; margin-bottom: 12px; }
  .map-placeholder-text { font-size: 1.1rem; color: var(--text-mid); font-weight: 500; }

  /* ── CONTACT PAGE ── */
  .contact-grid { display: grid; grid-template-columns: 1fr 1.4fr; gap: 56px; }
  .contact-info { display: flex; flex-direction: column; gap: 24px; }
  .contact-info-item { display: flex; gap: 16px; align-items: flex-start; }
  .contact-icon { width: 48px; height: 48px; border-radius: 14px; background: rgba(45,92,30,0.1); display: flex; align-items: center; justify-content: center; font-size: 1.3rem; flex-shrink: 0; }
  .contact-info-title { font-weight: 700; font-size: 0.96rem; color: var(--text-dark); margin-bottom: 4px; }
  .contact-info-val { font-size: 0.9rem; color: var(--text-mid); line-height: 1.5; }
  .contact-form { background: var(--cream); border-radius: 24px; padding: 40px; border: 1px solid #e0d8cf; }
  .contact-form h3 { font-family: 'Playfair Display', serif; font-size: 1.5rem; margin-bottom: 24px; color: var(--text-dark); }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .form-group { margin-bottom: 18px; }
  .form-label { font-size: 0.82rem; font-weight: 600; color: var(--text-mid); margin-bottom: 6px; display: block; }
  .form-input, .form-select, .form-textarea {
    width: 100%; padding: 12px 16px; border: 1px solid #ddd; border-radius: 12px;
    font-size: 0.92rem; font-family: 'DM Sans', sans-serif; color: var(--text-dark);
    background: #fff; outline: none; transition: border-color .2s;
  }
  .form-input:focus, .form-select:focus, .form-textarea:focus { border-color: var(--green); }
  .form-textarea { resize: vertical; min-height: 110px; }

  /* ── CTA STRIP ── */
  .cta-strip { background: linear-gradient(135deg, var(--orange) 0%, #e85d26 100%); width: 100%; display: flex; justify-content: center; }
  .cta-strip-inner { width: 100%; max-width: 1400px; padding: 64px 5%; text-align: center; }
  .cta-strip h2 { font-family: 'Playfair Display', serif; font-size: clamp(1.7rem,3vw,2.6rem); color: #fff; margin-bottom: 14px; }
  .cta-strip p { color: rgba(255,255,255,0.85); font-size: 0.98rem; margin-bottom: 28px; }
  .cta-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }
  .btn-white { background: #fff; color: var(--orange); border: none; border-radius: 30px; padding: 13px 30px; font-size: 0.95rem; font-weight: 700; cursor: pointer; transition: all .2s; font-family: 'DM Sans', sans-serif; }
  .btn-white:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.18); }
  .btn-outline-white { background: transparent; color: #fff; border: 2px solid rgba(255,255,255,0.6); border-radius: 30px; padding: 12px 28px; font-size: 0.95rem; font-weight: 600; cursor: pointer; transition: all .2s; font-family: 'DM Sans', sans-serif; }
  .btn-outline-white:hover { border-color: #fff; background: rgba(255,255,255,0.1); }

  /* ── RESPONSIVE ── */
  @media (max-width: 1000px) {
    .hero-inner { grid-template-columns: 1fr; }
    .hero-form-card { max-width: 480px; }
    .info-strip-inner { grid-template-columns: 1fr; gap: 28px; }
    .about-split, .contact-grid { grid-template-columns: 1fr; }
    .card-grid-3, .testimonials-wrap, .values-grid, .resource-grid, .locations-grid { grid-template-columns: 1fr 1fr; }
    .card-grid-4, .team-grid { grid-template-columns: 1fr 1fr; }
    .services-icon-grid { grid-template-columns: repeat(2,1fr); }
    .svc-item:nth-child(4n) { border-right: 1px solid #e5e5e5; }
    .svc-item:nth-child(2n) { border-right: none; }
    .difference-inner { grid-template-columns: 1fr; }
    .gold-seal { display: none; }
    .care-types-inner { grid-template-columns: 1fr; }
    .footer-grid { grid-template-columns: 1fr 1fr; }
    .service-hero-grid { grid-template-columns: 1fr; }
  }
  @media (max-width: 640px) {
    .hero-inner { padding: 40px 5%; }
    .hf-row { grid-template-columns: 1fr; }
    .card-grid-3, .card-grid-4, .team-grid, .values-grid, .resource-grid, .locations-grid, .testimonials-wrap { grid-template-columns: 1fr; }
    .services-icon-grid { grid-template-columns: 1fr 1fr; }
    .nav-links { display: none; }
    .form-row { grid-template-columns: 1fr; }
  }
`;

/* ─────────────────── DATA ─────────────────── */
const CAREGIVERS = [
  { name: "Maria Santos", role: "Companion Care", rating: "★★★★★", reviews: 48, rate: "$22/hr", avail: "Available Now", img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80" },
  { name: "James Reyes", role: "Personal Care Aide", rating: "★★★★★", reviews: 63, rate: "$25/hr", avail: "Available Today", img: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&q=80" },
  { name: "Linda Cruz", role: "Dementia Specialist", rating: "★★★★☆", reviews: 37, rate: "$28/hr", avail: "Available Now", img: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&q=80" },
  { name: "Robert Lee", role: "Mobility Support", rating: "★★★★★", reviews: 55, rate: "$24/hr", avail: "Available Today", img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80" },
];
const TESTIMONIALS = [
  { text: "Senior Buddies matched us with an incredible caregiver for my mother within 24 hours. The process was seamless and the care quality has been outstanding.", name: "Patricia Gomez", loc: "San Diego, CA", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80" },
  { text: "I was skeptical at first, but the vetted caregivers and transparent pricing made it so easy to trust. My dad loves his buddy and we have peace of mind.", name: "David Chen", loc: "Austin, TX", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80" },
  { text: "After months of searching, Senior Buddies connected us with a dementia specialist who truly understands my wife's needs. Life-changing service!", name: "Robert Alvarez", loc: "Miami, FL", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80" },
];
const FAQS = [
  { q: "How are caregivers vetted?", a: "All Senior Buddies caregivers undergo thorough background checks, identity verification, reference checks, and in-person interviews before joining our platform." },
  { q: "How quickly can I find a caregiver?", a: "Most families are matched within 24–48 hours. In urgent situations, same-day matches are often available." },
  { q: "What if I'm not satisfied with my caregiver?", a: "Your satisfaction is our priority. We'll find you a new caregiver at no extra charge — no questions asked." },
  { q: "Is there a minimum number of hours?", a: "We offer flexible scheduling starting at just 4 hours per visit. Live-in care is also available." },
  { q: "How does billing work?", a: "We bill weekly through our secure platform. You'll receive a detailed invoice — no hidden fees, no long-term contracts." },
];

/* ─────────────────── SHARED COMPONENTS ─────────────────── */
function CTAStrip({ navigate }) {
  return (
    <div className="cta-strip">
      <div className="cta-strip-inner">
        <h2>Your Loved One Deserves the Best Care</h2>
        <p>Join over 50,000 families who found trusted, compassionate caregivers through Senior Buddies.</p>
        <div className="cta-btns">
          <button className="btn-white" onClick={() => navigate("contact")}>Find a Caregiver Now</button>
          <button className="btn-outline-white" onClick={() => navigate("contact")}>Talk to a Care Advisor</button>
        </div>
      </div>
    </div>
  );
}

function Footer({ navigate }) {
  return (
    <footer style={{ width: "100%", borderTop: "1px solid #e0d8cf", background: "#fff", display: "flex", justifyContent: "center" }}>
      <div style={{ width: "100%", maxWidth: 1400, padding: "40px 5%", display: "grid", gridTemplateColumns: "auto 1fr", gap: 60, alignItems: "center" }}>
        {/* Logo */}
        <div style={{ cursor: "pointer" }} onClick={() => navigate("home")}>
          <div style={{ fontFamily: "Playfair Display, serif", fontSize: "1.6rem", fontWeight: 700, color: "var(--green)", lineHeight: 1.1 }}>
            <em>Senior</em> Buddies
          </div>
          <div style={{ fontSize: "0.7rem", color: "var(--green)", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 4, borderTop: "1px solid #b5c9ae", paddingTop: 4 }}>
            Care for Seniors
          </div>
        </div>

        {/* Right — tagline + license */}
        <div style={{ textAlign: "right" }}>
          <p style={{ fontSize: "0.88rem", color: "var(--text-mid)", marginBottom: 6 }}>
            In-Home Caregivers in San Antonio, Leon Springs, Fair Oaks, &amp; Boerne
          </p>
          <p style={{ fontSize: "0.82rem", color: "var(--text-light)", fontStyle: "italic" }}>
            License #: 014111
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────── PAGE: HOME ─────────────────── */
function HomePage({ navigate }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", contact: "", best: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const upd = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  const SERVICES = [
    { icon: "🤝", name: "Companionship", desc: "For those who need a little more comfort and assistance around the house, a joyful companion can make all the difference." },
    { icon: "🛁", name: "Bathing", desc: "We provide safety reminders and assist in bathing needs." },
    { icon: "🏠", name: "Light Housekeeping", desc: "Senior Buddies can keep your environment tidy and neat with light housekeeping assistance." },
    { icon: "🛒", name: "Errands and Shopping", desc: "Let us simplify your life by shopping and running errands that take up time and energy." },
    { icon: "🪥", name: "Hygiene Assistance", desc: "Whether it's shaving or brushing one's teeth, proper hygiene promotes healthy living." },
    { icon: "🍽️", name: "Meal Preparation", desc: "Nutrition is a key component to living well, and our Buddies can help whether the need is grocery shopping or preparing a simple meal." },
    { icon: "💊", name: "Medication Reminders", desc: "Senior Buddies can help with medication reminders, ensuring proper dosage and timing." },
    { icon: "♿", name: "Incontinence Assistance", desc: "We can assist your loved one, so he or she is treated in a dignified manner." },
  ];

  const CARE_TYPES = [
    { title: "Hourly In Home Care", id: "svc-hourly", body: "If a minimal block of time will help to provide your loved one with daily activities and needs, a Senior Buddies caregiver is available on an hourly basis to help maintain day-to-day routines. We provide service in San Antonio, Leon Springs, Fair Oaks, and surrounding areas.\n\nEight out of ten seniors report that they prefer to age in the comfort of their homes. Nevertheless, mobility limitations and chronic illness make it difficult to live on your own without professional care and assistance. In-home care services allow seniors to maintain as much independence in their daily lives as possible." },
    { title: "24/7 In Home Care", id: "svc-24hour", body: "Senior Buddies offers personalized service options, which include 24/7 care plans. A team of our professional caregivers will work around-the-clock to ensure our clients are well cared for whether it is a hospital environment, home, or a care facility. Senior Buddies offers peace of mind to families, knowing a dedicated caregiver is with their loved one.\n\nWe understand that every client has different needs and expectations. It is our goal to provide a comprehensive and personalized experience for each of our clients and their families." },
    { title: "Hospital to Home Care", id: "svc-hospital", body: "Among senior hospital patients, readmission is not uncommon in the first 30 days after discharge. Healthcare management among seniors can be a real challenge. Senior Buddies can help minimize the risk of readmission by providing care management. With 1 in every 5 seniors being readmitted to the hospital within 30 days after discharge, Senior Buddies strives to prevent readmission by providing additional care support.\n\nSenior Buddies is here to offer a seamless transition of care from hospital to home. Our trained caregivers will help you or your loved one optimize adherence with the hospital's aftercare instructions." },
    { title: "Respite In Home Care", id: "svc-respite", body: "Being a family caregiver is a rewarding but demanding role. In order to care properly for the ones you love, one must not neglect our own health and well-being. Family caregivers must prioritize their overall health and well-being with a healthy diet, regular exercise, and adequate sleep.\n\nSenior Buddies In Home respite care allows the family caregiver to disengage for a temporary period of time whether it is for a few hours or a few days. Respite care offers relief to the family caregiver and peace of mind that their loved one is provided quality care." },
    { title: "Dementia Care", id: "svc-dementia", body: "Senior Buddies In Home Care offers peace of mind to families dealing with dementia. We offer support services in managing the day-to-day needs that can become overwhelming for loved ones whose memory or cognition has become impaired due to Alzheimer's, dementia, or other types of dementia.\n\nBecause home is a familiar setting to those experiencing Alzheimer's or other types of dementia, Senior Buddies In Home Care is a good alternative for your loved one with dementia. Senior Buddies caregivers are trained and dedicated, offering assistance in times of uncertainty." },
    { title: "Parkinson's Care", id: "svc-parkinsons", body: "When Parkinson's Disease hinders an individual's ability to complete basic daily activities, Senior Buddies can support activities of daily living making life at home easier. Poor balance, stiff muscles, and tremors make many daily tasks quite challenging for aging clients with Parkinson's. Senior Buddies' objective of care is to assist the Parkinson's client to enable the client to enjoy a high quality of life.\n\nOur dedicated caregivers quickly learn and familiarize themselves with the personal preferences of our clients; in addition, we will maintain continuous communication with the family and those who can contribute to ensure the comfort and safety of you or your loved one afflicted by Parkinson's." },
    { title: "Stroke Recovery Care", id: "svc-stroke", body: "Recovering from a stroke is a difficult process. Often times, language, cognition, and motor skills are disrupted. Our professional caregivers are available to support you or your loved one during a time of recovery or transition. Senior Buddies In Home Care is the ideal solution for your current needs. We can offer support with care coordination; medication management; transportation to doctor's visits and appointments; home rehabilitation support; bathing and personal care; activities of daily living, housekeeping and meal preparation; and companionship, which can contribute to alleviating the painful isolation one may feel." },
  ];

  return (
    <>
      {/* ── HERO: full-width bg photo + headline left, form right ── */}
      <section className="hero">
        <div className="hero-bg">
          <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1600&q=85" alt="Senior care" />
          <div className="hero-overlay"></div>
        </div>
        <div className="hero-inner">
          <div className="hero-text">
            <h1>Providing Peace of Mind with Personalized In-Home Senior Care</h1>
            <p>In San Antonio and All Surrounding Areas</p>
          </div>
          <div className="hero-form-card">
            {submitted ? (
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <div style={{ fontSize: "2.5rem", marginBottom: 12 }}>✅</div>
                <h3 style={{ fontFamily: "Playfair Display, serif" }}>Thank You!</h3>
                <p style={{ color: "var(--text-mid)", marginTop: 8, fontSize: "0.9rem" }}>We'll be in touch within 24 hours.</p>
                <button className="btn-learn" style={{ marginTop: 18 }} onClick={() => setSubmitted(false)}>Send Another</button>
              </div>
            ) : (
              <>
                <h3>Let's Talk</h3>
                <div className="hf-row">
                  <input className="hf-input" placeholder="Name" value={form.name} onChange={upd("name")} />
                  <input className="hf-input" placeholder="Email Address" type="email" value={form.email} onChange={upd("email")} />
                </div>
                <input className="hf-input" placeholder="Phone" value={form.phone} onChange={upd("phone")} style={{ width: "100%", marginBottom: 10 }} />
                <div className="hf-row">
                  <select className="hf-select" value={form.best} onChange={upd("best")} style={{ marginBottom: 0 }}>
                    <option value="">Best Time to Contact You</option>
                    {["Morning (8am–12pm)", "Afternoon (12–5pm)", "Evening (5–8pm)"].map(o => <option key={o}>{o}</option>)}
                  </select>
                  <select className="hf-select" value={form.contact} onChange={upd("contact")} style={{ marginBottom: 0 }}>
                    <option value="">Contact Method</option>
                    {["Phone Call", "Text Message", "Email"].map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
                <textarea className="hf-textarea" style={{ marginTop: 10 }} placeholder="Message" value={form.message} onChange={upd("message")} />
                <button className="hf-submit" onClick={() => setSubmitted(true)}>Submit</button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ── WHO WE ARE / WHAT WE DO / OUR MISSION ── */}
      <div className="info-strip">
        <div className="info-strip-inner">
          {[
            { icon: "🏡", title: "Who We Are", text: "Senior Buddies, established in 2009, is a family-owned in-home care service born from our own experience caring for aging parents. We believe in keeping loved ones safe at home, with family as the heart of our values and compassionate care at the core of everything we do." },
            { icon: "💚", title: "What We Do", text: "At Senior Buddies, we provide trusted in-home care for seniors and others who need help with daily living. From light tasks to personal assistance, we're here to support your family, so you can rest easy knowing your loved ones are in compassionate hands." },
            { icon: "🌟", title: "Our Mission", text: "Senior Buddies is committed to delivering dignified, compassionate care that allows seniors to age comfortably at home. Our focus is providing personalized support, ensuring the safety, well-being, and peace of mind that every family deserves." },
          ].map((col, i) => (
            <div className="info-col" key={i}>
              <div className="info-col-icon">{col.icon}</div>
              <h3>{col.title}</h3>
              <p>{col.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── OUR SERVICES ── */}
      <div className="home-services-section">
        <div className="home-services-inner">
          <div className="home-services-title">Our Services</div>
          <div className="services-icon-grid">
            {SERVICES.map((s, i) => (
              <div className="svc-item" key={i}>
                <div className="svc-icon">{s.icon}</div>
                <div className="svc-name">{s.name}</div>
                <div className="svc-desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── THE FRANK COMPANY DIFFERENCE ── */}
      <div className="difference-section">
        <div className="difference-inner">
          <div>
            <h2>The Senior Buddies Difference</h2>
            <p>Because the care of our parents and family remains one of the most cherished core values upon which our service is built, Senior Buddies began their services in the Leon Springs area, and we consider it a privilege to serve the families of our community. In San Antonio, Leon Springs, Fair Oaks, and Boerne, Senior Buddies can provide, Senior Buddies can ease the physical and emotional demands of family caregiving.</p>
            <button className="btn-learn" onClick={() => navigate("contact")}>Contact Us</button>
          </div>
          <div className="gold-seal">
            <div className="gold-seal-text">Trusted Since 2009</div>
            <div className="gold-seal-year">★★★★★</div>
          </div>
        </div>
      </div>

      {/* ── BOLD BANNER ── */}
      <div className="bold-banner">
        <div className="bold-banner-inner">
          <h2>We Support Your Family<br />During a Time of<br />Transition or Recovery</h2>
        </div>
      </div>

      {/* ── CARE TYPES ── */}
      <div className="care-types-section">
        <div className="care-types-inner">
          {CARE_TYPES.map((c, i) => (
            <div className="care-card" key={i}>
              <h3>{c.title}</h3>
              {c.body.split("\n\n").map((para, j) => (
                <p key={j} dangerouslySetInnerHTML={{ __html: para.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }} />
              ))}
              <button className="btn-learn" onClick={() => navigate(c.id)}>Learn More</button>
            </div>
          ))}
        </div>
      </div>

      <CTAStrip navigate={navigate} />
    </>
  );
}

/* ─────────────────── SERVICE DATA ─────────────────── */
const SERVICE_PAGES = [
  {
    id: "svc-inhome",
    title: "In-Home Caregivers",
    tag: "In-Home Care",
    tagline: "Tailored Care Plans for Every Stage",
    subtitle: "From Companionship to Specialized Support",
    img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1400&q=85",
    sideImg: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&q=80",
    intro: "Senior Buddies is an In Home Care Service Specializing in Personalized Care Services for Seniors and Others Who Need Assistance in Their Daily Life.",
    body: [
      "Our caregivers provide the necessary assistance to maintain one's independence at home. Our In Home Care services are offered in San Antonio, Leon Springs, Fair Oaks, and surrounding areas. Our free, non-obligatory evaluation takes place in your home and allows us an opportunity to become familiar with each client and their individual care needs.",
      "Together, with input from you and your loved ones, we develop a personalized plan of care. Senior Buddies mindfully considers this information when placing each caregiver with a client to make an appropriate match. Clients value and rely on the consistency and reliability of Senior Buddies caregivers.",
      "Regular communication with clients and their families allows for a care plan that is personalized and comprehensive. As needs of our clients change or evolve, Senior Buddies services are adjusted accordingly. The ability to have support and care needs met in your home offers you and your family security, peace of mind, and the ability to continue routine schedules, responsibilities and tasks of daily life.",
    ],
    included: ["Hourly Home Care – Services provided when and where needed the most", "24 Hour Home Care – Around the clock care for your loved ones", "Hospital to Home Care – Reliable transitional care services", "Alzheimer's and Dementia Care – Assistance to those who have become less independent", "Stroke Care – Addressing the mental and physical changes after a stroke", "Parkinson's Care – Support in maintaining independence of those affected by Parkinson's", "Respite Home Care – Providing a short term break to full-time caregivers"],
  },
  {
    id: "svc-hourly",
    title: "Hourly In Home Care",
    tag: "Hourly Care",
    tagline: "Flexible, Personalized Hourly Care",
    subtitle: "Services Provided When and Where Needed the Most",
    img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1400&q=85",
    sideImg: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=600&q=80",
    intro: "If a minimal block of time will help to provide your loved one with daily activities and needs, a Senior Buddies caregiver is available on an hourly basis to help maintain day-to-day routines.",
    body: [
      "We provide service in San Antonio, Leon Springs, Fair Oaks, and surrounding areas. Eight out of ten seniors report that they prefer to age in the comfort of their homes. Nevertheless, mobility limitations and chronic illness make it difficult to live on your own without professional care and assistance.",
      "In-home care services allow seniors to maintain as much independence in their daily lives as possible. Our hourly care services give families the flexibility to schedule care exactly when it's needed — whether for a few hours a day or several days a week.",
      "Senior Buddies carefully matches each client with a compatible caregiver, taking into account personality, preferences, and specific care needs. We believe that a great caregiver relationship begins with a great match.",
    ],
    included: ["Companionship and social engagement", "Meal preparation and nutrition support", "Light housekeeping and home organization", "Medication reminders", "Personal hygiene and grooming assistance", "Errands and grocery shopping", "Transportation to appointments and activities", "Exercise and mobility support"],
  },
  {
    id: "svc-24hour",
    title: "24 Hour Home Care",
    tag: "24/7 Care",
    tagline: "Around-the-Clock Care for Your Loved Ones",
    subtitle: "Dedicated Support Every Hour of Every Day",
    img: "https://images.unsplash.com/photo-1542884841-95779fe0f00a?w=1400&q=85",
    sideImg: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80",
    intro: "Senior Buddies offers personalized service options, which include 24/7 care plans. A team of our professional caregivers will work around-the-clock to ensure our clients are well cared for.",
    body: [
      "Whether it is a hospital environment, home, or a care facility, Senior Buddies offers peace of mind to families, knowing a dedicated caregiver is with their loved one. We understand that every client has different needs and expectations.",
      "It is our goal to provide a comprehensive and personalized experience for each of our clients and their families. Our 24-hour care model uses a rotating team of highly trained caregivers so your loved one always has a familiar, trusted face nearby.",
      "Our care coordinators remain in close contact with families throughout the care relationship, providing regular updates and adjusting care plans as needs evolve. You can rest easy knowing your loved one is in capable, compassionate hands at all hours.",
    ],
    included: ["24/7 rotating caregiver coverage", "Nighttime supervision and safety monitoring", "Assistance with all activities of daily living", "Medication management and reminders", "Meal preparation for all meals", "Personal care and hygiene assistance", "Companionship and emotional support", "Emergency response coordination"],
  },
  {
    id: "svc-hospital",
    title: "Hospital to Home Care",
    tag: "Transitional Care",
    tagline: "Seamless Transition from Hospital to Home",
    subtitle: "Reliable Transitional Care Services",
    img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1400&q=85",
    sideImg: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&q=80",
    intro: "Among senior hospital patients, readmission is not uncommon in the first 30 days after discharge. Senior Buddies can help minimize the risk of readmission by providing comprehensive care management.",
    body: [
      "With 1 in every 5 seniors being readmitted to the hospital within 30 days after discharge, Senior Buddies strives to prevent readmission by providing additional care support. Healthcare management among seniors can be a real challenge, and our caregivers are trained to help.",
      "Senior Buddies is here to offer a seamless transition of care from hospital to home. Our trained caregivers will help you or your loved one optimize adherence with the hospital's aftercare instructions, including medication schedules, exercises, and follow-up appointments.",
      "We work closely with your medical team to ensure continuity of care and communicate any changes in your loved one's condition promptly. Our goal is to support a full, successful recovery in the comfort and familiarity of home.",
    ],
    included: ["Adherence to hospital discharge instructions", "Medication management and scheduling", "Transportation to follow-up appointments", "Home rehabilitation support and exercise assistance", "Wound care reminders and monitoring", "Nutrition and hydration support", "Communication with family and medical team", "24/7 availability during recovery period"],
  },
  {
    id: "svc-respite",
    title: "Respite Care",
    tag: "Family Support",
    tagline: "A Short-Term Break for Full-Time Caregivers",
    subtitle: "Providing Relief So You Can Recharge",
    img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1400&q=85",
    sideImg: "https://images.unsplash.com/photo-1542884841-95779fe0f00a?w=600&q=80",
    intro: "Being a family caregiver is a rewarding but demanding role. In order to care properly for the ones you love, one must not neglect their own health and well-being.",
    body: [
      "Family caregivers must prioritize their overall health and well-being with a healthy diet, regular exercise, and adequate sleep. Senior Buddies In Home respite care allows the family caregiver to disengage for a temporary period of time — whether it is for a few hours or a few days.",
      "Respite care offers relief to the family caregiver and peace of mind that their loved one is provided quality care. Our professional caregivers step in seamlessly, maintaining your loved one's routines and providing the same compassionate attention they deserve.",
      "Whether you need time for self-care, a family obligation, a vacation, or simply a break from the demands of caregiving, Senior Buddies is here to support you. We believe that a well-rested caregiver provides better care — and your loved one benefits too.",
    ],
    included: ["Temporary care coverage — hours or days", "Full continuation of daily care routines", "Companionship and social engagement", "Medication reminders and supervision", "Personal care and hygiene assistance", "Meal preparation and nutrition support", "Light housekeeping", "Scheduled or emergency respite availability"],
  },
  {
    id: "svc-dementia",
    title: "Dementia Care",
    tag: "Specialized Care",
    tagline: "Compassionate Support for Dementia & Alzheimer's",
    subtitle: "Assistance to Those Who Have Become Less Independent",
    img: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=1400&q=85",
    sideImg: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80",
    intro: "Senior Buddies In Home Care offers peace of mind to families dealing with dementia. We offer support services in managing the day-to-day needs that can become overwhelming for loved ones whose memory or cognition has become impaired.",
    body: [
      "Because home is a familiar setting to those experiencing Alzheimer's or other types of dementia, Senior Buddies In Home Care is a good alternative for your loved one. Senior Buddies caregivers are trained and dedicated, offering assistance in times of uncertainty.",
      "We offer support services in managing the day-to-day needs that can become overwhelming for loved ones whose memory or cognition has become impaired due to Alzheimer's, dementia, or other cognitive conditions. Our approach focuses on safety, dignity, and quality of life.",
      "Our caregivers use specialized techniques to communicate effectively with dementia patients, reduce anxiety, and encourage positive engagement. We work alongside families to develop consistent routines that help orient and comfort your loved one throughout each day.",
    ],
    included: ["Specialized dementia and Alzheimer's training", "Consistent daily routines to reduce anxiety", "Safe environment monitoring and fall prevention", "Cognitive engagement activities", "Medication reminders and supervision", "Personal care with patience and dignity", "Family communication and education support", "Behavioral management techniques"],
  },
  {
    id: "svc-parkinsons",
    title: "Parkinson's Care",
    tag: "Specialized Care",
    tagline: "Supporting Independence with Parkinson's Disease",
    subtitle: "Support in Maintaining Independence",
    img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=1400&q=85",
    sideImg: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&q=80",
    intro: "When Parkinson's Disease hinders an individual's ability to complete basic daily activities, Senior Buddies can support activities of daily living making life at home easier.",
    body: [
      "Poor balance, stiff muscles, and tremors make many daily tasks quite challenging for aging clients with Parkinson's. Senior Buddies' objective of care is to assist the Parkinson's client to enable the client to enjoy a high quality of life.",
      "Our dedicated caregivers quickly learn and familiarize themselves with the personal preferences of our clients. In addition, we maintain continuous communication with the family and those who can contribute to ensure the comfort and safety of you or your loved one afflicted by Parkinson's.",
      "We understand the progressive nature of Parkinson's Disease and adapt our care approach as needs change over time. Our team is trained in fall prevention, mobility assistance, and communication strategies specific to Parkinson's patients.",
    ],
    included: ["Fall prevention and mobility assistance", "Help with tremor-related daily challenges", "Medication reminders and timing", "Personal care and bathing assistance", "Exercise and physical therapy support", "Meal preparation and feeding assistance", "Communication and emotional support", "Family education and coordination"],
  },
  {
    id: "svc-stroke",
    title: "Stroke Recovery Care",
    tag: "Recovery Care",
    tagline: "Comprehensive Support During Stroke Recovery",
    subtitle: "Addressing Mental and Physical Changes After a Stroke",
    img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1400&q=85",
    sideImg: "https://images.unsplash.com/photo-1542884841-95779fe0f00a?w=600&q=80",
    intro: "Recovering from a stroke is a difficult process. Often times, language, cognition, and motor skills are disrupted. Our professional caregivers are available to support you or your loved one during a time of recovery or transition.",
    body: [
      "Senior Buddies In Home Care is the ideal solution for your current needs. We can offer support with care coordination, medication management, transportation to doctor's visits and appointments, and home rehabilitation support.",
      "Our caregivers are trained to assist with bathing and personal care, activities of daily living, housekeeping, and meal preparation. Equally important, we provide compassionate companionship — which can contribute to alleviating the painful isolation one may feel during stroke recovery.",
      "We work in coordination with your loved one's medical and rehabilitation team to support every aspect of recovery. Our goal is to maximize functional independence and quality of life while ensuring the safety and comfort of your loved one at home.",
    ],
    included: ["Care coordination with medical team", "Medication management and reminders", "Transportation to rehabilitation and appointments", "Home rehabilitation exercise support", "Bathing, personal care, and hygiene assistance", "Activities of daily living support", "Housekeeping and meal preparation", "Companionship and emotional support"],
  },
];

/* ─────────────────── SHARED: SERVICE CONTACT FORM ─────────────────── */
function ServiceContactForm({ serviceName }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", contact: "", message: "" });
  const [sent, setSent] = useState(false);
  const upd = k => e => setForm(f => ({ ...f, [k]: e.target.value }));
  if (sent) return (
    <div className="svc-detail-form" style={{ textAlign: "center", padding: "36px 24px" }}>
      <div style={{ fontSize: "2.5rem", marginBottom: 12 }}>✅</div>
      <h3 style={{ fontFamily: "Playfair Display, serif", fontSize: "1.1rem" }}>Thank You!</h3>
      <p style={{ color: "var(--text-mid)", fontSize: "0.88rem", marginTop: 8 }}>We'll be in touch within 24 hours.</p>
      <button className="sdf-submit" style={{ marginTop: 18 }} onClick={() => setSent(false)}>Send Another</button>
    </div>
  );
  return (
    <div className="svc-detail-form">
      <h3>Let's Talk</h3>
      <div className="sdf-row">
        <input className="sdf-input" placeholder="Name" value={form.name} onChange={upd("name")} />
        <input className="sdf-input" placeholder="Email Address" value={form.email} onChange={upd("email")} />
      </div>
      <div className="sdf-group">
        <input className="sdf-input" placeholder="Phone" value={form.phone} onChange={upd("phone")} />
      </div>
      <div className="sdf-row">
        <select className="sdf-select" value={form.contact} onChange={upd("contact")}>
          <option value="">Best Time to Contact You</option>
          <option>Morning (8am–12pm)</option>
          <option>Afternoon (12pm–5pm)</option>
          <option>Evening (5pm–8pm)</option>
        </select>
        <select className="sdf-select" value={form.method} onChange={upd("method")}>
          <option value="">Contact Method</option>
          <option>Phone Call</option>
          <option>Text Message</option>
          <option>Email</option>
        </select>
      </div>
      <div className="sdf-group">
        <textarea className="sdf-textarea" placeholder="Message" value={form.message} onChange={upd("message")} />
      </div>
      <button className="sdf-submit" onClick={() => setSent(true)}>Submit</button>
    </div>
  );
}

/* ─────────────────── PAGE: SERVICE DETAIL ─────────────────── */
function ServiceDetailPage({ serviceId, navigate }) {
  const svc = SERVICE_PAGES.find(s => s.id === serviceId) || SERVICE_PAGES[0];
  return (
    <>
      {/* HERO with form */}
      <section className="svc-detail-hero">
        <div className="svc-detail-hero-bg">
          <img src={svc.img} alt={svc.title} />
          <div className="svc-detail-hero-overlay"></div>
        </div>
        <div className="svc-detail-hero-inner">
          <div className="svc-detail-hero-text">
            <div className="svc-label">{svc.tag}</div>
            <h1>{svc.tagline}</h1>
            <p>{svc.subtitle}</p>
          </div>
          <ServiceContactForm serviceName={svc.title} />
        </div>
      </section>

      {/* INTRO HEADLINE */}
      <section style={{ background: "#fff", width: "100%", display: "flex", justifyContent: "center", padding: "52px 0 0" }}>
        <div style={{ width: "100%", maxWidth: 1400, padding: "0 5%" }}>
          <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(1.4rem, 2.5vw, 2rem)", color: "var(--green)", lineHeight: 1.3, textAlign: "center" }}>
            {svc.intro}
          </h2>
        </div>
      </section>

      {/* BODY CONTENT */}
      <section className="section">
        <div className="section-inner">
          <button className="svc-back-btn" onClick={() => navigate("services")}>← Back to All Services</button>
          <div className="svc-content-grid">
            <div>
              <div className="svc-body-text">
                {svc.body.map((para, i) => <p key={i}>{para}</p>)}
              </div>
              <div className="svc-included-box">
                <h3>Our {svc.title} Services Include the Following:</h3>
                <ul className="svc-included-list">
                  {svc.included.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </div>
              <button className="btn-orange" onClick={() => navigate("contact")}>Call Today to Learn More →</button>
            </div>
            <div>
              <div className="svc-sidebar-img"><img src={svc.sideImg} alt={svc.title} /></div>
              <div className="svc-sidebar-links">
                <h4>Our Services</h4>
                {SERVICE_PAGES.map(s => (
                  <button
                    key={s.id}
                    className={`svc-sidebar-link-btn${s.id === serviceId ? " active-svc" : ""}`}
                    onClick={() => navigate(s.id)}
                  >{s.title}</button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTAStrip navigate={navigate} />
    </>
  );
}

/* ─────────────────── PAGE: SERVICES ─────────────────── */
function ServicesPage({ navigate }) {
  return (
    <>
      <div className="page-banner">
        <div className="page-banner-inner">
          <div className="page-banner-label">What We Offer</div>
          <h1>Our Care Services</h1>
          <p>We provide a full spectrum of in-home care services tailored to the unique needs of every senior and their family.</p>
        </div>
      </div>

      <section className="section">
        <div className="section-inner">
          <div className="section-header">
            <div className="section-label">All Services</div>
            <div className="section-title">Comprehensive Care for Every Need</div>
            <div className="section-sub">From friendly companionship to specialized medical support — click any service to learn more.</div>
          </div>
          <div className="card-grid-3" style={{ gap: 24 }}>
            {SERVICE_PAGES.map((s) => (
              <div className="card" key={s.id} style={{ cursor: "pointer" }} onClick={() => navigate(s.id)}>
                <div className="card-img"><img src={s.img} alt={s.title} /></div>
                <div className="card-body">
                  <div className="card-tag">{s.tag}</div>
                  <div className="card-title">{s.title}</div>
                  <div className="card-desc">{s.subtitle}</div>
                  <button className="btn-outline" style={{ marginTop: 18, padding: "9px 20px", fontSize: "0.85rem" }} onClick={e => { e.stopPropagation(); navigate(s.id); }}>Learn More</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-warm">
        <div className="section-inner">
          <div className="about-split">
            <div>
              <div className="section-label">Why Our Care Works</div>
              <div className="section-title">Personalized Plans Built Around Your Loved One</div>
              <div className="section-sub">No two seniors are alike. That's why every care plan is custom-built through a thorough assessment of your loved one's health, personality, and lifestyle.</div>
              <ul className="about-list" style={{ marginTop: 28 }}>
                {[
                  ["🛡️", "Fully Insured & Bonded", "Every caregiver is covered — protecting your family and your home."],
                  ["📋", "Care Plan Included", "A written care plan is created with your input and reviewed regularly."],
                  ["📱", "Family App Access", "Stay connected with real-time updates, schedules, and caregiver notes."],
                ].map(([icon, title, desc], i) => (
                  <li key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                    <div style={{ fontSize: "1.4rem" }}>{icon}</div>
                    <div><div className="about-list-title">{title}</div><div className="about-list-desc">{desc}</div></div>
                  </li>
                ))}
              </ul>
              <button className="btn-primary" style={{ marginTop: 28 }} onClick={() => navigate("contact")}>Request a Free Consultation</button>
            </div>
            <div className="about-img"><img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&q=85" alt="Caregiver" /></div>
          </div>
        </div>
      </section>

      <CTAStrip navigate={navigate} />
    </>
  );
}

/* ─────────────────── PAGE: ABOUT US ─────────────────── */
function AboutPage({ navigate }) {
  const team = [
    { name: "Steve Kitchen, C.P.A", role: "Founder & CEO of Senior Buddies, LLC", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80" },
    { name: "Lloyd & Zively Kitchen", role: "Steve's parents for whom Senior Buddies services began in 2009", img: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&q=80" },
    { name: "Jacob Kitchen, B.B.A", role: "Co-Owner", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80" },
  ];
  return (
    <>
      {/* HERO with background photo */}
      <section style={{ width: "100%", position: "relative", overflow: "hidden", minHeight: 320, display: "flex", justifyContent: "center", alignItems: "stretch" }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <img src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1600&q=85" alt="About us" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.45)" }}></div>
        </div>
        <div style={{ width: "100%", maxWidth: 1400, padding: "70px 5%", position: "relative", zIndex: 1, display: "flex", alignItems: "flex-end" }}>
          <div>
            <div style={{ fontFamily: "Playfair Display, serif", fontSize: "0.95rem", fontStyle: "italic", color: "rgba(255,255,255,0.85)", marginBottom: 10 }}>About Us</div>
            <h1 style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 700, fontStyle: "italic", color: "#fff", lineHeight: 1.15, marginBottom: 12 }}>Family-Owned Senior<br />Care Since 2009</h1>
            <p style={{ fontFamily: "Playfair Display, serif", fontStyle: "italic", fontSize: "1.1rem", color: "var(--orange-light)" }}>Caring for Your Loved Ones Like Our Own</p>
          </div>
        </div>
      </section>

      {/* BODY: left green headline + right text */}
      <section style={{ width: "100%", display: "flex", justifyContent: "center", padding: "64px 0" }}>
        <div style={{ width: "100%", maxWidth: 1400, padding: "0 5%", display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 60, alignItems: "start" }}>
          <div>
            <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(1.4rem,2.5vw,1.9rem)", color: "var(--green)", lineHeight: 1.4 }}>Senior Buddies In Home Care Service Can Help to Safely Maintain One's Independence at Home and Promote Healthy Living</h2>
          </div>
          <div>
            <p style={{ fontSize: "0.93rem", color: "#444", lineHeight: 1.75, marginBottom: 18 }}>Senior Buddies was created to provide a helpful way to assist seniors and their families. We began services in 2009 in the heart of the hill country, Leon Springs. We are family-owned and operated and feel privileged to serve our community, San Antonio, Leon Springs, Fair Oaks, Boerne, and surrounding areas. Senior Buddies specializes in care support of those in need during a time of transition and recovery. Services provided include: respite care, hospital to home care, and additional services addressing senior related needs.</p>
            <p style={{ fontSize: "0.93rem", color: "#444", lineHeight: 1.75 }}>We meet with clients in their homes to develop a personalized plan of care. During this meeting, a Senior Buddies care manager will assess a client's lifestyle, interests, and medical conditions to determine the necessary level of assistance.</p>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section style={{ width: "100%", display: "flex", justifyContent: "center", padding: "0 0 72px" }}>
        <div style={{ width: "100%", maxWidth: 1400, padding: "0 5%" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 32 }}>
            {team.map((m, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "Playfair Display, serif", fontSize: "1.05rem", fontWeight: 700, color: "var(--text-dark)", marginBottom: 4 }}>{m.name}</div>
                <div style={{ fontSize: "0.83rem", color: "var(--text-mid)", marginBottom: 16, lineHeight: 1.4 }}>{m.role}</div>
                <div style={{ borderRadius: 6, overflow: "hidden", height: 260 }}>
                  <img src={m.img} alt={m.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

/* ─────────────────── PAGE: RESOURCES ─────────────────── */
function ResourcesPage({ navigate }) {
  const articles = [
    { type: "Guide", title: "10 Signs Your Parent May Need In-Home Care", excerpt: "Recognizing when a loved one needs extra support can be challenging. Here are the key signs to watch for.", date: "March 12, 2026", img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80" },
    { type: "Article", title: "How to Talk to Your Parents About Accepting Care", excerpt: "Starting the conversation about in-home care can feel overwhelming. This guide walks you through it step by step.", date: "February 28, 2026", img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&q=80" },
    { type: "Tip", title: "Caregiver Burnout: How to Recognize and Prevent It", excerpt: "Family caregivers are often at risk of burnout. Learn how to spot the signs early and protect your own wellbeing.", date: "February 10, 2026", img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80" },
    { type: "Guide", title: "Understanding Dementia: A Family Handbook", excerpt: "A comprehensive overview of dementia stages, care strategies, and how to support your loved one through the journey.", date: "January 22, 2026", img: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=600&q=80" },
    { type: "Article", title: "Medicare vs. Private Pay: What Covers In-Home Care?", excerpt: "Navigating care funding can be confusing. We break down what Medicare covers and when private pay applies.", date: "January 5, 2026", img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&q=80" },
    { type: "Tip", title: "7 Ways to Make Your Home Safer for Aging in Place", excerpt: "Simple home modifications that can dramatically reduce fall risks and improve daily life for seniors living at home.", date: "December 18, 2025", img: "https://images.unsplash.com/photo-1542884841-95779fe0f00a?w=600&q=80" },
  ];
  const guides = [
    { icon: "📖", title: "The Complete Guide to In-Home Care", desc: "Everything families need to know about starting in-home care — from assessment to caregiver selection." },
    { icon: "🧠", title: "Dementia Care Toolkit", desc: "Practical strategies, communication tips, and daily routines for families caring for someone with dementia." },
    { icon: "💊", title: "Medication Management for Seniors", desc: "How to safely track, organize, and manage complex medication schedules for aging loved ones." },
    { icon: "📋", title: "Care Planning Worksheet", desc: "A step-by-step worksheet to help you assess your loved one's needs and document a comprehensive care plan." },
  ];
  return (
    <>
      <div className="page-banner">
        <div className="page-banner-inner">
          <div className="page-banner-label">Knowledge Center</div>
          <h1>Resources for Families</h1>
          <p>Expert guides, articles, and tools to help you make informed decisions about senior care for your loved one.</p>
        </div>
      </div>

      <section className="section">
        <div className="section-inner">
          <div className="section-header">
            <div className="section-label">Latest Articles</div>
            <div className="section-title">Stay Informed & Empowered</div>
            <div className="section-sub">Our team of care experts regularly publish guides and articles to support families through every stage of the care journey.</div>
          </div>
          <div className="resource-grid">
            {articles.map((a, i) => (
              <div className="resource-card" key={i}>
                <div className="resource-img"><img src={a.img} alt={a.title} /></div>
                <div className="resource-body">
                  <div className="resource-type">{a.type}</div>
                  <div className="resource-title">{a.title}</div>
                  <div className="resource-excerpt">{a.excerpt}</div>
                  <div className="resource-date">{a.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-warm">
        <div className="section-inner">
          <div className="section-header">
            <div className="section-label">Free Downloads</div>
            <div className="section-title">Helpful Guides & Tools</div>
            <div className="section-sub">Download free resources created by our senior care experts to support your family's journey.</div>
          </div>
          <div className="card-grid-2">
            {guides.map((g, i) => (
              <div className="guide-card" key={i}>
                <div className="guide-icon">{g.icon}</div>
                <div>
                  <div className="guide-title">{g.title}</div>
                  <div className="guide-desc">{g.desc}</div>
                  <button className="btn-outline" style={{ marginTop: 14, padding: "8px 18px", fontSize: "0.85rem" }}>Download Free →</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTAStrip navigate={navigate} />
    </>
  );
}

/* ─────────────────── PAGE: LOCATIONS ─────────────────── */
function LocationsPage({ navigate }) {
  const locations = [
    { city: "San Antonio", state: "Texas", address: "123 Commerce St, Suite 400", phone: "(210) 391-0948", caregivers: 320 },
    { city: "Austin", state: "Texas", address: "456 Congress Ave, Suite 200", phone: "(512) 555-0123", caregivers: 285 },
    { city: "Houston", state: "Texas", address: "789 Main St, Suite 310", phone: "(713) 555-0456", caregivers: 410 },
    { city: "Dallas", state: "Texas", address: "321 Elm Street, Suite 150", phone: "(214) 555-0789", caregivers: 375 },
    { city: "Miami", state: "Florida", address: "555 Brickell Ave, Suite 900", phone: "(305) 555-0321", caregivers: 290 },
    { city: "Phoenix", state: "Arizona", address: "88 Central Ave, Suite 600", phone: "(602) 555-0654", caregivers: 260 },
    { city: "San Diego", state: "California", address: "200 Harbor Dr, Suite 100", phone: "(619) 555-0987", caregivers: 240 },
    { city: "Denver", state: "Colorado", address: "1700 Lincoln St, Suite 500", phone: "(720) 555-0213", caregivers: 195 },
    { city: "Atlanta", state: "Georgia", address: "100 Peachtree St, Suite 800", phone: "(404) 555-0546", caregivers: 310 },
  ];
  return (
    <>
      <div className="page-banner">
        <div className="page-banner-inner">
          <div className="page-banner-label">Service Areas</div>
          <h1>Find Senior Buddies Near You</h1>
          <p>We serve families in San Antonio, Leon Springs, Fair Oaks, Boerne, and surrounding areas.</p>
        </div>
      </div>

      <section className="section">
        <div className="section-inner">
          <div className="map-placeholder">
            <div className="map-placeholder-inner">
              <div className="map-placeholder-icon">🗺️</div>
              <div className="map-placeholder-text">Interactive Map — 9 Locations Nationwide</div>
            </div>
          </div>

          <div className="section-header">
            <div className="section-label">Our Offices</div>
            <div className="section-title">Locations Across America</div>
            <div className="section-sub">Each local office is staffed by care coordinators who know your community and can help you find the perfect caregiver.</div>
          </div>
          <div className="locations-grid">
            {locations.map((l, i) => (
              <div className="loc-card" key={i}>
                <div className="loc-city">{l.city}</div>
                <div className="loc-state">{l.state}</div>
                <div className="loc-detail">📍 {l.address}</div>
                <div className="loc-detail">📞 <a href={`tel:${l.phone}`} style={{ color: "var(--green)", textDecoration: "none" }}>{l.phone}</a></div>
                <div className="loc-detail">👥 {l.caregivers}+ local caregivers</div>
                <div className="loc-btn"><button className="btn-primary" style={{ padding: "9px 20px", fontSize: "0.85rem" }} onClick={() => navigate("contact")}>Contact This Office</button></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTAStrip navigate={navigate} />
    </>
  );
}

/* ─────────────────── PAGE: CONTACT ─────────────────── */
function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", best: "", method: "", message: "" });
  const [sent, setSent] = useState(false);
  const upd = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  const inputStyle = {
    width: "100%", padding: "14px 16px",
    background: "#f0eeeb", border: "none", borderRadius: 4,
    fontSize: "0.92rem", fontFamily: "DM Sans, sans-serif",
    color: "var(--text-dark)", outline: "none",
  };
  const selectStyle = { ...inputStyle, appearance: "none", backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23666' stroke-width='1.5' fill='none'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center", paddingRight: 36 };

  return (
    <section style={{ width: "100%", display: "flex", justifyContent: "center", padding: "72px 0 80px" }}>
      <div style={{ width: "100%", maxWidth: 1400, padding: "0 5%", display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 80, alignItems: "start" }}>

        {/* LEFT — info */}
        <div>
          <h1 style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(2rem,3.5vw,3rem)", fontWeight: 700, color: "var(--text-dark)", marginBottom: 24, lineHeight: 1.1 }}>
            Contact Us
          </h1>
          <p style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(1.1rem,2vw,1.55rem)", color: "var(--green)", lineHeight: 1.45, marginBottom: 36, fontWeight: 400 }}>
            We're Here to Help – Reach Out for a Free Consultation and Start Easing Your Worries Today
          </p>
          <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "1.5rem", fontWeight: 700, color: "var(--text-dark)", marginBottom: 12 }}>
            Senior Buddies
          </h2>
          <p style={{ fontSize: "0.95rem", color: "var(--text-mid)", lineHeight: 1.7, marginBottom: 6 }}>
            24137 Boerne Stage Rd, San Antonio, TX 78255
          </p>
          <a href="tel:2103910948" style={{ fontSize: "0.95rem", color: "var(--green)", textDecoration: "none", fontWeight: 500 }}>
            (210) 391-0948
          </a>
        </div>

        {/* RIGHT — form */}
        <div>
          {sent ? (
            <div style={{ textAlign: "center", padding: "60px 20px" }}>
              <div style={{ fontSize: "3rem", marginBottom: 16 }}>✅</div>
              <h3 style={{ fontFamily: "Playfair Display, serif", fontSize: "1.4rem", marginBottom: 12, color: "var(--text-dark)" }}>Message Sent!</h3>
              <p style={{ color: "var(--text-mid)", marginBottom: 24 }}>Thank you for reaching out. We'll be in touch shortly.</p>
              <button className="btn-primary" onClick={() => setSent(false)}>Send Another Message</button>
            </div>
          ) : (
            <>
              {/* Row 1: Name + Email */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
                <input style={inputStyle} placeholder="Name" value={form.name} onChange={upd("name")} />
                <input style={inputStyle} placeholder="Email Address" type="email" value={form.email} onChange={upd("email")} />
              </div>
              {/* Row 2: Phone full width */}
              <div style={{ marginBottom: 12 }}>
                <input style={inputStyle} placeholder="Phone" value={form.phone} onChange={upd("phone")} />
              </div>
              {/* Row 3: Best Time + Contact Method */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
                <select style={selectStyle} value={form.best} onChange={upd("best")}>
                  <option value="">Best Time to Contact You</option>
                  <option>Morning (8am–12pm)</option>
                  <option>Afternoon (12pm–5pm)</option>
                  <option>Evening (5pm–8pm)</option>
                </select>
                <select style={selectStyle} value={form.method} onChange={upd("method")}>
                  <option value="">Contact Method</option>
                  <option>Phone Call</option>
                  <option>Text Message</option>
                  <option>Email</option>
                </select>
              </div>
              {/* Row 4: Message */}
              <div style={{ marginBottom: 16 }}>
                <textarea
                  style={{ ...inputStyle, minHeight: 90, resize: "vertical" }}
                  placeholder="Message"
                  value={form.message}
                  onChange={upd("message")}
                />
              </div>
              {/* Submit right-aligned */}
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button
                  className="btn-orange"
                  style={{ borderRadius: 6, padding: "13px 40px", fontSize: "1rem" }}
                  onClick={() => setSent(true)}
                >
                  Submit
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── PAGE: TESTIMONIALS ─────────────────── */
function TestimonialsPage({ navigate }) {
  // YouTube video IDs for senior care testimonials
  const videos = [
    { id: "3GDMsM6DMNM", title: "Senior Care Testimonial" },
    { id: "nVjxqbTNnEE", title: "In-Home Care Review" },
    { id: "JRaRb2TKGEI", title: "Family Shares Their Experience" },
    { id: "mT9bOKWPWwQ", title: "Client Testimonial" },
    { id: "ZZXuAmCRfM4", title: "Home Care Story" },
    { id: "rKqb1TnzjTI", title: "Senior Buddy Experience" },
  ];

  return (
    <>
      {/* Simple light banner matching reference */}
      <div style={{ background: "var(--warm-gray)", width: "100%", display: "flex", justifyContent: "center", padding: "48px 5% 40px", borderBottom: "1px solid #e0d8cf" }}>
        <div style={{ width: "100%", maxWidth: 1400 }}>
          <h1 style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(1.8rem,3vw,2.6rem)", fontWeight: 700, color: "var(--text-dark)", textAlign: "center" }}>Testimonials</h1>
        </div>
      </div>

      <section style={{ width: "100%", display: "flex", justifyContent: "center", padding: "56px 0 72px" }}>
        <div style={{ width: "100%", maxWidth: 1400, padding: "0 5%" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 28 }}>
            {videos.map((v, i) => (
              <div key={i} style={{ borderRadius: 10, overflow: "hidden", boxShadow: "0 2px 16px rgba(0,0,0,0.1)", background: "#000" }}>
                <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
                  <iframe
                    style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
                    src={`https://www.youtube.com/embed/${v.id}`}
                    title={v.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTAStrip navigate={navigate} />
    </>
  );
}

/* ─────────────────── PAGE: FAQ ─────────────────── */
function FAQPage({ navigate }) {
  return (
    <>
      {/* Simple light banner */}
      <div style={{ background: "var(--warm-gray)", width: "100%", display: "flex", justifyContent: "center", padding: "48px 5% 40px", borderBottom: "1px solid #e0d8cf" }}>
        <div style={{ width: "100%", maxWidth: 1400 }}>
          <h1 style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(1.8rem,3vw,2.4rem)", fontWeight: 700, color: "var(--text-dark)", textAlign: "center" }}>Frequently Asked Questions</h1>
        </div>
      </div>

      <section style={{ width: "100%", display: "flex", justifyContent: "center", padding: "52px 0 72px" }}>
        <div style={{ width: "100%", maxWidth: 860, padding: "0 5%" }}>
          <p style={{ fontSize: "0.93rem", color: "#444", lineHeight: 1.75, marginBottom: 32 }}>We want to provide a helpful solution for families who are searching for quality, reliable senior home care for their parents, grandparents or loved ones. Below, we have provided a list of the most frequently asked questions. If you have further questions or need more information, please contact us today.</p>

          {[
            {
              q: "What is in-home care?",
              a: "Senior Buddies caregivers provide care services in the comfort and safety of our clients' homes. This is a way to ensure optimal quality of life for seniors in a familiar, comfortable environment where they feel safe. Our in-home care services include companionship, as well as assistance and support with daily tasks of living such as: bathing and grooming; meal preparation; medication reminders; transportation; light housekeeping; and laundry.",
            },
            {
              q: "Am I required to sign a contract?",
              a: "There are no long term service contracts. We offer service agreements that begin and end at your discretion.",
            },
            {
              q: "What if my senior family members are reluctant to consider this kind of care?",
              a: "We understand the skepticism and reluctance of seniors with regard to home care services. It is not uncommon for seniors to feel they will lose their independence and privacy. However, in-home care is designed to actually help seniors retain their independence and continue a lifestyle they are accustomed to in a place they are most familiar with... their home!",
            },
            {
              q: "How do we afford home care services?",
              a: "It is important to emphasize that Medicaid and Medicare do not reimburse payment of non-medical in-home care. Senior Buddies is a private pay in-home care agency; however, if we cannot assist you, we will try our best to refer you to a service that suits your financial needs.",
            },
            {
              q: "What's unique about our Senior Buddies Home Care Services?",
              a: "Senior Buddies In-Home Care is a local agency that is family-owned and operated. It evolved from a personal need with our own parents. We understand the importance of caring for loved ones and the time commitment involved with doing so. Family remains a cherished core value upon which our service is built. Our services are designed to assist seniors and support their family members. We consider it a privilege to serve the families of our community (San Antonio, Leon Springs, Boerne, Fair Oaks, and surrounding areas).",
            },
            {
              q: "Why should I use your home care agency rather than find a caregiver on my own?",
              a: "Here are important considerations when making a choice between Senior Buddies and independent, private duty caregivers:",
              bullets: [
                "Security and background checks conducted on all staff members",
                "Quality assurance visits and surveys conducted regularly",
                "Consistency in caregivers' schedules",
                "Personalized Care Plans",
                "No independent contractors",
              ],
            },
            {
              q: "What are some of the benefits of Senior Buddies In Home Care?",
              a: null,
              sections: [
                {
                  title: "Personal Care Benefits",
                  items: ["Companionship", "Transfer Assistance from Bed to Wheelchair", "Grooming, Dressing, and Bathing Assistance", "Medication Reminders", "Incontinence Care and Toileting"],
                },
                {
                  title: "Health and Well-Being Benefits",
                  items: ["Safety Reminders to Minimize Fall Risks", "Nutrition Planning and Meal Preparation", "Laundry and Change of Bed Linens", "Light Housekeeping", "Grocery Shopping"],
                },
                {
                  title: "Lifestyle Benefits",
                  items: ["Recreational and Outdoor Activities", "Transportation to Appointments and Social Events", "Accompany to Appointments and Events", "Community Engagement", "Light Exercise Assistance", "Travel Support and Assistance"],
                },
              ],
            },
          ].map((item, i) => (
            <div key={i} style={{ marginBottom: 28 }}>
              <p style={{ fontWeight: 700, fontSize: "0.95rem", color: "#222", marginBottom: 8 }}>{item.q}</p>
              {item.a && <p style={{ fontSize: "0.91rem", color: "#444", lineHeight: 1.75, marginBottom: item.bullets ? 10 : 0 }}>{item.a}</p>}
              {item.bullets && (
                <ul style={{ paddingLeft: 22, margin: 0 }}>
                  {item.bullets.map((b, j) => <li key={j} style={{ fontSize: "0.91rem", color: "#444", lineHeight: 1.75 }}>{b}</li>)}
                </ul>
              )}
              {item.sections && item.sections.map((sec, j) => (
                <div key={j} style={{ marginBottom: 14 }}>
                  <p style={{ color: "var(--green)", fontSize: "0.91rem", fontWeight: 600, marginBottom: 6, textDecoration: "underline" }}>{sec.title}</p>
                  <ul style={{ paddingLeft: 22, margin: 0 }}>
                    {sec.items.map((it, k) => <li key={k} style={{ fontSize: "0.91rem", color: "#444", lineHeight: 1.75 }}>{it}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

/* ─────────────────── PAGE: CAREERS ─────────────────── */
function CareersPage({ navigate }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", hours: "", cna: false, hha: false, otherCert: "", info: "" });
  const [sent, setSent] = useState(false);
  const upd = k => e => setForm(f => ({ ...f, [k]: e.target.value }));
  const chk = k => e => setForm(f => ({ ...f, [k]: e.target.checked }));

  return (
    <>
      {/* Simple light banner */}
      <div style={{ background: "var(--warm-gray)", width: "100%", display: "flex", justifyContent: "center", padding: "48px 5% 40px", borderBottom: "1px solid #e0d8cf" }}>
        <div style={{ width: "100%", maxWidth: 1400 }}>
          <h1 style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(1.8rem,3vw,2.4rem)", fontWeight: 700, color: "var(--text-dark)", textAlign: "center" }}>Careers</h1>
        </div>
      </div>

      <section style={{ width: "100%", display: "flex", justifyContent: "center", padding: "52px 0 72px" }}>
        <div style={{ width: "100%", maxWidth: 860, padding: "0 5%" }}>
          <p style={{ fontFamily: "Playfair Display, serif", fontSize: "1.25rem", color: "var(--green)", marginBottom: 40, lineHeight: 1.5 }}>I am interested in employment opportunities with Senior Buddies.</p>

          {sent ? (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <div style={{ fontSize: "3rem", marginBottom: 16 }}>✅</div>
              <h3 style={{ fontFamily: "Playfair Display, serif", marginBottom: 12 }}>Application Submitted!</h3>
              <p style={{ color: "var(--text-mid)" }}>Thank you for your interest. We will be in touch within 2 business days.</p>
              <button className="btn-primary" style={{ marginTop: 24 }} onClick={() => setSent(false)}>Submit Another</button>
            </div>
          ) : (
            <>
              <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "1.6rem", fontWeight: 700, color: "var(--text-dark)", marginBottom: 24 }}>Application</h2>

              {/* Row 1: Name + Email */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                <input className="hf-input" placeholder="Name" value={form.name} onChange={upd("name")} style={{ background: "#f0eeeb", border: "none", borderRadius: 4, padding: "14px 16px", fontSize: "0.92rem" }} />
                <input className="hf-input" placeholder="Email Address" type="email" value={form.email} onChange={upd("email")} style={{ background: "#f0eeeb", border: "none", borderRadius: 4, padding: "14px 16px", fontSize: "0.92rem" }} />
              </div>

              {/* Row 2: Phone + Hours Wanted */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                <input className="hf-input" placeholder="Phone" value={form.phone} onChange={upd("phone")} style={{ background: "#f0eeeb", border: "none", borderRadius: 4, padding: "14px 16px", fontSize: "0.92rem" }} />
                <input className="hf-input" placeholder="Hours Wanted Weekly" value={form.hours} onChange={upd("hours")} style={{ background: "#f0eeeb", border: "none", borderRadius: 4, padding: "14px 16px", fontSize: "0.92rem" }} />
              </div>

              {/* Row 3: Certification checkboxes + Other Certifications */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16, alignItems: "start" }}>
                <div>
                  <p style={{ fontWeight: 700, fontSize: "0.92rem", color: "var(--text-dark)", marginBottom: 12 }}>Certification</p>
                  <label style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, cursor: "pointer", fontSize: "0.9rem", color: "#444" }}>
                    <input type="checkbox" checked={form.cna} onChange={chk("cna")} style={{ width: 16, height: 16, accentColor: "var(--green)" }} /> CNA
                  </label>
                  <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", fontSize: "0.9rem", color: "#444" }}>
                    <input type="checkbox" checked={form.hha} onChange={chk("hha")} style={{ width: 16, height: 16, accentColor: "var(--green)" }} /> HHA
                  </label>
                </div>
                <input className="hf-input" placeholder="Other Certifications" value={form.otherCert} onChange={upd("otherCert")} style={{ background: "#f0eeeb", border: "none", borderRadius: 4, padding: "14px 16px", fontSize: "0.92rem", alignSelf: "flex-end" }} />
              </div>

              {/* Textarea */}
              <textarea
                placeholder="Other info you would like to provide"
                value={form.info}
                onChange={upd("info")}
                style={{ width: "100%", background: "#f0eeeb", border: "none", borderRadius: 4, padding: "14px 16px", fontSize: "0.92rem", fontFamily: "DM Sans, sans-serif", minHeight: 140, resize: "vertical", marginBottom: 20, outline: "none" }}
              />

              {/* Submit right-aligned */}
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button className="btn-orange" style={{ padding: "13px 36px", borderRadius: 6, fontSize: "1rem" }} onClick={() => setSent(true)}>Submit</button>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}

/* ─────────────────── ROOT APP ─────────────────── */
const NAV_ITEMS = [
  { label: "Home", page: "home" },
  {
    label: "Services", page: "services", chevron: true, dropdown: [
      { label: "In-Home Caregivers", page: "svc-inhome" },
      { label: "Hourly In Home Care", page: "svc-hourly" },
      { label: "24 Hour Home Care", page: "svc-24hour" },
      { label: "Hospital to Home Care", page: "svc-hospital" },
      { label: "Respite Care", page: "svc-respite" },
      { label: "Dementia Care", page: "svc-dementia" },
      { label: "Parkinson's Care", page: "svc-parkinsons" },
      { label: "Stroke Recovery Care", page: "svc-stroke" },
    ]
  },
  {
    label: "About Us", page: "about", chevron: true, dropdown: [
      { label: "Testimonials", page: "testimonials" },
      { label: "FAQ", page: "faq" },
      { label: "Careers", page: "careers" },
    ]
  },
  { label: "Resources", page: "resources" },
  { label: "Locations", page: "locations", chevron: true },
  { label: "Contact Us", page: "contact" },
];

function NavItem({ item, currentPage, navigate }) {
  const [open, setOpen] = useState(false);
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const isActive = currentPage === item.page || (item.dropdown && item.dropdown.some(d => d.page === currentPage));

  if (!item.dropdown) {
    return (
      <button className={isActive ? "active" : ""} onClick={() => navigate(item.page)}>
        {item.label}
      </button>
    );
  }

  return (
    <div className="nav-item" ref={ref}>
      <button
        className={isActive ? "active" : ""}
        onClick={() => setOpen(o => !o)}
      >
        {item.label}
        <span className={`chevron${open ? " open" : ""}`}>▾</span>
      </button>
      {open && (
        <div className="nav-dropdown">
          <button className="nav-dropdown-item" onClick={() => { navigate(item.page); setOpen(false); }}>
            All {item.label}
          </button>
          {item.dropdown.map(d => (
            <button key={d.page} className="nav-dropdown-item" onClick={() => { navigate(d.page); setOpen(false); }}>
              {d.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function FrankCompany() {
  const [page, setPage] = useState("home");

  const navigate = (p) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPage = () => {
    if (page.startsWith("svc-")) return <ServiceDetailPage serviceId={page} navigate={navigate} />;
    switch (page) {
      case "home": return <HomePage navigate={navigate} />;
      case "services": return <ServicesPage navigate={navigate} />;
      case "about": return <AboutPage navigate={navigate} />;
      case "testimonials": return <TestimonialsPage navigate={navigate} />;
      case "faq": return <FAQPage navigate={navigate} />;
      case "careers": return <CareersPage navigate={navigate} />;
      case "resources": return <ResourcesPage navigate={navigate} />;
      case "locations": return <LocationsPage navigate={navigate} />;
      case "contact": return <ContactPage />;
      default: return <HomePage navigate={navigate} />;
    }
  };

  return (
    <>
      <style>{globalStyles}</style>

      {/* TOP BAR */}
      <div className="top-bar">
        <div className="top-bar-inner">
          <span>📞</span>
          <a href="tel:2103910948">(210) 391-0948</a>
        </div>
      </div>

      {/* NAV */}
      <nav className="nav">
        <div className="nav-inner">
          <div className="nav-logo" onClick={() => navigate("home")}>
            <div className="nav-logo-main"><em>Senior</em> Buddies</div>
            <div className="nav-logo-sub">Care for Seniors</div>
          </div>
          <div className="nav-links">
            {NAV_ITEMS.map(item => (
              <NavItem key={item.page} item={item} currentPage={page} navigate={navigate} />
            ))}
          </div>
        </div>
      </nav>

      {/* PAGE CONTENT */}
      {renderPage()}

      {/* FOOTER */}
      <Footer navigate={navigate} />
    </>
  );
}