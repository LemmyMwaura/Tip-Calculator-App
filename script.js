const btns = document.querySelectorAll("[data-btn-value]")
const bill = document.getElementById("bill")
const people = document.getElementById("people")
const form = document.getElementById("form")
const tipPerson = document.querySelector(".tip-person")
const totalPerson = document.querySelector(".total-person")
const custom = document.querySelector('.special')

bill.addEventListener( 'input', () => {
    if(people.value == null || people.value == 0 || bill.value == 0 ) {
        totalPerson.textContent = "$0.00"
        tipPerson.textContent = "$0.00"
     return
    }

    calctip()
    calctotal()
})

people.addEventListener( 'input', () => {
    if(people.value == null || people.value == 0 || bill.value == 0 ) {
        totalPerson.textContent = "$0.00"
        tipPerson.textContent = "$0.00"
     return
    }

    calctip()
    calctotal()
})

custom.addEventListener( 'input', () => {
    if(people.value == null || people.value == 0 || bill.value == 0 || custom.value == null || custom.value == 0 ) {
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
  totalPerson.textContent = (parseInt(bill.value) / people.value).toFixed(2)
}

const calctip = () => {
    if (custom.value == null || custom.value == 0) {
        btns.forEach((btn) => {
            btn.classList.remove('active')

            btn.addEventListener("click", (e) => {
                if(e.target.dataset.btnValue == btn.dataset.btnValue) {
                    btn.classList.add('active');
                }

                tipPerson.textContent = (
                    ((btn.dataset.btnValue * (parseInt(bill.value) / people.value)) / 100).toFixed(2)
                )
            })
        })
    } else {
        btns.forEach( (btn) => {
            btn.classList.remove('active')
        })
        tipPerson.textContent = (
                ((custom.value * (parseInt(bill.value) / people.value)) / 100).toFixed(2)
            )
    }
}