# Digital-Touchscreen-Vis-Aid

Job ID :

JIRA :

Server : http://localhost:8100/

GIT:


**Sizes**
- 1920 x 1080

## Build requirements

To build and run the site locally, you'll need:

* Node.js
* Gulp
* LiveReload
* Ruby
* Sass
* Gem sass-globbing, scss_lint


## Installation

`npm install` for node_modules

`packages.json` must be filled in correctly by developer(s)


### FFMPEG

`brew install ffmpeg`

`brew install ffmpeg --with-fdk-aac --with-ffplay --with-freetype --with-frei0r --with-libass --with-libvo-aacenc --with-libvorbis --with-libvpx --with-opencore-amr --with-openjpeg --with-opus --with-rtmpdump --with-schroedinger --with-speex --with-theora --with-tools`


## Build

`gulp clean` -> clean _dist folder

`gulp build` -> create _dist folder and all folders and files

`gulp serve` -> localhost run

`gulp watch` -> watch changes

ftppass.json file required!

Note : create ftppass.json file with following logic

```javascript
  {
    user: ""  // your username
    pass: ""  // your username
  }
```

## Test

`gulp lintCSS` -> test CSS files

`gulp lintHTML` -> test HTML files

`gulp lintJS` -> test JS files


Please contact dan@danstein.net
