const dataLoaded = async (searchText=13) => {
    const fecthItem = await fetch(
      `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    );
    const data = await fecthItem.json();
    const phones = data.data;
  //   console.log(phones);
    if(phones.length == 0){
        const showResearch = document.getElementById('Show-research-text')
        document.getElementById('Show-research-text').classList.remove('hidden')
    }else{
      document.getElementById('Show-research-text').classList.add('hidden')
    }
    addedCards(phones);
  };
  
  const injectSearchItem = () => {
      spinner(true)
    const inputField = document.getElementById("input-feild");
    const searchText = inputField.value;
    // console.log(searchText);
    dataLoaded(searchText);
    inputField.value= ''
  };
  
  const addedCards = (phones) => {
      const seeAllBtn = document.getElementById('See-all-btn')
     if (phones.length > 12) {
       seeAllBtn.classList.remove('hidden')
     }else{
      seeAllBtn.classList.add('hidden')
     }
      phones = phones.slice(0,12)
      const cards = document.getElementById("display-card");
      cards.textContent = ""
       phones.forEach(phonesData => {
          const div = document.createElement("div");
          div.classList=('card w-96 bg-base-100 shadow-xl mt-4 bg-gray-100')
          div.innerHTML = `
    <figure class="px-10 pt-10">
      <img src="${phonesData.image}" alt="Shoes" class="rounded-xl" />
    </figure>
    <div class="card-body items-center text-center">
      <h2 class="card-title">${phonesData.phone_name
      }</h2>
      <div class="card-actions">
        <button onclick ="showPhoneDetails('${phonesData.slug}')" class="btn btn-primary">Buy Now</button>
      </div>
       </div>
       `   
       cards.appendChild(div) 
       
     });
     spinner(false)
  };
  
  const showPhoneDetails = (details) =>{
      PhoneSingleData(details)
      showModal.showModal()
  }
  const PhoneSingleData =async (id) =>{
      const data = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
      const phones = await data.json()
      const shoePhoneDetails = document.getElementById('show-phone-details')
      shoePhoneDetails.innerHTML=`
      <div class="flex justify-center p-10"> <img  src="${phones?.data?.image}" alt="Shoes" class="rounded-xl" /></div>
      <h1 class="text-2xl font-bold">${phones?.data?.name} </h1>
      <h1><span class="text-xl">Storage : </span> ${phones?.data?.mainFeatures?.storage} </h1>
      <h1><span class="text-xl">Display Size : </span> ${phones?.data?.mainFeatures?.displaySize}</h1>
      <h1><span class="text-xl">Chipset : </span> ${phones?.data?.mainFeatures?.chipSet} </h1>
      <h1><span class="text-xl">Memory : </span> ${phones?.data?.mainFeatures?.memory} </h1>
      <h1><span class="text-xl">Slug : </span> ${phones?.data?.slug} </h1>
      <h1><span class="text-xl"> Release data :</span> ${phones?.data?.releaseDate} </h1>
      <h1><span class="text-xl">Brand : </span> ${phones?.data?.brand} </h1>
      <h1><span class="text-xl">GPS : </span> ${phones?.data?.others?.GPS ? phones.data.others.GPS:'this device GPS isnot availabla'} </h1>
      `
  }
  
  
  
  const spinner = (isTrue) =>{
      const loader = document.getElementById('spinner')
      if (isTrue) {
          loader.classList.remove('hidden')
      }else{
          loader.classList.add('hidden')
      }
  }
  