import React, { useCallback } from 'react';
import { UploadCloud, FileText, X } from 'lucide-react';
import { AnalysisRequest } from '../types';

interface InputSectionProps {
  data: Partial<AnalysisRequest>;
  onChange: (updates: Partial<AnalysisRequest>) => void;
  disabled: boolean;
}

export const InputSection: React.FC<InputSectionProps> = ({ data, onChange, disabled }) => {
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onChange({ cvFile: e.target.files[0] });
    }
  };

  const removeFile = () => {
    onChange({ cvFile: undefined });
  };

  return (
    <div className="space-y-6 bg-gray-900 p-6 rounded-xl border border-gray-800 shadow-sm">
      <div>
        <h3 className="text-lg font-medium text-white mb-1">1. Upload CV</h3>
        <p className="text-sm text-gray-400 mb-4">Supports PDF or DOCX (Max 5MB)</p>
        
        {!data.cvFile ? (
          <label className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${disabled ? 'opacity-50 cursor-not-allowed border-gray-700 bg-gray-800' : 'border-gray-700 bg-gray-800/50 hover:bg-gray-800 hover:border-blue-500'}`}>
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <UploadCloud className="w-8 h-8 mb-2 text-gray-400" />
              <p className="text-sm text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
            </div>
            <input 
              type="file" 
              className="hidden" 
              accept=".pdf,.docx" 
              onChange={handleFileChange}
              disabled={disabled}
            />
          </label>
        ) : (
          <div className="flex items-center justify-between p-4 bg-blue-900/20 border border-blue-800 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-900/50 rounded">
                <FileText className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-blue-200">{data.cvFile.name}</p>
                <p className="text-xs text-blue-400">{(data.cvFile.size / 1024).toFixed(1)} KB</p>
              </div>
            </div>
            <button 
              onClick={removeFile}
              disabled={disabled}
              className="p-1 hover:bg-blue-900/50 rounded text-blue-300 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        )}
      </div>

      <div>
        <h3 className="text-lg font-medium text-white mb-1">2. Job Description</h3>
        <p className="text-sm text-gray-400 mb-4">Paste the text of the ad you want to match against.</p>
        <textarea
          value={data.jobDescription || ''}
          onChange={(e) => onChange({ jobDescription: e.target.value })}
          disabled={disabled}
          placeholder="Paste job advertisement here..."
          className="w-full h-40 bg-gray-950 border border-gray-800 text-gray-300 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent p-4 resize-none placeholder-gray-600"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Language</label>
          <select 
            value={data.language}
            onChange={(e) => onChange({ language: e.target.value as any })}
            disabled={disabled}
            className="w-full bg-gray-950 border border-gray-800 text-white text-sm rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          >
            <option value="en">English</option>
            <option value="sv">Svenska</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Tone</label>
          <select 
            value={data.tone}
            onChange={(e) => onChange({ tone: e.target.value as any })}
            disabled={disabled}
            className="w-full bg-gray-950 border border-gray-800 text-white text-sm rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          >
            <option value="formal">Formal</option>
            <option value="casual">Casual</option>
            <option value="creative">Creative</option>
          </select>
        </div>
      </div>
    </div>
  );
};