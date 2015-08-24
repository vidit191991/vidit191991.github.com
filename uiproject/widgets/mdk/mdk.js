function mdk(userid, htmlId) {
    var templates = {};

    var model = {
        address: "",
        views: [],
        courses: [],
        mode: "driving",
        scourse: 0,
		gettingthere: true,
        buildingsList: [],
		updatestring: "",
		ready: false,

        addCourse: function(course) {
            this.courses.push(course);
        },
        /**
         * Add a new view to be notified when the model changes.
         */
        addView: function(view) {
            this.views.push(view);
        },
		isReady: function(){
			var result = this.ready;
			if (!this.ready){
				this.ready = (this.updatestring.indexOf("scourse") > -1) && (this.updatestring.indexOf("buildings") > -1);
			}
			return result;
		},
        /**
         * Update all of the views that are observing us.
         */
        updateViews: function(msg) {
			if (!this.ready){
				this.updatestring += msg;
			}
			console.log(msg);
            var i = 0;
            for (i = 0; i < this.views.length; i++) {
                this.views[i].updateView(msg);
            }
			this.isReady();
        },
        iscurterm: function(term) {
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth(); //January is 0!
            var yy = today.getFullYear().toString().substr(2);
            if (mm >= 1 && mm < 5) mm = 1;
            else if (mm >= 5 && mm < 9) mm = 5;
            else mm = 9;
            //console.log(mm+"/"+yy);
			if ((term.substr(1, 2) == yy) && (mm == term.substring(3))) return true;
            else return false;
        },

        createCourse: function(title, desc, room, time, days, type, id) {
            var new_course = {};
            new_course["title"] = title;
            new_course["id"] = id;
            new_course["desc"] = desc;
            new_course["room"] = room;
            new_course["time"] = time;
            new_course["days"] = days;
            new_course["type"] = type;
            return new_course;
        },
        loadCourses: function() {
            var that = this;
            // getJSON can fail silently.  It may be better (and only slightly more work)
            // to use $.ajax -- or write your own version of getJSON that does not fail silently.
			model.ready = false;
            var course1json = '{'
                +'"title" : "Software Design and Architecture",'
                +'"desc"  : 32,'
                +'"type" : "LEC"'
                +'"room" : "MC 4021"'
                +'"time" : 1-2:30pm'
                +'"days" : May 6 - July 27'
                +'"id" : CS 446'
                +'}';
            var course2json = '{'
                +'"title" : "Distributed Sytems",'
                +'"desc"  : 32,'
                +'"type" : "LEC"'
                +'"room" : "RCH 306"'
                +'"time" : 1-2:30pm'
                +'"days" : May 6 - July 27'
                +'"id" : CS 454'
                +'}';
            var course3json = '{'
                +'"title" : "Computer Networks",'
                +'"desc"  : 32,'
                +'"type" : "LEC"'
                +'"room" : "RCH 309"'
                +'"time" : 1-2:30pm'
                +'"days" : May 6 - July 27'
                +'"id" : CS 456'
                +'}';

            that.addCourse(that.createCourse("Databases", "Topics include: Relation Algebra, SQL, etc ",
                "MC 4020", "2-3:30pm", "May 6- July 27", "LEC", "CS348"));
            that.addCourse(that.createCourse("Algorithms", "Topics include; Dynamic Programming, Algorithm Runtime Analysis, etc",
                "RCH 4020", "1-2:30pm", "May 6- July 27", "LEC", "CS341"));
            that.addCourse(that.createCourse("Testing", "Topics include: Unit Testing, Regression Testing, Various Coverage Techniques ...  ",
                "QNC 4020", "10-11:30pm", "May 6- July 27", "LEC", "CS447"));
            that.setSelectedCourse(0);
            that.updateViews("course");
            model.ready = true;
            /*$.getJSON("https://cs349.student.cs.uwaterloo.ca:9410/api/v1/student/stdCourseDetails/" + userid,
                function(d) {
                    if (d.meta.status === "200 OK") {
                        var allterms = d.result.terms;
                        var allcourses;
                        var type;
                        var course = {};
                        for (var i = 0; i < allterms.length; i++) {
                            if (that.iscurterm(allterms[i].term)) {
                                allcourses = allterms[i].courses;
                                for (var j = 0; j < allcourses.length; j++) {
                                    course["title"] = allcourses[j].subjectCode + " " + allcourses[j].catalog;
                                    course["desc"] = allcourses[j].courseShortTitle;
                                    for (var k = 0; k < allcourses[j].sections.length; k++) {
                                        type = allcourses[j].sections[k].componentCode;
                                        if (type === "TST") continue;
                                        course["type"] = type;
                                        if (type === "LEC") {
                                            course["type"] = "LECTURE";
                                        } else if (type === "TUT") {
                                            course["type"] = "TUTORIAL";
                                        }
                                        for (var l = 0; l < allcourses[j].sections[k].meets.length; l++) {
                                            course["room"] = allcourses[j].sections[k].meets[l].room;
                                            course["time"] = allcourses[j].sections[k].meets[l].meetTimes;
                                            course["days"] = allcourses[j].sections[k].meets[l].meetDays;
                                            course["id"] = l;
                                            //console.log(course["room"] + course["time"] + course["days"]);
                                            that.addCourse(that.createCourse(course["title"], course["desc"],
                                                course["room"], course["time"], course["days"], course["type"]), course["id"]);
                                        }
                                    }
                                }

                            }
                        }
                        that.setSelectedCourse(0);
                        that.updateViews("course");
						model.ready = true;
                    } else {
                        that.course = {};
                        that.updateViews("error");
                        //console.log("Failed to read course data." + JSON.stringify(d.meta));
                    }
                });*/

        },
        loadBuildings: function() {
            var that = this;
			model.ready = false;
            // getJSON can fail silently.  It may be better (and only slightly more work)
            // to use $.ajax -- or write your own version of getJSON that does not fail silently.

        /*    $.getJSON("https://api.uwaterloo.ca/v2/buildings/list.JSON?key=0dbaf7b7fe4f620a228d5e58343b2d06",
                function(d) {
                    if (d.meta.status === 200) {
                     //   //console.log("Success to get the buildings list");
                        that.buildingsList = d.data;
                        that.updateViews("buildings");
						model.ready = true;
                    } else {
                        that.updateViews("error");
                     //   //console.log("Failed to get building list" + JSON.stringify(d.meta));
                    }
                });*/


        },
        print: function() {
            if (this.courses.length === 0) {
                //console.log("fatal error courses length is zero");
            }
            for (var i = 0; i < this.courses.length; i++) {
                //console.log(this.courses[i].title + " " + this.courses[i].desc + " " + this.courses[i].time + " " + this.courses[i].days + " " + this.courses[i].room);
            }
        },
        setAddress: function(newaddress) {
            //console.log("address changed to:" + newaddress);
            this.address = newaddress;
            this.updateViews("address");
        },
		addressCheck: function(){
			if (this.address){
				return false;
			}
			return true;
		},
        setMode: function(newmode) {
            //console.log("mode changed to:" + newmode);
            this.mode = newmode;
            this.updateViews("mode");
        },
        setSelectedCourse: function(newcourse) {
            //console.log("selected course changed to:" + newcourse);
            this.scourse = newcourse;
            this.updateViews("scourse");
        },
        buildinginfo: function(building_code) {

            for (var i = this.buildingsList.length - 1; i >= 0; i--) {
                if (this.buildingsList[i].building_code === building_code) {
                    //console.log("found " + building_code + " which is " + this.buildingsList[i].building_name);
                    return this.buildingsList[i];
                }
            }

            //console.log("No building found with building_code=" + building_code);

            var Default = {
                latitude: 43.472761,
                longitude: -80.542164
            };

            return Default;
        }


    };
    var inputbox = {
        model: {},
		locate: {
			lat:"",
			lng:""
		},
        init: function(themodel) {
            model = themodel;
            model.addView(this);
            this.initController();
        },
		navCallback: function(position){
			var loc = {};
			loc.lat=position.coords.latitude;
			loc.lng=position.coords.longitude;
			var geocoder = new google.maps.Geocoder();
			var latLng = new google.maps.LatLng(loc.lat, loc.lng);
			var fallback = "";
			if (geocoder) {
				geocoder.geocode({'latLng': latLng}, function (results, status) {
				var address = "";
				if (status == google.maps.GeocoderStatus.OK) { 
					address = results[0].formatted_address;
				}
				else {
					address = loc.lat + " , " + loc.lng;
				}
				//console.log("Geoloc success: " + address);
				$('#mdk_addr').val(address);
				model.setAddress(address);
				}); 
			}else{
				fallback = loc.lat + " , " + loc.lng;
				$('#mdk_addr').val(fallback);
				model.setAddress(fallback);
				//console.log("Geoloc failure: " + fallback);
			} 
			
			
		},
		tryGeoloc: function(){
			if (navigator.gelocation) return;
			navigator.geolocation.getCurrentPosition(this.navCallback);
		},
        updateView: function(msg) {
            
        },
        initController: function() {
            $("#mdk_addr").change(function() {
				model.setAddress($("#mdk_addr").val());
            });
        }

    };
    var courseBtnView = {
        model: {},
        init: function(themodel) {
            model = themodel;
            model.addView(this);
            this.initController();
        },
        updateView: function(msg) {
            //console.log("CourseView updateview");
            var t = "";
            if (msg === "course") {
				if (model.courses.length > 0){
				    t += Mustache.render(templates.mdk_activeCourseButton, model.courses[0]);
				}
                for (var m = 1; m < model.courses.length; m++) {
                    t += Mustache.render(templates.mdk_courseButton, model.courses[m]);
                }
				$("#mdk_courseButtons").html(t);
            } 
        },
        initController: function() {

            $("#mdk_courseButtons").on("click", "label", function(event) {
                //console.log("course clicked");
                var $button = $(event.currentTarget);
                model.setSelectedCourse($button.index());
            });

        }
    };
	
	var courseDetView = {
		model: {},
		init: function(themodel) {
			model = themodel;
			model.addView(this);
		},
		updateView: function(msg) {
			if (msg === "scourse") {
                var t = Mustache.render(templates.mdk_courseDetails, model.courses[model.scourse]);
                $("#mdk_courseDets").html(t);
				
			} 
		}
	}
	
	var locateMeView = {
		model: {},
		init: function(themodel) {
			model = themodel;
			this.initController();
		},
		updateView: function(msg) {
		},
		initController: function(){
		   $("#mdk_locatemebtn").click(function() {
				if (googleLoaded){
					$("#mdk_dirpanel").html("Loading your address...");
					inputbox.tryGeoloc();
				}else {
					$("#mdk_dirpanel").html("Failed to locate you.. Please use manual entry.");
				}
            });	
		}
	}
	var timeSwitchView = {
	    model: {},
        init: function(themodel) {
            model = themodel;
			this.initController();
        },updateView: function(msg) {
			//do nothing
        },
        initController: function() {
		   $("#mdk_gthere").click(function() {
				if (!model.gettingthere){
					model.gettingthere = true;
					model.updateViews("origin");
				}
			});	
			$("#mdk_gback").click(function() {
				if (model.gettingthere){
					model.gettingthere = false;
					model.updateViews("origin");
				}
            });	
		
		}
    
	}
    var modeView = {
        model: {},
        init: function(themodel) {
            model = themodel;

            this.initView();
            this.initController();
            model.addView(this);

        },
        createMode: function(mode) {
            var new_mode = {};
            new_mode["mode"] = mode;
            return new_mode;
        },
        updateView: function(msg) {
			//do nothing
        },
        initView: function() {
            //console.log("INIT mode view");
        },
        initController: function() {
            //console.log("INIT mode controllers");

            var id = document.getElementById('mdk_driveB');
            //console.log("Mode controllers found id? " + id);
            id = document.getElementById('mdk_busB');
            //console.log("Mode controllers found id? " + id);
            id = document.getElementById('mdk_walkB');
            //console.log("Mode controllers found id? " + id);
            $("#mdk_driveB").click(function() {
                model.setMode("driving");
            });

            $("#mdk_busB").click(function() {

                model.setMode("bus");

            });
            $("#mdk_walkB").click(function() {

                model.setMode("walking");

            });
            $("#mdk_bikeB").click(function() {

                model.setMode("biking");

            });




        }
    };
	var timeout;
	var failtimes = 0;
    var directionView = {
		model: {},
        init: function(themodel) {
            model = themodel;
            model.addView(this);
        },
        updateView: function(msg) {
            //console.log("directionView updateview");
            if (msg === "course" || msg === "buildings") return;
			if (msg === "error"){
				$("#mdk_dirpanel").html("<p>ERROR: Unable to retrieve university building and/or course data.<br/>Please try again shortly after refreshing the page.</p>");
				return;
			}
			if (model.addressCheck()){
				if (model.isReady()){
					$("#mdk_dirpanel").html("<p>ERROR: Please type in an address." + "</p>");
				}
				return;
			}
			$("#mdk_dirpanel").html("Loading directions...");

            if (googleLoaded) {
                var tmode;
                if (model.mode === "bus") {
                    tmode = google.maps.TravelMode.TRANSIT;
//                    //console.log("bus");
                } else if (model.mode === "walking") {
                    tmode = google.maps.TravelMode.WALKING;
//                    //console.log("walking");
                } else if (model.mode === "biking"){
					tmode = google.maps.TravelMode.BICYCLING;
				} else {
                    tmode = google.maps.TravelMode.DRIVING;
//                    //console.log("driving");
                }


                var directionsService = new google.maps.DirectionsService();
                var directionsDisplay = new google.maps.DirectionsRenderer();
//                //console.log("address: " + model.address);

				
                var today = new Date();
                var hours; 
                var minutes;
				//13:30-14:20
				if (model.gettingthere){
					hours = model.courses[model.scourse].time.substr(0, 2);
					minutes = model.courses[model.scourse].time.substr(3, 2);
				}else{
					hours = model.courses[model.scourse].time.substr(6, 2);
					minutes = model.courses[model.scourse].time.substr(9, 2);
				}
//                console.log(model.courses[model.scourse].time + "***" + hours + "***" + minutes   + "***");

                today.setHours(hours);
                today.setMinutes(minutes);

                var transit = {};
				if (model.gettingthere){
					transit["arrivalTime"] = today;
				}else{
					transit["departureTime"] = today;
				}
				
                var building_code = model.courses[model.scourse].room.split(" ")[0];
                var building_info = model.buildinginfo(building_code);

                var dirRequest = {
                    origin: model.address,
                    destination: new google.maps.LatLng(building_info.latitude, building_info.longitude),
                    travelMode: tmode,
                    transitOptions: transit,
                    unitSystem: google.maps.UnitSystem.METRIC,
                    region: "ca"

                };
				if (!model.gettingthere){
					var temp = dirRequest.origin;
					dirRequest.origin = dirRequest.destination;
					dirRequest.destination = temp;
				}

                //console.log(dirRequest.destination);


                var id = document.getElementById('mdk_map');
                //console.log("found id? " + id);

                directionsDisplay.setPanel(document.getElementById('mdk_dirpanel'));
                directionsService.route(dirRequest, function(result, status) {
                    if (status === google.maps.DirectionsStatus.OK) {
					    $("#mdk_dirpanel").html("");
                        directionsDisplay.setDirections(result);
                    } else {
						failtimes++;
						//console.log("Request failed. Retrying... " + failtimes);
						if (failtimes >= 3){
							$("#mdk_dirpanel").html("No results found.<br/>This could be caused by a lack of network connectivity, or a transit directions request originating too far from the university.<br/>");
						}else{
							clearTimeout(timeout);
							timeout = setTimeout(function() {
								model.setMode(model.mode);//refresh	
							}, 1000);
						}
					}
				});
                //console.log("GMaps init complete!");
            }

        }
	};
    var isWindowLoaded = false;

    function loadScript() {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&' + 'callback=googleMapsLoaded';
        document.body.appendChild(script);

    }
    var googleLoaded = false;
    // create a global callback
    window.googleMapsLoaded = function() {
        googleLoaded = true;
        //console.log("Google Maps API loaded.");


    };

    // load API using the "callback" parameter


    function windowLoaded() {
        //console.log("Window loaded!");
        isWindowLoaded = true;

    }
    window.onload = windowLoaded;
    //console.log("Initializing mdk(" + userid + ", " + htmlId + ")");
    portal.loadTemplates("widgets/mdk/templates.json",
        function(t) {
            templates = t;
            $(htmlId).html(templates.baseHtml);


            courseBtnView.init(model);
			courseDetView.init(model);
            inputbox.init(model);
            directionView.init(model);
            modeView.init(model);
			locateMeView.init(model);
			timeSwitchView.init(model);
            model.loadCourses();
            model.loadBuildings();
            if (isWindowLoaded) {
                loadScript();
            } else {
                window.onload = loadScript();
            }

        }
    );
}