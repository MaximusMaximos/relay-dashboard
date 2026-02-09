import { Source } from '@/app/types';

export const sources: Source[] = [
  { 
    id: 'audio', 
    name: 'AUDIO', 
    icon: '🎙️', 
    count: 2, 
    price: '$0.005',
    desc: 'Speech-to-text & text-to-speech',
    features: ['Transcription', 'Voice synthesis']
  },
  { 
    id: 'automatic1111', 
    name: 'AUTOMATIC1111', 
    icon: '🎨', 
    count: 3, 
    price: '$0.008',
    desc: 'Stable Diffusion art models',
    features: ['Artistic styles', 'Fine-tuned']
  },
  { 
    id: 'image', 
    name: 'IMAGE', 
    icon: '🖼️', 
    count: 6, 
    price: '$0.05',
    desc: 'Professional image generation',
    features: ['T2I', 'I2I', 'Editing']
  },
  { 
    id: 'ollama', 
    name: 'OLLAMA', 
    icon: '💬', 
    count: 4, 
    price: '$0.0004',
    desc: 'Open-source language models',
    features: ['Chat', 'Code', 'Reasoning']
  },
  { 
    id: 'video', 
    name: 'VIDEO', 
    icon: '🎬', 
    count: 7, 
    price: '$0.12-0.25',
    desc: 'Text & image to video',
    features: ['T2V', 'I2V', 'HD quality']
  },
  { 
    id: 'vllm', 
    name: 'VLLM', 
    icon: '⚡', 
    count: 1, 
    price: '$0.0004',
    desc: 'High-performance inference',
    features: ['Fast', 'Scalable']
  }
];
