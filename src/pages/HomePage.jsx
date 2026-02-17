import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '@/styles/cinematic.css';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Data defined directly in component file (same as original)
const PHOTOGRAPHER_NAME = 'Vishnu';
const PHOTOGRAPHER_TAGLINE = 'Capturing spaces, faces, and flavors.';
const PHOTOGRAPHER_EMAIL = 'hello@vishnuphotography.com';
const PHOTOGRAPHER_PHONE = '+1 (555) 123-4567';
const PHOTOGRAPHER_INSTAGRAM = '@vishnu.lens';
const PHOTOGRAPHER_LOCATION = 'Los Angeles, California';
const PHOTOGRAPHER_BIO = [
  "With over a decade of experience behind the lens, I've dedicated my career to capturing the extraordinary in the ordinary. My journey began in the narrow streets of old cities, where I learned that every corner holds a story waiting to be told.",
  "I specialize in three distinct worlds: the geometric poetry of architecture, the raw emotion of human portraits, and the sensory art of culinary photography. Each frame I capture is a meditation on light, shadow, and the fleeting moments that define our existence.",
  "My work has been featured in Architectural Digest, Vogue, and numerous international publications. But beyond the accolades, what drives me is the pursuit of that perfect moment when everything aligns—when light meets subject, and magic happens."
];

const HERO_IMAGE = "https://cdn.jsdelivr.net/gh/gandhamvishnu-VB/Portfolio_images/Arch/10.jpg"
const ABOUT_IMAGE = 'https://cdn.jsdelivr.net/gh/gandhamvishnu-VB/Portfolio_images/vishnu_pic.jpeg';

const ARCHITECTURE_IMAGES = [
  { id: 1, url: 'https://cdn.jsdelivr.net/gh/gandhamvishnu-VB/Portfolio_images/Arch/1.jpg', title: 'Geometric Shadows', location: 'Barcelona, Spain' },
  { id: 2, url: 'https://cdn.jsdelivr.net/gh/gandhamvishnu-VB/Portfolio_images/Arch/2.jpg', title: 'Urban Minimalism', location: 'Tokyo, Japan' },
  { id: 3, url: 'https://cdn.jsdelivr.net/gh/gandhamvishnu-VB/Portfolio_images/Arch/3.jpg', title: 'Twilight Horizons', location: 'Dubai, UAE' },
  { id: 4, url: 'https://cdn.jsdelivr.net/gh/gandhamvishnu-VB/Portfolio_images/Arch/4.jpg', title: 'Steel & Glass', location: 'New York, USA' },
  { id: 5, url: 'https://cdn.jsdelivr.net/gh/gandhamvishnu-VB/Portfolio_images/Arch/5.jpg', title: 'Sacred Geometry', location: 'Paris, France' },
  { id: 6, url: 'https://cdn.jsdelivr.net/gh/gandhamvishnu-VB/Portfolio_images/Arch/6.jpg', title: 'Concrete Dreams', location: 'London, UK' },
  { id: 8, url: 'https://cdn.jsdelivr.net/gh/gandhamvishnu-VB/Portfolio_images/Arch/8.jpg', title: 'Steel & Glass', location: 'New York, USA' },
  { id: 9, url: 'https://cdn.jsdelivr.net/gh/gandhamvishnu-VB/Portfolio_images/Arch/9.jpg', title: 'Sacred Geometry', location: 'Paris, France' }
];

const PORTRAIT_IMAGES = [
  { id: 2, url: 'https://cdn.jsdelivr.net/gh/gandhamvishnu-VB/Portfolio_images/Faces/2.jpg', title: 'Studio Light', subject: 'Fashion Portrait' },
  { id: 1, url: 'https://cdn.jsdelivr.net/gh/gandhamvishnu-VB/Portfolio_images/Faces/1.jpg', title: 'Serene Grace', subject: 'Editorial Portrait' },
  { id: 4, url: 'https://cdn.jsdelivr.net/gh/gandhamvishnu-VB/Portfolio_images/Faces/4.jpg', title: 'Azure Depths', subject: 'Beauty Portrait' },
  { id: 5, url: 'https://cdn.jsdelivr.net/gh/gandhamvishnu-VB/Portfolio_images/Faces/5.jpg', title: 'Raw Character', subject: 'Character Study' },
  { id: 3, url: 'https://cdn.jsdelivr.net/gh/gandhamvishnu-VB/Portfolio_images/Faces/3.jpg', title: 'Golden Hour', subject: 'Outdoor Portrait' },
];

const FOOD_IMAGES = [
  { id: 1, url: 'https://cdn.jsdelivr.net/gh/gandhamvishnu-VB/Portfolio_images/Food/1.jpg', title: 'The Perfect Stack', cuisine: 'American Nuggets' },
  { id: 2, url: 'https://cdn.jsdelivr.net/gh/gandhamvishnu-VB/Portfolio_images/Food/4.jpg', title: 'Pasta Poetry', cuisine: 'Italian Fine Dining' },
  { id: 3, url: 'https://cdn.jsdelivr.net/gh/gandhamvishnu-VB/Portfolio_images/Food/5.jpg', title: 'Culinary Canvas', cuisine: 'Modern Fusion' },
  { id: 4, url: 'https://cdn.jsdelivr.net/gh/gandhamvishnu-VB/Portfolio_images/Food/10.jpg', title: 'Garden Fresh', cuisine: 'Farm to Table' },
  { id: 5, url: 'https://cdn.jsdelivr.net/gh/gandhamvishnu-VB/Portfolio_images/Food/2.jpg', title: 'Artisan Craft', cuisine: 'Artisan Pizza' },
  { id: 6, url: 'https://cdn.jsdelivr.net/gh/gandhamvishnu-VB/Portfolio_images/Food/3.jpg', title: 'Morning Ritual', cuisine: 'Breakfast Art' },
  { id: 7, url: 'https://cdn.jsdelivr.net/gh/gandhamvishnu-VB/Portfolio_images/Food/6.jpg', title: 'Morning Ritual', cuisine: 'Breakfast Art' },
  { id: 8, url: 'https://cdn.jsdelivr.net/gh/gandhamvishnu-VB/Portfolio_images/Food/7.jpg', title: 'Morning Ritual', cuisine: 'Breakfast Art' },
  { id: 9, url: 'https://cdn.jsdelivr.net/gh/gandhamvishnu-VB/Portfolio_images/Food/11.jpg', title: 'Morning Ritual', cuisine: 'Breakfast Art' },
];

const STATS_DATA = [
  { number: '500+', label: 'Projects Completed' },
  { number: '12', label: 'Years Experience' },
  { number: '50+', label: 'Awards Won' },
  { number: '200+', label: 'Happy Clients' }
];

const TESTIMONIALS_DATA = [
  { quote: "Vishnu's architectural photography transformed our brand identity. His eye for geometric perfection is unmatched.", author: 'Sarah Chen', role: 'Creative Director, Foster + Partners' },
  { quote: "Working with Vishnu was a revelation. He captures not just images, but emotions frozen in time.", author: 'Marcus Webb', role: 'Editor-in-Chief, Vogue Living' },
  { quote: "The food photography Vishnu created for our restaurant became art that our guests couldn't stop talking about.", author: 'Elena Rodriguez', role: 'Owner, Maison Lumière' }
];

function GridItem({ image, metaKey, onHoverStart, onHoverEnd }) {
  return (
    <div
      className="grid-item"
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
    >
      <img src={image.url} alt={image.title} loading="lazy" />
      <div className="grid-item-overlay">
        <h3 className="grid-item-title">{image.title}</h3>
        <p className="grid-item-meta">{image[metaKey]}</p>
      </div>
    </div>
  );
}

// function StatItem({ number, label }) {
//   return (
//     <div className="stat-item">
//       <div className="stat-number">{number}</div>
//       <div className="stat-label">{label}</div>
//     </div>
//   );
// }

function TestimonialCard({ quote, author, role }) {
  return (
    <div className="testimonial-card">
      <p className="testimonial-quote">"{quote}"</p>
      <p className="testimonial-author">{author}</p>
      <p className="testimonial-role">{role}</p>
    </div>
  );
}

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [cursorX, setCursorX] = useState(0);
  const [cursorY, setCursorY] = useState(0);
  const [cursorHover, setCursorHover] = useState(false);

  const mainRef = useRef(null);
  const heroRef = useRef(null);
  const archRef = useRef(null);
  const portRef = useRef(null);
  const foodRef = useRef(null);
  const aboutRef = useRef(null);
  const statsRef = useRef(null);
  const testRef = useRef(null);
  const contactRef = useRef(null);

  useEffect(() => {
    function handleMove(e) {
      setCursorX(e.clientX - 10);
      setCursorY(e.clientY - 10);
    }
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isLoading) return;

    const ctx = gsap.context(() => {
      gsap
        .timeline()
        .to('.hero-bg', { scale: 1, duration: 2, ease: 'power3.out' })
        .to('.hero-title .char', { opacity: 1, y: 0, duration: 0.8, stagger: 0.05, ease: 'power3.out' }, '-=1.5')
        .to('.hero-tagline', { opacity: 1, filter: 'blur(0px)', duration: 1.2, ease: 'power2.out' }, '-=0.5')
        .to('.hero-scroll-indicator', { opacity: 1, duration: 1, ease: 'power2.out' }, '-=0.3');

      gsap.to('.hero-bg', {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: true }
      });

      gsap.from('.arch-header', {
        opacity: 0, y: 60, duration: 1,
        scrollTrigger: { trigger: archRef.current, start: 'top 70%' }
      });
      gsap.from('.arch-grid .grid-item', {
        opacity: 0, scale: 0.8, rotateY: 15, duration: 1, stagger: 0.15,
        scrollTrigger: { trigger: '.arch-grid', start: 'top 70%' }
      });

      gsap.from('.port-header', {
        opacity: 0, y: 60, duration: 1,
        scrollTrigger: { trigger: portRef.current, start: 'top 70%' }
      });
      gsap.from('.port-grid .grid-item', {
        opacity: 0, filter: 'blur(20px)', y: 80, duration: 1.2, stagger: 0.15,
        scrollTrigger: { trigger: '.port-grid', start: 'top 70%' }
      });

      gsap.from('.food-header', {
        opacity: 0, y: 60, duration: 1,
        scrollTrigger: { trigger: foodRef.current, start: 'top 70%' }
      });
      gsap.to('.food-grid .grid-item', {
        opacity: 1, y: 0, rotate: 0, duration: 0.8, stagger: 0.1, ease: 'back.out(1.7)',
        scrollTrigger: { trigger: '.food-grid', start: 'top 70%' }
      });

      gsap.from('.about-image-wrapper', {
        opacity: 0, x: -100, duration: 1.2,
        scrollTrigger: { trigger: aboutRef.current, start: 'top 60%' }
      });
      gsap.from('.about-content > *', {
        opacity: 0, y: 40, duration: 1, stagger: 0.2,
        scrollTrigger: { trigger: aboutRef.current, start: 'top 60%' }
      });

      gsap.to('.stat-item', {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.15,
        scrollTrigger: { trigger: statsRef.current, start: 'top 70%' }
      });

      gsap.to('.testimonial-card', {
        opacity: 1, y: 0, duration: 1, stagger: 0.2,
        scrollTrigger: { trigger: testRef.current, start: 'top 60%' }
      });

      gsap.to('.contact-spotlight', {
        opacity: 1, scale: 1.2, duration: 2,
        scrollTrigger: { trigger: contactRef.current, start: 'top 60%' }
      });
      gsap.to('.contact-content > *', {
        opacity: 1, y: 0, duration: 1, stagger: 0.15,
        scrollTrigger: { trigger: contactRef.current, start: 'top 50%' }
      });
    }, mainRef);

    return () => ctx.revert();
  }, [isLoading]);

  const handleHoverStart = () => setCursorHover(true);
  const handleHoverEnd = () => setCursorHover(false);

  if (isLoading) {
    return (
      <div className="page-loader">
        <div className="loader-text">
          <span>V</span><span>I</span><span>S</span><span>H</span><span>N</span><span>U</span>
        </div>
      </div>
    );
  }

  return (
    <div className="cinematic-portfolio" ref={mainRef}>
      <div className="film-grain" />
      <div
        className={`custom-cursor ${cursorHover ? 'hover' : ''}`}
        style={{ left: cursorX, top: cursorY }}
      />

      <nav className="nav-cinematic">
        <a href="#" className="nav-logo">VISHNU</a>
        <ul className="nav-links">
          <li><a href="#architecture">Architecture</a></li>
          <li><a href="#portrait">Portrait</a></li>
          <li><a href="#food">Food</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      <section className="hero-section" ref={heroRef}>
        <div className="hero-bg" style={{ backgroundImage: `url(${HERO_IMAGE})` }} />
        <div className="hero-overlay" />
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="char">V</span>
            <span className="char">i</span>
            <span className="char">s</span>
            <span className="char">h</span>
            <span className="char">n</span>
            <span className="char">u</span>
          </h1>
          <p className="hero-tagline">{PHOTOGRAPHER_TAGLINE}</p>
        </div>
        <div className="hero-scroll-indicator">
          <span>Scroll to explore</span>
          <div className="scroll-line" />
        </div>
      </section>

      <section className="genre-section" id="architecture" ref={archRef}>
        <div className="genre-number">01</div>
        <div className="genre-header arch-header">
          <h2 className="genre-title">Architecture</h2>
          <p className="genre-subtitle">Geometric Poetry in Built Spaces</p>
        </div>
        <div className="image-grid architecture arch-grid">
          {ARCHITECTURE_IMAGES.map((img) => (
            <GridItem key={img.id} image={img} metaKey="location" onHoverStart={handleHoverStart} onHoverEnd={handleHoverEnd} />
          ))}
        </div>
      </section>

      <section className="genre-section" id="portrait" ref={portRef}>
        <div className="genre-number">02</div>
        <div className="genre-header port-header">
          <h2 className="genre-title">Portrait</h2>
          <p className="genre-subtitle">Capturing the Soul Within</p>
        </div>
        <div className="image-grid portrait port-grid">
          {PORTRAIT_IMAGES.map((img) => (
            <GridItem key={img.id} image={img} metaKey="subject" onHoverStart={handleHoverStart} onHoverEnd={handleHoverEnd} />
          ))}
        </div>
      </section>

      <section className="genre-section" id="food" ref={foodRef}>
        <div className="genre-number">03</div>
        <div className="genre-header food-header">
          <h2 className="genre-title">Food</h2>
          <p className="genre-subtitle">The Art of Culinary Storytelling</p>
        </div>
        <div className="image-grid food food-grid">
          {FOOD_IMAGES.map((img) => (
            <GridItem key={img.id} image={img} metaKey="cuisine" onHoverStart={handleHoverStart} onHoverEnd={handleHoverEnd} />
          ))}
        </div>
      </section>

      <section className="about-section" id="about" ref={aboutRef}>
        <div className="about-container">
          <div className="about-image-wrapper">
            <img src={ABOUT_IMAGE} alt="Vishnu - Photographer" className="about-image" />
            <div className="about-image-frame" />
          </div>
          <div className="about-content">
            <span className="about-label">About the Artist</span>
            <h2 className="about-title">The Vision Behind the Lens</h2>
            <div className="about-bio">
              {PHOTOGRAPHER_BIO.map((para, i) => <p key={i}>{para}</p>)}
            </div>
            <div className="about-signature">{PHOTOGRAPHER_NAME}</div>
          </div>
        </div>
      </section>

      {/* <section className="stats-section" ref={statsRef}>
        <div className="stats-grid">
          {STATS_DATA.map((stat, i) => (
            <StatItem key={i} number={stat.number} label={stat.label} />
          ))}
        </div>
      </section> */}

      <section className="testimonials-section" ref={testRef}>
        <div className="testimonials-header">
          <h2 className="testimonials-title">Words from Collaborators</h2>
        </div>
        <div className="testimonials-container">
          {TESTIMONIALS_DATA.map((t, i) => (
            <TestimonialCard key={i} quote={t.quote} author={t.author} role={t.role} />
          ))}
        </div>
      </section>

      <section className="contact-section" id="contact" ref={contactRef}>
        <div className="contact-spotlight" />
        <div className="contact-container contact-content">
          <span className="contact-label">Get in Touch</span>
          <h2 className="contact-title">Let&apos;s Create<br />Something Beautiful</h2>
          <a href={`mailto:${PHOTOGRAPHER_EMAIL}`} className="contact-email">{PHOTOGRAPHER_EMAIL}</a>
          <div className="contact-details">
            <div className="contact-detail">
              <p className="contact-detail-label">Phone</p>
              <p className="contact-detail-value">{PHOTOGRAPHER_PHONE}</p>
            </div>
            <div className="contact-detail">
              <p className="contact-detail-label">Location</p>
              <p className="contact-detail-value">{PHOTOGRAPHER_LOCATION}</p>
            </div>
            <div className="contact-detail">
              <p className="contact-detail-label">Instagram</p>
              <p className="contact-detail-value">{PHOTOGRAPHER_INSTAGRAM}</p>
            </div>
          </div>
          <a
            href={`mailto:${PHOTOGRAPHER_EMAIL}`}
            className="contact-cta"
            onMouseEnter={handleHoverStart}
            onMouseLeave={handleHoverEnd}
          >
            Start a Project <ArrowRight />
          </a>
        </div>
      </section>

      <footer className="footer-cinematic">
        <div className="footer-content">
          <div className="footer-logo">VISHNU</div>
          <p className="footer-copyright">© 2025 Vishnu Photography. All rights reserved.</p>
          <div className="footer-social">
            <a href="#">Instagram</a>
            <a href="#">Behance</a>
            <a href="#">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
