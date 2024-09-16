const addButton = document.querySelector("#add");
const subtractButton = document.querySelector("#subtract");
const multiplyButton = document.querySelector("#multiply");
const divideButton = document.querySelector("#divide");

const result = document.querySelector("#result");

const showError = (message)=>{
    result.innerText = "Error: " + message;
    result.style.color = "red";
}

const validateInputs = (a,b)=>{
    if(isNaN(a) || isNaN(b)){
        showError("The inputs cannot be empty!\nPlease enter values in both fields.");
        return false;
    }
    return true;
}

addButton.addEventListener("click", (event) => {
    event.preventDefault();
    const a = parseFloat(document.querySelector("#input1").value);
    const b = parseFloat(document.querySelector("#input2").value);

    if(validateInputs(a,b))
    {
        result.innerText = "Result: " + (a+b);
        result.style.color = "green";
    }
});

subtractButton.addEventListener("click", (event) => {
    event.preventDefault();
    const a = parseFloat(document.getElementById("input1").value);
    const b = parseFloat(document.getElementById("input2").value);
    
    if(validateInputs(a,b))
        {
            result.innerText = "Result: " + (a-b);
            result.style.color = "green";
        }
});

multiplyButton.addEventListener("click", (event) => {
    event.preventDefault();
    const a = parseFloat(document.getElementById("input1").value);
    const b = parseFloat(document.getElementById("input2").value);
    
    if(validateInputs(a,b))
        {
            result.innerText = "Result: " + (a*b);
            result.style.color = "green";
        }
});

divideButton.addEventListener("click", (event) => {
    event.preventDefault();
    const a = parseFloat(document.getElementById("input1").value);
    const b = parseFloat(document.getElementById("input2").value);
    
    if(validateInputs(a,b))
        {
            if(b === 0)
            {
                showError("Division by 0 is not allowed!");  
            }
           else
            {
                result.innerText = "Result: " + (a/b);
                result.style.color = "green";
            }
        }
});