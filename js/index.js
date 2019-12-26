        //音訊播放與暫停
        var music = new Audio('mp3/Upbeat.mp3');
        var endAudio = new Audio('mp3/boom.mp3');

        


        //開始遊戲後再啟動其他function
        function startGame() {    
            $('#gamebody').css("cursor", "none")  //將鼠標藏起來
            startMusic()                          //撥放背景音樂
            $("#mask").remove();
            first()
            setTimeout(function () {
                addms()
            }, 2000)
        }

        //進到遊戲後開始音樂
        function startMusic(){
            setInterval(function () { 
                music.play() 
            }, 1000);
        }


        //分數計算
        function first() {
            cc= setInterval(function () { myScore() }, 300);
            var s = 0;
            function myScore() {
                document.getElementById('score').innerText = "SCORE:   " + s++;
            }
        }

        // 怪獸隨機出現
        var speed = 5;
        var aa = 0;
        function addms() {
            var pos = [0, 100, 200, 300, 400];
            for (var i = 0; i < 4; i++) {
                var pospos = Math.floor(Math.random() * 5);
                var pos_x = pos.splice(pospos, 1)[0];
                var msBlock = Math.floor(Math.random() * 7);
                if (pos_x != undefined) {
                    $('#gamebody').append(`<div class="monster"><img src="img/ms${msBlock}.png" style="width: 100px; height: auto;"></div>`);
                    var monster = $('.gamebody').find('.monster:last');
                    monster.data('wave', aa);
                    $('#gamebody').find('.monster:last').css('left', pos_x + "px")
                }
            }
        };

        var msdrop = setInterval(function () {
            $('#gamebody').find('.monster').each(function () {
                var msdown = parseInt($(this).css('top'));
                if (msdown > 300 && $(this).data('wave') == aa) {
                    aa++;
                    addms();
                };
                if (msdown> 600) {
                    $(this).remove()
                    return
                }
           
                $(this).css('top', (msdown + speed) + 'px')
                var sx = parseInt($(this).css('left'));
                var sw = parseInt($(this).css('left')) + $(this).width();
                var sy = parseInt($(this).css('top'));
                var sh = parseInt($(this).css('top')) + $(this).height();

                var px = parseInt($('#astronaut').css('left')) + 40;
                var py = parseInt($('#astronaut').css('top')) + 55;

                if (px > sx && px < sw && py > sy && py < sh || px < 20 || px > 480) {
                    $('#astronaut').attr('src', 'img/boom.png').css('width', '110px')
                    boom();
                    endAudio.play()         
                }


            })
        }, 1000 / 120);

        function boom() { 
            clearInterval(msdrop)            
            var x = 4
            var boomtime = setInterval(function () {
                if (x <= 0) {
                    clearInterval(boomtime);
                    $('#astronaut').css('display', 'none');
                    $('.monster').css('display', 'none');
                } else {
                    x = x - 0.1
                    $('#astronaut').css('transform', `scale(${x})`)
                }
            }, 10)
            setTimeout(function(){
                end()
            },1000/5) 
            
        }

        function end(){
            $('.over_01').css('transform','translateY(0%)');
            $('.over_02').css('transform','translateY(100%)')                  
            music.muted = true;
            clearInterval(cc)

            //經過設定時間後重整網頁回到初始畫面
            setTimeout(function(){
                window.location.reload()
            },3000)
        }

        //當滑鼠進入到gamebody區域內,圖片跟隨滑鼠移動
        $('#gamebody').mousemove(function (event) {
            //偵測螢幕畫面的寬高/2取到螢幕中心點
            //並減去gamebody一半的值取得gamebody的座標點
            var wx = $(document).width()/2-250
            var wy = $(document).height()/2-325
            //取得滑鼠的座標
            var x = (event.pageX)
            var y = (event.pageY)

            var px = x - wx - 50
            var py = y - wy - 50  
            $('#astronaut').css('left', `${px}px`)
            $('#astronaut').css('top', `${py}px`)
        });


