// script for search.html

const formSearch = document.forms.search;
const inputSearch = formSearch.elements.searchInput;
//const inputSearch = form.elements.search-box;
//inputSearch.addEventListener('focus', () => alert('focused'), false);
//inputSearch.addEventListener('blur', () => alert('blurred'), false);
inputSearch.addEventListener('change', () => alert('changed'), false);

//const form = document.forms['search'];
formSearch.addEventListener('submit', search, false);

function search(event) {
    alert(`You Searched for: ${inputSearch.value}`);
    event.preventDefault();
}
/*
inputSearch.value = 'Search Here';
inputSearch.addEventListener('focus', function(){
    if (inputSearch.value==='Search Here') {
        inputSearch.value = '' 
    }
}, false);
inputSearch.addEventListener('blur', function(){
    if(inputSearch.value === '') {
        inputSearch.value = 'Search Here';
    } }, false);
*/

//--------------------------------------------------------------

// script for hero.html

const formHero = document.forms['hero'];
formHero.addEventListener('submit', makeHero, false);

function makeHero(event) {
    event.preventDefault(); // prevent the form from being submitted
    const hero = {}; // create an empty object
    hero.name = formHero.heroName.value; // create a name property based on the input field's value
    hero.realName = formHero.realName.value;
    hero.powers = [...formHero.powers].filter(box => box.checked).map(box => box.value);
    /*hero.powers = [];
    for (let i = 0; i < formHero.powers.length; i++) {
        if (formHero.powers[i].checked) {
            hero.powers.push(formHero.powers[i].value);
        }
    }
    */
   hero.category = formHero.category.value;
   hero.age = formHero.age.value;
   hero.city = formHero.city.value;
   hero.origin = formHero.origin.value;
    alert(JSON.stringify(hero)); // convert object to JSON string and display in alert dialog
    return hero;
}
formHero.addEventListener('submit',validate,false);
function validate(event) {
    const firstLetter = formHero.heroName.value[0];
    if (firstLetter.toUpperCase() === 'X') {
        event.preventDefault();
        alert('Your name is not allowed to start with X!');
    }
}
const label = formHero.querySelector('label');
const error = document.createElement('div');
error.classList.add('error');
error.textContent = '! Your name is not allowed to start with X.';
label.append(error);
function validateInline() {
    const heroName = this.value.toUpperCase();
    if(heroName.startsWith('X')){
    error.style.display = 'block';
    } else {
    error.style.display = 'none';
    }
}

//----------------------------------------------

ulElement = document.getElementById('list');
liElement = document.querySelector('#list li');
ulElement.addEventListener('click', (event) =>
console.log('Clicked on ul') );
liElement.addEventListener('click', (event) =>
console.log('Clicked on li') );