const BASE_URL = 'https://lighthouse-user-api.herokuapp.com'
const INDEX_URL = BASE_URL + '/api/v1/users/'
const users = []

const dataPanel = document.querySelector('#data-panel')

function renderUserList(data) {
  let rawHTML = ''
  data.forEach((item) => {
    rawHTML += `<div class="col">
        <div class="card">
          <img src="${item.avatar}" class="card-img-top"  alt="User Image">
          <div class="card-body">
            <h6 class="card-title" id="user-name">${item.name} ${item.surname}</h6>
            <button type="button" class="btn btn-outline-primary btn-sm btn-show-user" data-bs-toggle="modal" data-id="${item.id}" data-bs-target="#user-modal">
            More
            </button>
          </div>
        </div>
      </div>`
  })
  dataPanel.innerHTML = rawHTML
}

function showUserModal(id) {
  const modalName = document.querySelector('#user-modal-name')
  const modalContent = document.querySelector('#user-modal-content')

  axios.get(INDEX_URL + id).then((response) => {
    const data = response.data

    modalName.innerText = data.name + ' ' + data.surname
    modalContent.innerHTML = `<li class="user-modal-gender">Gender : ${data.gender}</li>
            <li class="user-modal-birthday">Birthday : ${data.birthday}</li>
            <li class="user-modal-age">Age : ${data.age}</li>
            <li class="user-modal-region">Region : ${data.region}</li>
            <li class="user-modal-email">E-mail : ${data.email}</li>`
  })
    .catch((error) => console.log(error))
}

dataPanel.addEventListener('click', function onPanelClicked(event) {
  if (event.target.matches('.btn-show-user')) {
    showUserModal(event.target.dataset.id)
  }
})

axios.get(INDEX_URL)
  .then((response) => {
    users.push(...response.data.results)
    renderUserList(users)
  })
  .catch((err) => console.log(err))