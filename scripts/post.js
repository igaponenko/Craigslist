import {Coordinates} from './coordinates.js';

export class Post {
    constructor(
        id,
        title,
        description,
        timestamp,
        price,
        category,
        properties,
        location,
        imgSrc,
        author,
        query = ''
    ) {
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
        return new Post(
            obj.id,
            obj.title,
            obj.description,
            obj.timestamp,
            obj.price,
            obj.category,
            obj.properties,
            obj.location,
            obj.imgSrc,
            obj.author,
            obj.query
        );
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
            return (
                Array.isArray(a) &&
                Array.isArray(b) &&
                a.length === b.length &&
                a.every((val, index) => val === b[index])
            );
        }

        return (
            post1.id == post2.id &&
            post1.title == post2.title &&
            post1.description == post2.description &&
            post1.timestamp == post2.timestamp &&
            post1.price == post2.price &&
            post1.category == post2.category &&
            post1.properties == post2.properties &&
            post1.location.latitude == post2.location.latitude &&
            post1.location.longitude == post2.location.longitude &&
            arrayEquals(post1.imgSrc, post2.imgSrc) &&
            arrayEquals(post1.properties, post2.properties) &&
            post1.author == post2.author &&
            post1.query == post2.query
        );
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
            query: this.query,
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

export const errorPost = new Post(
    0,
    'Error: Post not found',
    'Post not found',
    0,
    0,
    'error',
    'error: error',
    new Coordinates(0, 0).toObject(),
    ['assets/images/error.png'],
    'error',
    null
);
