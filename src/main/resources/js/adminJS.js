let userTable = document.querySelector(".body__list");
let output = "";
let roleLet;
let URL = "http://localhost:8081/api/user";


// получаем пользователей с сервера
fetch(URL)
    .then(res => res.json())
    .then(data => {
        data.forEach(user => {
            roleLet = "";
            user.role.forEach((role) => roleLet += role.name + " || ");
            output += `
              <tr>
                <th><p>${user.id} </p></th>
                <th><p>${user.name} </p></th>
                <th><p>${user.surName} </p></th>
                <th><p>${user.age} </p></th>
                <th><p>${user.username} </p></th>
                <th><p>${roleLet.slice(0, roleLet.length - 3)}</p></th>
                <th >
                    <button type="button" class="btn btn-primary" data-toggle="modal"
                            data-target="#editModal">Edit</button>
                </th>
                <th class="btn__del" id="${user.id}">
                    <button type="button" class="btn btn-danger " data-toggle="modal"
                            data-target="#deleteModal">Delete</button>
                    </th>
                </tr>
            `;

        });
        userTable.innerHTML = output;
    });

// удаляем пользователя
let deleteUser = async () => {
    try {
        await fetch(`${URL}/${document.querySelector(".btn__del").id}`, {
            method: 'delete'
        })
    } catch (error) {
        console.log(error)
    }
};


// добавляем пользователя
let firstNameField = document.querySelector(".firstname__input");
let surNameField = document.querySelector(".surname__input");
let userNameField = document.querySelector(".email__input");
let passwordField = document.querySelector(".password__input");
let ageField = document.querySelector(".age__input");
let addNewUserBtn = document.querySelector(".addUser__btn");

addNewUserBtn.addEventListener("click", () => createNewUser());
let createNewUser = async () => {
    const user = {
        name: firstNameField.value,
        surName: surNameField.value,
        username: userNameField.value,
        password: passwordField.value,
        age: ageField.value,
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

    } catch (error) {
        console.log(error)
    }
    console.log('obj', user)
};











