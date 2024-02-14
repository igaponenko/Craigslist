import {Coordinates, getLocation} from './coordinates';
import {locationListeners, search} from './storage';

var url = new URL(window.location);
if (
    url.searchParams.get('query') == null ||
    url.searchParams.get('query') == undefined ||
    url.searchParams.get('query') == ''
) {
    url.searchParams.set('query', '');
    window.history.replaceState({}, '', url);
}

if (
    url.searchParams.get('category') == null ||
    url.searchParams.get('category') == undefined ||
    url.searchParams.get('category') == ''
) {
    url.searchParams.set('category', 'All Categories');
    window.history.replaceState({}, '', url);
}

document.title = `Craigslist | '${url.searchParams.get('query')}'`;

var resizeTimer;

// https://www.webtips.dev/webtips/javascript/find-overflowing-elements-with-javascript
function attributeOverflowAdjustment(wrapper) {
    // remove existing counters to add new ones
    const existingOverflowCounters =
        wrapper.querySelectorAll('.overflow-counter');
    existingOverflowCounters.forEach((counter) => {
        wrapper.removeChild(counter);
    });

    // sort elements by size (smallest -> largest)
    const childrenNodeList = wrapper.querySelectorAll('.in-line-children');
    const children = Array.from(childrenNodeList);
    children.forEach((element) => element.classList.remove('hidden'));
    children.sort((a, b) => a.offsetWidth - b.offsetWidth);
    wrapper.replaceChildren(...children);

    const wrapperRight = wrapper.getBoundingClientRect().right;
    let removedCounter = 0;
    // remove overflowing elements
    wrapper.querySelectorAll('.in-line-children').forEach((element) => {
        // TODO: refactor this code into a method
        const elementRight = element.getBoundingClientRect().right;
        if (elementRight > wrapperRight) {
            // remove element
            element.classList.add('hidden');
            removedCounter++;
        }
    });

    // after removing elements, check if there is space to show how many were hidden
    if (removedCounter > 0) {
        const overflowCounter = document.createElement('span');
        overflowCounter.classList.add('in-line-children');
        overflowCounter.classList.add('overflow-counter');
        const overflowText = document.createElement('b');
        overflowText.innerText = `+${removedCounter} more`;
        overflowCounter.appendChild(overflowText);
        wrapper.appendChild(overflowCounter);
        do {
            var newElements = wrapper.querySelectorAll(
                '.in-line-children:not(.hidden)'
            );
            const elementRight =
                newElements[newElements.length - 1].getBoundingClientRect()
                    .right;
            if (elementRight > wrapperRight) {
                // remove element
                // wrapper.removeChild(newElements[newElements.length - 2]);
                newElements[newElements.length - 2].classList.add('hidden');
                removedCounter++;
            }
            const finalElements = wrapper.querySelectorAll('.in-line-children');
            finalElements[
                finalElements.length - 1
            ].innerHTML = `<b>+${removedCounter} more</b>`;
        } while (
            newElements[newElements.length - 1].getBoundingClientRect().right >
            wrapperRight
        );
    }
}

async function updateSearchResultsInUI() {
    async function addPostsFromDatabase() {
        try {
            if (!Coordinates.userLocation) {
                Coordinates.userLocation = await getLocation();
            }
        } finally {
            const url = new URL(window.location);
            const postResult = await search(
                url.searchParams.get('query'),
                url.searchParams.get('category')
            );

            let filteredPosts = postResult;
            const price = url.searchParams.get('price');
            const distance = url.searchParams.get('distance');
            const dateFrom = url.searchParams.get('dateFrom');
            const dateTo = url.searchParams.get('dateTo');
            const sort = url.searchParams.get('sort');
            if (price && !Number.isNaN(parseInt(price))) {
                const intPrice = parseInt(price);
                filteredPosts = filteredPosts.filter(
                    (post) => post.price <= intPrice
                );
            }
            if (distance && !Number.isNaN(parseInt(distance))) {
                const intDistance = parseInt(distance);
                filteredPosts = filteredPosts.filter(
                    (post) =>
                        Coordinates.distance(
                            Coordinates.userLocation,
                            Coordinates.fromObject(post.location)
                        ) <= intDistance
                );
            }

            if (dateFrom) {
                filteredPosts = filteredPosts.filter(
                    (post) => post.timestamp >= new Date(dateFrom).getTime()
                );
            }

            if (dateTo) {
                const dateToDate = new Date(dateTo);
                const today = new Date();
                if (
                    !(
                        dateToDate.getFullYear() == today.getFullYear() &&
                        dateToDate.getMonth() == today.getMonth() &&
                        dateToDate.getDate() == today.getDate()
                    )
                ) {
                    filteredPosts = filteredPosts.filter(
                        (post) => post.timestamp <= dateToDate.getTime()
                    );
                }
            }

            if (sort) {
                switch (sort) {
                    case 'Highest Price':
                        filteredPosts.sort((a, b) => b.price - a.price);
                        break;
                    case 'Lowest Price':
                        filteredPosts.sort((a, b) => a.price - b.price);
                        break;
                    case 'Nearest':
                        if (Coordinates.userLocation) {
                            filteredPosts.sort(
                                (a, b) =>
                                    Coordinates.fromObject(
                                        a.location
                                    ).distanceTo(Coordinates.userLocation) -
                                    Coordinates.fromObject(
                                        b.location
                                    ).distanceTo(Coordinates.userLocation)
                            );
                        }
                        break;
                    case 'Furthest':
                        if (Coordinates.userLocation) {
                            filteredPosts.sort(
                                (a, b) =>
                                    Coordinates.fromObject(
                                        b.location
                                    ).distanceTo(Coordinates.userLocation) -
                                    Coordinates.fromObject(
                                        a.location
                                    ).distanceTo(Coordinates.userLocation)
                            );
                        }
                        break;
                    case 'Newest':
                        filteredPosts.sort((a, b) => b.timestamp - a.timestamp);
                        break;
                    case 'Oldest':
                        filteredPosts.sort((a, b) => a.timestamp - b.timestamp);
                        break;
                    default:
                        break;
                }
            }

            if (filteredPosts.length > 0) {
                const postElements = [];
                for (let i = 0; i < filteredPosts.length; i++) {
                    const post = document.createElement('search-result-post');
                    post.id = filteredPosts[i].id;
                    post.title = filteredPosts[i].title;
                    post.description = filteredPosts[i].description;
                    post.location = Coordinates.fromObject(
                        filteredPosts[i].location
                    ).toString();
                    post.timestamp = filteredPosts[i].timestamp;
                    post.price = filteredPosts[i].price;
                    post.src = filteredPosts[i].imgSrc;
                    post.attributes = filteredPosts[i].properties.toString();
                    postElements.push(post);
                }

                const parent = document.getElementById('results-wrapper');
                parent.replaceChildren(...postElements);
            } else {
                const parent = document.getElementById('results-wrapper');
                parent.innerHTML = '<h2>No results found</h2>';
            }
        }
    }

    await addPostsFromDatabase();

    const attributesWrappers = document.querySelectorAll(
        '.result-post-attributes'
    );
    attributesWrappers.forEach((wrapper) => {
        attributeOverflowAdjustment(wrapper);
    });
}

window.addEventListener('DOMContentLoaded', async () => {
    const searchBar = document.getElementById('search-bar');
    searchBar.value = url.searchParams.get('query');
    const resultText = document.getElementById('result-text');
    resultText.innerText = `Results for '${url.searchParams.get(
        'category'
    )}' > '${url.searchParams.get('query')}'`;

    // document.getElementById('sort-button').addEventListener('click', dropDown); this was giving error so commented out
    // document
    //     .getElementById('view-button')
    //     .addEventListener('click', dropDownView);
    // document
    //     .getElementById('category-button')
    //     .addEventListener('click', dropDownCategory);
    // document
    //     .getElementById('price-button')
    //     .addEventListener('click', dropDownPrice);
    // document
    //     .getElementById('date-button')
    //     .addEventListener('click', dropDownDate);
    // document
    //     .getElementById('distance-button')
    //     .addEventListener('click', dropDownDistance);

    updateSearchResultsInUI();

    locationListeners.push(updateSearchResultsInUI);

    window.addEventListener('resize', () => {
        // https://css-tricks.com/snippets/jquery/done-resizing-event/
        clearTimeout(resizeTimer);
        const attributesWrappers = document.querySelectorAll(
            '.result-post-attributes'
        );
        resizeTimer = setTimeout(() => {
            attributesWrappers.forEach((wrapper) => {
                attributeOverflowAdjustment(wrapper);
            });
        }, 250);
    });
    filterListeners.push(updateSearchResultsInUI);
});

const filterListeners = [];

const sortByGrid = document.getElementById('sort-by');

if (url.searchParams.get('sort')) {
    sortByGrid.querySelectorAll('button').forEach((button) => {
        const sort = url.searchParams.get('sort');
        if (button.innerText == sort) {
            button.classList.add('selected');
        }
    });
}

sortByGrid.querySelectorAll('button').forEach((button) => {
    button.addEventListener('click', () => {
        if (button.classList.contains('selected')) {
            // deselect
            const url = new URL(window.location);
            url.searchParams.delete('sort');
            window.history.replaceState({}, '', url);

            button.classList.remove('selected');
        } else {
            // deselect any already selected buttons
            sortByGrid
                .querySelectorAll('button')
                .forEach((button) => button.classList.remove('selected'));
            // select
            const url = new URL(window.location);
            url.searchParams.set('sort', button.innerText);
            window.history.replaceState({}, '', url);

            button.classList.add('selected');
        }
        filterListeners.forEach((listener) => listener());
    });
});

const priceSlider = document.getElementById('price-range');
const priceOutput = document.getElementById('current-price');
if (url.searchParams.get('price')) {
    priceSlider.value = parseInt(url.searchParams.get('price'));
    priceOutput.innerHTML = parseInt(
        url.searchParams.get('price')
    ).toLocaleString('en-US');
} else {
    priceOutput.innerHTML = 'any';
}

priceSlider.oninput = function () {
    const price = parseInt(this.value);
    if (price == 0) {
        priceOutput.innerHTML = 'any';
    } else if (price >= 1000000) {
        priceOutput.innerHTML = price.toLocaleString('en-US') + '+';
    } else {
        priceOutput.innerHTML = price.toLocaleString('en-US');
    }
};
priceSlider.onmouseup = function () {
    const price = parseInt(this.value);
    const url = new URL(window.location.href);
    if (price == 0) {
        url.searchParams.delete('price');
        window.history.replaceState({}, '', url);
    } else {
        url.searchParams.set('price', price);
        window.history.replaceState({}, '', url);
    }
    filterListeners.forEach((listener) => listener());
};

const dateFrom = document.getElementById('date-from');
if (url.searchParams.get('dateFrom')) {
    dateFrom.value = url.searchParams.get('dateFrom');
}
dateFrom.onchange = function () {
    const url = new URL(window.location.href);
    if (this.value) {
        url.searchParams.set('dateFrom', this.value);
        window.history.replaceState({}, '', url);
    } else {
        url.searchParams.delete('dateFrom');
        window.history.replaceState({}, '', url);
    }
    filterListeners.forEach((listener) => listener());
};

const dateTo = document.getElementById('date-to');
if (url.searchParams.get('dateTo')) {
    dateTo.value = url.searchParams.get('dateTo');
}
dateTo.onchange = function () {
    const url = new URL(window.location.href);
    if (this.value) {
        url.searchParams.set('dateTo', this.value);
        window.history.replaceState({}, '', url);
    } else {
        url.searchParams.delete('dateTo');
        window.history.replaceState({}, '', url);
    }
    filterListeners.forEach((listener) => listener());
};

const distanceSlider = document.getElementById('distance-range');
const distanceOutput = document.getElementById('current-distance');

if (url.searchParams.get('distance')) {
    distanceSlider.value = parseInt(url.searchParams.get('distance'));
    distanceOutput.innerHTML = parseInt(
        url.searchParams.get('distance')
    ).toLocaleString('en-US');
} else {
    distanceOutput.innerHTML = 'any ';
}

distanceSlider.oninput = function () {
    distanceOutput.innerHTML = parseInt(this.value).toLocaleString('en-US');
};

distanceSlider.onmouseup = function () {
    const distance = parseInt(this.value);
    const url = new URL(window.location.href);
    if (distance == 0) {
        url.searchParams.delete('distance');
        window.history.replaceState({}, '', url);
    } else {
        url.searchParams.set('distance', distance);
        window.history.replaceState({}, '', url);
    }
    filterListeners.forEach((listener) => listener());
};

const categoriesGrid = document.getElementById('category-filter');

if (url.searchParams.get('category')) {
    const category = url.searchParams.get('category');
    categoriesGrid.querySelectorAll('button').forEach((button) => {
        if (button.innerText == category) {
            button.classList.add('selected');
        }
    });
}

categoriesGrid.querySelectorAll('button').forEach((button) => {
    button.addEventListener('click', () => {
        if (button.classList.contains('selected')) {
            // deselect
            const url = new URL(window.location);
            url.searchParams.set('category', 'All Categories');
            window.history.replaceState({}, '', url);

            button.classList.remove('selected');
        } else {
            // deselect any already selected buttons
            categoriesGrid
                .querySelectorAll('button')
                .forEach((button) => button.classList.remove('selected'));
            // select
            const url = new URL(window.location);
            url.searchParams.set('category', button.innerText);
            window.history.replaceState({}, '', url);

            button.classList.add('selected');
        }
        filterListeners.forEach((listener) => listener());
    });
});

const categoryDropdown = document.getElementById('category-dropdown');
const priceDropdown = document.getElementById('price-dropdown');
const dateDropdown = document.getElementById('date-dropdown');
const distanceDropdown = document.getElementById('distance-dropdown');

categoryDropdown.querySelectorAll('a').forEach((item) => {
    item.classList.remove('selected');
    if (item.innerText == url.searchParams.get('category')) {
        item.classList.add('selected');
    }

    item.addEventListener('click', () => {
        const url = new URL(window.location);
        if (!item.classList.contains('selected')) {
            url.searchParams.set('category', item.innerText);

            categoryDropdown.querySelectorAll('a').forEach((a) => {
                a.classList.remove('selected');
                item.classList.add('selected');
                var dropdowns =
                    document.getElementsByClassName('dropdown-content');
                var i;
                for (i = 0; i < dropdowns.length; i++) {
                    var openDropdown = dropdowns[i];
                    if (openDropdown.classList.contains('show')) {
                        openDropdown.classList.remove('show');
                    }
                }
            });
        } else {
            url.searchParams.set('category', 'All Categories');

            categoryDropdown.querySelectorAll('a').forEach((a) => {
                a.classList.remove('selected');
                var dropdowns =
                    document.getElementsByClassName('dropdown-content');
                var i;
                for (i = 0; i < dropdowns.length; i++) {
                    var openDropdown = dropdowns[i];
                    if (openDropdown.classList.contains('show')) {
                        openDropdown.classList.remove('show');
                    }
                }
            });
        }
        window.history.replaceState({}, '', url);
        filterListeners.forEach((listener) => listener());
    });
});

priceDropdown.querySelectorAll('a').forEach((item) => {
    item.classList.remove('selected');
    if (
        item.innerText.split(' ')[0].replaceAll(',', '') ==
        url.searchParams.get('price')
    ) {
        item.classList.add('selected');
    }

    item.addEventListener('click', () => {
        const url = new URL(window.location);
        if (!item.classList.contains('selected')) {
            url.searchParams.set(
                'price',
                item.innerText.split(' ')[0].replaceAll(',', '')
            );

            priceDropdown.querySelectorAll('a').forEach((a) => {
                a.classList.remove('selected');
                item.classList.add('selected');
                var dropdowns =
                    document.getElementsByClassName('dropdown-content');
                var i;
                for (i = 0; i < dropdowns.length; i++) {
                    var openDropdown = dropdowns[i];
                    if (openDropdown.classList.contains('show')) {
                        openDropdown.classList.remove('show');
                    }
                }
            });
        } else {
            url.searchParams.delete('price');

            priceDropdown.querySelectorAll('a').forEach((a) => {
                a.classList.remove('selected');
                var dropdowns =
                    document.getElementsByClassName('dropdown-content');
                var i;
                for (i = 0; i < dropdowns.length; i++) {
                    var openDropdown = dropdowns[i];
                    if (openDropdown.classList.contains('show')) {
                        openDropdown.classList.remove('show');
                    }
                }
            });
        }
        window.history.replaceState({}, '', url);
        filterListeners.forEach((listener) => listener());
    });
});

distanceDropdown.querySelectorAll('a').forEach((item) => {
    item.classList.remove('selected');
    if (item.innerText.replace('km', '') == url.searchParams.get('distance')) {
        item.classList.add('selected');
    }

    item.addEventListener('click', () => {
        const url = new URL(window.location);
        if (!item.classList.contains('selected')) {
            url.searchParams.set('distance', item.innerText.replace('km', ''));

            distanceDropdown.querySelectorAll('a').forEach((a) => {
                a.classList.remove('selected');
                item.classList.add('selected');
                var dropdowns =
                    document.getElementsByClassName('dropdown-content');
                var i;
                for (i = 0; i < dropdowns.length; i++) {
                    var openDropdown = dropdowns[i];
                    if (openDropdown.classList.contains('show')) {
                        openDropdown.classList.remove('show');
                    }
                }
            });
        } else {
            url.searchParams.delete('distance');

            distanceDropdown.querySelectorAll('a').forEach((a) => {
                a.classList.remove('selected');
                var dropdowns =
                    document.getElementsByClassName('dropdown-content');
                var i;
                for (i = 0; i < dropdowns.length; i++) {
                    var openDropdown = dropdowns[i];
                    if (openDropdown.classList.contains('show')) {
                        openDropdown.classList.remove('show');
                    }
                }
            });
        }
        window.history.replaceState({}, '', url);
        filterListeners.forEach((listener) => listener());
    });
});
