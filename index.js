const pwd = document.querySelector('.pwd');
const pwdLength = document.querySelector('.pwdLength');

const characterLengthBar = document.querySelector('.characterLengthBar');
const characterLengthBarColored = document.createElement('div');
characterLengthBarColored.style.backgroundColor = 'lightgreen';
characterLengthBarColored.style.height = `${characterLengthBar.offsetHeight}px`;
const roundedBar = document.createElement('div');
roundedBar.classList.add('roundedBar');
characterLengthBar.append(characterLengthBarColored, roundedBar);

const pwdStrengthStatus = document.querySelector('.pwdStrengthStatus');

const checkBox1 = document.querySelector('.checkbox1');
const checkBox2 = document.querySelector('.checkbox2');
const checkBox3 = document.querySelector('.checkbox3');
const checkBox4 = document.querySelector('.checkbox4');

const checkBox = [checkBox1, checkBox2, checkBox3, checkBox4];

const box1 = document.querySelectorAll('.box')[0];
const box2 = document.querySelectorAll('.box')[1];
const box3 = document.querySelectorAll('.box')[2];
const box4 = document.querySelectorAll('.box')[3];

const box = [box1, box2, box3, box4];

let characterLengthBarWidth = 0;
let numberOfBoxesChecked;
pwd.addEventListener('keyup', () => {
    pwdValueLength = pwd.value.length;
    checkBoxDisabled();
    numberOfBoxesChecked = 0;
    pwdStrengthStatus.innerHTML = "";
    hideBoxes();
    unpaintBoxes();

    if(pwdValueLength === 0) {
        pwdLength.innerHTML = "";
        characterLengthBarColored.style.width = `0px`;
        return;
    };

    characterLengthBarWidth = characterLengthBar.offsetWidth;

    if(pwdValueLength > 20) {
        pwd.value = pwd.value.slice(0, 20);
        pwdLength.innerHTML = 20;
        characterLengthBarColored.style.width = `${characterLengthBarWidth}px`;
    }else {
        pwdLength.innerHTML = pwdValueLength;
        characterLengthBarColored.style.width = `${ (characterLengthBarWidth/20) * pwdValueLength }px`;
    }
    
    // we will use regular expression here
    const upperCaseLettersPattern = /[A-Z]/;
    const lowerCaseLettersPattern = /[a-z]/;
    const numbersPattern = /[0-9]/;
    const symbolsPattern = /[\~\!\@\#\$\%\^\&\*\(\)\-\_\+\=\[\]\{\}\;\:\'\"\,\<\.\>\/\?]/;

    if(upperCaseLettersPattern.test(pwd.value)) {
        checkBox1.disabled = false;
    }

    if(lowerCaseLettersPattern.test(pwd.value)) {
        checkBox2.disabled = false;
    }

    if(numbersPattern.test(pwd.value)) {
        checkBox3.disabled = false;
    }

    if(symbolsPattern.test(pwd.value)) {
        checkBox4.disabled = false;
    }

    if(!checkBox1.disabled) {
        numberOfBoxesChecked += 1;
    }

    if(!checkBox2.disabled) {
        numberOfBoxesChecked += 1;
    }

    if(!checkBox3.disabled) {
        numberOfBoxesChecked += 1;
    }

    if(!checkBox4.disabled) {
        numberOfBoxesChecked += 1;
    }

    if(numberOfBoxesChecked === 0) {
        pwdStrengthStatus.innerHTML = "";
    }else if(numberOfBoxesChecked === 4) {
        showBoxes();
        if(pwdValueLength >= 10) {
            pwdStrengthStatus.innerHTML = "GOOD";
            paintBoxesForGoodPwd();
        }else if(pwdValueLength >= 8) {
            pwdStrengthStatus.innerHTML = "MEDIUM";
            paintBoxesForMediumPwd();
        }else {
            pwdStrengthStatus.innerHTML = "WEAK";
            paintBoxesForWeakPwd();
        }
    }else if(numberOfBoxesChecked === 3) {
        showBoxes();
        if(pwdValueLength >= 14) {
            pwdStrengthStatus.innerHTML = "GOOD";
            paintBoxesForGoodPwd();
        }else if(pwdValueLength >= 10) {
            pwdStrengthStatus.innerHTML = "MEDIUM";
            paintBoxesForMediumPwd();
        }else {
            pwdStrengthStatus.innerHTML = "WEAK";
            paintBoxesForWeakPwd();
        }
    }else {
        showBoxes();
        pwdStrengthStatus.innerHTML = "WEAK";
        paintBoxesForWeakPwd();
    }

})

window.addEventListener('load', () => {
    characterLengthBarColored.style.width = `0px`;
    checkBoxDisabled();
    pwd.value = "";
})


const checkBoxDisabled = () => {
    for(let i = 0; i < checkBox.length; i++) {
        checkBox[i].disabled = true;
        checkBox[i].checked = false;
    }
}

const hideBoxes = () => {
    for(let k = 0; k < box.length; k++) {
        box[k].style.display = 'none';
    }
}

const showBoxes = () => {
    for(let j = 0; j < box.length; j++) {
        box[j].style.display = 'block';
    }
}

const unpaintBoxes = () => {
    for(let u = 0; u < box.length; u++) {
        box[u].style.backgroundColor = 'transparent';
    }
}

const paintBoxesForWeakPwd = () => {
    box1.style.backgroundColor = 'red';
    box2.style.backgroundColor = 'red';
}

const paintBoxesForMediumPwd = () => {
    box1.style.backgroundColor = 'yellow';
    box2.style.backgroundColor = 'yellow';
    box3.style.backgroundColor = 'yellow';
}

const paintBoxesForGoodPwd = () => {
    box1.style.backgroundColor = 'lightgreen';
    box2.style.backgroundColor = 'lightgreen';
    box3.style.backgroundColor = 'lightgreen';
    box4.style.backgroundColor = 'lightgreen';
}