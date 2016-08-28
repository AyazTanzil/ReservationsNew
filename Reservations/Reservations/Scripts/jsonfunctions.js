// master
// slave 1 in almsafer
//////////////////////////////////////////////

function GetJSONFromControls($container, isInserting)
{
    var objectData = {};

    var value = "";
    var para = "";

    $container.find("input[type=text],input[type=email],input[type=number],input[type=checkbox]").each(function ()
    {
        if ($(this).data("skipjson") === true)
            return;

        var type = $(this).attr("type");

        var id = $(this).attr("name");

        if (id === undefined)
            id = $(this).attr("id");

        var p = id.split("$");

        para = p[p.length - 1];

        if (para !== "")
        {
            switch (type)
            {
                case "text":
                case "email":
                case "number":

                    if ($(this).data("autcpart"))
                    {
                        var partn = $(this).data("autcpart");/* from 1 6 - which 1 to take      */

                        //  alert("Part" + partn + " will be checked");

                        value = $(this).data("part" + partn);

                        //  alert(value + " is finally selected as value");

                        if (value === "" || value === undefined)

                            value = "";
                    }
                    else
                    {
                        value = $(this).val();
                        if ($(this).hasClass("Numeric"))
                        {
                            if (value === "" || value === undefined)
                            {
                                value = "0";
                            }
                        }
                    }

                    break;
                case "checkbox":
                    value = $(this).is(":checked") ? "true" : "false";
                    break;
            }

            // Remove the prefix txt,chk or rd from inputs
            if (para.substring(0, 3) === "txt") para = para.replace("txt", "");
            if (para.substring(0, 3) === "chk") para = para.replace("chk", "");
            if (para.substring(0, 2) === "rd") para = para.replace("rd", "");

            para = CamalCase(para);

            if (para !== "")
                objectData[para] = value;
        }
    });

    $container.find("textarea").each(function ()
    {
        var id = $(this).attr("name");

        if (id === undefined)
            id = $(this).attr("id");

        var p = id.split("$");

        para = p[p.length - 1];

        para = para.replace("txt", "");

        para = CamalCase(para);

        if (para !== "")
            objectData[para] = $(this).val();
    });

    $container.find(".radiogroup").each(function ()
    {
        var para = $(this).data("param");

        if (para !== "")
            objectData[para] = $(this).find("input[type=\"radio\"]:checked").val();
    });

    $container.find("select").each(function ()
    {
        //The control must have data-selection attribute which specifies what to be taken from this control
        // such as data-selection="value" and data-selection="text".
        // If attribute is not defined then we will take the value

        var id = $(this).attr("name");

        if (id === undefined)
            id = $(this).attr("id");

        //if (ID === undefined)  // if still undefined, then provide atleast one
        //    alert("No ID or Name provided for select");

        var p = id.split("$");

        para = p[p.length - 1];

        if (para !== "")
        {
            var selection = $(this).data("selection");

            if (selection === "value")
                value = $(this).find("option:selected").val();
            else
                value = $(this).find("option:selected").text();

            objectData[para] = value;
        }
    });

    objectData.isInserting = (isInserting ? "true" : "false");

    //alert(JSON.stringify(objectData));
    return objectData;
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

function SetJSONToControls(frmId, data)
{
    ClearControlsAndErrors(frmId);  // clear messages and clear inputs

    $.each(data, function (key, value)
    {
        // alert(key + " = " + value);

        //input
        var $ctrl = $("#" + frmId).find("input[id=txt" + key + "]"); // // All textboxes and textareas should have txt prefix

        //textarea
        if ($ctrl.length === 0)
        {
            $ctrl = $("#" + frmId).find("textarea[id=txt" + key + "]");
        }

        //checkbox
        if ($ctrl.length === 0)
        {
            $ctrl = $("#" + frmId).find("input[id=chk" + key + "]");
        }

        // Just check for Code or Id or Name suffix to the textbox     -- because in case autcpart is used we use both name and value
        if ($ctrl.length === 0)
        {
            $ctrl = $("#" + frmId).find("[data-autctextfield=" + key.toLowerCase() + "]");
        }

        if ($ctrl.length === 0)
        {
            // alert('control not found returning');
            return;
        }

        ////////divs such as radiogroup //todo : do for radios in future as well
        //if ($ctrl.length === 0)
        //{
        //    $ctrl = $("#" + frmId).find("div[id*=" + key + "]");  //for radiogroup

        //    if ($ctrl.attr("id") === undefined)
        //        return;

        //    $ctrl.find("input[value='" + value + "']").prop("checked", true);
        //}

        switch ($ctrl.prop("type"))
        {
            case "text":
            case "email":
            case "tel":
            case "number":
            case "hidden":
            case "textarea":

                if ($ctrl.data("autcpart"))
                {
                    // alert("value is " + value + " and Key is " + key.toLowerCase() + "\n textfield is " + $ctrl.data("autctextfield") + "\n Value field is " + $ctrl.data("autcvaluefield"));

                    var missed = true;
                    if ($ctrl.data("autctextfield") === key.toLowerCase())
                    {
                        // alert("setting " + key + " as text ");
                        $ctrl.val(value);

                        // $ctrl.css("border", "1px solid red");
                        missed = false;
                    }
                    else
                        if ($ctrl.data("autcvaluefield") === key.toLowerCase())
                        {
                            // alert("setting " + key + " as attrib ");
                            $ctrl.data("part" + $ctrl.data("autcpart"), value);
                            // $ctrl.css("border", "1px solid green");
                            missed = false;
                        }

                    if (missed)
                        alert("missed");
                }
                else
                {
                    //alert('no autc');
                    // not autc control
                    $ctrl.val(value);
                }

                break;

            case "checkbox":
                $("#chk" + key).prop("checked", value);
                break;
        }
    });
}