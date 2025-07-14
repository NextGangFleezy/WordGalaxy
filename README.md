# Word Galaxy: Space Explorer Reading Game

A kid-friendly educational web application designed to help 5-year-old children learn sight words through interactive space-themed mini-games. The application features natural-sounding speech synthesis, progressive difficulty levels, and engaging visual celebrations.

## Features

### 🌟 Progressive Learning System
- **Letter Recognition**: Start with basic alphabet learning across 3 planets
- **Sight Words**: Progress to common reading words with increasing difficulty
- **Sentence Reading**: Advance to complete sentence comprehension
- **Adaptive Difficulty**: Each planet builds on previous skills

### 🎮 Interactive Gameplay
- **Planet Selection**: Choose from 7 different planets with unique themes
- **Star-based Navigation**: Click on star-shaped buttons to select letters/words
- **Progress Tracking**: Visual progress indicators show completion status
- **Celebration Rewards**: Spectacular rocket animations for planet completion

### 🎤 Advanced Voice Features
- **Natural Speech**: High-quality urban American female voice (Samantha)
- **Multiple Speech Modes**: Normal, syllable breakdown, and spell-out options
- **Educational Feedback**: "That is correct, [Letter]" confirmations
- **Pronunciation Guide**: Clear letter names and word pronunciation

### 🚀 Engaging Animations
- **Rocket Celebrations**: 50-second cinematic rocket launch animations
- **Star Field Background**: Twinkling stars and space atmosphere
- **Visual Feedback**: Immediate response to correct/incorrect selections
- **Sound Effects**: Realistic rocket launch sounds and audio feedback

## Planet Progression

### Level 1-3: Letter Recognition
- **Planet Alpha**: Letters A-J
- **Planet Beta**: Letters K-T  
- **Planet Gamma**: Letters U-Z

### Level 4-6: Sight Words
- **Planet Zoom**: Basic sight words (I, me, you, the, etc.)
- **Planet Pop**: Action and size words (run, big, little, etc.)
- **Planet Zing**: Advanced sight words

### Level 7: Sentence Reading
- **Planet Nova**: Complete sentence comprehension

## Technology Stack

### Frontend
- **React 18** with TypeScript for type-safe development
- **Vite** for fast development and optimized builds
- **Tailwind CSS** with custom space-themed styling
- **Radix UI** components for accessible interface elements
- **Wouter** for lightweight client-side routing

### Backend
- **Node.js** with Express.js server
- **TypeScript** with ES modules
- **Drizzle ORM** for database operations
- **PostgreSQL** for data persistence

### Key Libraries
- **TanStack React Query** for server state management
- **Web Speech API** for text-to-speech functionality
- **Lucide React** for icons
- **Framer Motion** for animations

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd word-galaxy
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Copy environment template
cp .env.example .env

# Add your database URL
DATABASE_URL=your_postgresql_database_url
```

4. Set up the database:
```bash
npm run db:push
```

5. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

## Usage

### For Children (Ages 5+)
1. **Start Playing**: Click on any planet to begin learning
2. **Select Letters/Words**: Click on the star buttons to choose answers
3. **Listen to Pronunciation**: The app will speak each letter or word clearly
4. **Progress Through Levels**: Complete planets to unlock new challenges
5. **Celebrate Success**: Enjoy the rocket celebration when completing planets

### For Parents/Teachers
- **Monitor Progress**: Check which planets have been completed
- **Encourage Practice**: Help children repeat difficult letters or words
- **Use Speech Features**: Try different speech modes for varied learning
- **Track Development**: Observe improvement in reading skills over time

## Development

### Project Structure
```
├── client/          # React frontend application
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Main application pages
│   │   ├── hooks/       # Custom React hooks
│   │   └── lib/         # Utility functions and data
├── server/          # Express backend server
├── shared/          # Shared TypeScript schemas
└── docs/           # Documentation files
```

### Key Development Commands
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run db:push      # Apply database changes
npm run db:studio    # Open database studio
```

### Environment Configuration
- **Development**: Hot reload with Vite middleware
- **Production**: Static file serving with Express
- **Database**: PostgreSQL via Drizzle ORM

## Educational Benefits

### Literacy Development
- **Letter Recognition**: Foundation for reading skills
- **Phonetic Awareness**: Understanding letter sounds
- **Sight Word Mastery**: Instant recognition of common words
- **Reading Fluency**: Smooth progression from letters to sentences

### Learning Methodology
- **Spaced Repetition**: Reinforces memory through repeated exposure
- **Immediate Feedback**: Confirms correct answers instantly
- **Positive Reinforcement**: Celebrates success with animations
- **Progressive Difficulty**: Builds confidence through manageable challenges

## Accessibility Features

- **High Contrast Colors**: Easy visibility for all users
- **Large Touch Targets**: Optimized for small fingers
- **Screen Reader Support**: Compatible with assistive technologies
- **Keyboard Navigation**: Full keyboard accessibility
- **Clear Audio**: High-quality speech synthesis

## Browser Support

- **Chrome**: Full support with optimal performance
- **Firefox**: Full support with Web Speech API
- **Safari**: Full support on macOS and iOS
- **Edge**: Full support with modern features

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and test thoroughly
4. Commit your changes: `git commit -m "Add feature description"`
5. Push to the branch: `git push origin feature-name`
6. Submit a pull request

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Support

For support or questions about Word Galaxy, please:
- Check the documentation in the `docs/` folder
- Review the code comments for implementation details
- Contact the development team for technical issues

## Acknowledgments

- Speech synthesis powered by Web Speech API
- UI components based on Radix UI primitives
- Space theme inspired by educational astronomy resources
- Developed with accessibility and child development principles in mind

---

**Word Galaxy** - Making reading fun, one star at a time! 🌟