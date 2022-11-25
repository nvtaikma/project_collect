
const menu = document.querySelector(".menu")
const dropDown = document.querySelector(".drop-down")

dropDown.addEventListener("mouseenter", () => {
    menu.classList.remove("hidden")
})

menu.addEventListener("mouseleave", () => {
    menu.classList.add("hidden")
})

// let video = document.querySelectorAll("video")
// video.forEach(video => {
//     let playPromise = video.play()
//     if(playPromise !== undefined) {
//         playPromise.then(() => {
//             let observer = new IntersectionObserver(entries => {
//                 entries.forEach(entry => {
//                     video.muted = false
//                     if(entry.intersectionRatio !== 1 && !video.paused){
//                         video.pause()
//                     } else if (entry.intersectionRatio > 0.5 && video.paused) {
//                         video.play()
//                     }
//                 })
//             }, {threshold: 0.5})
//             observer.observe(video)
//         })
//     }
// })

const clip=document.querySelectorAll('.clip');
for(let i =0 ;  i<clip.length; i++){

  clip[i].addEventListener('mouseenter',
    function(e){ 
    clip[i].play()
})
clip[i].addEventListener('mouseout',
    function(e){
    clip[i].pause()
})
 }

//  var video=document.querySelectorAll('video')
// video.forEach(play=>play.addEventListener('click',()=>{
//   play.classList.toggle('active');
//   if(play.paused){
//     play.play();
//   }else{
//     play.pause();
//     play.currentTime=0;
//  }
    
// }));

var header = document.getElementById("my_video");
      var btns = header.getElementsByClassName("btn");
      for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", function() {
      var current = document.getElementsByClassName("active");
      current[0].className = current[0].className.replace(" active", "");
      this.className += " active";
      });
      }