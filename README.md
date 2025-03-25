# code-Analyzer Chrome Extension

## Overview

The **(Code-Analyzer) Chrome Extension** is designed to help developers optimize their algorithms by providing instant insights into time and space complexity. Whether you are browsing coding platforms, reviewing code snippets, or working on your own projects, this extension simplifies complexity analysis, allowing you to write more efficient and optimized code.

With its seamless integration into the browser, Code-Analyzer empowers developers, students, and coding enthusiasts to analyze their code on the go without needing external tools. The extension leverages **Gemini AI** to predict and provide detailed complexity analysis, making it a powerful assistant for algorithmic efficiency.

---

## Features

### 🔹 **Time Complexity Analysis**
- Automatically detects and evaluates the time complexity of algorithms.
- Displays results in **Big-O notation**.
- Helps identify potential performance bottlenecks in your code.

### 🔹 **Space Complexity Analysis**
- Estimates the memory usage of your code.
- Provides insights into how efficiently data structures are used.

### 🔹 **Real-Time Analysis**
- Works directly in the Chrome browser, making it easy to analyze code while browsing online.
- Supports integration with popular coding platforms like **LeetCode, Codeforces, GeeksforGeeks, and GitHub**.

### 🔹 **AI-Powered Optimization**
- Uses **Gemini AI** to provide more accurate predictions and suggestions for improving algorithmic efficiency.
- Highlights alternative approaches to optimize your code.

### 🔹 **User-Friendly Interface**
- Clean and intuitive design.
- Quick installation and easy access directly from the browser toolbar.

### 🔹 **Secure Authentication & Cloud Storage**
- Utilizes **Firebase Authentication** for secure sign-in.
- Saves analysis history in a **Firebase database** for future reference.

---

## Tech Stack

- **Frontend:** TypeScript, Tailwind CSS, and other CSS libraries
- **Backend:** NodeJs , ExpressJs
- **Authentication & Database:** Firebase + Mongo db
- **AI Integration:** Gemini AI
- **Build Tool:** Parcel for efficient bundling
- **Browser Compatibility:** Optimized for Chrome

---

## Why Use Code-Analyzer?

✅ **Boost Coding Productivity:** Get real-time complexity analysis while coding.
✅ **Improve Algorithm Efficiency:** Identify bottlenecks and optimize your code with AI-driven suggestions.
✅ **Perfect for Competitive Programmers & Developers:** Analyze problems and solutions instantly without manual calculations.
✅ **Seamless Integration:** Works effortlessly on online coding platforms and GitHub repositories.
✅ **Easy to Use:** One-click access to analyze code on any website.

---

## Installation & Usage

### Step 1: Clone the Repository
```
git clone https://github.com/sagarchaurasia176/Analyzer-chrome-extension
cd Analyzer-chrome-extension
```

### Step 2: Install Dependencies
```
pnpm install
```

### Step 3: Build the Extension using Parcel
```
pnpm build
```


### Step 3: To run Project Type,
```
pnpm start
```


### Step 3: Make Sure to Create .parcelrc (copy and paste in your file)
```
{
  "extends": "@parcel/config-webextension",
  "transformers": {
    "*.{js,mjs,jsx,cjs,ts,tsx}": [
      "@parcel/transformer-js",
      "@parcel/transformer-react-refresh-wrap"
    ]
  },
  "namers": ["@parcel/namer-default"],
  "packagers": {
    "*.html": "@parcel/packager-html",
    "*.js": "@parcel/packager-js",
    "*.css": "@parcel/packager-css"
  },
  "optimizers": {
    "*.js": ["@parcel/optimizer-terser"]
  },
  "reporters": ["...", "parcel-reporter-static-files-copy"]
}
```



### Step 4: Load the Extension in Chrome
1. Open **chrome://extensions/** in your Chrome browser.
2. Enable **Developer mode** (toggle switch at the top right).
3. Click **Load unpacked** and select the `dist` folder inside the cloned repository.
4. The extension should now be available in your browser toolbar.

---

## Screenshots

![Screenshot 2025-02-14 124310](https://github.com/user-attachments/assets/ada732a5-f273-4f89-be3c-f9e9e22ae5b0)
![Screenshot 2025-02-18 005549](https://github.com/user-attachments/assets/db459fc4-0da7-45f2-8aa9-f8671c98df8b)
![Screenshot 2025-02-16![Screenshot 2025-02-18 015532](https://github.com/user-attachments/assets/a417cb13-8a45-4517-b56d-6c98d5f7deca)
![Screenshot 2025-02-18 015532](https://github.com/user-attachments/assets/19e8e3e9-667c-4d57-b7c4-6dd22eda670c)
![Screenshot 2025-03-16 000705](https://github.com/user-attachments/assets/61e87a79-5749-4b9c-8a79-88792295d1ce)
![Screenshot 2025-03-12 111713](https://github.com/user-attachments/assets/f31b5827-511a-479b-b2d9-3dc39e341262)


---


## Contribute

We welcome contributions! If you have ideas for improvements or want to report bugs, feel free to check out the project repository and contribute to its development.
---

With **Code-Analyzer**, optimizing algorithms has never been easier. Whether you're a beginner learning data structures or a seasoned developer working on performance-critical applications, this extension is the perfect tool to refine your code efficiently!

