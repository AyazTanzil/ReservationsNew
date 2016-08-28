$(function () {

    //SuccMessage("You have successfully booked a room ");
    //ErrMessage("Error occured while booking, please try again. ");
    //waitLoader("Please wait while we authenticate you", true);

    /*-------------------------------------------------------
   ---------------- `Form Validation` -----------
   ----------------------------------------------------------*/
    $("input[data-error], select[data-error], textarea[data-error], .field-control").focusout(function () {
        var currIn = $(this);
        $val = $(this).val();
        if ($val.length >= 1) {
            $container = $(this).closest('div');
            $(this).removeClass("border-color");
            $tool = $(this).closest("div");
            $toolcont = $(this).closest("div").prev().closest("div");
            $(tooltip).find(".tooltip-error-message").remove();
            $(currIn).removeClass("form-control-danger");
        } else {
            $container = $(this).closest('div');
            $(currIn).removeClass("form-control-danger");
            $(this).addClass("border-color");
            $tool = $(this).closest("div");
            $toolcont = $(this).closest("div").prev().closest("div");
            $(tooltip).find(".tooltip-error-message").remove();
            $(currIn).addClass("form-control-danger");
        }
    });
    $("input[data-error], select[data-error], textarea[data-error], .field-control").focusin(function () {
        var currIn = $(this);
        $text = $(this).data("error");
        $container = $(this).closest('div');
        if ($(currIn).is(".form-control-danger")) {
            $(this).removeClass("border-color");
            $(currIn).removeClass("form-control-danger");
            if ($(this).is("input[data-error]")) {
                $tool = $(this).closest("div");
                $toolcont = $(this).closest("div").prev().closest("div");
                $(tooltip).find(".tooltip-error-message").remove();
                $(tooltip($text)).appendTo($tool);
                $(tooltip).find(".tooltip-error-message").fadeIn();
            }
        } else {
            return false;
        }
    });
    /*-------------------------------------------------------
   ---------------- `Closing Toast And Adding Toast` -----------
   ----------------------------------------------------------*/
    $(document).on("click", ".close.cl-toast", function () {
        $(".message-toast-success, .message-toast-error").removeClass("fadendown");
    });
    $("body").append(toast("message-toast-success", "text-toast-success", ""));
});

/*-------------------------------------------------------
   ---------------- `Form Validation` -----------
   ----------------------------------------------------------*/
function tooltip(text) {
    $tooltip = "<div class='tooltip-error-message'>" +
        "<div class='validate-message'>" +
        "<span class='text-icon-error'><span class='fa fa-exclamation'></span></span> <span class='text-message'>" + text + "</span>" +
        "</div></div>";
    return $tooltip;
}
var result = 0;
function IsValid(CForm) {
    $btn_val = $(CForm).val();
    $(CForm).val('');
    $(CForm).attr("disabled", "disabled");
    $(CForm).closest("div").append(waitLoader("Please wait. . .", true));
    var Form = $(CForm).closest("form").attr("id");
    $("#" + Form + " input[data-error], #" + Form + " select[data-error], #" + Form + " textarea[data-error]").each(function (k, e) {

        $val = $(e).val();
        $len = $val.length;
        if ($len <= 0) {
            $(e).removeClass("form-control-danger");
            $(e).addClass("border-color");
            $(e).addClass("form-control-danger");
            result++;
        }
    });
    if (result == 0) {
        $(CForm).removeAttr("disabled");
        $("body").find(".iqwerty_toast_animated").remove();
        $(CForm).val($btn_val);
        return Boolean(true);
    } else {
        $(CForm).removeAttr("disabled");
        $("body").find(".iqwerty_toast_animated").remove();
        $(CForm).val($btn_val);
        result = 0;
        return Boolean(false);
    }
}
/*-------------------------------------------------------
   ---------------- `Toast` -----------
   ----------------------------------------------------------*/
function toast(cl1, cl2, text) {
    $toast = "<div class='container " + cl1 + "'>" +
         "<button type='button' class='close cl-toast'>&times;</button>" +
        "<h4 class='" + cl2 + "'><i class='fa' style='margin-right:12px;font-size:1.4em'></i><span>" + text + "</span></h4>" +
    "</div>";

    return $toast;
}

function ErrMessage(text) {
    $("body").find(".iqwerty_toast_animated").remove();
    var toast = new iqwerty.toast.Toast();
    toast.setDuration(5000);
    toast.setText(" <i class='fa fa-times-circle' style='font-size:1.1em' ></i> Error! " + text).stylize({
        background: '#F33C3E',
        color: '#FFF',
        'box-shadow': '0 0 50px rgba(0, 0, 0, .7)'
    }).show();
}
function SuccMessage(text) {
    $("body").find(".iqwerty_toast_animated").remove();
    var toast = new iqwerty.toast.Toast();
    toast.setDuration(5000);
    toast.setText(" <i class='fa fa-check-circle' style='font-size:1.1em'></i> Success! " + text).stylize({
        background: '#98CE44',
        color: '#fff',
        'box-shadow': '0 0 50px rgba(0, 0, 0, .7)'
    }).show();   
}

/*-------------------------------------------------------
   ---------------- `Wait Loader/Spinner` -----------
   ----------------------------------------------------------*/
function waitLoader(str_pleaseWait, alertTF) {
    $("body").find(".iqwerty_toast_animated").remove();
    if (alertTF) {
        var toast = new iqwerty.toast.Toast();
        toast.setDuration(250000);
        toast.setText(' <img src="../../css/images/500 (1).gif" style="width:30px;height:30px;margin-right:10px;margin-left:10px;" /> <span id="spMessage"></span>').stylize({
            background: '#fff',
            color: '#003580',
            'box-shadow': '0 0 50px rgba(0, 0, 0, .7)'
        })
        .show();
    }
    $("#spMessage").text(str_pleaseWait);  // Please wait while we authenticate you
}