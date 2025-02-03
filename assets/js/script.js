const boxTheme = document.querySelector('.box-theme');
const body = document.body;
const filter = document.querySelector('.filter-input');
const clear = document.querySelector('#clear');
const msg = document.querySelector('.msg');
const list = document.querySelector('.list-items');
const items = list.getElementsByTagName('li');
const clearFilter = document.querySelector('.clear-filter');
const form = document.querySelector('#form');
const itemInput = document.querySelector('#item-input');

let timeOutId;

const savedTheme = localStorage.getItem('theme');

console.log(savedTheme);

if(savedTheme === 'dark') {
    if (savedTheme === 'dark') {
        document.body.classList.add('dark');
    } else {
        // Caso contrário, garante que o tema light seja aplicado
        document.body.classList.remove('dark');
    }
}


form.addEventListener('submit', (e) => {
    e.preventDefault();

    const item = itemInput.value;

    if(item.trim() != '') {
        showMsg('Item adicionado com sucesso!', 'ok');
        
        list.prepend(createItem(item));

        itemInput.value = '';
        
        itemInput.focus();
        
        verifiedFilter();
        verifiedList();
        clearFil();
    } else {
        showMsg('Não foi possivel adicionar', 'erro');
    }
});


// dark mode
boxTheme.addEventListener('click', (e) => {
    body.classList.toggle('dark');

    if (body.classList.contains('dark')) {
        boxTheme.innerHTML = `<img src="./assets/img/sun-regular.svg" alt="">`;
        localStorage.setItem('theme', 'dark'); // Salva o modo dark
    } else {
        boxTheme.innerHTML = `<img src="./assets/img/moon.png" alt="">`;
        localStorage.setItem('theme', ''); // Salva o modo light
    }
});

list.addEventListener('click', (e) => {
    if(e.target && e.target.closest('button').classList.contains('remove-item')) {
        const listItem = e.target.closest('li');

        listItem ? listItem.remove() : null;    
        showMsg('Item apagado com sucesso!', 'ok');

    }
    
    clearFil();
    verifiedList();
    verifiedFilter();
});

// clear
clear.addEventListener('click', () => {
    list.replaceChildren();

    showMsg('Todos os items foram apagados com sucesso!!!', 'ok');
    verifiedList();
});

// filtro
filter.addEventListener('input', () => {
    const filterText = filter.value.toLowerCase();

    Array.from(items).forEach(item => {
        const itemText = item.textContent.toLowerCase();

        if (itemText.includes(filterText)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });

    verifiedFilter();
});


// limpeza do filtro
clearFilter.addEventListener('click', (e) => {
    
    clearFil();
    verifiedFilter();
});


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

function clearFil() {
    filter.value = '';
        
    Array.from(items).forEach(item => {
        item.style.display = 'flex';
    });

}

function showMsg(content, type) {

    msg.textContent = content;
    msg.classList.add(type);

    msg.classList.add('active');

    if(timeOutId) {
        clearTimeout(timeOutId);
    }
    
    timeOutId = setTimeout(() => {
        msg.classList.remove('active');
        setTimeout(() => {
            msg.classList.remove(type);
        }, 500);
    }, 2000);
}

function verifiedList() {
    if (list.children.length > 1) {
        clear.style.display = 'block';
        filter.style.display = 'block';
    } else {
        clear.style.display = 'none';
        filter.style.display = 'none';
    }
}



function verifiedFilter() {
    if (filter.value !== '' && list.children.length > 1) {
        clearFilter.style.display = 'block';
    } else {
        clearFilter.style.display = 'none';
    }
}

verifiedList();
verifiedFilter(filter);


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
