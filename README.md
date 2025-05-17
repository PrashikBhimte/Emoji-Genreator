# 🧠 Emoji Prompt Classifier & Image Generator

This project is a full-stack application that takes a sentence as input, classifies it into one of 11 categories (like `cat`, `dog`, `sun`, etc.), and generates a corresponding emoji-style image. The backend is powered by **Flask**, and the frontend is built using **React (Vite)** and **Tailwind CSS**.

---

## 🚀 Live Demo

🌐 **App Link:** [https://emoji-generator-gray.vercel.app/](https://emoji-generator-gray.vercel.app/)

---

## 📁 Folder Structure

```
root/
│
├── client/               # React Frontend (Vite)
│   ├── src/
│   │   ├── Components/
│   │   │   └── ImageGrid.js
│   │   └── App.js
│   └── ...
│
├── server/               # Flask Backend
│   ├── server.py
│   ├── model/
│   │   ├── emoji_classifier_model.pkl
│   │   ├── emoji_vectorizer.pkl
│   │   ├── emoji_text_dataset.json
│   │   └── train_model.py
│   ├── images/
│   │   ├── cat.png
│   │   ├── dog.png
│   │   ├── ...
│   │   └── question_mark.png
│
└── README.md
```

---

## ✨ Features

- 🔤 Text classification using **Logistic Regression** and **TfidfVectorizer**
- 🧠 11-category emoji-style image classification
- 🖼️ Server returns a **64x64 RGB image** in array format
- 🎨 Pixel-by-pixel rendering in React (10px grid)
- 🧾 Prompt history with quick re-submit functionality
- 💅 Clean, responsive **Tailwind CSS** UI

---

## ⚙️ Installation & Usage

### 🔧 1. Clone the Repository

```bash
git clone https://github.com/your-username/emoji-classifier.git
cd emoji-classifier
```

### 🖥️ 2. Backend Setup (Flask)

```bash
cd server
pip install -r requirements.txt
python model/train_model.py  # Optional: Re-train the model
python server.py
```

**Requirements (`requirements.txt`)**:

```
flask
flask-cors
nltk
scikit-learn
pillow
joblib
```

### 🌐 3. Frontend Setup (React + Vite)

```bash
cd client
npm install
npm run dev
```

---

## 📈 Model Training Details

- **Preprocessing**: Lowercasing, tokenization, stopword removal (using `nltk`)
- **Vectorization**: `TfidfVectorizer`
- **Classifier**: `LogisticRegression(max_iter=200)`
- **Dataset**: `emoji_text_dataset.json` with fields:
  ```json
  {
    "text": "A sunny day at the beach.",
    "label": "sun"
  }
  ```

---

## 🖼️ Image Handling

- Each category (e.g., `dog`, `car`, `sun`) has a **64x64 PNG image** stored in `/server/images/`.
- The backend:
  - Loads the image
  - Converts it to an RGB array
  - Sends the array as JSON
- The frontend:
  - Renders the array as a **pixel grid**
  - Each pixel block = 10px × 10px square

---

## 🧪 Example

- **Input**: `"The car is parked outside."`
- **Predicted Class**: `car`
- **Returned Image**: `/images/car.png` → rendered on the UI

---

## 👨‍💻 Author

**Prashik Bhimte**  
🎓 3rd Year B.Tech Computer Science  
🤖 Machine Learning Enthusiast | 🛠️ Backend Developer
