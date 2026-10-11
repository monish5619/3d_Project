export type VisualMode = 'solid' | 'wireframe' | 'hologram' | 'quantum';

export interface LabSettings {
  rotationSpeed: number;
  particleIntensity: number;
  visualMode: VisualMode;
  accentColor: string;
  isPlaying: boolean;
  shellEnabled: boolean;
}

export interface ExhibitData {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  telemetry: {
    label: string;
    value: string;
  }[];
  accent: string;
}
