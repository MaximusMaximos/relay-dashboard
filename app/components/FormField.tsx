import { ParamOption, FormData } from '../../types';

interface FormFieldProps {
  fieldKey: string;
  param: ParamOption;
  formData: FormData;
  setFormData: (data: FormData) => void;
}

export default function FormField({ fieldKey, param, formData, setFormData }: FormFieldProps) {
  const commonClasses = "w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#ffbc36]/40 focus:border-transparent transition-all";
  
  switch (param.type) {
    case 'toggle':
      return (
        <div className="flex gap-2">
          {param.options.map(option => (
            <button
              key={option}
              onClick={() => setFormData({ ...formData, [fieldKey]: option })}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                (formData[fieldKey] || param.default) === option
                  ? 'bg-[#ffbc36] text-[#0c101c]'
                  : 'bg-white/[0.05] text-white/50 hover:bg-white/[0.08]'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      );

    case 'checkbox':
      return (
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            checked={formData[fieldKey] || param.default || false}
            onChange={(e) => setFormData({ ...formData, [fieldKey]: e.target.checked })}
            className="mt-1 w-4 h-4 rounded bg-white/[0.05] border-white/[0.08] text-[#ffbc36] focus:ring-2 focus:ring-[#ffbc36]/40"
          />
          {param.description && (
            <span className="text-xs text-white/50">{param.description}</span>
          )}
        </div>
      );

    case 'image_with_url':
      const uploadMode = formData[`${fieldKey}_mode`] || 'upload';
      const showPreview = formData[`${fieldKey}_show_preview`] !== false;
      const imageUrl = formData[fieldKey];
      return (
        <div>
          <div className="flex gap-2 mb-3">
            <button
              onClick={() => setFormData({ ...formData, [`${fieldKey}_mode`]: 'upload' })}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
                uploadMode === 'upload'
                  ? 'bg-white/[0.08] text-white'
                  : 'bg-white/[0.02] text-white/50 hover:bg-white/[0.05]'
              }`}
            >
              Upload
            </button>
            <button
              onClick={() => setFormData({ ...formData, [`${fieldKey}_mode`]: 'url' })}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
                uploadMode === 'url'
                  ? 'bg-white/[0.08] text-white'
                  : 'bg-white/[0.02] text-white/50 hover:bg-white/[0.05]'
              }`}
            >
              URL
            </button>
          </div>
          {uploadMode === 'upload' ? (
            <div className="border-2 border-dashed border-white/[0.08] rounded-lg p-8 text-center hover:border-white/[0.12] transition-colors cursor-pointer">
              <div className="text-white/20 mb-2">
                <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <div className="text-sm text-white/50 mb-1">Click to upload image</div>
              <div className="text-xs text-white/30">PNG, JPG, WEBP supported</div>
            </div>
          ) : (
            <div>
              <input
                type="text"
                value={imageUrl || ''}
                onChange={(e) => setFormData({ ...formData, [fieldKey]: e.target.value })}
                placeholder="https://example.com/image.jpg"
                className={commonClasses}
              />
              {imageUrl && (
                <div className="mt-3">
                  <button
                    onClick={() => setFormData({ ...formData, [`${fieldKey}_show_preview`]: !showPreview })}
                    className="text-xs text-white/50 hover:text-white/70 mb-2 flex items-center gap-1"
                  >
                    <svg className={`w-3 h-3 transition-transform ${showPreview ? '' : 'rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                    {showPreview ? 'Hide' : 'Show'} preview
                  </button>
                  {showPreview && (
                    <div className="bg-white/[0.02] border border-white/[0.06] rounded-lg p-4 max-w-xs">
                      <img 
                        src={imageUrl} 
                        alt="Preview" 
                        className="w-full rounded"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.parentElement.innerHTML = '<div class="text-xs text-white/30 text-center py-4">Failed to load image</div>';
                        }}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      );

    case 'textarea':
      return (
        <textarea
          value={formData[fieldKey] || ''}
          onChange={(e) => setFormData({ ...formData, [fieldKey]: e.target.value })}
          className={`${commonClasses} resize-none`}
          rows={4}
          placeholder={param.placeholder}
          maxLength={param.maxLength}
        />
      );

    case 'select':
      return (
        <select
          value={formData[fieldKey] || param.default}
          onChange={(e) => setFormData({ ...formData, [fieldKey]: e.target.value })}
          className={`${commonClasses} appearance-none cursor-pointer`}
        >
          {param.options.map(opt => (
            <option key={opt} value={opt} className="bg-[#111727]">{opt}</option>
          ))}
        </select>
      );

    case 'number':
      return (
        <input
          type="number"
          value={formData[fieldKey] || param.default}
          onChange={(e) => setFormData({ ...formData, [fieldKey]: e.target.value })}
          min={param.min}
          max={param.max}
          step={param.step || 1}
          className={commonClasses}
        />
      );

    case 'text':
      return (
        <input
          type="text"
          value={formData[fieldKey] || ''}
          onChange={(e) => setFormData({ ...formData, [fieldKey]: e.target.value })}
          className={commonClasses}
          placeholder={param.placeholder}
        />
      );

    case 'image':
      return (
        <div className="border-2 border-dashed border-white/[0.08] rounded-lg p-8 text-center hover:border-white/[0.15] transition-colors cursor-pointer">
          <div className="text-white/40 mb-2">☁️</div>
          <div className="text-sm text-white/50 mb-1">Click to upload image</div>
          <div className="text-xs text-white/30">PNG, JPG, WEBP supported</div>
        </div>
      );

    default:
      return null;
  }
}
