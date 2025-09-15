// Game Engine Class
class GameEngine {
  constructor() {
    this.canvas = document.getElementById("gameCanvas");
    this.ctx = this.canvas.getContext("2d");
    this.gameState = "menu"; // menu, playing, paused, gameOver
    this.score = 0;
    this.lives = 3;
    this.level = 1;
    this.lastTime = 0;
    this.animationId = null;

    // Game objects
    this.player = null;
    this.enemies = [];
    this.playerBullets = [];
    this.enemyBullets = [];
    this.particles = [];

    // Game mechanics
    this.enemyDirection = 1; // 1 for right, -1 for left
    this.enemySpeed = 1;
    this.enemyShootTimer = 0;
    this.lastEnemyShoot = 0;
    this.speedIncreaseTimer = 0;
    this.speedIncreaseCount = 0;
    this.maxSpeedIncreases = 4;

    // Game timer
    this.gameTimeLimit = 5 * 60 * 1000; // 5 minutes in milliseconds
    this.gameStartTime = 0;
    this.timeRemaining = 0;

    // Input handling
    this.keys = {};
    this.setupEventListeners();

    // Initialize game
    this.init();

    // Add background music
    this.backgroundMusic = new Audio("assets/audio/background-sound.wav");
    this.backgroundMusic.loop = true;

    // Add sound for enemy hitting player
    this.enemyHitSound = new Audio("assets/audio/enemy-hit.mp3");

    // Add sound for player hitting enemy
    this.playerHitSound = new Audio("assets/audio/spaceship-hit.mp3");
  }

  init() {
    this.updateUI();
    this.showMenu();
  }

  setupEventListeners() {
    document.addEventListener("keydown", (e) => {
      this.keys[e.code] = true;

      // Player shooting - use configured key
      const shootKey = window.appController
        ? window.appController.gameConfig.shootKey
        : "Space";
      if (e.code === shootKey && this.gameState === "playing") {
        e.preventDefault(); // Prevent default space behavior (page scroll)
        this.playerShoot();
      }
    });

    document.addEventListener("keyup", (e) => {
      this.keys[e.code] = false;
    });

    // Button events
    document.getElementById("startBtn").addEventListener("click", () => {
      this.startGame();
    });

    document.getElementById("pauseBtn").addEventListener("click", () => {
      this.togglePause();
    });

    document.getElementById("restartBtn").addEventListener("click", () => {
      this.restartGame();
    });

    // Exit game button
    document
      .querySelector('[data-screen="welcome"]')
      .addEventListener("click", () => {
        this.stopGame();
      });
  }

  startGame() {
    this.gameState = "playing";
    this.score = 0;
    this.lives = 3;
    this.level = 1;
    this.enemySpeed = 1;
    this.enemyDirection = 1;
    this.enemyShootTimer = 0;
    this.lastEnemyShoot = 0;
    this.speedIncreaseTimer = 0;
    this.speedIncreaseCount = 0;

    // Set game time limit from configuration
    const gameTimeMinutes = window.appController
      ? window.appController.gameConfig.gameTime
      : 5;
    this.gameTimeLimit = gameTimeMinutes * 60 * 1000; // Convert to milliseconds
    this.gameStartTime = Date.now();
    this.timeRemaining = this.gameTimeLimit;

    // Initialize game objects
    this.initializePlayer();
    this.initializeEnemies();
    this.playerBullets = [];
    this.enemyBullets = [];
    this.particles = [];

    this.updateInstructions();
    this.hideOverlay();
    this.startBackgroundMusic();
    this.lastTime = performance.now(); // Fix for slow first game
    this.gameLoop();
  }

  initializePlayer() {
    // Start at random position on bottom border
    const startX = Math.random() * (this.canvas.width - 40);
    const startY = this.canvas.height - 60; // 40% from bottom area
    const playerColor = window.appController
      ? window.appController.gameConfig.playerColor
      : "#4CAF50";
    this.player = new Player(startX, startY, playerColor);
  }

  initializeEnemies() {
    this.enemies = [];
    const enemyWidth = 40;
    const enemyHeight = 30;
    const startX = 50;
    const startY = 50;
    const spacingX = 60;
    const spacingY = 50;
    const enemyColor = window.appController
      ? window.appController.gameConfig.enemyColor
      : "#FF4444";

    // Create 4x5 grid of enemies (4 rows, 5 columns)
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 5; col++) {
        const x = startX + col * spacingX;
        const y = startY + row * spacingY;
        const enemy = new Enemy(x, y, row, enemyColor); // Pass row for scoring and color
        this.enemies.push(enemy);
      }
    }
  }

  playerShoot() {
    if (this.player && this.playerBullets.length < 3) {
      // Limit bullets
      const playerBulletColor = window.appController
        ? window.appController.gameConfig.playerBulletColor
        : "#FFFF00";
      const bullet = new PlayerBullet(
        this.player.x + this.player.width / 2 - 2,
        this.player.y,
        playerBulletColor
      );
      this.playerBullets.push(bullet);
    }
  }

  enemyShoot() {
    if (this.enemies.length === 0) return;

    // Check if enough time has passed since last shot
    const currentTime = Date.now();
    if (currentTime - this.lastEnemyShoot < 1000) return; // 1 second minimum

    // Find a random enemy that can shoot (not blocked by other bullets)
    const availableEnemies = this.enemies.filter((enemy) => {
      // Check if there's already a bullet from this enemy area
      return !this.enemyBullets.some(
        (bullet) =>
          Math.abs(bullet.x - enemy.x) < 20 && bullet.y < enemy.y + 100
      );
    });

    if (availableEnemies.length > 0) {
      const randomEnemy =
        availableEnemies[Math.floor(Math.random() * availableEnemies.length)];
      const enemyBulletColor = window.appController
        ? window.appController.gameConfig.enemyBulletColor
        : "#FF0000";
      const bullet = new EnemyBullet(
        randomEnemy.x + randomEnemy.width / 2 - 2,
        randomEnemy.y + randomEnemy.height,
        enemyBulletColor
      );
      this.enemyBullets.push(bullet);
      this.lastEnemyShoot = currentTime;
    }
  }

  stopGame() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    this.gameState = "menu";
    this.stopBackgroundMusic();
  }

  togglePause() {
    if (this.gameState === "playing") {
      this.gameState = "paused";
      this.showOverlay("Game Paused", "Click Resume to continue");
      this.stopBackgroundMusic(); // Stop music when paused
    } else if (this.gameState === "paused") {
      this.gameState = "playing";
      this.hideOverlay();
      this.startBackgroundMusic(); // Resume music when returning to game
      this.gameLoop();
    }
  }

  gameOverOverlay(title, message) {
    this.stopBackgroundMusic();
    // Save record only if game finished (not restarted)
    if (window.appController && window.appController.isLoggedIn) {
      window.appController.handleGameFinished(this.score);
    }
    // Populate overlay with details
    const overlayTitle = document.getElementById("overlayTitle");
    const overlayMessage = document.getElementById("overlayMessage");
    overlayTitle.textContent = title;
    // Player info
    const playerName =
      window.appController && window.appController.currentUser
        ? window.appController.currentUser.firstname ||
          window.appController.currentUser.username
        : "Player";
    overlayMessage.innerHTML = `${message} <br>Final Score: ${this.score}`;
    // Insert records table into overlay (create if not present)
    let overlayTable = document.getElementById("overlay-records-table");
    if (!overlayTable) {
      const tableContainer = document.createElement("div");
      tableContainer.innerHTML =
        '<h4>Your Records</h4><table id="overlay-records-table" class="records-table"><tr><th>Finish Time</th><th>Score</th></tr></table>';
      document
        .querySelector("#gameOverlay .overlay-content")
        .appendChild(tableContainer);
      overlayTable = document.getElementById("overlay-records-table");
    }
    // Update overlay table using appController
    if (
      window.appController &&
      typeof window.appController.updateRecordsTable === "function"
    ) {
      window.appController.updateRecordsTable();
    }
    // Ensure restart button exists in overlay and is visible
    const restartBtn = document.getElementById("restartBtn");
    restartBtn.style.display = "inline-block";
    restartBtn.onclick = () => {
      this.restartGame();
      this.hideOverlay();
    };
    // Show overlay
    document.getElementById("gameOverlay").classList.remove("hidden");
  }

  gameOver() {
    this.gameState = "gameOver";
    this.gameOverOverlay("Game Over!", "");
  }

  restartGame() {
    this.startGame();
  }

  gameLoop(currentTime = 0) {
    if (this.gameState !== "playing") return;

    const deltaTime = currentTime - this.lastTime;
    this.lastTime = currentTime;

    this.update(deltaTime);
    this.render();

    this.animationId = requestAnimationFrame((time) => this.gameLoop(time));
  }

  update(deltaTime) {
    // Update player
    if (this.player) {
      this.player.update(this.keys, this.canvas.width, this.canvas.height);
    }

    // Update enemies
    this.updateEnemies(deltaTime);

    // Update bullets
    this.updateBullets();

    // Update particles
    this.particles.forEach((particle, index) => {
      particle.update(deltaTime);
      if (particle.life <= 0) {
        this.particles.splice(index, 1);
      }
    });

    // Enemy shooting
    this.enemyShoot();

    // Speed increase every 5 seconds
    this.speedIncreaseTimer += deltaTime;
    if (
      this.speedIncreaseTimer > 5000 &&
      this.speedIncreaseCount < this.maxSpeedIncreases
    ) {
      this.enemySpeed += 0.5;
      this.speedIncreaseCount++;
      this.speedIncreaseTimer = 0;
    }

    // Update game timer only when playing
    if (this.gameState === "playing") {
      this.timeRemaining =
        this.gameTimeLimit - (Date.now() - this.gameStartTime);
      // Check time limit
      if (this.timeRemaining <= 0) {
        this.gameState = "gameOver";
        this.gameOverOverlay("Time's Up!", "Game Over!");
        return;
      }
    }
    // Check win condition
    if (this.enemies.length === 0 && this.gameState === "playing") {
      this.gameState = "gameOver";
      this.gameOverOverlay("Victory!", "You won!");
    }
  }

  updateEnemies(deltaTime) {
    let shouldChangeDirection = false;

    this.enemies.forEach((enemy) => {
      enemy.update(deltaTime, this.enemySpeed, this.enemyDirection);

      // Check if enemy hits the wall
      if (enemy.x <= 0 || enemy.x + enemy.width >= this.canvas.width) {
        shouldChangeDirection = true;
      }
    });

    // Change direction and move down
    if (shouldChangeDirection) {
      this.enemyDirection *= -1;
      this.enemies.forEach((enemy) => {
        enemy.y += 20; // Move down
      });
    }
  }

  updateBullets() {
    // Update player bullets
    for (
      let bulletIndex = this.playerBullets.length - 1;
      bulletIndex >= 0;
      bulletIndex--
    ) {
      const bullet = this.playerBullets[bulletIndex];
      bullet.update();

      // Remove bullets that are off screen
      if (bullet.y < 0) {
        this.playerBullets.splice(bulletIndex, 1);
        continue;
      }

      // Track if a hit occurred
      let hitEnemyIndex = -1;
      let hitEnemy = null;
      for (
        let enemyIndex = this.enemies.length - 1;
        enemyIndex >= 0;
        enemyIndex--
      ) {
        const enemy = this.enemies[enemyIndex];
        if (this.checkCollision(bullet, enemy)) {
          // Add score based on enemy row
          const points = [5, 10, 15, 20][enemy.row];
          this.score += points;

          // Mark for removal and sound
          hitEnemyIndex = enemyIndex;
          hitEnemy = enemy;
          break; // Only one enemy per bullet
        }
      }
      if (hitEnemyIndex !== -1 && hitEnemy) {
        // Play sound effect for player hitting enemy
        console.log("Playing player-hit sound..."); // Debugging log
        this.playerHitSound.currentTime = 0;
        this.playerHitSound.play().catch((error) => {
          console.error("Error playing player-hit sound:", error);
        });

        // Remove bullet and enemy
        this.playerBullets.splice(bulletIndex, 1);
        this.enemies.splice(hitEnemyIndex, 1);

        // Create explosion effect
        this.createExplosion(
          hitEnemy.x + hitEnemy.width / 2,
          hitEnemy.y + hitEnemy.height / 2
        );
      }
    }

    // Update enemy bullets
    this.enemyBullets.forEach((bullet, bulletIndex) => {
      bullet.update();

      // Remove bullets that are off screen
      if (bullet.y > this.canvas.height) {
        this.enemyBullets.splice(bulletIndex, 1);
        return;
      }

      // Check collision with player
      if (this.player && this.checkCollision(bullet, this.player)) {
        this.lives--;
        this.enemyBullets.splice(bulletIndex, 1);
        this.createExplosion(
          this.player.x + this.player.width / 2,
          this.player.y + this.player.height / 2
        );

        // Play sound effect for enemy hitting player
        console.log("Playing enemy-hit sound..."); // Debugging log
        this.enemyHitSound.play().catch((error) => {
          console.error("Error playing enemy-hit sound:", error);
        });

        if (this.lives <= 0) {
          this.gameOver();
          return;
        } else {
          // Reset player position
          this.initializePlayer();
        }
      }
    });
  }

  render() {
    // Draw cover image as canvas background
    const bgImg =
      this.bgImg ||
      (() => {
        const img = new Image();
        img.src = "assets/image/cover.jpg";
        this.bgImg = img;
        return img;
      })();
    if (bgImg.complete) {
      this.ctx.drawImage(bgImg, 0, 0, this.canvas.width, this.canvas.height);
    } else {
      bgImg.onload = () => {
        this.ctx.drawImage(bgImg, 0, 0, this.canvas.width, this.canvas.height);
      };
      // fallback: fill black until loaded
      this.ctx.fillStyle = "#000";
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    // Draw background stars
    this.drawStars();

    // Draw game objects
    if (this.player) {
      this.player.draw(this.ctx);
    }

    this.enemies.forEach((enemy) => enemy.draw(this.ctx));
    this.playerBullets.forEach((bullet) => bullet.draw(this.ctx));
    this.enemyBullets.forEach((bullet) => bullet.draw(this.ctx));
    this.particles.forEach((particle) => particle.draw(this.ctx));

    // Draw speed increase timer
    this.drawSpeedTimer();

    // Update UI every frame for smooth timer
    this.updateUI();
  }

  drawSpeedTimer() {
    const timeLeft = Math.max(0, 5000 - this.speedIncreaseTimer);
    const percentage = timeLeft / 5000;

    this.ctx.fillStyle = "#FF0000";
    this.ctx.font = "20px Arial";
    this.ctx.textAlign = "center";

    const text = `Speed Increase: ${Math.ceil(timeLeft / 1000)}s`;
    this.ctx.fillText(text, this.canvas.width / 2, 30);

    // Draw progress bar
    const barWidth = 200;
    const barHeight = 10;
    const barX = (this.canvas.width - barWidth) / 2;
    const barY = 40;

    this.ctx.fillStyle = "#333";
    this.ctx.fillRect(barX, barY, barWidth, barHeight);

    this.ctx.fillStyle = "#FF0000";
    this.ctx.fillRect(barX, barY, barWidth * percentage, barHeight);
  }

  drawStars() {
    this.ctx.fillStyle = "#FFF";
    for (let i = 0; i < 50; i++) {
      const x = (i * 17) % this.canvas.width;
      const y = (i * 23 + this.score / 10) % this.canvas.height;
      this.ctx.fillRect(x, y, 1, 1);
    }
  }

  checkCollision(obj1, obj2) {
    return (
      obj1.x < obj2.x + obj2.width &&
      obj1.x + obj1.width > obj2.x &&
      obj1.y < obj2.y + obj2.height &&
      obj1.y + obj1.height > obj2.y
    );
  }

  createExplosion(x, y) {
    for (let i = 0; i < 10; i++) {
      this.particles.push(new Particle(x, y, "#FF4444"));
    }
  }

  updateUI() {
    document.getElementById("score").textContent = this.score;
    document.getElementById("lives").textContent = this.lives;
    document.getElementById("level").textContent = this.level;

    // Update timer display
    const minutes = Math.floor(this.timeRemaining / 60000);
    const seconds = Math.floor((this.timeRemaining % 60000) / 1000);
    const timeDisplay = `${minutes}:${seconds.toString().padStart(2, "0")}`;

    // Create or update timer element
    let timerElement = document.getElementById("game-timer");
    if (!timerElement) {
      timerElement = document.createElement("div");
      timerElement.id = "game-timer";
      timerElement.className = "stat";
      timerElement.innerHTML =
        '<span class="label">Time:</span><span id="timer-value">' +
        timeDisplay +
        "</span>";
      document.querySelector(".game-stats").appendChild(timerElement);
    } else {
      document.getElementById("timer-value").textContent = timeDisplay;
    }

    // Change color when time is running low (less than 1 minute)
    if (this.timeRemaining < 60000) {
      timerElement.style.color = "#FF0000";
      timerElement.style.fontWeight = "bold";
    }
  }

  showOverlay(title, message) {
    document.getElementById("overlayTitle").textContent = title;
    document.getElementById("overlayMessage").textContent = message;
    document.getElementById("gameOverlay").classList.remove("hidden");
  }

  hideOverlay() {
    document.getElementById("gameOverlay").classList.add("hidden");
  }

  updateInstructions() {
    // Update shoot key display
    const shootKeyDisplay = document.getElementById("shoot-key-display");
    if (shootKeyDisplay) {
      const shootKey = window.appController
        ? window.appController.gameConfig.shootKey
        : "Space";
      const keyName =
        shootKey === "Space" ? "SPACE" : shootKey.replace("Key", "");
      shootKeyDisplay.textContent = keyName;
    }

    // Update time limit display
    const timeLimitDisplay = document.getElementById("time-limit-display");
    if (timeLimitDisplay) {
      const gameTime = window.appController
        ? window.appController.gameConfig.gameTime
        : 5;
      timeLimitDisplay.textContent = `${gameTime} minutes`;
    }
  }

  showMenu() {
    this.showOverlay(
      "Space Invaders",
      "Click Start Game to begin your mission!"
    );
  }

  startBackgroundMusic() {
    console.log("Starting background music..."); // Debugging log
    this.backgroundMusic.play().catch((error) => {
      console.error("Error playing background music:", error);
    });
  }

  stopBackgroundMusic() {
    console.log("Stopping background music..."); // Debugging log
    this.backgroundMusic.pause();
    this.backgroundMusic.currentTime = 0;
  }
}

// Player Class
class Player {
  constructor(x, y, color = "#4CAF50") {
    this.x = x;
    this.y = y;
    this.width = 40;
    this.height = 30;
    this.speed = 5;
    this.color = color;
  }

  update(keys, canvasWidth, canvasHeight) {
    // Movement
    if (keys["ArrowLeft"] || keys["KeyA"]) {
      this.x -= this.speed;
    }
    if (keys["ArrowRight"] || keys["KeyD"]) {
      this.x += this.speed;
    }
    if (keys["ArrowUp"] || keys["KeyW"]) {
      this.y -= this.speed;
    }
    if (keys["ArrowDown"] || keys["KeyS"]) {
      this.y += this.speed;
    }

    // Keep player within 40% of bottom area
    const bottomLimit = canvasHeight * 0.6; // 40% from bottom
    this.x = Math.max(0, Math.min(canvasWidth - this.width, this.x));
    this.y = Math.max(
      bottomLimit,
      Math.min(canvasHeight - this.height, this.y)
    );
  }

  draw(ctx) {
    // Draw player ship
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.moveTo(this.x + this.width / 2, this.y);
    ctx.lineTo(this.x, this.y + this.height);
    ctx.lineTo(this.x + this.width, this.y + this.height);
    ctx.closePath();
    ctx.fill();

    // Draw cockpit
    ctx.fillStyle = "#FFF";
    ctx.fillRect(this.x + 15, this.y + 5, 10, 10);
  }
}

// Enemy Class
class Enemy {
  constructor(x, y, row, color = "#FF4444") {
    this.x = x;
    this.y = y;
    this.width = 40;
    this.height = 30;
    this.row = row; // 0-3 for scoring
    this.color = color;
  }

  update(deltaTime, speed, direction) {
    this.x += speed * direction;
  }

  draw(ctx) {
    // Draw enemy ship
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);

    // Draw enemy details
    ctx.fillStyle = "#FFF";
    ctx.fillRect(this.x + 5, this.y + 5, 30, 20);
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x + 10, this.y + 10, 20, 10);

    // Draw score value in the middle
    const scoreValues = [20, 15, 10, 5];
    ctx.fillStyle = "#ffffffff";
    ctx.font = "12px David";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(
      scoreValues[this.row],
      this.x + this.width / 2,
      this.y + this.height / 2
    );
  }
}

// Player Bullet Class
class PlayerBullet {
  constructor(x, y, color = "#FFFF00") {
    this.x = x;
    this.y = y;
    this.width = 4;
    this.height = 10;
    this.speed = 8;
    this.color = color;
  }

  update() {
    this.y -= this.speed;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

// Enemy Bullet Class
class EnemyBullet {
  constructor(x, y, color = "#FF0000") {
    this.x = x;
    this.y = y;
    this.width = 4;
    this.height = 10;
    this.speed = 4;
    this.color = color;
  }

  update() {
    this.y += this.speed;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

// Particle Class
class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.vx = (Math.random() - 0.5) * 4;
    this.vy = (Math.random() - 0.5) * 4;
    this.life = 60;
    this.maxLife = 60;
    this.color = color;
    this.size = Math.random() * 3 + 1;
  }

  update(deltaTime) {
    this.x += this.vx;
    this.y += this.vy;
    this.life--;
  }

  draw(ctx) {
    const alpha = this.life / this.maxLife;
    ctx.globalAlpha = alpha;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.size, this.size);
    ctx.globalAlpha = 1;
  }
}

// Initialize game when game screen is shown
let gameEngine = null;

// Function to initialize game when game screen becomes active
function initializeGame() {
  if (!gameEngine) {
    gameEngine = new GameEngine();
  }
}

// Listen for screen changes
document.addEventListener("DOMContentLoaded", () => {
  // Watch for game screen activation
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (
        mutation.type === "attributes" &&
        mutation.attributeName === "class"
      ) {
        const gameScreen = document.getElementById("game-screen");
        if (gameScreen && gameScreen.classList.contains("active")) {
          // Small delay to ensure DOM is ready
          setTimeout(() => {
            initializeGame();
          }, 100);
        }
      }
    });
  });

  const gameScreen = document.getElementById("game-screen");
  if (gameScreen) {
    observer.observe(gameScreen, { attributes: true });
  }
});
