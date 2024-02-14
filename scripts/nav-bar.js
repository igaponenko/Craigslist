import {log} from 'console';
import {updateUserListingsInUI} from './home-page.js';
import {addUserPost, changeLocation, setCurrentLocation} from './storage.js';
import {showToast} from './toast.js';

const urlLocations = {
    dubai: 'Dubai',
    'abu-dhabi': 'Abu Dhabi',
    sharjah: 'Sharjah',
    ajman: 'Ajman',
    fujairah: 'Fujairah',
    'umm-al+quwain': 'Umm Al Quwain',
    'ras-al+khaimah': 'Ras Al Khaimah',
};

const url = new URL(window.location);

let loc = url.searchParams.get('location');

if (
    loc == undefined ||
    loc == null ||
    loc == '' ||
    !Object.keys(urlLocations).includes(loc)
) {
    url.searchParams.set('location', 'dubai');
    window.history.replaceState({}, '', url);
    loc = 'dubai';
} else {
    loc = url.searchParams.get('location');
}
setCurrentLocation(urlLocations[loc]);

window.addEventListener('DOMContentLoaded', () => {
    // Logo
    const logo = document.getElementById('logo');
    const logoMobile = document.getElementById('logo-mobile');
    logo.addEventListener('click', () => {
        const url = new URL(window.location);
        url.pathname = '/index.html';
        window.location.href = url.toString();
    });
    logoMobile.addEventListener('click', () => {
        const url = new URL(window.location);
        url.pathname = '/index.html';
        window.location.href = url.toString();
    });

    // Search Bar
    const searchBar = document.getElementById('search-bar');
    const searchBarMobile = document.getElementById('search-bar-mobile');
    searchBar.addEventListener('keydown', (e) => {
        if (e.code == 'Enter') {
            goToSearchPage();
        } else {
            searchBarMobile.value = searchBar.value + e.key;
        }
    });
    document.addEventListener('keyup', (e) => {
        const hadFocusBefore = document.activeElement == searchBar;
        if (!hadFocusBefore && e.code == 'Slash') {
            console.log('focusing');
            searchBar.focus();
        }
    });
    searchBarMobile.addEventListener('keydown', (e) => {
        if (e.code == 'Enter') {
            goToSearchPage();
        } else {
            searchBar.value = searchBarMobile.value + e.key;
        }
    });

    // Add Post
    const addPostButton = document.getElementById('add-post');
    addPostButton.addEventListener('click', () => {
        addUserPost(() => {
            console.log('running addpost oncomplete callback');
            const url = new URL(window.location);
            if (url.pathname.includes('index.html')) {
                console.log('is on homepage');
                updateUserListingsInUI();
            }
            showToast('Added Post');
        });
    });
    const addPostButtonMobile = document.getElementById('add-post-mobile');
    addPostButtonMobile.addEventListener('click', () => {
        addUserPost(() => {
            console.log('running addpost oncomplete callback');
            const url = new URL(window.location);
            if (url.pathname.includes('index.html')) {
                console.log('is on homepage');
                updateUserListingsInUI();
            }
            showToast('Added Post');
        });
    });

    // Location Selection Dropdown
    const locationSelector = document.getElementById('location');
    const locationSelectorMobile = document.getElementById('mobile-location');

    const options = locationSelector.querySelectorAll('.menu li');
    const menu = locationSelector.querySelector('.menu');
    const selected = locationSelector.querySelector('.selected');
    const city = document.getElementById('city');

    const optionsMobile = locationSelectorMobile.querySelectorAll('.menu li');
    const menuMobile = locationSelectorMobile.querySelector('.menu');
    const selectedMobile = locationSelectorMobile.querySelector('.selected');
    const cityMobile = document.getElementById('mobile-city');

    options.forEach((option) => {
        option.classList.remove('selected');
        if (option.innerText.split(',')[0] == urlLocations[loc]) {
            option.classList.add('selected');
        }

        option.addEventListener('click', () => {
            changeLocation(option.innerText);
            const newCity = option.innerText.split(',')[0].trim();
            city.innerText = newCity + ',';
            cityMobile.innerText = newCity + ',';

            const url = new URL(window.location);
            url.searchParams.set(
                'location',
                newCity.toLowerCase().replace(' ', '-')
            );
            window.history.pushState({}, '', url);
            options.forEach((item) => {
                item.classList.remove('selected');
                option.classList.add('selected');
                selected.classList.remove('location-selector-clicked');
            });
            optionsMobile.forEach((item) => {
                item.classList.remove('selected');
                if (item.innerText == option.innerText) {
                    item.classList.add('selected');
                }
                selectedMobile.classList.remove('location-selector-clicked');
            });
        });
    });
    city.innerText = urlLocations[loc] + ',';

    document.querySelectorAll('.undraggable').forEach((item) => {
        item.setAttribute('draggable', false);
    });

    locationSelector.addEventListener('click', () => {
        locationSelector.classList.toggle('location-selector-clicked');
        menu.classList.toggle('menu-open');
    });

    // mobile location selector
    optionsMobile.forEach((option) => {
        option.classList.remove('selected');
        if (option.innerText.split(',')[0] == urlLocations[loc]) {
            option.classList.add('selected');
        }

        option.addEventListener('click', () => {
            changeLocation(option.innerText);
            const newCity = option.innerText.split(',')[0].trim();
            cityMobile.innerText = newCity + ',';
            city.innerText = newCity + ',';

            const url = new URL(window.location);
            url.searchParams.set(
                'location',
                newCity.toLowerCase().replace(' ', '-')
            );
            window.history.pushState({}, '', url);
            optionsMobile.forEach((item) => {
                item.classList.remove('selected');
                option.classList.add('selected');
                selectedMobile.classList.remove('location-selector-clicked');
            });
            options.forEach((item) => {
                item.classList.remove('selected');
                if (item.innerText == option.innerText) {
                    item.classList.add('selected');
                }
                selected.classList.remove('location-selector-clicked');
            });
        });
    });
    cityMobile.innerText = urlLocations[loc] + ',';

    locationSelectorMobile.addEventListener('click', () => {
        locationSelectorMobile.classList.toggle('location-selector-clicked');
        menuMobile.classList.toggle('menu-open');
    });
});
