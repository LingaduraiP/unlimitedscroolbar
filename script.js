// Elements
const imageContainer = document.querySelector(".image_container");
const loader = document.getElementById("loader");
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

let photosArray = [];

//Helper Function for Set Attributes on Dom Element
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Create Elements for Links & Photos ,And to Dom
function displayPhotos() {
  imagesLoaded = 0;

  totalImages = photosArray.length;

  //Run a function for Each object in photosArray

  photosArray.forEach((photo) => {
    // Create a <a> tag to link Unsplash

    const item = document.createElement("a");

    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });

    //Create <img> for Photo
    const img = document.createElement("img");

    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    // Event Listners, check when each is finished loading
    img.addEventListener("load", imageLoaded);

    //Put <img> inside <a>, then put both inside imageContainer Element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}
// Unsplash API
let count = 5;
const apiKey = "7KELLDvkGvHjezJSEmnNKN2m6HKKQWFpUtfRCzOwFko";
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
//Check if all images were loaded
function imageLoaded() {
  imagesLoaded++;

  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    count = 30;
  }
}

//Create Elements for links & Phots, Add to Dom

// Get Photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {}
}

// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

//On load
getPhotos();
