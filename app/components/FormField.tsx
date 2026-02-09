import { FormData } from '../types';

interface FormFieldProps {
  fieldKey: string;
  param: any;
  formData: FormData;
  setFormData: (data: FormData) => void;
}

export default function FormField({ fieldKey, param, formData, setFormData }: FormFieldProps) {
  const value = formData[fieldKey] ?? param.default ?? '';

  const handleChange = (newValue: any) => {
    setFormData({ ...formData, [fieldKey]: newValue });
  };

  // Toggle Button
  if (param.type === 'toggle') {
    return (
      <div className="flex gap-2">
        {param.options?.map((option) => (
          <button
            key={option}
            onClick={() => handleChange(option)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              value === option
                ? 'bg-[#ffbc36] text-[#0c101c]'
                : 'bg-white/[0.05] text-white/60 hover:bg-white/[0.08]'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    );
  }

  // Checkbox
  if (param.type === 'checkbox') {
    return (
      <label className="flex items-start gap-3 cursor-pointer group">
        <div className="relative flex items-center justify-center mt-0.5">
          <input
            type="checkbox"
            checked={!!value}
            onChange={(e) => handleChange(e.target.checked)}
            className="w-5 h-5 rounded border-2 border-white/20 bg-white/[0.05] checked:bg-[#ffbc36] checked:border-[#ffbc36] appearance-none cursor-pointer transition-all"
          />
          {value && (
            <svg className="absolute w-3 h-3 text-[#0c101c] pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
        <div className="flex-1">
          <div className="text-sm text-white/80 group-hover:text-white transition-colors">
            {param.label}
          </div>
          {param.description && (
            <div className="text-xs text-white/40 mt-1">{param.description}</div>
          )}
        </div>
      </label>
    );
  }

  // Image Upload
  if (param.type === 'image') {
    return (
      <div className="space-y-3">
        <div className="flex gap-2">
          <button
            onClick={() => handleChange({ ...value, mode: 'upload' })}
            className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              value?.mode === 'upload'
                ? 'bg-[#ffbc36] text-[#0c101c]'
                : 'bg-white/[0.05] text-white/60 hover:bg-white/[0.08]'
            }`}
          >
            Upload
          </button>
          <button
            onClick={() => handleChange({ ...value, mode: 'url' })}
            className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              value?.mode === 'url'
                ? 'bg-[#ffbc36] text-[#0c101c]'
                : 'bg-white/[0.05] text-white/60 hover:bg-white/[0.08]'
            }`}
          >
            URL
          </button>
        </div>
        {value?.mode === 'upload' ? (
          <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center hover:border-[#ffbc36]/50 transition-all cursor-pointer">
            <div className="text-3xl mb-2">📁</div>
            <div className="text-sm text-white/60">Click or drag image here</div>
          </div>
        ) : (
          <input
            type="text"
            value={value?.url || ''}
            onChange={(e) => handleChange({ ...value, url: e.target.value })}
            placeholder="https://example.com/image.jpg"
            className="w-full px-4 py-2.5 bg-white/[0.05] border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#ffbc36]/40 transition-all"
          />
        )}
      </div>
    );
  }

  // Textarea
  if (param.type === 'textarea') {
    return (
      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          placeholder={param.placeholder}
          rows={4}
          maxLength={param.maxLength}
          className="w-full px-4 py-2.5 bg-white/[0.05] border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#ffbc36]/40 transition-all resize-none"
        />
        {param.maxLength && (
          <div className="absolute bottom-2 right-3 text-xs text-white/30">
            {value.length}/{param.maxLength}
          </div>
        )}
      </div>
    );
  }

  // Select
  if (param.type === 'select') {
    return (
      <select
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        className="w-full px-4 py-2.5 bg-white/[0.05] border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#ffbc36]/40 transition-all cursor-pointer"
      >
        {param.options?.map((option) => (
          <option key={option} value={option} className="bg-[#111727]">
            {option}
          </option>
        ))}
      </select>
    );
  }

  // Number
  if (param.type === 'number') {
    return (
      <input
        type="number"
        value={value}
        onChange={(e) => handleChange(parseFloat(e.target.value))}
        min={param.min}
        max={param.max}
        step={param.step}
        className="w-full px-4 py-2.5 bg-white/[0.05] border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#ffbc36]/40 transition-all"
      />
    );
  }

  // Text (default)
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => handleChange(e.target.value)}
      placeholder={param.placeholder}
      className="w-full px-4 py-2.5 bg-white/[0.05] border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#ffbc36]/40 transition-all"
    />
  );
}