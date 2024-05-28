function startGame() {
  let score = 0;
  let life = 15;
  splashScreen.classList.add("hidden");
  playScreen.classList.remove("hidden");

  let main = setInterval(function () {
    let enemy = document.createElement("img");
    enemy.src = "enemy.jpg";
    enemy.className = "enemy";
    enemy.style.left = Math.random() * gameApp.offsetWidth + "px";
    playScreen.appendChild(enemy);

    let key = setInterval(function () {
      enemy.style.top = parseFloat(enemy.style.top || 0) + 2 + "px";
      // Check for collision between missile and enemy
      if (
        missile &&
        missile.offsetTop < enemy.offsetTop + enemy.offsetHeight &&
        missile.offsetTop + missile.offsetHeight > enemy.offsetTop &&
        missile.offsetLeft < enemy.offsetLeft + enemy.offsetWidth &&
        missile.offsetLeft + missile.offsetWidth > enemy.offsetLeft
      ) {
        // Collision detected, remove both missile and enemy
        missile.remove();
        enemy.remove();
        score++;
        scoreBox.innerText = score;
      }

      if (enemy.offsetTop > gameApp.offsetHeight) {
        life--;
        lifeBox.innerText = life;
        // Remove the enemy from the DOM
        enemy.remove();
        clearInterval(key); // Stop the interval for this enemy

        if (life == 0) {
          playScreen.classList.add("hidden");
          gameOverScreen.classList.remove("hidden");
          clearInterval(main);
        }
      }
    }, 80);
  }, 1000);
  let missile;

  document.onkeydown = function (evt) {
    switch (evt.keyCode) {
      case 32:
        missile = document.createElement("img");

        missile.style.left = player.offsetLeft + 20 + "px";
        missile.style.top = player.offsetTop + "px";

        missile.src = "rocket.png";
        missile.className = "missile";
        playScreen.appendChild(missile);

        setInterval(function () {
          missile.style.top = missile.offsetTop - 5 + "px";
        }, 20);
        break;
      case 37:
        player.style.left = player.offsetLeft - 5 + "px";
        break;
      case 38:
        player.style.top = player.offsetTop - 5 + "px";
        break;
      case 39:
        player.style.left = player.offsetLeft + 5 + "px";
        break;
      case 40:
        player.style.top = player.offsetTop + 5 + "px";
        break;
    }
  };
}
