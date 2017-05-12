/**
 * ActivityController
 *
 * @description :: Server-side logic for managing activities
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
function weekday(number) {
    return days[number];
}

function displayedDuration(minutes) {
    if (minutes == 60) {
        return "1h";
    }
    if (minutes == 90) {
        return "1h30";
    }
    if (minutes == 100) {
        return "1h40";
    }
    if (minutes == 120) {
        return "2h";
    }
    if (minutes == 150) {
        return "2h30";
    }
    if (minutes == 180) {
        return "3h";
    }
    if (minutes > 180) {
        return Math.round(minutes/60) + "h";
    }

    return "" + minutes + "min";
}


var source = require("./amsterdam.json");

var talks = new Array(source.talks.length);

var TZoffset = 1; // UTC + 1 for Rome
source.talks.forEach(function (item, index) {
    var event = {};
    event.id = item.id;
    event.summary = item.title;
    event.description = item.description;
    event.location = item.room;
    event.url = "http://rome2017.codemotionworld.com/wp-content/themes/event/detail-talk.php?detail=" + item.id;

    event.type = item.type; // talk, lab, keynote,
    event.language = item.language; // Italian, English
    event.topic = item.topic; // Architectures, Inspirational, Design/Frontend, DevOps
    event.level = item.level; // Beginner, Intermediate
    
    event.beginDate = new Date(item.date+"T"+item.starttime+".000Z");
    var beginDateLocal = new Date(event.beginDate.getTime() - 3600000*TZoffset);
    event.beginDay = weekday(beginDateLocal.getDay());
    event.beginTime = item.starttime.substring(0, 5);
    event.beginDate = beginDateLocal;

    event.endDate = new Date(item.date+"T"+item.endtime+".000Z");
    var endDateLocal = new Date(event.endDate.getTime() - 3600000*TZoffset);
    event.endDay = weekday(endDateLocal.getDay());
    event.endTime = item.endtime.substring(0, 5);
    event.endDate = endDateLocal;

    event.duration = displayedDuration((event.endDate.getTime() - event.beginDate.getTime()) / 1000 / 60);
    talks[index] = event;
});


var sorted = talks.sort(function (a, b) {
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return a.beginDate - b.beginDate;
});


module.exports = {
    findAll: function (req, res) {
        return res.json(200, sorted);
    },

    findNext: function (req, res) {
        var now = req.param('date');
        if (!now) {
            now = new Date(Date.now());
        }
        else {
            now = new Date(now);
        }
        
        // set limit
        var limit = req.param('max');
        if (!limit) {
            limit = 10;
        }

        var events = [];
        var found = 0;
        sorted.forEach(function (item) {
            if ((found < limit) && (item.beginDate > now)) {
                events.push(item);
                found++;
            }

        });

        return res.json(200, events);
    },

    findCurrent: function (req, res) {
        // check if there is a date specified
        var now = req.param('date');
        if (!now) {
            now = new Date(Date.now());
        }
        else {
            now = new Date(now);
        }
        
        var events = [];
        sorted.forEach(function (item) {
            if ((now >= item.beginDate) && (now < item.endDate)) {
                events.push(item);
            }
        });

        return res.json(200, events);
    }
};









