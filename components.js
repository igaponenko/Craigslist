import {Coordinates} from './scripts/coordinates.js';

function timeSince(timestamp) {
    if (Number.isNaN(timestamp)) {
        return 'A long time ago';
    }
    const diffSeconds = (Date.now() - timestamp) / 1000;
    if (diffSeconds < 60) {
        return 'Now';
    } else if (diffSeconds < 60 * 60) {
        return `${Math.floor(diffSeconds / 60)} min${
            Math.floor(diffSeconds / 60) == 1 ? '' : 's'
        } ago`;
    } else if (diffSeconds < 24 * 60 * 60) {
        return `${Math.floor(diffSeconds / 60 / 60)} hour${
            Math.floor(diffSeconds / 60 / 60) == 1 ? '' : 's'
        } ago`;
    } else if (diffSeconds < 30 * 24 * 60 * 60) {
        return `${Math.floor(diffSeconds / 60 / 60 / 24)} day${
            Math.floor(diffSeconds / 60 / 60 / 24) == 1 ? '' : 's'
        } ago`;
    } else if (diffSeconds < 3 * 30 * 24 * 60 * 60) {
        return `${Math.floor(diffSeconds / 60 / 60 / 24 / 30)} month${
            Math.floor(diffSeconds / 60 / 60 / 24 / 30) == 1 ? '' : 's'
        } ago`;
    } else {
        return 'A long time ago';
    }
}

function calculateDistance(locationStr) {
    if (
        Coordinates.userLocation != undefined ||
        Coordinates.userLocation != null
    ) {
        try {
            var location = Coordinates.fromString(locationStr);
        } catch (e) {
            return '';
        }
        return `${Math.floor(
            location.distanceTo(Coordinates.userLocation)
        )}km away`;
    } else {
        return '';
    }
}

const priceToStr = (strNum) =>
    `AED ${Number(strNum).toLocaleString('en-US') ?? 'ERR'}`;

class NavBar extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <div class="desktop">
            <header id="nav-bar">
                <nav>
                    <span class="nav-bar-span" style="height: 100%;width: 15%;min-width: 239px; justify-content: start">
                        <a href="javascript:goToHomePage()" draggable="false"><img class="logo" id="logo" src="assets/logo.svg" alt="Logo" draggable="false" /></a>
                        <div style="min-width: 30px"></div>
                        <!-- from: https://www.youtube.com/watch?v=hBbrGFCszU4 -->
                        <div id="location" class="location-dropdown">
                        <div class="location-selector">
                            <span>
                            <div>
                                <h3 id="city"></h3>
                            </div>
                            <div>
                                <h3 id="country">UAE</h3>
                            </div>
                            </span>
                            <span style="height: 25px">
                            <img
                                id="test"
                                class="undraggable"
                                src="assets/arrow-right-new-purple.svg"
                                alt=""
                            />
                            </span>
                        </div>
                        <ul class="menu">
                            <li>Abu Dhabi, UAE</li>
                            <li>Ajman, UAE</li>
                            <li class="selected">Dubai, UAE</li>
                            <li>Fujairah, UAE</li>
                            <!-- <li>Ras Al Khaimah, UAE</li> -->
                            <li>Sharjah, UAE</li>
                            <!-- <li>Umm Al Quwain, UAE</li> -->
                        </ul>
                        </div>
                    </span>
                    <div class="flex-spacer" style="--flex: 1"></div>
                    <span style="width: 45%; position: relative">
                        <input id="search-bar" type="search" placeholder="Search" class="search-bar" autocomplete="off" />
                        <img src="assets/search.svg" alt="" class="search-bar-icon undraggable" />
                    </span>
                    <div class="flex-spacer" style="--flex: 1.5"></div>
                    <span class="nav-bar-span" style="width: 15%; min-width: 196px">
                        <span style="width: var(--icon-size)"
                        ><span id="add-post" title="Add Post" class="circle circular-button">+</span></span
                        >
                        <span style="width: var(--icon-size)">
                            <img class="icon" src="assets/language.svg" alt="Language" draggable="false"/>
                        </span>
                        <span style="width: var(--icon-size)" n>
                        <img
                            class="icon"
                            src="https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg"
                            alt="Profile"
                            draggable="false"
                        />
                        </span>
                    </span>
                </nav>
            </header>
        </div>
        <div class="mobile">
            <header id="nav-bar-mobile">
                <nav>
                <div class="flex-spacer" style="--flex: 1"></div>
                <a href="javascript:goToHomePage()" draggable="false"
                    ><img
                    class="logo"
                    id="logo-mobile"
                    src="assets/logo.svg"
                    alt="Logo"
                    draggable="false"
                /></a>
                <div id="mobile-location" class="mobile-location-dropdown">
                    <div class="mobile-location-selector">
                        <span>
                            <div>
                                <h3 id="mobile-city"></h3>
                            </div>
                            <div>
                                <h3 id="country">UAE</h3>
                            </div>
                        </span> 
                        <span style="height: 25px">
                            <img
                                id="test"
                                class="undraggable"
                                src="assets/arrow-right-new-purple.svg"
                                alt=""
                            />
                        </span>
                    </div>
                    <ul class="menu">
                        <li>Abu Dhabi, UAE</li>
                        <li>Ajman, UAE</li>
                        <li class="selected">Dubai, UAE</li>
                        <li>Fujairah, UAE</li>
                        <!-- <li>Ras Al Khaimah, UAE</li> -->
                        <li>Sharjah, UAE</li>
                        <!-- <li>Umm Al Quwain, UAE</li> -->
                    </ul>
                </div>
                <div class="flex-spacer" style="--flex: 1"></div>
                <span style="width: 70%; position: relative; margin-right: 15px;">
                    <input
                    id="search-bar-mobile"
                    type="search"
                    placeholder="Search"
                    class="search-bar"
                    autocomplete="off"
                    />
                    <img
                    src="assets/search.svg"
                    alt=""
                    class="search-bar-icon undraggable"
                    />
                </span>
                <div class="flex-spacer" style="--flex: 1"></div>
                <span style="width: var(--icon-size)"></span>
                <span class="burger-container">
                    <ul class="menu-mobile">
                    <li>
                        <span
                        id="add-post-mobile"
                        title="Add Post"
                        class="circle circular-button"
                        >+
                        </span>
                    </li>
                    <li>
                        <a class="menuItem" id="profile-mobile" href="#">Profile</a>
                    </li>
                    <li>
                        <a class="menuItem" id="my-posts-mobile" href="#">My Posts</a>
                    </li>
                    <li>
                        <a class="menuItem" id="language-mobile" href="#">Language</a>
                    </li>
                    </ul>
                    <button class="hamburger" style="margin-top: 5px">
                    <div class="bar1"></div>
                    <div class="bar2"></div>
                    <div class="bar3"></div>
                    </button>
                    <!-- <div class="bar1"></div>
                    <div class="bar2"></div>
                    <div class="bar3"></div> -->
                </span>
                <div class="flex-spacer" style="--flex: 1"></div>
                </nav>
            </header>
        </div>`;
    }
}

export class HomePagePost extends HTMLElement {
    get id() {
        return this.getAttribute('id') ?? '0';
    }

    set id(val) {
        this.setAttribute('id', val);
    }

    get title() {
        let title = this.getAttribute('title') ?? 'ERR';
        if (title.length > 27) {
            title = title.substring(0, 27).trim() + '...';
        }
        return title;
    }

    set title(val) {
        this.setAttribute('title', val ?? 'No Title');
    }

    get price() {
        return priceToStr(this.getAttribute('price') ?? 'ERR');
    }

    set price(val) {
        this.setAttribute('price', val);
    }

    get distance() {
        return calculateDistance(this.getAttribute('location'));
    }

    set location(val) {
        this.setAttribute('location', val);
    }

    get time() {
        return timeSince(this.getAttribute('timestamp') ?? '0');
    }

    set timestamp(val) {
        this.setAttribute('timestamp', val);
    }

    get imageSrc() {
        return this.getAttribute('image-src') ?? 'assets/images/error.png';
    }

    set imageSrc(val) {
        this.setAttribute('image-src', val);
    }

    get postID() {
        return this.getAttribute('postURL') ?? '';
    }

    set postID(val) {
        this.setAttribute('postURL', val);
    }

    connectedCallback() {
        this.innerHTML = `
        <div class="post-wrapper">
            <a href="javascript:goToPostPage(${this.id})" draggable="false">
                <div class="image-wrapper hover-outline">
                    <img src="${this.imageSrc}" alt="" />
                    <div class="post-price-shadow"></div>
                    <div class="time-on-image">${this.time}</div>
                    <div class="price-distance-wrapper">
                        <p>${this.distance}</p>
                        <div class="price">${this.price}</div>
                    </div>
                </div>
            </a>
            <a class="clickable-text"><h3>${this.title}</h3></a>
        </div>`;
    }
}

class HomePagePostPlaceholder extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <div class="post-wrapper" style="cursor: default !important">
            <div class="image-wrapper animated-background">
                <div class="price-distance-wrapper">
                <div
                    class="price animated-background-price"
                    style="width: 125px; height: 39px; padding: 0px"
                ></div>
                </div>
            </div>
            <div
                class="animated-background"
                style="
                width: 100%;
                height: 35px;
                margin: 15px 0px;
                border-radius: var(--border-radius);
                "
            ></div>
        </div>`;
    }
}

class HomePageCategory extends HTMLElement {
    get title() {
        return this.getAttribute('title') ?? 'ERR';
    }

    set title(val) {
        this.setAttribute('title', val ?? 'No Title');
    }

    get imgSrc() {
        return this.getAttribute('img-src') ?? 'assets/images/error.png';
    }

    set imgSrc(val) {
        this.setAttribute('img-src', val);
    }

    connectedCallback() {
        this.innerHTML = `
        <div class="post-wrapper">
            <div class="image-wrapper hover-outline">
                <a href="javascript:goToSearchPage('${this.title}')" draggable="false">
                    <img class="background-image" src="${this.imgSrc}" alt="for-sale">
                    <div class="center" style="position: absolute;">
                        <h1 class="category-text no-select">${this.title}</h1>
                    </div>
                </a>
            </div>
        </div>`;
    }
}

class HomePageCategoryMobile extends HTMLElement {
    get title() {
        return this.getAttribute('title') ?? 'ERR';
    }

    set title(val) {
        this.setAttribute('title', val ?? 'No Title');
    }

    get imgSrc() {
        return this.getAttribute('img-src') ?? 'assets/images/error.png';
    }

    set imgSrc(val) {
        this.setAttribute('img-src', val);
    }

    connectedCallback() {
        this.innerHTML = `
        <div class="category-wrapper">
            <div class="category-image-wrapper">
              <a
                href="javascript:goToSearchPage('${this.title}')"
                draggable="false"
              >
                <img
                  class="background-image"
                  src="${this.imgSrc}"
                  alt="for-sale"
                />
                <div class="center">
                  <div
                    class="category-text-wrapper center"
                    style="position: absolute"
                  >
                    <h1 class="category-text no-select">${this.title}</h1>
                  </div>
                </div>
              </a>
            </div>
          </div>
        `;
    }
}

class LargeFooter extends HTMLElement {
    connectedCallback() {
        // TODO: add back "for copyright" after contact info
        this.innerHTML = `
        <footer>
        <div class="footer">
        <div class="container">
          <div class="row">
            <div class="footer-col">
              <h3>Contact info</h3>
              <h3>+971-50-***-**-**</h3>
              <h3>craigslist@bing.com</h3>
              <h6>
                1995-2023 ©Craigslist - classified advertisements website with
                sections devoted to jobs, housing for sale, items for sale, etc.
              </h6>
            </div>
            <div class="footer-col">
              <h3>Resources</h3>
              <ul>
                <li><a href="#">FAQ</a></li>
                <li><a href="#">Documentation</a></li>
                <li><a href="#">Help</a></li>
                <li><a href="#">Systems</a></li>
              </ul>
            </div>
            <div class="footer-col">
              <h3>Pricing</h3>
              <ul>
                <li><a href="#">Overview</a></li>
                <li><a href="#">Promotions</a></li>
                <li><a href="#">Terms</a></li>
                <li><a href="#">Safety</a></li>
              </ul>
            </div>
            <div class="footer-col">
              <h3>Company</h3>
              <ul>
                <li><a href="#">About us</a></li>
                <li><a href="#">Partners</a></li>
                <li><a href="#">Careers</a></li>
              </ul>
            </div>
            <div class="footer-col">
              <h3>Resources</h3>
              <ul>
                <li><a href="#">Mobile Version</a></li>
                <div class="appstore" ; type="submit">
                  <a
                    href="https://apps.apple.com/us/app/craigslist-local-marketplace/id1336642410"
                  >
                    <img src="assets/appstore.png" style="margin-top: 10px" />
                    <div class="googleplay" ; type="submit">
                      <a
                        href="https://play.google.com/store/apps/details?id=org.craigslist.CraigslistMobile&hl=en&gl=US&pli=1"
                      >
                        <img
                          src="assets/googleplay.png"
                          style="margin-top: 10px"
                        />
                        <h6>All rights reserved.</h6>
  
                        <script src="components.js"></script>
                        <script src="post_page.js"></script>
                      </a></div
                  ></a>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div></footer>`;
    }
}

class SearchResultPost extends HTMLElement {
    get id() {
        return this.getAttribute('id') ?? '0';
    }

    set id(val) {
        this.setAttribute('id', val);
    }

    get title() {
        return this.getAttribute('title') ?? 'ERR';
    }

    set title(val) {
        this.setAttribute('title', val ?? 'No Title');
    }

    get description() {
        return this.getAttribute('description') ?? 'ERR';
    }

    set description(val) {
        this.setAttribute('description', val ?? 'No Description');
    }

    get distance() {
        return calculateDistance(this.getAttribute('location'));
    }

    set location(val) {
        this.setAttribute('location', val);
    }

    get time() {
        return timeSince(this.getAttribute('timestamp') ?? '0');
    }

    set timestamp(val) {
        this.setAttribute('timestamp', val);
    }

    get price() {
        return priceToStr(this.getAttribute('price') ?? 'ERR');
    }

    set price(val) {
        this.setAttribute('price', val ?? 'No Price');
    }

    get src() {
        return this.getAttribute('src') ?? 'assets/images/error.png';
    }

    set src(val) {
        this.setAttribute('src', val);
    }

    get attributes() {
        return this.getAttribute('attributes') ?? 'ERR: ERR';
    }

    set attributes(val) {
        this.setAttribute('attributes', val ?? '');
    }

    #attributesFromStr = (str) => {
        let HTMLElements = '';
        let attributes = str.split(',');
        for (let i = 0; i < attributes.length; i++) {
            const attributeArray = attributes[i].split(':');
            HTMLElements += `
            <span class="in-line-children hidden">
                <b>${attributeArray[0]}: </b>
                <p>${attributeArray[1]}</p>
            </span>
            `;
        }
        return HTMLElements;
    };

    connectedCallback() {
        this.innerHTML = `
        <div class="mobile">
            <div id="${this.id}" class="search-post-wrapper">
                <div class="image-wrapper hover-outline">
                <a href="javascript:goToPostPage(${this.id})" draggable="false">
                    <img src="${this.src}" alt="" />
                </a>
                <div class="post-price-shadow"></div>
                <div class="time-on-image">${this.time}</div>
                <div class="price-distance-wrapper">
                    <p>${this.distance}</p>
                    <div class="price">${this.price}</div>
                </div>
                </div>
                <div class="text-wrapper">
                <a href="javascript:goToPostPage(${this.id})" draggable="false">
                    <h3 class>${this.title}</h3>
                </a>
                <p class="description">${this.description}</p>
                <div class="result-post-attributes">
                    <span
                    class="in-line-children"
                    style="width: 0px; margin: 0px; padding: 0px"
                    ></span>
                    ${this.#attributesFromStr(this.attributes)}
                </div>
                </div>
            </div>
        </div>
        <div class="desktop">
            <div id=${this.id} class="search-post-wrapper">
                <div class="image-wrapper hover-outline">
                <a href="javascript:goToPostPage(${this.id})" draggable="false">
                    <img src="${this.src}" alt="" />
                </a>
                <div class="post-price-shadow"></div>
                <div class="time-on-image">${this.time}</div>
                <div class="price-distance-wrapper">
                    <p>${this.distance}</p>
                    <div class="price">${this.price}</div>
                </div>
                </div>
                <div class="text-wrapper">
                <a href="javascript:goToPostPage(${this.id})" draggable="false">
                    <h3 class>${this.title}</h3>
                </a>
                <p class="description">${this.description}</p>
                <div class="result-post-attributes">
                    <span class="in-line-children" style="width: 0px; margin: 0px; padding: 0px;"></span>
                    ${this.#attributesFromStr(this.attributes)}
                </div>
                </div>
            </div>
        </div>`;
    }
}

customElements.define('nav-bar', NavBar);
customElements.define('home-page-post', HomePagePost);
customElements.define('home-page-post-placeholder', HomePagePostPlaceholder);
customElements.define('home-page-category', HomePageCategory);
customElements.define('home-page-category-mobile', HomePageCategoryMobile);
customElements.define('large-footer', LargeFooter);
customElements.define('search-result-post', SearchResultPost);
