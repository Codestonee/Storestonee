import React, { useState } from 'react';
import { Bot, Sparkles, LayoutDashboard, Info } from 'lucide-react';
import { InputSection } from './components/InputSection';
import { ResultsView } from './components/ResultsView';
import { ResultsSkeleton } from './components/ResultsSkeleton';
import { analyzeApplication } from './services/mockApi';
import { AnalysisRequest, AnalysisResult, AnalysisStatus } from './types';

export default function App() {
  const [status, setStatus] = useState<AnalysisStatus>('idle');
  const [error, setError] = useState<string | null>(null);
  const [requestData, setRequestData] = useState<Partial<AnalysisRequest>>({
    language: 'en',
    tone: 'formal',
    jobDescription: ''
  });
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleInputChange = (updates: Partial<AnalysisRequest>) => {
    setRequestData(prev => ({ ...prev, ...updates }));
    if (status === 'error') setStatus('idle');
  };

  const handleAnalyze = async () => {
    if (!requestData.cvFile || !requestData.jobDescription) return;

    setStatus('analyzing');
    setError(null);

    try {
      // Cast is safe because of validation check above
      const result = await analyzeApplication(requestData as AnalysisRequest);
      setResult(result);
      setStatus('complete');
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "An unknown error occurred");
      setStatus('error');
    }
  };

  const isValid = !!(requestData.cvFile && requestData.jobDescription && requestData.jobDescription.length > 20);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 flex flex-col font-sans">
      {/* Header */}
      <header className="bg-gray-900/80 backdrop-blur-md border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Bot className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="font-bold text-xl text-white tracking-tight">Tailor <span className="text-blue-500">2.0</span></h1>
              <p className="text-xs text-gray-500 font-medium">AI CV Optimization</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-400">
            <span className="text-white cursor-pointer hover:text-blue-400 transition-colors">New Analysis</span>
            <span className="cursor-pointer hover:text-white transition-colors">History</span>
            <span className="cursor-pointer hover:text-white transition-colors">Templates</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        
        <div className="grid lg:grid-cols-12 gap-8 h-[calc(100vh-8rem)] min-h-[600px]">
          
          {/* Left Column: Input */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-blue-900/10 border border-blue-900/30 p-4 rounded-lg flex items-start gap-3">
              <Info className="text-blue-400 flex-shrink-0 mt-0.5" size={18} />
              <p className="text-sm text-blue-200 leading-snug">
                Upload your CV and the job ad to get a match score, keyword analysis, and a tailored cover letter.
              </p>
            </div>

            <InputSection 
              data={requestData} 
              onChange={handleInputChange} 
              disabled={status === 'analyzing'} 
            />

            <button
              onClick={handleAnalyze}
              disabled={!isValid || status === 'analyzing'}
              className={`w-full py-4 px-6 rounded-xl font-bold text-white shadow-lg transition-all transform flex items-center justify-center gap-2
                ${!isValid 
                  ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
                  : status === 'analyzing'
                    ? 'bg-blue-700 cursor-wait opacity-90'
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 hover:shadow-blue-900/20 active:scale-[0.98]'
                }
              `}
            >
              {status === 'analyzing' ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white"></div>
                  <span>Optimizing...</span>
                </>
              ) : (
                <>
                  <Sparkles size={20} />
                  <span>Analyze & Match</span>
                </>
              )}
            </button>

            {error && (
              <div className="p-4 bg-red-900/20 border border-red-900/50 rounded-lg text-red-300 text-sm text-center">
                {error}
              </div>
            )}
          </div>

          {/* Right Column: Results */}
          <div className="lg:col-span-7 h-full">
            {status === 'analyzing' ? (
              <ResultsSkeleton />
            ) : result ? (
              <ResultsView result={result} />
            ) : (
              <div className="h-full bg-gray-900/50 border border-gray-800 border-dashed rounded-xl flex flex-col items-center justify-center text-gray-500 p-8 text-center">
                <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mb-6 animate-pulse">
                  <LayoutDashboard size={40} className="opacity-40" />
                </div>
                <h3 className="text-xl font-semibold text-gray-300 mb-2">Ready to Tailor</h3>
                <p className="max-w-md">
                  The AI engine uses TF-IDF and Gemini 1.5 to analyze your compatibility with the job description.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}