const loadToolsData = async (seeMore, sortByDate) => {
  const res = await fetch("https://openapi.programming-hero.com/api/ai/tools");
  const data = await res.json();
  const tools = data.data.tools;
  displayTools(tools, seeMore, sortByDate);
};

//! Display Tools 
const displayTools = (tools, seeMore, sortByDate) => {
  const toolsContainer = document.getElementById("cardsContainer");

  const seeMoreContainer = document.getElementById("seeMoreBtnContainer");

  if(tools.length > 10 && !seeMore ) {
    seeMoreContainer.classList.remove("hidden");
  }
  else {
    seeMoreContainer.classList.add("hidden");
  }

  if(!seeMore) {
    tools = tools.slice(0, 6);
  }
  
  const sortByDateItems =(a, b) => {
    const dateA = new Date(a.published_in);
    const dateB = new Date(b.published_in);

    if(dateA > dateB) return 1;
    else if(dateA < dateB) return -1;
    else return 0;

  }

  if(sortByDate) {
    tools.sort(sortByDateItems);
  }
  
  toolsContainer.classList = `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-5 `;

  toolsContainer.textContent = "";

  tools.forEach((tool) => {
    const toolCard = document.createElement("div");
    toolCard.classList = `border rounded-lg p-3`;

    toolCard.innerHTML = `
    <figure><img class="rounded-lg" src="${tool?.image}" alt="Shoes" /></figure>
    <div class="card-body">
      <div id="features-container">
        <h1 class="text-2xl font-bold mb-3">Features</h1>

        <ol class="list-decimal ml-4">
        ${tool?.features.map((feature) => `<li>${feature}</li>`).join("")}
        </ol>
          
      </div>
      <hr class="bg-[#11111133] my-5"> 
      <h1 class="font-bold">${tool.name}</h1>

      <div  class="flex gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M6.75 3V5.25M17.25 3V5.25M3 18.75V7.5C3 6.90326 3.23705 6.33097 3.65901 5.90901C4.08097 5.48705 4.65326 5.25 5.25 5.25H18.75C19.3467 5.25 19.919 5.48705 20.341 5.90901C20.7629 6.33097 21 6.90326 21 7.5V18.75M3 18.75C3 19.3467 3.23705 19.919 3.65901 20.341C4.08097 20.7629 4.65326 21 5.25 21H18.75C19.3467 21 19.919 20.7629 20.341 20.341C20.7629 19.919 21 19.3467 21 18.75M3 18.75V11.25C3 10.6533 3.23705 10.081 3.65901 9.65901C4.08097 9.23705 4.65326 9 5.25 9H18.75C19.3467 9 19.919 9.23705 20.341 9.65901C20.7629 10.081 21 10.6533 21 11.25V18.75M12 12.75H12.008V12.758H12V12.75ZM12 15H12.008V15.008H12V15ZM12 17.25H12.008V17.258H12V17.25ZM9.75 15H9.758V15.008H9.75V15ZM9.75 17.25H9.758V17.258H9.75V17.25ZM7.5 15H7.508V15.008H7.5V15ZM7.5 17.25H7.508V17.258H7.5V17.25ZM14.25 12.75H14.258V12.758H14.25V12.75ZM14.25 15H14.258V15.008H14.25V15ZM14.25 17.25H14.258V17.258H14.25V17.25ZM16.5 12.75H16.508V12.758H16.5V12.75ZM16.5 15H16.508V15.008H16.5V15Z" stroke="#585858" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
      <p>${tool.published_in}</p>

      </div>
      <div onclick="handleShowDetails('${tool.id}')" class="flex justify-end mb-5">
        <div class="absolute">
        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="none">
        <circle cx="25" cy="25" r="25" fill="#FEF7F7"/>
      </svg>
        
<div class="relative bottom-9 left-3 ">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M4.5 12H19.5M19.5 12L12.75 5.25M19.5 12L12.75 18.75" stroke="#EB5757" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
</div>
      </div>
      </div>
    </div>
    `;
    toolsContainer.appendChild(toolCard);
    
  });
};


let sortByDateClicked = false ;
let seeMoreClicked = false ;

//! Sort By Date Button 
const handleSortByDate = () => {
  sortByDateClicked = true ;
  if(sortByDateClicked) {
    if(seeMoreClicked) {
      loadToolsData(true, true) ;
    }
    else {
      loadToolsData(false, true) ;
    }
  }
}
// const SortByDate = (a, b) => {
//   const dateA = new Date(a.published_in);
//   const dateB = new Date(b.published_in);
//   if(dateA > dateB) return 1;
//   else if(dateA < dateB) return -1;
//   else return 0;
// }


//! See More Button 
const handleSeeMore = () => {
  seeMoreClicked = true ;
  if(seeMoreClicked) {
    if(sortByDateClicked) {
      loadToolsData(true, true);
    }
    else {
      loadToolsData(true, false);
    }
  }

}


//! Modal 
const handleShowDetails = async (id) => {
    // console.log(id);
    const res = await fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`);
    const data = await res.json();
    const details = data.data;
    showModal(details);
}


const showModal = (details) => {
    
    const modalDes = document.getElementById("modalDes");
     modalDes.innerText = details.description;

     const modalPricingContainer = document.getElementById("modalPricingContainer");

     modalPricingContainer.innerHTML = `
        ${details.pricing.map(prices => 
            `<div class="bg-[#FFFFFF] p-1  rounded-lg">${prices.price.split("/").map(part => `<div>${part}</div>`).join("")} ${prices.plan}</div>`
             
        ).join("")}
     `

    //  Features 
    const modalFeaturesContainer = document.getElementById("modalFeaturesContainer");
    const features = details.features;
    modalFeaturesContainer.innerHTML = `<h1 class="font-bold">Features</h1>`

    for (const feature in features) {
       const featureName = features[feature].feature_name;
        const li = document.createElement("li");
        li.innerText = featureName;
        modalFeaturesContainer.appendChild(li);

    };


    //Integration 
    // const integartionContainer = document.getElementById("integartionContainer");
    // integartionContainer.innerText = "Somel";

     

    // const modalImageContainer = document.getElementById("modalImageContainer");
    // modalImageContainer.innerHTML = `

    // `
    console.log(details);
    const img = document.getElementById("img");
    img.innerHTML = `
        <img class="mb-3" src="${details.image_link[0]}">
        ${details.input_output_examples.map(q => `<h1 class="font-bold">${q.input}</h1> <p class="font-extralight mb-5">${q.output}</p> `).join('')}
        
    `
    console.log(details.image_link[0]);
    showDetails.showModal();


}
loadToolsData();




