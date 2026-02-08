export interface ParamOption {
  type: 'select' | 'toggle' | 'checkbox' | 'image_with_url' | 'textarea' | 'text' | 'number' | 'image';
  label: string;
  required?: boolean;
  placeholder?: string;
  maxLength?: number;
  options?: (string | number)[];
  default?: string | number | boolean;
  min?: number;
  max?: number;
  step?: number;
  description?: string;
}

export interface Model {
  id: string;
  name: string;
  desc: string;
  price: string;
  previewType: 'image' | 'video' | 'text';
  preview: string;
  params: Record<string, ParamOption>;
  hiddenParams?: Record<string, any>;
}

export interface Source {
  id: string;
  name: string;
  icon: string;
  count: number;
  price: string;
  desc: string;
  features: string[];
}

export interface GenerationHistoryItem {
  id: number;
  date: string;
  duration: string;
  status: 'completed' | 'failed' | 'pending';
}

export interface PreviewOutput {
  type: 'image' | 'video' | 'text';
  url?: string;
  text?: string;
  reasoning?: string;
  taskId?: string;
  json?: any;
}

export type FormData = Record<string, any>;
