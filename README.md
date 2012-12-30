# timecode.js

This is a javascript module for manipulating SMPTE timecode.

It is primarily based on [pytimecode](http://code.google.com/p/pytimecode/).

Theoretically it supports 60, 59.94, 50, 30, 29.97, 25, 24, 23.98 frame rates as well as milliseconds, although only 29.97 (drop and non-drop) and 23.98 have been tested.  Timecodes can be created from a number representing the frame count or a string in the form "hh:mm:ss:ff".

## Usage

    > var timecode = require("timecode").Timecode;
    > var tc = timecode.init({framerate: "29.97", timecode: "01:00:00:00"});
    > tc.add(4);
    > tc.add("00:02:03:00");
    > tc.toString();
    '01:02:03:04'

## Testing

    $ npm install -g nodeunit

    $ nodeunit test
