const listImg = [
    "slider_001.png",
    "slider_002.png",
    "slider_003.png",
    "slider_004.jpg",
    "slider_005.png"
];

var startImg = 0;

document.getElementById("slider__next").addEventListener("click", nextImg);
const listLabel = document.querySelectorAll('.slider-dot-label');

function changeDot(selectDot){
    listLabel[startImg].classList.remove('slider-dot-label--checked');
    listLabel[selectDot].classList.add('slider-dot-label--checked');
    startImg = selectDot;
}

function nextImg() {
    var selectDot = startImg;
    if (selectDot >= listImg.length - 1){
        selectDot = 0;
    }
    else{
        selectDot++;
    }
    changeDot(selectDot);

    var slider = document.querySelector('.slider');
    slider.style.backgroundImage = `none, url('../assets/resources/img/slider/${listImg[startImg]}')`;

}

document.getElementById("slider__previous").addEventListener("click", preImg);

function preImg() {
    var selectDot = startImg;
    if (selectDot <= 0){
        selectDot = listImg.length - 1;
    }
    else{
        selectDot--;
    }
    changeDot(selectDot);

    var slider = document.querySelector('.slider');
    slider.style.backgroundImage = `none, url('../assets/resources/img/slider/${listImg[startImg]}')`;
}

var slider = document.getElementsByName('slides');
for (var dot = 0; dot < slider.length; dot++){
    slider[dot].addEventListener('click', changeImg);
}

function changeImg(){
    var selectDot = this.value;
    changeDot(selectDot);
    
    var slider = document.querySelector('.slider');
    slider.style.backgroundImage = `none, url('../assets/resources/img/slider/${listImg[startImg]}')`;
}