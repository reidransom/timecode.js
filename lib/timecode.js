if (typeof Object.create !== 'function') {
    Object.create = function (o) {
        var F = function() {};
        F.prototype = o;
        return new F();
    };
}

var Timecode = {
	get: function(dict, name, default_value) {
		if (dict.hasOwnProperty(name)) {
			return dict[name];
		}
		else {
			return default_value;
		}
	},
	init: function(args) {
		var timecode;
		obj = Object.create(this);
		obj.framerate = obj.get(args, "framerate", "29.97");
		obj.int_framerate = obj.getIntFramerate();
		obj.drop_frame = obj.get(args, "drop_frame", false);
		obj.hours = false;
		obj.minutes = false;
		obj.seconds = false;
		obj.frames = false;
		obj.frame_count = false;
		obj.set(obj.get(args, "timecode", 0));
		obj._checkDropFrame();
		return obj;
	},
	getIntFramerate: function() {
		var int_framerate;

		if (this.framerate === "29.97") {
			int_framerate = 30;
		}
		else if (this.framerate === "59.94") {
			int_framerate = 60;
		}
		else if (this.framerate === "23.98") {
			int_framerate = 24;
		}
		else if (this.framerate === "ms") {
			int_framerate = 1000;
		}
		else {
			int_framerate = this.framerate * 1;
		}
		return int_framerate;
	},
	set: function(timecode) {
		if (typeof timecode === "string") {
			this.partsFromString(timecode);
			this.frame_count = this.getFrameCount();
		}
		else if (typeof timecode === "number") {
			//this.partsFromFrameCount(timecode);
			this.frame_count = timecode;
		}
		else {
			// throw an error
		}
		this.partsFromFrameCount(this.frame_count);
	},
	partsFromString: function(timecode) {
		// Parses timecode strings non-drop 'hh:mm:ss:ff', drop 'hh:mm:ss;ff', or milliseconds 'hh:mm:ss:fff'
		if (timecode.length === 11) {
			this.frames = timecode.slice(9, 11) * 1;
		}
		else if ((timecode.length === 12) && (this.framerate === "ms")) {
			this.frames = timecode.slice(9, 12) * 1;
		}
		else {
			throw new Error("Timecode string parsing error. " + timecode);
		}
		this.hours = timecode.slice(0, 2) * 1;
		this.minutes = timecode.slice(3, 5) * 1;
		this.seconds = timecode.slice(6, 8) * 1;
	},
	partsFromFrameCount: function(frame_count) {
		// Converts frame_count to timecode
		var drop_frames, hours, minutes, seconds, frames;
		drop_frames = this.calcDropFrames();
		hours = frame_count / (3600 * this.int_framerate);
		if (hours > 23) {
			hours = hours % 24;
			frame_count = frame_count - (24 * 3600 * self.int_framerate);
		}
		minutes = (frame_count % (3600 * this.int_framerate)) / (60 * this.int_framerate);
		seconds = ((frame_count % (3600 * this.int_framerate)) % (60 * this.int_framerate)) / this.int_framerate;
		frames = ((frame_count % (3600 * this.int_framerate)) % (60 * this.int_framerate)) % this.int_framerate;
		if ((this.drop_frame) && (frames === 0) && (minutes % 10)) {
			if (this.framerate === "59.94") {
				frames = 4;
			}
			else if (this.framerate === "29.97") {
				frames = 2;
			}
		}
		this.hours = hours;
		this.minutes = minutes;
		this.seconds = seconds;
		this.frames = frames;
		this.frame_count = this.getFrameCount();
	},
	getFrameCount: function() {
		return (((this.hours * 3600) + (this.minutes * 60) + this.seconds) * this.int_framerate) + this.frames - this.calcDropFrames();
	},
	calcDropFrames: function() {
		var hours, minutes, extra, mult;
		// Always call calcDropFrames elsewhere becasue non-drop check is done here
		if (! this.drop_frame) {
			return 0;
		}
		if (this.framerate === "59.94") {
			mult = 2;
		}
		else if (this.framerate === "29.97") {
			mult = 1;
		}
		else {
			throw new Error("Only 29.97 and 59.94 rates support dropframe.");
		}
		// calculate from frame_count only
		if ((this.frame_count !== false) && (!(this.hours && this.minutes && this.seconds && this.frames))) {
			hours = this.frame_count / (3600 * this.int_framerate);
			minutes = (this.frame_count % (3600 * this.int_framerate)) / (60 * this.int_framerate);
			if (minutes % 10) {
				extra = 1;
			}
			else {
				extra = 2;
			}
			return (hours * 6 * 18 * mult) + ((minutes / 10) * 18 * mult) + (minutes % 10 * 2 * mult) + (extra * 2 * mult);
		}
		// calculate from hours, minutes, seconds, frames
		return (this.hours * 6 * 18 * mult) + ((this.minutes / 10) * 18 * mult) + (this.minutes % 10 * 2 * mult);
	},
	_checkDropFrame: function() {
		if ((!this.drop_frame) || (this.framerate === "29.97") || (this.framerate === "59.94")) {
			return true;
		}
		else {
			// todo: raise an error "drop_frame only supported for 29.97 and 59.94"
		}
	},
	toString: function() {
		var zeroPad, delim;
		zeroPad = function(number) {
			var pad = (number < 10) ? "0" : "";
			return pad + number;
		};
		delim = (this.drop_frame) ? ";" : ":";
		return zeroPad(this.hours) + ":" + zeroPad(this.minutes) + ":" + zeroPad(this.seconds) + delim + zeroPad(this.frames);
	}
};

var test = function() {
	var tc = Timecode.init({
		framerate: "29.97",
		//timecode: "01:02:03:04"
		timecode: "01:00:00:00",
		drop_frame: false
	});
	console.log("-" + tc.toString() + "-" + tc.frame_count + "-");
};

exports.Timecode = Timecode;

var test = function() {
	var tc = Timecode.init({framerate: "29.97", timecode: "01:01:00:00", drop_frame: true});
	console.log(tc.toString());
	console.log(tc.frame_count);
};
//test();




