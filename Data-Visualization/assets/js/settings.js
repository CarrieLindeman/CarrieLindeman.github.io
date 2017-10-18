var game = new Phaser.Game(1000,675,Phaser.AUTO,'experience',{preload: preload, create: create, update: update});
            
            function preload(){
                
                game.load.image('menu1','assets/img/menu1.png');
                game.load.image('menu2','assets/img/menu2.png');
                game.load.image('menu3','assets/img/menu3.png');
                game.load.image('menu4','assets/img/menu4.png');
                
                game.load.image('settings','assets/img/settings.png');
                game.load.image('sources','assets/img/sources.png');
            }
    
            function create(){
               
               var settings = game.add.button(975, 500, 'settings', settingsHit, this, 0, 0, 0);
                settings.name = "settings";
                
                var sources = game.add.sprite(game.world.centerX, game.world.centerY, 'sources');
                sources.pivot.x = sources.width/2;
                sources.pivot.y = sources.height/2;
                
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
