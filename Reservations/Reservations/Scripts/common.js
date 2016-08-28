(function () {

    $('.plus-it').click(function (e) {
        e.preventDefault();
        var fieldName = $(this).attr('data-field');
        var currentVal = ($('input[name=' + fieldName + ']').val());
        currentVal = currentVal.split(' ');
        var currentval_n = '';
        if (typeof currentVal[1] === 'undefined') {
            currentval_n = '';
        }
        else {
            currentval_n = currentVal[1];
        }
        if (!isNaN(currentVal[0])) {
            $('input[name=' + fieldName + ']').val((parseInt(currentVal[0]) + 1) + " " + currentval_n);
        } else {
            $('input[name=' + fieldName + ']').val(0 + " " + currentval_n);
        }
    });

    $(".minus-it").click(function (e) {
        e.preventDefault();
        var fieldName = $(this).attr('data-field');
        var currentVal = ($('input[name=' + fieldName + ']').val());
        currentVal = currentVal.split(' ');
        var currentval_n = '';
        if (typeof currentVal[1] === 'undefined') {
            currentval_n = '';
        }
        else {
            currentval_n = currentVal[1];
        }
        if (!isNaN(currentVal[0]) && currentVal[0] > 0) {
            $('input[name=' + fieldName + ']').val((parseInt(currentVal[0]) - 1) + " " + currentval_n);
        } else {
            $('input[name=' + fieldName + ']').val(0 + " " + currentval_n);
        }
    });

    //
    $("#CheckIn").datepicker({
        //showMonthAfterYear: true,
        minDate: 0,
        maxDate: "+1y",
        numberOfMonths: 2,
        stateHover: false,

        beforeShow: function (input, inst) {
            setTimeout(function () {
                var wi = $(".ui-datepicker").outerWidth();
                var left;
                var top;
                if ($("body").attr("dir") == "rtl") {
                    left = $("#CheckIn").offset().left;
                    left = (parseInt(left) - 390);
                } else {
                    left = $("#CheckIn").offset().left;
                }
                top = $("#CheckIn").offset().top;
                $("<h5 class='head-cal' style='position:absolute;top:" + (parseFloat(top) + 48) + "px;left:" + (parseFloat(left)) + "px;z-index:9999;width:" + wi + "px'>Check-in</h5>").insertBefore(".ui-datepicker");
                inst.dpDiv.css({
                    left: left,
                    top: top + 78
                });
            }, 0);
        },
        onClose: function (selectedDate) {
            $("body").find(".head-cal").remove();
        }
    });
    $("#CheckIn3").datepicker({
        //showMonthAfterYear: true,
        minDate: 0,
        maxDate: "+1y",
        numberOfMonths: 2,
        stateHover: false,

        beforeShow: function (input, inst) {
            setTimeout(function () {
                var wi = $(".ui-datepicker").outerWidth();
                var left;
                var top;
                if ($("body").attr("dir") == "rtl") {
                    left = $("#CheckIn3").offset().left;
                    left = (parseInt(left) - 390);
                } else {
                    left = $("#CheckIn3").offset().left;
                }
                top = $("#CheckIn3").offset().top;
                $("<h5 class='head-cal' style='position:absolute;top:" + (parseFloat(top) + 48) + "px;left:" + (parseFloat(left)) + "px;z-index:9999;width:" + wi + "px'>Check-in</h5>").insertBefore(".ui-datepicker");
                inst.dpDiv.css({
                    left: left,
                    top: top + 78
                });
            }, 0);
        },
        onClose: function (selectedDate) {
            $("body").find(".head-cal").remove();
        }
    });
    $("#CheckOut").datepicker({
        minDate: 0,
        maxDate: "+1y",
        numberOfMonths: 2,
        beforeShow: function (input, inst) {
            setTimeout(function () {
                var wi = $(".ui-datepicker").outerWidth();
                var left;
                var top;
                if ($("body").attr("dir") == "rtl") {
                    left = $("#CheckOut").offset().left;
                    left = (parseInt(left) - 390);
                } else {
                    left = $("#CheckOut").offset().left;
                }
                top = $("#CheckOut").offset().top;
                $("<h5 class='head-cal' style='position:absolute;top:" + (parseFloat(top) + 48) + "px;left:" + (parseFloat(left)) + "px;z-index:9999;width:" + wi + "px'>Check-out</h5>").insertBefore(".ui-datepicker");
                inst.dpDiv.css({
                    left: left,
                    top: top + 78
                });

            }, 0);
        },
        onClose: function (selectedDate) {
            $("body").find(".head-cal").remove();
        }
    });
    $("#CheckOut3").datepicker({
        minDate: 0,
        maxDate: "+1y",
        numberOfMonths: 2,
        beforeShow: function (input, inst) {
            setTimeout(function () {
                var wi = $(".ui-datepicker").outerWidth();
                var left;
                var top;
                if ($("body").attr("dir") == "rtl") {
                    left = $("#CheckOut3").offset().left;
                    left = (parseInt(left) - 390);
                } else {
                    left = $("#CheckOut3").offset().left;
                }
                top = $("#CheckOut3").offset().top;
                $("<h5 class='head-cal' style='position:absolute;top:" + (parseFloat(top) + 48) + "px;left:" + (parseFloat(left)) + "px;z-index:9999;width:" + wi + "px'>Check-out</h5>").insertBefore(".ui-datepicker");
                inst.dpDiv.css({
                    left: left,
                    top: top + 78
                });

            }, 0);
        },
        onClose: function (selectedDate) {
            $("body").find(".head-cal").remove();
        }
    });

    $(".egr-drp-currency").on("click", function () {
        var curA = $(this);
        if (curA.is(".active")) {
            $(curA).removeClass("active");
            $("#egr-currency").fadeOut();
        }
        else {
            curA.closest("ul").find(".nav-link.active").removeClass("active");
            $(curA).addClass("active");
            $("#egr-language").fadeOut();
            $("#egr-currency").fadeIn();
        }
        return false;
    });
    $(".egr-drp-language").on("click", function () {
        var curA = $(this);
        if (curA.is(".active")) {
            $(curA).removeClass("active");
            $("#egr-language").fadeOut();
        }
        else {
            curA.closest("ul").find(".nav-link.active").removeClass("active");
            $(curA).addClass("active");
            $("#egr-currency").fadeOut();
            $("#egr-language").fadeIn();
        }
        return false;
    });

    $(document).on("click", ".rating label", function () {
        $(this).prev("input[type='radio']").trigger("click");
    });

    //$('.modal').on('hidden.bs.modal', function () {
    //    $(".modal").css("z-index", "-1");
    //});

    /*-------------- 1.2 jquery-ui Initialize Calendar to body input ----------*/

    $("#btn-chk-in,#btn-chk-in2").on("click", function () {
        $(this).closest(".input-group").find(".egr-calendar").datepicker("show");
    });

    $("#btn-chk-out, #btn-chk-out2").on("click", function () {
        $(this).closest(".input-group").find(".egr-calendar").datepicker("show");
    });
})($);