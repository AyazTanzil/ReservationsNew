$(function () {
    var param = [{ "Name": "SearchKey", "Value": "" }, { "Name": "CultureCode", "Value": "en-US" }, { "Name": "PropertyTypeId", "Value": "1" }];
    Autocomplete(param, "AUTC_MainSearch_Proc", 2, "", "#txtC1Destination", null);
    ShowCalendar("#txtC1CheckIn", "CheckIn Date");
    ShowCalendar("#txtC1CheckOut", "Check Out Date");
    var param = [{ "Name": "StartDate", "Value": "20160807" }, { "Name": "CultureCode", "Value": "en-US" }, { "Name": "EndDate", "Value": "20160808" },
        { "Name": "FilterEntityName", "Value": "Country" }, { "Name": "FilterId", "Value": "174" }];
    //$.post("../C1/Index", { jsonData: param});
   //window.location.href= "../C1/Index?StartDate=20160807&EndDate=20160808&FilterEntityName=Country&FilterId=174";
 //$('#C1SearchForm').submit(function () {
 //       //var values = ParseForm($(this).serializeArray());
 //       window.open("../C1/Index?StartDate=20160807&EndDate=20160808&FilterEntityName=Country&FilterId=174", "_blank");
 //       //values["FilterEntityName"] = $("#txtC1Destination").attr("data-filterentityname");
 //       //values["FilterId"] = $("#txtC1Destination").attr("data-filterid");
 //       //sessionStorage.setItem("C1Params", values);
 //       //var C1Params = sessionStorage.getItem("C1Params", values);
 //       //var param = [{ "Name": "StartDate", "Value": "20160807" }, { "Name": "CultureCode", "Value": "en-US" }, { "Name": "EndDate", "Value": "20160808" },
 //       //               { "Name": "FilterEntityName", "Value": "Country" }, { "Name": "FilterId", "Value": "174" }];
 //       //$.ajax({
 //       //    url: "../../../C1/index",
 //       //    type: "POST",
 //       //    datatype: "json",
 //       //    data: JSON.stringify({ paramsList: param, procName: "Search_GrandSearch1" }),
 //       //    contentType: "application/json; charset=utf-8",
 //       //    cache: false,
 //       //    success: function (data) {
 //       //    },
 //       //    async: true,
 //       //    error: errorFn
 //       //});
 //       return false;
       
 //   });
});