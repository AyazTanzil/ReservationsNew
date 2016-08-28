$.fn.UniqueValue = function (e)
{
    var extensions = $.extend({ table: "A", column: "B", parentFormID: "", errorMsg: "Duplicate" }, e);

    var $this = $(this);

    var originalValue = 0;

    var $parentForm = $("#" + extensions.parentFormID);

    function Dismissal(isEnabling)
    {
        // in case of dialog
        var $okButton = $parentForm.find("input.OkDialog");

        if (isEnabling)
        {
            var count = $parentForm.find("input.Textbox_EntryError").length;

            // enable only when there is no error
            if (count === 0)
                $okButton.removeAttr("disabled");
        }
        else
        {
            $okButton.attr("disabled", "disabled");
        }
    }

    $this.on("focusout", function ()
    {
        if (!($(this).data("unique-active")))
        {
            console.log("unique is not active");
            return;
        }

        if ($(this).attr("readonly") !== "readonly")
        {
            originalValue = $this.data("originalValue");

            var value = $this.val();

            if (value === "")
            {
                console.log("skipping for empty");
                return;
            }

            if (value !== originalValue)
            {
                var isDuplicate = CallServer("~/WebServices/CommonWebService.asmx/CheckUnique", "{ 'table' : '" + extensions.table + "','column' : '" + extensions.column + "','value' : '" + value + "'}");

                if (isDuplicate)
                {
                    ShowAbsoluteMessage(extensions.errorMsg, "alert", 2000);
                    $(this).Errorify({ errorType: "generalerror", msg: extensions.errorMsg });
                    Dismissal(false);
                }
                else
                {
                    $(this).Errorify();
                    Dismissal(true);
                }
            }
            else
            {
                alert("skipping");
                console.log("skip > " + $this.val());
                $(this).Errorify();
                Dismissal(true);
            }
        }
    });
};