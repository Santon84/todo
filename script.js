const conteriner1 = document.querySelector('#todo-main');

const addToDoButtonMain = document.querySelector('#add-todo-main');
const itemTemplate = document.querySelector('#todo-item-template');




const saveData = () => {

    localStorage.clear();
    const conteiners = document.querySelectorAll('.todo-items-conteiner');
    conteiners.forEach((conteiner,index) =>{
        localStorage.setItem('data-'+index, JSON.stringify(conteiner.innerHTML));

    });
console.log(localStorage);
   
}

const loadData = () => {
    

    const conteiners = document.querySelectorAll('.todo-items-conteiner');
    conteiners.forEach((conteiner,index) =>{
        
        conteiner.innerHTML = JSON.parse(localStorage.getItem('data-'+index));
    });
    
}


const clearAllData = () => {

    localStorage.clear();
    loadData();
}
addToDoButtonMain.addEventListener('click', function() {
    const title = 'Задайте имя новой задаче';
    const text = prompt(title, 'Новая задача');
    
    if (!text) {return} else {

    const itemNode = itemTemplate.cloneNode(true).content;
    const itemText = itemNode.querySelector('h3');
    
    itemText.innerText = text;
    
    

    
    


   conteriner1.appendChild(itemNode);
}
})

document.addEventListener('click', e =>{
  if (e.target.classList.contains('close-button')) {
    //console.log(e.target.parentNode.parentNode);
    e.target.parentNode.parentNode.removeChild(e.target.parentNode);
  
  }

})

// const addEventsDeleteItems = () =>{ 
    
// const deleteItem = document.querySelectorAll('.todo');
// console.log('items');
// console.log(deleteItem);
// deleteItem.forEach((item, index) => {
//         item.removeEventListener('click');
//         item.addEventListener('click', function(e) {
//             console.log(index);
//             if (e.target.classList.contains('close-button')) {
//               // setTimeout(() => e.target.parentNode.parentNode.removeChild(item), 10);
//               console.log('deleting');
//               console.log(item);
//               console.log(e.target.parentNode);
//               console.log(e.target.parentNode.parentNode);

              
                

//             }

//         })
// })
// }

// const addEventsDeleteItems = () =>{ 
//   const deleteItem = document.querySelectorAll('.close-button');
//   deleteItem.forEach(item => {
//     item.addEventListener('click', function() {
//       item.parentNode.parentNode.removeChild(item);
//     })
//   })

// }


// DRAG AND DROP


let dragged;






document.addEventListener("dragenter", event => {
    // highlight potential drop target when the draggable element enters it
    if (event.target.classList.contains("todo-items-conteiner") ) {
      event.target.classList.add("focused");
    }
    // if (event.target.classList.contains("todo")) {
    //   event.target.classList.add("focused");
      
    
      
    //   const box = event.target.getBoundingClientRect();
    //   const offset = event.clientY - box.top - box.height /2;
    //   console.log(offset);

      
    // }
  });


document.addEventListener("dragleave", event => {
    // highlight potential drop target when the draggable element enters it
    if (event.target.classList.contains("todo-items-conteiner") && !event.target.classList.contains("dragging")  ) {
      event.target.classList.remove("focused");

    }
    // if (event.target.classList.contains("todo")) {
    //   event.target.classList.remove("focused");
      
     
      
      
    
  });


document.addEventListener("drop", event => {
    // prevent default action (open as link for some elements)
    console.log('droping');
    event.preventDefault();
    
    // move dragged element to the selected drop target
    if (event.target.classList.contains("todo-items-conteiner") ) {
      console.log(event);
      event.target.classList.remove("focused");
      //dragged.parentNode.removeChild(dragged);
     // event.target.appendChild(dragged);
    }
    // if (event.target.classList.contains("todo") && !event.target.classList.contains("dragging") ) {
    //   event.target.classList.remove("focused");
    //   dragged.parentNode.removeChild(dragged);
    //   event.target.parentNode.insertBefore(dragged,event.target);
      
    // }
  });

  document.addEventListener("dragover", event => {
    // prevent default to allow drop
    event.preventDefault();
    if (event.target.classList.contains("todo-items-conteiner") && (dragged.parentNode != event.target)) {
      
      
      event.target.appendChild(dragged);
    } else 
    if (event.target.classList.contains("todo") && !event.target.classList.contains("dragging") ) {
      //event.target.classList.remove("focused");
      //dragged.parentNode.removeChild(dragged);
      const box = event.target.getBoundingClientRect();
      const offset = event.clientY - box.top - box.height /2;
      if (offset > 0) {
        event.target.parentNode.appendChild(dragged)
      } else 
      {
        event.target.parentNode.insertBefore(dragged,event.target);
      }
     
    }
  }, false);


  document.addEventListener("dragstart", event => {
    // store a ref. on the dragged elem
    dragged = event.target;
    // make it half transparent
    event.target.classList.add("dragging");


    if (event.target.classList.contains("todo")) {
      //event.target.classList.add("focused");
      
    
      
      // const box = event.target.getBoundingClientRect();
      // const offset = event.target.clientY - box.top - box.height /2;
      // console.log(offset);

      
    }
  });
  
  document.addEventListener("dragend", event => {
    // reset the transparency
    event.target.classList.remove("dragging");

  });


  //END OF DRAG AND DROP




  

  const autoLoad = document.querySelector('#autoload');

  autoLoad.addEventListener('change', function() {
    if (this.checked) {
      localStorage.setItem('autoload', true);
    } else {
      localStorage.setItem('autoload', false);
    }
    
  })


  function onLoadCheck() {
    
    //addEventsDeleteItems();
    const isChecked = JSON.parse(localStorage.getItem('autoload'));
    if (isChecked) {
      autoLoad.checked = true;
      loadData();
      
    }


  }