// TODO: put this in home-page.js after testing is done
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
    const isOverflown = ({clientHeight, scrollHeight}) =>
        scrollHeight > clientHeight;

    const resizeText = ({element, parent}) => {
        let i = 8; // let's start with 8px
        let overflow = false;
        const maxSize = 128; // very huge text size

        while (!overflow && i < maxSize) {
            element.style.fontSize = `${i}px`;
            overflow = isOverflown(parent);
            if (!overflow) i++;
        }

        // revert to last state where no overflow happened:
        element.style.fontSize = `${i - 1}px`;
    };

    document
        .querySelectorAll('.category-text')
        .forEach((element) =>
            resizeText({element: element, parent: element.parentElement})
        );

    window.addEventListener('resize', () =>
        document
            .querySelectorAll('.category-text')
            .forEach((element) =>
                resizeText({element: element, parent: element.parentElement})
            )
    );
});
