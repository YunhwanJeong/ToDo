const body = document.querySelector("body")

const IMG_Count = 3;


function paintImage(imgNumber) {
  const image = new Image();
  image.src = `images/${imgNumber}.jpg`;
  image.classList.add("bgImage");
  body.appendChild(image);
}

function genRandomNum() {
  const randomNumber = Math.floor(Math.random() * IMG_Count) + 1;
  return randomNumber;
}

function init() {
  const randomNum = genRandomNum();
  paintImage(randomNum);
}

init();

