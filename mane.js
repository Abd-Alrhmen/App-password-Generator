const lengthInput = document.getElementById("length");
const generateButton = document.getElementById("generate");
const passwordResult = document.getElementById("password");
lengthInput.addEventListener("input", function() {
    let value = lengthInput.value;
    //Remove Non Digits Characters    
    value = value.replace(/\D/g, "");
    
    //Force Range ->{1 , 32}
    if(value !=="") value = Math.max(1, Math.min(32, parseInt(value)));
    lengthInput.value = value;
    
}); 
//Set a Default Value if The Field Is Empty
lengthInput.addEventListener("blur", function() {
    if(lengthInput.value === "") lengthInput.value = 10;
})
// Generate Passowrd Function
function generatePassword(length, includeNumbers, includeSpecial) {
    const lowercace = "abcdefghijklmnopqrstuvwxyz";
    const uppercace = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const special = "!@#%^&*()_-+_|{}?>-*~<><>?";
    let characterPool = lowercace + uppercace;
    if (includeNumbers) characterPool += numbers;
    if (includeSpecial) characterPool += special;
    let password = "";
    for(let i = 0; i < length; i++){
        randomIndex = Math.floor(Math.random() * characterPool.length);
        password += characterPool[randomIndex];
    }
    return password;
}
//Click On Generate Button
generateButton.addEventListener("click", function() {
    //Get Password Length
    let length = parseInt(lengthInput.value);
    // console.log(length);
    const includeNumbers = document.getElementById("include-numbers").checked;
    const includeSpecial = document.getElementById("include-special").checked;
    // console.log(includeNumbers);
    // console.log(includeSpecial);
    //Get Random Password From Generaet Password Function
    let password = generatePassword(length, includeNumbers, includeSpecial);
    passwordResult.textContent = password ;
    //Saved Password In localStorage
    savePassword(password)
    //Desplay Password Of LocalStorage
    displayPasswordOfLocalstorag()
});
//Saved Password In LocalStorage
function savePassword(password) {
    const savedPassword =JSON.parse(localStorage.getItem("password")) || [];
    savedPassword.unshift(password); //Add The Password At The Start Array
    if(savedPassword.length > 10) savedPassword.pop(); //Remove The Element From Last Array
    localStorage.setItem("password",JSON.stringify(savedPassword));
}
//Display Password Of LocalStorage
function displayPasswordOfLocalstorag(){
    const savedPassword = JSON.parse(localStorage.getItem("password")) || [];
    const lestOfPassword = savedPassword.map((p,i) => `<div><span>${i + 1}</span>${escapeHTML(p)} <button class="delete-btn">Delete</button> </div>`).join("");
    document.getElementById("saved-passwordes").innerHTML = lestOfPassword ||"Password Will show here";
    deleteBtn() 
}
// Escape HTML
function escapeHTML(str) {
    return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
};
//Delete Button 
function deleteBtn() {
    const buttons = document.querySelectorAll(".delete-btn");
    buttons.forEach((e,i) =>{
        e.addEventListener("click" , () =>{
            let password = JSON.parse(localStorage.getItem("password")) || [];
            password.splice(i,1); //Remove The Element By Index
            localStorage.setItem("password",JSON.stringify(password));
            displayPasswordOfLocalstorag()
        })
    })
}
// Display Password On Page Lode
document.addEventListener("DOMContentLoded",displayPasswordOfLocalstorag())