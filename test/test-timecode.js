var assert = require("assert"),
    timecode = require("../lib/timecode").Timecode;

exports["Timecode"] = function(test) {
    var tc;
    
    tc = timecode.init({
        framerate: "29.97",
        timecode: "01:00:00:00",
    });
    test.equal("29.97", tc.framerate);
    test.equal(30, tc.int_framerate);
    test.equal(false, tc.drop_frame);
    test.equal(1, tc.hours);
    test.equal(0, tc.minutes);
    test.equal(0, tc.seconds);
    test.equal(0, tc.frames);
    test.equal(108000, tc.frame_count);
    
    tc = timecode.init({
        framerate: "29.97",
        timecode: 108000,
    });
    test.equal("29.97", tc.framerate);
    test.equal(30, tc.int_framerate);
    test.equal(false, tc.drop_frame);
    test.equal(1, tc.hours);
    test.equal(0, tc.minutes);
    test.equal(0, tc.seconds);
    test.equal(0, tc.frames);
    test.equal(108000, tc.frame_count);
    
    tc = timecode.init({
        framerate: "23.98",
        timecode: "01:00:00:00",
    });
    test.equal("23.98", tc.framerate);
    test.equal(24, tc.int_framerate);
    test.equal(false, tc.drop_frame);
    test.equal(1, tc.hours);
    test.equal(0, tc.minutes);
    test.equal(0, tc.seconds);
    test.equal(0, tc.frames);
    test.equal(86400, tc.frame_count);
    
    tc = timecode.init({
        framerate: "23.98",
        timecode: 86400,
    });
    test.equal("23.98", tc.framerate);
    test.equal(24, tc.int_framerate);
    test.equal(false, tc.drop_frame);
    test.equal(1, tc.hours);
    test.equal(0, tc.minutes);
    test.equal(0, tc.seconds);
    test.equal(0, tc.frames);
    test.equal(86400, tc.frame_count);
    
    test.done();
};
