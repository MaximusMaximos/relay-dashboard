import { Model } from '@/app/types';

export const modelData: Record<string, Model[]> = {
  automatic1111: [
    {
      id: 'illustrious',
      name: 'Illustrious Realism',
      desc: 'Artistic & creative styles',
      price: '$0.008',
      previewType: 'image',
      preview: '/Images/illustriousRealismBY.png',
      params: {
        steps: { type: 'select', label: 'Steps', options: [10, 20, 30, 40, 50], default: 10 },
        resolution: { type: 'select', label: 'Resolution', options: ['1024x1024', '1280x720', '832x480', '512x512', '256x256'], default: '1024x1024' },
        prompt: { type: 'textarea', label: 'Prompt', required: true, placeholder: 'Describe your image...', maxLength: 500 },
        negative_prompt: { type: 'textarea', label: 'Negative Prompt', placeholder: 'low quality, blurry, watermark', maxLength: 500 }
      },
      hiddenParams: {
        cfg_scale: 4.5
      }
    },
    {
      id: 'realistic',
      name: 'Realistic Vision V5.1',
      desc: 'Photorealistic scenes',
      price: '$0.008',
      previewType: 'image',
      preview: '/Images/Realistic-vision-v5.png',
      params: {
        steps: { type: 'select', label: 'Steps', options: [10, 20, 30, 40, 50], default: 20 },
        resolution: { type: 'select', label: 'Resolution', options: ['1024x1024', '1280x720', '832x480', '512x512', '256x256'], default: '1024x1024' },
        prompt: { type: 'textarea', label: 'Prompt', required: true, placeholder: 'Describe your image...', maxLength: 500 },
        negative_prompt: { type: 'textarea', label: 'Negative Prompt', placeholder: 'low quality, blurry, watermark', maxLength: 500 }
      },
      hiddenParams: {
        cfg_scale: 4.5
      }
    },
    {
      id: 'sd15',
      name: 'Stable Diffusion 1.5',
      desc: 'Classic SD model',
      price: '$0.008',
      previewType: 'image',
      preview: '/Images/Stable-diffusion-v1-5.png',
      params: {
        steps: { type: 'select', label: 'Steps', options: [10, 20, 30, 40, 50], default: 10 },
        resolution: { type: 'select', label: 'Resolution', options: ['1024x1024', '1280x720', '832x480', '512x512', '256x256'], default: '1024x1024' },
        prompt: { type: 'textarea', label: 'Prompt', required: true, placeholder: 'Describe your image...', maxLength: 500 },
        negative_prompt: { type: 'textarea', label: 'Negative Prompt', placeholder: 'low quality, blurry, watermark', maxLength: 500 }
      },
      hiddenParams: {
        cfg_scale: 4.5
      }
    }
  ],
  video: [
    {
      id: 'kling-12v',
      name: 'Kling v2.6-12V',
      desc: '10-second video generation',
      price: '$0.12',
      previewType: 'video',
      preview: '/Videos/Mona_Lisa.mp4',
      params: {
        first_frame_image: { type: 'image_with_url', label: 'First Frame Image', required: true },
        prompt: { type: 'textarea', label: 'Prompt', required: true, placeholder: 'Use the reference image. The painted figure slowly stands up from the pose and calmly walks out of frame...', maxLength: 500 },
        aspect_ratio: { type: 'select', label: 'Aspect Ratio', options: ['1:1', '16:9', '9:16'], default: '16:9' },
        duration: { type: 'select', label: 'Duration (seconds)', options: ['5', '10'], default: '5' },
        last_frame_image_url: { type: 'text', label: 'Last Frame Image URL (Optional)', placeholder: 'Enter image URL for last frame (optional)...' },
        negative_prompt: { type: 'text', label: 'Negative Prompt (Optional)', placeholder: 'low quality, blurry, watermark' }
      }
    },
    {
      id: 'kling-t2v',
      name: 'Kling v2.6-T2V',
      desc: 'Text-to-video generation',
      price: '$0.05',
      previewType: 'video',
      preview: '/Videos/Capybara_concert_prompt.mp4',
      params: {
        prompt: { type: 'textarea', label: 'Prompt', required: true, placeholder: 'Describe your video...', maxLength: 500 },
        aspect_ratio: { type: 'select', label: 'Aspect Ratio', options: ['1:1', '16:9', '9:16'], default: '16:9' },
        duration: { type: 'select', label: 'Duration (seconds)', options: ['5', '10'], default: '5' },
        negative_prompt: { type: 'text', label: 'Negative Prompt (Optional)', placeholder: 'low quality, blurry, watermark' }
      }
    },
    {
      id: 'sora-pro',
      name: 'Sora 2 Pro',
      desc: 'OpenAI\'s premium video model',
      price: '$0.20',
      previewType: 'video',
      preview: '/Videos/Openai-sora-pro-T2V.mp4',
      params: {
        prompt: { type: 'textarea', label: 'Prompt', required: true, placeholder: 'Describe your video...', maxLength: 500 },
        size: { type: 'select', label: 'Size', options: ['1280x720', '720x1280', '1024x1792', '1792x1024'], default: '1280x720' },
        duration: { type: 'select', label: 'Duration (seconds)', options: ['4', '8', '12'], default: '4' }
      }
    },
    {
      id: 'sora-standard',
      name: 'Sora 2 Standard',
      desc: 'High-quality video generation',
      price: '$0.12',
      previewType: 'video',
      preview: '/Videos/Openai-sora-2-T2V.mp4',
      params: {
        prompt: { type: 'textarea', label: 'Prompt', required: true, placeholder: 'Describe your video...', maxLength: 500 },
        size: { type: 'select', label: 'Size', options: ['1280x720', '720x1280'], default: '1280x720' },
        duration: { type: 'select', label: 'Duration (seconds)', options: ['4', '8', '12'], default: '4' }
      }
    },
    {
      id: 'wan-i2v',
      name: 'Wan AI 2.5 I2V',
      desc: 'Image-to-video generation',
      price: '$0.12',
      previewType: 'video',
      preview: '/Videos/Wan-AI-Wan2.-I2V.mp4',
      params: {
        first_frame_image_url: { type: 'text', label: 'First Frame Image URL', required: true, placeholder: 'https://example.com/image.jpg' },
        prompt: { type: 'textarea', label: 'Prompt', required: true, placeholder: 'Describe the animation...', maxLength: 500 },
        resolution: { type: 'select', label: 'Resolution', options: ['480p', '720p', '1080p'], default: '720p' },
        duration: { type: 'select', label: 'Duration (seconds)', options: ['5', '10'], default: '5' },
        enable_prompt_expansion: { type: 'checkbox', label: 'Enable Prompt Expansion', default: false, description: 'Automatically expand and enhance your prompt' },
        negative_prompt: { type: 'text', label: 'Negative Prompt (Optional)', placeholder: 'low quality, blurry, watermark' }
      }
    },
    {
      id: 'wan-t2v',
      name: 'Wan AI 2.5 T2V',
      desc: 'Text-to-video generation',
      price: '$0.12',
      previewType: 'video',
      preview: '/Videos/Wan-AI-Wan2.5-T2V.mp4',
      params: {
        prompt: { type: 'textarea', label: 'Prompt', required: true, placeholder: 'Describe your video...', maxLength: 500 },
        size: { type: 'select', label: 'Size', options: ['832x480', '480x832', '1280x720', '720x1280'], default: '832x480' },
        duration: { type: 'select', label: 'Duration (seconds)', options: ['5', '10'], default: '5' },
        enable_prompt_expansion: { type: 'checkbox', label: 'Enable Prompt Expansion', default: false, description: 'Automatically expand and enhance your prompt' },
        negative_prompt: { type: 'text', label: 'Negative Prompt (Optional)', placeholder: 'low quality, blurry, watermark' }
      }
    },
    {
      id: 'wan-26',
      name: 'Wan AI 2.6',
      desc: 'Latest Wan video model',
      price: '$0.14',
      previewType: 'video',
      preview: '/Videos/Wan-AI-wan2.6-T2V.mp4',
      params: {
        prompt: { type: 'textarea', label: 'Prompt', required: true, placeholder: 'Describe your video...', maxLength: 500 },
        size: { type: 'select', label: 'Size', options: ['1280x720', '720x1280', '1920x1080', '1080x1920'], default: '1280x720' },
        duration: { type: 'select', label: 'Duration (seconds)', options: ['5', '10', '15'], default: '5' },
        shot_type: { type: 'select', label: 'Shot Type', options: ['single', 'multi'], default: 'single' },
        negative_prompt: { type: 'text', label: 'Negative Prompt (Optional)', placeholder: 'low quality, blurry, watermark' }
      }
    }
  ],
  image: [
    {
      id: 'flux',
      name: 'FLUX-2-pro',
      desc: 'Ultra-realistic images',
      price: '$0.05',
      previewType: 'image',
      preview: '/Images/Black-forest-labs-FLUX-2-pro.png',
      params: {
        prompt: { type: 'textarea', label: 'Prompt', required: true, placeholder: 'Describe your image...', maxLength: 500 },
        resolution: { type: 'select', label: 'Resolution', options: ['1024x1024', '1024x768', '768x1024', '1024x576', '576x1024', '512x512'], default: '1024x1024' },
        output_format: { type: 'select', label: 'Output Format', options: ['png', 'jpeg'], default: 'png' }
      }
    },
    {
      id: 'gemini',
      name: 'Gemini 3 Pro',
      desc: 'Google\'s latest model',
      price: '$0.05',
      previewType: 'image',
      preview: '/Images/Google-gemini-3-pro-T2.png',
      params: {
        prompt: { type: 'textarea', label: 'Prompt', required: true, placeholder: 'Describe your image...', maxLength: 500 },
        aspect_ratio: { type: 'select', label: 'Aspect Ratio', options: ['1:1', '16:9', '9:16', '4:3', '3:4', '21:9'], default: '1:1' },
        image_size: { type: 'select', label: 'Image Size', options: ['1K', '2K', '4K'], default: '1K' }
      }
    },
    {
      id: 'gpt-i2i',
      name: 'GPT-Image I2I',
      desc: 'Image-to-image editing',
      price: '$0.05',
      previewType: 'image',
      preview: '/Images/Openai-gpt-image-1.5 T2 - edit.png',
      params: {
        source_image: { type: 'image_with_url', label: 'Source Image (base64 required)', required: true },
        prompt: { type: 'textarea', label: 'Prompt', required: true, placeholder: 'Describe the changes...', maxLength: 500 },
        size: { type: 'select', label: 'Size', options: ['1024x1024', '1024x1536', '1536x1024'], default: '1024x1024' },
        output_format: { type: 'select', label: 'Output Format', options: ['png', 'jpeg', 'webp'], default: 'png' },
        quality: { type: 'select', label: 'Quality', options: ['high', 'medium', 'low'], default: 'high' },
        mask_image: { type: 'image_with_url', label: 'Mask Image (Optional)' }
      }
    },
    {
      id: 'gpt-t2i',
      name: 'GPT-Image T2I',
      desc: 'Text-to-image generation',
      price: '$0.05',
      previewType: 'image',
      preview: '/Images/Openai-gpt-image-1.5 T2.png',
      params: {
        prompt: { type: 'textarea', label: 'Prompt', required: true, placeholder: 'Describe your image...', maxLength: 500 },
        n: { type: 'number', label: 'Number of Images', min: 1, max: 10, default: 1 },
        size: { type: 'select', label: 'Size', options: ['1024x1024', '1024x1536', '1536x1024'], default: '1024x1024' },
        quality: { type: 'select', label: 'Quality', options: ['high', 'medium', 'low'], default: 'high' },
        output_format: { type: 'select', label: 'Output Format', options: ['png', 'jpeg', 'webp'], default: 'png' }
      }
    },
    {
      id: 'qwen',
      name: 'Qwen Image',
      desc: 'Artistic generations',
      price: '$0.05',
      previewType: 'image',
      preview: '/Images/Qwen-image.png',
      params: {
        prompt: { type: 'textarea', label: 'Prompt', required: true, placeholder: 'Describe your image...', maxLength: 500 },
        size: { type: 'select', label: 'Size', options: ['1024x1024', '512x512'], default: '1024x1024' }
      }
    },
    {
      id: 'qwen-edit',
      name: 'Qwen Image Edit',
      desc: 'Image editing & transforms',
      price: '$0.05',
      previewType: 'image',
      preview: '/Images/Qwen-image-edit.png',
      params: {
        source_image: { type: 'text', label: 'Source Image URL', required: true, placeholder: 'https://example.com/image.jpg' },
        prompt: { type: 'textarea', label: 'Prompt', required: true, placeholder: 'Describe the changes...', maxLength: 500 },
        size: { type: 'select', label: 'Size', options: ['1024x1024', '512x512'], default: '1024x1024' }
      }
    }
  ],
  audio: [
    {
      id: 'whisper',
      name: 'Whisper Large v3',
      desc: 'Speech-to-text transcription',
      price: '$0.005',
      previewType: 'text',
      preview: 'Aa',
      params: {
        language: { type: 'select', label: 'Language', options: ['en', 'es', 'fr', 'de', 'zh', 'ja', 'ko', 'pt', 'ru', 'it', 'nl', 'pl', 'tr', 'auto'], default: 'en' },
        audio_url: { type: 'text', label: 'Audio URL', required: true, placeholder: 'https://relaygpu.com/example.wav' }
      }
    },
    {
      id: 'sesame',
      name: 'Sesame CSM-1b',
      desc: 'Text-to-speech generation',
      price: '$0.005',
      previewType: 'text',
      preview: 'Aa',
      params: {
        voice_type: { type: 'toggle', label: 'Voice Type', options: ['Preset', 'Custom'], default: 'Preset' },
        preset_voice: { type: 'select', label: 'Preset', options: ['Alice', 'Bob', 'Charlie'], default: 'Alice' },
        prompt: { type: 'textarea', label: 'Prompt', required: true, placeholder: 'Good evening everyone! The train to the future is now departing from platform nine and three quarters. Please mind the gap between reality and imagination.' }
      }
    }
  ],
  ollama: [
    {
      id: 'deepseek',
      name: 'DeepSeek R1:8b',
      desc: 'Fast reasoning model',
      price: '$0.0004',
      previewType: 'text',
      preview: 'Aa',
      params: {
        reasoning: { type: 'toggle', label: 'Reasoning', options: ['Enabled', 'Disabled'], default: 'Disabled' },
        prompt: { type: 'textarea', label: 'Prompt', required: true, placeholder: 'Ask me anything...', maxLength: 500 }
      }
    },
    {
      id: 'gpt120b',
      name: 'GPT-OSS:120b',
      desc: 'Large language model',
      price: '$0.0004',
      previewType: 'text',
      preview: 'Aa',
      params: {
        reasoning: { type: 'toggle', label: 'Reasoning', options: ['Low', 'Medium', 'High'], default: 'Low' },
        prompt: { type: 'textarea', label: 'Prompt', required: true, placeholder: 'Ask me anything...', maxLength: 500 }
      }
    },
    {
      id: 'gpt20b',
      name: 'GPT-OSS:20b',
      desc: 'Efficient text generation',
      price: '$0.0004',
      previewType: 'text',
      preview: 'Aa',
      params: {
        reasoning: { type: 'toggle', label: 'Reasoning', options: ['Low', 'Medium', 'High'], default: 'Low' },
        prompt: { type: 'textarea', label: 'Prompt', required: true, placeholder: 'Ask me anything...', maxLength: 500 }
      }
    },
    {
      id: 'llama',
      name: 'Llama 3.2:3b',
      desc: 'Compact & fast',
      price: '$0.00025',
      previewType: 'text',
      preview: 'Aa',
      params: {
        prompt: { type: 'textarea', label: 'Prompt', required: true, placeholder: 'Ask me anything...', maxLength: 500 }
      }
    }
  ],
  vllm: [
    {
      id: 'gpt120b-vllm',
      name: 'GPT-OSS-120b',
      desc: 'High-performance inference',
      price: '$0.0004',
      previewType: 'text',
      preview: 'Aa',
      params: {
        reasoning: { type: 'toggle', label: 'Reasoning', options: ['Low', 'Medium', 'High'], default: 'Low' },
        prompt: { type: 'textarea', label: 'Prompt', required: true, placeholder: 'Ask me anything...', maxLength: 500 }
      }
    }
  ]
};