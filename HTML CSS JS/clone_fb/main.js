
function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }


  // dropdown
  /* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}



// get api
// avatar

const baseURL = 'https://62ebc1e5705264f263dfa66f.mockapi.io/v1'


const _axios = {
  get(url, opts = {}) {
    return fetch(url, {
      method: "GET",
      ...opts,
    })
  },
  post(url, payload, opts = {}) {
    return fetch(url, {
      method: "POST",
      body: payload,
      ...opts,
    })
  }
}

function getUserInfo() {
  return new Promise((resolve,reject) => {

    let userUrl = baseURL + '/user'

    _axios.get(userUrl)
    .then(response => { 
      return response.json()
    })
    .then(data => {
      resolve(data[1])
      document.getElementsByClassName('loading')[0].classList.remove('loader');

    })
    .catch(err => {
      reject(err)
    })
  })
}


window.addEventListener('DOMContentLoaded', function() {
  console.log('running when page loaded');
  // 88, 174, 363, 409

 getUserInfo().then(data => {


  const avatar = document.getElementById("avatar")
  const asss1 = document.getElementById("avatar2")
  const asss2 = document.getElementById("avatar3")
  const asss3= document.getElementById("avatar4")
  const asss4= document.getElementById("avatar5")
  const asss5= document.getElementById("avatar6")
  const asss6= document.getElementById("avatar7")
  const asss7= document.getElementById("avatar8")
  


  const background = document.getElementById("background")
  const username = document.getElementById("username")
  username.innerHTML = data.name
  background.src = data.background
  avatar.src = data.avatar
  asss1.src = data.avatar
  asss2.src = data.avatar
  asss3.src = data.avatar
  asss4.src = data.avatar
  asss5.src = data.avatar
  asss6.src = data.avatar
  asss7.src = data.avatar



 })
 .catch(e => {
  //  alert(e.message)
 })
})
// 88, 174, 363, 409


// image
// img_1
function getImage_1() {
  return new Promise((resolve,reject) => {

    let userUrl = baseURL + '/images'

    _axios.get(userUrl)
    .then(response => { 
      return response.json()
    })
    .then(data => {
      resolve(data[4])
    })
    .catch(err => {
      reject(err)
    })
  })
}

window.addEventListener('DOMContentLoaded', function() {
  console.log('running when page loaded');
  // 88, 174, 363, 409

 getImage_1().then(data => {
  const photo_box_0 = document.getElementById("photo_box_0")
  photo_box_0.src = data.imageUrl
 })
 .catch(e => {
  //  alert(e.message)
 })
})
// img_2
function getImage_2() {
  return new Promise((resolve,reject) => {

    let userUrl = baseURL + '/images'

    _axios.get(userUrl)
    .then(response => { 
      return response.json()
    })
    .then(data => {
      resolve(data[2])
    })
    .catch(err => {
      reject(err)
    })
  })
}

window.addEventListener('DOMContentLoaded', function() {
  console.log('running when page loaded');
  // 88, 174, 363, 409

 getImage_2().then(data => {
  const photo_box_2 = document.getElementById("photo_box_2")
  photo_box_2.src = data.imageUrl
 })
 .catch(e => {
  //  alert(e.message)
 })
})
// img_3
function getImage_3() {
  return new Promise((resolve,reject) => {

    let userUrl = baseURL + '/images'

    _axios.get(userUrl)
    .then(response => { 
      return response.json()
    })
    .then(data => {
      resolve(data[3])
    })
    .catch(err => {
      reject(err)
    })
  })
}

window.addEventListener('DOMContentLoaded', function() {
  console.log('running when page loaded');
  // 88, 174, 363, 409

 getImage_3().then(data => {
  const photo_box_3 = document.getElementById("photo_box_3")
  photo_box_3.src = data.imageUrl
 })
 .catch(e => {
  //  alert(e.message)
 })
})
// friends

// f1
function getUserFriend_1() {
  return new Promise((resolve,reject) => {

    let userUrl = baseURL + '/friends'

    _axios.get(userUrl)
    .then(response => { 
      return response.json()
    })
    .then(data => {
      resolve(data[10])
    })
    .catch(err => {
      reject(err)
    })
  })
}

window.addEventListener('DOMContentLoaded', function() {
  console.log('running when page loaded');
  // 88, 174, 363, 409

 getUserFriend_1().then(data => {
  const avatar1 = document.getElementById("avatar_fr1")
  const avt_1 = document.getElementById("avt_1")
  const username = document.getElementById("username_fr1")
  username.innerHTML = data.name
  avatar1.src = data.avatar
  avt_1.src =data.avatar
 })
 .catch(e => {
  //  alert(e.message)
 })
})
// f2
function getUserFriend_2() {
  return new Promise((resolve,reject) => {

    let userUrl = baseURL + '/friends'

    _axios.get(userUrl)
    .then(response => { 
      return response.json()
    })
    .then(data => {
      resolve(data[2])
    })
    .catch(err => {
      reject(err)
    })
  })
}

window.addEventListener('DOMContentLoaded', function() {
  console.log('running when page loaded');
  // 88, 174, 363, 409

 getUserFriend_2().then(data => {
  const avatar = document.getElementById("avatar_fr2")
  const avt_2 = document.getElementById("avt_2")

  const username = document.getElementById("username_fr2")
   username.innerHTML = data.name
    avatar.src = data.avatar
    avt_2.src =data.avatar
 })
 .catch(e => {
  //  alert(e.message)
 })
})
// f3
function getUserFriend_3() {
  return new Promise((resolve,reject) => {

    let userUrl = baseURL + '/friends'

    _axios.get(userUrl)
    .then(response => { 
      return response.json()
    })
    .then(data => {
      resolve(data[3])
    })
    .catch(err => {
      reject(err)
    })
  })
}

window.addEventListener('DOMContentLoaded', function() {
  console.log('running when page loaded');
  // 88, 174, 363, 409

 getUserFriend_3().then(data => {
   const avatar1 = document.getElementById("avatar_fr3")
   const avt_3 = document.getElementById("avt_2")
   const username = document.getElementById("username_fr3")
   username.innerHTML = data.name
  avatar1.src = data.avatar
  avt_3.src = data.avatar
 })
 .catch(e => {
  //  alert(e.message)
 })
})
// f4
function getUserFriend_4() {
  return new Promise((resolve,reject) => {

    let userUrl = baseURL + '/friends'

    _axios.get(userUrl)
    .then(response => { 
      return response.json()
    })
    .then(data => {
      resolve(data[4])
    })
    .catch(err => {
      reject(err)
    })
  })
}

window.addEventListener('DOMContentLoaded', function() {
  console.log('running when page loaded');
  // 88, 174, 363, 409

 getUserFriend_4().then(data => {
  const avatar1 = document.getElementById("avatar_fr4")
  const avt_4 = document.getElementById("avt_2")
  const username = document.getElementById("username_fr4")
   username.innerHTML = data.name
  avatar1.src = data.avatar
  avt_4.src = data.avatar
 })
 .catch(e => {
  //  alert(e.message)
 })
})
// f5
function getUserFriend_5() {
  return new Promise((resolve,reject) => {

    let userUrl = baseURL + '/friends'

    _axios.get(userUrl)
    .then(response => { 
      return response.json()
    })
    .then(data => {
      resolve(data[5])
    })
    .catch(err => {
      reject(err)
    })
  })
}

window.addEventListener('DOMContentLoaded', function() {
  console.log('running when page loaded');
  // 88, 174, 363, 409

 getUserFriend_5().then(data => {
  const avatar1 = document.getElementById("avatar_fr5")
  const avt_5 = document.getElementById("avt_5")
  const username = document.getElementById("username_fr5")
   username.innerHTML = data.name
  avatar1.src = data.avatar
  avt_5.src = data.avatar
 })
 .catch(e => {
  //  alert(e.message)
 })
})
// f6
function getUserFriend_6() {
  return new Promise((resolve,reject) => {

    let userUrl = baseURL + '/friends'

    _axios.get(userUrl)
    .then(response => { 
      return response.json()
    })
    .then(data => {
      resolve(data[6])
    })
    .catch(err => {
      reject(err)
    })
  })
}

window.addEventListener('DOMContentLoaded', function() {
  console.log('running when page loaded');
  // 88, 174, 363, 409

 getUserFriend_6().then(data => {
  const avatar1 = document.getElementById("avatar_fr6")
  const avt_6 = document.getElementById("avt_6")
  const username = document.getElementById("username_fr6")
   username.innerHTML = data.name
  avatar1.src = data.avatar
  avt_6.src = data.avatar
 })
 .catch(e => {
  //  alert(e.message)
 })
})
// f7
function getUserFriend_7() {
  return new Promise((resolve,reject) => {

    let userUrl = baseURL + '/friends'

    _axios.get(userUrl)
    .then(response => { 
      return response.json()
    })
    .then(data => {
      resolve(data[7])
    })
    .catch(err => {
      reject(err)
    })
  })
}

window.addEventListener('DOMContentLoaded', function() {
  console.log('running when page loaded');
  // 88, 174, 363, 409

 getUserFriend_7().then(data => {
  const avatar1 = document.getElementById("avatar_fr7")
  const avt_7 = document.getElementById("avt_7")
  const username = document.getElementById("username_fr7")
   username.innerHTML = data.name
  avatar1.src = data.avatar
  avt_7.src = data.avatar
 })
 .catch(e => {
  //  alert(e.message)
 })
})
// f8
function getUserFriend_8() {
  return new Promise((resolve,reject) => {

    let userUrl = baseURL + '/friends'

    _axios.get(userUrl)
    .then(response => { 
      return response.json()
    })
    .then(data => {
      resolve(data[8])
    })
    .catch(err => {
      reject(err)
    })
  })
}

window.addEventListener('DOMContentLoaded', function() {
  console.log('running when page loaded');
  // 88, 174, 363, 409

 getUserFriend_8().then(data => {
  const avatar1 = document.getElementById("avatar_fr8")
  const avt_8 = document.getElementById("avt_8")
  const username = document.getElementById("username_fr8")
   username.innerHTML = data.name
  avatar1.src = data.avatar
  avt_8.src = data.avatar
 })
 .catch(e => {
  //  alert(e.message)
 })
})
// f9
function getUserFriend_9() {
  return new Promise((resolve,reject) => {

    let userUrl = baseURL + '/friends'

    _axios.get(userUrl)
    .then(response => { 
      return response.json()
    })
    .then(data => {
      resolve(data[9])
    })
    .catch(err => {
      reject(err)
    })
  })
}

window.addEventListener('DOMContentLoaded', function() {
  console.log('running when page loaded');
  // 88, 174, 363, 409

 getUserFriend_9().then(data => {
  const avatar1 = document.getElementById("avatar_fr9")
  const avt_9 = document.getElementById("avt_9")
  const username = document.getElementById("username_fr9")
   username.innerHTML = data.name
  avatar1.src = data.avatar
  avt_9.src = data.avatar
 })
 .catch(e => {
  //  alert(e.message)
 })
})

//post
function getpost_1() {
  return new Promise((resolve,reject) => {

    let userUrl = baseURL + '/posts'

    _axios.get(userUrl)
    .then(response => { 
      return response.json()
    })
    .then(data => {
      resolve(data[10])

    })
    .catch(err => {
      reject(err)
    })
  })
}

window.addEventListener('DOMContentLoaded', function() {
  console.log('running when page loaded');
  // 88, 174, 363, 409

 getpost_1().then(data => {
  const post_1 = document.getElementById("post_1")
  const countComment_1 = document.getElementById("comment_1")
  countComment_1.src = data.content
  post_1.src = data.avatar
 })
 .catch(e => {
  //  alert(e.message)
 })
})