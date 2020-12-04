import { setCookie, getCookie } from "./cookies.js";
import { Model } from './model.js';

(() => {
    "use strict";

window.addEventListener("load", () => {
    console.log(getCookie("username"));
    if (getCookie("username"))
        inicio();
    else {
        login();
    }
    document.getElementById("home").addEventListener("click", () => {
        inicio();
    })

});



/* FUNCIÓN PARA VALIDAR USUARIO Y PODER ENTRAR A LA PAGINA */
async function validacion() {
    let user = document.getElementById("username").value;
    let password = document.getElementById("password").value;


    if (user == 'david' && password == '123') {
        await loading();
        setCookie("username", user, 365);
        inicio();

    } else {
        alert('Usuario o contraseña incorrectos');
    }
}

// FUNCION QUE ELIMINA LAS COOKIES DEL USUARIO LOGUEADO PARA CERRAR SESIÓN
function logout() {

    setCookie("username", 'user', -1);
    console.log(getCookie("username"));
    login();
}


// FUNCION CON PROMESA PARA CARGAR UN LOADING DURANTE X TIEMPO UNA VEZ LE DAS AL BOTÓN DE LOGIN
function loading() {
    return new Promise((resolve) => {
        document.getElementById("content").innerHTML = `<div class="loader">
            <div class="loader-inner">
                <div class="loader-line-wrap">
                    <div class="loader-line"></div>
                </div>
                <div class="loader-line-wrap">
                    <div class="loader-line"></div>
                </div>
                <div class="loader-line-wrap">
                    <div class="loader-line"></div>
                </div>
                <div class="loader-line-wrap">
                    <div class="loader-line"></div>
                </div>
                <div class="loader-line-wrap">
                    <div class="loader-line"></div>
                </div>
            </div>
        </div>`;

        setTimeout(() => { document.getElementsByClassName('loader')[0].remove(); resolve() }, 2000)
    })

}

// FUNCIÓN QUE SE INICIA AL CARGAR LA PÁGINA
function login() {



    document.getElementById("content").innerHTML = `<section class="section2">
       <div class="box">
           <div class="form">
               <h3>Login</h3>
               <form>
                   <div class="inputBx">
                       <input type="text" placeholder="Username" id="username">
                       <img  src="./img/login/user.png" class="imglogin">
                   </div>
                   <div class="inputBx">
                       <input type="password"
                       placeholder="Password" id="password">
                       <img src="./img/login/lock.png" class="imglogin">
                   </div>
                   <label class="remember"><input type="checkbox">Remember me</label>

                   <div class="inputBx">
                       <input id="botonl" type="submit" value="Login">
                   </div>
               </form>
               <p class="plogin">Forget <a class="alogin"  href="#">Password</a></p>
               <p class="plogin">Need an <a class="alogin" href="#">account</a></p>
           </div>
       </div>


   </section>`;



    // BOTÓN "Login" funcional, que nos carga la página
    let botonlogin = document.getElementById("botonl");
    botonlogin.addEventListener('click', validacion);


}




// PAGINA PRINCIPAL
function inicio() {
    document.getElementById("content").innerHTML = `<div id="switch">
                                    <label class="cambiaTema" for="checkbox">
                                        <input type="checkbox" id="checkbox" />
                                       <div class="slider round"> 
                                        <div class="fas fa-moon"></div>
                                        <div class="fas fa-sun"></div>
                                        </div>
                                    </label>
                                    
                                </div>

                                <section>
                                    <div class="heading">
                                        <h1> CHAMPIONS  <b> LEAGUE </b></h1>
                                        <p>El torneo de fútbol más importante del año</p>
                                        <a id="login" href="#" class="btn-primary">Suscríbete para no perderte <b> ningún partido</b></a>
                                    </div>
                                </section>
                                `;
    darkMode();


    // BOTÓN PARA IR AL LOGIN
    let botonlogin = document.querySelector("#login");
    botonlogin.addEventListener('click', () => login());

    // BOTÓN PARA CERRAR SESIÓN 
    let botonlogout = document.querySelector("#logout");
    botonlogout.addEventListener('click', () => logout());


    // BOTÓN PARA IR A LA PÁGINA DE PARTIDOS
    let botonpartidos = document.querySelector("#partidos");
    botonpartidos.addEventListener('click', () => partidos());

    // BOTÓN PARA IR A LA PÁGINA DE CLASIFICACIÓN
    let botonclasi = document.querySelector("#clasi");
    botonclasi.addEventListener('click', () => clasificacion());


    // BOTÓN PARA IR A LA PÁGINA DE TOP JUGADORES
    let botontop = document.querySelector("#toplayers");
    botontop.addEventListener('click', () => topjugadores());


}


//FUNCIÓN CON ARRAY PARA QUE NO REPITA EL MISMO EQUIPO VARIAS VECES
function repetido(array, numero) {
    for (let i = 0; i < array.length; i++) {
        if (numero == array[i]) {
            return false;
        }
    }
    return true;
}
//FUNCIÓN QUE ME GENERA EQUIPOS ALEATORIOS PARA LA FUNCIOÓN PARTIDOS, APOYADA POR LA FUNCIÓN REPETIDO
function matchmaking(datos) {
    let array = [];
    let contador = 0;

    while (array.length < datos) {
        let num = Math.floor(Math.random() * (datos - 0) + 0);

        if (repetido(array, num)) {
            array[contador] = num;
            contador++;
        }
    }

    return array;
}


/* FUNCIÓN PARA LA PÁGINA DE PARTIDOS, GENERA TODOS LOS EQUIPOS DEL 
   MATCHES.JSON Y LOS EMPAREJA UNOS CONTRA OTROS.
*/
async function partidos() {
    document.getElementById("content").innerHTML = "";

    await fetch('/json/matches.json')
        .then(response => response.json())
        .then(data => {
            let partidos = matchmaking(data.length);
            let teamsxd = ``;
            teamsxd += `<div class="containermatches">`;
            for (let index = 0; index < partidos.length; index++) {

                const element = data[partidos[index]];
                const element2 = data[partidos[index + 1]];

                teamsxd += `
                <div class="match">
                <div class="match-header">
                    <div class="match-status">Live</div>
                </div>
                <div class="match-content">
                    <div class="column">
                        <div class="team team--home">
                            <div class="team-logo">
                                <img src="`+ element.photo + `" width="100px" />
                            </div>
                            <h2 class="team-name">`+ element.name + `</h2>
                        </div>
                    </div>
                    <div class="column">
                        <div class="match-details">
                            <div class="match-date">
                                12 Aug at <strong>19:00</strong>
                            </div>
                            <div class="match-score">
                                <span class="leading">`+ element.goals + `</span>
                                <span class="match-score-divider">:</span>
                                <span class="match-score-number">`+ element2.goals + `</span>
                            </div>
                            <div class="match-time-lapsed">
                                72'
                            </div>
                            <div class="match-referee">
                                Estadio: <strong>`+element.field+`</strong>
                            </div>
                        </div>
                    </div>
                    <div class="column">
                        <div class="team team--away">
                            <div class="team-logo">
                                <img src="`+ element2.photo + `" width="100px" />
                            </div>
                            <h2 class="team-name">`+ element2.name + `</h2>
                        </div>
                    </div>
                </div>
            </div>
            `
                index++;
            }
            teamsxd += `</div>`
            document.getElementById("content").innerHTML = teamsxd;
            let boton = document.querySelector("#home");
            boton.addEventListener('click', () => inicio());

        });


}

class Jugador extends Model {
    constructor(id, name, team, photo, goals) {
        super(`${url}./json/playertop.json`, id)
    this.id = id;
    this.name = name;
    this.team = team;
    this.photo = photo;
    this.goals = goals;

    }
}


/* FUNCIÓN PARA LA PÁGINA DE TOP JUGADORES DONDE ME CARGARÁ LA LISTA DE 
    JUGADORES QUE SE ENCUENTRA EN PLAYERTOP.JSON
*/
async function topjugadores() {
    document.getElementById("content").innerHTML = "";

    
    await fetch('/json/playertop.json')
        .then(response => response.json())
        .then(data => {


            let tops = "<div class=\"bodytop\">";
            for (let index = 0; index < data.length; index++) {
                const element = data[index];


                tops += `
              
                <div class="box2">
                <div class="play"></div>
                <div class="play1"></div>
                    <div class="imgBox">
                        <img src="`+ element.photo + `">
                    </div>
                    <div class="contentplayerstop">
                        <h2 class="names">`+ element.name + `<br><span>` + element.team + `</span><br><span>Goles: ` + element.goals + `</span></h2>
                    </div>
                </div>
                `;

            }
            tops += "</div>";
            document.getElementById("content").innerHTML = tops;
        })


}

/* FUNCIÓN USANDO XMLhttpRequest PARA CARGAR UNA TABLA DE CLASIFICACIÓN DE LOS EQUIPOS
    DATOS CARGADOS DEL FICHERO clas.json
*/

function clasificacion() {
    document.getElementById("content").innerHTML = "";
    const xhttp = new XMLHttpRequest();

    xhttp.open('GET', '/json/clasi.json', true);

    xhttp.send();

    xhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            //console.log(this.responseText);
            let datos = JSON.parse(this.responseText);
            //console.log(datos);
            let containerclasi = document.querySelector('#content');

            let allclasi = ` 
            <table class="containerclasi">
	        <thead class="theadclasi">
		    <tr class="tr clasi">
            <th class="thclasi"><h1 class="h1clasi">Equipo</h1></th>
            <th class="thclasi"><h1 class="h1clasi">Liga</h1></th>
            <th class="thclasi"><h1 class="h1clasi">Partidos jugados</h1></th>
            <th class="thclasi"><h1 class="h1clasi">Partidos ganados</h1></th>
            <th class="thclasi"><h1 class="h1clasi">Partidos perdidos</h1></th>

        </tr>
        </thead>
            `;

            for (let element of datos) {
                //console.log(element);
                allclasi += `
              
       
        
                <tbody class="tbodyclasi">
                <tr class="tr clasi">
                    <td class="tdclasi">${element.name}</td>
                    <td class="tdclasi">${element.league}</td>
                    <td class="tdclasi">${element.games}</td>
                    <td class="tdclasi">${element.wins}</td>
                    <td class="tdclasi">${element.lose}</td>
                </tr>
                </tbody>
    
        
                
                `;


            } allclasi += `</table>`;
            containerclasi.innerHTML = allclasi;
        }
    }
}





// BOTON QUE HACE CAMBIAR A MODO OSCURO ELEMENTOS SELECCIONADOS POR MI EN EL CSS
function darkMode() {
    const colorSwitch = document.querySelector('.cambiaTema input[type="checkbox"]');

    function switchColor(e) {
        if (e.target.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
        }
        else {
            document.documentElement.setAttribute('data-theme', 'light');
        }
    }
    colorSwitch.addEventListener('change', switchColor, false);
}



})();

