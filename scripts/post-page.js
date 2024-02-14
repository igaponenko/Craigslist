import {Coordinates, getLocation} from './coordinates.js';
import {errorPost} from './post.js';
import {getPost} from './storage.js';

window.addEventListener('DOMContentLoaded', async () => {
    const url = new URL(window.location);
    if (!url.searchParams.get('id')) {
        url.searchParams.set('id', 0);
        window.history.replaceState({}, '', url);
    }
    try {
        if (!Coordinates.userLocation) {
            Coordinates.userLocation = await getLocation();
        }
    } finally {
        const post = (await getPost(url.searchParams.get('id'))) ?? errorPost;

        let slideIndex = 1;

        function plusSlides(n) {
            showSlides((slideIndex += n));
        }

        function currentSlide(n) {
            showSlides((slideIndex = n));
        }

        function showSlides(n) {
            let i;
            let slides = document.getElementsByClassName('mySlides');
            let dots = document.getElementsByClassName('dot');
            if (n > slides.length) {
                slideIndex = 1;
            }
            if (n < 1) {
                slideIndex = slides.length;
            }
            for (i = 0; i < slides.length; i++) {
                slides[i].style.display = 'none';
            }
            for (i = 0; i < dots.length; i++) {
                dots[i].className = dots[i].className.replace(' active', '');
            }
            slides[slideIndex - 1].style.display = 'block';
            dots[slideIndex - 1].className += ' active';
        }

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

        const attributesFromStr = (str) => {
            let HTMLElements = [];
            let attributes = str.split(',');
            for (let i = 0; i < attributes.length; i++) {
                const attributeArray = attributes[i].split(':');
                const element = document.createElement('span');
                element.innerHTML = `
                <span class="in-line-children" style="display: block">
                    <b>${attributeArray[0]}: </b>
                    <p>${attributeArray[1]}</p>
                </span>
                `;

                HTMLElements.push(element);
            }
            return HTMLElements;
        };

        const priceToStr = (strNum) =>
            `AED ${Number(strNum).toLocaleString('en-US') ?? 'ERR'}`;

        document.getElementById('title').innerText = post.title;
        document.getElementById('description').innerText = post.description;
        document.getElementById('category').innerText = post.category;
        document.getElementById('price').innerText = priceToStr(post.price);
        document.getElementById('author').innerText = post.author;
        document.getElementById('timestamp').innerText =
            new Date(post.timestamp).toLocaleString() +
            ` (${timeSince(post.timestamp)})`;
        document.getElementById('distance').innerText = `${Math.floor(
            Coordinates.fromObject(post.location).distanceTo(
                Coordinates.userLocation
            )
        )}km away`;
        const propertiesParent = document.getElementById(
            'post-properties-parent'
        );

        post.properties.forEach((element) => {
            propertiesParent.appendChild(...attributesFromStr(element));
        });

        const pictures = post.imgSrc;
        const slideshowContainer = document.getElementById(
            'slideshow-container'
        );
        const dotContainer = document.getElementById('dot-container');

        for (let i = 0; i < pictures.length; i++) {
            const slide = document.createElement('div');
            slide.className = 'mySlides fade';
            slide.innerHTML = `<img src="${pictures[i]}" style="width:100%">`;
            slideshowContainer.appendChild(slide);

            const dot = document.createElement('span');
            dot.className = 'dot';
            dot.onclick = () => currentSlide(i + 1);
            dotContainer.appendChild(dot);
        }
        const previousButton = document.createElement('a');
        previousButton.innerHTML = `<a class="prev">❮</a>`;
        previousButton.onclick = () => plusSlides(-1);
        const nextButton = document.createElement('a');
        nextButton.innerHTML = `<a class="next">❯</a>`;
        nextButton.onclick = () => plusSlides(1);

        slideshowContainer.appendChild(previousButton);
        slideshowContainer.appendChild(nextButton);
        showSlides(slideIndex);

        // document.getElementById('currentSlide-1').onclick = () =>
        //     currentSlide(1);
        // document.getElementById('currentSlide-2').onclick = () =>
        //     currentSlide(2);
        // document.getElementById('currentSlide-3').onclick = () =>
        //     currentSlide(3);
        // document.getElementById('plusSlides-minuts-1').onclick = () =>
        //     plusSlides(-1);
        // document.getElementById('plusSlides-1').onclick = () => plusSlides(1);
    }
});
