function goToHomePage() {
    const url = new URL(window.location);
    const currentLocation = url.searchParams.get('location');
    url.pathname = '/index.html';
    // clear params
    url.searchParams = new URLSearchParams();
    url.search = '?';
    // set location
    url.searchParams.set('location', currentLocation);
    // go to page
    console.log(url, url.toString());
    window.location.href = url.toString();
}

function goToPostPage(id) {
    const url = new URL(window.location);
    url.pathname = '/post.html';
    const currentLocation = url.searchParams.get('location');
    // clear params
    url.searchParams = new URLSearchParams();
    url.search = '?';
    // set location
    url.searchParams.set('location', currentLocation);
    // set id
    url.searchParams.set('id', id ?? 0);
    // go to page
    window.location.href = url.toString();
}

function goToSearchPage(categoryParam) {
    console.log('go to search page called');
    const query = document.getElementById('search-bar').value;
    if (query || categoryParam) {
        const url = new URL(window.location);
        url.pathname = '/search-page.html';
        const currentLocation = url.searchParams.get('location');
        const category = categoryParam ?? url.searchParams.get('category');
        const price = url.searchParams.get('price');
        const distance = url.searchParams.get('distance');
        const dateFrom = url.searchParams.get('dateFrom');
        const dateTo = url.searchParams.get('dateTo');
        const sort = url.searchParams.get('sort');
        // clear params
        url.searchParams = new URLSearchParams();
        url.search = '?';
        // set location
        url.searchParams.set('location', currentLocation);
        // set query
        url.searchParams.set('query', query);
        // set category
        if (category != null && category != '' && category != undefined) {
            url.searchParams.set('category', category);
        }
        if (price && !Number.isNaN(parseInt(price))) {
            url.searchParams.set('price', price);
        }
        if (distance && !Number.isNaN(parseInt(distance))) {
            url.searchParams.set('distance', distance);
        }
        if (dateFrom) {
            url.searchParams.set('dateFrom', dateFrom);
        }
        if (dateTo) {
            url.searchParams.set('dateTo', dateTo);
        }
        if (sort) {
            url.searchParams.set('sort', sort);
        }
        // go to page
        console.log(url);
        console.log(url.toString());
        window.location.href = url.toString();
    } else {
        document.getElementById('search-bar').focus();
    }
}
