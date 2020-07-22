let buttons = Array.from(document.querySelectorAll('button:not(.function)'));
let functionButtons = Array.from(document.querySelectorAll('.function'));
let display = document.querySelector('.display');
let historyDisplay = document.querySelector('.history')

let historyValue = null;
let currentOperator = null;

function buildDisplay(e){
    if(display.value == 'CANNOT DIVIDE BY 0'){
        display.value = '';
        historyDisplay.value = '';
        historyValue = null;
        currentOperator = null; 
    }
    if(!display.value.includes('.') || e.target.textContent != '.'){
        display.value += e.target.textContent;
    }
}

function performFunction(e){
    if (e.target.textContent == 'C' || display.value == 'CANNOT DIVIDE BY 0'){
        display.value = '';
        historyDisplay.value = '';
        historyValue = null;
        currentOperator = null;
    } else if (e.target.textContent !== '='){
        updateDisplay(e.target.textContent);
    } else {
        displayFinal()
    }
}

function updateDisplay (operator){
    removeDecimals();
   
    if(display.value != ''){
        if(historyValue === null || currentOperator == null){
            historyDisplay.value = display.value + ' ' + operator;      
            historyValue = display.value;
            currentOperator = operator;
        } else {
            historyValue = calculateInput();
            
            if(historyValue !== 'CANNOT DIVIDE BY 0'){
                historyDisplay.value = historyValue + ' ' + operator;
                currentOperator = operator;  
            } else {
                historyDisplay.value = '';
                historyValue = null;
                currentOperator = null;
                display.value = 'CANNOT DIVIDE BY 0';
                return;
            }         
        }

        display.value = '';
    }
}

function removeDecimals(){
    while(display.value.charAt(display.value.length-1) === '.'){
        display.value = display.value.slice(0, display.value.length - 1);
    }
}

function calculateInput(){
    if (currentOperator === '+'){
        return Number(historyValue) + Number(display.value);
    } else if (currentOperator === '-'){
        return Number(historyValue) - Number(display.value);
    } else if (currentOperator === '*'){
        return Number(historyValue) * Number(display.value);
    } else if (currentOperator === '/'){
        if(display.value == 0){
            historyDisplay.value = '';
            historyValue = null;
            currentOperator = null;
            display.value = 'CANNOT DIVIDE BY 0';
            return 'CANNOT DIVIDE BY 0'
        } else {
            return Number(historyValue) / Number(display.value);
        }        
    }
}

function displayFinal(){
    if(historyValue != null && !historyDisplay.value.includes('=')){
        historyDisplay.value = historyDisplay.value + ' ' + display.value + ' =';
        display.value = calculateInput();
        historyValue = display.value;
        currentOperator = null; 
    }
}

function buttonPress(e){
    const button = document.querySelector(`button[data-key="${e.keyCode}"]`);
    button.click();
}

window.addEventListener('keydown', buttonPress)

buttons.forEach(button => {
    button.addEventListener('click', buildDisplay);
});

functionButtons.forEach(button => {
    button.addEventListener('click', performFunction);
})


