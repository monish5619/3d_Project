import * as THREE from 'three';

/**
 * Creates a procedural 360-degree studio environment map with high-contrast
 * directional light banks and subtle chromatic rims for realistic PBR reflections.
 */
export function createProceduralStudioEnvironment(): THREE.Texture {
  const width = 1024;
  const height = 512;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return new THREE.Texture();
  }

  // Base deep cosmic space gradient
  const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
  bgGrad.addColorStop(0, '#06070B');
  bgGrad.addColorStop(0.5, '#0E111B');
  bgGrad.addColorStop(1, '#06070B');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Soft violet studio softbox (left hemisphere)
  const violetGrad = ctx.createRadialGradient(260, 200, 10, 260, 200, 240);
  violetGrad.addColorStop(0, 'rgba(196, 181, 253, 0.95)');
  violetGrad.addColorStop(0.3, 'rgba(139, 92, 246, 0.65)');
  violetGrad.addColorStop(0.7, 'rgba(99, 102, 241, 0.25)');
  violetGrad.addColorStop(1, 'transparent');
  ctx.fillStyle = violetGrad;
  ctx.fillRect(0, 0, width, height);

  // Ice blue rim light bank (right hemisphere)
  const cyanGrad = ctx.createRadialGradient(780, 240, 10, 780, 240, 220);
  cyanGrad.addColorStop(0, 'rgba(255, 255, 255, 0.98)');
  cyanGrad.addColorStop(0.25, 'rgba(112, 225, 255, 0.7)');
  cyanGrad.addColorStop(0.65, 'rgba(56, 189, 248, 0.2)');
  cyanGrad.addColorStop(1, 'transparent');
  ctx.fillStyle = cyanGrad;
  ctx.fillRect(0, 0, width, height);

  // Overhead warm specular key strip
  const topStrip = ctx.createLinearGradient(0, 0, 0, 120);
  topStrip.addColorStop(0, 'rgba(245, 245, 247, 0.85)');
  topStrip.addColorStop(0.5, 'rgba(245, 245, 247, 0.3)');
  topStrip.addColorStop(1, 'transparent');
  ctx.fillStyle = topStrip;
  ctx.fillRect(150, 0, width - 300, 120);

  // Horizontal equatorial specular ribbon
  ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
  ctx.fillRect(0, 250, width, 12);

  const texture = new THREE.CanvasTexture(canvas);
  texture.mapping = THREE.EquirectangularReflectionMapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}
