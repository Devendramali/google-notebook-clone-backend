# 🧠 NotebookLM Clone – Backend

This is the backend service for the **NotebookLM Clone** web app. It allows users to upload PDF files, extracts their text using `pdf-parse`, and uses Google's **Gemini API** to answer user questions based on the document content.

---

## 🚀 Features

- ✅ Upload and parse PDF files
- ✅ Extract plain text from PDFs
- ✅ Chat with Gemini using context from the uploaded PDF
- ✅ Simple REST API with Express.js

---

## 📁 Project Structure

backend/
├── index.js # Main Express server
├── .env # Environment variables template
├── package.json # Node.js dependencies
├── uploads/ # Temporary folder for PDF uploads

## 📦 Requirements

- Node.js v16 or later
- npm or yarn
- Gemini API Key

---

## 🛠 Setup Instructions


### 1. Clone the repository


```bash
git clone https://github.com/Devendramali/google-notebook-clone-backend.git
cd google-notebook-clone-backend

### 2. Install dependencies

npm install

### 3. Edit .env and add your Gemini API key:

GEMINI_API_KEY=your_gemini_api_key_here

### ▶️ Run the Server

npm start 