// variables
const billInput = document.querySelector('.bill-input')

let billValue;

const percentageButtons = document.querySelectorAll(".buttons-and-input-container button")

const customPercentage = document.querySelector('.buttons-and-input-container input')

let percent;

const numberOfPeopleInput = document.querySelector('.number-input')

let people;

const warningP = document.querySelector('.main-calculator .left .number .warning-p')

const totalTipAmount = document.querySelector('.actual-tip-amount p')

const totalPerPerson = document.querySelector('.actual-total-amount p')

let isTime = false

const resetButton = document.querySelector('.right button')

let isResetting = false

//gets amount from bill
billInput.addEventListener('input', (e)=>{
    if (isNotEmpty(e.currentTarget.value)) {
        isResetting = false
        customPercentage.readOnly = false
        billValue = parseFloat(e.currentTarget.value) 
    }else{
        alert("Please input a valid number")
        e.currentTarget.value = ''
        reset()
    }
})

//gets percentage value
percentageButtons.forEach((button)=>{
         button.addEventListener('click', (e)=>{
            if (isResetting) {
                return
            }else{
        classRemover()

        button.classList.add("picked")

        percent = parseFloat(button.dataset.percent)
        customPercentage.value = ''
        numberOfPeopleInput.readOnly = false
        }
    })
   
})

customPercentage.addEventListener("input", (e)=>{
    isResetting = false
    classRemover()

    if (isNotEmpty(e.currentTarget.value)) {
        percent = parseFloat(e.currentTarget.value / 100)
    }else{
        alert("Please input a valid number")
        e.currentTarget.value = ''
    }
})

//gets number of people and performs general calculation
numberOfPeopleInput.addEventListener('input', (e)=>{
    
    if (isNotEmpty(e.currentTarget.value)) {
        isResetting = false
       isTime = true 
       people = parseFloat(e.currentTarget.value)
       getTipAmount(billValue, percent, people)
       if (people == 0) {
           numberOfPeopleInput.classList.add('warning')
           warningP.style.display = 'block'
       }else{
        numberOfPeopleInput.classList.remove('warning')
        warningP.style.display = 'none'
       }
    }

    if (isTime == true) {
        if (isResetting) {
            return
        }else{
         billInput.addEventListener("input", (e)=>{
            getTipAmount(billValue, percent, people)
        })
    
        percentageButtons.forEach((button)=>{
            button.addEventListener('click', (e)=>{
                getTipAmount(billValue, percent, people)
            })
        })
    
        customPercentage.addEventListener("input", (e)=>{
            getTipAmount(billValue, percent, people)
        })
    }
    }
    
})

//reset button functionality
resetButton.addEventListener("click", ()=>{
    reset()
})

//removes button class
function classRemover() {
    percentageButtons.forEach((button)=>{
        button.classList.remove("picked")
    })
}

//validates numeric input
function isNotEmpty(n){
    if ( n.trim() != '') {
       return true
    }
}

//computes calculation
function getTipAmount(bill, tipPercent, numberOfPeople){
    let totalAmount = parseFloat(bill * tipPercent / numberOfPeople).toFixed(2)

    let totalAmountPerPerson = parseFloat(bill / numberOfPeople).toFixed(2)

    console.log(totalAmount, totalAmountPerPerson);

    if (totalAmount == "NaN" || totalAmountPerPerson == "NaN"
    || totalAmount == "Infinity" || totalAmountPerPerson == "Infinity") {
        totalTipAmount.innerHTML = `$0.00`

        totalPerPerson.innerHTML = `$0.00`
    }else{
        totalTipAmount.innerHTML = `$${totalAmount}`

        totalPerPerson.innerHTML = `$${totalAmountPerPerson}`
    }
    
        
    
    
}

//resets the calculator's input
function reset(){
    isResetting = true
    billInput.value = ''
    billValue = 0
    classRemover()
    percent = 0
    customPercentage.value = ''
    customPercentage.readOnly = true
    numberOfPeopleInput.value = ''
    numberOfPeopleInput.readOnly = true
    people = 0
    isTime = false

    totalTipAmount.innerHTML = `$0.00`

     totalPerPerson.innerHTML = `$0.00`
    
    
}

window.addEventListener("load", reset)