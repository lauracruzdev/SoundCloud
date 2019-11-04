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
    });
    return promesa;
}


function pulsaBuscar(){
    
    let contenidoBusqueda = document.getElementById("input").value;
    console.log(contenidoBusqueda);
    
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
        console.log(infoContenido[i]);
    }




    //pinto los resultados
    document.getElementById("contenido").innerHTML = infoContenido;


}
