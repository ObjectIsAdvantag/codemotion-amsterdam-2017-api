# Event API for CodeMotion Amsterdam 2017

This code loads the Code Motion Amstderam conference JSON and exposes the talks as a REST API:

- [GET /](https://codemotion-amsterdam-2017.herokuapp.com/) : returns all events, sorted by date ASC
- [GET /next](https://codemotion-amsterdam-2017.herokuapp.com/next): shows upcoming activities from now (now being the exact moment when the request is issued)
- [GET /now](https://codemotion-amsterdam-2017.herokuapp.com/now) : returns events happening now (now being the exact moment when the request is issued)
- [GET /now?date=2017-05-16T09:41:00.000Z](https://codemotion-amsterdam-2017.herokuapp.com/next?date=2017-05-16T09:41:00.000Z) : returns events happening after the specified date (in order to simulate how the API will behave in a few hours/days)
- [GET /next?max=20](https://codemotion-amsterdam-2017.herokuapp.com/next?max=20) : returns the next 20 upcoming events 

Note that the `date` & `max` query parameters apply to both /next and /now resources.



**If you're attending the CodeMotion conference on May 16,17th, 
check [Cisco's presence](https://github.com/CiscoDevNet/codemotion-amsterdam-2017): 
join the keynote, attend a talk, or take a codelabs**

> Don't miss the CodeMotion Voice Machine: call and listen the upcoming talks via Tropo Text to Speech
>
>    call **+31-20-808-7350**



## Architecture

Brought to you by the [Cisco DevNet team](https://developer.cisco.com) and [Heroku Free Dynos](https://devcenter.heroku.com/articles/free-dyno-hours): 
leave about 30s for the API to wake up if it has not been invoked during the last 30 minutes.

This API is deployed on [Heroku](https://codemotion-amsterdam-2017.herokuapp.com/).

If you want to dig into the code:
- this project is leveraging the [SailsJS framework](http://sailsjs.org): although the data are fetch from a static [JSON file](api/controllers/amsterdam.json), the same API can easilly be exposed from a PostGreSQL DB, check [this PostGreSQL example](https://github.com/ObjectIsAdvantag/CodeMotionMilan2016), 
- the [ActivityController](api/controllers/ActivityController.js) is where the magic happens,



## MIT License

Feel free to use, reuse, extend, and contribute