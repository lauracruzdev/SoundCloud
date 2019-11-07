async function buscar(busqueda){
 
//quita los espacios antes y despues de cuando ponen los datos 

    busqueda = busqueda.trim(); 

// inicializa el cliente con la id

    SC.initialize({
        client_id: 'aa06b0630e34d6055f9c6f8beb8e02eb',
    });

// trae cosas
    let promesa = SC.get('/tracks', {
        q: busqueda,
        limit: 10
        
    });
    return promesa;
}


function pulsaBuscar(){
    
    let contenidoBusqueda = document.getElementById("input").value;
    
    
    buscar(contenidoBusqueda)
    .then( function(respuesta){
        muestraTracks(respuesta);   
    })
}

function muestraTracks(infoContenido){

    //limpia los resultados de la busqueda
    document.getElementById("contenido").innerHTML = "";

    let cantidad = infoContenido.length
    let maxIndice = cantidad - 1;

    //Recorro la array de infocontenido
    for (let i = 0; i < maxIndice; i++){
        let track = infoContenido[i];
        let portada = track.artwork_url ? track.artwork_url : "/img/NOTA.png";

        let fecha = new Date(track.created_at);
        let year = fecha.getFullYear();

        let nodo = createNode(`<div class="cajaTrack">
            <img class="imagen" src="${portada}" alt="" onclick="load(${track.id})" draggable="true">
            <p class="titulo">${track.title}</p>
            <p class="autor">${track.user.username}</p>
            <p class="fecha">${year}</p>
        </div>`);

        nodo.addEventListener("dragstart", function(event){
            dragStart(event, track.id)
        })

        document.getElementById("contenido").appendChild(nodo);


    } 
    

    
}

function allowDrop(ev) {
    ev.preventDefault();
    
}

function dragStart(ev, idTrack){
    ev.dataTransfer.setData("idTrack", idTrack);
    
}


function drop(ev) {
    ev.preventDefault();
    let data = ev.dataTransfer.getData("idTrack");
    load(data);
   
}

function createNode(str){

    let padre = document.createElement("div");
    padre.innerHTML = str;
    
    return padre.firstChild;
}

function load(idTrack){

    document.getElementById("reproductor").src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/" + idTrack;

}





