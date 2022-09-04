const loadPhones = async(search,dataLimit) =>{
    const url =` https://openapi.programming-hero.com/api/phones?search=${search}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data,dataLimit);
};

const displayPhones =(phones,dataLimit) =>{
const phoneContainer = document.getElementById('phone-container');
phoneContainer.innerHTML = '';
// only ten phone show
const showAll = document.getElementById('show-all')
if(dataLimit && phones.length > 10 ){     
   phones = phones.slice(0,10) 
    showAll.classList.remove('d-none')
}
else{
    showAll.classList.add('d-none')
};

// no found
const noFound = document.getElementById('no-found');
if(phones.length === 0 ){
    noFound.classList.remove('d-none')
}
else{
    noFound.classList.add('d-none')
};

phones.forEach(phone =>{
    const phoneDiv = document.createElement('div');
    phoneDiv.classList.add('col');
    phoneDiv.innerHTML = `
    <div class="card p-4">
        <img src="${phone.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title text-warning">${phone.phone_name}</h5>
            <p  class="card-text text-primary">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            <button onclick="loadPhonesDetail('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailsModal" >Show Details</button>

        </div>
        </div>
    `;
    phoneContainer.appendChild(phoneDiv);
})
// stop loader
toggleSpiners(false) 
};

const processSearch = (dataLimit) =>{
    toggleSpiners(true)
    const searchPhone = document.getElementById('input-field');
   const searchText = searchPhone.value;
   loadPhones(searchText,dataLimit);
   searchPhone.value ='';
};


document.getElementById('phone-search').addEventListener('click',function(){
    // start loader
    processSearch(10) 
   

});

const toggleSpiners = isLoading => {
    const loaderSection = document.getElementById('loader')
    if(isLoading){
        loaderSection.classList.remove('d-none')
    }
    else{
        loaderSection.classList.add('d-none')
    }
};

// show all
document.getElementById('btn-show-all').addEventListener('click',function(){
    processSearch()
});




//  phone details button
const loadPhonesDetail = async(id) =>{
const url = `https://openapi.programming-hero.com/api/phone/${id}`;
const res = await fetch(url);
const data = await res.json();
displayphoneDetail(data.data)
};

// modals

const  displayphoneDetail = (phone)=>{
const modalTitle = document.getElementById('phoneDetailsModalLabel')
console.log(phone)
modalTitle.innerText = phone.name;
const phoneDetails = document.getElementById('phone-details');
phoneDetails.innerHTML = `
<p>Release date : ${phone.releaseDate ? phone.releaseDate : 'No release Date'}</p>
<p>Others : ${phone.others ? phone.others.Bluetooth : 'No Found'}</p>
<p>Otherts : ${phone.others ? phone.others.WLAN : 'No Found'}</p>
<p>Otherts : ${phone.mainFeatures ? phone.mainFeatures.memory : 'No Found'}</p>
<p>Storage : ${phone.mainFeatures ? phone.mainFeatures.storage : 'No Found'}</p>
`

}


// Enter button
document.getElementById('input-field').addEventListener('keypress',function(event){
    if(event.key === 'Enter'){
        processSearch(10) 
    }
    })


loadPhones('apple');