$(function () {
    $("#SearchForm").submit(function (e) {
        e.preventDefault();
        if (IsValid($(this).find("input[type=submit]"))) {
            sessionStorage.removeItem("Params");
            $.when(SetParams()).then(function () {
                HotelListSearch('PropertyName', 'ASC');
            });
            return false;
        }
    });
    HotelListSearch('ApartmentName', 'ASC');
    loadFavorite();
    $("input:checkbox").change(function () {
        StarIds = '';
        $("input:checkbox").each(function () {
            var $this = $(this);
            if ($this.is(":checked")) {
                StarIds = $this.val() + ',' + StarIds;
            }
        });
        StarIds = StarIds.slice(0, -1);
        HotelListSearch('PropertyName', 'ASC');
    });
    if (sessionStorage.getItem("Params") != null) {
        var params = JSON.parse(sessionStorage.getItem("Params"));
        $("#CheckIn").val(params.StartDate);
        $("#CheckOut").val(params.EndDate);
        $("#Destination").val(params.Destination);
        $("#Adults").val(params.Adults);
        $("#Kids").val(params.Kids);
        $("#Infants").val(params.Infants);
        $("#Destination").attr("data-level", params.FilterEntityName);
        $("#Destination").attr("data-code", params.FilterId);
    }
});

function DateFormate(dateinput) {
    var D = new Date(dateinput);
    var Day = D.getDate() < 10 ? "0" + D.getDate() : D.getDate();
    var Mon = (D.getMonth() + 1) < 10 ? "0" + (D.getMonth() + 1) : D.getMonth() + 1;
    var Year = D.getFullYear();
    return Year + "" + Mon + "" + Day;

}
//***********************Sorting Functions************************
//****************************************************************
var StarIds = '';
function SortTableData(th) {
    var parentId = $(th).attr("id");
    var orderby = $("#" + parentId).attr("data-sort");
    var order = $("#" + parentId).attr("data-order");
    HotelListSearch(orderby, order);
    return false;
}

function HotelListSearch(orderby, order) {
    var params = JSON.parse(sessionStorage.getItem("Params"));
    var param = [{ "name": "StartDate", "value": DateFormate(params.StartDate) }, { "name": "CultureCode", "value": __LoggedInCultureCode },
        { "name": "EndDate", "value": DateFormate(params.EndDate) }, { "name": "FilterEntityName", "value": params.FilterEntityName }, { "name": "FilterId", "value": params.FilterId }, { "name": "OrderBy", "value": orderby + ' ' + order }, { "name": "requiredStarsIds", "value": StarIds }];
    console.log(param);
    Selector(param, "Reservations.aspx/HotelListSearch").then(function (result) {
        var dt = JSON.parse(result.d);
        console.log(dt);
        CreateTemplate(dt);
    });
}
function CreateTemplate(dt) {
    var table = $(".egr-hotels-container table").DataTable();
    var images = new Array("hotel1.jpg", "hotel2.jpg", "hotel3.jpg", "hotel4.jpg", "hotel1.jpg", "hotel2.jpg", "hotel3.jpg", "hotel4.jpg");
    table.destroy();
    $(".egr-hotels-container table tbody").empty();
    for (var i = 0; i < dt.length; i++) {
        var template = '<div class="col-sm-12 egr-s-hotel">';
        template += '               <div class="col-xs-12 col-sm-4 col-md-3 col-lg-3 img-style">';
        template += '                 <div class="flexslider" id="hotel-s-slider' + i + '"> ';
        template += '                      <ul class="slides" id="Slide' + i + '"> ';
        template += '                   </ul></div> <div class="hotel-sm-desc">';
        template += '                   <h5 class="egr-hotel-title2"> <i class="icon soap-icon-hotel" ></i> ' + dt[i].ApartmentName + '-' + dt[i].PropertyName + '-' + dt[i].CityName + '</h5>';
        template += '                   <h5 class="egr-hotel-title2"> <i class="icon fa fa-eye" style="margin-right:5px" > </i> <a href="#">' + __ViewSimillarProp + '<a/> </h5> <br /> <span style="display:block;text-align:center"> </div>';
        template += '                </div>';
        template += '                <div class="col-xs-12 col-sm-8 col-md-9 col-lg-9 egr-ht-pad egr-no-pad">';
        template += '                   <h4 class"egr-hotel-title">' + dt[i].ApartmentName + '-' + dt[i].PropertyName + '-' + dt[i].CityName + ' <span class="egr-hotel-cond">Excellent <span class="egr-rate">' + dt[i].ReviewsScore + '</span></span></h4>';
        template += '                    <p class="text-muted hotel-adrs"><i class="fa fa-map-marker"></i>  Federico Vial 3, Santander , City Center: 1.11 KM </p>'
        template += '                    <div class="col-sm-12 egr-hotel-detail egr-no-pad">';
        template += '                       <div class="col-sm-12 egr-no-pad">';
        template += '                           <ul class="nav nav-inline">';
        template += '                                <li class="nav-item">';
        template += '                                        ' + hotelStars(i, dt[i].StarsId) + '';
        //template += '                                    <strong><span class="text-muted">' + __Str_Booked + ' <span class="label label-danger">152</span> ' + __Str_tt + '</span></strong>';
        template += '                                </li>';
        template += '                                <li class="nav-item pull-right egr-favorite"><a href="#" onclick="AddToFavoriteList(' + dt[i].ApartmentId + ',\'' + dt[i].DBCode + '\',2)" class="nav-link"><i class="fa fa-heart-o"></i> ' + __Favorite + '</a></li>';
        template += '                               </ul></div>';
        template += '                         <div class="col-sm-12 egr-no-pad egr-hotel-facilities">';
        template += '                              <ul class="nav nav-inline"> <li class="nav-item">';
        template += '                                    <a href="#" class="nav-link"><div class="egr-review input-group"><span class="input-group-addon"><i class="fa fa-thumbs-up yellow"></i></span><span>' + dt[i].ReviewsCount + '</span><small>' + __Reviews + '</small></div></a></li>';
        //template += '                                  <li class="nav-item">';
        //template += '                                     ' + hotelStars(i, dt[i].StarsId) + '</li>';
        template += '                            <li class="nav-item pull-right">';
        template += '                               <small>Avg/Night</small>          ';

        template += '</li></ul>';
        template += '                               <ul class="nav nav-inline bordered-ul">';
        template += '                                  <li class="nav-item ">';
        template += '                                       <a href="#" class="nav-link"><i class="fa fa-signal"></i></a>';
        template += '                                   </li>';
        template += '                                  <li class="nav-item ">';
        template += '                                        <a href="#" class="nav-link"><i class="fa fa-clock-o"></i></a>';
        template += '                                   </li>';
        template += '                                   <li class="nav-item ">';
        template += '                                      <a href="#" class="nav-link"><i class="fa fa-desktop"></i></a>';
        template += '                                  </li>';
        template += '                                  <li class="nav-item">';
        template += '                                      <a href="#" class="nav-link"><i class="fa fa-umbrella"></i></a>';
        template += '                                  </li></ul>';
        template += '                                   <span class="egr-price-d"><a href="#" class="nav-link"><span>SAR-</span> <span>' + dt[i].Rate + '</span></a></span>';

        template += '  </div></div>';
        template += '                      <div class="col-sm-12 egr-no-pad">';
        //template += '                         <p class="egr-hotel-desc">';
        //template += '                            ' + dt[i].ApartmentDescription + '';
        //template += '                          </p>';
        template += '                          <div class="col-sm-12 egr-no-pad">';
        template += '                             <ul class="nav nav-inline egr-hotel-footer">';
        template += '                                 <li class="nav-item ">';
        template += '                                     <a href="#" onclick="HotelDetail(\'' + dt[i].DBCode + '\',\'' + dt[i].BranchCode + '\',\'' + dt[i].PropertyId + '\')"   class="nav-link active"> ' + __ViewHotDetails + '</a>';
        template += '                                 </li>';

        template += '                                 <li class="nav-item ">';
        template += '                                    <a href="#" onclick="HotelDetail(\'' + dt[i].DBCode + '\',\'' + dt[i].BranchCode + '\',\'' + dt[i].PropertyId + '\')" class="nav-link">' + __ViewApaDetails + '</a></li>';
        template += '                                    <li class="nav-item ">';
        template += '                                    <a href="#" class="nav-link no-b">' + __MakeInquirey + '</a></li>';
        template += '                                     <li class="nav-item pull-right"><a href="#" onclick="Booking(\'' + dt[i].DBCode + '\',\'' + dt[i].ApartmentName + '-' + dt[i].PropertyName + '-' + dt[i].CityName + '\',\'' + dt[i].ApartmentId + '\',\'' + dt[i].ApartmentDescription + '\',\'' + dt[i].Rate + '\',\'' + dt[i].StarsId + '\')" class="btn btn-yellow">' + __BookNow + '</a></li></ul>  </div></div></div></div>';
        $(".egr-hotels-container table tbody").append("<tr><td>" + template + "</td></tr>");
        if (dt[i].PictureIds != '' && dt[i].PictureIds != null && dt[i].PictureIds != undefined) {
            var PictuesArray = dt[i].PictureIds.split(",");
            var Num = PictuesArray.length < 5 ? PictuesArray.length : 5;
            var DBCode = dt[i].DBCode;
            for (var j = 0; j < Num; j++) {
                $("#Slide" + i + "").append('<li>  <img src="../../ImageGraber/ImageSelect.ashx?containercode=' + DBCode + '&PictureId=' + PictuesArray[j] + '" /></li> ');
            }
        }
        else {
            $("#Slide" + i + "").append('<li>  <img src="../../css/images/INF.gif" /></li> ');
        }
    }
    table = $(".egr-hotels-container table").DataTable({
        "autoWidth": false,
        "bFilter": false,
        "bLengthChange": false,
        "bInfo": false,
        "bSort": false
    });

    $(".egr-wait-overlay").hide();

    var idelay = 0;
    var ii = 0;
    $('body').find(".flexslider").each(function (k, e) {
        ii++;
        if (ii <= 5) {
            $(e).flexslider({
                animation: "slide",
                controlNav: false,
                initDelay: idelay,
                slideshowSpeed: 2500,
                randomize: true
            });
            idelay = idelay + 1300;
        } else {
            ii = 0;
            idelay = 0;
            $(e).flexslider({
                animation: "fade",
                controlNav: false,
                initDelay: 0,
                slideshowSpeed: 2500
            });
        }

    });

    $('.egr-colapse').on('click', function (e) {
        var curA = $(this);
        var caret = $(curA).find("i");
        if ($("body").attr("dir") === "rtl") {
            if (caret.is(".rtl-rotate")) {
                $(curA).find("i").removeClass("rtl-rotate");
            } else {
                $(curA).find("i").addClass("rtl-rotate");
            }
        } else {
            if (caret.is(".rotate")) {
                $(curA).find("i").removeClass("rotate");
            } else {
                $(curA).find("i").addClass("rotate");
            }
        }
    });

}
function HotelDetail(DBC, BC, PropertyId) {
    var obj = { 'BranchCode': BC, 'DBCode': DBC, 'CultureCode': __LoggedInCultureCode, 'PropertyId': PropertyId }
    sessionStorage.setItem("HDParams", JSON.stringify(obj));
    window.open("HotelDetails.aspx", "_blank");
}
function Booking(DBCode, ApartmentName, ApartmentId, Description, Charges, StarsId) {
    var obj = { 'DBCode': DBCode, 'ApartmentName': ApartmentName, 'ApartmentId': ApartmentId, 'Description': Description, 'Charges': Charges, 'StarsId': StarIds }
    sessionStorage.setItem("BookingParams", JSON.stringify(obj));
    console.log(JSON.stringify(obj));
    window.open("booking.aspx", "_blank");
}
function SetParams() {
    var obj = {
        'StartDate': $("#CheckIn").val(), 'EndDate': $("#CheckOut").val(), 'FilterEntityName': $("#Destination").attr("data-level"),
        'FilterId': $("#Destination").attr("data-code"), 'Adults': $("#Adults").val(), 'Kids': $("#Kids").val(), 'Infants': $("#Infants").val()
    }
    return sessionStorage.setItem("Params", JSON.stringify(obj));
}

function hotelStars(i, stars) {
    var star1 = "",
        star2 = "",
        star3 = "",
        star4 = "",
        star5 = "";
    if (stars == 1) { star2 = "grey"; star3 = "grey"; star4 = "grey"; star5 = "hidden"; star1 = "checked='checked'" }
    if (stars == 2) { star2 = "checked='checked'"; star3 = "grey"; star4 = "grey"; star5 = "grey"; }
    if (stars == 3) { star3 = "checked='checked'"; star4 = "grey"; star5 = "grey"; }
    if (stars == 4) { star4 = "checked='checked'"; star5 = "grey"; }
    if (stars == 5) { star5 = "checked='checked'"; }
    if (stars == 0) { star1 = "hidden"; star2 = "hidden"; star3 = "hidden"; star4 = "hidden"; star5 = "hidden"; }
    template = '                                          <a href="#" class="nav-link"> <div class="rating">';
    template += '                                           <input type="radio" id="star5" name="star' + i + '" value="5" /><label class="full ' + star5 + '" for="star5" ></label>';
    template += '                                           <input type="radio" id="star40" name="star' + i + '" value="4"  /><label class="full ' + star4 + '" for="star4" ></label>';
    template += '                                           <input type="radio" id="star30" name="star' + i + '" value="3"  /><label class="full ' + star3 + '" for="star3" ></label>';
    template += '                                           <input type="radio" id="star20" name="star' + i + '" value="2"  /><label class="full ' + star2 + '" for="star2" ></label>';
    template += '                                            <input type="radio" id="star10" name="star' + i + '" value="1" ' + star1 + ' /><label class="full ' + star1 + '" for="star1"></label>';
    template += '                                           </div></a>';
    return template;
}

function FavoriteListSelect(DBCode, ApartmentId) {
    var params = JSON.parse(sessionStorage.getItem("Params"));
    var param = [{ "name": "StartDate", "value": params.StartDate }, { "name": "EndDate", "value": params.EndDate },
        { "name": "ApartmentId", "value": ApartmentId }, { "name": "DBCode", "value": DBCode }, { "name": "CultureCode", "value": __LoggedInCultureCode }];
    Selector(param, "Reservations.aspx/ApartmentSelect_CustomerFavoriteApartments").then(function (result) {
        var dt = JSON.parse(result.d);
        console.log(dt);
        CreateTemplate(dt);
    });

}

function loadFavorite() {
    if (parseInt(sessionStorage.getItem("__customerID")) !== -1 && sessionStorage.getItem("__customerID") != undefined) {
        var param = [{ "name": "CustomerId ", "value": sessionStorage.getItem("__customerID") }, { "name": "CultureCode", "value": __LoggedInCultureCode }, { "name": "PropertyTypeId", "value": 1 }]
        Selector(param, "Reservations.aspx/CustomerFavoriteProperties_SELECT").then(function (result) {
            var dt = JSON.parse(result.d);
            for (var i = 0; i < dt.length; i++) {
                $(".myfav").append('<li class="nav-item"> <a href="#" onclick="FavoriteListSelect(\'' + dt[i].DBCode + '\',\'' + dt[i].PropertyId + '\')" class="nav-link"><i class="fa fa-heart"></i>' + dt[i].PropertyName + ' </a></li>');
            }
        });
    }
}