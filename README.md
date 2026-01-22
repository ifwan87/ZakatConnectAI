<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# ZakatConnect AI

An intelligent platform connecting Zakat donors with Asnaf recipients, powered by AI-driven assistance and real-time impact tracking.

🌐 **Live MVP Demo:** [https://zakat-connect-ai.vercel.app/](https://zakat-connect-ai.vercel.app/)

## Features

- 🤖 **AI Chatbot** - Gemini-powered assistant for Zakat guidance and support
- 📝 **Asnaf Application Portal** - Easy application submission for those in need
- 👥 **Admin Dashboard** - Manage and review applications efficiently
- 💰 **Donor Portal** - Seamless donation tracking and management
- 📊 **Impact Dashboard** - Real-time analytics and visualization of Zakat distribution
- 🎯 **Eight Asnaf Categories** - Proper classification according to Islamic guidelines

## Tech Stack

- **Frontend:** React 19, TypeScript
- **Build Tool:** Vite
- **UI:** Tailwind CSS
- **Charts:** Recharts
- **AI:** Google Gemini AI
- **Deployment:** Vercel

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Gemini API Key (get one from [Google AI Studio](https://makersuite.google.com/app/apikey))

## Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ifwan87/ZakatConnectAI.git
   cd ZakatConnectAI
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   
   Create a `.env.local` file in the root directory:
   ```bash
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   
   Navigate to `http://localhost:3000`

## Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist/` directory.

## Preview Production Build

```bash
npm run preview
```

## Deployment

This app is configured for easy deployment on Vercel:

1. Push your code to GitHub
2. Import the repository in Vercel
3. Add your `GEMINI_API_KEY` in the Environment Variables section
4. Deploy!

## Project Structure

```
zakatconnect-ai/
├── components/           # React components
│   ├── AdminDashboard.tsx
│   ├── AsnafForm.tsx
│   ├── Chatbot.tsx
│   ├── DonorPortal.tsx
│   ├── ImpactDashboard.tsx
│   └── Sidebar.tsx
├── App.tsx              # Main application component
├── index.tsx            # Application entry point
├── types.ts             # TypeScript type definitions
├── geminiService.ts     # AI integration service
└── vite.config.ts       # Vite configuration

```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT

## Support

For issues or questions, please open an issue on GitHub or contact the maintainer.
