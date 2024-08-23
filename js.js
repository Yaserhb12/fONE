 
'use strict';

const users = [
    {
        "username": "Yaser Habrat",
        "phone": "050-3443181",
        "email": "yaser@gmail.com",
        "photo": "images/idme.png"
    },
    {
        "id": "2235537",
        "username": "jana khalaily",
        "email": "jana@gmail.com",
        "phone": "050-8531114",
        "photo": "images/idfe.png"
    },
    {
        "username": "Also bondeg",
        "email": "also@gmail.com",
        "phone": "050-1234567",
        "photo": "images/idfe.png"
    },
    {
        "username": "Christian Levi",
        "email": "christian@gmail.com",
        "phone": "050-1112245",
        "photo": "images/idme.png"
    },
];

const list = document.querySelector(".list");
const searchInput = document.getElementById('searchInput');

function loadContacts(filteredUsers = users) {
    list.innerHTML = '';
    filteredUsers.forEach((elem, ind) => {
        const item = document.createElement('li');
        item.className = "item";
        item.innerHTML = `
            <img src="${elem.photo}" alt="Contact Photo" style="width:50px;height:50px;">
            <span>${elem.username}</span>
            <button onclick="editContact(${ind})"><img src="images/edit.png" alt=""></button>
            <button onclick="showContactInfo(${ind})"><img src="images/information.png" alt=""></button>
            <button onclick="deleteContact(${ind})"><img src="images/delete.png" alt=""></button>
        `;
        list.append(item);
    });
    updatePeopleCount();
}

function openPopup() {
    document.getElementById('popupTitle').innerText = 'Add Contact';
    document.getElementById('contactIndex').value = '';
    document.getElementById('inputUserName').value = '';
    document.getElementById('inputUserPhone').value = '';
    document.getElementById('inputUserPhoto').value = '';
    document.getElementById('myModal').style.display = 'flex';
}

function closeModal(event) {
    if (event.target === document.getElementById('myModal') || event.target === document.getElementById('closeModalBtn')) {
        document.getElementById('myModal').style.display = 'none';
    }
}

function saveContact() {
    const index = document.getElementById('contactIndex').value;
    const name = document.getElementById('inputUserName').value;
    const phone = document.getElementById('inputUserPhone').value;
    const photoInput = document.getElementById('inputUserPhoto');
    let photo = '';

    if (photoInput.files && photoInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            photo = e.target.result;
            if (index === '') {
                users.push({ id: Date.now().toString(), username: name, phone: phone, photo: photo });
            } else {
                users[index] = { ...users[index], username: name, phone: phone, photo: photo };
            }
            closeModal({ target: document.getElementById('myModal') });
            loadContacts();
        }
        reader.readAsDataURL(photoInput.files[0]);
    } else {
        if (index === '') {
            users.push({ id: Date.now().toString(), username: name, phone: phone, photo: 'images/default.jpg' });
        } else {
            users[index] = { ...users[index], username: name, phone: phone };
        }
        closeModal({ target: document.getElementById('myModal') });
        loadContacts();
    }
}

function editContact(index) {
    document.getElementById('popupTitle').innerText = 'Edit Contact';
    document.getElementById('contactIndex').value = index;
    document.getElementById('inputUserName').value = users[index].username;
    document.getElementById('inputUserPhone').value = users[index].phone;
    document.getElementById('myModal').style.display = 'flex';
}

function deleteContact(index) {
    users.splice(index, 1);
    updatePeopleCount();
    loadContacts();
}

function deleteAllContacts() {
    const confirmation = window.confirm("Are you sure you want to delete all contacts? This action cannot be undone.");
    
    if (confirmation) {
        users.length = 0;
        updatePeopleCount();
        loadContacts();
        alert("All contacts have been deleted.");
    } else {
        alert("Deletion canceled.");
    }
}

function showContactInfo(index) {
    const user = users[index];
    document.getElementById('infoName').textContent = `Name: ${user.username}`;
    document.getElementById('infoPhone').textContent = `Phone: ${user.phone}`;
    document.getElementById('infoAddress').textContent = `Address: ${user.address || 'N/A'}`;
    document.getElementById('infoEmail').textContent = `Email: ${user.email || 'N/A'}`;
    document.getElementById('infoModal').style.display = 'flex';
}

function closeInfoPopup() {
    document.getElementById('infoModal').style.display = 'none';
}

function updatePeopleCount() {
    const count = users.length;
    document.getElementById('peopleCount').textContent = `${count} People`;
}

function filterContacts() {
    const query = searchInput.value.toLowerCase();
    const filteredUsers = users.filter(user =>
        user.username.toLowerCase().includes(query) ||
        user.phone.includes(query) ||
        user.email.toLowerCase().includes(query)
    );
    loadContacts(filteredUsers);
}

searchInput.addEventListener('input', filterContacts);

document.addEventListener('DOMContentLoaded', () => {
    loadContacts();
});
