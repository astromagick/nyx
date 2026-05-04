// back listeners setup for buttons and toggleable variables in the website.
document.addEventListener("DOMContentLoaded", () => {
    // reference constants
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('mainNavUl')

    console.log(navLinks);
    

    const languageToggle = document.getElementById('languageButton');
    const languagePrompt = document.getElementById('languagePrompt'); 

    const searchToggle = document.getElementById('searchButton');
    const searchPrompt = document.getElementById('searchPrompt');


    const dropdownButtonProducts = document.getElementById('productButton');
    const dropdownProducts = document.getElementById('productsDropDown'); 
    const dropdownHitbox = document.getElementById('dropdownHitbox');
    
    // listeners (connections)
    menuToggle.addEventListener('click', () => { // collapsed menu ( mobile menu ) var toggler
        navLinks.classList.toggle('active');
    });
    
    languageToggle.addEventListener('click', () => { // language button var toggler
        languagePrompt.classList.toggle('active');
    });

    dropdownButtonProducts.addEventListener('mouseenter', () => { // navigation dropdowns hitbox enter
        dropdownProducts.classList.add('active'); // note: .add is forced true function of toggle
        dropdownHitbox.classList.add('active-hitbox'); // turns the hitbox shield ON
    });

    dropdownHitbox.addEventListener('mouseleave', () => {  // navigation dropdowns hitbox exit
        dropdownProducts.classList.remove('active'); // note: .remove is forced false function of toggle
        dropdownHitbox.classList.remove('active-hitbox'); // turns the hitbox shield OFF
    });

    searchToggle.addEventListener('click', () => { // search button var add
        searchPrompt.classList.add('active');
    });

    searchPrompt.addEventListener('click', () => { // search button var remove
        searchPrompt.classList.remove('active');
    });
});

//ashton s. 24505