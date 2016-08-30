/* default.aspx ----> Reservation.life
-------------------------------------------
1.3 Flexslider Iniatialization
  !
  !---> 1.3.1 Popular Hotels Flexslider Iniatialization
  !---> 1.3.2 Popular Hotels Flexslider Iniatialization
  !---> 1.3.3 Slider Hotels Flexslider Iniatialization
  !---> 1.3.4 Client Saying Flexslider Iniatialization

1.4 Function Google Map Initialization
*/
(function () {

    if (sessionStorage.getItem("TabID") !== undefined && sessionStorage.getItem("TabID") !== null) {
        $(".Rem").removeClass("active");
        $("#" + sessionStorage.getItem("TabID")).addClass("active");
        $("#" + $("#" + sessionStorage.getItem("TabID")).attr("data-tab")).addClass("active");
    }
    /*------------------ 1.3 Flexslider Iniatialization  --------------------*/
    sessionStorage.setItem("CulturCode", "en-US");
    // store the slider in a local variable
    var $window = $(window),
        flexslider = { vars: {} };

    // tiny helper function to add breakpoints
    function getGridSize() {
        return (window.innerWidth < 600) ? 1 :
        (window.innerWidth < 900) ? 3 : 4;
    }

    function getGridSize1() {
        return (window.innerWidth < 600) ? 2 :
        (window.innerWidth < 900) ? 4 : 6;
    }

    function getGridSize2() {
        return (window.innerWidth < 600) ? 1 :
        (window.innerWidth < 900) ? 1 : 1;
    }

    $window.load(function () {

        /*--- 1.3.1 Popular Hotels Flexslider Iniatialization ---*/
        $('#egr-pp-hotels .flexslider').flexslider({
            animation: "slide",
            animationLoop: false,
            itemWidth: 270,
            itemMargin: 15,
            controlNav: false,
            minItems: getGridSize(), // use function to pull in initial value
            maxItems: getGridSize()
        });

        /*--- 1.3.2 Full Slider Flexslider Iniatialization ---*/
        $("#egr-slider-full .flexslider").flexslider({
            animation: "slide"
        });

        /*--- 1.3.3 Slider Hotels Flexslider Iniatialization ---*/
        $('#egr-slider-hotels .flexslider').flexslider({
            animation: "slide",
            animationLoop: false,
            itemWidth: 200,
            itemMargin: 30,
            controlNav: false,
            minItems: getGridSize1(), // use function to pull in initial value
            maxItems: getGridSize1()
        });

        /*--- 1.3.4 Client Saying Flexslider Iniatialization ---*/
        $('#egr-client-sy .flexslider').flexslider({
            animation: "slide",
            animationLoop: false,
            itemWidth: 200,
            itemMargin: 20,
            controlNav: false,
            minItems: getGridSize2(), // use function to pull in initial value
            maxItems: getGridSize2()
        });

    });

    // check grid size on resize event
    $window.resize(function () {
        var gridSize = getGridSize();

        flexslider.vars.minItems = gridSize;
        flexslider.vars.maxItems = gridSize;
    });
    $("#SearchForm").submit(function () {
        var valid = $(this).parsley().validate();
        if (valid) {
            GrandSearch();
            return false;
        } else {
            return false;
        }

    });
    $("#IsterahaSearchForm").submit(function (e) {
        var valid = $(this).parsley().validate();
        if (valid) {
            IsterahaSearch();
            return false;
        } else {
            return false;
        }

    });

    $("#CheckIn").val(DefaultDate(0));
    $("#CheckOut").val(DefaultDate(5));

    AUTC_AutoCompleteMainSearchForIsteraha();
    AUTC_AutcMainSearch();
    //initialize(); //Google map initialization
}($));

//*****************************************************************************************
//***********************  Load Cities & Countries List For Sugestions **************
//*****************************************************************************************
function DefaultDate(inc) {
    var D = new Date();
    D.setDate(D.getDate() + inc);
    var Day = D.getDate() < 10 ? "0" + D.getDate() : D.getDate();
    var Mon = (D.getMonth() + 1) < 10 ? "0" + (D.getMonth() + 1) : D.getMonth() + 1;
    var Year = D.getFullYear();
    return Mon + '/' + Day + '/' + Year;
}
//*****************************************************************************************
//***********************  Isteraha Count **************
//*****************************************************************************************
function IsterahaCount() {
    $("#SearchByCountry tbody").empty();
    if ($("#Destination3").attr("data-level") === "Country") {
        Selector([{ "name": "CultureCode", "value": __LoggedInCultureCode }, { "name": "CountryID", "value": $("#Destination3").attr("data-code") }], "Default.aspx/IsterahaCountByCity").then(function (result) {
            var dt = JSON.parse(result.d);
            for (var i = 0; i < dt.length; i++) {
                $("#SearchByCountry tbody").append('<tr><td onclick="ListPropertiesByCity(\'' + dt[i].CityCode + '\')"><i class="fa fa-hand-o-right"></i> <h4>' + dt[i].CityName + '</h4> <small>Total result(<span>' + dt[i].Total + '</span>)</small> <a href="#"  class="pull-xs-right"><i class="fa fa-eye"> View </a></td></tr>');

            }
        })
    }
    else if ($("#Destination3").attr("data-level") === "City") {
        Selector([{ "name": "CultureCode", "value": __LoggedInCultureCode }, { "name": "FilterId", "value": $("#Destination3").attr("data-code") }], "Default.aspx/IsterahaSearchByCity").then(function (result) {
            var dt = JSON.parse(result.d);
            for (var i = 0; i < dt.length; i++) {
                $("#SearchByCountry tbody").append('<tr><td onclick="ListPropertiesByPropertyID(\'' + dt[i].PropertyId + '\')"><i class="fa fa-hand-o-right"></i> <h4>' + dt[i].PropertyName + '</h4> <small>Total capacity(<span>' + dt[i].Capacity + '</span>)</small> <a href="#"  class="pull-xs-right"><i class="fa fa-eye"> View </a></td></tr>');
            }
        })
    }
    else if ($("#Destination3").attr("data-level") === "Property") {

        $("#SearchByCountry tbody").append('<tr onclick="ListPropertiesByPropertyID(1)"><td class="text-xs-center"><button class="egr-ist-name btn btn-primary btn-sm" href="#"><i class="fa fa-eye"></i> View</button><img style="width:300px;height:150px"  src="../../css/images/h4.jpg" /></td></tr>');
        Selector([{ "name": "CultureCode", "value": __LoggedInCultureCode }, { "name": "FilterId", "value": $("#Destination3").attr("data-code") }], "Default.aspx/IsterahaSearchByCity").then(function (result) {
            var dt = JSON.parse(result.d);
            //$("#SearchByCountry tbody").empty();
            for (var i = 0; i < dt.length; i++) {
                //$("#SearchByCountry tbody").append('<tr onclick="ListPropertiesByPropertyID(1)"><td class="text-xs-center"><h5 class="egr-ist-name">The Ayaz Isteraha,The Ayaz Isteraha,Damam,Riyadh,Saudi Arabia ()</h5><img style="width:300px;height:150px"  src="../css/images/h4.jpg" /></td></tr>');
            }
        })
    }
}
//*****************************************************************************************
//***********************  Isteraha Search **************
//*****************************************************************************************
function IsterahaSearch() {
    var obj = {
        'FilterEntityName': $("#Destination3").attr("data-level"),
        'FilterId': $("#Destination3").attr("data-code"), 'Destination': $("#Destination3").val(), 'MinCapicity': 1, 'MaxCapicity': $("#MaxCapicity").val()
    }
    sessionStorage.setItem("Params", JSON.stringify(obj));
    location.href = "../WebPages/Isteraha/Reservations3.aspx";
}
function ListPropertiesByCity(CItyId) {
    var obj = {
        'FilterEntityName': "City",
        'FilterId': CItyId, 'Destination': $("#Destination3").val(), 'MinCapicity': 1, 'MaxCapicity': $("#MaxCapicity").val()
    }
    sessionStorage.setItem("Params", JSON.stringify(obj));
    location.href = "../WebPages/Isteraha/Reservations3.aspx";
}
function ListPropertiesByPropertyID(PropertID) {
    var obj = {
        'FilterEntityName': "Property",
        'FilterId': PropertID, 'Destination': $("#Destination3").val(), 'MinCapicity': 1, 'MaxCapicity': $("#MaxCapicity").val()
    }
    sessionStorage.setItem("Params", JSON.stringify(obj));
    location.href = "../WebPages/Isteraha/Reservations3.aspx";
}
//*****************************************************************************************
//***********************  Hotel Grand Search **************
//*****************************************************************************************

function GrandSearch() {


    var obj = {
        'StartDate': $("#CheckIn").val(), 'EndDate': $("#CheckOut").val(), 'FilterEntityName': $("#DestinationHotel").attr("data-level"),
        'FilterId': $("#DestinationHotel").attr("data-code"), 'Destination': $("#DestinationHotel").val(), 'Adults': $("#Adults").val(), 'Kids': $("#Kids").val(), 'Infants': $("#Infants").val()
    }
    sessionStorage.setItem("Params", JSON.stringify(obj));
        location.href = "../../WebPages/Hotel/Reservations.aspx";

}
function initialize() {
    var styles = [{ "featureType": "landscape", "elementType": "labels", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit", "elementType": "labels", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi", "elementType": "labels", "stylers": [{ "visibility": "off" }] }, { "featureType": "water", "elementType": "labels", "stylers": [{ "visibility": "off" }] }, { "featureType": "road", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "stylers": [{ "hue": "#00aaff" }, { "saturation": -100 }, { "gamma": 2.15 }, { "lightness": 12 }] }, { "featureType": "road", "elementType": "labels.text.fill", "stylers": [{ "visibility": "on" }, { "lightness": 24 }] }, { "featureType": "road", "elementType": "geometry", "stylers": [{ "lightness": 57 }] }];
    var map;
    var bounds = new google.maps.LatLngBounds();
    var mapOptions = {
        mapTypeId: 'roadmap',
        styles: styles,
    };

    // Display a map on the page
    map = new google.maps.Map(document.getElementById("map_canvas2"), mapOptions);
    map.setTilt(45);

    // Multiple Markers
    var markers = [
        ['Shaza Al Madina, Madina', 24.466164, 39.603233],
        ['Millennium Al Aqeeq Madinah Hotel , Madinah', 24.471957, 39.609471],
        ['Dar Al Iman InterContinental  , Madinah', 24.4701099, 39.607799],
        ['Shaza Al Madina, Madina', 24.47210, 39.606233],
        ['Millennium Al Aqeeq Madinah Hotel , Madinah', 24.473957, 39.605471],
        ['Dar Al Iman InterContinental  , Madinah', 24.4741099, 39.606799],
        ['Shaza Al Madina, Madina', 24.4702964, 39.603453]
    ];
    // Display multiple markers on a map
    var infoWindow = new google.maps.InfoWindow(), marker, i;

    // Loop through our array of markers & place each one on the map  
    for (i = 0; i < markers.length; i++) {
        var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
        bounds.extend(position);
        marker = new google.maps.Marker({
            position: position,
            map: map,
            title: markers[i][0]
        });

        // Automatically center the map fitting all markers on the screen
        map.fitBounds(bounds);
    }

    // Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
    var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function (event) {
        this.setZoom(14);
        google.maps.event.removeListener(boundsListener);
    });

}

function ChangeTab(a) {
    //sessionStorage.setItem("TabID", a.id);
    //var currA = $(a);
    //$(currA).closest("nav").find(".active").removeClass("active");
    //$(currA).addClass("active");

    ////active panel

    //$(".tab-content .active").removeClass("active");
    //var panel = $(currA).attr("href");
    //$(panel).addClass("active");
}