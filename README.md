
# Surprise Prank 🎭📸

A fun surprise prank website built using HTML, CSS, JavaScript, Camera API, EmailJS, and ImgBB API. The application creates suspense using animated text and a countdown, accesses the front camera, captures a photo, uploads it, and sends it automatically via email.

---

## 🚀 Features

- Typing animation for suspense effect
- Surprise themed interface with GIF
- Front camera access using browser Media API
- Countdown timer
- Automatic image capture
- Upload image to ImgBB cloud storage
- Send uploaded image through EmailJS
- Responsive design
- Reset and replay functionality

---

## 🛠 Technologies Used

- HTML5
- CSS3
- JavaScript
- MediaDevices API
- Canvas API
- EmailJS
- ImgBB API

---

## 📂 Project Structure

```bash
project-folder/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

---

## ⚙️ How It Works

### Step 1
Animated text appears:

- Here is something interesting
- about you

### Step 2
User clicks:

```text
Tap Here
```

### Step 3
Browser requests camera permission.

### Step 4
Camera preview opens.

### Step 5
User clicks:

```text
Ok I am ready
```

### Step 6
Countdown starts.

### Step 7
Photo is captured automatically.

### Step 8
Captured image uploads to ImgBB.

### Step 9
EmailJS sends the uploaded image URL.

### Step 10
Application resets.

---

## 🔧 Installation

Clone repository:

```bash
git clone https://github.com/yourusername/repository-name.git
```

Move into project folder:

```bash
cd repository-name
```

Open:

```bash
index.html
```

or run using VS Code Live Server.

---

## 🔑 API Setup

### EmailJS Setup

Initialize EmailJS:

```javascript
emailjs.init("YOUR_PUBLIC_KEY");
```

Send email:

```javascript
emailjs.send(
"YOUR_SERVICE_ID",
"YOUR_TEMPLATE_ID",
templateParams
);
```

---

### ImgBB Setup

Replace API key:

```javascript
formData.append(
"key",
"YOUR_IMGBB_API_KEY"
);
```

---

## 📸 Permissions Required

Browser permission required:

- Camera Access

Without permission, the application cannot continue.

---

## ⚠️ Important Notice

This project is created for educational and learning purposes.

Please respect privacy and obtain proper permission before using camera-related functionality.

---

## 🎯 Concepts Covered

- DOM Manipulation
- Async/Await
- Browser APIs
- Canvas Processing
- API Integration
- Email Automation
- FormData Handling
- Event Driven Programming

---

## 👨‍💻 Author

Kundan Prasad Yadav

Software Engineering Intern Candidate | Java | Python | DSA | Web Development

---

⭐ Give this repository a star if you found it useful.
