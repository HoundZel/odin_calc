let result = 0;
let storedOperator = "&";

async function input(){
    let value = 0;
    return new Promise((resolve) => {
        const numberButtons  = document.querySelectorAll('button.number');
        const operatorButtons = document.querySelectorAll('button.operator');
        const restartButton = document.querySelector('#restart');
        const clearButton = document.querySelector('#clear');
        const decimalButton = document.querySelector('#decimal');
        const topdisplay = document.querySelector('#top');
        const bottomdisplay = document.querySelector('#bottom');

        let inputtingNumber = true;
        let decimalmode = false;
        let decimalplace = 0;
        
        numberButtons .forEach(button => {
            button.addEventListener("click",(event)=>{
                if (inputtingNumber && decimalmode == false){
                    if (value == 0){
                        value = parseInt(button.value);
                    }else{
                        value = value * 10 + parseInt(button.value);
                    }
                    console.log(value);
                }
                else if (inputtingNumber && decimalmode){
                    value = value + (parseInt(button.value)/(10**(decimalplace+1)));
                    decimalplace++;
                    console.log(value.toFixed(decimalplace));
                }
                bottomdisplay.innerHTML = value.toFixed(decimalplace);
            }, { once: false });
        });

        operatorButtons.forEach(button => {
            button.addEventListener("click",(event)=>{
                decimalmode = false;
                decimalplace = 1;
                inputtingNumber = false;
                bottomdisplay.innerHTML = "<p> </p>";
                resolve([value, button.value]);
            }, { once: true });
        });

        decimalButton.addEventListener("click",(event)=>{
            decimalmode = true;
            bottomdisplay.innerHTML = value.toFixed(decimalplace) + ".";
            //console.log("decimal mode activated");
        });

        clearButton.addEventListener("click",(event)=>{
            value = 0;
            decimalmode = false;
            decimalplace = 0;
            bottomdisplay.innerHTML = " ";
            console.log(value);
        });

        restartButton.addEventListener("click",(event)=>{
            location.reload();
        });
    });
}

//operation functions (WIP)
function add(value){
    result = result + value;
    const topdisplay = document.querySelector('#top');
    topdisplay.innerHTML = "<p>" + result + " " + storedOperator + "</p>"
    console.log("current result: " + result);
    if (storedOperator == "="){
        equals(value,result);
    }else{
        processWithInput()
    }
}

function subtract(value){
    result = result - value;
    const topdisplay = document.querySelector('#top');
    topdisplay.innerHTML = "<p>" + result + " " + storedOperator + "</p>"
    console.log("current result: " + result);
    if (storedOperator == "="){
        equals(value,result);
    }else{
        processWithInput()
    }
}

function multiply(value){
    result = result * value;
    const topdisplay = document.querySelector('#top');
    topdisplay.innerHTML = "<p>" + result + " " + storedOperator + "</p>"
    console.log("current result: " + result);
    if (storedOperator == "="){
        equals(value,result);
    }else{
        processWithInput()
    }
}

function divide(value){
    result = result / value;
    const topdisplay = document.querySelector('#top');
    const bottomdisplay = document.querySelector('#bottom');
    if (isNaN(result)){
        topdisplay.innerHTML = " ";
        bottomdisplay.innerHTML = "<p>你他妈没用脑子吗？</p>";
        console.log("你他妈没用脑子吗？");
        result = 0;
        storedOperator = "&";
        processWithInput()
        return;
    }else{
        topdisplay.innerHTML = "<p>" + result + " " + storedOperator + "</p>"
        console.log("current result: " + result);
    }
    if (storedOperator == "="){
        equals(value,result);
    }else{
        processWithInput()
    }
}

function equals(value){
    console.log("final result: " + result);
    const topdisplay = document.querySelector('#top');
    const bottomdisplay = document.querySelector('#bottom');
    topdisplay.innerHTML = " ";
    bottomdisplay.innerHTML = result.toFixed(3);
    result = 0;
    storedOperator = "&";
    processWithInput()
}

function Start(value){
    result = value;
    const topdisplay = document.querySelector('#top');
    topdisplay.innerHTML = "<p>" + result + " " + storedOperator + "</p>"
    console.log("current result: " + result);
    if (storedOperator == "="){
        equals(value,result);
    }else{
        processWithInput()
    }
}

//main processing function
async function processWithInput() {
    const [value, operator] = await input();
    console.log("current value: " + value);
    console.log("current operator: " + storedOperator);
    switch(storedOperator){
        case "+":
            storedOperator = operator;
            add(value,result);
            break;
        case "-":
            storedOperator = operator;
            subtract(value,result);
            break;
        case "*":
            storedOperator = operator;
            multiply(value,result);
            break;
        case "/":
            storedOperator = operator;
            divide(value,result);
            break;
        case "=":
            storedOperator = operator;
            equals(value,result);
            break;
        case "&":
            storedOperator = operator;
            Start(value,result);
            break;
    }
}
processWithInput();