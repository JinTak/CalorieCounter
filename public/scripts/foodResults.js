// Modal
let editFoodBtn = document.getElementById('saveSearchedFoodBtn');

// Get Modal Close Button
let modalCloseButton = document.getElementsByClassName('closeBtn');

let foodModal_0 = document.getElementById('foodModal-0');
let foodModal_1 = document.getElementById('foodModal-1');
let foodModal_2 = document.getElementById('foodModal-2');

editFoodBtn.addEventListener('click', ()=>{
    console.log('hit submit');
    var radioChoice = document.getElementsByName('foodResultChoice');
    console.log(radioChoice);
    for(let c = 0; c < radioChoice.length; c++){
        if(radioChoice[c].checked){
            if(c === 0){
                foodModal_0.style.display = 'block';
            } else if(c === 1){
                foodModal_1.style.display = 'block';
            } else if(c === 2){
                foodModal_2.style.display = 'block';
            }
            
        }
    }

    scroll(0, 0);
    
});

// Close modal when 'x' is clicked
for(var i = 0; i < modalCloseButton.length; i++){
    modalCloseButton[i].addEventListener('click', function() {
        foodModal_0.style.display = "none";
        foodModal_1.style.display = "none";
        foodModal_2.style.display = "none";
    })
}


// // Close modal if user clicks outside of modal
// window.addEventListener('click', function(e) {
//     if(e.target == foodModal_0 || e.target == foodModal_1 || e.target == foodModal_2){
//         foodModal_0.style.display = "none";
//         foodModal_1.style.display = "none";
//         foodModal_2.style.display = "none";
//     }
// });