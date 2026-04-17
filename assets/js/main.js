document.addEventListener("DOMContentLoaded", () => {

  /* =========================================================
     🎬 VIDEO MODALE (INFO PAGE)
  ========================================================= */

  const videoModal = document.getElementById("videoModal");
  const modalVideo = document.getElementById("modalVideo");
  const videoCloseBtn = document.querySelector("#videoModal .close");

  if (videoModal && modalVideo) {

    window.openVideo = function (src) {
      if (!src) return;

      videoModal.style.display = "flex";
      modalVideo.src = src;
      modalVideo.currentTime = 0;

      const playPromise = modalVideo.play();
      if (playPromise !== undefined) {
        playPromise.catch(err => {
          console.log("Autoplay bloccato:", err);
        });
      }
    };

    window.closeVideo = function () {
      modalVideo.pause();
      modalVideo.currentTime = 0;
      modalVideo.src = "";
      videoModal.style.display = "none";
    };

    if (videoCloseBtn) {
      videoCloseBtn.addEventListener("click", closeVideo);
    }

    videoModal.addEventListener("click", (e) => {
      if (e.target === videoModal) closeVideo();
    });
  }

  /* =========================================================
     👤 STAFF MODALE (STAFF PAGE)
  ========================================================= */

  const staffModal = document.getElementById("staffModal");
  const staffContent = document.getElementById("staffContent");
  const staffCloseBtn = document.querySelector("#staffModal .close");

  if (staffModal && staffContent) {

    /* OPEN STAFF CARD */
    window.openStaff = function (data) {

      /*
        data deve essere tipo:
        {
          name,
          role,
          age,
          desc,
          rp,
          skin
        }
      */

      staffContent.innerHTML = `
        <div class="staff-detail">

          <img src="${data.skin}" class="staff-big-img">

          <h2>${data.name}</h2>
          <h3>${data.role}</h3>

          <p><strong>Età:</strong> ${data.age}</p>
          <p><strong>Ruolo RP:</strong> ${data.rp}</p>

          <p class="desc">${data.desc}</p>

        </div>
      `;

      staffModal.style.display = "flex";
    };

    /* CLOSE STAFF */
    window.closeStaff = function () {
      staffModal.style.display = "none";
      staffContent.innerHTML = "";
    };

    if (staffCloseBtn) {
      staffCloseBtn.addEventListener("click", closeStaff);
    }

    staffModal.addEventListener("click", (e) => {
      if (e.target === staffModal) closeStaff();
    });
  }

  /* =========================================================
     ⌨ ESC KEY (CHIUSURA UNIVERSALE)
  ========================================================= */

  document.addEventListener("keydown", (e) => {

    if (e.key === "Escape") {

      if (videoModal && videoModal.style.display === "flex") {
        closeVideo();
      }

      if (staffModal && staffModal.style.display === "flex") {
        closeStaff();
      }

    }

  });

});
document.addEventListener("DOMContentLoaded", () => {

  const modal = document.getElementById("staffModal");
  const content = document.getElementById("staffContent");

  const staffData = {
    z4nu3l: {
      name: "z4nu3l",
      role: "Founder",
      age: "19",
      rp: "Fondatore del server",
      desc: "Gestione completa del progetto Gryphon Roleplay.",
      skin: "https://mc-heads.net/body/z4nu3l"
    },

    nicho033: {
      name: "Nicho033",
      role: "Founder",
      age: "22",
      rp: "Fondatore del server",
      desc: "Gestione sviluppo e community.",
      skin: "https://mc-heads.net/body/nicho033"
    },

    Panna2010: {
      name: "Panna2010",
      role: "Co-Founder",
      age: "16",
      rp: "Coordinatrice Generale STAFF",
      desc: "Supporto gestione staff.",
      skin: "https://mc-heads.net/body/Panna2010"
    },

    Franztroll_ITA: {
      name: "Franztroll_ITA",
      role: "Capo Helper",
      age: "0",
      rp: "Supporto staff",
      desc: "Gestione helper e supporto player.",
      skin: "https://mc-heads.net/body/Franztroll_ITA"
    },

    dark_champ_00: {
      name: "dark_champ_00",
      role: "Helper",
      age: "0",
      rp: "Supporto player",
      desc: "Assistenza in game.",
      skin: "https://mc-heads.net/body/dark_champ_00"
    }
  };

  window.openStaff = function (id) {

    const s = staffData[id];
    if (!s) return;

    content.innerHTML = `
      <div class="staff-detail">

        <img class="staff-big" src="${s.skin}">

        <h2>${s.name}</h2>
        <h3>${s.role}</h3>

        <p><strong>Età:</strong> ${s.age}</p>
        <p><strong>Ruolo RP:</strong> ${s.rp}</p>
        <p>${s.desc}</p>

      </div>
    `;

    modal.style.display = "flex";
  };

  window.closeStaff = function () {
    modal.style.display = "none";
    content.innerHTML = "";
  };

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeStaff();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeStaff();
  });

});


const SERVER_IP = "pro22.gamehosting.it:6093";

async function updateServerStatus() {

  const statusEl = document.getElementById("serverStatus");
  const playersEl = document.getElementById("playerCount");

  try {

    const res = await fetch(`https://api.mcsrvstat.us/2/${SERVER_IP}`);
    const data = await res.json();

    if (data.online) {

      statusEl.innerText = "🟢 Online";

      const online = data.players?.online ?? 0;
      const max = data.players?.max ?? 0;

      playersEl.innerText = `Player: ${online}/${max}`;

    } else {
      statusEl.innerText = "🔴 Offline";
      playersEl.innerText = "Player: 0/0";
    }

  } catch (err) {
    console.log("Errore status server:", err);

    statusEl.innerText = "⚠️ Errore connessione";
    playersEl.innerText = "Player: --";
  }
}

updateServerStatus();
setInterval(updateServerStatus, 10000);

setInterval(updateServerStatus, 5000);
updateServerStatus();


/* =========================
   📋 COPY IP BUTTON
========================= */

function copyIP() {

  const ip = "play.gryphonrp.it";

  navigator.clipboard.writeText(ip);

  const msg = document.getElementById("copyMsg");
  msg.innerText = "IP copiato!";

  setTimeout(() => {
    msg.innerText = "Clicca per copiare IP";
  }, 2000);
}