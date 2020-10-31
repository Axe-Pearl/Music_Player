document.onkeydown=detect;
//intialization
let current_track = document.createElement('audio');
let count=0;
let count_mute=0;
let colour_counter=0;
let volume_counter=4;
let switchstatus=0;
let prev_record;
let flag=1;
let seeking;
let seekto;
let seek_slider;
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");
let flip_counter=0;
//let seekslider=document.getElementById("seek_slider");
let track_index=0;
let choice = document.querySelector(".csong");
//below :is used to change the song after it ends (Autoplay feature)
var s=setInterval(function(){
    if(current_track.currentTime==current_track.duration){
      count=0;
      nextTrack();
    }
 },10);
//creating PlayList using array
let tracks=[
  {
    name:"Pirates_of_the_Caribbean_bgm",
    artist:"Unknown",
    cover:"im_lib/pirates.jpg",
    path:"mu_lib/pirates_guitar.mp3",
  },
  {
    name:"Harry_Potter",
    artist:"Unknown",
    cover:"im_lib/harry_potter.jpg",
    path:"mu_lib/harry_potter_metal.mp3"
  },
  {
    name:"Faded",
    artist:"Alan Walker",
    cover:"im_lib/fadedi.jpg",
    path:"mu_lib/faded.mp3"
  },
  {
    name:"Love me like you do",
    artist:"Ellie Goulding",
    cover:"im_lib/loveme.jpg",
    path:"mu_lib/love_me_like_you_do.mp3"
  },
  {
    name:"I Love You Baby(ily)",
    artist:"Surf Mesa",
    cover:"im_lib/ily.jpg",
    path:"mu_lib/i_love_you_baby.mp3"
  }
];
//Play or Pause music mechanism
function playpauseTrack(){
  if(count>1){count=0;}
  //setInterval(seekupdate,1000);
  current_track.src=tracks[track_index].path;
  if(flag==1){//here flag is used prevent multiple append or display of curent song name or artist name
  let current_song=document.getElementById("song");
  let current_artist=document.getElementById("artist");
  let current_cover=document.getElementById("cover");
  current_cover.src=tracks[track_index].cover;
  let song=document.createTextNode(tracks[track_index].name);
  let artist =document.createTextNode(tracks[track_index].artist);
  current_song.appendChild(song)
  current_artist.appendChild(artist);
  flag=0;
}
//count is used to identify a request i.e.for play or pause
  if(count==0){
    let play=document.getElementById("play");
    current_track.play();
    play.setAttribute("class","fa fa-pause-circle fa-5x");
  }
  if(count==1){
    current_track.pause();
    play.setAttribute("class","fa fa-play-circle fa-5x");

  }
count++;
}
//below:is used to play next song
function nextTrack(){
  track_index++;
  song.textContent =" ";
  artist.innerHTML=" ";
  if(track_index>tracks.length-1){
    track_index=0;
  }
  flag=1;count=0;
  choice_play(track_index);

  }
  //below:is used to play Previous song
function  prevTrack(){
  track_index--;
  song.textContent=" ";
  artist.innerHTML=" ";
  if(track_index<0){
    track_index=tracks.length-1;
  }
  flag=1;count=0;
  choice_play(track_index);
}
  /*function seekTo(val){
    seek_slider=val;
    //alert("working!");
      //alert(seekslider.value);
      seekto = current_track.duration * ( val/ 100);
      current_track.currentTime = seekto;
  }
  function seekupdate(){
    let seekPosition = 0;

  // Check if the current track duration is a legible number
  if (!isNaN(current_track.duration)) {
    seekPosition = current_track.currentTime * (100 / current_track.duration);
    seek_slider = seekPosition;

    // Calculate the time left and the total duration
    let currentMinutes = Math.floor(current_track.currentTime / 60);
    let currentSeconds = Math.floor(current_track.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(current_track.duration / 60);
    let durationSeconds = Math.floor(current_track.duration - durationMinutes * 60);

    // Add a zero to the single digit time values
    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

    // Display the updated duration
    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}*/
// it is used to remove highlighted colour to prev selected song
function restoreColor() {
  document.getElementById(prev_record).style.backgroundColor="";
}
//it is used to highlight colour to current song playing in playlist
function choice_play(song_id){
  if(colour_counter==1){
    restoreColor(prev_record);
    colour_counter=0;
  }
  let selected = document.getElementById(song_id);
  selected.style.backgroundColor="red";
  song.textContent=" ";
  artist.innerHTML=" ";
  track_index=song_id;
  flag=1,count=0;
  playpauseTrack();
  prev_record=song_id;
  colour_counter++;
}
//background: rgb(8,0,0);
//background: linear-gradient(90deg, rgba(8,0,0,1) 0%, rgba(39,41,51,1) 11%, rgba(148,187,233,1) 100%);
/*function show(){
  var filename=document.getElementById("file");
  alert('Selected file: ' + filename.value);
  tracks.push(filename.value);
  let name =filename.value;
  let name2="";
  for(var i=12;i<name.length;i++){
    name2=name2+name[i];
  }
  var songer = new audio(name);
  songer.play();
  alert(name2);
  current_track=name2;
  playpauseTrack();
}*/
//below:is used to mute or unmute music
function sound(){
  if(count_mute>1){count_mute=0;}
  var m_button =document.getElementById("sounding");
  if(count_mute==0){
    m_button.setAttribute("src","im_lib/mute.png");
    current_track.muted=true;

  }
  if(count_mute==1){
    m_button.setAttribute("src","im_lib/unmute.png");
    current_track.muted=false;
  }
  count_mute++;
}
/*function autoplay(){
  if(switchstatus>1){
    switchstatus=0;
  }
  if(switchstatus==0){
    count=0;flag=1;
    alert(switchstatus);
    //  var s=setInterval(function(){
        if(current_track.currentTime==current_track.duration){
          //count=0;
          nextTrack();
        }
    //  },10);
    }
    if(switchstatus==1){
      count=1;
alert(switchstatus);
      //setTimeout(s,1000);
      //var t=setInterval(function(){
        if(current_track.currentTime==current_track.duration){
          playpauseTrack();
        }
      //},10);
    }
    switchstatus++;
  }*/
  //it is used to display or hide volume meter
 function opener(){
   if(flip_counter>1){flip_counter=0;}
   let volumeset = document.getElementById("vsetor");
   let vol4 = document.querySelector(".vol4");
   let vol3 = document.querySelector(".vol3");
   let vol2 = document.querySelector(".vol2");
   let vol1 = document.querySelector(".vol1");
   if(flip_counter==0){
     volumeset.classList.add("rotate-img");
     vol4.style.visibility="visible";
     vol3.style.visibility="visible";
     vol2.style.visibility="visible";
     vol1.style.visibility="visible";
     //setvolume(event);
}
   if(flip_counter==1){
     volumeset.classList.remove("rotate-img");
     vol4.style.visibility="hidden";
     vol3.style.visibility="hidden";
     vol2.style.visibility="hidden";
     vol1.style.visibility="hidden";
   }
   flip_counter++;

 }
 // it is used to listen/detect keyboard button press event
function detect(event){
  let vol1 =document.querySelector(".vol1");
  let vol2 =document.querySelector(".vol2");
  let vol3 =document.querySelector(".vol3");
  let vol4 =document.querySelector(".vol4");
  if(event.keyCode=="37"){
    prevTrack();
  }
  if(event.keyCode=="39"){
    nextTrack();
  }
  if(event.keyCode=="32"){
    playpauseTrack();
  }
  if(event.keyCode=="77"){
    sound();
  }
  if(event.keyCode=="38"){
    if(volume_counter>4){volume_counter=4;}
    if(volume_counter==1){
      vol1.style.backgroundColor="green";
      current_track.volume=0.2;
      count_mute=1;
      sound();
    }
    if(volume_counter==2){
      vol2.style.backgroundColor="green";
      current_track.volume=0.3;
    }
    if(volume_counter==3){
      vol3.style.backgroundColor="green";
      current_track.volume=0.5;
    }
    if(volume_counter==4){
      vol4.style.backgroundColor="green";
      current_track.volume=1.0;
    }
    volume_counter++;
    }
    if(event.keyCode=="40"){
      if(volume_counter<0){volume_counter=0;}
      if(volume_counter==0){
        //vol1.style.backgroundColor="black";
        current_track.volume=0.0;
        count_mute=0;
        sound();
      }
      if(volume_counter==1){
        vol1.style.backgroundColor="black";
        current_track.volume=0.2;
      }
      if(volume_counter==2){
        vol2.style.backgroundColor="black";
        current_track.volume=0.3;
      }
      if(volume_counter==3){
        vol3.style.backgroundColor="black";
        current_track.volume=0.5;
      }
      if(volume_counter==4){
        vol4.style.backgroundColor="black";
        current_track.volume=1.0;
      }
      if(volume_counter<0){volume_counter=0;}
      volume_counter--;
      }

}
