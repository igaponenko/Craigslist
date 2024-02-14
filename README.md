# Craigslist

`index.html` in `~/craigslist` directory

# Important Notice

Because this project uses a [Lorem Ipsum](https://www.npmjs.com/package/lorem-ipsum?activeTab=readme) package from npm, it needs to be packaged along with the rest of the project's javascript. This is done using the [`browserify`](https://www.npmjs.com/package/browserify) and [`esmify`](https://www.npmjs.com/package/esmify) packages. This means that changing a javascript file which contains imports will not take effect until you run `browserify <file> -p esmify > <output>`. Beause there are multiple javascript files, I've made a command which automatically does this to make it easier. You can run it by running `npm run bundle` in the root directory of the project. The output files are contained in the `~/scripts/browser/` directory.

> Note: you need to have `npm` installed and also need to run `npm install` in the root directory of the project to install the required packages. You also need to run `npm install -g browserify` and `npm -install -g esmify` to install the `browserify` and `esmify` packages globally. If you run into errors you can use append `sudo` to the start of the command in unix shells or run the command in an administrator shell on Windows.

# How To Run

## VS Code extensions

Here is a list of recommended VS Code extensions to run this project without needing to start the Apache server every time.

- [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
- [open in browser](https://marketplace.visualstudio.com/items?itemName=techer.open-in-browser)
- [Live Preview](https://marketplace.visualstudio.com/items?itemName=ms-vscode.live-server)

## XAMPP

If you want to run the project using XAMPP you need to change your `httpd.conf` to this directory. Here is a Stack Overflow [answer](https://stackoverflow.com/a/10000000/10000000) on how to do it.

> After changing the directory I got a 403 forbidden error and [this](https://stackoverflow.com/a/60062400/15782390) helped me fix it.
