# timecode.js

This is a JavaScript module for manipulating SMPTE timecodes.

It is primarily based on [pytimecode](http://code.google.com/p/pytimecode/).

Theoretically it supports 60, 59.94, 50, 30, 29.97, 25, 24, 23.98 frame rates as well as milliseconds, although only 29.97 (drop and non-drop) and 23.98 have been tested.  Timecodes can be created from: 

- a number representing the frame count
- a string in the form "hh:mm:ss:ff"
- a Date() object (year, months and day part are ignored)

## Usage

    > var timecode = require("timecode").Timecode;
    > var tc = timecode.init({framerate: "29.97", timecode: "01:00:00:00"});
    > tc.add(4);
    > tc.add("00:02:03:00");
    > tc.toString();
    '01:02:03:04'

    > var d = new Date();
    > var tc2 = timecode.init({framerate: "29.97", timecode: d, drop_frame:true});
    > tc2.add( new Date(0,0,0,0,1,30) );
    > tc2.toString();
    '17:31:57;22'

## Testing

    $ npm install -g nodeunit
    $ npm test
