# 📌 Virtual Assistant Task Manager

## 🚀 Overview
The **Virtual Assistant Task Manager** is an AI-powered task management system that allows users to add tasks, schedule meetings, and retrieve summaries using voice commands. It leverages **speech recognition** and **AI-powered text processing** to provide a seamless and interactive experience.

## 🏗️ Tech Stack
- **Frontend:** React.js,Bootstrap Css
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **AI Processing:** Gemini API
- **Speech Recognition:** Web Speech API

## 🎯 Key Features
### 🎙️ Real-Time Speech Recognition
- Converts spoken commands into text instantly using the **Web Speech API**.
- Provides real-time feedback by displaying recognized text on the screen.

### 🤖 AI-Powered Task Extraction
- Uses **Gemini API** to intelligently analyze speech and extract structured tasks.
- Automatically identifies **tasks, deadlines, and priorities**.

### 📅 Smart Meeting Scheduler
- Extracts meeting details such as **date, time, and attendees**.
- Displays scheduled meetings in a structured **table format**.

### 📜 AI-Generated Meeting Summaries
- Uses **NLP** to generate concise summaries of scheduled meetings.
- Reduces the need to manually scan through notes.

### 🔄 Real-Time Updates
- **React’s state management** ensures instant updates without page refresh.
- Tasks and meetings are dynamically updated in MongoDB.

## 📸 Screenshots
🚀 *Add high-quality screenshots showcasing the UI and features.*

## 🛠️ Installation & Setup
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/your-username/virtual-assistant-task-manager.git
cd virtual-assistant-task-manager
```

### 2️⃣ Install Dependencies
#### Backend:
```sh
cd backend
npm install
```
#### Frontend:
```sh
cd frontend
npm install
```

### 3️⃣ Set Up Environment Variables
Create a `.env` file in the **backend** folder and configure:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
```

### 4️⃣ Run the Application
#### Start Backend Server:
```sh
cd backend
npm start
```
#### Start Frontend Server:
```sh
cd frontend
npm start
```

## 🏆 Challenges & Solutions
### 🔹 Speech Recognition Accuracy
**Challenge:** Handling different accents and variations in speech.
**Solution:** Implemented a **confidence threshold** and an **edit option** for users to refine extracted text.

### 🔹 Intelligent Data Extraction
**Challenge:** Converting unstructured speech into structured tasks and meetings.
**Solution:** Used **Gemini API** to improve context understanding and keyword detection.

### 🔹 UI Readability & Performance
**Challenge:** Ensuring a clean and user-friendly interface.
**Solution:** Used **Bootstrap CSS** for styling and **React state management** for real-time updates.

## 🎯 Future Enhancements
- 🌍 **Multi-Language Support** for better accessibility.
- 📲 **Mobile App Version** for enhanced usability.
- 🔔 **Push Notifications** for task and meeting reminders.
- 📊 **Analytics Dashboard** to track task completion rates.

## 🤝 Contributing
Contributions are welcome! Feel free to **fork** the repo and submit a **pull request**.

## 📜 License
This project is licensed under the **MIT License**.

---
💡 *If you find this project useful, give it a ⭐ on GitHub!*
