import React, { useEffect, useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { GEMINI_API_KEY } from '../constant/config';
import { VscLoading } from "react-icons/vsc";


const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const DialogueBox = ({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const [complexity, setComplexity] = useState({ time: '', space: '' });
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const detectLanguage = (code: string): string => {
    // Common language indicators
    const indicators = {
      python: ['def ', 'import ', 'print(', ':#', 'class ', 'if __name__'],
      javascript: ['function', 'const ', 'let ', '=>', 'console.log', 'var '],
      java: ['public class', 'private ', 'System.out.println', 'void ', 'public static'],
      cpp: ['#include', 'cout<<', 'int main()', '::', 'std::'],
      typescript: ['interface ', 'type ', ':string', ':number', ':boolean'],
      ruby: ['def ', 'end', 'puts ', 'require ', '@'],
      go: ['func ', 'package ', 'import (', 'fmt.', ':='],
    };

    let maxScore = 0;
    let detectedLang = 'unknown';

    // Loop through each language and its patterns in the indicators object
    Object.keys(indicators).forEach((lang) => {
      const patterns = indicators[lang as keyof typeof indicators];
      const score = patterns.reduce((count: number, pattern: string) =>
        count + (code.includes(pattern) ? 1 : 0), 0);

      if (score > maxScore) {
        maxScore = score;
        detectedLang = lang;
      }
    });

    // Return the language with the most matching patterns
    return detectedLang;
  };

  const getLeetCodeEditorContent = () => {
    // Try multiple selector patterns used by LeetCode
    const editorSelectors = [
      '.monaco-editor',
      '[role="presentation"]',
      '#editor',
      '.CodeMirror'
    ];

    let editor = null;
    for (const selector of editorSelectors) {
      editor = document.querySelector(selector);
      if (editor) break;
    }

    if (!editor) {
      console.log('Editor not found');
      return '';
    }

    // Try different ways to get code content
    const codeContainer = editor.querySelector('.view-lines') ||
      editor.querySelector('.CodeMirror-lines') ||
      editor;

    if (!codeContainer) {
      console.log('Code container not found');
      return '';
    }

    const codeLines = codeContainer.querySelectorAll('.view-line, .CodeMirror-line');
    if (!codeLines.length) {
      console.log('No code lines found');
      return '';
    }

    const code = Array.from(codeLines)
      .map(line => line.textContent?.trim() || '')
      .filter(line => line) // Remove empty lines
      .join('\n');

    return code;
  };

  const analyzeCode = async () => {
    try {
      setLoading(true);
      setProgress(0);

      const code = getLeetCodeEditorContent();
      if (!code) {
        setComplexity({
          time: 'No code found in editor',
          space: 'No code found in editor'
        });
        return;
      }

      // Add a minimum delay for better UX
      await new Promise(resolve => setTimeout(resolve, 1000));

      const detectedLanguage = detectLanguage(code);
      console.log('Detected language:', detectedLanguage);

      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

      // 3. Create the prompt for analysis
      const prompt = `
       Analyze the following code and determine its time and space complexity.
        Provide a clear and detailed explanation.
        Return the response in this exact format:
        also check carefully if any code is written 15 lines or more then you can run 
        otherwise just type [Not enough code to analyze]
        Time Complexity: O(...)
        Space Complexity: O(...)
        Code:
        ${code}
        Language: ${detectedLanguage}
      `;

      // 4. Get analysis from Gemini
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      console.log('AI Response:', text); // Debug log

      // 5. Parse the response with more flexible regex
      const timeMatch = text.match(/Time Complexity:\s*O\([^)]+\)/i);
      const spaceMatch = text.match(/Space Complexity:\s*O\([^)]+\)/i);

      // 6. Update the UI with results
      setComplexity({
        time: timeMatch ? timeMatch[0].split(': ')[1].trim() : 'Unable to determine',
        space: spaceMatch ? spaceMatch[0].split(': ')[1].trim() : 'Unable to determine'
      });

    } catch (error) {
      console.error('Error analyzing code:', error);
      setComplexity({
        time: 'Error analyzing code. Please try again.',
        space: 'Error analyzing code. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      // Add a small delay to ensure DOM is ready
      setTimeout(() => {
        analyzeCode();
      }, 500);
    }
  }, [isOpen]);

  useEffect(() => {
    if (loading) {
      // Simulate progress
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) return prev; // Cap at 90% until actual completion
          return prev + 10;
        });
      }, 500);

      return () => clearInterval(interval);
    } else {
      setProgress(100); // Complete the progress when loading is done
    }
  }, [loading]);

  if (!isOpen) return null;

  return (
    <div>
      <div style={{
        position: "fixed",
        right: "20px",
        bottom: "calc(20% + 60px)",
        width: "390px",
        background: "linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%)",
        borderRadius: "12px",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
        border: "1px solid rgba(255, 255, 255, 0.18)",
        padding: "16px",
        zIndex: 1000,
        animation: "slideIn 0.3s ease-out",
        opacity: isOpen ? 1 : 0,
        transform: isOpen ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        backdropFilter: "blur(4px)",
      }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "12px",
          background: "linear-gradient(90deg, #f3f4f6 0%, #fff 100%)",
          padding: "8px",
          borderRadius: "8px",
        }}>
          <h5 style={{
            margin: 0,
            fontSize: "18px",
            fontWeight: "600",
            color: "#2d3748",
            textAlign: "center",
            borderBottom: "2px solid #4a5568",
            animation: "fadeIn 0.5s ease-in",
            background: "linear-gradient(45deg, #2d3748, #4a5568)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            padding: "4px 0"
          }}>
            <b>
              AI-Powered Code Analysis in Action!
            </b>
          </h5>
        </div>
        <div style={{
          maxHeight: "400px",
          overflowY: "auto",
          animation: "fadeIn 0.5s ease-in",
          background: "rgba(255, 255, 255, 0.9)",
          padding: "12px",
          borderRadius: "8px",
          boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.05)"
        }}>
          {loading ? (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '20px',
              gap: '15px'
            }}>
              <div style={{
                width: '100%',
                height: '4px',
                background: '#e2e8f0',
                borderRadius: '2px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${progress}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #3b82f6, #2563eb)',
                  transition: 'width 0.5s ease-out',
                  borderRadius: '2px'
                }} />
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <VscLoading className="spin-animation"
                  style={{
                    color: '#3b82f6',
                    fontSize: '24px'
                  }}
                />
                <span style={{
                  color: '#1f2937',
                  fontSize: '16px',
                  fontFamily: 'system-ui',
                  fontWeight: '500'
                }}>
                  Analyzing your code...
                </span>
              </div>
            </div>
          ) : (
            <span style={{
              fontSize: "16px",
              lineHeight: "1.5",
              color: "#2d3748",
              display: "block",
              padding: "8px",
              background: "linear-gradient(135deg, #fff 0%, #f7fafc 100%)",
              borderRadius: "6px",
              border: "1px solid #e2e8f0"
            }}>
              <b style={{
                display: "block",
                marginBottom: "8px",
                color: "#2d3748",
              }}>Time Complexity: {complexity.time}</b>
              <b style={{
                display: "block",
                color: "#2d3748"
              }}>Space Complexity: {complexity.space}</b>
            </span>
          )}
        </div>
      </div>
      <style>
        {`
            @keyframes slideIn {
              from {
                opacity: 0;
                transform: translateY(40px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            
            @keyframes fadeIn {
              from {
                opacity: 0;
              }
              to {
                opacity: 1;
              }
            }
            
            @keyframes slideUp {
              from {
                opacity: 0;
                transform: translateY(20px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            
            @keyframes pulse {
              0% {
                opacity: 1;
              }
              50% {
                opacity: 0.7;
              }
              100% {
                opacity: 1;
              }
            }
            
            @keyframes spin {
              from {
                transform: rotate(0deg);
              }
              to {
                transform: rotate(360deg);
              }
            }
            
            .spin-animation {
              animation: spin 1s linear infinite;
            }
          `}
      </style>
    </div>
  )
}

export default DialogueBox
