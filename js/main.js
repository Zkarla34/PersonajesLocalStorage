class Personaje {
    jsonPersonaje = {
        nombrep: '',
        saga: '',
        manga: ''
    }

    constructor(formName, formFields) {
        this.formName = formName;
        this.jsonFields = formFields
    }
    //Crear nuevo personaje
    create = () => {
        let newPersonaje = this.personajeDetails()
        let currentData = this.read() || []
        let finalData = [...currentData, newPersonaje]
        localStorage.setItem(DB_NAME, JSON.stringify(finalData))
        this.refreshData()
    }
    //Lectura de personajes
    read = () => JSON.parse(localStorage.getItem(DB_NAME));

    //Falta la función actualizar
    update = (personajeIndex, personajeEdited) =>
    {
        personajeIndex = Number(personajeIndex.replace('btnConfirm', ''))

        personajeEdited = Object.keys(this.jsonPersonaje).map((item, i) => this.jsonPersonaje[item] = personajeEdited[i])
        console.log('this.jsonPersonaje', this.jsonPersonaje);

        let listaPersonaje = this.read();
        listaPersonaje[personajeIndex] = this.jsonPersonaje
        localStorage.setItem(DB_NAME, JSON.stringify(listaPersonaje))
        this.refreshData();  
    }  
    //Obtener información de los inputs
    personajeDetails = () => {
        return {
            /*nombrep: document.Personaje.nombrep.value, 
            saga: document.Personaje.saga.value,
            manga: document.Personaje.manga.value,*/
            nombrep: document[this.formName][this.jsonFields.nombrep].value,
            saga: document[this.formName][this.jsonFields.saga].value,
            manga: document[this.formName][this.jsonFields.manga].value,
        }
    }
    //Borrar personaje
    delete = (personajeIndex) => {

      //  personajeIndex = Number(personajeIndex.replace('personaje', ''))
        let listaPersonaje = this.read();
        listaPersonaje.splice(personajeIndex, 1)

        localStorage.setItem(DB_NAME, JSON.stringify(listaPersonaje))
        this.refreshData();
    }

    refreshData = () => {
        let listaPersonaje = this.read();
        listaPersonaje = listaPersonaje.map((obj, i) => `
            <tr>
                <td>${i + 1}</td>
                <td>${obj.nombrep}</td>
                <td>${obj.saga}</td>
                <td>${obj.manga}</td>
                <td class="">
                <button type="button" id="btnEdit${i}" onclick="objetoPersonaje.update('${i}')" name="btn-edit"class="btn btn-primary btn-sm" data-toggle="modal" data-target="#modalpersonaje" >Editar</button>
                <button type="button" id="btnDelete${i}" onclick="objetoPersonaje.delete('${i}')"  name="btn-delete" class="btn btn-danger btn-sm"><i class="fa fa-trash text-dark" aria-hidden="true"></i>Eliminar</button>
                </td>
                
            </tr>`)

        document.getElementById('tableBody').innerHTML = listaPersonaje.join(' ');
    }
}


/*const respuesta = () => 
{
    confirm("¿Seguro qué desea eliminar el personaje?");
        if(respuesta == true)
        {
            alert("Borrado")
            return true;
        }
        else
        {
            alert("Cancelado")
            return false;
        }
}*/
//console.log('objetoPersonaje.jsonProduct', objetoShoppingList.jsonProduct);
/*
const processClick = (element) => {
    const listButtons = ['btn-delete', 'btn-edit']
    const min = 1

    if(element.target.name == listButtons[0])
        objetoPersonaje.delete(element.target.id)

    if(element.target.name == listButtons[1] || element.target.parentElement.name == listButtons[1])
        let parentElement = element.target.parentElement
        let tdColActios = (parentElement.name == listButtons[1]) ? parentElement.parentElement : parentElement
        hideButtons(tdColActios, listButtons, 'block')

        let personajeId = tdColActios.querySelector('button[name="btn-edit"]').id.replace('btnEdit', '')
            tdColActios.innerHTML += createEditButtons(personajeId)

        let children = (parentElement.name == listButtons[1]) ? parentElement.parentElement.parentElement.children : parentElement.parentElement.children
        let childrenArray = [...children]

        childrenArray 
        .filter((item, i) => i => (min) && i <= (childrenArray.length - 2))
        .map((item) => item.innerHTML =  `<input value="${item.textContent}">`)
}

if(element.target.name == 'btnConfirm')
{
    let childrenArray = [...element.target.parentElement.parentElement.children]
    let personajeEdited = childrenArray
        .filter((item, i) => i >= (min) && i <= (childrenArray.length - 2))
        .map((item) => item.children[0].value)

        objetoPersonaje.update(element.target.id, personajeEdited)
        console.log('personajeEdited', personajeEdited);
}

const toggleButtons = (parentElement, listButtons, display = 'none') =>
{
    listButtons.map((item) => parentElement.querySelector(`[name="${item}"] `).style.display = display || 'block')
}

const createEditButtons = (personajeId) =>  `
<button type="button" class="btn btn-primary" name="btnConfirm" id="btnConfirm${personajeId}">Confirmar</button>
<button type="button" class="btn btn-danger" name="btnCancel" id="btnCancel${personajeId}">Cancelar</button>`

document.formTable.addEventListener("click", processClick)
*/
const DB_NAME = "dragonball"
const formName = 'Personaje'
const formFields = {
    nombrep: "nombrep",
    saga: "saga",
    manga: "manga"
}
const objetoPersonaje = new Personaje(formName, formFields);
objetoPersonaje.refreshData()
console.log('objetoPersonaje.jsonPersonaje', objetoPersonaje.jsonPersonaje);
//personaje.create(personajeDetails());


/*const formName = 'formProduct'
const formFields = {
    name: "productName",
    quantity: "productQuantity",
    price: "productPrice",
    boughtAt: "boughtAt"
}*/
