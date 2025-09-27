# Video Analyzer - AI-Powered Video Analysis Tool

⚠️ **PROTOTYPE**: This is an experimental prototype developed for educational purposes and has not been fully tested for production use.

**Author**: [Gerd Kortuem](https://www.tudelft.nl/io/over-io/personen/kortuem-g)  
TU Delft, Faculty of Industrial Design Engineering

An intelligent web application that analyzes video content from multiple perspectives using Google's Gemini AI. Extract insights about urban planning, social dynamics, safety, accessibility, and more from any video.

🔗 **Live Demo**: [https://kortuem.github.io/video-analyzer/](https://kortuem.github.io/video-analyzer/)

## About

This application was **fully developed using AI coding assistants** (ChatGPT, Claude, and Google Gemini) as an experimental test to explore AI-driven prototyping capabilities. It serves as a demonstration of how generative AI can be used not just for analysis, but also for the entire development process itself.

The project is part of the **IDEM307 Generative AI And Design** course at TU Delft, Faculty of Industrial Design Engineering, exploring the intersection of AI technology with design practice.

## ⚠️ Disclaimer

This is a **prototype application** intended for educational and experimental purposes. It has not undergone comprehensive testing and may contain bugs or limitations. Use at your own discretion and do not rely on it for critical analysis tasks.

## Features

### 🎥 Video Analysis
- Upload and analyze videos directly in your browser
- Frame-by-frame AI analysis using Google Gemini
- Intelligent scene change detection
- Progress tracking during analysis

### 🔍 Multiple Analysis Perspectives
- **Objective Description**: Factual, unbiased observations
- **Urban Planning**: Infrastructure, traffic flow, and spatial design analysis
- **Social Dynamics**: Group behavior and interpersonal interactions
- **Safety Assessment**: Hazard identification and risk evaluation
- **Accessibility Review**: Barrier detection and inclusive design assessment
- **Creative Fiction**: First-person narrative storytelling

### 🎯 Analysis Modes
- **Isolated Mode**: Each frame analyzed independently
- **Continuous Mode**: Context-aware analysis with frame-to-frame continuity

### 📊 Export & Results
- Comprehensive narrative summaries
- Key event highlights and timestamps
- Export analysis results in multiple formats
- Debug panel for troubleshooting

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Google Gemini API key ([Get one here](https://makersuite.google.com/app/apikey))

### Installation

1. Clone the repository:
```bash
git clone https://github.com/kortuem/video-analyzer.git
cd video-analyzer
```

2. Install dependencies:
```bash
cd video-analyzer
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

5. Enter your Gemini API key when prompted in the app

### Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Usage

1. **Add API Key**: Enter your Google Gemini API key in the banner at the top
2. **Upload Video**: Click "Select Video" or drag and drop a video file
3. **Choose Perspective**: Select an analysis perspective (e.g., Urban Planning, Safety)
4. **Select Mode**: Choose between Isolated or Continuous analysis
5. **Set Interval**: Adjust the frame capture interval (default: 5 seconds)
6. **Start Analysis**: Click "Analyze Video" and wait for results
7. **View Results**: Review the frame-by-frame analysis and narrative summary
8. **Export**: Download your analysis results for further use

## Tech Stack

- **Frontend Framework**: React 19 with Vite
- **Styling**: Tailwind CSS
- **AI Integration**: Google Gemini API
- **State Management**: React Context with useReducer
- **Build Tool**: Vite
- **Development Method**: 100% AI-assisted coding

## Project Structure

```
video-analyzer/
├── src/
│   ├── components/        # React UI components
│   ├── services/          # Core services (AI client, analysis, export)
│   ├── hooks/            # Custom React hooks
│   ├── state/            # State management
│   └── utils/            # Utility functions and perspectives
├── public/               # Static assets
└── dist/                 # Production build (generated)
```

## Configuration

### Environment Variables
Create a `.env.local` file for local development:
```
VITE_GEMINI_API_KEY=your_api_key_here
```

### Analysis Settings
Adjust analysis parameters in `src/services/analysisManager.js`:
- Frame capture intervals
- Change detection thresholds
- Context window sizes

## Known Limitations

As this is a prototype:
- Performance may vary with large video files
- Some edge cases in frame analysis may not be handled
- Browser compatibility has not been fully tested
- API rate limits may affect continuous usage

## Academic Context

This project is part of the **IDEM307 Generative AI And Design** course at TU Delft, Faculty of Industrial Design Engineering. It explores:
- AI-driven rapid prototyping
- The capabilities and limitations of AI coding assistants
- How generative AI can augment both design research and development processes

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Privacy & Security

- API keys are stored locally in your browser
- Videos are processed client-side
- No data is stored on external servers
- All analysis happens through secure HTTPS connections to Google's API

## License

This project is open source and available under the MIT License.

## Acknowledgments

- Developed at TU Delft, Faculty of Industrial Design Engineering
- Part of IDEM307 Generative AI And Design course
- Built entirely with AI coding assistants (ChatGPT, Claude, Google Gemini)
- React and Vite communities
- Tailwind CSS for styling

## Support

For issues, questions, or suggestions, please [open an issue](https://github.com/kortuem/video-analyzer/issues) on GitHub.

---

Made with AI for educational purposes at TU Delft