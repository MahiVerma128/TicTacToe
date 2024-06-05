
let boxes = document.querySelectorAll(".box");
let restBtn = document.querySelector(".rest-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector(".msg");
let newGameBtn = document.querySelector(".new-btn");
let main = document.querySelector(".main-cls");

let turnO = true;  // playerO, playerX
let winner = null; // Track the winner

let winPattern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const newGame = () => {
    turnWin();
    enableBoxes();
    msgContainer.classList.add("hide");
    main.classList.remove("remove");
}

const restGame = () => {
    winner= null;
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {

        if (turnO) {  //playerO
            box.innerText = "O";
            turnO = false;
        } else {  //playerX
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;

        checkWinner();
    });
});


const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}

const turnWin = () => {
    if (winner === "O") {
        turnO = true;
    } else if (winner === "X") {
        turnO = false;
    } else {
        turnO = true;  // Default to player O if no winner
    }
}

const showWinner = (winner) => {
    msg.innerText = `Congratulations! Winner is ${winner} `;
    msgContainer.classList.remove("hide");
    main.classList.add("remove");
    disableBoxes();

}


const checkWinner = () => {
    for (let pattern of winPattern) {

        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val == pos2Val && pos2Val == pos3Val) {
                winner = pos1Val;
                showWinner(pos1Val);
                return;
            }
        }
    }

    // Check for draw
    if (Array.from(boxes).every(box => box.innerText !== "")) {
        msg.innerText = "It's a draw!";
        msgContainer.classList.remove("hide");
        main.classList.add("remove");
    }
};

newGameBtn.addEventListener("click", newGame);
restBtn.addEventListener("click", restGame);
