// input file reset
function reset(file) {
    //file.replaceWith(file.val('').clone(true));
    $("#pictureDescreption").val('');
    file.next("label").find("span").text('No file selected');
}
// end of input file reset;

function DateSaveFormate(dateinput) {
    var from = dateinput.split("/");
    var d = new Date(from[2], from[1] - 1, from[0]);
    var day = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();
    var mon = (d.getMonth() + 1) < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1;
    var year = d.getFullYear();
    return year + "" + mon + "" + day;

}
function DateDisplayFormate(d) {
    if (d.length !== 8)
        return "";
    var ret = d[4] + d[5] + "/" + d[6] + d[7] + "/" + d[0] + d[1] + d[2] + d[3];
    return ret;
}
function DateDisplayFormate2(d) {
    if (d.length !== 8)
        return "";
    var ret = d[6] + d[7] + "/" + d[4] + d[5] + "/" + d[0] + d[1] + d[2] + d[3];
    return ret;
}
function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}
function loadSelect(param, proc, controlId, placeholder, dbCode) {
    $(controlId).empty().append("<option value=''>" + placeholder + "</option>");
        return ExecuteQueryCommand(param, proc)
            .then(function (data) {
                var dt = JSON.parse(data.d);
                $.each(dt, function (key, value) {
                    $(controlId).append("<option value=" + value.ID + ">" + value.Name + "</option>");
                });
            });
}
function Autocomplete(param, proc, DisplayCoulmns, columnsSeparator, controlId, callBackFunction) {;
    var displayData = [];
    return (ExecuteQueryCommand(param, proc).then(function (jsonData) {
        var columns = jsonData.length > 0 ? Object.keys(jsonData[0]) : null;
        for (var i = 0; i < jsonData.length; i++) {
            var items = '';
            if (DisplayCoulmns.length > 1) {
                for (var j = 0; j < DisplayCoulmns.length; j++) {
                    items += jsonData[i][columns[DisplayCoulmns.charAt(j)]] + columnsSeparator;
                }
            }
            else {
                items = jsonData[i][columns[DisplayCoulmns]];
            }
            displayData.push(items);
        }
        $(controlId).autocomplete({
            source: displayData,
            minLength: 0,
            select: function (event, ui) {
                var index = displayData.indexOf(ui.item.label);
                for (var i = 0; i < columns.length; i++) {
                    $(controlId).attr("data-" + columns[i], jsonData[index][columns[i]]);
                    $("input[name='FilterEntityName']").val(jsonData[index].filterEntityName);
                    $("input[name='FilterId']").val(jsonData[index].filterId);
                }
                if (typeof callBackFunction == "function") callBackFunction();
            }

        }).focus(function () {
            //$(controlId).autocomplete('search', $(controlId).val());
        });;
    }));
}
function setkey(controlId, b) {
    return $(controlId).attr("data-key", Keys[datapart1.indexOf(b.item.value)]);
}

function previewimg(url) {
    if (url.files && url.files[0]) {
        $(".preview-spinner").show();
        var reader = new FileReader();
        reader.onload = function (e) {
            $(".preview-img").attr('src', e.target.result);
            $(".preview-spinner").hide();
        }
        reader.readAsDataURL(url.files[0]);
    }
}

function DeleteConfirmation(param, ProcName) {
    return (swal({
        title: "Are you sure?",
        text: "Are you sure you want to delete this record!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3c8dbc",
        cancelButtonColor: "#dd4b39",
        confirmButtonText: "Yes, delete it!",
        closeOnConfirm: false,
        allowOutsideClick: false
    }).then(
     function (isconfirm) {
         if (isconfirm) {
             ExecuteNonQueryCommand(param, ProcName).then(function (data) { MessageBox(data.d) });
         }
         return isconfirm;
     }));
}

function ErrMessage(text) {
    if ($("body").find(".iqwerty_toast_animated")) {
        $("body").find(".iqwerty_toast_animated").remove();
    }
    var toast = new iqwerty.toast.Toast();
    toast.setDuration(10000);
    toast.setText(" <i class='fa fa-times-circle' style='font-size:1.1em;vertical-align: middle;' ></i> Error! " + text).stylize({
        background: '#F33C3E',
        color: '#FFF',
        'box-shadow': '0 0 50px rgba(0, 0, 0, .7)'
    }).show();
}
function MessageBox(text) {
    if (text !== "1" && text !== "0" && text !== "log") {
        ErrMessage(text);
    } else {
        var title = "Success";
        title = text === "log" ? title = "Authenticated" : title;
        text = text === "log" ? "Please wait while we redirect you..." : text;

        text = text === "1" ? "operation successfully completed" : text;
        text = text === "1" ? "no record affected" : text;
        SuccMessage(title, text);
    }
}
function SuccMessage(title, text) {
    var spinner = title === "Authenticated" ? '<img src="../../../../content/images/spin-white.gif" style="width:30px;height:30px;margin-right:10px;margin-left:10px;" />' : '';
    if ($("body").find(".iqwerty_toast_animated")) {
        $("body").find(".iqwerty_toast_animated").remove();
    }
    var toast = new iqwerty.toast.Toast();
    toast.setDuration(5000);
    toast.setText(spinner + " <i class='fa fa-check-circle' style='font-size:1.1em;vertical-align: middle;'></i> " + title + "! " + text).stylize({
        background: '#98CE44',
        color: '#fff',
        'box-shadow': '0 0 50px rgba(0, 0, 0, .7)'
    }).show();
}

/*-------------------------------------------------------
   ---------------- `Wait Loader/Spinner` -----------
   ----------------------------------------------------------*/
function waitLoader(str_pleaseWait, alertTF) {
    if ($("body").find(".iqwerty_toast_animated")) {
        $("body").find(".iqwerty_toast_animated").remove();
    }
    if (alertTF) {
        var toast = new iqwerty.toast.Toast();
        toast.setDuration(50000);
        toast.setText(' <img src="../../../../content/images/500 (1).gif" style="width:30px;height:30px;margin-right:10px;margin-left:10px;" /> <span id="spMessage"></span>').stylize({
            background: '#fff',
            color: '#003580',
            'box-shadow': '0 0 50px rgba(0, 0, 0, .7)'
        })
        .show();
    }
    $("#spMessage").text(str_pleaseWait);  // Please wait while we authenticate you
}


function initialize() {
    var map;
    var bounds = new google.maps.LatLngBounds();
    var mapOptions = {
        mapTypeId: 'roadmap'

    };

    // Display a map on the page
    map = new google.maps.Map(document.getElementById("map_g"), mapOptions);
    map.setTilt(45);

    // Multiple Markers
    var markers = [
        ['Shaza Al Madina, Madina', 52.3555, 1.1743]
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
            title: markers[i][0],
            icon: '../../../content/images/egress.png'
        });

        // Automatically center the map fitting all markers on the screen
        map.fitBounds(bounds);
    }

    // Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
    var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function (event) {
        this.setZoom(8);
        google.maps.event.removeListener(boundsListener);
    });

}



function OperationSuccessMsg(insert_before, operation_name, toggle_modal, button_text) {
    var template = '<div class="modal fade login-modals with-navs operation-success-msg" tabindex="-1" role="dialog" aria-labelledby="gridModalLabel" aria-hidden="true">' +
         ' <div class="modal-dialog" role="document">' +
         '   <div class="modal-content no-bg">' +
         '       <div class="login-box">' +
         '          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
         '          <div class="login-box-body sweet-alert">' +
         '             <div class="col-xs-12 text-center"> <img src="../../../../content/images/check-success.png" style="width:60px;height:60px" />' +

     '                 </div>' +
         '              <h4 class="form-head text-center text-dark-black"><span class="apartment-name">' + operation_name + '</span> successfully added!</h4>' +

          '              <div class="row">' +
          '                  <div class="col-xs-12 col-sm-12 no-padding">' +
          '                      <p class="text-center text-ligth-black">You can choose one of the availilable options below</p>' +
          '                      <div class="row" style="padding-top: 1.1em;">' +
          '                          <div class="col-xs-12 text-center">' +
          '                              <button type="button" class="btn btn-primary btn-sm toggle-modals" data-dismiss="modal" data-toggle="modal" data-target="#' + toggle_modal + '"><i class="fa fa-plus-circle"></i>' + button_text + '</button>' +
         '                               <button type="button" class="btn btn-default btn-sm" data-dismiss="modal"><i class="fa fa-times"></i>Cancel</button>' +
         '                           </div>' +
           '                     </div>' +
          '                  </div>' +
          '              </div>' +
          '          </div>' +
               '   </div>' +
               '</div>' +
           '</div>' +
       '</div>';

    if ($("body").find(".operation-success-msg")) {
        $("body").find(".operation-success-msg").remove();
        $(template).insertBefore("#" + insert_before);
        $(".operation-success-msg").modal("show");
    } else {
        $(template).insertBefore("#" + insert_before);
        $(".operation-success-msg").modal("show");
    }
}
function CheckValueExist(Table, Column, Value, Elem, message) {
    var input = $("#" + $(Elem).attr('id')).parsley();
    window.ParsleyUI.removeError(input, "unique");
    var param = [
    { "name": "Table", "value": Table }, { "name": "Columns", "value": Column }, { "name": "Values", "value": Value }];
    var proc = '[CheckUnique]';
    return (ExecuteQueryCommand(param, proc).then(function (data) {
        var jsonData = JSON.parse(data.d);
        if (jsonData[0].Result === 0 ? true : false) {
            window.ParsleyUI.removeError(input, "unique");
        }
        else {
            window.ParsleyUI.addError(input, "unique", message);
        }
    }));
}

//parsley custom validator.

function validate_Cus(ele) {
    if ($(ele).val().length > 0) {
        window.ParsleyUI.removeError(specificField, "Error");
    }
}


function ShowCalendar(controlID, heading) {

    $(controlID).datepicker({
        //showMonthAfterYear: true,
        minDate: 0,
        maxDate: "+1y",
        stateHover: false,
        dateFormat: "dd/mm/yy",
        numberOfMonths: 2,

        beforeShow: function (input, inst) {
            setTimeout(function () {
                var wi = $(".ui-datepicker").outerWidth();
                var left;
                var top;
                if ($("body").attr("dir") == "rtl") {
                    left = $(controlID).offset().left;
                    left = (parseInt(left) - 390);
                } else {
                    left = $(controlID).offset().left;
                }
                top = $(controlID).offset().top;
                $("<h5 class='head-cal' style='position:absolute;top:" + (parseFloat(top) + 23) + "px;left:" + (parseFloat(left)) + "px;z-index:9999;width:" + wi + "px'>" + heading + "</h5>").insertBefore(".ui-datepicker");
                inst.dpDiv.css({
                    left: left,
                    top: top + 65
                });
            }, 0);
        },
        onClose: function (selectedDate) {
            $("body").find(".head-cal").remove();
        }
    });

}
function ParseForm(form) {
   var len = form.length,
   dataObj = {};

    for (i = 0; i < len; i++) {
        dataObj[form[i].name] = form[i].value;
    }
    return dataObj;
}