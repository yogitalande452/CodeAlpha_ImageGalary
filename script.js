

const images = [

{
    title:"Mountain Landscape",
    category:"Nature",
    description:"Beautiful mountain scenery.",
    image:"https://picsum.photos/id/10/800/500"
},

{
    title:"Forest Path",
    category:"Nature",
    description:"Peaceful forest pathway.",
    image:"https://picsum.photos/id/29/800/500"
},

{
    title:"Modern City",
    category:"City",
    description:"Urban skyline view.",
    image:"https://picsum.photos/id/1011/800/500"
},

{
    title:"City Street",
    category:"City",
    description:"Busy downtown area.",
    image:"https://picsum.photos/id/1031/800/500"
},

{
    title:"Cute Dog",
    category:"Animals",
    description:"Friendly dog portrait.",
    image:"https://picsum.photos/id/1025/800/500"
},

{
    title:"Wild Animal",
    category:"Animals",
    description:"Wildlife photography.",
    image:"https://picsum.photos/id/237/800/500"
},

{
    title:"Computer Setup",
    category:"Technology",
    description:"Modern workspace.",
    image:"https://picsum.photos/id/180/800/500"
},

{
    title:"Technology Future",
    category:"Technology",
    description:"Advanced digital innovation.",
    image:"https://picsum.photos/id/48/800/500"
}

];



const gallery = document.getElementById("gallery");
const searchBox = document.getElementById("searchBox");
const imageCount = document.getElementById("imageCount");

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxTitle = document.getElementById("lightboxTitle");
const lightboxCategory = document.getElementById("lightboxCategory");
const lightboxDescription =
document.getElementById("lightboxDescription");

const closeBtn = document.getElementById("closeBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");



const filterBtns =
document.querySelectorAll(".filter-btn");


let currentIndex = 0;

let filteredImages = [...images];



let favorites =
JSON.parse(localStorage.getItem("favorites")) || [];



function renderGallery(data){

gallery.innerHTML = "";

imageCount.textContent = data.length;

data.forEach((item,index)=>{

const card = document.createElement("div");

card.classList.add("card");

const isFavorite =
favorites.includes(item.title);

card.innerHTML = `

<img
src="${item.image}"
alt="${item.title}"
loading="lazy"
>

<div class="card-content">

<h3>${item.title}</h3>

<p class="category">
${item.category}
</p>

<p>
${item.description}
</p>

<div class="card-buttons">

<button
class="view-btn"
onclick="openLightbox(${index})"
>
View Image
</button>

</div>

</div>

`;

gallery.appendChild(card);

});

}



function openLightbox(index){

currentIndex = index;

showImage();

lightbox.style.display = "flex";

}


function showImage(){

const item = filteredImages[currentIndex];

lightboxImg.src = item.image;

lightboxTitle.textContent =
item.title;

lightboxCategory.textContent =
item.category;

lightboxDescription.textContent =
item.description;

}


function nextImage(){

currentIndex++;

if(currentIndex >= filteredImages.length){

currentIndex = 0;

}

showImage();

}



function previousImage(){

currentIndex--;

if(currentIndex < 0){

currentIndex =
filteredImages.length - 1;

}

showImage();

}



nextBtn.addEventListener(
"click",
nextImage
);

prevBtn.addEventListener(
"click",
previousImage
);

closeBtn.addEventListener(
"click",
()=>{

lightbox.style.display="none";

stopSlideshow();

}
);



searchBox.addEventListener(
"input",
function(){

const value =
this.value.toLowerCase();

filteredImages =
images.filter(item=>

item.title
.toLowerCase()
.includes(value)

);

renderGallery(filteredImages);

}
);



filterBtns.forEach(btn=>{

btn.addEventListener("click",()=>{

filterBtns.forEach(button=>
button.classList.remove("active")
);

btn.classList.add("active");

const category =
btn.dataset.filter;

if(category==="all"){

filteredImages = [...images];

}
else{

filteredImages =
images.filter(item=>

item.category===category

);

}

renderGallery(filteredImages);

});

});



document.addEventListener(
"keydown",
(e)=>{

if(lightbox.style.display==="flex"){

if(e.key==="ArrowRight"){

nextImage();

}

if(e.key==="ArrowLeft"){

previousImage();

}

if(e.key==="Escape"){

lightbox.style.display="none";

}

}

}
);


lightbox.addEventListener(
"click",
(e)=>{

if(e.target===lightbox){

lightbox.style.display =
"none";

stopSlideshow();

slideshowBtn.textContent =
"Start Slideshow";

}

}
);

renderGallery(filteredImages);