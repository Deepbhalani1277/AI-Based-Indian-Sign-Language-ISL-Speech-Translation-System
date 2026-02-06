# ISL Frontend

AI-Based Indian Sign Language (ISL) Speech Translation System - Frontend Application

## Features

- 🎥 Real-time sign language recognition
- 🗣️ Speech-to-sign conversion
- 🤖 AI-powered gesture detection
- 📱 Responsive user interface
- 🔄 WebSocket support for real-time communication

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool
- **React Router** - Navigation
- **Socket.IO** - Real-time communication
- **Web APIs** - Camera & Speech Recognition

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
isl-frontend/
├── public/          # Static assets
├── src/
│   ├── assets/      # Images, icons, styles
│   ├── components/  # React components
│   ├── pages/       # Page components
│   ├── services/    # API & Socket services
│   ├── hooks/       # Custom React hooks
│   └── utils/       # Utility functions
```

## Environment Variables

Create a `.env` file in the root directory:

```
VITE_API_URL=http://localhost:5000
VITE_SOCKET_URL=http://localhost:5000
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## License

MIT
