
var fila="<tr id=''><td class='id'></td><td class='foto'></td><td class='price'></td><td class='title'></td><td class='description'></td><td class='category'></td><td class='action'></td></tr>";
var productos=null;
function codigoCat(catstr) {
var code="null";
switch(catstr) {
   case "electronicos":code="c1";break;
   case "joyeria":code="c2";break;
   case "caballeros":code="c3";break;
   case "damas":code="c4";break;
}
return code;
}   
var orden=0;


function listarProductos(productos) {
 var precio=document.getElementById("price"); 
 precio.setAttribute("onclick", "orden*=-1;listarProductos(productos);");
 var num=productos.length;
 var listado=document.getElementById("listado");
 var ids,titles,prices,descriptions,categories,fotos,action;
 var tbody=document.getElementById("tbody"),nfila=0;
 tbody.innerHTML="";
 var catcode;
 for(i=0;i<num;i++) tbody.innerHTML+=fila;
 var tr; 
 ids=document.getElementsByClassName("id");
 titles=document.getElementsByClassName("title");
 descriptions=document.getElementsByClassName("description");
 categories=document.getElementsByClassName("category");   
 fotos=document.getElementsByClassName("foto");   
 prices=document.getElementsByClassName("price");
 action=document.getElementsByClassName("action");

 if(orden===0) {orden=-1;precio.innerHTML="Precio"}
 else
	if(orden==1) {ordenarAsc(productos,"price");precio.innerHTML="Precio A";precio.style.color="darkgreen"}
	else 
	  if(orden==-1) {ordenarDesc(productos,"price");precio.innerHTML="Precio D";precio.style.color="blue"}

	 
	   listado.style.display="block";
 for(nfila=0;nfila<num;nfila++) {
   ids[nfila].innerHTML=productos[nfila].id;
   titles[nfila].innerHTML=productos[nfila].title;
   descriptions[nfila].innerHTML=productos[nfila].description;
   categories[nfila].innerHTML=productos[nfila].category;
   catcode=codigoCat(productos[nfila].category);
   tr=categories[nfila].parentElement;
   tr.setAttribute("class",catcode);
   tr.setAttribute("id","fila"+productos[nfila].id)
   prices[nfila].innerHTML="$"+productos[nfila].price;
   fotos[nfila].innerHTML="<img src='"+productos[nfila].image+"'>";
   fotos[nfila].firstChild.setAttribute("onclick","window.open('"+productos[nfila].image+"');" );
   action[nfila].innerHTML="<button class='boton'>Eliminar</button>";
   action[nfila].firstChild.setAttribute("onclick","eliminarProducto("+productos[nfila].id+")" );
 }
}

function obtenerProductos() {
 fetch('https://retoolapi.dev/192tEl/productos')
	   .then(res=>res.json())
	   .then(data=>{productos=data;listarProductos(data)})
}

function ordenarDesc(p_array_json, p_key) {
p_array_json.sort(function (a, b) {
 if(a[p_key] > b[p_key]) return -1;
if(a[p_key] < b[p_key]) return 1;
return 0;
});
}

function ordenarAsc(p_array_json, p_key) {
p_array_json.sort(function (a, b) {
 if(a[p_key] > b[p_key]) return 1;
if(a[p_key] < b[p_key]) return -1;
return 0;
});
}

function agregarProducto(){
var identificador = Math.floor(Math.random()*101)
var titulo =document.getElementById("txtTitulo").value;
var precio =document.getElementById("txtPrecio").value;
var descripcion=document.getElementById("txtDescripcion").value;
var imagen=document.getElementById("txtImagen").value;
var categoria=document.getElementById("txtCategoria").value;

var miProducto = {id:identificador,image:imagen,price:precio,title:titulo,category:categoria, description:descripcion,};
//var miProducto={image:"imagen",title:"camiseta simple",description:"camiseta talla xl",category:"caballeros"}
var addresult;
fetch("https://retoolapi.dev/192tEl/productos",
{ method:"POST",
 body: JSON.stringify(miProducto),
 headers: {
'Accept': 'application/json',
'Content-type': 'application/json; charset=UTF-8',
 }}).then(response=>response.json()).then(data=>addresult=data);

 location.reload();
 obtenerProductos();
}
var fila;

function eliminarProducto(fila){
var delresult;

fetch('https://retoolapi.dev/192tEl/productos/'+fila,{method:"DELETE"}).then(response=>response.json()).then(data=>delresult=data);
location.reload();
obtenerProductos();
}