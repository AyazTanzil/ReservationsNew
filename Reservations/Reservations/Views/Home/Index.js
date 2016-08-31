$(function () {
    var param = [{ "Name": "SearchKey", "Value": "" }, { "Name": "CultureCode", "Value": "en-US" }, { "Name": "PropertyTypeId", "Value": "1" }];
    Autocomplete(param, "AUTC_MainSearch_Proc", 2, "", "#DestinationHotel", null);
});