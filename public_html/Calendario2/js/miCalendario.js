//Creo la variable fecha para poder tener la fehca actual y trabajar a partir de un dia.

var fecha=new Date();
var cuerpo=document.getElementById("Cuerpo");
var dia=0;
var dias=['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
var mes=fecha.getMonth()+1;
var anio=fecha.getFullYear();
var meses=['','Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];



function init(){
    mensajeAlerta();
    PintarCalendario(mes);
}

function pintar(){

    //funcion de prueba para ver como trabajan algunos componentes
    document.getElementById("Cuerpo").innerText= "hola";
    document.getElementById("Cuerpo").innerText= ultimoDiaMes;
}


function pintarTabla2(anioP,mesP)
{
    var verPrimerDia=new Date(anioP,mesP-1,1);
    var verUltimoDia=new Date(anioP,mesP,0);
    var primerDia=(verPrimerDia.getDay()==0)?7:verPrimerDia.getDay();
    var ultimoDia=verUltimoDia.getDate();
    var fecha2=new Date(anioP,mesP,0,0,0,0,0);

    //fecha2.setFullYear(anioP);
    //fecha2.setMonth(mesP);

    var ulitmoCuadro=primerDia+ultimoDia;



    var tabla=document.getElementById("Calendario");
    var fila=document.createElement("tr");

    for(var i=1;i<43;i++)
    {
        if(i==primerDia)

		{

			// determinamos en que dia empieza

			dia=1;

		}

		if(i<primerDia || i>=ulitmoCuadro)

		{
			// celda vacia
                      
            var celda=document.createElement("td");
            celda.innerHTML="&nbsp;";
            fila.appendChild(celda);
            tabla.appendChild(fila);
            

		}else{

			// se muestran los dias

			if(dia==fecha.getDate() && mesP==fecha.getMonth()+1 && anioP==fecha.getFullYear()){

                    //añade la id hoy al dia actual en el que estamos          
                var celda=document.createElement("td");
                celda.setAttribute("id","hoy");
                celda.setAttribute("onclick", "fechaSeleccionada()");
                celda.setAttribute("class","dia");
                //celda.onclick=fechaSeleccionada();
                var texto=document.createTextNode(dia);
                celda.appendChild(texto);
                fila.appendChild(celda);
                tabla.appendChild(fila);
                

            }else{

                //si el dia no es hoy crea la id normalDay para darle otro formato diferente
                var celda=document.createElement("td");
                celda.setAttribute("id","normalDay");
                celda.setAttribute("onclick", "fechaSeleccionada()");
                celda.setAttribute("class","dia");
                //celda.onclick=fechaSeleccionada();
                var texto=document.createTextNode(dia);
                if(i%7==0){ 
                    celda.setAttribute("id","Festivo"); //Añade la id festivo a los domingos.

                    celda.setAttribute("class","dia");
                }

                
                celda.appendChild(texto);
                fila.appendChild(celda);
                tabla.appendChild(fila);
                
            }
			dia++;

		}
       
		if(i%7==0)

		{

			if(dia>ultimoDia)

				break;

                var fila=document.createElement("tr");
                tabla.appendChild(fila);

        }
    }
}

//pinta el mes que se tenga seleccionado
function pintarMes(mesP)
{

    var TextoMeses=document.getElementById("Mes");
    TextoMeses.innerHTML=meses[mesP];

}
//pinta el año que se tenga seleccionado 
function pintarAnio(anioP)
{
    var TextoAnio=document.getElementById("Anio");
    TextoAnio.innerHTML="&nbsp;"+anioP;
}

function pintarDias(){

    var tabla=document.getElementById("Calendario");
    

    var fila=document.createElement("tr");
    for(i=0;i<dias.length;i++)
    {
        var celda=document.createElement("th");
        var texto=document.createTextNode(dias[i]);
        celda.setAttribute("id","dias");
        
        if(dias[i]=="Dom"){
            celda.setAttribute("id","Domingo");
        }
        celda.appendChild(texto);
        fila.appendChild(celda);
        tabla.appendChild(fila);
    }
}

//Funcion principal que se encarga de llamar a las funciones necesarias para pintar el calendario completo
function PintarCalendario()
{
    
    pintarMes(mes);
    pintarAnio(anio);
    pintarDias();
    pintarTabla2(anio,mes);
}

//funcion para retroceder en los meses
function mesMenos()
{
    
    
    LimpiarPantalla();
    
   
   if(mes<0)
    {
        mes=11;
        anio=anio-1;
        PintarCalendario()
    }else{
        mes=mes-1;
        PintarCalendario()
    }
    
    
}

//Funcion para aumentar el mes
function mesMas()
{
    
    
    LimpiarPantalla();
    if(mes>11){
        mes=0;
        anio=anio+1;
        PintarCalendario();
    }else{
        mes=mes+1
        PintarCalendario();
    }
    
    
}

//Funcion para decrecer el numero del año
function anioMenos()
{
    anio=anio-1;
    LimpiarPantalla();
    PintarCalendario();
}

//Funcion para el boton de avanzar años
function anioMas()
{
    
    anio=anio+1;
    LimpiarPantalla();
    PintarCalendario();
}

//Limpia la pantalla borrando la tabla 
function LimpiarPantalla()
{
    var tabla=document.getElementById("Calendario");
    tabla.innerHTML="";
}

//Funcion para mostrar en el calendario la fecha actual
function FechaActual()
{
    LimpiarPantalla();
    anio=fecha.getFullYear();
    mes=fecha.getMonth()+1;
    PintarCalendario();
}


//Funcion que muestra un dia seleccionado de la tabla
function fechaSeleccionada()
{
    var elemento=document.getElementById("fechaSeleccionada");
    var diaSel1=document.getElementsByTagName("td");
    var diaSel2=diaSel1.innerHTML;
    var mesSel=mes;
    var anioSel=anio;
    elemento.innerHTML=diaSel2+"&nbsp;/"+meses[mesSel]+"&nbsp;/"+anioSel;
}

function mensajeAlerta(){
    alert("Errores conocidos:          "+ 
    "1-Al avanzar de diciembre a enero o enero a diciembre no muestra correctamente los nombres de los meses aunque si muestra el calendario correctamente               "+
    "2-No he podio hacer que muestre los ultimos dias del mes anterior y los primeros dias del mes siguiente en los cuadros que no corresponden al mes seleccionado      "+
    "3-Al seleccionar un dia de la tabla solo muestra mes y año,no consigo hacer que muestre el contenido de la celda")    
}












