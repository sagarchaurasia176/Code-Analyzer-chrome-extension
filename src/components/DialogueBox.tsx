import React, { useEffect, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_API_KEY } from '../constant/config';
import { VscLoading } from "react-icons/vsc";
import { indicators } from "../utils/indicator";
import ComplexityPopupBox from "./ComplexityPopupBox";


// Gen-ai configurations 
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const DialogueBox = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [complexity, setComplexity] = useState({ time: "", space: "" });
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const detectLanguage = (code: string): string => {
    // Common language indicators
    let maxScore = 0;
    let detectedLang = "unknown";

    // Loop through each language and its patterns in the indicators object
    Object.keys(indicators).forEach((lang) => {
      const patterns = indicators[lang as keyof typeof indicators];
      const score = patterns.reduce(
        (count: number, pattern: string) =>
          count + (code.includes(pattern) ? 1 : 0),
        0
      );
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
      ".monaco-editor",
      '[role="presentation"]',
      "#editor",
      ".CodeMirror",
    ];

    let editor = null;
    for (const selector of editorSelectors) {
      editor = document.querySelector(selector);
      if (editor) break;
    }
// gemini flash changed
    if (!editor) {
      console.log("Editor not found");
      return "";
    }

    // Try different ways to get code content
    const codeContainer =
      editor.querySelector(".view-lines") ||
      editor.querySelector(".CodeMirror-lines") ||
      editor;

    if (!codeContainer) {
      console.log("Code container not found");
      return "";
    }

    const codeLines = codeContainer.querySelectorAll(
      ".view-line, .CodeMirror-line"
    );
    if (!codeLines.length) {
      console.log("No code lines found");
      return "";
    }

    const code = Array.from(codeLines)
      .map((line) => line.textContent?.trim() || "")
      .filter((line) => line) // Remove empty lines
      .join("\n");

    return code;
  };

  const analyzeCode = async () => {
    try {
      setLoading(true);
      setProgress(0);

      const code = getLeetCodeEditorContent();
      if (!code) {
        setComplexity({
          time: "No code found in editor",
          space: "No code found in editor",
        });
        return;
      }

      // Add a minimum delay for better UX
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const detectedLanguage = detectLanguage(code);
      console.log("Detected language:", detectedLanguage);

      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

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

      // 5. Parse the response with more flexible regex
      const timeMatch = text.match(/Time Complexity:\s*O\([^)]+\)/i);
      const spaceMatch = text.match(/Space Complexity:\s*O\([^)]+\)/i);

      // 6. Update the UI with results
      setComplexity({
        time: timeMatch
          ? timeMatch[0].split(": ")[1].trim()
          : "Unable to determine",
        space: spaceMatch
          ? spaceMatch[0].split(": ")[1].trim()
          : "Unable to determine",
      });
    } catch (error) {
      console.error("Error analyzing code:", error);
      setComplexity({
        time: "Error analyzing code. Please try again.",
        space: "Error analyzing code. Please try again.",
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
      <ComplexityPopupBox
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        complexity={complexity}
        progress={progress}
        loading={loading}
        setLoading={setLoading}
        setProgress={setProgress}
      />
    </div>
  );
};

export default DialogueBox;
