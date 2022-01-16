const submitForm = document.querySelector('.main-form')
const urlApi = 'http://localhost:3000/api'

function postAPI(data) {
    fetch(urlApi, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
}

submitForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const formData = new FormData(submitForm);
    const alldata = Object.fromEntries(formData);
    postAPI(alldata)
})
