var game = new Phaser.Game(1000,675,Phaser.AUTO,'experience',{preload: preload, create: create, update: update});
 var states;
 var topStates;
 var diffA = [];
 var diffV = [];  
 var dotsA;
 var dotsV;
 var isA;
 var isV;
            function preload(){
                game.load.json('states','/Data-Visualization/states.json');
                game.load.json("topStates",'/Data-Visualization/topStates.json');
                game.load.image('buttonA','/Data-Visualization/assets/img/button.png');
                game.load.image('buttonV','/Data-Visualization/assets/img/button2.png');
                
                
                
                game.load.image('menu1','/Data-Visualization/assets/img/menu1.png');
                game.load.image('menu2','/Data-Visualization/assets/img/menu2.png');
                game.load.image('menu3','/Data-Visualization/assets/img/menu3.png');
                game.load.image('menu4','/Data-Visualization/assets/img/menu4.png');
                
                game.load.image('dotA','/Data-Visualization/assets/img/dotA.png');
                game.load.image('dotV','/Data-Visualization/assets/img/dotV.png');
                game.load.image('settings','/Data-Visualization/assets/img/settings.png');
            }
    
            function create(){
                states = game.cache.getJSON('states');//cache json file
                topStates = game.cache.getJSON('topStates'); //cache json file
                setScores();
                
                dotsA = []; //empty array for dots
                dotsV = []; //empty array for dots
                for(var i = 0; i < 5; i++){
                    dotsA.push(game.add.sprite((i*200)+100,200, 'dotA')); // add sprite to array
                    dotsA[i].pivot.setTo(dotsA[i].width*.5,dotsA[i].height*.5); //change anchor point to middle
                    dotsA[i].scale.setTo(.5,.5); //scale to 50% to represent average
                    dotsA[i].inputEnabled = true; //enable input so user can hover
                    
                    dotsV.push(game.add.sprite((i*200)+100,450, 'dotV'));
                    dotsV[i].pivot.setTo(dotsV[i].width*.5,dotsV[i].height*.5);
                    dotsV[i].scale.setTo(.5,.5);  
                    dotsV[i].inputEnabled = true;
                }
                
               game.add.button(100, 500, 'buttonA', scaleA, this, 0, 0, 0);
               game.add.button(175, 500, 'buttonV', scaleV, this, 0, 0, 0);
               var settings = game.add.button(975, 500, 'settings', settingsHit, this, 0, 0, 0);
                settings.name = "settings";
                
               var menu1 = game.add.button(0, 0, 'menu1', menuHit, this, 0, 0, 0);
               menu1.name = "menu1";
               var menu2 = game.add.button(250, 0, 'menu2', menuHit, this, 0, 0, 0);
               menu2.name = "menu2";
               var menu3 = game.add.button(500, 0, 'menu3', menuHit, this, 0, 0, 0);
               menu3.name="menu3";
               var menu4 = game.add.button(750, 0, 'menu4', menuHit, this, 0, 0, 0);
               menu4.name = "menu4";
                
                isA = false;//boolean used so that dot and hover do not flicker/to enable toggle
                isV = false;
                
                var style = { font: "20px Arial", fill: "#FFFFFF", wordWrap: true, wordWrapWidth: 300, align: "center", backgroundColor: "#000000" };

                text = game.add.text(700, 0, "This is text.", style);
            }
            
            function update(){
                text.setText("Porn and Rape");
                text.x=1200;
                text.y=0;//get text out of the way
                for(var i = 0; i < topStates.statesA.length; i ++){
                    if(dotsA[i].input.pointerOver()&&isA){//hover text for assaults when scaled
                        text.setText(topStates.statesA[i].name+" experiences "+topStates.statesA[i].count+" per 100,000 people");
                        text.x = game.input.x-160;
                        text.y = game.input.y;
                    }
                    if(dotsV[i].input.pointerOver()&&isV){//hover text for views when scaled
                        text.setText(topStates.statesV[i].name+" contributes "+topStates.statesV[i].count+" page views per capita");
                        text.x = game.input.x-160;
                        text.y = game.input.y;
                    }
                    if(dotsA[i].input.pointerOver()&&isA == false){//hover text for assaults when average
                        text.setText("There is an average of 40 rapes per 100,000 people in America");
                        text.x = game.input.x-160;
                        text.y = game.input.y;
                    }
                    if(dotsV[i].input.pointerOver()&& isV == false){//hover text for views when average
                        text.setText("There is an average of 122 pages views per capita in America");
                        text.x = game.input.x-160;
                        text.y = game.input.y;
                    }
                }
            }

            function scaleA(){
                if(isA == false){
                    for(var i = 0; i < topStates.statesA.length; i++){//iterate through each top state
                        diffA.push(topStates.statesA[i].diff);
                        var proport = (40+diffA[i])/80; // calculate the proportion based on max being 100% and avg being 50%
                        this.add.tween(dotsA[i].scale).to({ x: proport, y: proport}, 500, Phaser.Easing.Back.Out, true, 1000); // scale to proportion
                        isA = true;
                    }
                }else{
                    for(var i = 0; i <topStates.statesA.length; i ++){
                        this.add.tween(dotsA[i].scale).to({ x: .5, y: .5}, 500, Phaser.Easing.Back.Out, true, 1000);//scale back to average
                    }
                    isA = false;
                }
            }
            
            function scaleV(){ //same as function above but with the pages views data
                if(isV == false){
                    for(var i = 0; i < topStates.statesV.length; i++){
                        diffV.push(topStates.statesV[i].diff);
                        var proport = ((122+diffV[i])/194);    
                        this.add.tween(dotsV[i].scale).to({ x: proport, y: proport}, 500, Phaser.Easing.Back.Out, true, 1000);
                        isV = true;
                    }
                }else{
                    for(var i = 0; i < topStates.statesV.length; i ++){
                        this.add.tween(dotsV[i].scale).to({ x: .5, y: .5}, 500, Phaser.Easing.Back.Out, true, 1000);   
                    }
                    isV = false;
                }
            }

            
            function menuHit(button){
                console.log(button.name);
                setCookie("menu",button.name,30);
                location.reload();
            }
            function settingsHit(button){
                setCookie("menu",button.name,30);
                location.reload();
            }

            function setCookie(cname,cvalue,exdays) {
                    var d = new Date();
                    d.setTime(d.getTime() + (exdays*24*60*60*1000));
                    var expires = "expires=" + d.toGMTString();
                    document.cookie = cname+"="+cvalue+"; "+expires;
            }

            function setScores(){
                for(var i = 0; i < states.states.length; i++){//iterates through each state
                    //75 to 200 step of 6.25 views
                        //score 1-20
                    //10 to 80 step of 3.5 assaults
                        //score 1-20
                    for(var j = 0; j < 20; j++){
                        if(states.states[i].views > 75 + (j*6.25) && states.states[i].views <= 81.25 + (j*6.25)){//puts state in bin between 0 and 20
                            states.states[i].vScore = j+1;   
                        }     
                    }
                    for(var k = 0; k < 20; k++){
                        if(states.states[i].assaults > 10 + (k*3.5) && states.states[i].assaults <= 13.5 + (k*3.5)){//puts state in bin between 0 and 20
                            states.states[i].aScore = k+1;   
                        }   
                    } 
                   
                }
            }
            