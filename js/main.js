var high_score = 0;

function start(){

    $("#inicio").hide();

    $("#fundoGame").append("<div id='jogador'class='anima1'></div>");
	$("#fundoGame").append("<div id='inimigo1' class='anima2'></div>");
	$("#fundoGame").append("<div id='inimigo2'></div>");
    
	$("#fundoGame").append("<div id='amigo' class='anima3'></div>")
    $("#fundoGame").append("<div id='placar'></div>");
    $("#fundoGame").append("<div id='energia'></div>");
    

	var jogo = {}
    var limite = 0;
    var som = true;
    var energiaAtual=3;
    var velocidade=5;
    var podeAtirar=true;
    var podeAtirar2=true;
    var fimdejogo=false;
    var pontos=0;
    var salvos=0;
    var perdidos=0;
    var posicaoY = parseInt(Math.random() * 334);

    var TECLA = {
        W: 87,
        S: 83,
        A: 65,
        D: 68,
        BAR:32
        
    }
    var somDisparo=document.getElementById("somDisparo");
    var somExplosao=document.getElementById("somExplosao");
    var musica=document.getElementById("musica");
    var somGameover=document.getElementById("somGameover");
    var somPerdido=document.getElementById("somPerdido");
    var somResgate=document.getElementById("somResgate");

    musica.addEventListener("ended", function(){ musica.currentTime = 0; musica.play(); }, false);
    musica.play();
    
    jogo.pressionou = [];

    $(document).keydown(function(e){
        jogo.pressionou[e.which] = true;
        });
    
    $(document).keyup(function(e){
        jogo.pressionou[e.which] = false;
    });
	
	//Game Loop
	jogo.timer = setInterval(loop,30);
	function loop() {
	
	moveFundo();
    colisao();
    jogador();
    moveInimigo1();
    moveInimigo2();
    if(pontos==2500 && limite == 0) {$("#fundoGame").append("<div id='inimigo3' class='anima5'></div>");
    limite++}
    if(pontos>=2500) disparoInimigo();
    moveAmigo();
    placar();
    energia();
	
	}

	//animação de fundo
	function moveFundo() {
	
	esquerda = parseInt($("#chao").css("background-position"));
	$("#chao").css("background-position",esquerda-3);
    esquerda = parseInt($("#arvores").css("background-position"));
	$("#arvores").css("background-position",esquerda-2);
    esquerda = parseInt($("#ceu").css("background-position"));
	$("#ceu").css("background-position",esquerda-1);
	
	}

    //ações do jogador
    function jogador() {
        var topo = parseInt($("#jogador").css("top"));
        var lado = parseInt($("#jogador").css("left"));
        
        if (jogo.pressionou[TECLA.W]) {
            //move pra cima
            if (topo<10) {}
            else $("#jogador").css("top",topo-10);
        }
        if (jogo.pressionou[TECLA.A]) {
            //move pra cima
            if (lado<0) {}
            else $("#jogador").css("left",lado-10);
        }
        
        if (jogo.pressionou[TECLA.S]) {
            //move pra baixo
            if (topo>=414) {}
            else $("#jogador").css("top",topo+10);
        }
        if (jogo.pressionou[TECLA.D]) {
            //move pra cima
            if(lado>837){}
            else $("#jogador").css("left",lado+10);
        }
        if (jogo.pressionou[TECLA.BAR]) {
            //tiro
            disparo();
        }
        window.onkeydown = function(e) { 
            e = e || window.event;  //normalize the evebnt for IE
            var target = e.srcElement || e.target;  //Get the element that event was triggered on
            var tagName = target.tagName;  //get the tag name of the element [could also just compare elements]
            return !(tagName==="BODY" && e.keyCode == 32);  //see if it was body and space
        };
    } 

    //move inimigo 1
    function moveInimigo1() {

        posicaoX = parseInt($("#inimigo1").css("left"));
        $("#inimigo1").css("left",posicaoX-velocidade);
        $("#inimigo1").css("top",posicaoY);
            
        if (posicaoX<=0) {
            
            posicaoY = parseInt(Math.random() * 334);
            $("#inimigo1").css("left",694);
            $("#inimigo1").css("top",posicaoY);     
        }
    }

    //move inimigo 2
    function moveInimigo2() {
        posicaoX = parseInt($("#inimigo2").css("left"));
        
        $("#inimigo2").css("left",posicaoX-3);		
		if (posicaoX<=0) $("#inimigo2").css("left",775);
    }

    //move inimigo 3
     function moveInimigo3() {

        $("#inimigo3").css("top",posicaoY3);

        while (posicaoY3 == posicaoY){
        posicaoY3 = parseInt(Math.random() * 334);
        $("#inimigo3").css("left",800);
        $("#inimigo3").css("top",posicaoY3);    
        } 
    }

    //move amigo
    function moveAmigo() {
	
        posicaoX = parseInt($("#amigo").css("left"));
        $("#amigo").css("left",posicaoX+1);
                    
        if (posicaoX>906) $("#amigo").css("left",0);           
    }
    
    function disparo() {
        
        somDisparo.play();
        if (podeAtirar==true) {         
       
        podeAtirar=false;
        topo = parseInt($("#jogador").css("top"))
        posicaoX= parseInt($("#jogador").css("left"))
        tiroX = posicaoX + 190;
        topoTiro = topo + 37;

        $("#fundoGame").append("<div id='disparo'></div");
        $("#disparo").css("top",topoTiro);
        $("#disparo").css("left",tiroX);
    
        var tempoDisparo=window.setInterval(executaDisparo, 30);
        } 
     
        function executaDisparo() {
            posicaoX = parseInt($("#disparo").css("left"));
            $("#disparo").css("left",posicaoX+15); 
        
            if (posicaoX>900) {
                                
                window.clearInterval(tempoDisparo);
                tempoDisparo=null;
                $("#disparo").remove();
                podeAtirar=true;       
            }
        } 
    } 

    function disparoInimigo() {
        jogadorY = parseInt($("#jogador").css("top"));
       
        //if (jogadorY == topo){
                if (som == true) {somDisparo.play(); som = false;}
                if (podeAtirar2==true) {         
            
                podeAtirar2=false;
                posicaoX= parseInt($("#inimigo3").css("left"));
                topo = parseInt($("#inimigo3").css("top"));
                tiroX = posicaoX;
                topoTiro = topo + 37;
                
                $("#fundoGame").append("<div id='disparoInimigo'></div");
                $("#disparoInimigo").css("top",topoTiro);
                $("#disparoInimigo").css("left",tiroX);
            
                var tempoDisparo=window.setInterval(executaDisparo, 30);
                } 
            
                function executaDisparo() {
                    posicaoX = parseInt($("#disparoInimigo").css("left"));
                    $("#disparoInimigo").css("left",posicaoX-15); 
                
                    if (posicaoX<0) {
                                        
                        window.clearInterval(tempoDisparo);
                        tempoDisparo=null;
                        $("#disparoInimigo").remove();
                        window.setTimeout(podeAtirar2=true, 2000 );
                        window.setTimeout(som = true, 2000 );
                         
                    }
                } 
           // }
    } 
    
    function colisao() {
        var colisao1 = ($("#jogador").collision($("#inimigo1")));
        var colisao2 = ($("#jogador").collision($("#inimigo2")));
        var colisao8 = ($("#jogador").collision($("#inimigo3")));
        var colisao3 = ($("#disparo").collision($("#inimigo1")));
        var colisao4 = ($("#disparo").collision($("#inimigo2")));
        var colisao7 = ($("#disparo").collision($("#inimigo3")));
        var colisao9 = ($("#disparoInimigo").collision($("#jogador")));
        var colisao5 = ($("#jogador").collision($("#amigo")));
        var colisao6 = ($("#inimigo2").collision($("#amigo")));
        
        // jogador com o inimigo1
        if (colisao1.length>0) {
            
            energiaAtual--;
            inimigo1X = parseInt($("#inimigo1").css("left"));
            inimigo1Y = parseInt($("#inimigo1").css("top"));
            explosao1(inimigo1X,inimigo1Y);
          
        
            posicaoY = parseInt(Math.random() * 334);
            $("#inimigo1").css("left",694);
            $("#inimigo1").css("top",posicaoY);
        }

        //jogador com o inimigo2
        if (colisao2.length>0) {
	
            energiaAtual--;
            inimigo2X = parseInt($("#inimigo2").css("left"));
            inimigo2Y = parseInt($("#inimigo2").css("top"));
            explosao2(inimigo2X,inimigo2Y);
                    
            $("#inimigo2").remove();
            reposicionaInimigo2();   
            }	
        
        // jogador com o inimigo3
        if (colisao8.length>0) {
            
            energiaAtual--;
            inimigo3X = parseInt($("#inimigo3").css("left"));
            inimigo3Y = parseInt($("#3").css("top"));
            explosao4(inimigo3X,inimigo3Y);
          
        
            posicaoY = parseInt(Math.random() * 334);
            $("#inimigo3").css("top",posicaoY);
        }

        // Disparo com o inimigo1
	    if (colisao3.length>0) {
		
            velocidade=velocidade+ 0.2;
            pontos=pontos+100;
            inimigo1X = parseInt($("#inimigo1").css("left"));
            inimigo1Y = parseInt($("#inimigo1").css("top"));
        
            explosao1(inimigo1X,inimigo1Y);
            $("#disparo").css("left",950);
                
            posicaoY = parseInt(Math.random() * 334);
            $("#inimigo1").css("left",694);
            $("#inimigo1").css("top",posicaoY);    
        }

        // Disparo com o inimigo2	
	    if (colisao4.length>0) {
		
            pontos=pontos+50;
            inimigo2X = parseInt($("#inimigo2").css("left"));
            inimigo2Y = parseInt($("#inimigo2").css("top"));
            $("#inimigo2").remove();
        
            explosao2(inimigo2X,inimigo2Y);
            $("#disparo").css("left",950);
            
            reposicionaInimigo2();  
        }

        // Disparo com o inimigo3
	    if (colisao7.length>0) {
		
            velocidade=velocidade+0.1;
            pontos=pontos+100;
            inimigo3X = parseInt($("#inimigo3").css("left"));
            inimigo3Y = parseInt($("#inimigo3").css("top"));
        
            explosao4(inimigo3X,inimigo3Y);
            $("#disparo").css("left",950);
                
            posicaoY3 = parseInt(Math.random() * 334);
            $("#inimigo3").css("top",posicaoY3);    
        }

        // Disparo inimigo com jogador
	    if (colisao9.length>0) {
		
            energiaAtual--;
            jogadorX = parseInt($("#jogador").css("left"));
            jogadorY = parseInt($("#jogador").css("top"));
        
            $("#disparoInimigo").css("left",950);
                
            jogadorY = parseInt(Math.random() * 334);
            $("#jogador").css("top",jogadorY);    
        }

        // jogador com o amigo
	    if (colisao5.length>0) {
            pontos=pontos+50;
            somResgate.play();
            salvos++;
            reposicionaAmigo();
            $("#amigo").remove();
        }

        //Inimigo2 com o amigo
        if (colisao6.length>0) {
            pontos=pontos-50;
            perdidos++;
            amigoX = parseInt($("#amigo").css("left"));
            amigoY = parseInt($("#amigo").css("top"));
            explosao3(amigoX,amigoY);
            $("#amigo").remove();
                    
            reposicionaAmigo();         
        }
    }

    //Explosão Inimigo 1
    function explosao1(inimigo1X,inimigo1Y) {
        somExplosao.play();
        $("#fundoGame").append("<div id='explosao1'></div");
        $("#explosao1").css("background-image", "url(https://luizhardacore.github.io/Pato_Resgate/midia/morteinimigo1.png)");
        var div=$("#explosao1");
        div.css("top", inimigo1Y);
        div.css("left", inimigo1X);
        //div.animate({width:140,height:138, opacity:0}, "fast");
        
        var tempoExplosao=window.setInterval(removeExplosao, 200);
        
        function removeExplosao() {
                
            div.remove();
            window.clearInterval(tempoExplosao);
            tempoExplosao=null; 
        }    
    }

    //Explosão Inimigo 2
	function explosao2(inimigo2X,inimigo2Y) {
        somExplosao.play();
        $("#fundoGame").append("<div id='explosao2'></div");
        $("#explosao2").css("background-image", "url(https://luizhardacore.github.io/Pato_Resgate/midia/morteinimigo2.png)");
        var div2=$("#explosao2");
        div2.css("top", inimigo2Y);
        div2.css("left", inimigo2X);
        //div2.animate({width:200, opacity:0}, "slow");
        
        var tempoExplosao2=window.setInterval(removeExplosao2, 250);
        
        function removeExplosao2() {
                
            div2.remove();
            window.clearInterval(tempoExplosao2);
            tempoExplosao2=null;     
        }    
    }

    //Explosão Inimigo 3
    function explosao4(inimigo3X,inimigo3Y) {
        somExplosao.play();
        $("#fundoGame").append("<div id='explosao1'></div");
        $("#explosao1").css("background-image", "url(https://luizhardacore.github.io/Pato_Resgate/midia/morteinimigo3.png)");
        var div=$("#explosao1");
        div.css("top", inimigo3Y);
        div.css("left", inimigo3X);
        //div.animate({width:140,height:138, opacity:0}, "fast");
        
        var tempoExplosao=window.setInterval(removeExplosao, 200);
        
        function removeExplosao() {
                
            div.remove();
            window.clearInterval(tempoExplosao);
            tempoExplosao=null; 
        }    
    }

    //Explosão Amigo
    function explosao3(amigoX,amigoY) {
        somPerdido.play();
        $("#fundoGame").append("<div id='explosao3' class='anima4'></div");
        $("#explosao3").css("top",amigoY);
        $("#explosao3").css("left",amigoX);
        var tempoExplosao3=window.setInterval(resetaExplosao3, 1000);
        function resetaExplosao3() {
            $("#explosao3").remove();
            window.clearInterval(tempoExplosao3);
            tempoExplosao3=null;     
        }   
    }

    //Reposiciona Inimigo2
	function reposicionaInimigo2() {
	
        var tempoColisao4=window.setInterval(reposiciona4, 5000);
            
        function reposiciona4() {
            window.clearInterval(tempoColisao4);
            tempoColisao4=null;
                
            if (fimdejogo==false) $("#fundoGame").append("<div id=inimigo2></div");     
        }	
    }	

    //Reposiciona Amigo	
	function reposicionaAmigo() {
	
        var tempoAmigo=window.setInterval(reposiciona6, 6000);
        
        function reposiciona6() {
            window.clearInterval(tempoAmigo);
            tempoAmigo=null;
            
            if (fimdejogo==false) $("#fundoGame").append("<div id='amigo' class='anima3'></div>");
        }
    }
    
    function placar() {
        $("#placar").html("<h2> Pontos: " + pontos + " Salvos: " + salvos + " Perdidos: " + perdidos + "</h2>");
    }

    //Barra de energia
    function energia() {
        
        if (energiaAtual==3) $("#energia").css("background-image", "url(https://luizhardacore.github.io/Pato_Resgate/midia/energia3.png)");

        if (energiaAtual==2) $("#energia").css("background-image", "url(https://luizhardacore.github.io/Pato_Resgate/midia/energia2.png)");
        
        if (energiaAtual==1)  $("#energia").css("background-image", "url(https://luizhardacore.github.io/Pato_Resgate/midia/energia1.png)");
        
        if (energiaAtual==0) {
            $("#energia").css("background-image", "url(https://luizhardacore.github.io/Pato_Resgate/midia/energia0.png)");
            
            gameOver();
        }
    }

    //GAME OVER
	function gameOver() {
        if (pontos>= high_score) high_score = pontos;
        fimdejogo=true;
        musica.pause();
        somGameover.play();
        limite = 0;

        window.clearInterval(jogo.timer);
        jogo.timer=null;
        
        $("#jogador").remove();
        $("#inimigo1").remove();
        $("#inimigo2").remove();
        $("#inimigo3").remove();
        $("#amigo").remove();
        
        $("#fundoGame").append("<div id='fim'></div>");
        
        $("#fim").html("<h1> Game Over </h1><p>Sua pontuacão foi: " + pontos + "</p><p>Pontuação Máxima: " + high_score + "</p>" + "<div id='reinicia' onClick='reiniciaJogo()'><h3>Jogar Novamente</h3></div>");
    }

}//fim função start

//reiniciar
function reiniciaJogo() {
    somGameover.pause();
    $("#fim").remove();
    start();
        
}
