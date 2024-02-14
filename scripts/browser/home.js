(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HomePagePost = void 0;
var _coordinates = require("./scripts/coordinates.js");
function timeSince(timestamp) {
  if (Number.isNaN(timestamp)) {
    return 'A long time ago';
  }
  const diffSeconds = (Date.now() - timestamp) / 1000;
  if (diffSeconds < 60) {
    return 'Now';
  } else if (diffSeconds < 60 * 60) {
    return `${Math.floor(diffSeconds / 60)} min${Math.floor(diffSeconds / 60) == 1 ? '' : 's'} ago`;
  } else if (diffSeconds < 24 * 60 * 60) {
    return `${Math.floor(diffSeconds / 60 / 60)} hour${Math.floor(diffSeconds / 60 / 60) == 1 ? '' : 's'} ago`;
  } else if (diffSeconds < 30 * 24 * 60 * 60) {
    return `${Math.floor(diffSeconds / 60 / 60 / 24)} day${Math.floor(diffSeconds / 60 / 60 / 24) == 1 ? '' : 's'} ago`;
  } else if (diffSeconds < 3 * 30 * 24 * 60 * 60) {
    return `${Math.floor(diffSeconds / 60 / 60 / 24 / 30)} month${Math.floor(diffSeconds / 60 / 60 / 24 / 30) == 1 ? '' : 's'} ago`;
  } else {
    return 'A long time ago';
  }
}
function calculateDistance(locationStr) {
  if (_coordinates.Coordinates.userLocation != undefined || _coordinates.Coordinates.userLocation != null) {
    try {
      var location = _coordinates.Coordinates.fromString(locationStr);
    } catch (e) {
      return '';
    }
    return `${Math.floor(location.distanceTo(_coordinates.Coordinates.userLocation))}km away`;
  } else {
    return '';
  }
}
const priceToStr = strNum => `AED ${Number(strNum).toLocaleString('en-US') ?? 'ERR'}`;
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
class HomePagePost extends HTMLElement {
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
exports.HomePagePost = HomePagePost;
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
  #attributesFromStr = str => {
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

},{"./scripts/coordinates.js":17}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FORMAT_PLAIN = exports.FORMAT_HTML = exports.FORMATS = void 0;
var FORMAT_HTML = "html";
exports.FORMAT_HTML = FORMAT_HTML;
var FORMAT_PLAIN = "plain";
exports.FORMAT_PLAIN = FORMAT_PLAIN;
var FORMATS = [FORMAT_HTML, FORMAT_PLAIN];
exports.FORMATS = FORMATS;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LINE_ENDINGS = void 0;
var LINE_ENDINGS = {
  POSIX: "\n",
  WIN32: "\r\n"
};
exports.LINE_ENDINGS = LINE_ENDINGS;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SUPPORTED_PLATFORMS = void 0;
var SUPPORTED_PLATFORMS = {
  DARWIN: "darwin",
  LINUX: "linux",
  WIN32: "win32"
};
exports.SUPPORTED_PLATFORMS = SUPPORTED_PLATFORMS;

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UNIT_WORDS = exports.UNIT_WORD = exports.UNIT_SENTENCES = exports.UNIT_SENTENCE = exports.UNIT_PARAGRAPHS = exports.UNIT_PARAGRAPH = exports.UNITS = void 0;
var UNIT_WORDS = "words";
exports.UNIT_WORDS = UNIT_WORDS;
var UNIT_WORD = "word";
exports.UNIT_WORD = UNIT_WORD;
var UNIT_SENTENCES = "sentences";
exports.UNIT_SENTENCES = UNIT_SENTENCES;
var UNIT_SENTENCE = "sentence";
exports.UNIT_SENTENCE = UNIT_SENTENCE;
var UNIT_PARAGRAPHS = "paragraphs";
exports.UNIT_PARAGRAPHS = UNIT_PARAGRAPHS;
var UNIT_PARAGRAPH = "paragraph";
exports.UNIT_PARAGRAPH = UNIT_PARAGRAPH;
var UNITS = [UNIT_WORDS, UNIT_WORD, UNIT_SENTENCES, UNIT_SENTENCE, UNIT_PARAGRAPHS, UNIT_PARAGRAPH];
exports.UNITS = UNITS;

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WORDS = void 0;
var WORDS = ["ad", "adipisicing", "aliqua", "aliquip", "amet", "anim", "aute", "cillum", "commodo", "consectetur", "consequat", "culpa", "cupidatat", "deserunt", "do", "dolor", "dolore", "duis", "ea", "eiusmod", "elit", "enim", "esse", "est", "et", "eu", "ex", "excepteur", "exercitation", "fugiat", "id", "in", "incididunt", "ipsum", "irure", "labore", "laboris", "laborum", "Lorem", "magna", "minim", "mollit", "nisi", "non", "nostrud", "nulla", "occaecat", "officia", "pariatur", "proident", "qui", "quis", "reprehenderit", "sint", "sit", "sunt", "tempor", "ullamco", "ut", "velit", "veniam", "voluptate"];
exports.WORDS = WORDS;

},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "LoremIpsum", {
  enumerable: true,
  get: function get() {
    return _LoremIpsum["default"];
  }
});
exports.loremIpsum = void 0;

var _formats = require("./constants/formats");

var _units = require("./constants/units");

var _words = require("./constants/words");

var _LoremIpsum = _interopRequireDefault(require("./lib/LoremIpsum"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var loremIpsum = function loremIpsum() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$count = _ref.count,
      count = _ref$count === void 0 ? 1 : _ref$count,
      _ref$format = _ref.format,
      format = _ref$format === void 0 ? _formats.FORMAT_PLAIN : _ref$format,
      _ref$paragraphLowerBo = _ref.paragraphLowerBound,
      paragraphLowerBound = _ref$paragraphLowerBo === void 0 ? 3 : _ref$paragraphLowerBo,
      _ref$paragraphUpperBo = _ref.paragraphUpperBound,
      paragraphUpperBound = _ref$paragraphUpperBo === void 0 ? 7 : _ref$paragraphUpperBo,
      random = _ref.random,
      _ref$sentenceLowerBou = _ref.sentenceLowerBound,
      sentenceLowerBound = _ref$sentenceLowerBou === void 0 ? 5 : _ref$sentenceLowerBou,
      _ref$sentenceUpperBou = _ref.sentenceUpperBound,
      sentenceUpperBound = _ref$sentenceUpperBou === void 0 ? 15 : _ref$sentenceUpperBou,
      _ref$units = _ref.units,
      units = _ref$units === void 0 ? _units.UNIT_SENTENCES : _ref$units,
      _ref$words = _ref.words,
      words = _ref$words === void 0 ? _words.WORDS : _ref$words,
      _ref$suffix = _ref.suffix,
      suffix = _ref$suffix === void 0 ? "" : _ref$suffix;

  var options = {
    random: random,
    sentencesPerParagraph: {
      max: paragraphUpperBound,
      min: paragraphLowerBound
    },
    words: words,
    wordsPerSentence: {
      max: sentenceUpperBound,
      min: sentenceLowerBound
    }
  };
  var lorem = new _LoremIpsum["default"](options, format, suffix);

  switch (units) {
    case _units.UNIT_PARAGRAPHS:
    case _units.UNIT_PARAGRAPH:
      return lorem.generateParagraphs(count);

    case _units.UNIT_SENTENCES:
    case _units.UNIT_SENTENCE:
      return lorem.generateSentences(count);

    case _units.UNIT_WORDS:
    case _units.UNIT_WORD:
      return lorem.generateWords(count);

    default:
      return "";
  }
};

exports.loremIpsum = loremIpsum;

},{"./constants/formats":2,"./constants/units":5,"./constants/words":6,"./lib/LoremIpsum":8}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _formats = require("../constants/formats");

var _lineEndings = require("../constants/lineEndings");

var _generator = _interopRequireDefault(require("../lib/generator"));

var _util = require("../util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var LoremIpsum = /*#__PURE__*/function () {
  function LoremIpsum() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _formats.FORMAT_PLAIN;
    var suffix = arguments.length > 2 ? arguments[2] : undefined;

    _classCallCheck(this, LoremIpsum);

    this.format = format;
    this.suffix = suffix;

    _defineProperty(this, "generator", void 0);

    if (_formats.FORMATS.indexOf(format.toLowerCase()) === -1) {
      throw new Error("".concat(format, " is an invalid format. Please use ").concat(_formats.FORMATS.join(" or "), "."));
    }

    this.generator = new _generator["default"](options);
  }

  _createClass(LoremIpsum, [{
    key: "getLineEnding",
    value: function getLineEnding() {
      if (this.suffix) {
        return this.suffix;
      }

      if (!(0, _util.isReactNative)() && (0, _util.isNode)() && (0, _util.isWindows)()) {
        return _lineEndings.LINE_ENDINGS.WIN32;
      }

      return _lineEndings.LINE_ENDINGS.POSIX;
    }
  }, {
    key: "formatString",
    value: function formatString(str) {
      if (this.format === _formats.FORMAT_HTML) {
        return "<p>".concat(str, "</p>");
      }

      return str;
    }
  }, {
    key: "formatStrings",
    value: function formatStrings(strings) {
      var _this = this;

      return strings.map(function (str) {
        return _this.formatString(str);
      });
    }
  }, {
    key: "generateWords",
    value: function generateWords(num) {
      return this.formatString(this.generator.generateRandomWords(num));
    }
  }, {
    key: "generateSentences",
    value: function generateSentences(num) {
      return this.formatString(this.generator.generateRandomParagraph(num));
    }
  }, {
    key: "generateParagraphs",
    value: function generateParagraphs(num) {
      var makeString = this.generator.generateRandomParagraph.bind(this.generator);
      return this.formatStrings((0, _util.makeArrayOfStrings)(num, makeString)).join(this.getLineEnding());
    }
  }]);

  return LoremIpsum;
}();

var _default = LoremIpsum;
exports["default"] = _default;

},{"../constants/formats":2,"../constants/lineEndings":3,"../lib/generator":9,"../util":11}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _words = require("../constants/words");

var _util = require("../util");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Generator = /*#__PURE__*/function () {
  function Generator() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$sentencesPerPara = _ref.sentencesPerParagraph,
        sentencesPerParagraph = _ref$sentencesPerPara === void 0 ? {
      max: 7,
      min: 3
    } : _ref$sentencesPerPara,
        _ref$wordsPerSentence = _ref.wordsPerSentence,
        wordsPerSentence = _ref$wordsPerSentence === void 0 ? {
      max: 15,
      min: 5
    } : _ref$wordsPerSentence,
        random = _ref.random,
        seed = _ref.seed,
        _ref$words = _ref.words,
        words = _ref$words === void 0 ? _words.WORDS : _ref$words;

    _classCallCheck(this, Generator);

    _defineProperty(this, "sentencesPerParagraph", void 0);

    _defineProperty(this, "wordsPerSentence", void 0);

    _defineProperty(this, "random", void 0);

    _defineProperty(this, "words", void 0);

    if (sentencesPerParagraph.min > sentencesPerParagraph.max) {
      throw new Error("Minimum number of sentences per paragraph (".concat(sentencesPerParagraph.min, ") cannot exceed maximum (").concat(sentencesPerParagraph.max, ")."));
    }

    if (wordsPerSentence.min > wordsPerSentence.max) {
      throw new Error("Minimum number of words per sentence (".concat(wordsPerSentence.min, ") cannot exceed maximum (").concat(wordsPerSentence.max, ")."));
    }

    this.sentencesPerParagraph = sentencesPerParagraph;
    this.words = words;
    this.wordsPerSentence = wordsPerSentence;
    this.random = random || Math.random;
  }

  _createClass(Generator, [{
    key: "generateRandomInteger",
    value: function generateRandomInteger(min, max) {
      return Math.floor(this.random() * (max - min + 1) + min);
    }
  }, {
    key: "generateRandomWords",
    value: function generateRandomWords(num) {
      var _this = this;

      var _this$wordsPerSentenc = this.wordsPerSentence,
          min = _this$wordsPerSentenc.min,
          max = _this$wordsPerSentenc.max;
      var length = num || this.generateRandomInteger(min, max);
      return (0, _util.makeArrayOfLength)(length).reduce(function (accumulator, index) {
        return "".concat(_this.pluckRandomWord(), " ").concat(accumulator);
      }, "").trim();
    }
  }, {
    key: "generateRandomSentence",
    value: function generateRandomSentence(num) {
      return "".concat((0, _util.capitalize)(this.generateRandomWords(num)), ".");
    }
  }, {
    key: "generateRandomParagraph",
    value: function generateRandomParagraph(num) {
      var _this2 = this;

      var _this$sentencesPerPar = this.sentencesPerParagraph,
          min = _this$sentencesPerPar.min,
          max = _this$sentencesPerPar.max;
      var length = num || this.generateRandomInteger(min, max);
      return (0, _util.makeArrayOfLength)(length).reduce(function (accumulator, index) {
        return "".concat(_this2.generateRandomSentence(), " ").concat(accumulator);
      }, "").trim();
    }
  }, {
    key: "pluckRandomWord",
    value: function pluckRandomWord() {
      var min = 0;
      var max = this.words.length - 1;
      var index = this.generateRandomInteger(min, max);
      return this.words[index];
    }
  }]);

  return Generator;
}();

var _default = Generator;
exports["default"] = _default;

},{"../constants/words":6,"../util":11}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

/**
 * @param str  A string that may or may not be capitalized.
 * @returns    A capitalized string.
 */
var capitalize = function capitalize(str) {
  var trimmed = str.trim();
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
};

var _default = capitalize;
exports["default"] = _default;

},{}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "capitalize", {
  enumerable: true,
  get: function get() {
    return _capitalize["default"];
  }
});
Object.defineProperty(exports, "isNode", {
  enumerable: true,
  get: function get() {
    return _isNode["default"];
  }
});
Object.defineProperty(exports, "isReactNative", {
  enumerable: true,
  get: function get() {
    return _isReactNative["default"];
  }
});
Object.defineProperty(exports, "isWindows", {
  enumerable: true,
  get: function get() {
    return _isWindows["default"];
  }
});
Object.defineProperty(exports, "makeArrayOfLength", {
  enumerable: true,
  get: function get() {
    return _makeArrayOfLength["default"];
  }
});
Object.defineProperty(exports, "makeArrayOfStrings", {
  enumerable: true,
  get: function get() {
    return _makeArrayOfStrings["default"];
  }
});

var _capitalize = _interopRequireDefault(require("./capitalize"));

var _isNode = _interopRequireDefault(require("./isNode"));

var _isReactNative = _interopRequireDefault(require("./isReactNative"));

var _isWindows = _interopRequireDefault(require("./isWindows"));

var _makeArrayOfLength = _interopRequireDefault(require("./makeArrayOfLength"));

var _makeArrayOfStrings = _interopRequireDefault(require("./makeArrayOfStrings"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

},{"./capitalize":10,"./isNode":12,"./isReactNative":13,"./isWindows":14,"./makeArrayOfLength":15,"./makeArrayOfStrings":16}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

/**
 * @returns  True if the runtime is NodeJS.
 */
var isNode = function isNode() {
  return typeof module !== "undefined" && !!module.exports;
};

var _default = isNode;
exports["default"] = _default;

},{}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

/**
 * Check if runtime is ReactNative.
 * Solution based on https://github.com/knicklabs/lorem-ipsum.js/pull/52/files
 *
 * @returns  True if runtime is ReactNative.
 */
var isReactNative = function isReactNative() {
  var isReactNativeResult = false;

  try {
    isReactNativeResult = navigator.product === "ReactNative";
  } catch (e) {
    isReactNativeResult = false;
  }

  return isReactNativeResult;
};

var _default = isReactNative;
exports["default"] = _default;

},{}],14:[function(require,module,exports){
(function (process){(function (){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _platforms = require("../constants/platforms");

/**
 * @returns True if process is windows.
 */
var isWindows = function isWindows() {
  var isWindowsResult = false;

  try {
    isWindowsResult = process.platform === _platforms.SUPPORTED_PLATFORMS.WIN32;
  } catch (e) {
    isWindowsResult = false;
  }

  return isWindowsResult;
};

var _default = isWindows;
exports["default"] = _default;

}).call(this)}).call(this,require('_process'))
},{"../constants/platforms":4,"_process":47}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

/**
 * @param length Length "x".
 * @returns      An array of indexes of length "x".
 */
var makeArrayOfLength = function makeArrayOfLength() {
  var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  return Array.apply(null, Array(length)).map(function (item, index) {
    return index;
  });
};

var _default = makeArrayOfLength;
exports["default"] = _default;

},{}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _makeArrayOfLength = _interopRequireDefault(require("./makeArrayOfLength"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @param length  Length "x".
 * @returns       An array of strings of length "x".
 */
var makeArrayOfStrings = function makeArrayOfStrings(length, makeString) {
  var arr = (0, _makeArrayOfLength["default"])(length);
  return arr.map(function () {
    return makeString();
  });
};

var _default = makeArrayOfStrings;
exports["default"] = _default;

},{"./makeArrayOfLength":15}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Coordinates = void 0;
exports.getLocation = getLocation;
class Coordinates {
  static #userLocation;
  static get userLocation() {
    return this.#userLocation;
  }
  static set userLocation(val) {
    console.log('setting user location');
    this.#userLocation = val;
  }
  constructor(latitude, longitude) {
    this.latitude = latitude;
    this.longitude = longitude;
  }
  toString() {
    return `${this.latitude}, ${this.longitude}`;
  }
  toObject() {
    return {
      latitude: this.latitude,
      longitude: this.longitude
    };
  }
  static distance(coord1, coord2) {
    // source: https://stackoverflow.com/a/27943 (uses Haversine formula)
    function deg2rad(deg) {
      return deg * (Math.PI / 180);
    }
    const R = 6371; // radius of the earth in kilometres
    const dLat = deg2rad(coord1.latitude - coord2.latitude);
    const dLon = deg2rad(coord1.longitude - coord2.longitude);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(coord1.latitude)) * Math.cos(deg2rad(coord2.latitude)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d;
  }
  distanceTo(coord) {
    return Coordinates.distance(this, coord);
  }
  static fromString(str) {
    const [latitude, longitude] = str.split(', ');
    return new Coordinates(latitude, longitude);
  }
  static fromObject(obj) {
    return new Coordinates(obj.latitude, obj.longitude);
  }
  static fromGeolocationPosition(position) {
    return new Coordinates(position.coords.latitude, position.coords.longitude);
  }
  static fromGeolocationCoordinates(coords) {
    return new Coordinates(coords.latitude, coords.longitude);
  }
}
exports.Coordinates = Coordinates;
function getLocationFromIPAddress() {
  return new Promise(async (resolve, reject) => {
    try {
      // get user ip address from ipify (credit: https://stackoverflow.com/questions/391979/how-to-get-clients-ip-address-using-javascript)
      // http request credit: https://stackoverflow.com/a/4033310
      const ipHttp = new XMLHttpRequest();
      ipHttp.onreadystatechange = function () {
        if (ipHttp.readyState == 4 && ipHttp.status == 200) {
          const ip = JSON.parse(ipHttp.responseText).ip;
          const geoHttp = new XMLHttpRequest();
          geoHttp.onreadystatechange = function () {
            if (geoHttp.readyState == 4 && geoHttp.status == 200) {
              const coords = Coordinates.fromObject(JSON.parse(geoHttp.responseText));
              console.log(coords);
              Coordinates.userLocation = coords;
              resolve(coords);
            }
          };
          geoHttp.open('GET', `https://ipapi.co/${ip}/json/`, true);
          geoHttp.onerror = error => {
            console.log('geohttp', error);
            Coordinates.userLocation = null;
            resolve(null);
          };
          geoHttp.send();
        }
      };
      ipHttp.open('GET', 'https://api.ipify.org?format=json', true);
      ipHttp.onerror = error => {
        console.log('iphttp', error);
        Coordinates.userLocation = null;
        resolve(null);
      };
      ipHttp.send();
    } catch (error) {
      console.log(error);
      Coordinates.userLocation = null;
      resolve(null);
    }
  });
}
let getLocationCalled = false;
function getLocation() {
  return new Promise(async (resolve, reject) => {
    // resolve if the function takes more than 10 seconds
    setTimeout(() => resolve(), 10 * 1000);
    if (!getLocationCalled) {
      getLocationCalled = true;
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          console.log('getting location from navigator.geolocation');
          const coords = Coordinates.fromGeolocationPosition(position);
          Coordinates.userLocation = coords;
          resolve(coords);
        }, async _ => {
          console.log('getting location from ip address');
          resolve(await getLocationFromIPAddress());
        });
      } else {
        console.log('getting location from ip address');
        resolve(await getLocationFromIPAddress());
      }
    } else {
      while (Coordinates.userLocation === undefined) {
        // wait for 100ms
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      resolve(Coordinates.userLocation);
    }
  });
}
getLocation();

},{}],18:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateUserListingsInUI = updateUserListingsInUI;
var _storage = require("./storage.js");
var _coordinates = require("./coordinates.js");
var _post = require("./post.js");
// * Desktop JS
function rightScroll(scrollID) {
  const scroll = document.getElementById(scrollID);
  const currentScroll = scroll.scrollLeft;
  const visibleWidth = scroll.clientWidth;
  const currentFullScrolls = Math.floor(currentScroll / visibleWidth);
  const amountToScroll = currentFullScrolls * visibleWidth + visibleWidth - currentScroll;
  scroll.scrollBy(amountToScroll, 0);
}

// TODO: fix a bug where on different zoom levels it doesn't always scroll back to the start
function leftScroll(scrollID) {
  const scroll = document.getElementById(scrollID);
  const currentScroll = scroll.scrollLeft;
  const visibleWidth = scroll.clientWidth;
  const currentFullScrolls = Math.ceil(currentScroll / visibleWidth);
  const amountToScroll = currentFullScrolls * visibleWidth - currentScroll - visibleWidth;
  scroll.scrollBy(amountToScroll, 0);
}
function updatePostWrapperMargin() {
  const scrollables = document.getElementsByClassName('horizontal-scroll');
  if (scrollables.length != 0 && scrollables != null && scrollables != undefined) {
    // const values to be used in calculations
    const bodyStyles = window.getComputedStyle(document.body);
    const scrollableWidthPx = scrollables[0].clientWidth;
    const minMarginPx = 10;
    const imageWidthPx = parseInt(bodyStyles.getPropertyValue('--home-page-image-width').replace('px', ''));
    const initialCount = Math.floor(scrollableWidthPx / imageWidthPx);
    const finalCount = Math.floor((scrollableWidthPx - initialCount * minMarginPx) / imageWidthPx);
    const remainingSpace = scrollableWidthPx - finalCount * imageWidthPx;
    const margin = remainingSpace / (2 * finalCount);
    document.body.style.setProperty('--home-post-wrapper-margin', `${margin}px`);
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
  post.location = _coordinates.Coordinates.fromObject(postData.location).toString();
  post.timestamp = postData.timestamp;
  post.imageSrc = postData.imgSrc[0];
  post.postID = postData.id;
  return post;
}
function updateUserListingsInUI() {
  (0, _storage.getUserListings)(async posts => {
    try {
      if (!_coordinates.Coordinates.userLocation) {
        _coordinates.Coordinates.userLocation = await (0, _coordinates.getLocation)();
      }
    } finally {
      let userListingsParent = document.getElementById('my-listings-scroll');
      let userListingsElements = [];
      for (let i = 0; i < posts.length; i++) {
        userListingsElements.push(createHomePagePostElementFromPost(posts[i]));
      }
      userListingsParent.replaceChildren(...userListingsElements);
      const scrollable = document.getElementById('my-listings-scroll');
      updateScrollButtons(scrollable);
    }
  });
}
function updateAllListingsInUI() {
  (0, _storage.getAllListings)(async posts => {
    const userPosts = posts.filter(post => post.author == 'You');
    const featuredPosts = posts.filter(post => post.author != 'You');
    featuredPosts.sort((a, b) => b.timestamp - a.timestamp);
    for (let i = featuredPosts.length; i > 0; i--) {
      if (featuredPosts[i - 1].equalsToAbsolute(_post.errorPost)) {
        featuredPosts.splice(i - 1, 1);
        break;
      }
    }

    // TODO: refactor to avoid code duplication
    try {
      if (!_coordinates.Coordinates.userLocation) {
        _coordinates.Coordinates.userLocation = await (0, _coordinates.getLocation)();
      }
    } finally {
      let userListingsParent = document.getElementById('my-listings-scroll');
      let featuredListingsParent = document.getElementById('featured-posts-scroll');

      // 'My Listings'
      let userListingsElements = [];
      for (let i = 0; i < userPosts.length; i++) {
        userListingsElements.push(createHomePagePostElementFromPost(userPosts[i]));
      }

      // 'Featured Posts'
      let featuredListingsElements = [];
      for (let i = 0; i < featuredPosts.length; i++) {
        featuredListingsElements.push(createHomePagePostElementFromPost(featuredPosts[i]));
      }
      userListingsParent.replaceChildren(...userListingsElements);
      featuredListingsParent.replaceChildren(...featuredListingsElements);
      document.querySelectorAll('.horizontal-scroll').forEach(scrollable => {
        updateScrollButtons(scrollable);
      });
    }
  }, true);
}
function updateScrollButtons(scrollable) {
  const currentScroll = scrollable.scrollLeft;
  const scrollWidth = scrollable.scrollWidth - scrollable.clientWidth;
  const scrollID = scrollable.id;
  const rightButton = document.getElementById(scrollID.substring(0, scrollID.indexOf('-scroll')) + '-right-button');
  const leftButton = document.getElementById(scrollID.substring(0, scrollID.indexOf('-scroll')) + '-left-button');
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
  _storage.locationListeners.push(updateAllListingsInUI);
  document.addEventListener('DOMContentLoaded', () => {
    updatePostWrapperMargin();
    document.querySelectorAll('.horizontal-scroll').forEach(scrollable => {
      scrollable.addEventListener('scroll', () => {
        updateScrollButtons(scrollable);
      });
      updateScrollButtons(scrollable);
    });
    document.getElementById('my-listings-left-button').onclick = () => leftScroll('my-listings-scroll');
    document.getElementById('my-listings-right-button').onclick = () => rightScroll('my-listings-scroll');
    document.getElementById('featured-posts-left-button').onclick = () => leftScroll('featured-posts-scroll');
    document.getElementById('featured-posts-right-button').onclick = () => rightScroll('featured-posts-scroll');
    document.getElementById('categories-left-button').onclick = () => leftScroll('categories-scroll');
    document.getElementById('categories-right-button').onclick = () => rightScroll('categories-scroll');
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
    scrollWidth
  }) => scrollHeight > clientHeight || scrollWidth > clientWidth;
  const resizeText = ({
    element,
    parent
  }, maxSize = 44) => {
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
    mobileWrappers.forEach(mobileWrapper => {
      const categoryTexts = mobileWrapper.querySelectorAll('.category-text');
      categoryTexts.forEach(element => resizeText({
        element: element,
        parent: element.parentElement
      }));
    });
    const craigslistText = document.querySelector('.craigslist-text');
    resizeText({
      element: craigslistText,
      parent: craigslistText.parentElement
    }, 200);
    window.addEventListener('resize', () => document.querySelectorAll('.mobile').forEach(mobileWrapper => mobileWrapper.querySelectorAll('.category-text').forEach(element => resizeText({
      element: element,
      parent: element.parentElement
    }))));
    window.addEventListener('resize', () => resizeText({
      element: craigslistText,
      parent: craigslistText.parentElement
    }, 200));
  }
});

},{"./coordinates.js":17,"./post.js":21,"./storage.js":22}],19:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateUserName = generateUserName;
// names were generated using ChatGPT
var names = ['Abe', 'Bob', 'Carl', 'Dan', 'Ed', 'Fred', 'Gus', 'Hal', 'Ike', 'Jim', 'Kip', 'Luke', 'Mike', 'Ned', 'Ollie', 'Paul', 'Quinn', 'Rob', 'Stu', 'Tad', 'Ulysses', 'Vic', 'Walt', 'Xavier', 'Yank', 'Zeb', 'Alice', 'Betty', 'Cathy', 'Deb', 'Eve', 'Faythe', 'Gwen', 'Hattie', 'Ida', 'Jan', 'Kate', 'Liz', 'Molly', 'Nancy', 'Oprah', 'Peggy', 'Queenie', 'Ruth', 'Sue', 'Trixie', 'Uma', 'Vicky', 'Wendy', 'Xena', 'Yvonne', 'Zoe', 'Abner', 'Bert', 'Cecil', 'Duke', 'Earl', 'Frank', 'Gus', 'Hank', 'Ike', 'Jake', 'King', 'Lem', 'Moe', 'Ned', 'Ollie', 'Pete', 'Quinn', 'Ralph', 'Stan', 'Ted', 'Ulysses', 'Vic', 'Walt', 'Xavier', 'Yank', 'Zeb', 'Agnes', 'Belle', 'Cora', 'Daisy', 'Ella', 'Faythe', 'Gwen', 'Hattie', 'Ida', 'Jane', 'Kate', 'Liz', 'Molly', 'Nancy', 'Oprah', 'Peggy', 'Queenie', 'Ruth', 'Sue', 'Trixie', 'Uma', 'Vicky', 'Wendy', 'Xena', 'Yvonne', 'Zoe', 'Abner', 'Bert', 'Cecil', 'Duke', 'Earl', 'Frank', 'Gus', 'Hank', 'Jake', 'King', 'Emma', 'Liam', 'Noah', 'Olivia', 'William', 'Ava', 'James', 'Isabella', 'Oliver', 'Sophia', 'Benjamin', 'Charlotte', 'Elijah', 'Mia', 'Lucas', 'Amelia', 'Mason', 'Harper', 'Logan', 'Evelyn', 'Alexander', 'Abigail', 'Ethan', 'Emily', 'Jacob', 'Ella', 'Michael', 'Madison', 'Daniel', 'Scarlett', 'Henry', 'Victoria', 'Jackson', 'Avery', 'Sebastian', 'Grace', 'Aiden', 'Chloe', 'Caleb', 'Aria', 'Luke', 'Riley', 'Owen', 'Penelope', 'Gabriel', 'Zoe', 'Ezra', 'Lily', 'Levi', 'Ellie', 'Nicholas', 'Nora', 'Isaac', 'Lila', 'David', 'Stella', 'Wyatt', 'Audrey', 'Nathan', 'Hazel', 'Joseph', 'Bella', 'Matthew', 'Sofia', 'Samuel', 'Addison', 'Anthony', 'Luna', 'Isabelle', 'Mila', 'Lucy', 'Luna', 'Max', 'Violet', 'Jaxon', 'Camila', 'Lincoln', 'Makayla', 'Andrew', 'Elena', 'Adam', 'Leah', 'Dylan', 'Savannah', 'Christopher', 'Lillian', 'William', 'Natalie', 'Joshua', 'Aaliyah', 'Julian', 'Arianna', 'Evelyn', 'Sadie', 'Dominic', 'Eva', 'Luke', 'Peyton', 'Isabelle', 'Aubrey', 'Nevaeh', 'Alexa', 'Keira', 'Nolan', 'Clara', 'Aaron', 'Madelyn', 'Hunter', 'Samantha', 'Cameron', 'Layla', 'Christian', 'Rylee', 'Landon', 'Adalyn', 'Adrian', 'Aurora', 'Charles', 'Brooklyn', 'Elias', 'Raelynn', 'Caroline', 'Aaliyah', 'Eli', 'Aria', 'Connor', 'Aurora', 'Brody', 'Julia', 'Leila', 'Genesis', 'Henry', 'Bailey', 'Xavier', 'Nova', 'Ian', 'Valentina', 'Jace', 'Natalia', 'Gabriel', 'Emilia', 'Jayden', 'Alyssa', 'Leo', 'Maria', 'Miles', 'Brielle', 'Austin', 'Catherine', 'Eva', 'Sophie', 'Jordan', 'Gianna', 'Lila', 'Isabel', 'Jose', 'Vivian', 'Asher', 'Allison', 'Eleanor', 'Reagan', 'Gavin', 'Gabriella', 'Angel', 'Hannah', 'Brayden', 'Sara', 'Nicholas', 'Mya', 'Colton', 'Jasmine', 'Tyler', 'Hayden', 'Maxwell', 'Melanie', 'Marcus', 'Alexandra', 'Everett', 'Jocelyn', 'Grant', 'Brianna', 'Adam', 'Kinsley', 'Carson', 'Valeria', 'John', 'Adeline', 'Kaden', 'Hazel'];
function generateUserName() {
  const firstIndex = Math.floor(Math.random() * names.length);
  do {
    var secondIndex = Math.floor(Math.random() * names.length);
  } while (secondIndex === firstIndex);
  return names[firstIndex] + ' ' + names[secondIndex];
}

},{}],20:[function(require,module,exports){
"use strict";

var _console = require("console");
var _homePage = require("./home-page.js");
var _storage = require("./storage.js");
var _toast = require("./toast.js");
const urlLocations = {
  dubai: 'Dubai',
  'abu-dhabi': 'Abu Dhabi',
  sharjah: 'Sharjah',
  ajman: 'Ajman',
  fujairah: 'Fujairah',
  'umm-al+quwain': 'Umm Al Quwain',
  'ras-al+khaimah': 'Ras Al Khaimah'
};
const url = new URL(window.location);
let loc = url.searchParams.get('location');
if (loc == undefined || loc == null || loc == '' || !Object.keys(urlLocations).includes(loc)) {
  url.searchParams.set('location', 'dubai');
  window.history.replaceState({}, '', url);
  loc = 'dubai';
} else {
  loc = url.searchParams.get('location');
}
(0, _storage.setCurrentLocation)(urlLocations[loc]);
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
  searchBar.addEventListener('keydown', e => {
    if (e.code == 'Enter') {
      goToSearchPage();
    } else {
      searchBarMobile.value = searchBar.value + e.key;
    }
  });
  document.addEventListener('keyup', e => {
    const hadFocusBefore = document.activeElement == searchBar;
    if (!hadFocusBefore && e.code == 'Slash') {
      console.log('focusing');
      searchBar.focus();
    }
  });
  searchBarMobile.addEventListener('keydown', e => {
    if (e.code == 'Enter') {
      goToSearchPage();
    } else {
      searchBar.value = searchBarMobile.value + e.key;
    }
  });

  // Add Post
  const addPostButton = document.getElementById('add-post');
  addPostButton.addEventListener('click', () => {
    (0, _storage.addUserPost)(() => {
      console.log('running addpost oncomplete callback');
      const url = new URL(window.location);
      if (url.pathname.includes('index.html')) {
        console.log('is on homepage');
        (0, _homePage.updateUserListingsInUI)();
      }
      (0, _toast.showToast)('Added Post');
    });
  });
  const addPostButtonMobile = document.getElementById('add-post-mobile');
  addPostButtonMobile.addEventListener('click', () => {
    (0, _storage.addUserPost)(() => {
      console.log('running addpost oncomplete callback');
      const url = new URL(window.location);
      if (url.pathname.includes('index.html')) {
        console.log('is on homepage');
        (0, _homePage.updateUserListingsInUI)();
      }
      (0, _toast.showToast)('Added Post');
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
  options.forEach(option => {
    option.classList.remove('selected');
    if (option.innerText.split(',')[0] == urlLocations[loc]) {
      option.classList.add('selected');
    }
    option.addEventListener('click', () => {
      (0, _storage.changeLocation)(option.innerText);
      const newCity = option.innerText.split(',')[0].trim();
      city.innerText = newCity + ',';
      cityMobile.innerText = newCity + ',';
      const url = new URL(window.location);
      url.searchParams.set('location', newCity.toLowerCase().replace(' ', '-'));
      window.history.pushState({}, '', url);
      options.forEach(item => {
        item.classList.remove('selected');
        option.classList.add('selected');
        selected.classList.remove('location-selector-clicked');
      });
      optionsMobile.forEach(item => {
        item.classList.remove('selected');
        if (item.innerText == option.innerText) {
          item.classList.add('selected');
        }
        selectedMobile.classList.remove('location-selector-clicked');
      });
    });
  });
  city.innerText = urlLocations[loc] + ',';
  document.querySelectorAll('.undraggable').forEach(item => {
    item.setAttribute('draggable', false);
  });
  locationSelector.addEventListener('click', () => {
    locationSelector.classList.toggle('location-selector-clicked');
    menu.classList.toggle('menu-open');
  });

  // mobile location selector
  optionsMobile.forEach(option => {
    option.classList.remove('selected');
    if (option.innerText.split(',')[0] == urlLocations[loc]) {
      option.classList.add('selected');
    }
    option.addEventListener('click', () => {
      (0, _storage.changeLocation)(option.innerText);
      const newCity = option.innerText.split(',')[0].trim();
      cityMobile.innerText = newCity + ',';
      city.innerText = newCity + ',';
      const url = new URL(window.location);
      url.searchParams.set('location', newCity.toLowerCase().replace(' ', '-'));
      window.history.pushState({}, '', url);
      optionsMobile.forEach(item => {
        item.classList.remove('selected');
        option.classList.add('selected');
        selectedMobile.classList.remove('location-selector-clicked');
      });
      options.forEach(item => {
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

},{"./home-page.js":18,"./storage.js":22,"./toast.js":23,"console":31}],21:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.errorPost = exports.Post = void 0;
var _coordinates = require("./coordinates.js");
class Post {
  constructor(id, title, description, timestamp, price, category, properties, location, imgSrc, author, query = '') {
    this.id = id;
    this.title = title;
    this.description = description;
    this.timestamp = timestamp;
    this.price = price;
    this.category = category;
    this.properties = properties;
    this.location = location;
    this.imgSrc = imgSrc;
    this.author = author;
    this.query = query;
  }
  static fromObject(obj) {
    return new Post(obj.id, obj.title, obj.description, obj.timestamp, obj.price, obj.category, obj.properties, obj.location, obj.imgSrc, obj.author, obj.query);
  }
  static fromJSON(json) {
    return Post.fromObject(JSON.parse(json));
  }
  static equals(post1, post2) {
    return post1.id === post2.id;
  }
  static equalsAbsolute(post1, post2) {
    // https://flexiple.com/javascript/javascript-array-equality/
    function arrayEquals(a, b) {
      return Array.isArray(a) && Array.isArray(b) && a.length === b.length && a.every((val, index) => val === b[index]);
    }
    return post1.id == post2.id && post1.title == post2.title && post1.description == post2.description && post1.timestamp == post2.timestamp && post1.price == post2.price && post1.category == post2.category && post1.properties == post2.properties && post1.location.latitude == post2.location.latitude && post1.location.longitude == post2.location.longitude && arrayEquals(post1.imgSrc, post2.imgSrc) && arrayEquals(post1.properties, post2.properties) && post1.author == post2.author && post1.query == post2.query;
  }
  toObject() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      timestamp: this.timestamp,
      price: this.price,
      category: this.category,
      properties: this.properties,
      location: this.location,
      imgSrc: this.imgSrc,
      author: this.author,
      query: this.query
    };
  }
  toJSON() {
    return JSON.stringify(this);
  }
  equalsTo(post) {
    return Post.equals(this, post);
  }
  equalsToAbsolute(post) {
    return Post.equalsAbsolute(this, post);
  }
}
exports.Post = Post;
const errorPost = new Post(0, 'Error: Post not found', 'Post not found', 0, 0, 'error', 'error: error', new _coordinates.Coordinates(0, 0).toObject(), ['assets/images/error.png'], 'error', null);
exports.errorPost = errorPost;

},{"./coordinates.js":17}],22:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addUserPost = addUserPost;
exports.changeLocation = changeLocation;
exports.getAllListings = getAllListings;
exports.getCurrentLocation = getCurrentLocation;
exports.getPost = getPost;
exports.getUserListings = getUserListings;
exports.locationListeners = void 0;
exports.search = search;
exports.setCurrentLocation = setCurrentLocation;
var _post = require("./post.js");
var _coordinates = require("./coordinates.js");
var _loremIpsum = require("lorem-ipsum");
var _name = require("./name.js");
// TODO: refactor storage code to use async/await instead of callbacks

const LOCATIONS = {
  Dubai: [[new _coordinates.Coordinates(25.242, 55.265), new _coordinates.Coordinates(25.09, 55.277)], [new _coordinates.Coordinates(25.052, 55.083), new _coordinates.Coordinates(25.029, 55.249)]],
  'Abu Dhabi': [[new _coordinates.Coordinates(24.5331584, 54.2911381), new _coordinates.Coordinates(24.2569141, 54.7468883)]],
  Sharjah: [[new _coordinates.Coordinates(25.436686, 55.5943483), new _coordinates.Coordinates(25.2035094, 55.7350787)], [new _coordinates.Coordinates(25.3710612, 55.3800216), new _coordinates.Coordinates(25.2786538, 55.5936607)]],
  Ajman: [[new _coordinates.Coordinates(25.447991, 55.4266038), new _coordinates.Coordinates(25.3707634, 55.5937516)]],
  'Umm Al Quwain': [[new _coordinates.Coordinates(25.6104851, 55.5215468), new _coordinates.Coordinates(25.4897926, 55.5987958)]],
  'Ras Al Khaimah': [[new _coordinates.Coordinates(25.8852487, 55.8768338), new _coordinates.Coordinates(25.5499713, 56.0599856)]],
  Fujairah: [[new _coordinates.Coordinates(25.186068, 56.2880822), new _coordinates.Coordinates(25.1008202, 56.3587572)]]
};
const CATEGORIES = ['For Sale', 'Services', 'Jobs', 'Housing', 'Community', 'Gigs', 'Discussion Forums', 'Resumes'];
const randomCategory = () => CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
var currentLocation = 'Dubai';
function getCurrentLocation() {
  return currentLocation;
}
function setCurrentLocation(location) {
  currentLocation = location;
}
const DATABASE_VERSION = 1;
const USER_LISTINGS_MIN_COUNT = 3;
const USER_LISTINGS_MAX_COUNT = 17;
const INITIAL_LISTINGS_MIN_COUNT = 7;
const INITIAL_LISTINGS_MAX_COUNT = 17;
const LOCAL = 'You';
navigator.geolocation.getCurrentPosition(() => {});
var locationListeners = [];
exports.locationListeners = locationListeners;
function changeLocation(location) {
  currentLocation = location.split(',')[0];
  locationListeners.forEach(listener => listener(currentLocation));
}

/**
 * Generate a random integer between two integers
 * @param {*} min inclusive
 * @param {*} max exclusive
 * @returns
 */
function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
function* generateId(startingId = 0) {
  let id = startingId;
  while (true) {
    yield id++;
  }
}

// TODO: move method out of storage and into post.js
function generateRandomPost(isLocalUser, location, postIdGenerator, imageIdGenerator, query, category) {
  function generateRandomTimeBiased() {
    // function used to bias
    const func = x => Math.log(x + 1) / Math.log(2);
    let rand = Math.random();
    if (rand < func(0.14)) {
      return generateRandomNumber(0, 1000 * 60 * 60 * 5);
    } else if (rand < func(0.25)) {
      return generateRandomNumber(1000 * 60 * 60 * 5, 1000 * 60 * 60 * 24);
    } else if (rand < func(0.5)) {
      return generateRandomNumber(1000 * 60 * 60 * 24, 1000 * 60 * 60 * 24 * 3);
    } else if (rand < func(0.75)) {
      return generateRandomNumber(1000 * 60 * 60 * 24 * 3, 1000 * 60 * 60 * 24 * 7);
    } else {
      return generateRandomNumber(1000 * 60 * 60 * 24 * 7, 1000 * 60 * 60 * 24 * 30);
    }
  }
  function generateRandomLocation() {
    const locationAreas = LOCATIONS[location];
    const chosenArea = locationAreas[generateRandomNumber(0, locationAreas.length)];
    const minLatitude = Math.min(chosenArea[0].latitude, chosenArea[1].latitude);
    const maxLatitude = Math.max(chosenArea[0].latitude, chosenArea[1].latitude);
    const minLongitude = Math.min(chosenArea[0].longitude, chosenArea[1].longitude);
    const maxLongitude = Math.max(chosenArea[0].longitude, chosenArea[1].longitude);
    return new _coordinates.Coordinates(Math.random() * (maxLatitude - minLatitude) + minLatitude, Math.random() * (maxLongitude - minLongitude) + minLongitude);
  }
  let images = [];
  for (let i = 0; i < generateRandomNumber(1, 8); i++) {
    images.push(`https://picsum.photos/900/570?random=${imageIdGenerator.next().value}`);
  }

  // https://www.npmjs.com/package/lorem-ipsum
  const lorem = new _loremIpsum.LoremIpsum({
    wordsPerSentence: {
      min: 3,
      max: 7
    },
    sentencesPerParagraph: {
      min: 5,
      max: 20
    }
  });
  const properties = [];
  const propertyCount = generateRandomNumber(3, 15);
  for (let i = 0; i < propertyCount; i++) {
    properties.push(`${lorem.generateWords(1)}:${lorem.generateWords(1)}`);
  }
  return new _post.Post(postIdGenerator.next().value, lorem.generateSentences(1).replace('.', ''), lorem.generateParagraphs(1), Date.now() - generateRandomTimeBiased(), generateRandomNumber(400, 900000).toPrecision(3), category ?? randomCategory(), properties, generateRandomLocation().toObject(), images, isLocalUser == true ? LOCAL : (0, _name.generateUserName)(), query).toObject();
}
function createListingsStore(db, location) {
  let listingsStore;
  if (!db.objectStoreNames.contains(location)) {
    console.log('creating listings store');
    listingsStore = db.createObjectStore(location, {
      keyPath: 'id'
    });
  } else {
    listingsStore = db.transaction(location, 'readwrite').objectStore(location);
  }

  // create timestamp index
  if (!listingsStore.indexNames.contains('timestamp')) {
    listingsStore.createIndex('timestamp', 'timestamp', {
      unique: false
    });
  }
  // create price index
  if (!listingsStore.indexNames.contains('price')) {
    listingsStore.createIndex('price', 'price', {
      unique: false
    });
  }
  //create title index
  if (!listingsStore.indexNames.contains('title')) {
    listingsStore.createIndex('title', 'title', {
      unique: false
    });
  }
  // create description index
  if (!listingsStore.indexNames.contains('description')) {
    listingsStore.createIndex('description', 'description', {
      unique: false
    });
  }
  // create location index
  if (!listingsStore.indexNames.contains('location')) {
    listingsStore.createIndex('location', 'location', {
      unique: false
    });
  }
  //create category index
  if (!listingsStore.indexNames.contains('category')) {
    listingsStore.createIndex('category', 'category', {
      unique: false
    });
  }
  // create author index
  if (!listingsStore.indexNames.contains('author')) {
    listingsStore.createIndex('author', 'author', {
      unique: false
    });
  }
  // create query index
  if (!listingsStore.indexNames.contains('query')) {
    listingsStore.createIndex('query', 'query', {
      unique: false
    });
  }

  // create query, category index
  if (!listingsStore.indexNames.contains('query,category')) {
    listingsStore.createIndex('query,category', ['query', 'category'], {
      unique: false
    });
  }
}
function createListingsData(db, oncomplete) {
  return new Promise(async (resolve, reject) => {
    console.log('creating listings data');

    // * User Listings
    // create user listings store
    let listings = db.transaction(currentLocation, 'readwrite').objectStore(currentLocation);

    // create error post
    function addErrorPost() {
      return new Promise((resolve, reject) => {
        let putRequest = listings.put(_post.errorPost.toObject());
        putRequest.onsuccess = resolve;
        putRequest.onerror = reject;
      });
    }
    await addErrorPost();

    // create listings if they don't exist

    //get user listings count
    function getUserListingsCount() {
      return new Promise(resolve => {
        const countRequest = listings.index('author').count('You');
        countRequest.onsuccess = event => {
          console.log(`number of user listings: ${countRequest.result}`);
          resolve(countRequest.result);
        };
      });
    }
    let numOfUserListings = await getUserListingsCount();
    function addRandomListing(isLocalUser, idGenerator, imageIdGenerator) {
      return new Promise((resolve, reject) => {
        let putRequest = listings.put(generateRandomPost(isLocalUser, currentLocation, idGenerator, imageIdGenerator, isLocalUser ? null : ''));
        putRequest.onsuccess = resolve;
        putRequest.onerror = reject;
      });
    }
    if (numOfUserListings < USER_LISTINGS_MIN_COUNT) {
      const randomNumber = generateRandomNumber(USER_LISTINGS_MIN_COUNT, USER_LISTINGS_MAX_COUNT);
      const [postID, imageID] = await getLatestIds(listings);
      const idGenerator = generateId(postID + 1);
      const imageIdGenerator = generateId(imageID == 0 ? generateRandomNumber(0, 150) : imageID + 1);
      for (let i = 0; i < randomNumber; i++) {
        await addRandomListing(true, idGenerator, imageIdGenerator);
      }
    }

    // * Listings
    //get user listings count
    function getListingsCount() {
      return new Promise(resolve => {
        const countRequest = listings.count();
        countRequest.onsuccess = event => {
          console.log(`number of user listings: ${countRequest.result}`);
          resolve(countRequest.result);
        };
      });
    }
    const numOfListings = (await getListingsCount()) - (await getUserListingsCount());
    if (numOfListings < INITIAL_LISTINGS_MIN_COUNT) {
      const randomNumber = generateRandomNumber(INITIAL_LISTINGS_MIN_COUNT, INITIAL_LISTINGS_MAX_COUNT);
      const [postID, imageID] = await getLatestIds(listings);
      const idGenerator = generateId(postID + 1);
      const imageIdGenerator = generateId(imageID == 0 ? generateRandomNumber(0, 150) : imageID + 1);
      // const idGenerator = generateId(0);
      // const imageIdGenerator = generateId(0);

      for (let i = 0; i < randomNumber; i++) {
        await addRandomListing(false, idGenerator, imageIdGenerator);
      }
    }
    if (oncomplete) {
      oncomplete();
    }
  });
}
function getUserListings(oncomplete) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('Listings', DATABASE_VERSION);
    request.onerror = event => {
      console.error('Error accessing database', event.target.errorCode, event.target.error);
    };
    request.onupgradeneeded = async () => {
      console.log('running onupgradeneeded');
      for (const [key, value] of Object.entries(LOCATIONS)) {
        createListingsStore(request.result, key);
      }
    };
    request.onsuccess = event => {
      console.log('running onsuccess');
      const db = request.result;
      db.onerror = event => {
        console.error('Database error: ', event.target.errorCode);
      };
      const transaction = db.transaction(currentLocation, 'readonly');
      const store = transaction.objectStore(currentLocation);
      const index = store.index('author');
      const range = IDBKeyRange.only('You');
      const indexRequest = index.getAll(range);
      indexRequest.onsuccess = event => {
        if (oncomplete) {
          oncomplete(indexRequest.result);
        }
        resolve(indexRequest.result);
      };
    };
  });
}
async function getAllListings(oncomplete, isLocalUser) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('Listings', DATABASE_VERSION);
    request.onerror = event => {
      console.error('Error accessing database', event.target.errorCode, event.target.error);
    };
    request.onupgradeneeded = async () => {
      console.log('running onupgradeneeded');
      for (const [key, value] of Object.entries(LOCATIONS)) {
        createListingsStore(request.result, key);
      }
    };
    request.onsuccess = event => {
      console.log('running onsuccess');
      const db = request.result;
      db.onerror = event => {
        console.error('Database error: ', event.target.errorCode);
      };
      const transaction = db.transaction(currentLocation, 'readonly');
      const store = transaction.objectStore(currentLocation);
      const index = store.index('author');
      const userListingsCountRequest = index.count('You');
      userListingsCountRequest.onsuccess = () => {
        const allListingsCountRequest = store.count();
        allListingsCountRequest.onsuccess = () => {
          const nonUserListingsCount = allListingsCountRequest.result - userListingsCountRequest.result;
          if (nonUserListingsCount < INITIAL_LISTINGS_MIN_COUNT || userListingsCountRequest.result < USER_LISTINGS_MIN_COUNT) {
            createListingsData(db, () => getAllListings(oncomplete));
          } else {
            // TODO: low priority: use cursor to get posts within the MAX values in case database gets too big
            const listingsRequest = store.getAll();
            listingsRequest.onsuccess = () => {
              const posts = listingsRequest.result.map(obj => _post.Post.fromObject(obj));
              if (oncomplete) {
                oncomplete(posts);
              }
              resolve();
            };
          }
        };
      };
    };
  });
}
function getLatestIds(store) {
  return new Promise(async (resolve, reject) => {
    function getAllPostKeys(store) {
      return new Promise(resolve => {
        const request = store.getAllKeys();
        request.onsuccess = event => {
          resolve(request.result);
        };
      });
    }
    function afterGetAllPostKeys(keys, store) {
      if (keys.length == 0) {
        resolve([-1, -1]);
        return;
      } else {
        keys.sort((a, b) => b.id - a.id);
        const highestId = keys[keys.length - 1];
        const highestIdRequest = store.get(highestId);
        highestIdRequest.onsuccess = () => {
          let highestIdImages = highestIdRequest.result.imgSrc;
          const lastPictureUrl = highestIdImages[highestIdImages.length - 1];
          let lastPictureRandomId = parseInt(lastPictureUrl.substring(lastPictureUrl.indexOf('random=') + 'random='.length, lastPictureUrl.length));
          if (Number.isNaN(lastPictureRandomId)) {
            lastPictureRandomId = 0;
          }
          console.log('highestId', highestId, 'lastPictureRandomId', lastPictureRandomId);
          resolve([highestId, lastPictureRandomId]);
        };
      }
    }
    if (store == undefined || store == null) {
      const request = indexedDB.open('Listings', DATABASE_VERSION);
      request.onerror = event => {
        console.error('Error accessing database', event.target.errorCode, event.target.error);
      };
      request.onupgradeneeded = async () => {
        console.log('running onupgradeneeded');
        for (const [key, value] of Object.entries(LOCATIONS)) {
          createListingsStore(request.result, key);
        }
      };
      request.onsuccess = async event => {
        console.log('running onsuccess');
        const db = request.result;
        db.onerror = event => {
          console.error('Database error: ', event.target.errorCode);
        };
        const transaction = db.transaction(currentLocation, 'readwrite');
        const store = transaction.objectStore(currentLocation);
        getAllPostKeys(store).then(keys => {
          afterGetAllPostKeys(keys, store);
        });
      };
    } else {
      getAllPostKeys(store).then(keys => {
        afterGetAllPostKeys(keys, store);
      });
    }
  });
}
function addUserPost(oncomplete) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('Listings', DATABASE_VERSION);
    request.onerror = event => {
      console.error('Error accessing database', event.target.errorCode, event.target.error);
    };
    request.onupgradeneeded = async () => {
      console.log('running onupgradeneeded');
      for (const [key, value] of Object.entries(LOCATIONS)) {
        createListingsStore(request.result, key);
      }
    };
    request.onsuccess = async event => {
      const db = request.result;
      const store = db.transaction(currentLocation, 'readwrite').objectStore(currentLocation);
      const [highestId, lastPictureRandomId] = await getLatestIds(store);
      let idGenerator = generateId(parseInt(highestId) + 1);
      let imageIdGenerator = generateId(parseInt(lastPictureRandomId) + 1);
      const post = generateRandomPost(true, currentLocation, idGenerator, imageIdGenerator, null);
      const putRequest = store.put(post);
      putRequest.onsuccess = () => {
        if (oncomplete) {
          oncomplete(post);
        }
        resolve();
      };
    };
  });
}
function search(query, category) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('Listings', DATABASE_VERSION);
    request.onerror = event => {
      console.error('Error accessing database', event.target.errorCode, event.target.error);
    };
    request.onupgradeneeded = async () => {
      console.log('running onupgradeneeded');
      for (const [key, value] of Object.entries(LOCATIONS)) {
        createListingsStore(request.result, key);
      }
    };
    request.onsuccess = async event => {
      const db = request.result;
      const store = db.transaction(currentLocation, 'readwrite').objectStore(currentLocation);
      function searchForQuery() {
        return new Promise(resolve => {
          let index;
          let keyRange;
          // TODO: replace with a single index containing all filters and using a lowerbound keyrange with '' for no filter
          if (category.includes('All')) {
            index = store.index('query');
            if (query == '') {
              keyRange = IDBKeyRange.lowerBound('');
            } else {
              keyRange = IDBKeyRange.only(query);
            }
          } else if (query == '') {
            index = store.index('category');
            keyRange = IDBKeyRange.only(category);
          } else {
            index = store.index('query,category');
            keyRange = IDBKeyRange.only([query, category]);
          }
          const queryRequest = index.getAll(keyRange);
          queryRequest.onsuccess = () => {
            console.log('search done', queryRequest.result);
            resolve(queryRequest.result.map(obj => _post.Post.fromObject(obj)).filter(post => post.author != 'You'));
          };
        });
      }
      function createPostsForQuery() {
        return new Promise(async resolve => {
          console.log('creating posts for query');
          const [highestId, lastPictureRandomId] = await getLatestIds(store);
          console.log('highest id', highestId, 'last pic id', lastPictureRandomId);
          let idGenerator = generateId(parseInt(highestId) + 1);
          let imageIdGenerator = generateId(parseInt(lastPictureRandomId) + 1);
          const random = Math.random();
          console.log('random', random);
          if (random > 0.15) {
            function addPost(post) {
              return new Promise(resolve => {
                const putRequest = store.put(post);
                putRequest.onsuccess = () => {
                  resolve();
                };
              });
            }
            const numToGenerate = Math.floor(Math.random() * 30) + 1;
            const posts = [];
            console.log('num to generate', numToGenerate);
            for (let i = 0; i < numToGenerate; i++) {
              const post = generateRandomPost(false, currentLocation, idGenerator, imageIdGenerator, query);
              await addPost(post);
              posts.push(post);
            }
            console.log('done adding posts,  posts:', posts);
            resolve(posts);
          } else {
            resolve([]);
          }
        });
      }
      let posts = await searchForQuery();
      if (posts.length == 0) {
        posts = await createPostsForQuery();
      }
      // TODO: test the code below and uncomment if it works
      // } else {
      //     const generateNewPostsAnywayRand = Math.random();
      //     if (generateNewPostsAnywayRand > 0.5) {
      //         const newPosts = await createPostsForQuery();
      //         posts = posts.concat(newPosts);
      //     }
      // }
      resolve(posts);
    };
  });
}
function getPost(id) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('Listings', DATABASE_VERSION);
    request.onerror = event => {
      console.error('Error accessing database', event.target.errorCode, event.target.error);
    };
    request.onupgradeneeded = async () => {
      console.log('running onupgradeneeded');
      for (const [key, value] of Object.entries(LOCATIONS)) {
        createListingsStore(request.result, key);
      }
    };
    request.onsuccess = async event => {
      const db = request.result;
      const store = db.transaction(currentLocation, 'readwrite').objectStore(currentLocation);
      const getRequest = store.get(parseInt(id));
      getRequest.onsuccess = async () => {
        if (getRequest.result) {
          resolve(_post.Post.fromObject(getRequest.result));
        } else {
          resolve(await getPost(0));
        }
      };
    };
  });
}

},{"./coordinates.js":17,"./name.js":19,"./post.js":21,"lorem-ipsum":7}],23:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.showToast = showToast;
function showToast(message) {
  let toast = document.getElementById('toast');
  toast.innerText = message;
  toast.classList.add('show-toast');
  setTimeout(() => {
    toast.classList.remove('show-toast');
  }, 3500);
}

},{}],24:[function(require,module,exports){
(function (global){(function (){
'use strict';

var objectAssign = require('object-assign');

// compare and isBuffer taken from https://github.com/feross/buffer/blob/680e9e5e488f22aac27599a57dc844a6315928dd/index.js
// original notice:

/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
function compare(a, b) {
  if (a === b) {
    return 0;
  }

  var x = a.length;
  var y = b.length;

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i];
      y = b[i];
      break;
    }
  }

  if (x < y) {
    return -1;
  }
  if (y < x) {
    return 1;
  }
  return 0;
}
function isBuffer(b) {
  if (global.Buffer && typeof global.Buffer.isBuffer === 'function') {
    return global.Buffer.isBuffer(b);
  }
  return !!(b != null && b._isBuffer);
}

// based on node assert, original notice:
// NB: The URL to the CommonJS spec is kept just for tradition.
//     node-assert has evolved a lot since then, both in API and behavior.

// http://wiki.commonjs.org/wiki/Unit_Testing/1.0
//
// THIS IS NOT TESTED NOR LIKELY TO WORK OUTSIDE V8!
//
// Originally from narwhal.js (http://narwhaljs.org)
// Copyright (c) 2009 Thomas Robinson <280north.com>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the 'Software'), to
// deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
// sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
// ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

var util = require('util/');
var hasOwn = Object.prototype.hasOwnProperty;
var pSlice = Array.prototype.slice;
var functionsHaveNames = (function () {
  return function foo() {}.name === 'foo';
}());
function pToString (obj) {
  return Object.prototype.toString.call(obj);
}
function isView(arrbuf) {
  if (isBuffer(arrbuf)) {
    return false;
  }
  if (typeof global.ArrayBuffer !== 'function') {
    return false;
  }
  if (typeof ArrayBuffer.isView === 'function') {
    return ArrayBuffer.isView(arrbuf);
  }
  if (!arrbuf) {
    return false;
  }
  if (arrbuf instanceof DataView) {
    return true;
  }
  if (arrbuf.buffer && arrbuf.buffer instanceof ArrayBuffer) {
    return true;
  }
  return false;
}
// 1. The assert module provides functions that throw
// AssertionError's when particular conditions are not met. The
// assert module must conform to the following interface.

var assert = module.exports = ok;

// 2. The AssertionError is defined in assert.
// new assert.AssertionError({ message: message,
//                             actual: actual,
//                             expected: expected })

var regex = /\s*function\s+([^\(\s]*)\s*/;
// based on https://github.com/ljharb/function.prototype.name/blob/adeeeec8bfcc6068b187d7d9fb3d5bb1d3a30899/implementation.js
function getName(func) {
  if (!util.isFunction(func)) {
    return;
  }
  if (functionsHaveNames) {
    return func.name;
  }
  var str = func.toString();
  var match = str.match(regex);
  return match && match[1];
}
assert.AssertionError = function AssertionError(options) {
  this.name = 'AssertionError';
  this.actual = options.actual;
  this.expected = options.expected;
  this.operator = options.operator;
  if (options.message) {
    this.message = options.message;
    this.generatedMessage = false;
  } else {
    this.message = getMessage(this);
    this.generatedMessage = true;
  }
  var stackStartFunction = options.stackStartFunction || fail;
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, stackStartFunction);
  } else {
    // non v8 browsers so we can have a stacktrace
    var err = new Error();
    if (err.stack) {
      var out = err.stack;

      // try to strip useless frames
      var fn_name = getName(stackStartFunction);
      var idx = out.indexOf('\n' + fn_name);
      if (idx >= 0) {
        // once we have located the function frame
        // we need to strip out everything before it (and its line)
        var next_line = out.indexOf('\n', idx + 1);
        out = out.substring(next_line + 1);
      }

      this.stack = out;
    }
  }
};

// assert.AssertionError instanceof Error
util.inherits(assert.AssertionError, Error);

function truncate(s, n) {
  if (typeof s === 'string') {
    return s.length < n ? s : s.slice(0, n);
  } else {
    return s;
  }
}
function inspect(something) {
  if (functionsHaveNames || !util.isFunction(something)) {
    return util.inspect(something);
  }
  var rawname = getName(something);
  var name = rawname ? ': ' + rawname : '';
  return '[Function' +  name + ']';
}
function getMessage(self) {
  return truncate(inspect(self.actual), 128) + ' ' +
         self.operator + ' ' +
         truncate(inspect(self.expected), 128);
}

// At present only the three keys mentioned above are used and
// understood by the spec. Implementations or sub modules can pass
// other keys to the AssertionError's constructor - they will be
// ignored.

// 3. All of the following functions must throw an AssertionError
// when a corresponding condition is not met, with a message that
// may be undefined if not provided.  All assertion methods provide
// both the actual and expected values to the assertion error for
// display purposes.

function fail(actual, expected, message, operator, stackStartFunction) {
  throw new assert.AssertionError({
    message: message,
    actual: actual,
    expected: expected,
    operator: operator,
    stackStartFunction: stackStartFunction
  });
}

// EXTENSION! allows for well behaved errors defined elsewhere.
assert.fail = fail;

// 4. Pure assertion tests whether a value is truthy, as determined
// by !!guard.
// assert.ok(guard, message_opt);
// This statement is equivalent to assert.equal(true, !!guard,
// message_opt);. To test strictly for the value true, use
// assert.strictEqual(true, guard, message_opt);.

function ok(value, message) {
  if (!value) fail(value, true, message, '==', assert.ok);
}
assert.ok = ok;

// 5. The equality assertion tests shallow, coercive equality with
// ==.
// assert.equal(actual, expected, message_opt);

assert.equal = function equal(actual, expected, message) {
  if (actual != expected) fail(actual, expected, message, '==', assert.equal);
};

// 6. The non-equality assertion tests for whether two objects are not equal
// with != assert.notEqual(actual, expected, message_opt);

assert.notEqual = function notEqual(actual, expected, message) {
  if (actual == expected) {
    fail(actual, expected, message, '!=', assert.notEqual);
  }
};

// 7. The equivalence assertion tests a deep equality relation.
// assert.deepEqual(actual, expected, message_opt);

assert.deepEqual = function deepEqual(actual, expected, message) {
  if (!_deepEqual(actual, expected, false)) {
    fail(actual, expected, message, 'deepEqual', assert.deepEqual);
  }
};

assert.deepStrictEqual = function deepStrictEqual(actual, expected, message) {
  if (!_deepEqual(actual, expected, true)) {
    fail(actual, expected, message, 'deepStrictEqual', assert.deepStrictEqual);
  }
};

function _deepEqual(actual, expected, strict, memos) {
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;
  } else if (isBuffer(actual) && isBuffer(expected)) {
    return compare(actual, expected) === 0;

  // 7.2. If the expected value is a Date object, the actual value is
  // equivalent if it is also a Date object that refers to the same time.
  } else if (util.isDate(actual) && util.isDate(expected)) {
    return actual.getTime() === expected.getTime();

  // 7.3 If the expected value is a RegExp object, the actual value is
  // equivalent if it is also a RegExp object with the same source and
  // properties (`global`, `multiline`, `lastIndex`, `ignoreCase`).
  } else if (util.isRegExp(actual) && util.isRegExp(expected)) {
    return actual.source === expected.source &&
           actual.global === expected.global &&
           actual.multiline === expected.multiline &&
           actual.lastIndex === expected.lastIndex &&
           actual.ignoreCase === expected.ignoreCase;

  // 7.4. Other pairs that do not both pass typeof value == 'object',
  // equivalence is determined by ==.
  } else if ((actual === null || typeof actual !== 'object') &&
             (expected === null || typeof expected !== 'object')) {
    return strict ? actual === expected : actual == expected;

  // If both values are instances of typed arrays, wrap their underlying
  // ArrayBuffers in a Buffer each to increase performance
  // This optimization requires the arrays to have the same type as checked by
  // Object.prototype.toString (aka pToString). Never perform binary
  // comparisons for Float*Arrays, though, since e.g. +0 === -0 but their
  // bit patterns are not identical.
  } else if (isView(actual) && isView(expected) &&
             pToString(actual) === pToString(expected) &&
             !(actual instanceof Float32Array ||
               actual instanceof Float64Array)) {
    return compare(new Uint8Array(actual.buffer),
                   new Uint8Array(expected.buffer)) === 0;

  // 7.5 For all other Object pairs, including Array objects, equivalence is
  // determined by having the same number of owned properties (as verified
  // with Object.prototype.hasOwnProperty.call), the same set of keys
  // (although not necessarily the same order), equivalent values for every
  // corresponding key, and an identical 'prototype' property. Note: this
  // accounts for both named and indexed properties on Arrays.
  } else if (isBuffer(actual) !== isBuffer(expected)) {
    return false;
  } else {
    memos = memos || {actual: [], expected: []};

    var actualIndex = memos.actual.indexOf(actual);
    if (actualIndex !== -1) {
      if (actualIndex === memos.expected.indexOf(expected)) {
        return true;
      }
    }

    memos.actual.push(actual);
    memos.expected.push(expected);

    return objEquiv(actual, expected, strict, memos);
  }
}

function isArguments(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
}

function objEquiv(a, b, strict, actualVisitedObjects) {
  if (a === null || a === undefined || b === null || b === undefined)
    return false;
  // if one is a primitive, the other must be same
  if (util.isPrimitive(a) || util.isPrimitive(b))
    return a === b;
  if (strict && Object.getPrototypeOf(a) !== Object.getPrototypeOf(b))
    return false;
  var aIsArgs = isArguments(a);
  var bIsArgs = isArguments(b);
  if ((aIsArgs && !bIsArgs) || (!aIsArgs && bIsArgs))
    return false;
  if (aIsArgs) {
    a = pSlice.call(a);
    b = pSlice.call(b);
    return _deepEqual(a, b, strict);
  }
  var ka = objectKeys(a);
  var kb = objectKeys(b);
  var key, i;
  // having the same number of owned properties (keys incorporates
  // hasOwnProperty)
  if (ka.length !== kb.length)
    return false;
  //the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  //~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] !== kb[i])
      return false;
  }
  //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!_deepEqual(a[key], b[key], strict, actualVisitedObjects))
      return false;
  }
  return true;
}

// 8. The non-equivalence assertion tests for any deep inequality.
// assert.notDeepEqual(actual, expected, message_opt);

assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
  if (_deepEqual(actual, expected, false)) {
    fail(actual, expected, message, 'notDeepEqual', assert.notDeepEqual);
  }
};

assert.notDeepStrictEqual = notDeepStrictEqual;
function notDeepStrictEqual(actual, expected, message) {
  if (_deepEqual(actual, expected, true)) {
    fail(actual, expected, message, 'notDeepStrictEqual', notDeepStrictEqual);
  }
}


// 9. The strict equality assertion tests strict equality, as determined by ===.
// assert.strictEqual(actual, expected, message_opt);

assert.strictEqual = function strictEqual(actual, expected, message) {
  if (actual !== expected) {
    fail(actual, expected, message, '===', assert.strictEqual);
  }
};

// 10. The strict non-equality assertion tests for strict inequality, as
// determined by !==.  assert.notStrictEqual(actual, expected, message_opt);

assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
  if (actual === expected) {
    fail(actual, expected, message, '!==', assert.notStrictEqual);
  }
};

function expectedException(actual, expected) {
  if (!actual || !expected) {
    return false;
  }

  if (Object.prototype.toString.call(expected) == '[object RegExp]') {
    return expected.test(actual);
  }

  try {
    if (actual instanceof expected) {
      return true;
    }
  } catch (e) {
    // Ignore.  The instanceof check doesn't work for arrow functions.
  }

  if (Error.isPrototypeOf(expected)) {
    return false;
  }

  return expected.call({}, actual) === true;
}

function _tryBlock(block) {
  var error;
  try {
    block();
  } catch (e) {
    error = e;
  }
  return error;
}

function _throws(shouldThrow, block, expected, message) {
  var actual;

  if (typeof block !== 'function') {
    throw new TypeError('"block" argument must be a function');
  }

  if (typeof expected === 'string') {
    message = expected;
    expected = null;
  }

  actual = _tryBlock(block);

  message = (expected && expected.name ? ' (' + expected.name + ').' : '.') +
            (message ? ' ' + message : '.');

  if (shouldThrow && !actual) {
    fail(actual, expected, 'Missing expected exception' + message);
  }

  var userProvidedMessage = typeof message === 'string';
  var isUnwantedException = !shouldThrow && util.isError(actual);
  var isUnexpectedException = !shouldThrow && actual && !expected;

  if ((isUnwantedException &&
      userProvidedMessage &&
      expectedException(actual, expected)) ||
      isUnexpectedException) {
    fail(actual, expected, 'Got unwanted exception' + message);
  }

  if ((shouldThrow && actual && expected &&
      !expectedException(actual, expected)) || (!shouldThrow && actual)) {
    throw actual;
  }
}

// 11. Expected to throw an error:
// assert.throws(block, Error_opt, message_opt);

assert.throws = function(block, /*optional*/error, /*optional*/message) {
  _throws(true, block, error, message);
};

// EXTENSION! This is annoying to write outside this module.
assert.doesNotThrow = function(block, /*optional*/error, /*optional*/message) {
  _throws(false, block, error, message);
};

assert.ifError = function(err) { if (err) throw err; };

// Expose a strict only variant of assert
function strict(value, message) {
  if (!value) fail(value, true, message, '==', strict);
}
assert.strict = objectAssign(strict, assert, {
  equal: assert.strictEqual,
  deepEqual: assert.deepStrictEqual,
  notEqual: assert.notStrictEqual,
  notDeepEqual: assert.notDeepStrictEqual
});
assert.strict.strict = assert.strict;

var objectKeys = Object.keys || function (obj) {
  var keys = [];
  for (var key in obj) {
    if (hasOwn.call(obj, key)) keys.push(key);
  }
  return keys;
};

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"object-assign":46,"util/":27}],25:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],26:[function(require,module,exports){
module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}
},{}],27:[function(require,module,exports){
(function (process,global){(function (){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = require('./support/isBuffer');

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = require('inherits');

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

}).call(this)}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./support/isBuffer":26,"_process":47,"inherits":25}],28:[function(require,module,exports){
(function (global){(function (){
'use strict';

var possibleNames = [
	'BigInt64Array',
	'BigUint64Array',
	'Float32Array',
	'Float64Array',
	'Int16Array',
	'Int32Array',
	'Int8Array',
	'Uint16Array',
	'Uint32Array',
	'Uint8Array',
	'Uint8ClampedArray'
];

var g = typeof globalThis === 'undefined' ? global : globalThis;

module.exports = function availableTypedArrays() {
	var out = [];
	for (var i = 0; i < possibleNames.length; i++) {
		if (typeof g[possibleNames[i]] === 'function') {
			out[out.length] = possibleNames[i];
		}
	}
	return out;
};

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],29:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var callBind = require('./');

var $indexOf = callBind(GetIntrinsic('String.prototype.indexOf'));

module.exports = function callBoundIntrinsic(name, allowMissing) {
	var intrinsic = GetIntrinsic(name, !!allowMissing);
	if (typeof intrinsic === 'function' && $indexOf(name, '.prototype.') > -1) {
		return callBind(intrinsic);
	}
	return intrinsic;
};

},{"./":30,"get-intrinsic":35}],30:[function(require,module,exports){
'use strict';

var bind = require('function-bind');
var GetIntrinsic = require('get-intrinsic');

var $apply = GetIntrinsic('%Function.prototype.apply%');
var $call = GetIntrinsic('%Function.prototype.call%');
var $reflectApply = GetIntrinsic('%Reflect.apply%', true) || bind.call($call, $apply);

var $gOPD = GetIntrinsic('%Object.getOwnPropertyDescriptor%', true);
var $defineProperty = GetIntrinsic('%Object.defineProperty%', true);
var $max = GetIntrinsic('%Math.max%');

if ($defineProperty) {
	try {
		$defineProperty({}, 'a', { value: 1 });
	} catch (e) {
		// IE 8 has a broken defineProperty
		$defineProperty = null;
	}
}

module.exports = function callBind(originalFunction) {
	var func = $reflectApply(bind, $call, arguments);
	if ($gOPD && $defineProperty) {
		var desc = $gOPD(func, 'length');
		if (desc.configurable) {
			// original length, plus the receiver, minus any additional arguments (after the receiver)
			$defineProperty(
				func,
				'length',
				{ value: 1 + $max(0, originalFunction.length - (arguments.length - 1)) }
			);
		}
	}
	return func;
};

var applyBind = function applyBind() {
	return $reflectApply(bind, $apply, arguments);
};

if ($defineProperty) {
	$defineProperty(module.exports, 'apply', { value: applyBind });
} else {
	module.exports.apply = applyBind;
}

},{"function-bind":34,"get-intrinsic":35}],31:[function(require,module,exports){
(function (global){(function (){
/*global window, global*/
var util = require("util")
var assert = require("assert")
function now() { return new Date().getTime() }

var slice = Array.prototype.slice
var console
var times = {}

if (typeof global !== "undefined" && global.console) {
    console = global.console
} else if (typeof window !== "undefined" && window.console) {
    console = window.console
} else {
    console = {}
}

var functions = [
    [log, "log"],
    [info, "info"],
    [warn, "warn"],
    [error, "error"],
    [time, "time"],
    [timeEnd, "timeEnd"],
    [trace, "trace"],
    [dir, "dir"],
    [consoleAssert, "assert"]
]

for (var i = 0; i < functions.length; i++) {
    var tuple = functions[i]
    var f = tuple[0]
    var name = tuple[1]

    if (!console[name]) {
        console[name] = f
    }
}

module.exports = console

function log() {}

function info() {
    console.log.apply(console, arguments)
}

function warn() {
    console.log.apply(console, arguments)
}

function error() {
    console.warn.apply(console, arguments)
}

function time(label) {
    times[label] = now()
}

function timeEnd(label) {
    var time = times[label]
    if (!time) {
        throw new Error("No such label: " + label)
    }

    delete times[label]
    var duration = now() - time
    console.log(label + ": " + duration + "ms")
}

function trace() {
    var err = new Error()
    err.name = "Trace"
    err.message = util.format.apply(null, arguments)
    console.error(err.stack)
}

function dir(object) {
    console.log(util.inspect(object) + "\n")
}

function consoleAssert(expression) {
    if (!expression) {
        var arr = slice.call(arguments, 1)
        assert.ok(false, util.format.apply(null, arr))
    }
}

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"assert":24,"util":50}],32:[function(require,module,exports){
'use strict';

var isCallable = require('is-callable');

var toStr = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

var forEachArray = function forEachArray(array, iterator, receiver) {
    for (var i = 0, len = array.length; i < len; i++) {
        if (hasOwnProperty.call(array, i)) {
            if (receiver == null) {
                iterator(array[i], i, array);
            } else {
                iterator.call(receiver, array[i], i, array);
            }
        }
    }
};

var forEachString = function forEachString(string, iterator, receiver) {
    for (var i = 0, len = string.length; i < len; i++) {
        // no such thing as a sparse string.
        if (receiver == null) {
            iterator(string.charAt(i), i, string);
        } else {
            iterator.call(receiver, string.charAt(i), i, string);
        }
    }
};

var forEachObject = function forEachObject(object, iterator, receiver) {
    for (var k in object) {
        if (hasOwnProperty.call(object, k)) {
            if (receiver == null) {
                iterator(object[k], k, object);
            } else {
                iterator.call(receiver, object[k], k, object);
            }
        }
    }
};

var forEach = function forEach(list, iterator, thisArg) {
    if (!isCallable(iterator)) {
        throw new TypeError('iterator must be a function');
    }

    var receiver;
    if (arguments.length >= 3) {
        receiver = thisArg;
    }

    if (toStr.call(list) === '[object Array]') {
        forEachArray(list, iterator, receiver);
    } else if (typeof list === 'string') {
        forEachString(list, iterator, receiver);
    } else {
        forEachObject(list, iterator, receiver);
    }
};

module.exports = forEach;

},{"is-callable":43}],33:[function(require,module,exports){
'use strict';

/* eslint no-invalid-this: 1 */

var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
var slice = Array.prototype.slice;
var toStr = Object.prototype.toString;
var funcType = '[object Function]';

module.exports = function bind(that) {
    var target = this;
    if (typeof target !== 'function' || toStr.call(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
    }
    var args = slice.call(arguments, 1);

    var bound;
    var binder = function () {
        if (this instanceof bound) {
            var result = target.apply(
                this,
                args.concat(slice.call(arguments))
            );
            if (Object(result) === result) {
                return result;
            }
            return this;
        } else {
            return target.apply(
                that,
                args.concat(slice.call(arguments))
            );
        }
    };

    var boundLength = Math.max(0, target.length - args.length);
    var boundArgs = [];
    for (var i = 0; i < boundLength; i++) {
        boundArgs.push('$' + i);
    }

    bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this,arguments); }')(binder);

    if (target.prototype) {
        var Empty = function Empty() {};
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
    }

    return bound;
};

},{}],34:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":33}],35:[function(require,module,exports){
'use strict';

var undefined;

var $SyntaxError = SyntaxError;
var $Function = Function;
var $TypeError = TypeError;

// eslint-disable-next-line consistent-return
var getEvalledConstructor = function (expressionSyntax) {
	try {
		return $Function('"use strict"; return (' + expressionSyntax + ').constructor;')();
	} catch (e) {}
};

var $gOPD = Object.getOwnPropertyDescriptor;
if ($gOPD) {
	try {
		$gOPD({}, '');
	} catch (e) {
		$gOPD = null; // this is IE 8, which has a broken gOPD
	}
}

var throwTypeError = function () {
	throw new $TypeError();
};
var ThrowTypeError = $gOPD
	? (function () {
		try {
			// eslint-disable-next-line no-unused-expressions, no-caller, no-restricted-properties
			arguments.callee; // IE 8 does not throw here
			return throwTypeError;
		} catch (calleeThrows) {
			try {
				// IE 8 throws on Object.getOwnPropertyDescriptor(arguments, '')
				return $gOPD(arguments, 'callee').get;
			} catch (gOPDthrows) {
				return throwTypeError;
			}
		}
	}())
	: throwTypeError;

var hasSymbols = require('has-symbols')();

var getProto = Object.getPrototypeOf || function (x) { return x.__proto__; }; // eslint-disable-line no-proto

var needsEval = {};

var TypedArray = typeof Uint8Array === 'undefined' ? undefined : getProto(Uint8Array);

var INTRINSICS = {
	'%AggregateError%': typeof AggregateError === 'undefined' ? undefined : AggregateError,
	'%Array%': Array,
	'%ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? undefined : ArrayBuffer,
	'%ArrayIteratorPrototype%': hasSymbols ? getProto([][Symbol.iterator]()) : undefined,
	'%AsyncFromSyncIteratorPrototype%': undefined,
	'%AsyncFunction%': needsEval,
	'%AsyncGenerator%': needsEval,
	'%AsyncGeneratorFunction%': needsEval,
	'%AsyncIteratorPrototype%': needsEval,
	'%Atomics%': typeof Atomics === 'undefined' ? undefined : Atomics,
	'%BigInt%': typeof BigInt === 'undefined' ? undefined : BigInt,
	'%BigInt64Array%': typeof BigInt64Array === 'undefined' ? undefined : BigInt64Array,
	'%BigUint64Array%': typeof BigUint64Array === 'undefined' ? undefined : BigUint64Array,
	'%Boolean%': Boolean,
	'%DataView%': typeof DataView === 'undefined' ? undefined : DataView,
	'%Date%': Date,
	'%decodeURI%': decodeURI,
	'%decodeURIComponent%': decodeURIComponent,
	'%encodeURI%': encodeURI,
	'%encodeURIComponent%': encodeURIComponent,
	'%Error%': Error,
	'%eval%': eval, // eslint-disable-line no-eval
	'%EvalError%': EvalError,
	'%Float32Array%': typeof Float32Array === 'undefined' ? undefined : Float32Array,
	'%Float64Array%': typeof Float64Array === 'undefined' ? undefined : Float64Array,
	'%FinalizationRegistry%': typeof FinalizationRegistry === 'undefined' ? undefined : FinalizationRegistry,
	'%Function%': $Function,
	'%GeneratorFunction%': needsEval,
	'%Int8Array%': typeof Int8Array === 'undefined' ? undefined : Int8Array,
	'%Int16Array%': typeof Int16Array === 'undefined' ? undefined : Int16Array,
	'%Int32Array%': typeof Int32Array === 'undefined' ? undefined : Int32Array,
	'%isFinite%': isFinite,
	'%isNaN%': isNaN,
	'%IteratorPrototype%': hasSymbols ? getProto(getProto([][Symbol.iterator]())) : undefined,
	'%JSON%': typeof JSON === 'object' ? JSON : undefined,
	'%Map%': typeof Map === 'undefined' ? undefined : Map,
	'%MapIteratorPrototype%': typeof Map === 'undefined' || !hasSymbols ? undefined : getProto(new Map()[Symbol.iterator]()),
	'%Math%': Math,
	'%Number%': Number,
	'%Object%': Object,
	'%parseFloat%': parseFloat,
	'%parseInt%': parseInt,
	'%Promise%': typeof Promise === 'undefined' ? undefined : Promise,
	'%Proxy%': typeof Proxy === 'undefined' ? undefined : Proxy,
	'%RangeError%': RangeError,
	'%ReferenceError%': ReferenceError,
	'%Reflect%': typeof Reflect === 'undefined' ? undefined : Reflect,
	'%RegExp%': RegExp,
	'%Set%': typeof Set === 'undefined' ? undefined : Set,
	'%SetIteratorPrototype%': typeof Set === 'undefined' || !hasSymbols ? undefined : getProto(new Set()[Symbol.iterator]()),
	'%SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? undefined : SharedArrayBuffer,
	'%String%': String,
	'%StringIteratorPrototype%': hasSymbols ? getProto(''[Symbol.iterator]()) : undefined,
	'%Symbol%': hasSymbols ? Symbol : undefined,
	'%SyntaxError%': $SyntaxError,
	'%ThrowTypeError%': ThrowTypeError,
	'%TypedArray%': TypedArray,
	'%TypeError%': $TypeError,
	'%Uint8Array%': typeof Uint8Array === 'undefined' ? undefined : Uint8Array,
	'%Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? undefined : Uint8ClampedArray,
	'%Uint16Array%': typeof Uint16Array === 'undefined' ? undefined : Uint16Array,
	'%Uint32Array%': typeof Uint32Array === 'undefined' ? undefined : Uint32Array,
	'%URIError%': URIError,
	'%WeakMap%': typeof WeakMap === 'undefined' ? undefined : WeakMap,
	'%WeakRef%': typeof WeakRef === 'undefined' ? undefined : WeakRef,
	'%WeakSet%': typeof WeakSet === 'undefined' ? undefined : WeakSet
};

try {
	null.error; // eslint-disable-line no-unused-expressions
} catch (e) {
	// https://github.com/tc39/proposal-shadowrealm/pull/384#issuecomment-1364264229
	var errorProto = getProto(getProto(e));
	INTRINSICS['%Error.prototype%'] = errorProto;
}

var doEval = function doEval(name) {
	var value;
	if (name === '%AsyncFunction%') {
		value = getEvalledConstructor('async function () {}');
	} else if (name === '%GeneratorFunction%') {
		value = getEvalledConstructor('function* () {}');
	} else if (name === '%AsyncGeneratorFunction%') {
		value = getEvalledConstructor('async function* () {}');
	} else if (name === '%AsyncGenerator%') {
		var fn = doEval('%AsyncGeneratorFunction%');
		if (fn) {
			value = fn.prototype;
		}
	} else if (name === '%AsyncIteratorPrototype%') {
		var gen = doEval('%AsyncGenerator%');
		if (gen) {
			value = getProto(gen.prototype);
		}
	}

	INTRINSICS[name] = value;

	return value;
};

var LEGACY_ALIASES = {
	'%ArrayBufferPrototype%': ['ArrayBuffer', 'prototype'],
	'%ArrayPrototype%': ['Array', 'prototype'],
	'%ArrayProto_entries%': ['Array', 'prototype', 'entries'],
	'%ArrayProto_forEach%': ['Array', 'prototype', 'forEach'],
	'%ArrayProto_keys%': ['Array', 'prototype', 'keys'],
	'%ArrayProto_values%': ['Array', 'prototype', 'values'],
	'%AsyncFunctionPrototype%': ['AsyncFunction', 'prototype'],
	'%AsyncGenerator%': ['AsyncGeneratorFunction', 'prototype'],
	'%AsyncGeneratorPrototype%': ['AsyncGeneratorFunction', 'prototype', 'prototype'],
	'%BooleanPrototype%': ['Boolean', 'prototype'],
	'%DataViewPrototype%': ['DataView', 'prototype'],
	'%DatePrototype%': ['Date', 'prototype'],
	'%ErrorPrototype%': ['Error', 'prototype'],
	'%EvalErrorPrototype%': ['EvalError', 'prototype'],
	'%Float32ArrayPrototype%': ['Float32Array', 'prototype'],
	'%Float64ArrayPrototype%': ['Float64Array', 'prototype'],
	'%FunctionPrototype%': ['Function', 'prototype'],
	'%Generator%': ['GeneratorFunction', 'prototype'],
	'%GeneratorPrototype%': ['GeneratorFunction', 'prototype', 'prototype'],
	'%Int8ArrayPrototype%': ['Int8Array', 'prototype'],
	'%Int16ArrayPrototype%': ['Int16Array', 'prototype'],
	'%Int32ArrayPrototype%': ['Int32Array', 'prototype'],
	'%JSONParse%': ['JSON', 'parse'],
	'%JSONStringify%': ['JSON', 'stringify'],
	'%MapPrototype%': ['Map', 'prototype'],
	'%NumberPrototype%': ['Number', 'prototype'],
	'%ObjectPrototype%': ['Object', 'prototype'],
	'%ObjProto_toString%': ['Object', 'prototype', 'toString'],
	'%ObjProto_valueOf%': ['Object', 'prototype', 'valueOf'],
	'%PromisePrototype%': ['Promise', 'prototype'],
	'%PromiseProto_then%': ['Promise', 'prototype', 'then'],
	'%Promise_all%': ['Promise', 'all'],
	'%Promise_reject%': ['Promise', 'reject'],
	'%Promise_resolve%': ['Promise', 'resolve'],
	'%RangeErrorPrototype%': ['RangeError', 'prototype'],
	'%ReferenceErrorPrototype%': ['ReferenceError', 'prototype'],
	'%RegExpPrototype%': ['RegExp', 'prototype'],
	'%SetPrototype%': ['Set', 'prototype'],
	'%SharedArrayBufferPrototype%': ['SharedArrayBuffer', 'prototype'],
	'%StringPrototype%': ['String', 'prototype'],
	'%SymbolPrototype%': ['Symbol', 'prototype'],
	'%SyntaxErrorPrototype%': ['SyntaxError', 'prototype'],
	'%TypedArrayPrototype%': ['TypedArray', 'prototype'],
	'%TypeErrorPrototype%': ['TypeError', 'prototype'],
	'%Uint8ArrayPrototype%': ['Uint8Array', 'prototype'],
	'%Uint8ClampedArrayPrototype%': ['Uint8ClampedArray', 'prototype'],
	'%Uint16ArrayPrototype%': ['Uint16Array', 'prototype'],
	'%Uint32ArrayPrototype%': ['Uint32Array', 'prototype'],
	'%URIErrorPrototype%': ['URIError', 'prototype'],
	'%WeakMapPrototype%': ['WeakMap', 'prototype'],
	'%WeakSetPrototype%': ['WeakSet', 'prototype']
};

var bind = require('function-bind');
var hasOwn = require('has');
var $concat = bind.call(Function.call, Array.prototype.concat);
var $spliceApply = bind.call(Function.apply, Array.prototype.splice);
var $replace = bind.call(Function.call, String.prototype.replace);
var $strSlice = bind.call(Function.call, String.prototype.slice);
var $exec = bind.call(Function.call, RegExp.prototype.exec);

/* adapted from https://github.com/lodash/lodash/blob/4.17.15/dist/lodash.js#L6735-L6744 */
var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
var reEscapeChar = /\\(\\)?/g; /** Used to match backslashes in property paths. */
var stringToPath = function stringToPath(string) {
	var first = $strSlice(string, 0, 1);
	var last = $strSlice(string, -1);
	if (first === '%' && last !== '%') {
		throw new $SyntaxError('invalid intrinsic syntax, expected closing `%`');
	} else if (last === '%' && first !== '%') {
		throw new $SyntaxError('invalid intrinsic syntax, expected opening `%`');
	}
	var result = [];
	$replace(string, rePropName, function (match, number, quote, subString) {
		result[result.length] = quote ? $replace(subString, reEscapeChar, '$1') : number || match;
	});
	return result;
};
/* end adaptation */

var getBaseIntrinsic = function getBaseIntrinsic(name, allowMissing) {
	var intrinsicName = name;
	var alias;
	if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
		alias = LEGACY_ALIASES[intrinsicName];
		intrinsicName = '%' + alias[0] + '%';
	}

	if (hasOwn(INTRINSICS, intrinsicName)) {
		var value = INTRINSICS[intrinsicName];
		if (value === needsEval) {
			value = doEval(intrinsicName);
		}
		if (typeof value === 'undefined' && !allowMissing) {
			throw new $TypeError('intrinsic ' + name + ' exists, but is not available. Please file an issue!');
		}

		return {
			alias: alias,
			name: intrinsicName,
			value: value
		};
	}

	throw new $SyntaxError('intrinsic ' + name + ' does not exist!');
};

module.exports = function GetIntrinsic(name, allowMissing) {
	if (typeof name !== 'string' || name.length === 0) {
		throw new $TypeError('intrinsic name must be a non-empty string');
	}
	if (arguments.length > 1 && typeof allowMissing !== 'boolean') {
		throw new $TypeError('"allowMissing" argument must be a boolean');
	}

	if ($exec(/^%?[^%]*%?$/, name) === null) {
		throw new $SyntaxError('`%` may not be present anywhere but at the beginning and end of the intrinsic name');
	}
	var parts = stringToPath(name);
	var intrinsicBaseName = parts.length > 0 ? parts[0] : '';

	var intrinsic = getBaseIntrinsic('%' + intrinsicBaseName + '%', allowMissing);
	var intrinsicRealName = intrinsic.name;
	var value = intrinsic.value;
	var skipFurtherCaching = false;

	var alias = intrinsic.alias;
	if (alias) {
		intrinsicBaseName = alias[0];
		$spliceApply(parts, $concat([0, 1], alias));
	}

	for (var i = 1, isOwn = true; i < parts.length; i += 1) {
		var part = parts[i];
		var first = $strSlice(part, 0, 1);
		var last = $strSlice(part, -1);
		if (
			(
				(first === '"' || first === "'" || first === '`')
				|| (last === '"' || last === "'" || last === '`')
			)
			&& first !== last
		) {
			throw new $SyntaxError('property names with quotes must have matching quotes');
		}
		if (part === 'constructor' || !isOwn) {
			skipFurtherCaching = true;
		}

		intrinsicBaseName += '.' + part;
		intrinsicRealName = '%' + intrinsicBaseName + '%';

		if (hasOwn(INTRINSICS, intrinsicRealName)) {
			value = INTRINSICS[intrinsicRealName];
		} else if (value != null) {
			if (!(part in value)) {
				if (!allowMissing) {
					throw new $TypeError('base intrinsic for ' + name + ' exists, but the property is not available.');
				}
				return void undefined;
			}
			if ($gOPD && (i + 1) >= parts.length) {
				var desc = $gOPD(value, part);
				isOwn = !!desc;

				// By convention, when a data property is converted to an accessor
				// property to emulate a data property that does not suffer from
				// the override mistake, that accessor's getter is marked with
				// an `originalValue` property. Here, when we detect this, we
				// uphold the illusion by pretending to see that original data
				// property, i.e., returning the value rather than the getter
				// itself.
				if (isOwn && 'get' in desc && !('originalValue' in desc.get)) {
					value = desc.get;
				} else {
					value = value[part];
				}
			} else {
				isOwn = hasOwn(value, part);
				value = value[part];
			}

			if (isOwn && !skipFurtherCaching) {
				INTRINSICS[intrinsicRealName] = value;
			}
		}
	}
	return value;
};

},{"function-bind":34,"has":40,"has-symbols":37}],36:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $gOPD = GetIntrinsic('%Object.getOwnPropertyDescriptor%', true);

if ($gOPD) {
	try {
		$gOPD([], 'length');
	} catch (e) {
		// IE 8 has a broken gOPD
		$gOPD = null;
	}
}

module.exports = $gOPD;

},{"get-intrinsic":35}],37:[function(require,module,exports){
'use strict';

var origSymbol = typeof Symbol !== 'undefined' && Symbol;
var hasSymbolSham = require('./shams');

module.exports = function hasNativeSymbols() {
	if (typeof origSymbol !== 'function') { return false; }
	if (typeof Symbol !== 'function') { return false; }
	if (typeof origSymbol('foo') !== 'symbol') { return false; }
	if (typeof Symbol('bar') !== 'symbol') { return false; }

	return hasSymbolSham();
};

},{"./shams":38}],38:[function(require,module,exports){
'use strict';

/* eslint complexity: [2, 18], max-statements: [2, 33] */
module.exports = function hasSymbols() {
	if (typeof Symbol !== 'function' || typeof Object.getOwnPropertySymbols !== 'function') { return false; }
	if (typeof Symbol.iterator === 'symbol') { return true; }

	var obj = {};
	var sym = Symbol('test');
	var symObj = Object(sym);
	if (typeof sym === 'string') { return false; }

	if (Object.prototype.toString.call(sym) !== '[object Symbol]') { return false; }
	if (Object.prototype.toString.call(symObj) !== '[object Symbol]') { return false; }

	// temp disabled per https://github.com/ljharb/object.assign/issues/17
	// if (sym instanceof Symbol) { return false; }
	// temp disabled per https://github.com/WebReflection/get-own-property-symbols/issues/4
	// if (!(symObj instanceof Symbol)) { return false; }

	// if (typeof Symbol.prototype.toString !== 'function') { return false; }
	// if (String(sym) !== Symbol.prototype.toString.call(sym)) { return false; }

	var symVal = 42;
	obj[sym] = symVal;
	for (sym in obj) { return false; } // eslint-disable-line no-restricted-syntax, no-unreachable-loop
	if (typeof Object.keys === 'function' && Object.keys(obj).length !== 0) { return false; }

	if (typeof Object.getOwnPropertyNames === 'function' && Object.getOwnPropertyNames(obj).length !== 0) { return false; }

	var syms = Object.getOwnPropertySymbols(obj);
	if (syms.length !== 1 || syms[0] !== sym) { return false; }

	if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) { return false; }

	if (typeof Object.getOwnPropertyDescriptor === 'function') {
		var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
		if (descriptor.value !== symVal || descriptor.enumerable !== true) { return false; }
	}

	return true;
};

},{}],39:[function(require,module,exports){
'use strict';

var hasSymbols = require('has-symbols/shams');

module.exports = function hasToStringTagShams() {
	return hasSymbols() && !!Symbol.toStringTag;
};

},{"has-symbols/shams":38}],40:[function(require,module,exports){
'use strict';

var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":34}],41:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        }
      })
    }
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      var TempCtor = function () {}
      TempCtor.prototype = superCtor.prototype
      ctor.prototype = new TempCtor()
      ctor.prototype.constructor = ctor
    }
  }
}

},{}],42:[function(require,module,exports){
'use strict';

var hasToStringTag = require('has-tostringtag/shams')();
var callBound = require('call-bind/callBound');

var $toString = callBound('Object.prototype.toString');

var isStandardArguments = function isArguments(value) {
	if (hasToStringTag && value && typeof value === 'object' && Symbol.toStringTag in value) {
		return false;
	}
	return $toString(value) === '[object Arguments]';
};

var isLegacyArguments = function isArguments(value) {
	if (isStandardArguments(value)) {
		return true;
	}
	return value !== null &&
		typeof value === 'object' &&
		typeof value.length === 'number' &&
		value.length >= 0 &&
		$toString(value) !== '[object Array]' &&
		$toString(value.callee) === '[object Function]';
};

var supportsStandardArguments = (function () {
	return isStandardArguments(arguments);
}());

isStandardArguments.isLegacyArguments = isLegacyArguments; // for tests

module.exports = supportsStandardArguments ? isStandardArguments : isLegacyArguments;

},{"call-bind/callBound":29,"has-tostringtag/shams":39}],43:[function(require,module,exports){
'use strict';

var fnToStr = Function.prototype.toString;
var reflectApply = typeof Reflect === 'object' && Reflect !== null && Reflect.apply;
var badArrayLike;
var isCallableMarker;
if (typeof reflectApply === 'function' && typeof Object.defineProperty === 'function') {
	try {
		badArrayLike = Object.defineProperty({}, 'length', {
			get: function () {
				throw isCallableMarker;
			}
		});
		isCallableMarker = {};
		// eslint-disable-next-line no-throw-literal
		reflectApply(function () { throw 42; }, null, badArrayLike);
	} catch (_) {
		if (_ !== isCallableMarker) {
			reflectApply = null;
		}
	}
} else {
	reflectApply = null;
}

var constructorRegex = /^\s*class\b/;
var isES6ClassFn = function isES6ClassFunction(value) {
	try {
		var fnStr = fnToStr.call(value);
		return constructorRegex.test(fnStr);
	} catch (e) {
		return false; // not a function
	}
};

var tryFunctionObject = function tryFunctionToStr(value) {
	try {
		if (isES6ClassFn(value)) { return false; }
		fnToStr.call(value);
		return true;
	} catch (e) {
		return false;
	}
};
var toStr = Object.prototype.toString;
var objectClass = '[object Object]';
var fnClass = '[object Function]';
var genClass = '[object GeneratorFunction]';
var ddaClass = '[object HTMLAllCollection]'; // IE 11
var ddaClass2 = '[object HTML document.all class]';
var ddaClass3 = '[object HTMLCollection]'; // IE 9-10
var hasToStringTag = typeof Symbol === 'function' && !!Symbol.toStringTag; // better: use `has-tostringtag`

var isIE68 = !(0 in [,]); // eslint-disable-line no-sparse-arrays, comma-spacing

var isDDA = function isDocumentDotAll() { return false; };
if (typeof document === 'object') {
	// Firefox 3 canonicalizes DDA to undefined when it's not accessed directly
	var all = document.all;
	if (toStr.call(all) === toStr.call(document.all)) {
		isDDA = function isDocumentDotAll(value) {
			/* globals document: false */
			// in IE 6-8, typeof document.all is "object" and it's truthy
			if ((isIE68 || !value) && (typeof value === 'undefined' || typeof value === 'object')) {
				try {
					var str = toStr.call(value);
					return (
						str === ddaClass
						|| str === ddaClass2
						|| str === ddaClass3 // opera 12.16
						|| str === objectClass // IE 6-8
					) && value('') == null; // eslint-disable-line eqeqeq
				} catch (e) { /**/ }
			}
			return false;
		};
	}
}

module.exports = reflectApply
	? function isCallable(value) {
		if (isDDA(value)) { return true; }
		if (!value) { return false; }
		if (typeof value !== 'function' && typeof value !== 'object') { return false; }
		try {
			reflectApply(value, null, badArrayLike);
		} catch (e) {
			if (e !== isCallableMarker) { return false; }
		}
		return !isES6ClassFn(value) && tryFunctionObject(value);
	}
	: function isCallable(value) {
		if (isDDA(value)) { return true; }
		if (!value) { return false; }
		if (typeof value !== 'function' && typeof value !== 'object') { return false; }
		if (hasToStringTag) { return tryFunctionObject(value); }
		if (isES6ClassFn(value)) { return false; }
		var strClass = toStr.call(value);
		if (strClass !== fnClass && strClass !== genClass && !(/^\[object HTML/).test(strClass)) { return false; }
		return tryFunctionObject(value);
	};

},{}],44:[function(require,module,exports){
'use strict';

var toStr = Object.prototype.toString;
var fnToStr = Function.prototype.toString;
var isFnRegex = /^\s*(?:function)?\*/;
var hasToStringTag = require('has-tostringtag/shams')();
var getProto = Object.getPrototypeOf;
var getGeneratorFunc = function () { // eslint-disable-line consistent-return
	if (!hasToStringTag) {
		return false;
	}
	try {
		return Function('return function*() {}')();
	} catch (e) {
	}
};
var GeneratorFunction;

module.exports = function isGeneratorFunction(fn) {
	if (typeof fn !== 'function') {
		return false;
	}
	if (isFnRegex.test(fnToStr.call(fn))) {
		return true;
	}
	if (!hasToStringTag) {
		var str = toStr.call(fn);
		return str === '[object GeneratorFunction]';
	}
	if (!getProto) {
		return false;
	}
	if (typeof GeneratorFunction === 'undefined') {
		var generatorFunc = getGeneratorFunc();
		GeneratorFunction = generatorFunc ? getProto(generatorFunc) : false;
	}
	return getProto(fn) === GeneratorFunction;
};

},{"has-tostringtag/shams":39}],45:[function(require,module,exports){
(function (global){(function (){
'use strict';

var forEach = require('for-each');
var availableTypedArrays = require('available-typed-arrays');
var callBound = require('call-bind/callBound');

var $toString = callBound('Object.prototype.toString');
var hasToStringTag = require('has-tostringtag/shams')();
var gOPD = require('gopd');

var g = typeof globalThis === 'undefined' ? global : globalThis;
var typedArrays = availableTypedArrays();

var $indexOf = callBound('Array.prototype.indexOf', true) || function indexOf(array, value) {
	for (var i = 0; i < array.length; i += 1) {
		if (array[i] === value) {
			return i;
		}
	}
	return -1;
};
var $slice = callBound('String.prototype.slice');
var toStrTags = {};
var getPrototypeOf = Object.getPrototypeOf; // require('getprototypeof');
if (hasToStringTag && gOPD && getPrototypeOf) {
	forEach(typedArrays, function (typedArray) {
		var arr = new g[typedArray]();
		if (Symbol.toStringTag in arr) {
			var proto = getPrototypeOf(arr);
			var descriptor = gOPD(proto, Symbol.toStringTag);
			if (!descriptor) {
				var superProto = getPrototypeOf(proto);
				descriptor = gOPD(superProto, Symbol.toStringTag);
			}
			toStrTags[typedArray] = descriptor.get;
		}
	});
}

var tryTypedArrays = function tryAllTypedArrays(value) {
	var anyTrue = false;
	forEach(toStrTags, function (getter, typedArray) {
		if (!anyTrue) {
			try {
				anyTrue = getter.call(value) === typedArray;
			} catch (e) { /**/ }
		}
	});
	return anyTrue;
};

module.exports = function isTypedArray(value) {
	if (!value || typeof value !== 'object') { return false; }
	if (!hasToStringTag || !(Symbol.toStringTag in value)) {
		var tag = $slice($toString(value), 8, -1);
		return $indexOf(typedArrays, tag) > -1;
	}
	if (!gOPD) { return false; }
	return tryTypedArrays(value);
};

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"available-typed-arrays":28,"call-bind/callBound":29,"for-each":32,"gopd":36,"has-tostringtag/shams":39}],46:[function(require,module,exports){
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/

'use strict';
/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

},{}],47:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],48:[function(require,module,exports){
arguments[4][26][0].apply(exports,arguments)
},{"dup":26}],49:[function(require,module,exports){
// Currently in sync with Node.js lib/internal/util/types.js
// https://github.com/nodejs/node/commit/112cc7c27551254aa2b17098fb774867f05ed0d9

'use strict';

var isArgumentsObject = require('is-arguments');
var isGeneratorFunction = require('is-generator-function');
var whichTypedArray = require('which-typed-array');
var isTypedArray = require('is-typed-array');

function uncurryThis(f) {
  return f.call.bind(f);
}

var BigIntSupported = typeof BigInt !== 'undefined';
var SymbolSupported = typeof Symbol !== 'undefined';

var ObjectToString = uncurryThis(Object.prototype.toString);

var numberValue = uncurryThis(Number.prototype.valueOf);
var stringValue = uncurryThis(String.prototype.valueOf);
var booleanValue = uncurryThis(Boolean.prototype.valueOf);

if (BigIntSupported) {
  var bigIntValue = uncurryThis(BigInt.prototype.valueOf);
}

if (SymbolSupported) {
  var symbolValue = uncurryThis(Symbol.prototype.valueOf);
}

function checkBoxedPrimitive(value, prototypeValueOf) {
  if (typeof value !== 'object') {
    return false;
  }
  try {
    prototypeValueOf(value);
    return true;
  } catch(e) {
    return false;
  }
}

exports.isArgumentsObject = isArgumentsObject;
exports.isGeneratorFunction = isGeneratorFunction;
exports.isTypedArray = isTypedArray;

// Taken from here and modified for better browser support
// https://github.com/sindresorhus/p-is-promise/blob/cda35a513bda03f977ad5cde3a079d237e82d7ef/index.js
function isPromise(input) {
	return (
		(
			typeof Promise !== 'undefined' &&
			input instanceof Promise
		) ||
		(
			input !== null &&
			typeof input === 'object' &&
			typeof input.then === 'function' &&
			typeof input.catch === 'function'
		)
	);
}
exports.isPromise = isPromise;

function isArrayBufferView(value) {
  if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView) {
    return ArrayBuffer.isView(value);
  }

  return (
    isTypedArray(value) ||
    isDataView(value)
  );
}
exports.isArrayBufferView = isArrayBufferView;


function isUint8Array(value) {
  return whichTypedArray(value) === 'Uint8Array';
}
exports.isUint8Array = isUint8Array;

function isUint8ClampedArray(value) {
  return whichTypedArray(value) === 'Uint8ClampedArray';
}
exports.isUint8ClampedArray = isUint8ClampedArray;

function isUint16Array(value) {
  return whichTypedArray(value) === 'Uint16Array';
}
exports.isUint16Array = isUint16Array;

function isUint32Array(value) {
  return whichTypedArray(value) === 'Uint32Array';
}
exports.isUint32Array = isUint32Array;

function isInt8Array(value) {
  return whichTypedArray(value) === 'Int8Array';
}
exports.isInt8Array = isInt8Array;

function isInt16Array(value) {
  return whichTypedArray(value) === 'Int16Array';
}
exports.isInt16Array = isInt16Array;

function isInt32Array(value) {
  return whichTypedArray(value) === 'Int32Array';
}
exports.isInt32Array = isInt32Array;

function isFloat32Array(value) {
  return whichTypedArray(value) === 'Float32Array';
}
exports.isFloat32Array = isFloat32Array;

function isFloat64Array(value) {
  return whichTypedArray(value) === 'Float64Array';
}
exports.isFloat64Array = isFloat64Array;

function isBigInt64Array(value) {
  return whichTypedArray(value) === 'BigInt64Array';
}
exports.isBigInt64Array = isBigInt64Array;

function isBigUint64Array(value) {
  return whichTypedArray(value) === 'BigUint64Array';
}
exports.isBigUint64Array = isBigUint64Array;

function isMapToString(value) {
  return ObjectToString(value) === '[object Map]';
}
isMapToString.working = (
  typeof Map !== 'undefined' &&
  isMapToString(new Map())
);

function isMap(value) {
  if (typeof Map === 'undefined') {
    return false;
  }

  return isMapToString.working
    ? isMapToString(value)
    : value instanceof Map;
}
exports.isMap = isMap;

function isSetToString(value) {
  return ObjectToString(value) === '[object Set]';
}
isSetToString.working = (
  typeof Set !== 'undefined' &&
  isSetToString(new Set())
);
function isSet(value) {
  if (typeof Set === 'undefined') {
    return false;
  }

  return isSetToString.working
    ? isSetToString(value)
    : value instanceof Set;
}
exports.isSet = isSet;

function isWeakMapToString(value) {
  return ObjectToString(value) === '[object WeakMap]';
}
isWeakMapToString.working = (
  typeof WeakMap !== 'undefined' &&
  isWeakMapToString(new WeakMap())
);
function isWeakMap(value) {
  if (typeof WeakMap === 'undefined') {
    return false;
  }

  return isWeakMapToString.working
    ? isWeakMapToString(value)
    : value instanceof WeakMap;
}
exports.isWeakMap = isWeakMap;

function isWeakSetToString(value) {
  return ObjectToString(value) === '[object WeakSet]';
}
isWeakSetToString.working = (
  typeof WeakSet !== 'undefined' &&
  isWeakSetToString(new WeakSet())
);
function isWeakSet(value) {
  return isWeakSetToString(value);
}
exports.isWeakSet = isWeakSet;

function isArrayBufferToString(value) {
  return ObjectToString(value) === '[object ArrayBuffer]';
}
isArrayBufferToString.working = (
  typeof ArrayBuffer !== 'undefined' &&
  isArrayBufferToString(new ArrayBuffer())
);
function isArrayBuffer(value) {
  if (typeof ArrayBuffer === 'undefined') {
    return false;
  }

  return isArrayBufferToString.working
    ? isArrayBufferToString(value)
    : value instanceof ArrayBuffer;
}
exports.isArrayBuffer = isArrayBuffer;

function isDataViewToString(value) {
  return ObjectToString(value) === '[object DataView]';
}
isDataViewToString.working = (
  typeof ArrayBuffer !== 'undefined' &&
  typeof DataView !== 'undefined' &&
  isDataViewToString(new DataView(new ArrayBuffer(1), 0, 1))
);
function isDataView(value) {
  if (typeof DataView === 'undefined') {
    return false;
  }

  return isDataViewToString.working
    ? isDataViewToString(value)
    : value instanceof DataView;
}
exports.isDataView = isDataView;

// Store a copy of SharedArrayBuffer in case it's deleted elsewhere
var SharedArrayBufferCopy = typeof SharedArrayBuffer !== 'undefined' ? SharedArrayBuffer : undefined;
function isSharedArrayBufferToString(value) {
  return ObjectToString(value) === '[object SharedArrayBuffer]';
}
function isSharedArrayBuffer(value) {
  if (typeof SharedArrayBufferCopy === 'undefined') {
    return false;
  }

  if (typeof isSharedArrayBufferToString.working === 'undefined') {
    isSharedArrayBufferToString.working = isSharedArrayBufferToString(new SharedArrayBufferCopy());
  }

  return isSharedArrayBufferToString.working
    ? isSharedArrayBufferToString(value)
    : value instanceof SharedArrayBufferCopy;
}
exports.isSharedArrayBuffer = isSharedArrayBuffer;

function isAsyncFunction(value) {
  return ObjectToString(value) === '[object AsyncFunction]';
}
exports.isAsyncFunction = isAsyncFunction;

function isMapIterator(value) {
  return ObjectToString(value) === '[object Map Iterator]';
}
exports.isMapIterator = isMapIterator;

function isSetIterator(value) {
  return ObjectToString(value) === '[object Set Iterator]';
}
exports.isSetIterator = isSetIterator;

function isGeneratorObject(value) {
  return ObjectToString(value) === '[object Generator]';
}
exports.isGeneratorObject = isGeneratorObject;

function isWebAssemblyCompiledModule(value) {
  return ObjectToString(value) === '[object WebAssembly.Module]';
}
exports.isWebAssemblyCompiledModule = isWebAssemblyCompiledModule;

function isNumberObject(value) {
  return checkBoxedPrimitive(value, numberValue);
}
exports.isNumberObject = isNumberObject;

function isStringObject(value) {
  return checkBoxedPrimitive(value, stringValue);
}
exports.isStringObject = isStringObject;

function isBooleanObject(value) {
  return checkBoxedPrimitive(value, booleanValue);
}
exports.isBooleanObject = isBooleanObject;

function isBigIntObject(value) {
  return BigIntSupported && checkBoxedPrimitive(value, bigIntValue);
}
exports.isBigIntObject = isBigIntObject;

function isSymbolObject(value) {
  return SymbolSupported && checkBoxedPrimitive(value, symbolValue);
}
exports.isSymbolObject = isSymbolObject;

function isBoxedPrimitive(value) {
  return (
    isNumberObject(value) ||
    isStringObject(value) ||
    isBooleanObject(value) ||
    isBigIntObject(value) ||
    isSymbolObject(value)
  );
}
exports.isBoxedPrimitive = isBoxedPrimitive;

function isAnyArrayBuffer(value) {
  return typeof Uint8Array !== 'undefined' && (
    isArrayBuffer(value) ||
    isSharedArrayBuffer(value)
  );
}
exports.isAnyArrayBuffer = isAnyArrayBuffer;

['isProxy', 'isExternal', 'isModuleNamespaceObject'].forEach(function(method) {
  Object.defineProperty(exports, method, {
    enumerable: false,
    value: function() {
      throw new Error(method + ' is not supported in userland');
    }
  });
});

},{"is-arguments":42,"is-generator-function":44,"is-typed-array":45,"which-typed-array":51}],50:[function(require,module,exports){
(function (process){(function (){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors ||
  function getOwnPropertyDescriptors(obj) {
    var keys = Object.keys(obj);
    var descriptors = {};
    for (var i = 0; i < keys.length; i++) {
      descriptors[keys[i]] = Object.getOwnPropertyDescriptor(obj, keys[i]);
    }
    return descriptors;
  };

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  if (typeof process !== 'undefined' && process.noDeprecation === true) {
    return fn;
  }

  // Allow for deprecating things in the process of starting up.
  if (typeof process === 'undefined') {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnvRegex = /^$/;

if (process.env.NODE_DEBUG) {
  var debugEnv = process.env.NODE_DEBUG;
  debugEnv = debugEnv.replace(/[|\\{}()[\]^$+?.]/g, '\\$&')
    .replace(/\*/g, '.*')
    .replace(/,/g, '$|^')
    .toUpperCase();
  debugEnvRegex = new RegExp('^' + debugEnv + '$', 'i');
}
exports.debuglog = function(set) {
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (debugEnvRegex.test(set)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').slice(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.slice(1, -1);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
exports.types = require('./support/types');

function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;
exports.types.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;
exports.types.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;
exports.types.isNativeError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = require('./support/isBuffer');

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = require('inherits');

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

var kCustomPromisifiedSymbol = typeof Symbol !== 'undefined' ? Symbol('util.promisify.custom') : undefined;

exports.promisify = function promisify(original) {
  if (typeof original !== 'function')
    throw new TypeError('The "original" argument must be of type Function');

  if (kCustomPromisifiedSymbol && original[kCustomPromisifiedSymbol]) {
    var fn = original[kCustomPromisifiedSymbol];
    if (typeof fn !== 'function') {
      throw new TypeError('The "util.promisify.custom" argument must be of type Function');
    }
    Object.defineProperty(fn, kCustomPromisifiedSymbol, {
      value: fn, enumerable: false, writable: false, configurable: true
    });
    return fn;
  }

  function fn() {
    var promiseResolve, promiseReject;
    var promise = new Promise(function (resolve, reject) {
      promiseResolve = resolve;
      promiseReject = reject;
    });

    var args = [];
    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }
    args.push(function (err, value) {
      if (err) {
        promiseReject(err);
      } else {
        promiseResolve(value);
      }
    });

    try {
      original.apply(this, args);
    } catch (err) {
      promiseReject(err);
    }

    return promise;
  }

  Object.setPrototypeOf(fn, Object.getPrototypeOf(original));

  if (kCustomPromisifiedSymbol) Object.defineProperty(fn, kCustomPromisifiedSymbol, {
    value: fn, enumerable: false, writable: false, configurable: true
  });
  return Object.defineProperties(
    fn,
    getOwnPropertyDescriptors(original)
  );
}

exports.promisify.custom = kCustomPromisifiedSymbol

function callbackifyOnRejected(reason, cb) {
  // `!reason` guard inspired by bluebird (Ref: https://goo.gl/t5IS6M).
  // Because `null` is a special error value in callbacks which means "no error
  // occurred", we error-wrap so the callback consumer can distinguish between
  // "the promise rejected with null" or "the promise fulfilled with undefined".
  if (!reason) {
    var newReason = new Error('Promise was rejected with a falsy value');
    newReason.reason = reason;
    reason = newReason;
  }
  return cb(reason);
}

function callbackify(original) {
  if (typeof original !== 'function') {
    throw new TypeError('The "original" argument must be of type Function');
  }

  // We DO NOT return the promise as it gives the user a false sense that
  // the promise is actually somehow related to the callback's execution
  // and that the callback throwing will reject the promise.
  function callbackified() {
    var args = [];
    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }

    var maybeCb = args.pop();
    if (typeof maybeCb !== 'function') {
      throw new TypeError('The last argument must be of type Function');
    }
    var self = this;
    var cb = function() {
      return maybeCb.apply(self, arguments);
    };
    // In true node style we process the callback on `nextTick` with all the
    // implications (stack, `uncaughtException`, `async_hooks`)
    original.apply(this, args)
      .then(function(ret) { process.nextTick(cb.bind(null, null, ret)) },
            function(rej) { process.nextTick(callbackifyOnRejected.bind(null, rej, cb)) });
  }

  Object.setPrototypeOf(callbackified, Object.getPrototypeOf(original));
  Object.defineProperties(callbackified,
                          getOwnPropertyDescriptors(original));
  return callbackified;
}
exports.callbackify = callbackify;

}).call(this)}).call(this,require('_process'))
},{"./support/isBuffer":48,"./support/types":49,"_process":47,"inherits":41}],51:[function(require,module,exports){
(function (global){(function (){
'use strict';

var forEach = require('for-each');
var availableTypedArrays = require('available-typed-arrays');
var callBound = require('call-bind/callBound');
var gOPD = require('gopd');

var $toString = callBound('Object.prototype.toString');
var hasToStringTag = require('has-tostringtag/shams')();

var g = typeof globalThis === 'undefined' ? global : globalThis;
var typedArrays = availableTypedArrays();

var $slice = callBound('String.prototype.slice');
var toStrTags = {};
var getPrototypeOf = Object.getPrototypeOf; // require('getprototypeof');
if (hasToStringTag && gOPD && getPrototypeOf) {
	forEach(typedArrays, function (typedArray) {
		if (typeof g[typedArray] === 'function') {
			var arr = new g[typedArray]();
			if (Symbol.toStringTag in arr) {
				var proto = getPrototypeOf(arr);
				var descriptor = gOPD(proto, Symbol.toStringTag);
				if (!descriptor) {
					var superProto = getPrototypeOf(proto);
					descriptor = gOPD(superProto, Symbol.toStringTag);
				}
				toStrTags[typedArray] = descriptor.get;
			}
		}
	});
}

var tryTypedArrays = function tryAllTypedArrays(value) {
	var foundName = false;
	forEach(toStrTags, function (getter, typedArray) {
		if (!foundName) {
			try {
				var name = getter.call(value);
				if (name === typedArray) {
					foundName = name;
				}
			} catch (e) {}
		}
	});
	return foundName;
};

var isTypedArray = require('is-typed-array');

module.exports = function whichTypedArray(value) {
	if (!isTypedArray(value)) { return false; }
	if (!hasToStringTag || !(Symbol.toStringTag in value)) { return $slice($toString(value), 8, -1); }
	return tryTypedArrays(value);
};

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"available-typed-arrays":28,"call-bind/callBound":29,"for-each":32,"gopd":36,"has-tostringtag/shams":39,"is-typed-array":45}]},{},[20,22,18,1]);
