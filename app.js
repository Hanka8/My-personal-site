const data = {
    0: {
        id: 0,
        header: "Space tourism multi page",
        text: "This project is a collaboration between us, Scrimba, and Kevin Powell. If you'd like to see how Kevin would tackle the project, you can follow along on Scrimba's free course.",
        src: "assets/space.png",
        page: "https://hanka8.github.io/FM-space-tourism/",
        code: "https://github.com/Hanka8/FM-space-tourism"
    },
    1: {
        id: 1,
        header: "Rock, paper, scissors",
        text: "This project is a collaboration between us, Scrimba, and Kevin Powell. If you'd like to see how Kevin would tackle the project, you can follow along on Scrimba's free course.", 
        src: "assets/rock-paper-scissors.png",
        page: "https://hanka8.github.io/RockPaperScissors_FM/",
        code: "https://github.com/Hanka8/RockPaperScissors_FM"
    },
    2: {
        id: 2,
        header: "Password generator",
        text: "This project is a collaboration between us, Scrimba, and Kevin Powell. If you'd like to see how Kevin would tackle the project, you can follow along on Scrimba's free course.",
        src: "assets/password.png",
        page: "https://hanka8.github.io/Password-generator/",
        code: "https://github.com/Hanka8/Password-generator"
    }
};

const themeSwitcherBtn = document.querySelector("[data-theme-switcher]");
const hamburgerBtn = document.querySelector("[data-hamburger]");
const dataLinks = document.querySelectorAll("[data-link]");
const navBar = document.querySelector("[data-nav]");
const stickyMenu = document.querySelector("[data-sticky-menu]");

const nextBtn = document.querySelector("[data-next]");
const previousBtn = document.querySelector("[data-previous]");

const portfolioHeader = document.querySelector("[data-portfolio-header]");
const portfolioImage = document.querySelector("[data-portfolio-image]");
const portfolioText = document.querySelector("[data-portfolio-text]");
const portfolioSite = document.querySelector("[data-portfolio-site]");
const portfolioCode = document.querySelector("[data-portfolio-code]");

const acordionContainer = document.querySelector("[data-acordion]");

themeSwitcherBtn.addEventListener("click", () => {
    if (themeSwitcherBtn.dataset.theme == "night") {
        document.documentElement.style.setProperty(`--bg`, "hsl(39, 45%, 90%)");
        document.documentElement.style.setProperty(`--hover`, "hsl(273, 75%, 30%)");
        document.documentElement.style.setProperty(`--text`, "hsl(0, 0%, 0%)");
        document.documentElement.style.setProperty(`--btn-text`, "hsl(39, 45%, 90%)");
        themeSwitcherBtn.dataset.theme = "day";
        themeSwitcherBtn.innerHTML = `<ion-icon name="moon-outline"></ion-icon>`;
        dataLinks.forEach(link => {
            link.style.filter = "grayscale(100%)"
        });
      
    } else {
        document.documentElement.style.setProperty(`--bg`, "hsl(248, 37%, 12%)");
        document.documentElement.style.setProperty(`--hover`, "hsl(273, 75%, 30%)");
        document.documentElement.style.setProperty(`--text`, "hsl(50, 80%, 67%)");
        themeSwitcherBtn.dataset.theme = "night";
        themeSwitcherBtn.innerHTML = `<ion-icon name="sunny-outline"></ion-icon>`;
        document.documentElement.style.setProperty(`--btn-text`, "hsl(50, 80%, 67%)");
        dataLinks.forEach(link => {
            link.style.filter = "grayscale(100%) drop-shadow(0px 0px 5px hsl(50, 80%, 67%)) invert(0%)"
        });
    }
});


hamburgerBtn.addEventListener("click", () => {
    if (hamburgerBtn.dataset.open == 0) {
        hamburgerBtn.classList.add("change");
        let mobileMenu = document.createElement("div");
        mobileMenu.classList.add("mobile-menu");
        mobileMenu.innerHTML = `
            <a class="mobile-menu__item" href="#home">Home</a>
            <a class="mobile-menu__item" href="#about">About</a>
            <a class="mobile-menu__item" href="#portfolio">Portfolio</a>
        `;
        navBar.append(mobileMenu);
        hamburgerBtn.dataset.open = 1;
    } else {
        hamburgerBtn.firstChild.name = "menu-outline";
        hamburgerBtn.classList.remove("change");
        let mobileMenu = document.querySelector(".mobile-menu");
        navBar.removeChild(mobileMenu);
        mobileMenu.style.display = "none";
        hamburgerBtn.dataset.open = 0;
    }
    
});

document.addEventListener("scroll", () => {
    if (window.screen.width > 800) {
        if (window.scrollY < 100) {
        stickyMenu.classList.remove("sticky-menu")
    } else {
        stickyMenu.classList.add("sticky-menu");
        } 
    }
});


let counter = 0;

function nextContent() {
    if (counter < Object.keys(data).length - 1) {
        counter++;
    } else {
        counter = 0;  
    }
    getNewSlide(counter);
    
}

function previousContent() {
    if (counter >= 1) {
        counter--;    
    } else {
        counter = Object.keys(data).length - 1;  
    }
    getNewSlide(counter);
}

// argument - (id) = id of the content to be shown 
function getNewSlide(id) {
    portfolioHeader.textContent = data[id]["header"];
    portfolioImage.src = data[id]["src"];
    portfolioText.textContent = data[id]["text"];
    portfolioSite.href = data[id]["page"];
    portfolioCode.href = data[id]["code"];
}

nextBtn.addEventListener("click", nextContent);
previousBtn.addEventListener("click", previousContent);


let startTouch = 0;
let endTouch = 0;

acordionContainer.addEventListener("touchstart", (e) => {
    startTouch = e.changedTouches[0].pageX;
});

acordionContainer.addEventListener("touchend", (x) => {
    endTouch = x.changedTouches[0].pageX;

    if (Math.abs(startTouch - endTouch) > 100) {
        if (startTouch > endTouch) {
            nextContent();
        } else {
            previousContent();
        }
    }
});

portfolioImage.addEventListener("click", (e) => {
    let modal = document.createElement("aside");
    let modalContainer = document.createElement("div");
    let modalImg = document.createElement("img");
    let modalBtn = document.createElement("button");
    modalBtn.innerHTML = `<ion-icon name="close-outline"></ion-icon>`;
    modalBtn.classList.add("modal-button");
    modalContainer.classList.add("modal-container");
    modal.classList.add("modal");
    modalImg.classList.add("modal-image");
    modalImg.src = e.target.src;
    modal.append(modalContainer);
    modalContainer.append(modalImg);
    modalContainer.append(modalBtn);
    document.querySelector("body").append(modal);
    modalBtn.addEventListener("click", closeModal);
    modal.addEventListener("click", (e) => {
        if (e.target.classList.contains("modal")) {
            closeModal();
        }
    })
});


function closeModal() {
    let modal = document.querySelector(".modal");
    document.querySelector("body").removeChild(modal);
}

