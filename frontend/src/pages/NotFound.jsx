import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const FONT = "'proxima-nova','Proxima Nova',-apple-system,BlinkMacSystemFont,'Segoe UI','Helvetica Neue',Arial,sans-serif";

export default function NotFound() {
  useEffect(() => { document.title = 'Page Not Found | POWERS Manufacturing Operations Consulting'; }, []);
  return (
    <section style={{ background: '#183a61' }}>
      <div style={{
        maxWidth: 1280, margin: '0 auto', width: '100%',
        padding: '120px 48px', minHeight: 600,
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        fontFamily: FONT,
      }}>
        <div style={{
          fontSize: 12, fontWeight: 500, letterSpacing: '0.18em',
          textTransform: 'uppercase', color: '#eabb71', marginBottom: 24,
        }}>404</div>
        <h1 style={{
          fontSize: 'clamp(36px, 4.2vw, 56px)', fontWeight: 800,
          lineHeight: 1.08, color: '#ffffff', letterSpacing: '-0.01em',
          textWrap: 'balance',
        }}>Page Not Found</h1>
        <p style={{
          fontSize: 'clamp(17px, 1.5vw, 22px)', fontWeight: 300,
          lineHeight: 1.5, color: 'rgba(255,255,255,0.90)',
          maxWidth: '60ch', marginTop: 28, textWrap: 'pretty',
        }}>
          The page you&apos;re looking for has moved or never existed. Head back to the homepage to find what you need.
        </p>
        <hr style={{ width: 80, height: 1, background: '#eabb71', border: 0, marginTop: 64 }} />
        <Link to="/" data-testid="not-found-home-link" style={{
          display: 'inline-block', marginTop: 32,
          fontSize: 13, fontWeight: 500, color: '#0d2442',
          background: '#eabb71', padding: '12px 28px',
          textDecoration: 'none', alignSelf: 'flex-start',
        }}>Return Home</Link>
      </div>
    </section>
  );
}
