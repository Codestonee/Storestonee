import { AnalysisRequest, AnalysisResult } from '../types';

// This mimics the 'main.py' backend logic described in the prompt
// In a real scenario, this would be a fetch() call to the FastAPI backend
export const analyzeApplication = async (request: AnalysisRequest): Promise<AnalysisResult> => {
  
  // Simulate network latency (2-4 seconds for AI processing)
  await new Promise(resolve => setTimeout(resolve, 3500));

  // Logic to simulate basic validation errors from backend
  if (request.jobDescription.length < 20) {
    throw new Error("Job description is too short for analysis.");
  }

  // Mock Response Data based on prompt description
  // (Combines TF-IDF, Cosine Similarity, and LLM logic simulation)
  return {
    matchScore: 78,
    scoreBreakdown: {
      technical: 85,
      softSkills: 92,
      experience: 60
    },
    summary: "Strong technical background matching the core requirements. However, experience with 'Container Orchestration' and specific Python frameworks is not explicitly emphasized in the current CV.",
    keywordsFound: ["TypeScript", "React", "Tailwind CSS", "Python", "CI/CD"],
    keywordsMissing: ["Docker", "FastAPI", "Pytest", "OWASP"],
    improvements: [
      {
        type: "missing_skill",
        description: "Missing 'Docker' experience",
        suggestion: "Add a section describing your experience with containerization in previous projects."
      },
      {
        type: "phrasing",
        description: "Generic objective statement",
        suggestion: "Replace the generic summary with a targeted profile highlighting your Full Stack Seniority."
      }
    ],
    coverLetter: `
Subject: Application for Senior Full-Stack Engineer

Dear Hiring Manager,

I am writing to express my strong interest in the Senior Full-Stack Engineer position. With extensive experience in ${request.language === 'sv' ? 'utveckling' : 'development'} using TypeScript, React, and Python, I believe I am an excellent match for your team.

My background in building scalable web applications, combined with my proficiency in modern UI libraries like Tailwind CSS and backend frameworks like FastAPI, aligns well with the requirements outlined in your job description.

I am particularly excited about the opportunity to work with AI integration and advanced NLP techniques.

Thank you for considering my application.

Sincerely,
[Your Name]
    `.trim()
  };
};