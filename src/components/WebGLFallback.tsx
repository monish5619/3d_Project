import React from 'react';
import { AlertCircle } from 'lucide-react';

interface WebGLFallbackProps {
  message?: string;
}

export const WebGLFallback: React.FC<WebGLFallbackProps> = ({ 
  message = "WebGL is unavailable or disabled in your browser environment. Displaying procedural CSS fallback." 
}) => {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      minHeight: '300px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'radial-gradient(circle at center, rgba(139, 92, 246, 0.15) 0%, rgba(8, 9, 13, 0.95) 75%)',
      border: '1px dashed rgba(139, 92, 246, 0.3)',
      borderRadius: '12px',
      padding: '24px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Procedural geometric animation fallback */}
      <div style={{
        position: 'relative',
        width: '160px',
        height: '160px',
        marginBottom: '20px'
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          border: '2px solid rgba(112, 225, 255, 0.6)',
          borderRadius: '50%',
          animation: 'pulseGlow 3s ease-in-out infinite',
          transform: 'rotateX(60deg)'
        }} />
        <div style={{
          position: 'absolute',
          inset: '20px',
          border: '2px solid rgba(139, 92, 246, 0.8)',
          borderRadius: '50%',
          animation: 'pulseGlow 2.5s ease-in-out infinite reverse',
          transform: 'rotateY(60deg)'
        }} />
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '24px',
          height: '24px',
          background: 'radial-gradient(circle, #70E1FF 0%, #8B5CF6 100%)',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          boxShadow: '0 0 20px #8B5CF6'
        }} />
      </div>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.8rem',
        color: 'var(--accent-blue)',
        marginBottom: '6px'
      }}>
        <AlertCircle size={16} />
        <span>PROCEDURAL SIMULATION ACTIVE</span>
      </div>
      <p style={{
        fontFamily: 'var(--font-sans)',
        fontSize: '0.85rem',
        color: 'var(--text-secondary)',
        textAlign: 'center',
        maxWidth: '380px'
      }}>
        {message}
      </p>
    </div>
  );
};
