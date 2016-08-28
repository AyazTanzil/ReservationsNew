availabilityFormID = "AvailabilityDialog";

selectedPropertyTypeIDS = "";
selectedFilterCode = "";
selectedFilterLevel = 1;
selectedApartmentTypeId = "= 0";

_selectedStartDate = "";
_selectedEndDate = "";
var selectedSearchType = "1"; // Hotel

$(function ()
{
    ChangeContentPageDirectionsOnCulture(); 

    $("#txtStartDate").OBSDate({ onSelect: function (date) { _selectedStartDate = date; } });

    $("#txtEndDate").OBSDate({ onSelect: function (date) { _selectedEndDate = date; } });

    $(".integerbox").numeric({ decimal: true, negative: false });

    var autcParams = "[" + LoggedInCultureCode + "]," + str_country + "," + str_city + "," + str_region + "," + str_property + "," + str_apartment + "";

    $("#txtAutoCompleteSearch").Autocomplete({
        checkValueExist: false,
        procedureName: "AUTC_AutoCompleteMainSearch",
        parameters: autcParams,
        SelectPart: "3",
        DisplayFormat: "3",
        LengthsFormat: "100",
        placeHolder: str_PH_Autc,
        minLength: 0,
        IsRTL: LoggedInCultureCodeIsRTL,
        OnSelect: function ($txt)
        {
            selectedFilterLevel = $txt.data("part1");
            selectedFilterCode = $txt.data("part2");

            return false;
        }
    });

    $("#txtDestinationTypes").val("Hotel");

    $("#txtDestinationTypes").AutocompleteDropDown({
        procedureName: "AUTC_SelectDestinationTypes",
        parameters: "[" + LoggedInCultureCode + "]",
        SelectPart: "2",
        DisplayFormat: "2",
        placeHolder: str_PH_Apartments,
        IsRTL: LoggedInCultureCodeIsRTL,
        OnSelect: function ($txt)
        {
            selectedSearchType = $txt.data("part1");
            return false;
        }
    });

    $("#btnGrandSearch").on("click", function ()
    { 
        window.location = ResolveClientUrl("~/Reservations.aspx?sd=" + $("#txtStartDate").val() +
                                               "&ed=" + $("#txtEndDate").val() +  
                                               "&sst=" + selectedSearchType +
                                               "&sstn=" + $("#txtDestinationTypes").val() +
                                               "&sfl=" + selectedFilterLevel +
                                               "&sfc=" + selectedFilterCode +
                                               "&st=" + $("#txtAutoCompleteSearch").val()); /*this is only the entered text for search*/
    });

    //carousel

    $("#carousel-main").show();
    $("#carousel-main .pgwSlider").pgwSlider(
    {
        displayList: false,
        displayControls: true,
        transitionEffect: "sliding",
        intervalDuration: 5000
    });

    //Deals
    LoadHomeScreenDeals();

    //Sayings
    LoadHomeScreenSayings();

    LoadPropertiesInCitiesLinks();  // list of properties in this country in four different cities

    LoadSearchByCitiesPanels();  //  Search hotels in these cities directly

    //$('#txtStartDate').OBSDate('ShowCurrentBrowserDate'); // this will be fiscal start date
    //$('#txtEndDate').OBSDate('ShowCurrentBrowserDate');

    _selectedStartDate = new Date();
    _selectedEndDate = moment(_selectedStartDate).add(14, "days");

    $("#txtStartDate").val(moment(_selectedStartDate).format("DD/MM/YYYY"));
    $("#txtEndDate").val(moment(_selectedEndDate).format("DD/MM/YYYY"));

    $("#txtApartments").val("Show All Types");
});

function LoadHomeScreenDeals()
{
    $("#hsd").empty();
    var dt = CallServer("~/Default.aspx/LoadDeals", "");
    if (dt !== "null")
    {
        var array = typeof dt != "object" ? JSON.parse(dt) : dt;
        var str = "";
        for (var i = 0; i < array.length; i++)
        {
            str += "<div class='col-md-12'>";
            str += "<div class=\"hsd\">";
            str += "<div class=\"hsd-inner\" data-label=\"" + array[i]["DealText"] + "\">";
            str += "<img src=\"" + ResolveClientUrl("~/ImageGrabbers/GeneralImageGrabber.ashx") + "?width=400&pictureid=" + array[i]["PictureID"] + "\"/>";
            str += "</div>";
            str += "</div>";
            str += "</div>";
        }
        $("#hsd").append(str);

        $(".hsd-inner").TransparentLabel({
            direction: "top",
            OnClick: function ()
            {
                return false;
            }
        });
    }
}

function LoadSearchByCitiesPanels()
{
    $("#hsscp").empty();

    var dt = CallServer("~/Default.aspx/LoadSearchByCityPanels", "");
    if (dt !== "null")
    {
        var array = typeof dt != "object" ? JSON.parse(dt) : dt;

        var str = "";

        var sd = moment().format("DD/MM/YYYY");
        var ed = moment().add(3, "month").format("DD/MM/YYYY");

        for (var i = 0; i < array.length; i++)
        {
            str += "<div class='small-24 medium-6 columns'>";

            str += "<div class=\"hsscp\" >";
            str += "<div class=\"hsscp-inner\" data-label=\"" + array[i]["CityName"] + "\">";

            str += "<a href='" + ResolveClientUrl("~/Reservations3.aspx?sd=" + sd + "&ed=" + ed +
                                 "&sfl=2&sfc=" + array[i]["CityId"] + "&st=" + array[i]["CityName"]) + "'>";

            str += "<img src=\"" + ResolveClientUrl("~/ImageGrabbers/GeneralImageGrabber.ashx") + "?width=300&pictureid=" + array[i]["PictureID"] + "\"/>";

            str += "</a>";

            str += "</div>";
            str += "</div>";
            str += "</div>";
        }

        $("#hsscp").append(str);

        $(".hsscp-inner").TransparentLabel({
            direction: "bottom",
            OnClick: function ()
            {
                return false;
            }
        });
    }
}

function LoadHomeScreenSayings()
{
    $("#hss").empty();
    var dt = CallServer("~/Default.aspx/LoadSayings", "");
    if (dt !== "null")
    {
        var array = typeof dt != "object" ? JSON.parse(dt) : dt;
        var str = "";
        for (var i = 0; i < array.length; i++)
        {
            str += "<div class='small-12 medium-4 columns text-center'>";
            str += "<div class=\"hss\">";
            str += "<div class=\"hss-inner\">";
            str += "<img src=\"" + ResolveClientUrl("~/ImageGrabbers/GeneralImageGrabber.ashx") + "?width=300&pictureid=" + array[i]["PictureID"] + "\"/>";
            str += "<label class=\"name\">";
            str += array[i]["Customer"];
            str += "</label>";
            str += "<label class=\"saying\">";
            str += "&#8220;" + array[i]["SayingText"] + "&#8221;";
            str += "</label>";
            str += "</div>";
            str += "</div>";
            str += "</div>";
        }
        $("#hss").append(str);
    }
}

function LoadPropertiesInCitiesLinks(countryCode)
{
    $("#hspicl").empty();

    var dt = CallServer("~/Default.aspx/LoadPropertiesInCitiesLinks", "");

    if (dt !== "null")
    {
        var array = typeof dt != "object" ? JSON.parse(dt) : dt;

        var str = "";

        var row = 0;

        while (array[row] !== undefined)
        {
            if (array[row]["PropertyId"] === "start")
            {
                str += "<div class='small-24 medium-6 columns'>";
                str += "<div class=\"hspicl\">";
                str += "<label class=\"link-header\">" + strPropertiesIn + array[row]["PropertyName"] + "</label>";
                row++;
                continue;
            }
            if (array[row]["PropertyId"] === "end")
            {
                str += "</div>";
                str += "</div>";
                row++;
                continue;
            }

            str += "<label class=\"link\"><a href='" + ResolveClientUrl("~/PropertyDetails.aspx?spc=" + array[row]["PropertyId"] + "") + "'>" + array[row]["PropertyName"] + "</a></label>";
            row++;
        }
        str += "</div>";
        str += "</div>";

        $("#hspicl").append(str);
    }
}

function ChangeContentPageDirectionsOnCulture()
{
    if (LoggedInCultureCodeIsRTL)
    {
        $("#home-reservation-form-container .c2").addClass("medium-push-16");
        $("#home-reservation-form-container .c3").addClass("medium-pull-0");
        $("#home-reservation-form-container .c4").addClass("medium-pull-16");

        /*******************/

        $("#home-reservation-form-container .c2").addClass("small-push-16");
        $("#home-reservation-form-container .c3").addClass("small-pull-0");
        $("#home-reservation-form-container .c4").addClass("small-pull-16");
    }
    else
    {
        $("#home-reservation-form-container .c2").removeClass("medium-push-16");
        $("#home-reservation-form-container .c3").removeClass("medium-pull-0");
        $("#home-reservation-form-container .c4").removeClass("medium-pull-16");

        $("#home-reservation-form-container .c2").removeClass("small-push-16");
        $("#home-reservation-form-container .c3").removeClass("small-pull-0");
        $("#home-reservation-form-container .c4").removeClass("small-pull-16");
    }
}