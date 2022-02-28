somMilitar.addEventListener(
  "ended",
  function () {
    somMilitar.currentTime = 0;
    somMilitar.play();
  },
  false
);
somMilitar.play();

function start() {
  //Principais variáveis do jogo

  let jogo = {};
  var velocidade = 5;
  // De 0 a 334
  var posicaoY = parseInt(Math.random() * 334);
  let TECLAS = {
    W: 87,
    S: 83,
    A: 65,
    D: 68,
    F: 70,
    ESC: 27,
  };
  let podeAtirar = true;

  let fimdejogo = false;

  // Pontuação
  let pontos = 0;
  let salvos = 0;
  let perdidos = 0;

  let somDisparo = document.getElementById("somDisparo");
  let somExplosao = document.getElementById("somExplosao");
  let musica = document.getElementById("musica");
  let somGameover = document.getElementById("somGameover");
  let somPerdido = document.getElementById("somPerdido");
  let somResgate = document.getElementById("somResgate");
  let somHelicoptero = document.getElementById("somHeli");
  let somMilitar = document.getElementById("somMilitar");
  // Vida
  let energiaAtual = 3;

  // Usando o Jquery
  // Inicio da função start()

  // hide -> ocultar, a gente oculta
  $("#inicio").hide();
  // acrescentar -> append
  $("#fundoGame").append("<div id='jogador' class='anima1'></div>");
  $("#fundoGame").append("<div id='inimigo1' class='anima2'></div>");
  $("#fundoGame").append("<div id='inimigo2' ></div>");
  $("#fundoGame").append("<div id='amigo' class='anima3'></div>");
  $("#fundoGame").append("<div id='placar'></div>");
  $("#fundoGame").append("<div id='energia'></div>");

  //Música em loop
  musica.addEventListener(
    "ended",
    function () {
      musica.currentTime = 0;
      musica.play();
    },
    false
  );
  musica.play();

  somHelicoptero.addEventListener(
    "ended",
    function () {
      somHelicoptero.currentTime = 0;
      somHelicoptero.play();
    },
    false
  );
  somHelicoptero.play();

  somMilitar.pause();

  //   pressionou é uma propriedade
  jogo.pressionou = [];

  //Verifica se o usuário pressionou alguma tecla

  //   Keydown é um evento do js que identifica se a pessoa precionou uma tecla
  $(document).keydown(function (e) {
    jogo.pressionou[e.which] = true;
  });
  //   Keyup é um evento do js que identifica se a pessoa não apertou uma tecla
  $(document).keyup(function (e) {
    jogo.pressionou[e.which] = false;
  });

  //Game Loop -> o loop do game para ele não parar

  //   Peguei a variavel jogo, criei uma propriedade timer, setInterval é um temporizador a onde é indicado a função e o tempo de execução
  jogo.timer = setInterval(loop, 30);

  function loop() {
    movejogador();
    movefundo();
    moveinimigo1();
    moveinimigo2();
    moveamigo();
    colisao();
    placar();
    energia();
  } // Fim da função loop()
  function movejogador() {
    let topo;
    if (jogo.pressionou[TECLAS.W]) {
      topo = parseInt($("#jogador").css("top"));
      $("#jogador").css("top", topo - 10);
      if (topo <= 0) {
        $("#jogador").css("top", topo + 10);
      }
    }

    if (jogo.pressionou[TECLAS.S]) {
      topo = parseInt($("#jogador").css("top"));
      $("#jogador").css("top", topo + 10);
      if (topo >= 440) {
        $("#jogador").css("top", topo - 10);
      }
    }

    //   if (jogo.pressionou[TECLAS.D]) {
    //     frente = parseInt($("#jogador").css("left"));
    //     $("#jogador").css("left", frente + 10);
    //     if (frente >= 298) {
    //       $("#jogador").css("left", frente - 10);
    //     }
    //   }

    //   if (jogo.pressionou[TECLAS.A]) {
    //     tras = parseInt($("#jogador").css("left"));
    //     $("#jogador").css("left", tras - 10);
    //     if (tras <= 10) {
    //       $("#jogador").css("left", tras + 10);
    //     }
    //   }

    if (jogo.pressionou[TECLAS.F]) {
      //Chama função Disparo
      disparo();
    }
    if (jogo.pressionou[TECLAS.ESC]) {
      pause();
    }
  } // fim da função movejogador()

  function moveinimigo1() {
    // Posição X é a horizontal que é left e right, que vai sendo diminuida de acordo com a velocidade que é 5
    let posicaoX = parseInt($("#inimigo1").css("left"));
    $("#inimigo1").css("left", posicaoX - velocidade);
    //   PosiçãY é a vertical que é top e bottom, no caso essa posição é randomica, ele vai aparecer em luagres diferentes toda vez que iniciar o game
    $("#inimigo1").css("top", posicaoY);

    //   Quando a posiçao X que nesse caso é o left chegar no 0 ele reinicia a posição do helicoptero
    if (posicaoX <= 0) {
      posicaoY = parseInt(Math.random() * 334);
      $("#inimigo1").css("left", 694);
      $("#inimigo1").css("top", posicaoY);
      pontos = pontos - 25;
      velocidade = velocidade - 0.3;
      if (velocidade <= 0.3) {
        velocidade = 1;
      }
    }
  } //Fim da função moveinimigo1()

  function moveinimigo2() {
    let posicaoX = parseInt($("#inimigo2").css("left"));
    $("#inimigo2").css("left", posicaoX - 3);

    if (posicaoX <= 0) {
      $("#inimigo2").css("left", 775);
      pontos = pontos - 25;
    }
  } // Fim da função moveinimigo2()

  function moveamigo() {
    let posicaoX = parseInt($("#amigo").css("left"));
    $("#amigo").css("left", posicaoX + 1);

    if (posicaoX > 906) {
      $("#amigo").css("left", 0);
      salvos++;
    }
  } // fim da função moveamigo()

  function disparo() {
    if (podeAtirar == true) {
      podeAtirar = false;
      somDisparo.play();
      // Para o tiro sair
      let topo = parseInt($("#jogador").css("top"));
      let posicaoX = parseInt($("#jogador").css("left"));
      // A posição horizontal do heli mais 190
      let tiroX = posicaoX + 190;
      // A posição do topo do heli mais 40
      let topoTiro = topo + 40;
      $("#fundoGame").append("<div id='disparo'></div");
      $("#disparo").css("top", topoTiro);
      $("#disparo").css("left", tiroX);

      // Para o tiro andar -> função de tempo setInterval
      var tempoDisparo = window.setInterval(executaDisparo, 30);
    } //Fecha podeAtirar

    function executaDisparo() {
      let posicaoX = parseInt($("#disparo").css("left"));
      $("#disparo").css("left", posicaoX + 15);

      if (posicaoX > 900) {
        window.clearInterval(tempoDisparo);
        tempoDisparo = null;
        $("#disparo").remove();
        podeAtirar = true;
      }
    } // Fecha executaDisparo()
  } // Fecha disparo()

  function colisao() {
    //Metodo de colisão do Jquery collison pra detectar alguma colisão

    let colisao1Batida = $("#jogador").collision($("#inimigo1"));
    let colisao2Batida = $("#jogador").collision($("#inimigo2"));
    let colisao3Tiro = $("#disparo").collision($("#inimigo1"));
    let colisao4Tiro = $("#disparo").collision($("#inimigo2"));
    let colisao5Salvo = $("#jogador").collision($("#amigo"));
    let colisao6Batida = $("#inimigo2").collision($("#amigo"));

    // jogador com o inimigo1
    if (colisao1Batida.length > 0) {
      inimigo1X = parseInt($("#inimigo1").css("left"));
      inimigo1Y = parseInt($("#inimigo1").css("top"));
      explosao(inimigo1X, inimigo1Y);

      posicaoY = parseInt(Math.random() * 334);
      $("#inimigo1").css("left", 694);
      $("#inimigo1").css("top", posicaoY);
      energiaAtual--;
    }

    // jogador com o inimigo2
    if (colisao2Batida.length > 0) {
      inimigo2X = parseInt($("#inimigo2").css("left"));
      inimigo2Y = parseInt($("#inimigo2").css("top"));
      explosao(inimigo2X, inimigo2Y);

      $("#inimigo2").remove();
      reposicionaInimigo2();
      energiaAtual--;
    }

    // Disparo com o inimigo1

    if (colisao3Tiro.length > 0) {
      inimigo1X = parseInt($("#inimigo1").css("left"));
      inimigo1Y = parseInt($("#inimigo1").css("top"));

      explosao(inimigo1X, inimigo1Y);
      $("#disparo").css("left", 950);

      posicaoY = parseInt(Math.random() * 334);
      $("#inimigo1").css("left", 694);
      $("#inimigo1").css("top", posicaoY);

      pontos = pontos + 100;
      velocidade = velocidade + 0.3;
    }

    // Disparo com o inimigo2

    if (colisao4Tiro.length > 0) {
      inimigo2X = parseInt($("#inimigo2").css("left"));
      inimigo2Y = parseInt($("#inimigo2").css("top"));
      $("#inimigo2").remove();

      explosao(inimigo2X, inimigo2Y);
      $("#disparo").css("left", 950);
      reposicionaInimigo2();

      pontos = pontos + 50;
    }
    // jogador com o amigo
    if (colisao5Salvo.length > 0) {
      amigoX = parseInt($("#amigo").css("left"));
      amigoY = parseInt($("#amigo").css("top"));
      salvamento(amigoX, amigoY);
      $("#amigo").remove();
      reposicionaAmigo();
      salvos++;
    }
    //Inimigo2 com o amigo

    if (colisao6Batida.length > 0) {
      amigoX = parseInt($("#amigo").css("left"));
      amigoY = parseInt($("#amigo").css("top"));
      explosao2(amigoX, amigoY);
      $("#amigo").remove();
      reposicionaAmigo();
      perdidos++;
      pontos = pontos - 50;
    }
  } //Fim da função colisao()

  function explosao(inimigo1X, inimigo1Y) {
    $("#fundoGame").append("<div id='explosao'></div");
    $("#explosao").css("background-image", "url(/assets/img/explosao.png)");
    let div = $("#explosao");
    div.css("top", inimigo1Y);
    div.css("left", inimigo1X);
    //   Função animate do Jquery
    div.animate({ width: 200, opacity: 0 }, "slow");
    somExplosao.play();

    let tempoExplosao = window.setInterval(removeExplosao, 500);

    function removeExplosao() {
      div.remove();
      window.clearInterval(tempoExplosao);
      tempoExplosao = null;
    }
  } // Fim da função explosao1()

  //Reposiciona Inimigo2

  function reposicionaInimigo2() {
    let tempoColisao4 = window.setInterval(reposiciona4, 5000);

    function reposiciona4() {
      window.clearInterval(tempoColisao4);
      tempoColisao4 = null;

      if (fimdejogo == false) {
        $("#fundoGame").append("<div id=inimigo2></div");
      }
    }
  }

  //Reposiciona Amigo

  function reposicionaAmigo() {
    let tempoAmigo = window.setInterval(reposiciona6, 6000);

    function reposiciona6() {
      window.clearInterval(tempoAmigo);
      tempoAmigo = null;

      if (fimdejogo == false) {
        $("#fundoGame").append("<div id='amigo' class='anima3'></div>");
      }
    }
  } // Fim da função reposicionaAmigo()

  //Explosão2

  function explosao2(amigoX, amigoY) {
    $("#fundoGame").append("<div id='explosao2' class='anima4'></div");
    $("#explosao2").css("top", amigoY);
    $("#explosao2").css("left", amigoX);
    let tempoExplosao2 = window.setInterval(resetaExplosao2, 500);
    somPerdido.play();
    function resetaExplosao2() {
      $("#explosao2").remove();
      window.clearInterval(tempoExplosao2);
      tempoExplosao2 = null;
    }
  } // Fim da função explosao2

  function salvamento(amigoX, amigoY) {
    $("#fundoGame").append(
      "<div id='salvamento' class='animaSalvamento'></div"
    );
    $("#salvamento").css("top", amigoY);
    $("#salvamento").css("left", amigoX);
    let tempoSalvamento = window.setInterval(resetaSalvamento, 500);
    somResgate.play();
    function resetaSalvamento() {
      $("#salvamento").remove();
      window.clearInterval(tempoSalvamento);
      tempoSalvamento = null;
    }
  }

  function placar() {
    $("#placar").html(
      "<h2> Pontos: " +
        pontos +
        " Salvos: " +
        salvos +
        " Perdidos: " +
        perdidos +
        "</h2>"
    );
  } //fim da função placar()

  //Barra de energia

  function energia() {
    if (energiaAtual == 3) {
      $("#energia").css("background-image", "url(/assets/img/energia3.png)");
    }

    if (energiaAtual == 2) {
      $("#energia").css("background-image", "url(/assets/img/energia2.png)");
    }

    if (energiaAtual == 1) {
      $("#energia").css("background-image", "url(/assets/img/energia1.png)");
    }

    if (energiaAtual == 0) {
      $("#energia").css("background-image", "url(/assets/img/energia0.png)");

      //Game Over
      gameOver();
    }
  } // Fim da função energia()

  //Função GAME OVER
  function gameOver() {
    fimdejogo = true;
    musica.pause();
    somHelicoptero.pause();
    somGameover.play();

    window.clearInterval(jogo.timer);
    jogo.timer = null;

    $("#fundoGame").append("<div id='fim'></div>");

    $("#fim").html(
      "<h1> Game Over </h1><p>Sua pontuação foi: " +
        pontos +
        "</p>" +
        "<div id='reinicia' onClick=reiniciaJogo()><h3>Jogar Novamente</h3></div>"
    );
  } // Fim da função gameOver();

  function pause() {
    fimdejogo = true;
    musica.pause();
    somHelicoptero.pause();
    somGameover.play();

    window.clearInterval(jogo.timer);
    jogo.timer = null;

    $("#fundoGame").append("<div id='pause'></div>");

    $("#pause").html(
      "<h1> Game Pausado </h1><p>Sua pontuação até agora foi: " +
        pontos +
        "</p>" +
        "<div id='despausar' onClick=despausar()><h3>Despausar</h3></div>" +
        "<div id='terminar' onClick=reiniciaJogo()><h3>Resetar</h3></div>" +
        "<p> Não consegui implementar o despausar :/ </P>"
    );
  }
} // Fim da função start

//Função que movimenta o fundo do jogo

function movefundo() {
  // Eu pego a posição inicial do fundo do game atraves do id da div que tem o background do game -> #fundoGame atraves da propriedade css background-position e armazeno esse valor na variavel esquerda. Obs: tudo isso é convertido para inteiro
  let esquerda = parseInt($("#fundoGame").css("background-position"));
  //   Depois eu pego esse valor e diminuo essa posição com -1, que é um 1 px pra esquerda porque o 1 esta negativo
  $("#fundoGame").css("background-position", esquerda - 1);
} // fim da função movefundo()

//Reinicia o Jogo

function reiniciaJogo() {
  somGameover.pause();
  $("#jogador").remove();
  $("#inimigo1").remove();
  $("#inimigo2").remove();
  $("#amigo").remove();

  $("#fim").remove();
  $("#pause").remove();
  start();
} //Fim da função reiniciaJogo

function despausar() {
  console.log("tem que ser implementado ainda");
} //Fim da função despausar
