let boxes = document.querySelectorAll(".box");
      let resetBtn = document.querySelector("#reset-btn");
      let newGameBtn = document.querySelector("#new-btn");
      let msgContainer = document.querySelector(".msg-container");
      let msg = document.querySelector("#msg");
      let turnO = true;
      let count = 0;

      let winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];

      const resetGame = () => {
        turnO = true;
        count = 0;
        enableBoxes();
        msgContainer.classList.add("hide");
      };

      boxes.forEach((box) => {
        box.addEventListener("click", () => {
          if (turnO) {
            box.innerText = "O";
            box.style.color = "#1a237e";
            turnO = false;
          } else {
            box.innerText = "X";
            box.style.color = "#c62828";
            turnO = true;
          }
          box.disabled = true;
          count++;
          checkWinner();
        });
      });

      const disabledBoxes = () => {
        for (let box of boxes) {
          box.disabled = true;
        }
      };

      const enableBoxes = () => {
        for (let box of boxes) {
          box.disabled = false;
          box.innerText = "";
        }
      };

      const showWinner = (winner) => {
        msg.innerText = `Congratulations, Winner is ${winner}`;
        msgContainer.classList.remove("hide");
        disabledBoxes();
        confetti({
          particleCount: 600,
          spread: 250,
          origin: { y: 0.6 },
        });
      };

      const checkWinner = () => {
        for (let pattern of winPatterns) {
          let pos1Val = boxes[pattern[0]].innerText;
          let pos2Val = boxes[pattern[1]].innerText;
          let pos3Val = boxes[pattern[2]].innerText;
          if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
              showWinner(pos1Val);
              return;
            }
          }
        }

        if (count === 9) {
          msg.innerText = "It's a Draw!";
          msgContainer.classList.remove("hide");
          msgContainer.classList.remove("emoji-firework");
        }
      };

      newGameBtn.addEventListener("click", resetGame);
      resetBtn.addEventListener("click", resetGame);
