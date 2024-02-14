import {errorPost, Post} from './post.js';
import {Coordinates} from './coordinates.js';
import {LoremIpsum} from 'lorem-ipsum';
import {generateUserName} from './name.js';

// TODO: refactor storage code to use async/await instead of callbacks

const LOCATIONS = {
    Dubai: [
        [new Coordinates(25.242, 55.265), new Coordinates(25.09, 55.277)],
        [new Coordinates(25.052, 55.083), new Coordinates(25.029, 55.249)],
    ],
    'Abu Dhabi': [
        [
            new Coordinates(24.5331584, 54.2911381),
            new Coordinates(24.2569141, 54.7468883),
        ],
    ],
    Sharjah: [
        [
            new Coordinates(25.436686, 55.5943483),
            new Coordinates(25.2035094, 55.7350787),
        ],
        [
            new Coordinates(25.3710612, 55.3800216),
            new Coordinates(25.2786538, 55.5936607),
        ],
    ],
    Ajman: [
        [
            new Coordinates(25.447991, 55.4266038),
            new Coordinates(25.3707634, 55.5937516),
        ],
    ],
    'Umm Al Quwain': [
        [
            new Coordinates(25.6104851, 55.5215468),
            new Coordinates(25.4897926, 55.5987958),
        ],
    ],
    'Ras Al Khaimah': [
        [
            new Coordinates(25.8852487, 55.8768338),
            new Coordinates(25.5499713, 56.0599856),
        ],
    ],
    Fujairah: [
        [
            new Coordinates(25.186068, 56.2880822),
            new Coordinates(25.1008202, 56.3587572),
        ],
    ],
};

const CATEGORIES = [
    'For Sale',
    'Services',
    'Jobs',
    'Housing',
    'Community',
    'Gigs',
    'Discussion Forums',
    'Resumes',
];

const randomCategory = () =>
    CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];

var currentLocation = 'Dubai';

export function getCurrentLocation() {
    return currentLocation;
}

export function setCurrentLocation(location) {
    currentLocation = location;
}

const DATABASE_VERSION = 1;

const USER_LISTINGS_MIN_COUNT = 3;
const USER_LISTINGS_MAX_COUNT = 17;

const INITIAL_LISTINGS_MIN_COUNT = 7;
const INITIAL_LISTINGS_MAX_COUNT = 17;

const LOCAL = 'You';

navigator.geolocation.getCurrentPosition(() => {});

export var locationListeners = [];

export function changeLocation(location) {
    currentLocation = location.split(',')[0];
    locationListeners.forEach((listener) => listener(currentLocation));
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
function generateRandomPost(
    isLocalUser,
    location,
    postIdGenerator,
    imageIdGenerator,
    query,
    category
) {
    function generateRandomTimeBiased() {
        // function used to bias
        const func = (x) => Math.log(x + 1) / Math.log(2);
        let rand = Math.random();
        if (rand < func(0.14)) {
            return generateRandomNumber(0, 1000 * 60 * 60 * 5);
        } else if (rand < func(0.25)) {
            return generateRandomNumber(
                1000 * 60 * 60 * 5,
                1000 * 60 * 60 * 24
            );
        } else if (rand < func(0.5)) {
            return generateRandomNumber(
                1000 * 60 * 60 * 24,
                1000 * 60 * 60 * 24 * 3
            );
        } else if (rand < func(0.75)) {
            return generateRandomNumber(
                1000 * 60 * 60 * 24 * 3,
                1000 * 60 * 60 * 24 * 7
            );
        } else {
            return generateRandomNumber(
                1000 * 60 * 60 * 24 * 7,
                1000 * 60 * 60 * 24 * 30
            );
        }
    }

    function generateRandomLocation() {
        const locationAreas = LOCATIONS[location];
        const chosenArea =
            locationAreas[generateRandomNumber(0, locationAreas.length)];
        const minLatitude = Math.min(
            chosenArea[0].latitude,
            chosenArea[1].latitude
        );
        const maxLatitude = Math.max(
            chosenArea[0].latitude,
            chosenArea[1].latitude
        );
        const minLongitude = Math.min(
            chosenArea[0].longitude,
            chosenArea[1].longitude
        );
        const maxLongitude = Math.max(
            chosenArea[0].longitude,
            chosenArea[1].longitude
        );
        return new Coordinates(
            Math.random() * (maxLatitude - minLatitude) + minLatitude,
            Math.random() * (maxLongitude - minLongitude) + minLongitude
        );
    }

    let images = [];
    for (let i = 0; i < generateRandomNumber(1, 8); i++) {
        images.push(
            `https://picsum.photos/900/570?random=${
                imageIdGenerator.next().value
            }`
        );
    }

    // https://www.npmjs.com/package/lorem-ipsum
    const lorem = new LoremIpsum({
        wordsPerSentence: {
            min: 3,
            max: 7,
        },
        sentencesPerParagraph: {
            min: 5,
            max: 20,
        },
    });

    const properties = [];

    const propertyCount = generateRandomNumber(3, 15);
    for (let i = 0; i < propertyCount; i++) {
        properties.push(`${lorem.generateWords(1)}:${lorem.generateWords(1)}`);
    }

    return new Post(
        postIdGenerator.next().value,
        lorem.generateSentences(1).replace('.', ''),
        lorem.generateParagraphs(1),
        Date.now() - generateRandomTimeBiased(),
        generateRandomNumber(400, 900000).toPrecision(3),
        category ?? randomCategory(),
        properties,
        generateRandomLocation().toObject(),
        images,
        isLocalUser == true ? LOCAL : generateUserName(),
        query
    ).toObject();
}

function createListingsStore(db, location) {
    let listingsStore;
    if (!db.objectStoreNames.contains(location)) {
        console.log('creating listings store');
        listingsStore = db.createObjectStore(location, {
            keyPath: 'id',
        });
    } else {
        listingsStore = db
            .transaction(location, 'readwrite')
            .objectStore(location);
    }

    // create timestamp index
    if (!listingsStore.indexNames.contains('timestamp')) {
        listingsStore.createIndex('timestamp', 'timestamp', {
            unique: false,
        });
    }
    // create price index
    if (!listingsStore.indexNames.contains('price')) {
        listingsStore.createIndex('price', 'price', {unique: false});
    }
    //create title index
    if (!listingsStore.indexNames.contains('title')) {
        listingsStore.createIndex('title', 'title', {unique: false});
    }
    // create description index
    if (!listingsStore.indexNames.contains('description')) {
        listingsStore.createIndex('description', 'description', {
            unique: false,
        });
    }
    // create location index
    if (!listingsStore.indexNames.contains('location')) {
        listingsStore.createIndex('location', 'location', {unique: false});
    }
    //create category index
    if (!listingsStore.indexNames.contains('category')) {
        listingsStore.createIndex('category', 'category', {unique: false});
    }
    // create author index
    if (!listingsStore.indexNames.contains('author')) {
        listingsStore.createIndex('author', 'author', {unique: false});
    }
    // create query index
    if (!listingsStore.indexNames.contains('query')) {
        listingsStore.createIndex('query', 'query', {unique: false});
    }

    // create query, category index
    if (!listingsStore.indexNames.contains('query,category')) {
        listingsStore.createIndex('query,category', ['query', 'category'], {
            unique: false,
        });
    }
}

function createListingsData(db, oncomplete) {
    return new Promise(async (resolve, reject) => {
        console.log('creating listings data');

        // * User Listings
        // create user listings store
        let listings = db
            .transaction(currentLocation, 'readwrite')
            .objectStore(currentLocation);

        // create error post
        function addErrorPost() {
            return new Promise((resolve, reject) => {
                let putRequest = listings.put(errorPost.toObject());
                putRequest.onsuccess = resolve;
                putRequest.onerror = reject;
            });
        }

        await addErrorPost();

        // create listings if they don't exist

        //get user listings count
        function getUserListingsCount() {
            return new Promise((resolve) => {
                const countRequest = listings.index('author').count('You');
                countRequest.onsuccess = (event) => {
                    console.log(
                        `number of user listings: ${countRequest.result}`
                    );
                    resolve(countRequest.result);
                };
            });
        }

        let numOfUserListings = await getUserListingsCount();

        function addRandomListing(isLocalUser, idGenerator, imageIdGenerator) {
            return new Promise((resolve, reject) => {
                let putRequest = listings.put(
                    generateRandomPost(
                        isLocalUser,
                        currentLocation,
                        idGenerator,
                        imageIdGenerator,
                        isLocalUser ? null : ''
                    )
                );
                putRequest.onsuccess = resolve;
                putRequest.onerror = reject;
            });
        }

        if (numOfUserListings < USER_LISTINGS_MIN_COUNT) {
            const randomNumber = generateRandomNumber(
                USER_LISTINGS_MIN_COUNT,
                USER_LISTINGS_MAX_COUNT
            );
            const [postID, imageID] = await getLatestIds(listings);
            const idGenerator = generateId(postID + 1);
            const imageIdGenerator = generateId(
                imageID == 0 ? generateRandomNumber(0, 150) : imageID + 1
            );

            for (let i = 0; i < randomNumber; i++) {
                await addRandomListing(true, idGenerator, imageIdGenerator);
            }
        }

        // * Listings
        //get user listings count
        function getListingsCount() {
            return new Promise((resolve) => {
                const countRequest = listings.count();
                countRequest.onsuccess = (event) => {
                    console.log(
                        `number of user listings: ${countRequest.result}`
                    );
                    resolve(countRequest.result);
                };
            });
        }

        const numOfListings =
            (await getListingsCount()) - (await getUserListingsCount());

        if (numOfListings < INITIAL_LISTINGS_MIN_COUNT) {
            const randomNumber = generateRandomNumber(
                INITIAL_LISTINGS_MIN_COUNT,
                INITIAL_LISTINGS_MAX_COUNT
            );
            const [postID, imageID] = await getLatestIds(listings);
            const idGenerator = generateId(postID + 1);
            const imageIdGenerator = generateId(
                imageID == 0 ? generateRandomNumber(0, 150) : imageID + 1
            );
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

export function getUserListings(oncomplete) {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('Listings', DATABASE_VERSION);

        request.onerror = (event) => {
            console.error(
                'Error accessing database',
                event.target.errorCode,
                event.target.error
            );
        };

        request.onupgradeneeded = async () => {
            console.log('running onupgradeneeded');
            for (const [key, value] of Object.entries(LOCATIONS)) {
                createListingsStore(request.result, key);
            }
        };

        request.onsuccess = (event) => {
            console.log('running onsuccess');
            const db = request.result;
            db.onerror = (event) => {
                console.error('Database error: ', event.target.errorCode);
            };
            const transaction = db.transaction(currentLocation, 'readonly');
            const store = transaction.objectStore(currentLocation);
            const index = store.index('author');
            const range = IDBKeyRange.only('You');
            const indexRequest = index.getAll(range);
            indexRequest.onsuccess = (event) => {
                if (oncomplete) {
                    oncomplete(indexRequest.result);
                }
                resolve(indexRequest.result);
            };
        };
    });
}

export async function getAllListings(oncomplete, isLocalUser) {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('Listings', DATABASE_VERSION);

        request.onerror = (event) => {
            console.error(
                'Error accessing database',
                event.target.errorCode,
                event.target.error
            );
        };

        request.onupgradeneeded = async () => {
            console.log('running onupgradeneeded');
            for (const [key, value] of Object.entries(LOCATIONS)) {
                createListingsStore(request.result, key);
            }
        };

        request.onsuccess = (event) => {
            console.log('running onsuccess');
            const db = request.result;
            db.onerror = (event) => {
                console.error('Database error: ', event.target.errorCode);
            };
            const transaction = db.transaction(currentLocation, 'readonly');
            const store = transaction.objectStore(currentLocation);
            const index = store.index('author');
            const userListingsCountRequest = index.count('You');
            userListingsCountRequest.onsuccess = () => {
                const allListingsCountRequest = store.count();
                allListingsCountRequest.onsuccess = () => {
                    const nonUserListingsCount =
                        allListingsCountRequest.result -
                        userListingsCountRequest.result;
                    if (
                        nonUserListingsCount < INITIAL_LISTINGS_MIN_COUNT ||
                        userListingsCountRequest.result <
                            USER_LISTINGS_MIN_COUNT
                    ) {
                        createListingsData(db, () =>
                            getAllListings(oncomplete)
                        );
                    } else {
                        // TODO: low priority: use cursor to get posts within the MAX values in case database gets too big
                        const listingsRequest = store.getAll();
                        listingsRequest.onsuccess = () => {
                            const posts = listingsRequest.result.map((obj) =>
                                Post.fromObject(obj)
                            );
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
            return new Promise((resolve) => {
                const request = store.getAllKeys();
                request.onsuccess = (event) => {
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
                    const lastPictureUrl =
                        highestIdImages[highestIdImages.length - 1];
                    let lastPictureRandomId = parseInt(
                        lastPictureUrl.substring(
                            lastPictureUrl.indexOf('random=') +
                                'random='.length,
                            lastPictureUrl.length
                        )
                    );
                    if (Number.isNaN(lastPictureRandomId)) {
                        lastPictureRandomId = 0;
                    }
                    console.log(
                        'highestId',
                        highestId,
                        'lastPictureRandomId',
                        lastPictureRandomId
                    );
                    resolve([highestId, lastPictureRandomId]);
                };
            }
        }
        if (store == undefined || store == null) {
            const request = indexedDB.open('Listings', DATABASE_VERSION);

            request.onerror = (event) => {
                console.error(
                    'Error accessing database',
                    event.target.errorCode,
                    event.target.error
                );
            };

            request.onupgradeneeded = async () => {
                console.log('running onupgradeneeded');
                for (const [key, value] of Object.entries(LOCATIONS)) {
                    createListingsStore(request.result, key);
                }
            };

            request.onsuccess = async (event) => {
                console.log('running onsuccess');
                const db = request.result;
                db.onerror = (event) => {
                    console.error('Database error: ', event.target.errorCode);
                };
                const transaction = db.transaction(
                    currentLocation,
                    'readwrite'
                );
                const store = transaction.objectStore(currentLocation);

                getAllPostKeys(store).then((keys) => {
                    afterGetAllPostKeys(keys, store);
                });
            };
        } else {
            getAllPostKeys(store).then((keys) => {
                afterGetAllPostKeys(keys, store);
            });
        }
    });
}

export function addUserPost(oncomplete) {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('Listings', DATABASE_VERSION);

        request.onerror = (event) => {
            console.error(
                'Error accessing database',
                event.target.errorCode,
                event.target.error
            );
        };

        request.onupgradeneeded = async () => {
            console.log('running onupgradeneeded');
            for (const [key, value] of Object.entries(LOCATIONS)) {
                createListingsStore(request.result, key);
            }
        };

        request.onsuccess = async (event) => {
            const db = request.result;
            const store = db
                .transaction(currentLocation, 'readwrite')
                .objectStore(currentLocation);
            const [highestId, lastPictureRandomId] = await getLatestIds(store);

            let idGenerator = generateId(parseInt(highestId) + 1);
            let imageIdGenerator = generateId(
                parseInt(lastPictureRandomId) + 1
            );
            const post = generateRandomPost(
                true,
                currentLocation,
                idGenerator,
                imageIdGenerator,
                null
            );
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

export function search(query, category) {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('Listings', DATABASE_VERSION);

        request.onerror = (event) => {
            console.error(
                'Error accessing database',
                event.target.errorCode,
                event.target.error
            );
        };

        request.onupgradeneeded = async () => {
            console.log('running onupgradeneeded');
            for (const [key, value] of Object.entries(LOCATIONS)) {
                createListingsStore(request.result, key);
            }
        };

        request.onsuccess = async (event) => {
            const db = request.result;
            const store = db
                .transaction(currentLocation, 'readwrite')
                .objectStore(currentLocation);

            function searchForQuery() {
                return new Promise((resolve) => {
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
                        resolve(
                            queryRequest.result
                                .map((obj) => Post.fromObject(obj))
                                .filter((post) => post.author != 'You')
                        );
                    };
                });
            }

            function createPostsForQuery() {
                return new Promise(async (resolve) => {
                    console.log('creating posts for query');
                    const [highestId, lastPictureRandomId] = await getLatestIds(
                        store
                    );
                    console.log(
                        'highest id',
                        highestId,
                        'last pic id',
                        lastPictureRandomId
                    );
                    let idGenerator = generateId(parseInt(highestId) + 1);
                    let imageIdGenerator = generateId(
                        parseInt(lastPictureRandomId) + 1
                    );
                    const random = Math.random();
                    console.log('random', random);
                    if (random > 0.15) {
                        function addPost(post) {
                            return new Promise((resolve) => {
                                const putRequest = store.put(post);
                                putRequest.onsuccess = () => {
                                    resolve();
                                };
                            });
                        }
                        const numToGenerate =
                            Math.floor(Math.random() * 30) + 1;
                        const posts = [];

                        console.log('num to generate', numToGenerate);

                        for (let i = 0; i < numToGenerate; i++) {
                            const post = generateRandomPost(
                                false,
                                currentLocation,
                                idGenerator,
                                imageIdGenerator,
                                query
                            );
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

export function getPost(id) {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('Listings', DATABASE_VERSION);

        request.onerror = (event) => {
            console.error(
                'Error accessing database',
                event.target.errorCode,
                event.target.error
            );
        };

        request.onupgradeneeded = async () => {
            console.log('running onupgradeneeded');
            for (const [key, value] of Object.entries(LOCATIONS)) {
                createListingsStore(request.result, key);
            }
        };

        request.onsuccess = async (event) => {
            const db = request.result;
            const store = db
                .transaction(currentLocation, 'readwrite')
                .objectStore(currentLocation);

            const getRequest = store.get(parseInt(id));
            getRequest.onsuccess = async () => {
                if (getRequest.result) {
                    resolve(Post.fromObject(getRequest.result));
                } else {
                    resolve(await getPost(0));
                }
            };
        };
    });
}
