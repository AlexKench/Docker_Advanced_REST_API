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
                    <button type="button" class="btn btn-primary" data-toggle="modal"
                            data-target="#editModal">Edit</button>
                </th>
                <th>
                    <button data-id="${user.id}" type="button" class="btn btn-danger " data-toggle="modal"
                            data-target="#deleteModal" id="dbtn">Delete</button>
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

// добавляем пользователя
let firstNameField = document.querySelector(".firstname__input");
let surNameField = document.querySelector(".surname__input");
let userNameField = document.querySelector(".email__input");
let passwordField = document.querySelector(".password__input");
let ageField = document.querySelector(".age__input");
let addNewUserBtn = document.querySelector(".addUser__btn");
addNewUserBtn.addEventListener("click", () => {
    const user = {
        name: firstNameField.value,
        surName: surNameField.value,
        username: userNameField.value,
        password: passwordField.value,
        age: ageField.value,
        role: [
            {
                name: "ROLE_USER"
            }
        ]
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
                renderTable(data)
            })

    } catch (error) {
        console.log(error)
    }
    console.log('obj', user)
});


userTable.addEventListener('click', (e) => {
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
})


let modalFormDelete = document.querySelector('#modal__form__delete')

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











