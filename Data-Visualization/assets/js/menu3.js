var game = new Phaser.Game(1000,675,Phaser.AUTO,'experience',{preload: preload, create: create, update: update});
 var states;
 var mapA;
 var mapV;
            function preload(){
                game.load.json('states','/Data-Visualization/states.json');
                game.load.image('buttonA','/Data-Visualization/assets/img/button.png');
                game.load.image('buttonV','/Data-Visualization/assets/img/button2.png');
                
                game.load.image('menu1','/Data-Visualization/assets/img/menu1.png');
                game.load.image('menu2','/Data-Visualization/assets/img/menu2.png');
                game.load.image('menu3','/Data-Visualization/assets/img/menu3.png');
                game.load.image('menu4','/Data-Visualization/assets/img/menu4.png');
                
                game.load.image('mapA','/Data-Visualization/assets/img/rapes-america.png');
                game.load.image('mapV','/Data-Visualization/assets/img/views-america.png');
                game.load.image('settings','/Data-Visualization/assets/img/settings.png');
            }
    
            function create(){
                states = game.cache.getJSON('states');
                setScores();
                
                mapV = game.add.sprite(250,100,'mapV');
                mapV.scale.setTo(.7,.7);
                mapV.visible = true;
                mapA = game.add.sprite(251,100,'mapA');
                mapA.scale.setTo(.7,.7);
                mapA.visible = true;
                
                
                
               game.add.button(100, 500, 'buttonA', switchAV, this, 0, 0, 0);
               game.add.button(175, 500, 'buttonV', switchVV, this, 0, 0, 0);
                
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
            }
            
            function update(){
                
            }
            
            function switchVV(){
                this.add.tween(mapA).to({alpha:0}, 500, Phaser.Easing.Back.Out, true, 1000);//tween assault map opacity to 0
                this.add.tween(mapV).to({alpha:1}, 500, Phaser.Easing.Back.Out, true, 1000);//tween views map opacity to 100
                //mapV.visible = true;
                //mapA.visible = false;
            }

            function switchAV(){
                this.add.tween(mapA).to({alpha:1}, 500, Phaser.Easing.Linear.None, true, 1000);//tween assult map opacity to 100
                this.add.tween(mapV).to({alpha:0}, 500, Phaser.Easing.Linear.None, true, 1000);//tween views map opacity to 0
                //mapA.visible = true;
                //mapV.visible = false;
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
            