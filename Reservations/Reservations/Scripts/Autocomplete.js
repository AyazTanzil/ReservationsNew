$.widget("jq.Autocomplete", {
    options: {
        procedureName: "A",
        parameters: "",
        SelectPart: "1",        /* On selection from the dropdown, item to be in the textbox   */
        DisplayFormat: "1",
        LengthsFormat: "100",
        notFoundMessage: "value not found",
        DropDownWidth: 0,          /* 0 will make the dropdown equal to the width of the textbox*/
        placeHolder: "Autocomplete",
        toolTip: "Type a letter",
        checkValueExist: true,     // we might need to send this value to DB if does not exist

        OnSelect: null,
        OnNotFound: null,
        minLength: 0,
        TheDB: "Egress", 
        IsRTL: false
    },

    _setRec: function (part1, part2, part3, part4, part5, part6)
    {
        var $plugin = this;
        var $this = this.element;

        if ($plugin.options.SelectPart === "1")
            $this.val(part1);
        else if ($plugin.options.SelectPart === "2")
            $this.val(part2);
        else if ($plugin.options.SelectPart === "3")
            $this.val(part3);
        else if ($plugin.options.SelectPart === "4")
            $this.val(part4);
        else if ($plugin.options.SelectPart === "5")
            $this.val(part5);
        else if ($plugin.options.SelectPart === "6")
            $this.val(part6);

        $this.data("part1", part1);
        $this.data("part2", part2);
        $this.data("part3", part3);
        $this.data("part4", part4);
        $this.data("part5", part5);
        $this.data("part6", part6);
    },

    _create: function ()
    {
        console.log("created Autocomplete");

        var $plugin = this;
        var $this = this.element;

        var autoCompletePath = ResolveClientUrl("~/WebServices/CommonWebService.asmx/" + $plugin.options.TheDB + "AutocompleteRunProcedure");
        //var checkPath = ResolveClientUrl("~/WebServices/CommonWebService.asmx/" + TheDB + "CheckValueExist");

        $this.attr("title", $plugin.options.toolTip);
        $this.attr("placeholder", $plugin.options.placeHolder);

        //1. On blur, if empty clear all, else check whats entered.....
        $this.on("focusout", function ()
        {
            if (!($plugin.options.checkValueExist))
            {
                if ($plugin.options.OnSelect != null)
                    $plugin.options.OnSelect($this);

                return false;
            }

            console.log("focusout Autocomplete");

            if ($this.val() === "")
            {
                console.log("setting empty");
                $plugin._setRec("", "", "", "", "", "");
            }
            else
            {
                var key = $this.val();

                var result = CallServer(autoCompletePath, "{'procedureName':'" + $plugin.options.procedureName + "','parameters':'" +
                    $plugin.options.parameters + "','key':'" + key + "'}");

                if (result.length === 0)
                {
                    $this.Errorify({ errorType: "Textbox_err_Autc2", msg: $plugin.options.notFoundMessage });

                    $plugin._setRec(key, "");

                    if ($plugin.options.OnNotFound != null)
                    {
                        console.log("Autocomplete > On Not Found");
                        $plugin.options.OnNotFound($this);
                    }
                }
                else
                {
                    //reset parsley
                    $this.parsley().reset();

                    //We will take the first out of the searched results
                    var first = true;
                    $.map(result, function (item)
                    {
                        if (first)
                        {
                            var parts = item.split("<-|->");
                            $plugin._setRec(parts[0], parts[1], parts[2], parts[3], parts[4], parts[5]);
                        }
                        first = false;
                    });

                    if ($plugin.options.OnSelect != null)
                    {
                        console.log("Autocomplete > On Select");
                        return $plugin.options.OnSelect($this);
                    }
                }
            }

            return false;
        });

        $this.autocomplete({
            source: function (request, response)
            {
                $.ajax({
                    url: autoCompletePath,
                    data: "{'procedureName':'" + $plugin.options.procedureName + "','parameters':'" + $plugin.options.parameters + "','key':'" + request.term + "'}",
                    dataType: "json",
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataFilter: function (data) { return data; },
                    success: function (data)
                    {
                        if (data.d.length === 0)
                        {
                            $this.Errorify({ errorType: "Textbox_err_Autc1", msg: $plugin.options.notFoundMessage });

                            $(".ui-autocomplete").hide();

                            if ($plugin.options.OnNotFound !== null)
                                $plugin.options.OnNotFound($this);
                        }
                        else
                        {
                            $this.Errorify();

                            response($.map(data.d, function (item)
                            {
                                var parts = item.split("<-|->");

                                return { 'part1': parts[0], 'part2': parts[1], 'part3': parts[2], 'part4': parts[3], 'part5': parts[4], 'part6': parts[5] }
                            }));
                        }
                    },
                    error: function (xhr, textStatus, errorThrown) { alert("Response Text : \n" + xhr.responseText + " \n Status: \n " + textStatus + "  \n Error Thrown: \n " + errorThrown); }
                });
            },
            position: {
                my: ($plugin.options.IsRTL ? "right top" : "left top"),
                at: ($plugin.options.IsRTL ? "right bottom" : "left bottom")
            },
            minLength: $plugin.options.minLength,
            messages: { noResults: "", results: function () { } },
            focus: function (event, ui)
            {
                $plugin._setRec(ui.item.part1, ui.item.part2, ui.item.part3, ui.item.part4, ui.item.part5, ui.item.part6);
                $this.Errorify();
                return false;
            },
            open: function (event, ui)
            {
                if ($plugin.options.DropDownWidth === 0)
                    $(".ui-autocomplete").css("width", $this.outerWidth());
                else
                {
                    $(".ui-autocomplete").css("width", $plugin.options.DropDownWidth);
                }
            },
            select: function (event, ui)
            {
                $this.blur();

                //if ($plugin.options.OnSelect != null)
                //{
                //    console.log('Autocomplete > On Select');
                //    return $plugin.options.OnSelect($this);
                //}

                return false;
            }
        }).dblclick(function ()
        {
            if ($this.attr("readonly") === "readonly")
                return;

            $this.data("ui-autocomplete").search("");
        }).focus(function ()
        {
            if ($this.attr("readonly") === "readonly")
                return;

            $this.data("ui-autocomplete").search("");
        }).data("ui-autocomplete")._renderItem = function (ul, item)
        {
            var display = "";

            var chars = $plugin.options.DisplayFormat;
            var lengths = $plugin.options.LengthsFormat.split(",");

            for (var i = 0 ; i < chars.length; i++)
                display += "<span style=\"width:" + lengths[i] + "%\" class='autc'>" + item["part" + chars[i]] + "</span>";

            return $("<li>")
                            .data("ui-autocomplete", item)
                            .append("<a>" + display + "</a>")
                            .appendTo(ul);
        }
    }
});


function CallServer(fnPath, params) {

    var ret = "";

    $.ajax({
        url: fnPath,
        data: params,
        dataType: "json",
        type: "POST",
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            ret = data.d;  // in string format
        },
        error: function (xhr, textStatus, errorThrown) {
            if (__appMode !== "Live")
                alert("Response Text : \n" + xhr.responseText + " \n Status: \n " + textStatus + "  \n Error Thrown: \n " + errorThrown);
        }
    });

    return ret;
}