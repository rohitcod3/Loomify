# Loomify - AI-Powered Video Outreach Platform  

Loomify is a **personalized video outreach tool** that lets you **record, upload, and share** videos instantly. Whether you're a freelancer, agency owner, or business professional, Loomify makes it easy to connect with your audience through AI-enhanced video messaging.  

## 🚀 Features  

- 🎥 **Instant Video Recording** – Record your screen & webcam with a single click  
- ⏳ **Real-time Uploading** – Videos are available instantly after recording  
- 🤖 **AI-Powered Transcription** – Automatically generates video titles, descriptions, and transcripts  
- 🔗 **Easy Sharing** – Generate links or embed videos into emails/websites  
- 📊 **Viewer Tracking** – Get notified when someone watches your video  

## 🛠️ Tech Stack  

- **Frontend:** Next.js, ElectronJS, Tailwind CSS  
- **Backend:** Express.js, WebSockets  
- **Database:** PostgreSQL (Neon) with Prisma ORM  
- **Auth:** Clerk  
- **Storage & Streaming:** AWS S3 + CloudFront  
- **AI Integration:** Whisper AI (Speech-to-Text), OpenAI (Text Summarization), Voiceflow (AI Chatbot)  

## 🏗️ Installation & Setup  

### 1️⃣ Clone the Repo  

```sh  
git clone https://github.com/your-username/loomify.git  
cd loomify  
```

### 2️⃣ Install Dependencies  

```sh  
npm install  
```

### 3️⃣ Set Up Environment Variables  

Create a `.env.local` file and add your keys:  

```ini  
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-clerk-key  
CLERK_SECRET_KEY=your-clerk-secret-key  
DATABASE_URL=your-postgres-url  
AWS_ACCESS_KEY_ID=your-aws-key  
AWS_SECRET_ACCESS_KEY=your-aws-secret  
```

### 4️⃣ Run the App  

#### **For Web (Next.js)**  
```sh  
npm run dev  
```

#### **For Desktop (ElectronJS)**  
```sh  
npm run electron-dev  
```

## 📌 How It Works  

1️⃣ **Sign in with Clerk authentication**  
2️⃣ **Record your screen & webcam**  
3️⃣ **Real-time upload & cloud storage on AWS S3**  
4️⃣ **AI automatically generates video summaries & transcripts**  
5️⃣ **Get a shareable link and track viewer engagement**  

## 🏗️ Roadmap  

🔲 Add AI-powered video enhancements  
🔲 Improve viewer tracking analytics  
🔲 Introduce team collaboration workspaces  
🔲 Implement payment plans with Stripe  

## 📜 License  

This project is licensed under the MIT License.  

---  

Would love your feedback! Drop a ⭐ on the repo if you find it interesting!  

