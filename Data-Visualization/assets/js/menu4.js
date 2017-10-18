var game = new Phaser.Game(1000,675,Phaser.AUTO,'experience',{preload: preload, create: create, update: update});
 var states;
 var topA = [];
 var topV = []; 
var count = 1;
var oldTime = 0;//oldTime for assault feature
var oldTimeM = 0;//oldTime for mouse feature

var x = 25;
var y = 100;
var x1 = 489;
var y1 = 100;

            function preload(){
                game.load.json('states','/Data-Visualization/states.json');
                game.load.image('buttonA','/Data-Visualization/assets/img/button.png');
                game.load.image('buttonV','/Data-Visualization/assets/img/button2.png');
                
                game.load.image('menu1','/Data-Visualization/assets/img/menu1.png');
                game.load.image('menu2','/Data-Visualization/assets/img/menu2.png');
                game.load.image('menu3','/Data-Visualization/assets/img/menu3.png');
                game.load.image('menu4','/Data-Visualization/assets/img/menu4.png');
                
                game.load.image('person1','/Data-Visualization/assets/img/per1.png');
                game.load.image('person2','/Data-Visualization/assets/img/per2.png');
                game.load.image('mouse','/Data-Visualization/assets/img/mouse.png');
                game.load.image('settings','/Data-Visualization/assets/img/settings.png');
            }
    
            function create(){
                states = game.cache.getJSON('states');
                
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
                
                for(var i = 0; i < 58; i++){
                    for(var j = 0; j < 20; j++){
                        game.add.sprite(25+(i*8),120+(j*20),'person1');   //42 is div number
                    }
                }
                
                
                
                var style = { font: "20px Arial", fill: "#FFFFFF", wordWrap: true, wordWrapWidth: 300, align: "center", backgroundColor: "#000000" };

                text = game.add.text(700, 0, "This is text.", style);
            }
            
            function update(){
                text.setText("Porn and Rape");
                text.x=1200;
                text.y=0;
                
                //provide hover text about what the people symbolize
                if((game.input.x < game.world.centerX-30)&&(game.input.y>150 && game.input.y<500)){
                text.setText("  1 American is sexually assaulted every 107 seconds");
                text.x = game.input.x;
                text.y = game.input.y;
                }
                
                //provide hover text about what the mouse symbolize
                if((game.input.x > game.world.centerX-30)&&(game.input.y>150 && game.input.y<500)){
                text.setText("  Pornhub receives 5,800 page views every second");
                text.x = game.input.x;
                text.y = game.input.y;
                }
                
                var timer = this.game.time.totalElapsedSeconds();
                //display time counter
                game.debug.text('Elapsed seconds: ' + parseInt(this.game.time.totalElapsedSeconds()), 400, 550);
               
                //condition: it is has been over 107 seconds, the second half of this condition was to avoid the program from drawing multiple people within the same second. Because 107.2 and 107.7 would have drawn two people but we only want one for that second.
                if ((parseInt(timer) % 107 == 0) && parseInt(timer)>parseInt(oldTime)){
                        drawNewPeople();
                        count=count+1;
                        oldTime = parseInt(timer);
                }
                
                //condition: it has been one elapsed second and the current time is greater than the last time it drew a mouse for the same reasons as the function above.
                if((parseInt(timer) % 1 == 0) && parseInt(timer)>parseInt(oldTimeM)){
                    drawNewMouse(parseInt(timer));
                    oldTimeM = parseInt(timer);   
                }
            }
            

           function drawNewPeople(){
                x = 25;
                y = 100;
                for(var i = 0; i < count; i++){//draw as many people as count equals
                    if(i%58 == 0){//go onto a new line if you reach the end of a row
                        x = 25;
                        y = y + 20;
                    }
                    game.add.sprite(x,y,'person2');
                    x=x+8 
                }
           }
            function drawNewMouse(time){
                x1 = 489;  
                y1 = 100;
                for(var i = 0; i < time; i++){//draw as many mice as seconds that have passed
                    if(i%50 == 0){//go onto a new line if you reach the end of a row
                        x1 = 489;
                        y1 = y1 +20;
                    }
                    game.add.sprite(x1, y1, 'mouse');
                    x1 = x1 +10;
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
            