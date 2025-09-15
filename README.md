# Space Invaders - Multi-Screen HTML5 Game

A comprehensive web application built with HTML5, CSS3, and JavaScript, featuring a multi-screen interface with user authentication, registration system, and a classic Space Invaders arcade game.

## 🎮 Project Overview

This project was developed for the **Web Development Environments** course at **Ben-Gurion University of the Negev**. It demonstrates advanced web development techniques including multi-screen navigation, user authentication, form validation, and interactive game development.

## 👨‍💻 Developer Information

- **Student Name:** Tom Badash
- **Student ID:** 318317526
- **Student Email:** tombadas@post.bgu.ac.il
- **Student Name:** Einav Cohen
- **Student ID:** 206945826
- **Student Email:** einav2@post.bgu.ac.il
- **Course:** Web Development Environments
- **University:** Ben-Gurion University of the Negev
- **Semester:** 2024

## 🚀 Features Implemented

### Core Application Features
- **Multi-Screen Navigation System** - Seamless transitions between different application screens
- **User Registration System** - Comprehensive form with validation
- **User Authentication** - Secure login system with session management
- **Responsive Design** - Optimized for 1366x768 minimum resolution
- **Modal Dialog System** - Professional about modal with multiple close options

### Game Features
- **Space Invaders Gameplay** - Classic arcade-style shooting game
- **Enemy Formation** - 20 enemy ships in 4x5 grid formation
- **Movement System** - Enemies move together left and right, descending when hitting walls
- **Shooting Mechanics** - Player shoots upward, enemies shoot randomly downward
- **Scoring System** - Points based on enemy row (5, 10, 15, 20 points)
- **Lives System** - Three lives with respawn at random bottom position
- **Speed Progression** - Enemies speed up every 5 seconds (max 4 times)
- **Victory Condition** - Destroy all enemy ships to win

### User Interface Features
- **Modern Design** - Gradient backgrounds and smooth animations
- **Professional Layout** - Header, navigation, content, and footer sections
- **Form Validation** - Real-time validation with helpful error messages
- **Message System** - Toast notifications for user feedback
- **Accessibility** - Keyboard navigation and screen reader support

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
- **Username:** `testuser`
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
