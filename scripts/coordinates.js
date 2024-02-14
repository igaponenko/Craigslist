export class Coordinates {
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
            longitude: this.longitude,
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

        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(coord1.latitude)) *
                Math.cos(deg2rad(coord2.latitude)) *
                Math.sin(dLon / 2) *
                Math.sin(dLon / 2);
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
        return new Coordinates(
            position.coords.latitude,
            position.coords.longitude
        );
    }

    static fromGeolocationCoordinates(coords) {
        return new Coordinates(coords.latitude, coords.longitude);
    }
}

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
                            const coords = Coordinates.fromObject(
                                JSON.parse(geoHttp.responseText)
                            );

                            console.log(coords);

                            Coordinates.userLocation = coords;
                            resolve(coords);
                        }
                    };
                    geoHttp.open('GET', `https://ipapi.co/${ip}/json/`, true);
                    geoHttp.onerror = (error) => {
                        console.log('geohttp', error);
                        Coordinates.userLocation = null;
                        resolve(null);
                    };
                    geoHttp.send();
                }
            };
            ipHttp.open('GET', 'https://api.ipify.org?format=json', true);
            ipHttp.onerror = (error) => {
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

export function getLocation() {
    return new Promise(async (resolve, reject) => {
        // resolve if the function takes more than 10 seconds
        setTimeout(() => resolve(), 10 * 1000);
        if (!getLocationCalled) {
            getLocationCalled = true;
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        console.log(
                            'getting location from navigator.geolocation'
                        );
                        const coords =
                            Coordinates.fromGeolocationPosition(position);
                        Coordinates.userLocation = coords;
                        resolve(coords);
                    },
                    async (_) => {
                        console.log('getting location from ip address');
                        resolve(await getLocationFromIPAddress());
                    }
                );
            } else {
                console.log('getting location from ip address');
                resolve(await getLocationFromIPAddress());
            }
        } else {
            while (Coordinates.userLocation === undefined) {
                // wait for 100ms
                await new Promise((resolve) => setTimeout(resolve, 100));
            }
            resolve(Coordinates.userLocation);
        }
    });
}

getLocation();
