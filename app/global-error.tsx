'use client';

import React from 'react';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily:
            '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          background: 'linear-gradient(180deg, #F8FAFC 0%, #FFF1F2 100%)',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ textAlign: 'center', padding: '2rem', maxWidth: 480 }}>
          {/* Logo */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              marginBottom: 40,
              padding: '8px 16px',
              borderRadius: 8,
              background: 'rgba(15, 23, 42, 0.05)',
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#0F172A">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z" />
            </svg>
            <span style={{ fontWeight: 700, color: '#0F172A', fontSize: 16 }}>
              CareFlow
            </span>
          </div>

          {/* Error icon */}
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: 20,
              background: 'rgba(239, 68, 68, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px',
            }}
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="#EF4444">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
            </svg>
          </div>

          <h1
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: '#0F172A',
              margin: '0 0 12px',
            }}
          >
            Application Error
          </h1>

          <p
            style={{
              fontSize: 16,
              color: '#64748B',
              lineHeight: 1.7,
              margin: '0 0 32px',
            }}
          >
            A critical error occurred. This page could not be rendered. Please
            try refreshing or return to the home page.
          </p>

          <div
            style={{
              display: 'flex',
              gap: 12,
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <button
              onClick={reset}
              style={{
                padding: '12px 28px',
                borderRadius: 8,
                border: 'none',
                background: 'linear-gradient(135deg, #0F172A, #1E293B)',
                color: 'white',
                fontSize: 15,
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(15, 23, 42, 0.25)',
                transition: 'all 0.3s',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow =
                  '0 6px 20px rgba(15, 23, 42, 0.3)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow =
                  '0 4px 14px rgba(15, 23, 42, 0.25)';
              }}
            >
              ↻ Try Again
            </button>

            <button
              onClick={() => (window.location.href = '/')}
              style={{
                padding: '12px 28px',
                borderRadius: 8,
                border: '1px solid #CBD5E1',
                background: 'white',
                color: '#475569',
                fontSize: 15,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.borderColor = '#94A3B8';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = '#CBD5E1';
              }}
            >
              ⌂ Go Home
            </button>
          </div>

          {/* Error digest */}
          {error.digest && (
            <p
              style={{
                marginTop: 40,
                fontSize: 12,
                color: '#94A3B8',
                fontFamily: 'monospace',
              }}
            >
              Error ID: {error.digest}
            </p>
          )}
        </div>
      </body>
    </html>
  );
}
