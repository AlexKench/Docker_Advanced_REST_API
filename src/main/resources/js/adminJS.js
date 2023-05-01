let userTable = document.querySelector(".body__list");
let outputUser = "";
let roleLet;
let URL = "http://localhost:8011/api/user";

const renderTable = (user) => {
    user.forEach(user => {
        roleLet = "";
        user.role.forEach((role) => roleLet += role.name + " || ");
        outputUser += `
              <tr >
                <th><p>${user.id} </p></th>
                <th><p>${user.name} </p></th>
                <th><p>${user.surName} </p></th>
                <th><p>${user.age} </p></th>
                <th><p>${user.username} </p></th>
                <th><p>${roleLet.slice(0, roleLet.length - 3)}</p></th>
                 
                <th>
                    <button data-id="${user.id}" type="button" class="btn btn-primary" data-toggle="modal"
                            data-target="#editModal" id="editbtn">Edit</button>
                </th>
                <th>
                    <button data-id="${user.id}" type="button" class="btn btn-danger " data-toggle="modal"
                            data-target="#deleteModal" id="delbtn">Delete</button>
                    </th>
                </tr>
            `;
    });
    userTable.innerHTML = outputUser;


}
// получаем пользователей с сервера
fetch(URL)
    .then(res => res.json())
    .then(data => renderTable(data))

const selectRoleForm = document.getElementById('roles');
const rolesListUrl = 'http://localhost:8011/api/roles';


fetch(rolesListUrl)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        let options = '';
        for (const [k, v] of Object.entries(data)) {
            options += `<option value="${Number(k)+ 1}">${v.name}</option>`;
        }
        selectRoleForm.innerHTML = options;
        console.log(options)
    })

// добавляем пользователя
let firstNameField = document.querySelector(".firstname__input");
let surNameField = document.querySelector(".surname__input");
let userNameField = document.querySelector(".email__input");
let passwordField = document.querySelector(".password__input");
let ageField = document.querySelector(".age__input");
let addNewUserBtn = document.querySelector(".addUser__btn");
let roleById = document.getElementById('roles');






addNewUserBtn.addEventListener("click", (e) => {
    e.preventDefault()
    const roles = [];
    for (let i = 0; i < roleById.options.length; i++) {
        if (roleById.options[i].selected) {
            roles.push({
                id: roleById.options[i].value,
                name: roleById.options[i].text
            });
        }
    }
    console.log(roles)
    const user = {
        name: firstNameField.value,
        surName: surNameField.value,
        username: userNameField.value,
        password: passwordField.value,
        age: ageField.value,
        role: roles
    }

    try {
        fetch(URL, {
            method: 'post',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(user),
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })

    } catch (error) {
        console.log(error)
    }
    console.log('obj', user)
});


userTable.addEventListener('click', (e) => {
    console.log(e.target)
    if (e.target.id === 'delbtn') {
        fetch(`${URL}/${e.target.dataset.id}`)
            .then(res => res.json())
            .then(data => {
                    document.querySelector("#idDel").value = data.id
                    document.querySelector("#firstnameDel").value = data.name
                    document.querySelector("#lastnameDel").value = data.surName
                    document.querySelector("#emailDel").value = data.username
                    document.querySelector("#ageDel").value = data.age
                }
            )
    } else if (e.target.id === 'editbtn') {
        fetch(`${URL}/${e.target.dataset.id}`)
            .then(res => res.json())
            .then(data => {
                    document.querySelector("#idEdit").value = data.id
                    document.querySelector("#nameEdit").value = data.name
                    document.querySelector("#lastnameEdit").value = data.surName
                    document.querySelector("#emailEdit").value = data.username
                    document.querySelector("#ageEdit").value = data.age
                }
            )

    }
})


let modalFormDelete = document.querySelector('#modal__form__delete');

modalFormDelete.addEventListener('submit', (e) => {
    let userId = document.querySelector("#idDel").value

    fetch(`${URL}/${userId}`, {
        method: "delete"
    })
        .then(res => console.log(res))
        .then(() => {
            outputUser = ''
        })
    fetch(URL)
        .then(res => res.json())
        .then(data => renderTable(data))

})

let modalFormEdit = document.querySelector('#modal__form__edit');

modalFormEdit.addEventListener('submit', (e) => {
    const user = {
        id: document.querySelector("#idEdit").value,
        name: document.querySelector("#nameEdit").value,
        surName: document.querySelector("#lastnameEdit").value,
        username: document.querySelector("#emailEdit").value,
        password: passwordField.value,
        age: document.querySelector("#ageEdit").value,
        role: [
            {
                name: "ROLE_USER"
            }
        ]
    }
    fetch(`${URL}`, {
        method: 'put',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(user),
    })
        .then(res => console.log(res))
        .then(() => {
            outputUser = ''
        })
    fetch(URL)
        .then(res => res.json())
        .then(data => renderTable(data))

})













