import {getAllListings, getUserListings, locationListeners} from './storage.js';
import {Coordinates, getLocation} from './coordinates.js';
import {errorPost} from './post.js';

// * Desktop JS
function rightScroll(scrollID) {
    const scroll = document.getElementById(scrollID);
    const currentScroll = scroll.scrollLeft;
    const visibleWidth = scroll.clientWidth;
    const currentFullScrolls = Math.floor(currentScroll / visibleWidth);
    const amountToScroll =
        currentFullScrolls * visibleWidth + visibleWidth - currentScroll;
    scroll.scrollBy(amountToScroll, 0);
}

// TODO: fix a bug where on different zoom levels it doesn't always scroll back to the start
function leftScroll(scrollID) {
    const scroll = document.getElementById(scrollID);
    const currentScroll = scroll.scrollLeft;
    const visibleWidth = scroll.clientWidth;
    const currentFullScrolls = Math.ceil(currentScroll / visibleWidth);
    const amountToScroll =
        currentFullScrolls * visibleWidth - currentScroll - visibleWidth;
    scroll.scrollBy(amountToScroll, 0);
}

function updatePostWrapperMargin() {
    const scrollables = document.getElementsByClassName('horizontal-scroll');

    if (
        scrollables.length != 0 &&
        scrollables != null &&
        scrollables != undefined
    ) {
        // const values to be used in calculations
        const bodyStyles = window.getComputedStyle(document.body);
        const scrollableWidthPx = scrollables[0].clientWidth;
        const minMarginPx = 10;
        const imageWidthPx = parseInt(
            bodyStyles
                .getPropertyValue('--home-page-image-width')
                .replace('px', '')
        );

        const initialCount = Math.floor(scrollableWidthPx / imageWidthPx);
        const finalCount = Math.floor(
            (scrollableWidthPx - initialCount * minMarginPx) / imageWidthPx
        );
        const remainingSpace = scrollableWidthPx - finalCount * imageWidthPx;
        const margin = remainingSpace / (2 * finalCount);

        document.body.style.setProperty(
            '--home-post-wrapper-margin',
            `${margin}px`
        );
    } else {
        console.warn('No horizontal scrollables found');
    }
}

function createHomePagePostElementFromPost(postData) {
    var post = document.createElement('home-page-post');
    post.id = postData.id;
    post.title = postData.title;
    post.price = postData.price;
    post.properties = postData.properties.toString();
    post.location = Coordinates.fromObject(postData.location).toString();
    post.timestamp = postData.timestamp;
    post.imageSrc = postData.imgSrc[0];
    post.postID = postData.id;
    return post;
}

export function updateUserListingsInUI() {
    getUserListings(async (posts) => {
        try {
            if (!Coordinates.userLocation) {
                Coordinates.userLocation = await getLocation();
            }
        } finally {
            let userListingsParent =
                document.getElementById('my-listings-scroll');

            let userListingsElements = [];
            for (let i = 0; i < posts.length; i++) {
                userListingsElements.push(
                    createHomePagePostElementFromPost(posts[i])
                );
            }

            userListingsParent.replaceChildren(...userListingsElements);
            const scrollable = document.getElementById('my-listings-scroll');
            updateScrollButtons(scrollable);
        }
    });
}

function updateAllListingsInUI() {
    getAllListings(async (posts) => {
        const userPosts = posts.filter((post) => post.author == 'You');
        const featuredPosts = posts.filter((post) => post.author != 'You');
        featuredPosts.sort((a, b) => b.timestamp - a.timestamp);
        for (let i = featuredPosts.length; i > 0; i--) {
            if (featuredPosts[i - 1].equalsToAbsolute(errorPost)) {
                featuredPosts.splice(i - 1, 1);
                break;
            }
        }

        // TODO: refactor to avoid code duplication
        try {
            if (!Coordinates.userLocation) {
                Coordinates.userLocation = await getLocation();
            }
        } finally {
            let userListingsParent =
                document.getElementById('my-listings-scroll');
            let featuredListingsParent = document.getElementById(
                'featured-posts-scroll'
            );

            // 'My Listings'
            let userListingsElements = [];
            for (let i = 0; i < userPosts.length; i++) {
                userListingsElements.push(
                    createHomePagePostElementFromPost(userPosts[i])
                );
            }

            // 'Featured Posts'
            let featuredListingsElements = [];
            for (let i = 0; i < featuredPosts.length; i++) {
                featuredListingsElements.push(
                    createHomePagePostElementFromPost(featuredPosts[i])
                );
            }

            userListingsParent.replaceChildren(...userListingsElements);
            featuredListingsParent.replaceChildren(...featuredListingsElements);
            document
                .querySelectorAll('.horizontal-scroll')
                .forEach((scrollable) => {
                    updateScrollButtons(scrollable);
                });
        }
    }, true);
}

function updateScrollButtons(scrollable) {
    const currentScroll = scrollable.scrollLeft;
    const scrollWidth = scrollable.scrollWidth - scrollable.clientWidth;
    const scrollID = scrollable.id;
    const rightButton = document.getElementById(
        scrollID.substring(0, scrollID.indexOf('-scroll')) + '-right-button'
    );
    const leftButton = document.getElementById(
        scrollID.substring(0, scrollID.indexOf('-scroll')) + '-left-button'
    );
    if (scrollWidth - currentScroll - 1 <= 0) {
        rightButton.setAttribute('disabled', '');
    } else {
        rightButton.removeAttribute('disabled');
    }
    if (currentScroll <= 0) {
        leftButton.setAttribute('disabled', '');
    } else {
        leftButton.removeAttribute('disabled');
    }
}

function init() {
    updateAllListingsInUI();
    locationListeners.push(updateAllListingsInUI);
    document.addEventListener('DOMContentLoaded', () => {
        updatePostWrapperMargin();
        document
            .querySelectorAll('.horizontal-scroll')
            .forEach((scrollable) => {
                scrollable.addEventListener('scroll', () => {
                    updateScrollButtons(scrollable);
                });
                updateScrollButtons(scrollable);
            });
        document.getElementById('my-listings-left-button').onclick = () =>
            leftScroll('my-listings-scroll');
        document.getElementById('my-listings-right-button').onclick = () =>
            rightScroll('my-listings-scroll');
        document.getElementById('featured-posts-left-button').onclick = () =>
            leftScroll('featured-posts-scroll');
        document.getElementById('featured-posts-right-button').onclick = () =>
            rightScroll('featured-posts-scroll');
        document.getElementById('categories-left-button').onclick = () =>
            leftScroll('categories-scroll');
        document.getElementById('categories-right-button').onclick = () =>
            rightScroll('categories-scroll');
    });
}

{
    const url = new URL(window.location);
    if (url.pathname.includes('index.html')) {
        updatePostWrapperMargin();
        addEventListener('resize', updatePostWrapperMargin);
        init();
    }
}

// * Mobile JS
window.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('.menu-mobile');
    const menuItems = document.querySelectorAll('.menuItem');
    const hamburger = document.querySelector('.hamburger');

    function toggleMenu() {
        if (menu.classList.contains('showMenu')) {
            menu.classList.remove('showMenu');
        } else {
            menu.classList.add('showMenu');
        }
    }

    hamburger.addEventListener('click', toggleMenu);

    menuItems.forEach(function (menuItem) {
        menuItem.addEventListener('click', toggleMenu);
    });

    // https://dev.to/jankapunkt/make-text-fit-it-s-parent-size-using-javascript-m40
    const isOverflown = ({
        clientHeight,
        scrollHeight,
        clientWidth,
        scrollWidth,
    }) => scrollHeight > clientHeight || scrollWidth > clientWidth;

    const resizeText = ({element, parent}, maxSize = 44) => {
        let i = 8;
        let overflow = false;

        while (!overflow && i < maxSize) {
            element.style.fontSize = `${i}px`;
            overflow = isOverflown(parent);
            if (!overflow) i++;
        }

        // revert to last state where no overflow happened:
        element.style.fontSize = `${i - 1}px`;
    };

    if (new URL(window.location).pathname.includes('index.html')) {
        const mobileWrappers = document.querySelectorAll('.mobile');

        mobileWrappers.forEach((mobileWrapper) => {
            const categoryTexts =
                mobileWrapper.querySelectorAll('.category-text');
            categoryTexts.forEach((element) =>
                resizeText({element: element, parent: element.parentElement})
            );
        });

        const craigslistText = document.querySelector('.craigslist-text');
        resizeText(
            {element: craigslistText, parent: craigslistText.parentElement},
            200
        );

        window.addEventListener('resize', () =>
            document.querySelectorAll('.mobile').forEach((mobileWrapper) =>
                mobileWrapper
                    .querySelectorAll('.category-text')
                    .forEach((element) =>
                        resizeText({
                            element: element,
                            parent: element.parentElement,
                        })
                    )
            )
        );

        window.addEventListener('resize', () =>
            resizeText(
                {element: craigslistText, parent: craigslistText.parentElement},
                200
            )
        );
    }
});
