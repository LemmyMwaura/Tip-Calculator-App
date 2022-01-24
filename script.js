const btns = document.querySelectorAll("[data-btn-value]")
const bill = document.getElementById("bill")
const people = document.getElementById("people")
const peopleLabel = document.querySelector('.people-label')
const form = document.getElementById("form")
const tipPerson = document.querySelector(".tip-person")
const totalPerson = document.querySelector(".total-person")
const custom = document.querySelector('.special')
const reset = document.getElementById('reset')

bill.addEventListener( 'input', () => {
    if(bill.value == null || bill.value == 0 || people.value == 0 ) {
        totalPerson.textContent = "$0.00"
        tipPerson.textContent = "$0.00"
     return
    }

    calctip()
    calctotal()
})

people.addEventListener( 'input', () => {
    if(people.value == null || bill.value == 0 ) {
        totalPerson.textContent = "$0.00"
        tipPerson.textContent = "$0.00"
     return
    }

    calctip()
    calctotal()
})

custom.addEventListener( 'input', () => {
    if( custom.value == null || custom.value == 0 || people.value == null|| bill.value == 0 ) {
        tipPerson.textContent = "$0.00"
     return
    }

    calctip()
    calctotal()
})

form.addEventListener("submit", (e) => {
  e.preventDefault()
  calctip()
  calctotal()
})

const calctotal = () => {
    if(people.value == 0) {
        people.classList.add('danger')
        peopleLabel.classList.add('danger')
        totalPerson.textContent = "$0.00"
        return
    }
    let tip = tipPerson.textContent.replace('$', ' ')
    totalPerson.textContent =   "$" + ((parseFloat(bill.value) / people.value) + parseFloat(tip)).toFixed(2)
}

const calctip = () => {
    if(people.value == 0) {
        people.classList.add('danger')
        peopleLabel.classList.add('danger')
        tipPerson.textContent = "$0.00"
        return
    } else {
        people.classList.remove('danger')
        peopleLabel.classList.remove('danger')
    }

    if (custom.value == null || custom.value == 0) {
        custom.classList.remove('active')
        btns.forEach((btn, event) => {
            btn.classList.remove('active')
            btn.addEventListener("click", (e) => {   
                if(people.value == 0) {
                    calctip()
                    return
                }  
                btn.classList.add('active');
                tipPerson.textContent = (
                    "$" + ((btn.dataset.btnValue * (parseFloat(bill.value) / people.value)) / 100).toFixed(2)
                )
            })
        })
    } else {
        if (custom.value != 0){
            custom.classList.add('active')
        } 
        if (custom.value > 100) {
            custom.value = "100"
            calctip()
            alert("Tip can't be greater than 100%")
            return ;
        }

        btns.forEach( (btn) => {
            btn.classList.remove('active')
        })
        tipPerson.textContent = (
                "$" + ((custom.value * (parseFloat(bill.value) / people.value)) / 100).toFixed(2)
            )
    }
}

reset.addEventListener('click', () => {
    bill.value = ''
    people.value = ''
    btns.forEach((btn) => {
        btn.classList.remove('active')
    })
    custom.value = ''
    custom.classList.remove('active')
    tipPerson.textContent = '$0.00'
    totalPerson.textContent = '$0.00'
})