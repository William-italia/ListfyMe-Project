// const boxTheme = document.querySelector('.box-theme');
// const body = document.body;
// const filter = document.querySelector('.filter-input');
// const clear = document.querySelector('#clear');
// const msg = document.querySelector('.msg');
// const list = document.querySelector('.list-items');
// const items = list.getElementsByTagName('li');
// const clearFilter = document.querySelector('.clear-filter');
// const form = document.querySelector('#form');
// const itemInput = document.querySelector('#item-input');
// const add =document.querySelector('.add');
// const edit =document.querySelector('.edit');
// // const msgText = document.querySelector('.msg-text');

// let timeOutId;
// let editMode = false;

// function verificaTema() {
//     const savedTheme = localStorage.getItem('theme');

//     if(savedTheme === 'dark') {
//         if (savedTheme === 'dark') {
//             boxTheme.innerHTML = `<img src="./assets/img/sun-regular.svg" alt="">`;
//             document.body.classList.add('dark');
//         } else {
//             boxTheme.innerHTML = `<img src="./assets/img/moon.png" alt="">`;
//             document.body.classList.remove('dark');
//         }
//     }

// }

// function createText(item) {
//     const text = document.createTextNode(item);
//     return text;
// }


// function createItem(item) {

//     const li = document.createElement('li');
//     const btn = document.createElement('button');

//     btn.classList.add('remove-item');
//     btn.innerHTML = '<i class="fa-solid fa-xmark"></i>';

//     li.appendChild(createText(item));
//     li.appendChild(btn);

//     return li;

// }

// function showMsg(text, type) {

//     if (type === 'attention') {
        
//         msg.replaceChildren();

//         const p = document.createElement('p');
//         p.classList.add('msg-text');
//         p.textContent = text;

//         const btnYes = document.createElement('button');
//         btnYes.classList.add('yes');
//         btnYes.textContent = 'Sim';
//         const btnNo = document.createElement('button');
//         btnNo.classList.add('no');
//         btnNo.textContent = 'Não';

//         msg.appendChild(p);
//         msg.appendChild(btnYes);
//         msg.appendChild(btnNo);

//         msg.classList.add('active');
//         msg.classList.add('attention');

//         msg.addEventListener('click', attentionClear);

//     }

//     if (type !== 'attention'){

//         msg.replaceChildren();

//         const p = document.createElement('p');
//         p.classList.add('msg-text');
//         p.textContent = text;

//         msg.appendChild(p);

//         msg.classList.remove('erro');
//         msg.classList.remove('ok');
//         msg.classList.remove('attention');


//         msg.classList.add(type);
    
//         msg.classList.add('active');

//         if(timeOutId) {
//             clearTimeout(timeOutId);
//         }
        
//         timeOutId = setTimeout(() => {
//             msg.classList.remove('active');
//             setTimeout(() => {
//                 msg.classList.remove(type);
//             }, 500);
//         }, 2000);

//     }

// }

// function attentionClear(e) {

//     msg.classList.remove('erro');
//     msg.classList.remove('attention');
//     msg.classList.remove('ok');

//     if(e.target && e.target.tagName === 'BUTTON') {
        
//         if(e.target.classList.contains('yes')) {
//             list.replaceChildren();

//             msg.classList.remove('active');
//             msg.classList.remove('attention');

//             setTimeout(()=> {
//                 showMsg('Lista apagada com sucesso!', 'ok');
//             }, 500)
//             toggleClear();
//             verifiedFilter();
//             verifiedList();
//         } else {
//             msg.classList.remove('active');
//             msg.classList.remove('attention');
//         }
//     }
// }

// // clear
// clear.addEventListener('click', () => {

//     showMsg('Você tem certeza que deseja apagar todos os items da lista?', 'attention');
//     verifiedList();
//     toggleClear();
// });

// function verifiedList() {
//     if (list.children.length > 1) {
//         clear.style.display = 'block';
//         filter.style.display = 'block';
//     } else {
//         clear.style.display = 'none';
//         filter.style.display = 'none';
//     }
// }




// function verifiedEdit() {
    
//     if(editMode === true) {
//         add.style.display = 'none';
//         edit.style.display = 'block';
//     } else {
//         add.style.display = 'block';
//         edit.style.display = 'none';
//     }
// }


// form.addEventListener('submit', (e) => {
//     e.preventDefault();

//     const item = itemInput.value;

//     if(item.trim() != '') {
//         showMsg('Item adicionado com sucesso!', 'ok');
        
//         addItemToDOM(item);
//         addItemToStorage(item);
        
//         itemInput.value = '';
        
//         itemInput.focus();
        
//         verifiedFilter();
//         verifiedList();
//         clearFil();
//     } else {
//         showMsg('Por favor adicione um item!', 'erro');
//         return;
//     }
// });

// function addItemToDOM(item) {
//     list.prepend(createItem(item));
// }

// function addItemToStorage(item) {

//     let itemsFromStorage = getItemsFromStorage();


//     itemsFromStorage.push(item);


//     console.log(itemsFromStorage);
    
//     localStorage.setItem('items', JSON.stringify(itemsFromStorage));
// }


// function getItemsFromStorage() {
//     let itemsFromStorage;

//     if(localStorage.getItem('items') === null) {
//         itemsFromStorage = [];
        
//     } else {
//         itemsFromStorage = JSON.parse(localStorage.getItem('items'));
//     }

//     return itemsFromStorage;
// }


// function displayItems() {
//     const itemsFromStorage = getItemsFromStorage();

//     itemsFromStorage.forEach(item => {
//         addItemToDOM(item);
//     });

//     verifiedList();
// }

// // dark mode
// boxTheme.addEventListener('click', (e) => {
//     body.classList.toggle('dark');

//     if (body.classList.contains('dark')) {
//         boxTheme.innerHTML = `<img src="./assets/img/sun-regular.svg" alt="">`;
//         localStorage.setItem('theme', 'dark'); 
//     } else {
//         boxTheme.innerHTML = `<img src="./assets/img/moon.png" alt="">`;
//         localStorage.setItem('theme', ''); // Salva o modo light
//     }
// });

// list.addEventListener('click', (e) => {

//     onClickItem(e);
//     removeItem(e);
//     toggleClear();
//     clearFil();
//     verifiedList();
//     verifiedFilter();
// });

// function onClickItem(e) {

//     if(e.target && e.target.closest('button').classList.contains('remove-item')) {
//         removeItem(e);
//     }

// }




// function removeItem(item) {
//         const listItem = item.target.closest('li');

//         listItem ? listItem.remove() : ''; 

//         showMsg('Item apagado com sucesso!', 'ok');
        
        // removeItemFromStorage(item.textContent);


// }

// function removeItemFromStorage(item) {
//     let itemsFromStorage = getItemsFromStorage();

//     itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

//     localStorage.setItem('items', itemsFromStorage);
    
// }
// filtro
// filter.addEventListener('input', () => {
//     const filterText = filter.value.toLowerCase();

//     Array.from(items).forEach(item => {
//         const itemText = item.textContent.toLowerCase();

//         if (itemText.includes(filterText)) {
//             item.style.display = 'flex';
//         } else {
//             item.style.display = 'none';
//         }
//     });

//     toggleClear();
//     verifiedFilter();
// });


// // limpeza do filtro
// clearFilter.addEventListener('click', (e) => {
    
//     clearFil();
//     verifiedFilter();
//     toggleClear();
// });

// function clearFil() {
//     filter.value = '';
        
//     Array.from(items).forEach(item => {
//         item.style.display = 'flex';
//     });

// }

// function toggleClear() {
//     if(filter.value === '' && list.children.length > 1) {
//         clear.style.display = 'block';
//     } else {
//         clear.style.display = 'none';
//     }
// }

// function verifiedFilter() {
//     if (filter.value !== '' && list.children.length > 1) {
//         clearFilter.style.display = 'block';
        
//     } else {
//         clearFilter.style.display = 'none';
//         // clear.style.display = 'block'
//     }
// }

// document.addEventListener('DOMContentLoaded', displayItems);


// toggleClear();
// verifiedEdit();
// verifiedList();
// verifiedFilter();
// verificaTema();





// function init() {

// }


// init();


// document.addEventListener('DOMContentLoaded', () => {
//     const lista = document.querySelector('ul');
//     const form = document.getElementById('item-form');
//     const inputItem = document.querySelector('.input-item');
//     const msg = document.querySelector('.msg');
//     const clear = document.querySelector('.clear');
//     const filterInput = document.querySelector('.input-filter');
//     const items = lista.getElementsByTagName('li');


//     let timeOutId;


    
//     form.addEventListener('submit', (e) => {
//         e.preventDefault();

//         const item = inputItem.value;

//         if(item.trim() != '') {

//             showMsg('Item adicionado com sucesso!', 'ok');

//             lista.prepend(CreateItem(item));
//             inputItem.value = '';

//             inputItem.focus();
            
//             verifiedList();
//             verifiedFilter();
//             toogleClearButton(); 

//         }  else {
//             showMsg('Entre com um item, para adicionar algo a lista!', 'erro');
//         }
//     });

//     filterInput.addEventListener('input', () => {

//         const filterText = filterInput.value.toLowerCase();


//         Array.from(items) .forEach(item => {
//             const itemText = item.textContent.toLowerCase();

//             if(itemText.includes(filterText)) {
//                 item.style.display = 'flex';
//             } else {
//                 item.style.display = 'none';
//             }
//         });

//         verifiedFilter();
//         toogleClearButton();
//     });

    
//     lista.addEventListener('click', (e) => {
//         if(e.target && e.target.closest('button').classList.contains('remove-item')) {

//             const listItem = e.target.closest('li');
    
//             listItem ? listItem.remove() : null;
            
//             if(filterInput.value != '') {
//                 filterInput.value = ''

//                 Array.from(items).forEach(item => {
//                     item.style.display = 'flex';
//                 });
//             }

//             verifiedList()
//             verifiedFilter()
//             toogleClearButton();

//             showMsg('Item apagado com sucesso!', 'remove')

//         }
//     });

//     function verifiedList() {
//         if(lista.childElementCount < 2) {
//             filterInput.style.display = 'none';
//         } else {
//             filterInput.style.display = 'block';
//         }
//     }

//     function CreateText(item) {
//         const text = document.createTextNode(item);
//         return text;
//     } 

//     function CreateItem(item) {

//         const li = document.createElement('li');
//         const button = document.createElement('button');
        
//         button.className = 'remove-item';

//         button.innerHTML = '<i class="fa-solid fa-xmark"></i>';

//         li.appendChild(CreateText(item));
//         li.appendChild(button);

//         return li;
//     }


//     function showMsg(text, type) {
//         const msg = document.querySelector('.msg');

//         msg.textContent = text;
//         msg.classList.add(type);

//         msg.classList.add('active');

//         if(timeOutId) {
//             clearTimeout(timeOutId);
//         }

//         timeOutId = setTimeout(() => {
//             msg.classList.remove('active');
//             setTimeout(() => {
//                 msg.classList.remove(type);
//             }, 500);
//         }, 2000);
//     }


//     function clearALL() {
//         lista.innerHTML = '';

//      verifiedList() 
//     verifiedFilter();
//     toogleClearButton(); 

//         showMsg('Todos os items apagados com sucesso', 'clear')
//     }

//     clear.addEventListener('click', clearALL)

//     function toogleClearButton() {
//         if (lista.children.length > 1) {
//             clear.style.display = 'block';
//         } else {
//             clear.style.display = 'none';
//         }
//     }

//     function verifiedFilter() {
//         if(filterInput.value == '') {
//             clear.style.display = 'block'
//         } else {
//             clear.style.display = 'none'
//         }
//     }
    
//     verifiedList() 
//     verifiedFilter();
//     toogleClearButton(); 

// });

// // div.className = 'my-element';
// // div.id = 'my-element';
// // // button.setAttribute('type', 'submit');
// // button.className = 'remove-item'
// // button.innerHTML =  '<i class="fa-solid fa-xmark"></i>';
// // // div.innerText = 'hello world!';

// // const text = document.createTextNode('Orange Juice');

// // li.appendChild(text);
// // li.appendChild(button);

// // list.prepend(li);

// // console.log(li.outerHTML);;
