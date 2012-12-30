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
    tc.add(1);
    test.equal("01:00:00:01", tc.toString());
    tc.add(30);
    test.equal("01:00:01:01", tc.toString());
    tc.add(30*60);
    test.equal("01:01:01:01", tc.toString());
    tc.add(30*3600);
    test.equal("02:01:01:01", tc.toString());
    tc.add(timecode.init({framerate: "29.97", timecode: "01:00:00:00"}));
    test.equal("03:01:01:01", tc.toString());
    tc.add("00:33:22:11");
    test.equal("03:34:23:12", tc.toString());
    tc.subtract("00:00:00:01");
    test.equal("03:34:23:11", tc.toString());
    //test.throw();

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
    tc.add(1);
    test.equal("01:00:00:01", tc.toString());
    tc.add(30);
    test.equal("01:00:01:01", tc.toString());
    tc.add(30*60);
    test.equal("01:01:01:01", tc.toString());
    tc.add(30*3600);
    test.equal("02:01:01:01", tc.toString());
    
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
    
    tc = timecode.init({
        framerate: "29.97",
        //timecode: 108000,
        timecode: "01:00:00;00",
        drop_frame: true
    });
    test.equal("29.97", tc.framerate);
    test.equal(30, tc.int_framerate);
    test.equal(true, tc.drop_frame);
    test.equal(1, tc.hours);
    test.equal(0, tc.minutes);
    test.equal(0, tc.seconds);
    test.equal(0, tc.frames);
    test.equal(107892, tc.frame_count);
    test.equal("01:00:00;00", tc.toString());
    tc.add(1);
    test.equal("01:00:00;01", tc.toString());
/*
    tc.add(30);
    test.equal("01:00:01;01", tc.toString());
    tc.add(30*60);
    test.equal("01:01:01;01", tc.toString());
    tc.add(30*3600);
    test.equal("02:01:01;01", tc.toString());
*/

    tc = timecode.init({
        framerate: "29.97",
        timecode: "01:00:00;00",
        drop_frame: true
    });
    test.equal("29.97", tc.framerate);
    test.equal(30, tc.int_framerate);
    test.equal(true, tc.drop_frame);
    test.equal(1, tc.hours);
    test.equal(0, tc.minutes);
    test.equal(0, tc.seconds);
    test.equal(0, tc.frames);
    test.equal(107892, tc.frame_count);
    test.equal("01:00:00;00", tc.toString());
    tc.add(30*60);
    //tc.add("00:01:00;00");
    test.equal("01:01:00;02", tc.toString());
    tc.add("00:30:00;00");
    test.equal("01:31:00;02", tc.toString());
    
    tc = timecode.init({
        framerate: "29.97",
        timecode: "01:00:01;00",
        drop_frame: true
    });
    test.equal("29.97", tc.framerate);
    test.equal(30, tc.int_framerate);
    test.equal(true, tc.drop_frame);
    test.equal(1, tc.hours);
    test.equal(0, tc.minutes);
    test.equal(1, tc.seconds);
    test.equal(0, tc.frames);
    test.equal(107922, tc.frame_count);
    test.equal("01:00:01;00", tc.toString());
    //tc.add(30*60);
    tc.add("00:01:00;00");
    test.equal("01:01:01;00", tc.toString());
    tc.add("00:30:00;00");
    test.equal("01:31:01;00", tc.toString());

    //console.log(tc.frameNumberToDropFrameTimecode(108000));
    //console.log(tc.dropFrameTimecodeToFrameNumber([1, 0, 3, 18]));

    test.done();


};
