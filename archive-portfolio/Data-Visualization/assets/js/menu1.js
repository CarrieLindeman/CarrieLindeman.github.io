var game = new Phaser.Game(1000,675,Phaser.AUTO,'experience',{preload: preload, create: create, update: update});
 var states; // global variable for json
 var blocksv; //array of views blocks
 var blocksa; //array of assault blocks
 var text; 
 var aScale; //calculates scales of what bin each states falls into
 var vScale;
            
            function preload(){
                game.load.json('states','/Data-Visualization/states.json');
                game.load.image('bars','/Data-Visualization/assets/img/bars.png');
                game.load.image('block','/Data-Visualization/assets/img/bar.png');
                game.load.image('block2','/Data-Visualization/assets/img/bar2.png');
                game.load.image('buttonA','/Data-Visualization/assets/img/button.png');
                game.load.image('buttonV','/Data-Visualization/assets/img/button2.png');
                
                game.load.image('menu1','/Data-Visualization/assets/img/menu1.png');
                game.load.image('menu2','/Data-Visualization/assets/img/menu2.png');
                game.load.image('menu3','/Data-Visualization/assets/img/menu3.png');
                game.load.image('menu4','/Data-Visualization/assets/img/menu4.png');
                
                game.load.image('settings','/Data-Visualization/assets/img/settings.png');
            }
    
            function create(){
                states = game.cache.getJSON('states'); 
                setScores();
                
               
                //var bars = game.add.sprite(0,125,'bars');
                //bars.scale.setTo(1,.35);
                
                //set boxes
                blocksv =[];
                blocksa =[];
                var pos = 2;
                for(var i = 0; i < states.states.length; i++){
                    blocksv.push(game.add.sprite(pos, 500, 'block'));//add a block
                    blocksv[i].scale.setTo(1,-1);
                    blocksv[i].inputEnabled = true;//so user can hover
                   
                    blocksa.push(game.add.sprite(pos, 500,'block2'));//add a block
                    blocksa[i].scale.setTo(1,-1);
                    blocksa[i].inputEnabled = true;
                    pos = pos +20; // space out the blocks
                }
                
               //image.events.onInputOut.add(out, this);
                
               game.add.button(100, 500, 'buttonA', graphAScore, this, 0, 0, 0);
               game.add.button(175, 500, 'buttonV', graphVScore, this, 0, 0, 0);
               
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
                
               aScale = false; // boolean so that text and transition do not flicker/to enable toggle
               vScale = false;
                
                var style = { font: "20px Arial", fill: "#FFFFFF", wordWrap: true, wordWrapWidth: 300, align: "center", backgroundColor: "#000000" };

                text = game.add.text(700, 0, "This is text.", style);
            }
            
            function update(){
                text.setText("Porn and Rape");
                text.x=1200;
                text.y=0;//get text off of screen when not displaying state data
                
                for(var i = 0; i < states.states.length; i++){//iterate through every block
                    if(blocksv[i].input.pointerOver()){ //if mouse hovers, then display info text
                        text.setText(states.states[i].name+"\n Number of rapes commited: "+states.states[i].assaults+"\n Number of Pornhub Page Views: "+states.states[i].views);
                        if(i>25){ // so text doesn't go off of the screen
                            text.x=game.input.x-230;
                            text.y=game.input.y;
                        }else{
                            text.x=game.input.x;
                            text.y=game.input.y;
                        }
                    }
                    if(blocksa[i].input.pointerOver()){ //if mouse hovers, then display info text
                        text.setText(states.states[i].name+"\n Number of rapes commited: "+states.states[i].assaults+"\n Number of Pornhub Page Views: "+states.states[i].views);
                        if(i>25){
                            text.x=game.input.x-230;
                            text.y=game.input.y;
                        }else{
                            text.x=game.input.x;
                            text.y=game.input.y;
                        }
                    }
                }
            }
            function menuHit(button){
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

            function setScores(){ // setting states into the different bins
                for(var i = 0; i < states.states.length; i++){
                    //75 to 200 step of 6.25 views
                        //score 1-20
                    //10 to 80 step of 3.5 assaults
                        //score 1-20
                    for(var j = 0; j < 20; j++){//assigning the page views score for each state based on scale 0 - 20
                        if(states.states[i].views > 75 + (j*6.25) && states.states[i].views <= 81.25 + (j*6.25)){
                            states.states[i].vScore = j+1;   
                        }     
                    }
                    for(var k = 0; k < 20; k++){//assigning the assaults score for each state based on scale 0 - 20
                        if(states.states[i].assaults > 10 + (k*3.5) && states.states[i].assaults <= 13.5 + (k*3.5)){
                            states.states[i].aScore = k+1;   
                        }   
                    }
                }
            }

            function graphAScore(){ // run a tween and scale the blocks to the size of their assault score
                if(aScale == false){
                    aScale = true;
                        for(var i = 0; i < states.states.length; i++){
                            this.add.tween(blocksa[i].scale).to({ x: 1, y: -states.states[i].aScore}, 500, Phaser.Easing.Back.Out, true, 1000);
                        }
                }else{
                    for(var i = 0; i < states.states.length; i++){
                        this.add.tween(blocksa[i].scale).to({ x: 1, y: -1}, 500, Phaser.Easing.Back.Out, true, 1000);
                    } 
                    aScale = false;
                }
            }

            function graphVScore(){// run a tween and scale the blocks to the size of their views score
                if(vScale == false){
                    console.log("page views by state");
                    vScale = true;
                        for(var i = 0; i < states.states.length; i++){
                            this.add.tween(blocksv[i].scale).to({ x: 1, y: -states.states[i].vScore}, 500, Phaser.Easing.Back.Out, true, 1000);
                        }
                }else{
                    for(var i = 0; i < states.states.length; i++){
                        this.add.tween(blocksv[i].scale).to({ x: 1, y: -1}, 500, Phaser.Easing.Back.Out, true, 1000);
                    } 
                    vScale = false;
                }
            }