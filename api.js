
const loadPhones = async(search,dataLimit) =>{
   const url =` https://openapi.programming-hero.com/api/phones?search=${search}`
const res = await fetch(url);
const data = await res.json();
displayPhones(data.data,dataLimit); 
}

const displayPhones =(phones,dataLimit) => {
    const phoneContainer = document.getElementById('phone-container')
    // previuos search delete
    phoneContainer.innerHTML = '';
    // display only 10 phone
    const showAll = document.getElementById('show-all')
    if(dataLimit && phones.length > 10 ){
    phones = phones.slice(0,10)
    showAll.classList.remove('d-none')  
    }
    else{
        showAll.classList.add('d-none')
    };
    
    // display no phone found

    const noFound = document.getElementById('no-found')
    if(phones.length ===  0){
        noFound.classList.remove('d-none')
    }
    else{
        noFound.classList.add('d-none')
    };


    phones.forEach(phone =>{
        const phoneDiv = document.createElement('div')
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card p-4">
        <img src="${phone.image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${phone.phone_name}</h5>
          <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
          <button onclick="loadPhoneDetials('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#PhoneDetails"> Show All</button>    
        </div>
      </div>
        `;
        phoneContainer.appendChild(phoneDiv)
    })
    // stop loader or spinners
    toggleSpinner(false)
};

// show all function write here
const processSearch = (dataLimit) => {
     toggleSpinner(true)
    const searchField = document.getElementById('search-field')
    const search = searchField.value;
    loadPhones(search,dataLimit);
    
}


document.getElementById('btn-search').addEventListener('click',function(){
    // start loader or spinners
    // akta function kora hoice upore ja call kora hoice

    // toggleSpinner(true)
    // const searchField = document.getElementById('search-field')
    // const searchText = searchField.value;
    // loadPhones(searchText);
    // searchField.value ='';
    processSearch(10);
});

// Enter input field 
document.getElementById('search-field').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        processSearch(10);
    }
});

const toggleSpinner = (isLoading)=>{
const loaderSection = document.getElementById('loader')
if(isLoading){
    loaderSection.classList.remove('d-none')
}
else{
    loaderSection.classList.add('d-none')
}

};

// show all button

document.getElementById('btn-show-all').addEventListener('click',function(){
    // ( invalid for practice
    // akta function kora hoice upore ja call kora hoice )
    // toggleSpinner(true)
    // const searchField = document.getElementById('search-field')
    // const searchText = searchField.value;
    // loadPhones(searchText);
    processSearch();
});

// show phone details btn

const loadPhoneDetials =async id =>{
    const url =`https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data)
}

const displayPhoneDetails =(phone) =>{
    console.log(phone)
    const phoneTitle = document.getElementById('PhoneDetailsLabel')
    phoneTitle.innerText = phone.name;
    const phoneDetails = document.getElementById('phone-details')
    phoneDetails.innerHTML = `
    <p>${phone.mainFeatures ? phone.mainFeatures.memory : 'No data Found'}</p>
    <p>Others : ${phone.others ? phone.others.Bluetooth : 'No Blutooth Found'}</p>
    <p>Release Date : '${phone.releaseDate ? phone.releaseDate : 'No Release Date Found'}'</p>
    <p>Others : ${phone.mainFeatures ? phone.mainFeatures.storage : 'No Storage Found'}</p>
    `;

}
// loadPhones('');

