
# Space Invaders Web Game

An interactive Space Invaders game built with HTML5, CSS3, and JavaScript. Play directly in your browser, enjoy classic arcade gameplay, and customize your experience!

## 🎮 Game Overview

This project is a modern take on the classic Space Invaders game, developed for the Web Development Environments course at Ben-Gurion University of the Negev. It features smooth gameplay, responsive design, and a simple user interface.

## 👨‍💻 Developers
...existing code...


## 🚀 Features

- Classic Space Invaders gameplay
- 20 enemy ships in a 4x5 grid formation
- Player spaceship with movement and shooting
- Enemy movement and shooting mechanics
- Scoring system based on enemy row
- Three lives system with respawn
- Speed progression for enemies
- Victory and game over conditions
- Responsive design for desktop screens
- Sound effects for hits and background

## 🗂️ Project Structure

```
├── index.html         # Main HTML file
├── styles.css         # Game and UI styling
├── game.js            # Game logic and mechanics
├── assets/
│   ├── image/
│   │   └── cover.jpg  # Game cover image
│   └── audio/
│       ├── background-sound.wav
│       ├── enemy-hit.mp3
│       └── spaceship-hit.mp3
└── README.md          # Project documentation
```

## 🕹️ How to Play

1. Open `index.html` in your browser.
2. Use arrow keys or WASD to move your spaceship (bottom of the screen).
3. Press spacebar to shoot upward.
4. Destroy all enemy ships to win.
5. Avoid enemy bullets and try to keep your lives.
6. Score points based on which row of enemies you hit.

## 🎨 Customization

- Change player, enemy, and bullet colors in the configuration screen (if available).
- Game sounds can be toggled on/off.

## 🔊 Assets

- All images and sounds are located in the `assets/` folder.
  - `image/cover.jpg`: Game cover
  - `audio/background-sound.wav`: Background music
  - `audio/enemy-hit.mp3`: Enemy hit sound
  - `audio/spaceship-hit.mp3`: Spaceship hit sound

## 🛠️ Technologies Used

- HTML5 (Canvas)
- CSS3
- JavaScript (ES6)

## 📄 License

This project is for educational purposes as part of the Web Development Environments course at Ben-Gurion University of the Negev.

---

Enjoy playing Space Invaders! 🚀

## 🛠️ Technical Implementation

### Technologies Used
- **HTML5** - Semantic markup and canvas for game rendering
- **CSS3** - Modern styling with gradients, animations, and responsive design
- **JavaScript (ES6+)** - Game engine, user authentication, and DOM manipulation
- **jQuery** - DOM manipulation and modal functionality

### Architecture
- **Modular Design** - Separate files for different functionalities
- **Class-Based Structure** - Object-oriented programming approach
- **Event-Driven Architecture** - Responsive user interactions
- **State Management** - Proper handling of application and game states

## 📱 Screen Structure

### 1. Welcome Screen
- **Logo and branding** with student information
- **Navigation buttons** to registration and login
- **External links** to developer profiles
- **Professional presentation** of project details

### 2. Registration Screen
- **Comprehensive form** with all required fields:
  - Username and password
  - Password confirmation
  - First and last name
  - Email address
  - Date of birth (dropdown selectors)
- **Real-time validation** with specific error messages
- **Password requirements** (8+ characters, letters + numbers)
- **Name validation** (no numbers allowed)
- **Email format validation**

### 3. Login Screen
- **Simple authentication** form
- **Pre-configured test user** (username: `testuser`, password: `testuser`)
- **Error handling** for invalid credentials
- **Automatic navigation** to configuration screen after successful login

### 4. Configuration Screen
- **Customizable shoot key** - Choose from all letter keys + space
- **Game time setting** - Minimum 2 minutes, maximum 30 minutes
- **Visual customization** - Player ship, enemy ship, and bullet colors
- **Start game button** - Navigate to game with selected settings

### 5. Game Screen
- **Full-screen game experience**
- **Game statistics** display (score, lives, level, time remaining)
- **Game controls** (start, pause, exit)
- **Canvas-based rendering** with smooth animations
- **Responsive design** that adapts to different screen sizes
- **Customizable controls** and visual settings from configuration

## 🔐 Authentication System

### User Management
- **In-memory user database** with test user pre-configured
- **Registration validation** with comprehensive checks
- **Login authentication** with secure credential verification
- **Session management** for logged-in users

### Security Features
- **Password strength requirements**
- **Input sanitization** and validation
- **Protected game access** (login required)
- **Form validation** on both client and server side

## 🎯 Game Mechanics

### Player Controls
- **Arrow Keys** - Primary movement controls
- **WASD Keys** - Alternative movement controls
- **Customizable Shoot Key** - Configurable from all letter keys + space
- **Movement restriction** - Player can only move in bottom 40% of screen

### Gameplay Elements
- **Player Ship** - Triangular spaceship at bottom of screen
- **Enemy Ships** - 20 red enemy ships in 4x5 formation
- **Bullets** - Yellow player bullets, red enemy bullets
- **Particle Effects** - Explosion effects when ships are destroyed

### Scoring System
- **Bottom row enemies** - 5 points each
- **Third row enemies** - 10 points each
- **Second row enemies** - 15 points each
- **Top row enemies** - 20 points each
- **Lives system** - 3 lives with respawn at random position
- **Time limit** - Configurable game duration (2-30 minutes)

## 🎨 Design Features

### Visual Design
- **Modern gradient backgrounds** with professional color scheme
- **Smooth animations** and hover effects
- **Consistent typography** and spacing
- **Professional button styling** with gradients

### Responsive Design
- **Minimum resolution** support (1366x768)
- **Mobile-friendly** layout adaptations
- **Flexible grid system** for different screen sizes
- **Touch-friendly** interface elements

## 📋 Form Validation

### Registration Validation
- **Required field checking** for all inputs
- **Password strength** (minimum 8 characters, letters + numbers)
- **Password confirmation** matching
- **Name validation** (no numeric characters)
- **Email format** validation
- **Username uniqueness** checking

### User Feedback
- **Real-time validation** messages
- **Success notifications** for completed actions
- **Error messages** with specific guidance
- **Auto-dismissing** toast notifications

## 🔧 Installation and Usage

### Prerequisites
- Modern web browser (Chrome recommended)
- Minimum screen resolution: 1366x768
- JavaScript enabled

### Running the Application
1. **Download** all project files
2. **Open** `index.html` in a web browser
3. **Navigate** through the screens using the menu
4. **Register** a new account or use the test user
5. **Login** to access the game
6. **Enjoy** the gaming experience!

### Test User Credentials
- **Username:** `p`
- **Password:** `testuser`

## 🎮 How to Play

1. **Login** with your credentials or use the test user
2. **Configure your game** - Choose shoot key, game time, and colors
3. **Start the game** by clicking the "Start Game" button
4. **Move your spaceship** using arrow keys or WASD (restricted to bottom 40% of screen)
5. **Shoot enemy ships** using your configured shoot key
6. **Avoid enemy bullets** to preserve your lives
7. **Destroy all enemies** before time runs out to win
8. **Watch the speed timer** - enemies speed up every 5 seconds
9. **Monitor the countdown** - game ends when time runs out
10. **Try to achieve** the highest score possible!

## 🔍 Technical Challenges and Solutions

### Challenges Faced
1. **Enemy Movement Coordination** - Synchronizing 20 enemies to move together and change direction
2. **Shooting Mechanics** - Implementing realistic enemy shooting patterns and collision detection
3. **Speed Progression** - Balancing difficulty increase while maintaining playability
4. **Collision Detection** - Accurate hit detection between bullets and ships
5. **Game Balance** - Creating fair scoring system and difficulty progression
6. **Canvas Performance** - Optimized game loop for smooth 60fps gameplay
7. **Form Validation** - Implemented comprehensive client-side validation
8. **Responsive Design** - Ensured proper layout across different screen sizes
9. **State Management** - Managed user authentication and game state
10. **Modal Implementation** - Created accessible modal dialogs with proper event handling
11. **Team Collaboration** - Coordinated development between two team members
12. **Code Integration** - Merging different development approaches and coding styles

### Solutions Implemented
- **Synchronized Enemy Movement** - Coordinated movement system with direction changes
- **Advanced Shooting System** - Realistic enemy shooting patterns with timing controls
- **Progressive Difficulty** - Balanced speed increases with visual timer
- **Precise Collision Detection** - Accurate hit detection for bullets and ships
- **Dynamic Scoring System** - Row-based scoring with visual feedback
- **RequestAnimationFrame** for optimal game performance
- **Regular expressions** for robust form validation
- **CSS Grid and Flexbox** for responsive layouts
- **Class-based architecture** for clean state management
- **jQuery integration** for enhanced modal functionality
- **Version control** for collaborative development
- **Code review process** for quality assurance

## 📚 Code Organization

### File Structure
```
├── index.html          # Main HTML file with all screens
├── styles.css          # Complete CSS styling
├── app.js             # Main application controller
├── game.js            # Game engine and mechanics
└── README.md          # Project documentation
```

### Key Classes
- **AppController** - Main application logic and navigation
- **GameEngine** - Game loop and state management
- **Player** - Player character and movement
- **Enemy** - Enemy objects and behavior
- **Collectible** - Collectible items and effects
- **Particle** - Visual effects system

## 👥 Team Collaboration

This project was developed as a collaborative effort between two students:

### Tom Badash (318317526)
- **Role:** Primary developer and project coordinator
- **Email:** tombadas@post.bgu.ac.il
- **Contributions:** Game engine development, UI/UX design, form validation

### Einav Cohen (206945826)
- **Role:** Co-developer and testing specialist
- **Email:** einav2@post.bgu.ac.il
- **Contributions:** Multi-screen navigation, authentication system, documentation

## 🎯 Browser Compatibility

- **Chrome** (Recommended) - Full feature support
- **Firefox** - Compatible with all features
- **Safari** - Compatible with all features
- **Edge** - Compatible with all features

## 🔮 Future Enhancements

- **Sound effects** and background music
- **High score system** with local storage
- **Multiple game modes** and difficulty levels
- **Power-ups** and special abilities
- **Multiplayer support** for competitive gameplay

## 📄 License

This project is developed for educational purposes as part of the Web Development Environments course at Ben-Gurion University of the Negev.

---

**Enjoy playing Adventure Quest!** 🚀⭐
