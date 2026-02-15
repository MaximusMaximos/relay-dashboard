import { Source } from '@/app/types';

export const sources: Source[] = [
  { 
    id: 'audio', 
    name: 'AUDIO', 
    icon: '/Images/audio-source.png', 
    count: 2, 
    price: '$0.005',
    desc: 'Speech-to-text & text-to-speech',
    features: ['Transcription', 'Voice synthesis']
  },
  { 
    id: 'automatic1111', 
    name: 'AUTOMATIC1111', 
    icon: '/Images/stable-diffusion-icon.png',
    count: 3, 
    price: '$0.008',
    desc: 'Stable Diffusion art models',
    features: ['Artistic styles', 'Fine-tuned']
  },
  { 
    id: 'image', 
    name: 'IMAGE', 
    icon: '/Images/image-source.png', 
    count: 6, 
    price: '$0.05',
    desc: 'Professional image generation',
    features: ['T2I', 'I2I', 'Editing']
  },
  { 
    id: 'ollama', 
    name: 'OLLAMA', 
    icon: '/Images/ollama-icon.png', 
    count: 4, 
    price: '$0.0004',
    desc: 'Open-source language models',
    features: ['Chat', 'Code', 'Reasoning']
  },
  { 
    id: 'video', 
    name: 'VIDEO', 
    icon: '/Images/video-source.png', 
    count: 7, 
    price: '$0.12-0.25',
    desc: 'Text & image to video',
    features: ['T2V', 'I2V', 'HD quality']
  },
  { 
    id: 'vllm', 
    name: 'VLLM', 
    icon: '/Images/vllm-icon.png', 
    count: 1, 
    price: '$0.0004',
    desc: 'High-performance inference',
    features: ['Fast', 'Scalable']
  }
];