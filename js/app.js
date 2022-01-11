/*=============== MENU ===============*/
const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");

if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  navMenu.classList.remove("show-menu");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

function scrollHeader() {
  const header = document.getElementById("header");
  // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
  if (this.scrollY >= 50) header.classList.add("scroll-header");
  else header.classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader);

/*=============== TESTIMONIAL SWIPER ===============*/
let testimonialSwiper = new Swiper(".testimonial-swiper", {
  spaceBetween: 30,
  loop: "true",

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

let newSwiper = new Swiper(".new-swiper", {
  spaceBetween: 24,
  loop: "true",

  breakpoints: {
    576: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 3,
    },
    1024: {
      slidesPerView: 4,
    },
  },
});

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 58,
      sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.add("active-link");
    } else {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.remove("active-link");
    }
  });
}
window.addEventListener("scroll", scrollActive);

/*=============== SHOW SCROLL UP ===============*/
function scrollUp() {
  const scrollUp = document.getElementById("scroll-up");

  if (this.scrollY >= 350) scrollUp.classList.add("show-scroll");
  else scrollUp.classList.remove("show-scroll");
}
window.addEventListener("scroll", scrollUp);

/*=============== SHOW CART ===============*/
const cartDisplay = document.getElementById("cart"),
  cartShop = document.getElementById("cart-shop"),
  cartClose = document.getElementById("cart-close");

if (cartShop) {
  cartShop.addEventListener("click", () => {
    cartDisplay.classList.add("show-cart");
  });
}

if (cartClose) {
  cartClose.addEventListener("click", () => {
    cartDisplay.classList.remove("show-cart");
  });
}

/*=============== DARK LIGHT THEME ===============*/
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "bx-sun";

const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "bx bx-moon" : "bx bx-sun";

if (selectedTheme) {
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
  themeButton.classList[selectedIcon === "bx bx-moon" ? "add" : "remove"](
    iconTheme
  );
}

themeButton.addEventListener("click", () => {
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});

/*=============== RENDER PRODUCTS ===============*/
const productSection = document.querySelector(".products__container");

const productList = [
  { product: "Spirit Rose", price: 1500, img: "./img/product1.png" },
  { product: "Jubilee Black", price: 870, img: "./img/product3.png" },
  { product: "Foil ME3", price: 650, img: "./img/product4.png" },
  { product: "Duchen", price: 950, img: "./img/product5.png" },
  { product: "Jazzmaster", price: 1050, img: "./img/product6.png" },
  { product: "Ingersoll", price: 250, img: "./img/product7.png" },
  { product: "Rose Gold", price: 850, img: "./img/product8.png" },
  { product: "Longuines Rose", price: 980, img: "./img/product9.png" },
  { product: "Dreyfuss Gold", price: 750, img: "./img/product10.png" },
  { product: "Portuguese Gold", price: 1590, img: "./img/product11.png" },
  { product: "Khaki Pilot", price: 1350, img: "./img/product2.png" },
];

productList.forEach((prod) => {
  productSection.innerHTML += `<article class="products__card">
    <img src="${prod.img}" alt="" class="products__img">
  
    <h3 class="products__title">${prod.product}</h3>
    <span class="products__price">$${prod.price}</span>
  
    <button class="products__button" onclick="addToCart('${prod.product}')">
        <i class='bx bx-shopping-bag'></i>
    </button>
  </article>`;
});

/*=============== ADD TO CART & CART FUNCTIONS ===============*/
let cart = [];
if (localStorage.getItem("cart") != null) {
cart = JSON.parse(localStorage.getItem("cart"));
}

const cartContainer = document.getElementById("cart__container");
const cartTotalItems = document.getElementById("cart__prices-item");
const cartTotalPrice = document.getElementById("cart__prices-total");

function addToCart(product) {
  let item = productList.find((id) => id.product === product);
  let cartSome = cart.find((item) => item.product === product);
  // if (cartSome != undefined) {
  //   changeQuantity(2, cartSome.product);
  // } else {
    cart.push({ ...item, quantity: 1 });
  // }
  updateCart();
}

const updateCart = () => {
  if (cart.length > 0) {
    cart = cart.filter(( element ) => {
      return element !== undefined;
   });
  }
  renderItems();
  // calc total items-price
  let totalPrice = 0;
  let totalItems = 0;
  cart.forEach((item) => {
    totalPrice += item.price * item.quantity;
    totalItems += item.quantity;
  });
  cartTotalItems.innerHTML = "";
  cartTotalPrice.innerHTML = "";
  cartTotalItems.innerHTML = `${totalItems} items`;
  cartTotalPrice.innerHTML = `$${totalPrice}`;
  localStorage.setItem("cart", JSON.stringify(cart));
};

const renderItems = () => {
  cartContainer.innerHTML = "";
  cart.forEach((item) => {
    cartContainer.innerHTML += `<article class="cart__card">
    <div class="cart__box">
        <img src="${item.img}" alt="" class="cart__img">
    </div>

    <div class="cart__details">
        <h3 class="cart__title">${item.product}</h3>
        <span class="cart__price">$${item.price}</span>

        <div class="cart__amount">
            <div class="cart__amount-content">
                <span class="cart__amount-box">
                    <i class='bx bx-minus'></i>
                </span>

                <span class="cart__amount-number">${item.quantity}</span>

                <span class="cart__amount-box">
                    <i class='bx bx-plus'></i>
                </span>
            </div>

            <i class='bx bx-trash-alt cart__amount-trash'></i>
        </div>
    </div>
</article>`;
  });
};

/*=============== ATENCIÓN! (pongo esto en español para que sea más fácil de leer) Esto está todo comentado porque más o menos funciona, 
pero tiene 2 fallas: 1) en el momento en que le pongo comprar 2 veces desde la sección de productos (en vez de apretar el + del carrito) a un producto de varios,
se borra todo el carrito y solo queda ese producto que le apreté comprar 2 veces desde la sección productos.
2) En el momento en que se borra el último producto del carrito (ya sea con el botoncito del tacho de basura o con el - cuando hay un solo item), el array crea un
elemento undefined (que no sé de dónde lo saca, porque se crea entre la función *changeQuantity* y *updateCart*), que hace que todo entre en error ===============*/

// const changeQuantity = (operation, product) => {
//   cart = cart.map((item) => {
//     let numberOfUnits = item.quantity;

//     if (item.product === product) {
//       if (operation === 1 && numberOfUnits > 1) {
//         numberOfUnits--;
//         return {
//           ...item,
//           quantity: numberOfUnits,
//         };
//       } else if ((operation === 1 && numberOfUnits <= 1) || operation === 0) {
//         const index = cart.indexOf(item);
//         if (index > -1) {
//           cart.splice(index, 1);
//         }
//       } else if (operation === 2) {
//         numberOfUnits++;
//         return {
//           ...item,
//           quantity: numberOfUnits,
//         };
//       }
//     }
//   });
//   updateCart();
// };

updateCart();

/*=============== RANDOM QUOTE ===============*/
const URLGET = "https://favqs.com/api/qotd";
let misDatos = "";

$.ajax({
  method: "GET",
  url: URLGET,
  success: function (respuesta) {
    if (respuesta.success) {
      $(".story__description").html(
        `${respuesta.quote.body} - <b>${respuesta.quote.author}</b>`
      );
    } else {
      $(".story__description").html(
        `It doens't just tell time. It tells history - <b>Rolex</b>`
      );
    }
  },
});

/*=============== SUBSCRIPTION ===============*/

function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

document.getElementById("submitMail").addEventListener("click", function (e) {
  e.preventDefault();
  let Text = document.getElementById("newsletter__title");
  $("#newsletter__text").fadeOut("fast");
  delay(100).then(() => {
    $("#newsletter__description").css("display", "none");
    if (localStorage.getItem("mailSuscripcion") === null) {
      let mail = document.getElementById("newsletter__input").value;
      localStorage.setItem("mailSuscripcion", mail);
      Text.innerHTML = `<p>You are suscripted to our newsletter!</p>`;
    } else {
      Text.innerHTML = `<p>We already have your mail registered in our newsletter list.</p>`;
    }
    $("#newsletter__text").fadeIn("fast");
  });
});
