let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset-btn");
let newgamebtn = document.querySelector("#new-btn");
let msgcontainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;

const winpatterns = [
    [0,1,2], [0,3,6], [0,4,8], [1,4,7],
    [2,5,8], [2,4,6], [3,4,5], [6,7,8]
];
const resetgame = () => {
    turnO = true;
    enableboxes();
    msgcontainer.classList.add("hide");
};
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true; 
        checkWinner();
    });
});
const disableBoxes = () => {
    boxes.forEach(box => box.disabled = true);
};
const enableboxes = () => {
    boxes.forEach(box => {
        box.disabled = false;
        box.innerText = "";
    });
};
const showWinner = (winner) => {
    msg.innerText = ` Congrats, Winner is ${winner}!`;
    msgcontainer.classList.remove("hide");
    disableBoxes();
};
const checkWinner = () => {
    let isDraw = true;   

    for (let pattern of winpatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos1Val === pos2Val && pos2Val === pos3Val) {
            console.log("Winner:", pos1Val);
            showWinner(pos1Val);
            return;
        }
    }
    boxes.forEach(box => {
        if (box.innerText === "") isDraw = false;
    });

    if (isDraw) {
        msg.innerText = " It's a Draw!";
        msgcontainer.classList.remove("hide");
        disableBoxes();
    }
};
newgamebtn.addEventListener("click", resetgame);
resetbtn.addEventListener("click", resetgame);
