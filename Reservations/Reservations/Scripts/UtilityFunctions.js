function AppendColumn(containerClass, heading, rowContents)
{
    $("." + containerClass + " thead tr").append("<th scope='col'>" + heading + "</th>");
    $("." + containerClass + " tr:gt(0)").append("<td>" + rowContents + "</td>");
}

function AddColumn($table, heading, rowContents)
{
    $table.find("thead tr").append("<th scope='col'>" + heading + "</th>");
    $table.find("tr:gt(0)").append("<td>" + rowContents + "</td>");
}

function HandleQSError(errLevel)
{
    console.log("Handling QS Error" + errLevel);

    switch (errLevel)
    {
        case 0:
            alert("Your session has been cancelled - please login again");
            window.open(ResolveClientUrl("~/Logout.aspx"), "_self");
            break;

        case 1:
            $("body").after("<div class=\"qserror\"><label>Error occured. <br/>Please contact your system administrator</label></div>");
            $("body").hide();
            break;
    }
}

function QueryString(name)
{
    var vars = [], hash;

    try
    {
        var qs = Aes.Ctr.decrypt(window.location.search.split("?")[1], "&", 256);
        var hashes = qs.split("&");
        for (var i = 0; i < hashes.length; i++)
        {
            hash = hashes[i].split("=");
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
    }
    catch (err)
    {
        return null;
    }

    if (isNullOrEmpty(vars[name]))
        return null;

    return vars[name];
}

function CreateHtmlFancyTable(dataTable, colHeadings)
{
    // If the returned data is an object do nothing, else try to parse
    var array = typeof dataTable !== "object" ? JSON.parse(dataTable) : dataTable;

    var str = "";

    str += "<div class='FancyTable'>";
    str += "<table class='table'>";

    str += "<thead><tr>";
    var c;
    if (colHeadings !== undefined)
    {
        var colHeadingsArray = colHeadings.split(",");
        for (c = 0 ; c < colHeadingsArray.length; c++)
        {
            str += "<th scope=\"col\">" + colHeadingsArray[c] + "</th>";
        }
    }
    else
    {
        for (var colName in array[0])
        {
            str += "<th scope=\"col\">" + colName + "</th>";
        }
    }

    str += "</tr></thead>";
    str += "<tbody>";

    for (var i = 0; i < array.length; i++)
    {
        str += "<tr>";

        for (c in array[i])
        {
            str += "<td data-column=\"" + c + "\">" + array[i][c] + "</td>";
        }

        str += "</tr>";
    }

    str += "</tbody></table></div>";

    return str;
}

function CreateHtmlTable1(dataTable, colHeadings)
{
    // If the returned data is an object do nothing, else try to parse
    var array = typeof dataTable !== "object" ? JSON.parse(dataTable) : dataTable;

    var str = "";

    str += "<table class='table'>";

    str += "<thead><tr>";
    var c;
    if (colHeadings !== undefined)
    {
        var colHeadingsArray = colHeadings.split(",");
        for (c = 0 ; c < colHeadingsArray.length; c++)
        {
            str += "<th scope=\"col\">" + colHeadingsArray[c] + "</th>";
        }
    }
    else
    {
        for (var colName in array[0])
        {
            str += "<th scope=\"col\">" + colName + "</th>";
        }
    }

    str += "</tr></thead>";
    str += "<tbody>";

    for (var i = 0; i < array.length; i++)
    {
        str += "<tr>";

        for (c in array[i])
        {
            str += "<td data-column=\"" + c + "\">" + array[i][c] + "</td>";
        }

        str += "</tr>";
    }

    str += "</tbody></table>";

    return str;
}

function ConcatenateJSON(json1, json2)
{
    var oldObj = json1;
    var newObj = json2;

    //  alert('first' + JSON.stringify(oldObj));
    // alert('second' + JSON.stringify(newObj));

    for (prop in newObj)
    {
        if (newObj.hasOwnProperty(prop))
        {
            if (!oldObj.hasOwnProperty(prop))
            {
                oldObj[prop] = newObj[prop];
            }
        }
    }

    //  alert('returning ' + JSON.stringify(oldObj));

    return oldObj;
}

function CamalCase(string)
{
    return string.charAt(0).toLowerCase() + string.slice(1);
}

function DoFormValidation(formId)
{
    if (formId === undefined)
        formId = thisFormID;

    var v = ValidateForm(formId);

    if (v !== 1)
    {
        var msgNumber = str_ValuesRequired;
        if (v === 3)
            msgNumber = str_OopsProblem;

        ShowAbsoluteMessage(msgNumber, "alert", 2000);
        return false;
    }

    return true;
}

function EnableForm(formId, isEnable)
{
    if (isEnable)
        $("#" + formId).find("select,input,textarea,button").not(".no_enable").prop("disabled", !isEnable);// input of anytype
    else
        $("#" + formId).find("select,input,textarea,button").prop("disabled", !isEnable);// input of anytype

    // in case of dialog  save cancel should be enabled
    $("#" + formId).find(".btn-dlg").prop("disabled", false);
}

function IsValueDuplicate(fnPath, table, column, value)
{
    return CallServer(fnPath, "{ 'table' : '" + table + "','column' : '" + column + "','value' : '" + value + "'}");
}

function ClearControlsAndErrors(formId)
{
    if (formId !== undefined)
        $("#" + formId).parsley().reset();
    else
        alert("FORM ID IS UNDEFINED");

    $("#" + formId).find("input,textarea").each(function (e)
    {
        $(this).val("").Errorify();

        var $txtMsel = $("#" + formId).find($(".msel-textbox"));
        // Call MSEL if available
        if ($txtMsel.MSEL)
            $txtMsel.MSEL("ClearSelectedItems");

        $("#" + formId).find("input[type=checkbox]").prop("checked", false);
    });
}

function InitializeOpenClearReveal(frmId, onOpenCb)
{
    InitializeOpenReveal(frmId, null); // simply open it

    ClearControlsAndErrors(frmId);   // clear everything

    if (!(onOpenCb === null || onOpenCb === undefined))  //do what you want
    {
        $("#" + frmId).on("opened.fndtn.reveal", function ()
        {
            onOpenCb();
        });
    }
}

function InitializeOpenReveal(frmId, onOpenCb)
{
    InitializeReveal(frmId);

    $("#" + frmId).foundation("reveal", "open");  //show as modal

    if (!(onOpenCb === null || onOpenCb === undefined))  //do what you want
    {
        $("#" + frmId).on("opened.fndtn.reveal", function ()
        {
            onOpenCb();
        });
    }
}

function InitializeReveal(frmId)
{
    $("#" + frmId).data("reveal-init", {
        animation: "none",
        animation_speed: 250,
        close_on_background_click: false,
        close_on_esc: false,
        dismiss_modal_class: "close-reveal-modal",
        bg_class: "reveal-modal-bg",
        bg: $(".reveal-modal-bg"),
        css: {
            open: {
                'opacity': 0,
                'visibility': "visible",
                'display': "block"
            },
            close: {
                'opacity': 1,
                'visibility': "hidden",
                'display': "none"
            }
        }
    });
}

function PopulateBrowserDateTime()
{
    $(".obs-datebox").val(moment(new Date()).format("DD/MM/YYYY"));
    $(".obs-timebox").val(moment(new Date()).format("hh:mm A"));
}

function RegularExpressionCheck(pattern, textBox)
{
    //pattern should be correct otherwise there will be error.

    var ok = pattern.test($(textBox).val());

    if (!ok)
        $(textBox).Errorify({ errorType: "generalerror" });
    else
        $(textBox).Errorify();
}

function ShowPromptMessage(msg, colorClass) /*foundation*/
{
    alert("prompto");

    $("#myModal").foundation("reveal", "open");
}

function ShowAbsoluteMessage(msg, colorClass, delay, cb) /*foundation*/
{
    var $div = $("<div class='abs-msg abs-msg-" + colorClass + "' >" + msg + "</div>").appendTo($(".topbar"));

    $div.css("width", $(".topbar").outerWidth());

    $div.hide().fadeIn().delay(delay).fadeOut();

    if (cb != null)
    {
        return cb();
    }

    return true;
}

function ShowSideMessage($txtBox, isEntryOk, incorrectSideMesage)
{
    // See also the blur even in common.js to remove this sidemessage on correct entry
    if (incorrectSideMesage === undefined)
        incorrectSideMesage = "Incorrect !";

    // $txtBox.nextAll('span.sidemessage-success ,span.sidemessage-failure').remove();

    if (isEntryOk)
    {
        $txtBox.nextAll("span.sidemessage-success ,span.sidemessage-failure").remove();
    }
    else
    {
        $txtBox.nextAll("span.sidemessage-success ,span.sidemessage-failure").remove(); //remove any previous
        $txtBox.after("<span class='sidemessage-failure textBoxSideMessage '><i class=\"fa fa-times-circle\"></i>" + incorrectSideMesage + "</span> ");
    }
}

function ValidateForm(frmID, cb, cbParams)
{
    var reqErrorCount = 0;
    var generalErrorCount = 0;

    $("#" + frmID).find("input.required,textarea.required").each(function (e)
    {
        if ($(this).val() === "")
        {
            if ($(this).is(":visible"))
            {
                if (!($(this).is(":disabled")))
                {
                    $(this).Errorify({ errorType: "required" });
                    reqErrorCount++;
                }
            }
        }
    });

    if (reqErrorCount === 0)
    {
        //Check for other error generic Entry error for any other reason...
        $("#" + frmID).find("input[type=text]").each(function (e)
        {
            if ($(this).data("req-err") === "1" || $(this).data("gen-err") === "1") // for another type of error just introduce that to Clarify or simple make a generic gen-err for all type of error...
            {
                ShowSideMessage($(this), false, "Problem");
                generalErrorCount++;
            }
        });
    }

    // 1 is ALL OK, 2 is Req Errors, 3 is General Errors

    if (reqErrorCount > 0)
        return 2;  // Please fill the required fields
    else
        if (generalErrorCount > 0)
            return 3; //OOPS !! There is some problem with one or more fields
        else
            return 1;

    if (cb != null)
    {
        return cb(cbParams);
    }
    else
        return 1;
}

function ValidateAccountOnServer(accCode)
{
    return CallServer("~/WebServices/CommonWebService.asmx/ValidateAccountOnServer",
            "{" + "'accountCode': '" + accCode + "'}");
}

function RegisterBlurEvent()
{
    $(".FormBack").find("input.required,textarea.required").on("focusout", function ()
    {
        console.log("blur of register even");

        if ($(this).val() !== "")
        {
            if ($(this).data("gen-err") === "0" || $(this).data("gen-err") === undefined)
            {
                $(this).Errorify({ errorType: "reqerror_no" });
            }
        }
    });
}

function StandardizeTableHeaders($thead)
{
    //For all the grid screens, the headers of columns are made read friendly eg. FatherName would be Converted to Father Name with space...
    $thead.find("th").each(function ()
    {
        $(this).html($(this).html().replace(/([a-z])([A-Z])/g, "$1 $2"));//http:/x/stackoverflow.com/questions/5582228/insert-space-before-capital-letters
    });
}

function HideDataTableColumns($thead, $tbody, colNumbers, showNumbers)
{
    var parts = colNumbers.split(",");

    for (var j = 0; j < parts.length; j++)
    {
        $thead.find("th:eq(" + parts[j] + ")").addClass("hdncol");
        $tbody.find("tr").each(function ()
        {
            $(this).find("td:eq(" + parts[j] + ")").addClass("hdncol");
        });
    }

    //showNumbers is just help to know the columns
    var h = "";
    if (showNumbers)
    {
        for (var i = 0; i < parts.length; i++)
        {
            h = $thead.find("th:eq(" + parts[i] + ")").html();
            $thead.find("th:eq(" + parts[i] + ")").html(h + " - " + parts[i]);
        }
    }
}

function GetCurrentBrowserDate()
{
    return moment(new Date()).format("DD/MM/YYYY");
}

function getRandomInt(min, max)
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function IntervalAgo(input)
{
    var date1 = Date.parseExact(input, "dd/mm/yyyy");

    if (date1 === null)
    {
        return;
    }

    var date2 = new Date();

    var diff = new Date(date2.getTime() - date1.getTime());

    y = diff.getUTCFullYear() - 1970;
    m = diff.getUTCMonth();
    d = diff.getUTCDate() - 1;

    var ret = "";

    if (y !== 0)
    {
        if (y > 1)
            ret += y + " years";
        else
            ret += y + " year";
    }

    if (m !== 0)
    {
        if (y === 0)
            ret += "";
        else
            ret += ", ";
        if (m > 1)
            ret += m + " months";
        else
            ret += m + " month";
    }

    if (d !== 0)
    {
        if (y === 0 && m === 0)
            ret += "";
        else
            ret += ", ";
        if (d > 1)
            ret += d + " days";
        else
            ret += d + " day";
    }

    return ret;
}

function GetFormattedAmount(v, t, d) //t can be 2 or 3, d is rounding decimal, v is value to be formatted
{
    v = parseFloat(v);

    // alert('v = ' + v + " AND " + 't = ' + t + " AND " + 'd = ' + d);

    try
    {
        v = v.toFixed(parseFloat(d));
    } catch (e)
    {
        alert(e);
    }

    var parts = v.split(".");
    var intPart = parts[0];
    var deciPart = parts[1];

    var rest = intPart;
    var last3 = "";
    if (intPart.length > 3)
    {
        last3 = intPart.substr(intPart.length - 3);
        rest = intPart.substr(0, intPart.length - 3);

        if (t === 2)
            rest = rest.replace(/(\d)(?=(\d{2})+(?!\d))/g, "$1,");
        else if (t === 3)
            rest = rest.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");

        if (t !== 1)
            rest += ",";
    }

    return rest + last3 + "." + deciPart;
}

function parseDate(str)
{
    var parts = str.split("/");
    var dt = new Date(parseInt(parts[2], 10),
                      parseInt(parts[1], 10) - 1,
                      parseInt(parts[0], 10));
    return dt;
}

function ChangeDataTableDirections()
{
    if (__LoggedInCultureCode === "ar-SA")
    {
        //internal wording, can be changed later.....
        $(".dataTables_wrapper .c1").addClass("small-push-12");
        $(".dataTables_wrapper .c2").addClass("small-pull-12");
    }
    else
    {
        $(".dataTables_wrapper .c1").removeClass("small-push-12");
        $(".dataTables_wrapper .c2").removeClass("small-pull-12");
    }
}

function ValidateDatesMoment(startDate, endDate)
{
    if (startDate === "" || endDate === "" || startDate === undefined || endDate === undefined)
        return false;

    var startObj = moment(startDate, "DD/MM/YYYY");
    var endObj = moment(endDate, "DD/MM/YYYY");

    if (moment(startObj).isSame(endObj))
        return true;

    if (moment(startObj).isBefore(endObj))
        return true;

    return false;
}

function ResolveClientUrl(url)
{
    if (url.indexOf("~/") === 0)
    {
        url = __baseUrl + url.substring(2);
    }
    return url;
}

function CallServer(fnPath, params)
{
    fnPath = ResolveClientUrl(fnPath);

    var ret = "";

    $.ajax({
        url: fnPath,
        data: params,
        dataType: "json",
        type: "POST",
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data)
        {
            ret = data.d;  // in string format
        },
        error: function (xhr, textStatus, errorThrown)
        {
            if (__appMode !== "Live")
                alert("Response Text : \n" + xhr.responseText + " \n Status: \n " + textStatus + "  \n Error Thrown: \n " + errorThrown);
        }
    });

    return ret;
}

function isNullOrEmpty(val)
{
    //   alert("checking " + val + " whose type is " + typeof (val));
    return (val === undefined || val == null || val == "") ? true : false;
}

function ToDisplayFormat(d)
{
    if (d.length !== 8)
        return "";

    var ret = d[6] + d[7] + "/" + d[4] + d[5] + "/" + d[0] + d[1] + d[2] + d[3];

    // alert(d + ' displayed to ' + ret);

    return ret;
}

function ToSaveFormat(d)
{
    if (d.length !== 10)
        return "";

    var ret = d[6] + d[7] + d[8] + d[9] + d[3] + d[4] + d[0] + d[1]; // skip

    //alert(d + ' saved to ' + ret);

    return ret;
}

function BindSpecialBoxes()
{
    $("input.emailbox,input.mobilebox,input.landlinebox,input.faxbox").bind("dblclick", function ()
    {
        if ($(this).attr("class") === 'emailbox')
            $(this).val('test@test-domain.com');
        else
            if ($(this).attr("class") === 'mobilebox')
                $(this).val('0300490834');
            else
                if ($(this).attr("class") === 'landlinebox')
                    $(this).val('09371234567');
                else
                    if ($(this).attr("class") === 'faxbox')
                        $(this).val('01140394832');
    });
}