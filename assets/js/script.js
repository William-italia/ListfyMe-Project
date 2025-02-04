const body = document.body;
const boxTheme = document.querySelector('.box-theme');
const filter = document.querySelector('.filter-input');
const clear = document.querySelector('#clear');
const msg = document.querySelector('.msg');
const flashMsg = document.querySelector('.flash-msg');
const list = document.querySelector('.list-items');
const items = list.getElementsByTagName('li');
const closeFilter = document.querySelector('.clear-filter');
const form = document.querySelector('#form');
const itemInput = document.querySelector('#item-input');
const add =document.querySelector('.add');
const edit = document.querySelector('.edit');
const formBtn = form.querySelector('button');

let timeOutId;
let isEditMode = false;

function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function displayItems() {
    const itemsFromStorage = getItemsFromStorage();

    itemsFromStorage.forEach((item) => {
        const itemOk = capitalizeFirstLetter(item);
        addItemToDOM(itemOk);
    });

    checkUI();
}

function toggleTheme() {
    const savedTheme = localStorage.getItem('theme');

    if(savedTheme === 'dark') {
        boxTheme.innerHTML = `<img src="./assets/img/sun-regular.svg" alt="">`;
        document.body.classList.add('dark');
    } else {
        boxTheme.innerHTML = `<img src="./assets/img/moon.png" alt="">`;
        document.body.classList.remove('dark');
    }
}

function onClickTheme() {
    body.classList.toggle('dark');

    if (body.classList.contains('dark')) {
        boxTheme.innerHTML = `<img src="./assets/img/sun-regular.svg" alt="">`;
        localStorage.setItem('theme', 'dark'); 
    } else {
        boxTheme.innerHTML = `<img src="./assets/img/moon.png" alt="">`;
        localStorage.setItem('theme', ''); 
        // localStorage.clear('theme'); 
    }
}

function Clear() {

    confirmClear();
}

function onClickItem(e) {
    if(e.target && e.target.parentElement.classList.contains('remove-item')) {
        removeItem(e);
    }

    if(e.target.closest('li') && !e.target.closest('button')) {
        setItemToEdit(e.target);
    }
}

function setItemToEdit(item) {
    isEditMode = true;
    console.log(item);
     
    Array.from(items).forEach(item => {
        item.classList.remove('edit-mode');
    });

    item.classList.add('edit-mode');
    formBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Confirmar'
    formBtn.classList.add('edit-mode-btn');

    itemInput.value = item.textContent;
    itemInput.focus();
}

function removeItemLocalStorage(item) {
    
    let itemsFromStorage = getItemsFromStorage();

    itemsFromStorage = itemsFromStorage.filter(i => i !== item);

    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function removeItem(item) {
    const listItem = item.target.closest('li');

    listItem ? listItem.remove() : null;

    listItem = listItem.textContent.toLowerCase();

    removeItemLocalStorage(listItem.textContent);

    showFlashMsg('ok', 'Item removido com sucesso!');
    checkUI();
}

function onFilter() {
    const filterText = filter.value.toLowerCase();

    Array.from(items).forEach(item => {
        const itemText = item.textContent.toLowerCase();

        if(itemText.includes(filterText)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });

    checkFilter();
}

function onCloseFilter() {
    filter.value = '';

    Array.from(items).forEach(item => {
        item.style.display = 'flex';
    });

    checkFilter();
}

function checkFilter() {
    if(filter.value !== '') {
        closeFilter.style.display = 'block';
    } else {
        closeFilter.style.display = 'none';
    }
}

function checkUI() {
    if (list.children.length > 1) {
        clear.style.display = 'block';
        filter.style.display = 'block';
    } else {
        clear.style.display = 'none';
        filter.style.display = 'none';
    }

    formBtnRestart();

    isEditMode = false;
}

function formBtnRestart() {
    formBtn.classList.remove('edit-mode-btn');
    formBtn.innerHTML = '+ Adicionar item';
}

function createP(classe, text) {
    const p = document.createElement('p');
    p.classList.add(classe);
    p.textContent = text;

    return p;
}

function createBtn(classe, text) {
    const btn = document.createElement('button');
    btn.classList.add(classe);
    btn.textContent = text;

    return btn;
}

function showFlashMsg(type, text) {

    flashMsg.replaceChildren();


    const p = createP('teste', text);

    flashMsg.appendChild(p);

    flashMsg.classList.add('active');
    flashMsg.classList.add(type);

    if(timeOutId) {
        clearTimeout(timeOutId);
    }
    
    timeOutId = setTimeout(() => {
        flashMsg.classList.remove('active');
        setTimeout(() => {
            flashMsg.classList.remove(type);
        }, 500);
    }, 2000);
}

function confirmClear() {

    msg.classList = 'msg attention';
    
    msg.replaceChildren();
    
    const p = createP('msg-text', 'Você tem certeza que deseja apagar todos os items da lista?')

    const btnYes = createBtn('yes', 'Sim');
    const btnNo = createBtn('no', 'Não');

    msg.appendChild(p);
    msg.appendChild(btnYes);
    msg.appendChild(btnNo);

    msg.classList.add('active');
    msg.classList.add('attention');
}

function onClickAlertMsg(e) {
    if(e.target && e.target.tagName === 'BUTTON') {
        
        if(e.target.classList.contains('yes')) {
            list.replaceChildren();

            msg.classList.remove('active');
            localStorage.removeItem('items');

            checkUI();

        } else {
            msg.classList.remove('active');
        }
    }
}

function createText(item) {
    const text = document.createTextNode(item);
    return text;
}

function createItem(item) {

    const li = document.createElement('li');
    const btn = document.createElement('button');

    btn.classList.add('remove-item');
    btn.innerHTML = '<i class="fa-solid fa-xmark"></i>';

    li.appendChild(createText(item));
    li.appendChild(btn);

    return li;

}

function onAddItemSubmit(e) {
    e.preventDefault();

    const newItem = itemInput.value.trim();

    if (newItem === '') {
        showFlashMsg('erro', 'Por favor adicione um item!');
        return;
    }

    if(isEditMode) {
        const itemToEdit = list.querySelector('.edit-mode');

        console.log(itemToEdit);
        removeItemLocalStorage(itemToEdit.textContent);
        itemToEdit.classList.remove('edit-mode');
        itemToEdit.remove();

        isEditMode = false;
        
    } 

    checkIfItemExist(newItem)
   
    checkUI();

    itemInput.value = '';
    itemInput.focus();
}

function addItemToDOM(newItem) {

    const itemOk = capitalizeFirstLetter(newItem);

     list.prepend(createItem(itemOk));

};

function addItemToStorage(item) { 

    let itemsFromStorage = getItemsFromStorage();

   
    itemsFromStorage.push(item.toLowerCase());

    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function checkIfItemExist(item) {
    const itemsFromStorage = getItemsFromStorage();
    if(itemsFromStorage.includes(item)) {
        showFlashMsg('erro', 'Item Já existe na lista!')
        return;
    } else {
        addItemToDOM(item);
        addItemToStorage(item);
        
    }
}

function getItemsFromStorage() {
    return JSON.parse(localStorage.getItem('items')) || [];
}

function init() {

    clear.addEventListener('click', Clear);
    boxTheme.addEventListener('click', onClickTheme);
    msg.addEventListener('click', onClickAlertMsg);
    list.addEventListener('click', onClickItem);
    filter.addEventListener('input', onFilter);
    closeFilter.addEventListener('click', onCloseFilter);
    form.addEventListener('submit', onAddItemSubmit);
    document.addEventListener('DOMContentLoaded', displayItems);

    toggleTheme();  
    checkUI();
}

init();