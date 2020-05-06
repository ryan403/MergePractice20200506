let player;
let currentPlay = 0;

//當YouTube API準備好時
function onYouTubeIframeAPIReady(){

    player = new YT.Player("player",
        {
            height:"390",
            width:"640",
            videoId:playList[currentPlay],
            playerVars:{
                "autoplay":0, //不自動撥放
                "controls":0, //不顯示控制項
                "start":playTime[currentPlay][0], //起始秒數
                "end":playTime[currentPlay][1],  //結束秒數
                "showinfo":0, //2018/9/25被廢除，關不掉上方標題
                "rel":0, //2018/9/25後，還是會顯示，可透過預載影片擋住
                "iv_load_policy":3 //不顯示影片註解式行銷
            },
            events:{
                "onReady":onPlayerReady,
                "onStateChange":onPlayerStateChange
            }
        }
    );
}

function onPlayerReady(event){
    $("#playButton").click(function(){
        $("h2").text(player.getVideoData().title);
        player.playVideo();
    });
}

function onPlayerStateChange(event){
    //當目前撥放秒數與預期播放結束秒數相同時，去撥下一首
    if(Math.floor(player.getCurrentTime())==playTime[currentPlay][1]){
        //正常撥下一首
        if(currentPlay<playList.length-1){
            currentPlay++;
            player.loadVideoById({
                "videoId":playList[currentPlay],
                "startSeconds":playTime[currentPlay][0],
                "endSeconds":playTime[currentPlay][1],
                "suggestedQuality":"large"
            });
        }else{ //已經撥到最後一首的話，就將第一首準備好，並且停止撥放
            currentPlay = 0;
            player.cueVideoById({
                "videoId":playList[currentPlay],
                "startSeconds":playTime[currentPlay][0],
                "endSeconds":playTime[currentPlay][1],
                "suggestedQuality":"large"
            });
        }
    } //影片開始時抓取影片標題來顯示
    if(player.getVideoLoadedFraction()>0){ 
        $("h2").text(player.getVideoData().title);
    }
}
