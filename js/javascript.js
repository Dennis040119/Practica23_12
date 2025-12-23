'use strict';

//var URL = 'http://localhost:3000/servidores';
var URL = 'https://694a4f2f1282f890d2d842da.mockapi.io/servidores'

var presupuesto=0


$(function () {
    crearTarjeta();
    totalizar();
});


function totalizar(){
    document.getElementById("presupuesto").textContent="Total: "+presupuesto+" €"
}
/////////////////
    

function total() {

    console.log("funcion total")
    var ram=0
    var cpu=0
    var almacenamiento=0

    if($('#cpu').val()=="Intel i3"){cpu=200}
    if($('#cpu').val()=="AMD 7"){cpu=250}
    if($('#cpu').val()=="Intel i9"){cpu=300}

    ram=$('#ram').val()*30

    if($('#alm').val()=="250 Gb"){almacenamiento=100}
    if($('#alm').val()=="500 Gb"){almacenamiento=150}
    if($('#alm').val()=="1 TB"){almacenamiento=200}


    presupuesto=ram+cpu+almacenamiento
   
    totalizar();
  }


/////////////////








function limpiar() {
    
    const $id = $('.formulario') 
    $id.find('input').val('')
        
}

function crearTarjeta() { 

    console.log("creartarjeta funcion")


    $.getJSON(URL, function(aliens)
     {

        const $grid =$('.grid')
        $grid.empty()

        $.each(aliens, function () {

            const cardhtml  = document.createElement('article');

            cardhtml.className = `card ${this.peligrosidad}`.trim(); // aplica clase de color

            cardhtml.innerHTML=

                    '<div class="header">'+
                        '<h3>'+this.nombre +'</h3>'+
                        '<span class="badge"></div>'+

                    '<div class="meta">'+
                        '<div><b>CPU: </b>' +this.cpu+'</div>'+
                        '<div><b>Ram: </b>' +this.ram+'</div>'+
                        '<div><b>Almacenamiento: </b>' +this.almacenamiento+'</div></div>'+

                    '<div class="buttons">'+
                        '<a  onclick="borrar('+this.id+')">Borrar</a>'+
                    '</div>';


            $grid.append(cardhtml)
              
        

                
        });
    });
    return
}

function borrar(id) {

    console.log("Funcion borrar");

    if (!confirm('¿Estás seguro de que quieres borrar el producto id ' + id + '?')) {
        return;
    }

    $.ajax(URL+'/'+id,{method: 'DELETE'})
    .done(function(data,textStatus,jqXHR){
        console.log(textStatus);
        crearTarjeta()
        limpiar();
    })
    .fail(function (jqXHR,error,errorThrown) {
        console.log("Error al eliminar: "+error)
      })



  }

function editar(id){
    console.log("Funcion editar");

    $.getJSON(URL+"/"+id,function(servidores){

        console.log(servidores);
        //$('#id').val(servidores.id);
        $('#nombre').val(servidores.nombre);
        $('#cpu').val(servidores.cpu);
        $('#ram').val(servidores.ram);
        $('#alm').val(servidores.almacenamiento);
        total();

    }).fail(function(jqXHR,error,errorThrown){
        alert("Error al recibir datos")
        console.log(error)
    })

    
}



async function guardar () { 
     var servidor = {
        nombre: $('#nombre').val(),
        cpu: $('#cpu').val(),
        ram : $('#ram').val(),
        almacenamiento: $('#alm').val(),
    };

    if(presupuesto>=700){
        window.alert("El presupuesto no puede superar los 700 €")

    }else{

   

    var url, metodo;
    url = URL;
    metodo = 'POST';

    $.ajax(url, {
        method: metodo,
        headers: { 'content-type': 'application/json' },
        data: JSON.stringify(servidor),
    })
        .done(function (data) {
            console.log(data);
            crearTarjeta();
            limpiar();
            window.alert("Servidor creado correctamente")
        }).fail(function (jqXHR, error, errorThrown) {
            console.error(error);
        });


    
    }

  }

