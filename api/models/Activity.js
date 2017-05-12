/**
 * Activity.js
 *
 * @description :: Activities in the DevNet zone
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  autoPK:false,
  schema:true,

  attributes: {
    id: {
      type: 'string', // short url to access the activity
      primaryKey: true
    },

    title: {
      type: 'string',
      required: true
    },

     url: {
       type: 'string', // where to get details about the session
       required: true
     },

     description: {
       type: 'string', // summary of what's happening
       size: 2048,
       required: true
     },

    beginDate: {
      type: 'datetime',  // UTC format
      required: true
    },

    beginTime: {
      type: 'string',  // local time 
      required: true
    },

    beginDay: {
      type: 'string', // local time
      enum: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
      required: true
    },    

    endDate: {
      type: 'datetime', // local time format
       required: true
    },

  endTime: {
      type: 'string',  // local time 
     required: true
   },

    endDay: {
      type: 'string', // local time
      enum: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
      required: true
   }, 

    duration: {
      type: 'string', // local time format
       required: true
    },

    category: { 
      type: 'string',
      //enum: ['workshop', 'session', 'panel', 'demo', 'lab', 'event', 'keynote'],
      defaultsTo: 'session',
      required: true
    },

    technology: { 
      type: 'string',
      //enum: ['workshop', 'session', 'panel', 'demo', 'lab', 'event', 'keynote'],
      required: true
    },

    location: {
      type: 'string',
      //enum: ['ClassRoom1', 'ClassRoom2', 'DemoPods', 'LearningLab', 'Theater', 'WorkBench1', 'WorkBench2', 'WorkBench3', 'WorkBench4', 'DevNetZone'],
      required: true
    },

    location_url: {
      type: 'url',
      defaultsTo: 'https://developer.cisco.com/site/DevNetZone/',
      required: true
    },

    speaker: { 
      type: 'string', // May contain several speakers name
      required: true
    },

    speaker_email: { 
      type: 'string', // May contain several speakers name
      required: true
    },

    speaker_url: { 
      type: 'string', // Only to one speaker
      required: true
    },

    // Hide internal structure
    toJSON: function () {
      var obj = this.toObject();
      delete obj.createdAt;
      delete obj.updatedAt;
      return obj;
    }

  }
};

