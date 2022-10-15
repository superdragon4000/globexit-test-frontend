const searchInput = document.querySelector('#search-input');
const searchResult = document.querySelector('#search-result');

const modal = document.getElementById("myModal");
const closeBtn = document.getElementsByClassName("close")[0];

closeBtn.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function createItem(item, id) {
    const newItem = document.createElement('div');
    newItem.className = 'result-item';
    newItem.id = id;
    
    const name = document.createElement('h3');
    name.className = 'name';
    name.innerText = `${item.name}`;

    const phoneBox = document.createElement('div');
    phoneBox.className = 'phone-box';
    const phoneIcon = document.createElement('img');
    phoneIcon.src = 'phone.svg';
    phoneIcon.className = 'icon';
    const phone = document.createElement('p');
    phone.innerText = `${item.phone}`;
    phoneBox.appendChild(phoneIcon);
    phoneBox.appendChild(phone);
    
    const emailBox = document.createElement('div');
    emailBox.className = 'email-box';
    const emailIcon = document.createElement('img');
    emailIcon.src = 'mail.svg';
    emailIcon.className = 'icon';
    const email = document.createElement('a');
    email.className = 'email-link';
    email.href = `mailto:${item.email}`
    email.innerText = `${item.email}`;
    emailBox.appendChild(emailIcon);
    emailBox.appendChild(email);
    
    newItem.appendChild(name);
    newItem.appendChild(phoneBox);
    newItem.appendChild(emailBox);
    return newItem;
}

fetch('http://localhost:3000')
  .then((response) => response.json())
  .then((data) => {
    data.forEach((element, index) => {
        searchResult.appendChild(createItem(element, index));
    });
    const items = document.querySelectorAll('.result-item');
    items.forEach((element) => {
        element.addEventListener('click', () => {
            modal.style.display = "block";
            const user = data[+element.id];
            document.getElementById('modal-name').innerText = user.name;
            const phone = document.getElementById('modal-phone');
            phone.innerText = user.phone;
            phone.href = `tel: ${user.phone}`;
            const email = document.getElementById('modal-email');
            email.innerText = user.email;
            email.href = `mailto: ${user.email}`;
            document.getElementById('modal-date').innerText = user.hire_date;
            document.getElementById('modal-position-name').innerText = user.position_name;
            document.getElementById('modal-department').innerText = user.department;
            document.getElementById('modal-add-info').textContent += user.address;
        })
    })
  })

searchInput.oninput = () => {
    let val = searchInput.value.trim();
    let items = document.querySelectorAll('.name');
    if (val !== '') {
        items.forEach((elem) => {
            if (elem.innerText.toLowerCase().search(val) === -1) {
                elem.parentElement.className = 'result-item hide';
            } else {
                elem.parentElement.className = 'result-item';
            }
        });
    } else {
        items.forEach((elem) => {
            elem.parentElement.className = 'result-item';
        });
    }
}


