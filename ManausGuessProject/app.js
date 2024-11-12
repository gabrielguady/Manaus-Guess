// guarda as localizaçoes npre selecionadas com latitude,longitude e nome do lugar
var locations = [
    [{lat: -3.082479470904484, lng: -60.02828762665496}, {place: "Arena da amazônia"}],
    [{lat: -3.1297455531401046, lng: -60.02360985452961}, {place: "Teatro Amazonas"}],
    [{lat: -3.103999, lng: -60.044472}, {place: "Zoo Cigs"}],
    [{lat: -3.096492392123113, lng: -59.98760388009436}, {place: "INPA"}],
    [{lat: -3.083636507945969, lng: -60.00871822956397}, {place: "CSU"}],
    [{lat: -3.085055, lng: -60.073037}, {place: "Shopping Ponta Negra"}],
    [{lat: -3.134199346881697, lng: -60.017438276988344}, {place: "Palacio do Rio Negro"}],
    [{lat: -3.101848, lng: -60.013767}, {place: "Hospital 28 de Agosto"}],
    [{lat: -3.083616, lng: -60.022828}, {place: "Mirage Park"}],
    [{lat: -3.136773, lng: -60.025765}, {place: "Porto de Manaus"}],
    [{lat: -3.134381, lng: -60.028488}, {place: "Museu da Cidade de Manaus"}],
    [{lat: -3.101378, lng: -60.026617}, {place: "Parque dos Bilhares"}],
    [{lat: -3.100934, lng: -60.024175}, {place: "Millenium Shopping"}],
    [{lat: -3.098407, lng: -60.019154}, {place: "Parque do Idoso"}],
    [{lat: -3.097118, lng: -60.013344}, {place: "Donna Pizza"}],
    [{lat: -3.066103, lng: -60.011875}, {place: "Na lenha"}],
    [{lat: -3.074777, lng: -59.962671}, {place: "Hospital João Lúcio"}],
    [{lat: -3.103637, lng: -60.013625}, {place: "Manauara Shopping"}],
    [{lat: -3.103637, lng: -60.009642}, {place: "OAB Ordem dos Advogados"}],
    [{lat: -3.078044, lng: -60.008407}, {place: "Parque do Mindu"}],
    [{lat: -3.095246, lng: -60.051342}, {place: "Porão do Alemão"}],
    [{lat: -3.067608, lng: -60.035328}, {place: "Sindicato dos Médicos do Amazonas"}],
    [{lat: -3.075914, lng: -59.957162}, {place: "Shopping São josé"}],
    [{lat: -3.126327, lng: -59.983776}, {place: "Hotel Sleep inn"}],
    [{lat: -3.133217, lng: -59.988122}, {place: "Centro Cultural dos Povos da Amazônia"}],
    [{lat: -3.138706, lng: -59.994555}, {place: "Paróquia de São Lázaro"}],
    [{lat: -3.044878, lng: -60.024786}, {place: "Nova Igreja Batista Torquato"}],
    [{lat: -3.1192289908218873, lng: -60.07884431201864}, {place: "Colégio La Salle"}],
    [{lat: -3.135318343846249, lng: -60.02118480547332}, {place: "Palacete Provincial"}],
    [{lat: -3.074338374485699, lng: -59.966819907944654}, {place: "SESI Clube"}],
    [{lat: -3.1353512195113216, lng: -60.02541974186798}, {place: "Catedral Nossa Senhora da Conceição"}],
    [{lat: -3.1096469217133067, lng: -60.07174549624589}, {place: "Ponte Rio Negro"}],
    [{lat: -3.089800370186817, lng: -59.96240021145938}, {place: "UFAM"}],
    [{lat: -3.091418940923855, lng: -60.01718528275076}, {place: "UEA"}],
    [{lat: -3.0954986790405066, lng: -60.026538467444155}, {place: "Fametro Chapada"}],
    [{lat: -3.064423021047609, lng: -60.102818039023546}, {place: "Praia da Ponta Negra"}],
    [{lat: -3.085124839662829, lng: -60.029894032461755}, {place: "Sambódromo"}],
    [{lat: -3.1369653146839074, lng: -59.98024796025924}, {place: "Etech"}],
    [{lat: -3.1339306872300594, lng: -59.979378466917005}, {place: "Fundação Matias Machline"}],
    [{lat: -3.126043136607086, lng: -60.00497260045004}, {place: "Boogie Oogie"}],
    [{lat: -3.132051098466705, lng: -60.02321182453935}, {place: "Casarão de ideias"}],
    [{lat: -3.0300566789122154, lng: -59.97812387162951}, {place: "Sumauma Park Shopping"}],
]

//declarando variaveis no escopo global
var Rounds = 1
var totalPoints = 0
var distance = 0

var guessmarker = null
var targetMarker = null
var LinhaMapa = null
var myinfoWindow = null

// função que torna mapa visivel a receber = 'block' se for igual a 'none'
function MostrarMapa() {

    const elemAd = document.querySelector('.mybutton')
    elemAd.addEventListener('click', (e) => {

        var x = document.getElementById("map")
        if (x.style.display === "none") {
            x.style.display = "block"
        } else {
            x.style.display = "none"
        }
    })

}

function carregarStreetView() {
    var panorama = new google.maps.StreetViewPanorama(
        document.getElementById('pano'), {
            position: currentCords,
            pov: {
                heading: 10,
                pitch: 5
            },
            linksControl: false,//guia para lugares no street view
            panControl: false, //compasso na tela
            enableCloseButton: false, //ligar ou desligar o street view
            addressControl: false, // endereço do street view
            zoomControl: false, //opção de zoom in e zoom out com clique
            showRoadLabels: false, //nome das ruas no street view
        }
    )
}

function carregarMapa() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: {lat: -3.119, lng: -60.021}, // foco do zoom
        zoom: 13, //zoom do mapa
        mapTypeControl: false, //trocar tipos de mapa
        streetViewControl: false, //controle sobre o street view
        minZoom: 1,//zoom do mapa
        restriction: { // ate aonde o mapa pode ser arrastado
            latLngBounds: {
                north: -2.9,
                south: -3.3,
                east: -59.8,
                west: -60.3,
            },
        },
    })
}

function pontosPorDistancia(distance) { //sistema de pontuação
    let Pontos = 0

    if (distance <= 1000) {
        Pontos += 1000
    } else if (distance <= 2000) {
        Pontos += 900
    } else if (distance <= 3000) {
        Pontos += 800
    } else if (distance <= 4000) {
        Pontos += 700
    } else if (distance <= 5000) {
        Pontos += 600
    } else if (distance <= 6000) {
        Pontos += 500
    } else if (distance <= 7000) {
        Pontos += 400
    } else if (distance <= 8000) {
        Pontos += 300
    } else if (distance <= 9000) {
        Pontos += 200
    } else if (distance <= 10000) {
        Pontos += 100
    } else {
        Pontos += 0;
    }

    return Pontos
}


function playAgain() {
    document.querySelector('.card').style.display='none'
    let pontosRodada = pontosPorDistancia(distance)
    totalPoints += pontosRodada
    Rounds++
    document.querySelector(".mybutton").textContent = "adivinhe a localização";
    document.querySelector(".mybutton").onclick = function () {
        MostrarMapa();
    };
    if (Rounds < 6) {
        initMap()
    } else {
        document.getElementById('pano').remove()
        document.querySelector('.timer').remove()
        document.getElementById('map').remove()
        document.querySelector('.content').style.display = 'block'
        document.querySelector('.pontuacao-final').textContent = 'SUA PONTUAÇÃO FINAL: ' + totalPoints + ' PONTOS'
        document.querySelector(".mybutton").textContent = "jogar novamente";
        document.querySelector(".mybutton").onclick = function () {
            recarregarPagina()
        };

    }
}


function recarregarPagina() {
    location.reload()
}

var idIntervalo
var seconds

function startTimer() {
    // Defina a data e hora para a contagem regressiva de um minuto a partir de agora
    let countDownDate = new Date();
    countDownDate.setSeconds(countDownDate.getSeconds() + 60); // Adiciona 60 segundos

    // Atualize a contagem regressiva a cada 1 segundo
    idIntervalo = setInterval(function () {
        // Obtenha a data e hora de hoje
        let now = new Date().getTime();

        // Encontre a distância entre agora e a data da contagem regressiva
        tempo = countDownDate - now;

        // Cálculos de tempo para minutos e segundos

        seconds = Math.floor((tempo % (1000 * 60)) / 1000);

        // Produza o resultado em um elemento com id="demo"
        document.querySelector(".timer").innerHTML = seconds + "s ";

        // Se a contagem regressiva terminar, escreva algum texto
        if (seconds < 1) {
            distance=20000
            document.getElementById("map").style.display = "none"
            document.querySelector(".timer").innerHTML = "FIM DE TEMPO";
            document.querySelector(".mybutton").textContent = "jogar proxima rodada"
            document.querySelector(".mybutton").onclick = function () {//para carregar outro lugar no street view
                clearInterval(idIntervalo)
                playAgain();
            }
        }

    }, 1000);
}

var slideIndex = 0;
showSlides();

function showSlides() {
    let slides = document.getElementsByClassName("mySlides");
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1 }
    slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlides, 3000); // Change image every 3 seconds
}

// Adiciona um listener para o clique no botão de iniciar
document.getElementById('button').addEventListener('click', function() {
    // Redireciona para a página do jogo
    document.querySelector('.slideshow-container').style.display = 'none'
    initMap()

});

function initMap() { // funçao de iniciar o mapa que a propria api chama
    document.getElementById("pano").style.display = "block"
    document.querySelector(".timer").style.display = "block"
    document.querySelector(".mybutton").style.display = "block"
    document.getElementById('map').style.display = 'none'
    startTimer()




    currentLocation = locations[Math.floor(Math.random() * locations.length)] // selecionar aletoriamente um lugar pre selecionado
    currentCords = currentLocation[0] // guardar as coordenadas do lugar
    currentPlace = currentLocation[1].place //guardar o nome do local

    // seta para o mapa ficar invisivel

    carregarStreetView()
    carregarMapa()

    myinfoWindow = new google.maps.InfoWindow({}) // abre uma info window para interagir com o mapa
    myinfoWindow.open(map)

    MostrarMapa()

    map.addListener("dblclick", (mapsMouseEvent) => { // no double click faz novos comandos

        // guardar as coordenadas do lugar de double click
        guessLatLng = new google.maps.LatLng(mapsMouseEvent.latLng.lat(), mapsMouseEvent.latLng.lng())

        guessmarker = new google.maps.Marker({// adicionar marker a coordenada selecionada pelo jogador
            position: mapsMouseEvent.latLng,
        });

        guessmarker.setMap(map)

        var customIcon = { //pegar um icon png para aparecer no mapa apos a tentativa
            url: 'https://images.vexels.com/media/users/3/132440/isolated/preview/17153cd6404d483b64a277d764820921-target-inside-location-marker-icon.png',
            scaledSize: new google.maps.Size(50, 50) // tamanho da imagem
        };

        targetlatLng = new google.maps.LatLng(currentCords.lat, currentCords.lng) //coordenadas pre selecionadas
        targetMarker = new google.maps.Marker({ //adicionar um marker ao mapa
            position: targetlatLng,
            title: currentPlace,
            draggable: false, //arrastar o marker
            icon: customIcon,
            anchor: new google.maps.Point(15,15)
        });

        targetMarker.setMap(map)

        myinfoWindow.close()

        distance = google.maps.geometry.spherical.computeDistanceBetween(targetlatLng, guessLatLng)

        let distanciaFormatada = distance/1000

        myinfoWindow = new google.maps.InfoWindow({
            position: targetMarker,
            content: distanciaFormatada.toFixed(1) + " km de distância",
        })
        myinfoWindow.open(map, targetMarker)

        let pontos = pontosPorDistancia(distance)
        document.querySelector('.text-body').textContent = '+ ' + pontos + ' pontos!!!'
        document.querySelector('.text-title').textContent = currentPlace
        document.querySelector('.rounds-jogo').textContent = 'Round ' + Rounds + ' /5'
        document.querySelector(".card").style.display = 'block'



         coordenadasLinha = [ //as coordenadas entre a tentativa e o lugar real
            targetlatLng,
            guessLatLng,
        ];

        LinhaMapa = new google.maps.Polyline({ //cria uma linha entre dois lugares selecionados no path abaixo
            path: coordenadasLinha,
            geodesic: true,
            strokeColor: "#FF0000",
            strokeOpacity: 1.0,
            strokeWeight: 2,
        })

        // distancia em metros entre tentativa e original

        LinhaMapa.setMap(map)


        document.querySelector(".mybutton").textContent = "proxima rodada"
        document.querySelector(".mybutton").onclick = function () {//para carregar outro lugar no street view
            myinfoWindow.close()
            clearInterval(idIntervalo)
            playAgain();
        };

    });

}