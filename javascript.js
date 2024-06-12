AOS.init();
// You can also pass an optional settings object
// below listed default settings
AOS.init({
  
  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset: 120, // offset (in px) from the original trigger point
  delay: 0, // values from 0 to 3000, with step 50ms
  duration: 700, // values from 0 to 3000, with step 50ms
  easing: 'ease', // default easing for AOS animations
  once: false, // whether animation should happen only once - while scrolling down
  mirror: false, // whether elements should animate out while scrolling past them
  anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation

});

var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");

function opentab(tabname) {
    for(tablink of tablinks) {
    tablink.classList.remove("active-link");
}
for(tabcontent of tabcontents) {
 tabcontent.classList.remove("active-tab");
 }
 event.currentTarget.classList.add("active-link");
 document.getElementById(tabname).classList.add("active-tab");
}



// -----//

const form = document.getElementById("form");
const result = document.getElementById("result");

form.addEventListener("submit", function (e) {
    const formData = new FormData(form);
    e.preventDefault();
    var object = {};
    formData.forEach((value, key) => {
        object[key] = value;
    });
    var json = JSON.stringify(object);
    result.innerHTML = "Please wait...";

    fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: json
    })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                result.innerHTML = json.message;
                result.classList.remove("text-gray-500");
                result.classList.add("text-green-500");
            } else {
                console.log(response);
                result.innerHTML = json.message;
                result.classList.remove("text-gray-500");
                result.classList.add("text-red-500");
            }
        })
        .catch((error) => {
            console.log(error);
            result.innerHTML = "Something went wrong!";
        })
        .then(function () {
            form.reset();
            setTimeout(() => {
                result.style.display = "none";
            }, 5000);
        });
});

// Search bar

document.addEventListener('DOMContentLoaded', function() {
    const searchBar = document.getElementById('searchBar');
    const suggestionBox = document.getElementById('suggestionBox');
    const items = [
        { name: "ICECREAM/BAR", id: "ICECREAM/BAR" },
        { name: "IBAR SPECIALS", id: "IBAR SPECIALS" },
        { name: "I-CONE", id: "I-CONE" },
        { name: "CUPS", id: "CUPS" },
        { name: "TUPS", id: "TUPS" },
        { name: "SHAKES", id: "SHAKES" },
        { name: "SPECIALITY", id: "SPECIALITY" },
        
    ];

    searchBar.addEventListener('input', function() {
        let query = this.value.toLowerCase();
        suggestionBox.innerHTML = '';
        if (query) {
            const filteredItems = items.filter(item => item.name.toLowerCase().includes(query));
            filteredItems.forEach(item => {
                const suggestionItem = document.createElement('div');
                suggestionItem.classList.add('suggestion-item');
                suggestionItem.innerHTML = item.name.replace(new RegExp(query, 'gi'), match => `<span class="highlight">${match}</span>`);
                suggestionItem.addEventListener('click', function() {
                    searchBar.value = item.name;
                    suggestionBox.style.display = 'none';
                    document.getElementById(item.id).scrollIntoView({ behavior: 'smooth' });
                });
                suggestionBox.appendChild(suggestionItem);
            });
            suggestionBox.style.display = 'block';
        } else {
            suggestionBox.style.display = 'none';
        }
    });

    document.addEventListener('click', function(event) {
        if (!searchBar.contains(event.target) && !suggestionBox.contains(event.target)) {
            suggestionBox.style.display = 'none';
        }
    });
});
