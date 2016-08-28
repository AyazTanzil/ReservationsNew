$(window).scroll(function () {
    if ($(this).scrollTop() > 150) {
        $("header").addClass("header-hide");
        $(".egr-nav-second").addClass("sticky-header-first");
        $(".egr-nav-first").addClass("sticky-header");
    } else {
        $("header").removeClass("header-hide");
        $(".egr-nav-second").removeClass("sticky-header-first");
        $(".egr-nav-first").removeClass("sticky-header");
    }

    if ($(this).scrollTop() > 200) {
        $(".bottom-to-top").show().addClass("animated bounceIn");
    } else {
        $(".bottom-to-top").hide().removeClass("animated bounceIn");
    }
});

$(function () {
    $(".bottom-to-top a").click(function () {
        $("html,body").animate({
            scrollTop: $(".egr-site-content-wrapper").offset().top
        }, 1500, "easeInOutCubic");
        return false;
    });

    if (__LoggedInCultureCode === "en-US") {
        $(".btnLang").removeClass("active");
        $(".btnLang:eq(0)").addClass("active");
        $(".lang-fl img").attr("src", "../../css/images/united_states_of_america.png");
        $("#TheHtmlDocument").attr("lang", "en").attr("dir", "ltr");
    }
    if (__LoggedInCultureCode === "fr-FR") {
        $(".lang-fl img").attr("src", "../../" + sessionStorage.getItem("lang"));
        $(".btnLang").removeClass("active");
        $(".btnLang:eq(2)").addClass("active");
        $("#TheHtmlDocument").attr("lang", "fr").attr("dir", "ltr");
    }
    if (__LoggedInCultureCode === "ar-SA") {
        $(".lang-fl img").attr("src", "../../" + sessionStorage.getItem("lang"));
        $(".btnLang").removeClass("active");
        $(".btnLang:eq(1)").addClass("active");
        $("#TheHtmlDocument").attr("lang", "ar");
        $("body").attr("dir", "rtl");
    }
    $(".btnLang").on("click", function () {
        var ret = "";
        var lang = $(this).find(".selsymbol img").attr("src");
        sessionStorage.setItem("lang", lang);
        $.ajax({
            url: "../WebPages/LoginRegister.aspx/ChangeCulture",
            data: "{ \"culturecode\" : \"" + $(this).data("lang") + "\" }",
            dataType: "json",
            type: "POST",
            async: false,
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                ret = data.d;  // in string format
                location.reload();
            }
        });

        return false;
    });
    var tooltipSpan = $(".tooltip-span");
    window.onmousemove = function (e) {
        var x = e.clientX,
            y = e.clientY;
        $(tooltipSpan).css({ "top": (y + 20) + 'px', "left": (x + 20) + 'px' });
    };
   
    wow = new WOW({
        boxClass: 'wow',
        animateClass: 'animated',
        offset: 80
    });
    wow.init();

});

function SignUp() {
    waitLoader("Please wait. . .", true);
    if ($("#Password1").val() === $("#Password2").val()) {
        var param = [{ "name": "SalutationId", "value": 1 }, { "name": "CountryId", "value": $("#Country").val() },
                  { "name": "MobileNumber", "value": $("#Contact").val() }, { "name": "EmailAddress", "value": $("#Email").val() }, { "name": "CustomerName", "value": $("#Name").val() },
                    { "name": "CustomerAddress", "value": $("#Address").val() }, { "name": "Password", "value": $("#Password1").val() }];
        Action(param, "../../Default.aspx/CustomerSignUp").then(function () {
            $("body").find(".iqwerty_toast_animated").remove();
        });
        $("#signin-box").modal('hide');
    }
    else {
        $("#Password1").css('border-color', 'red');
        $("#Password2").css('border-color', 'red');
        ErrMessage("Password mismatch!");
    }
    return false;
}
function Login() {
    var valid = $("#fav-form-signin").parsley().validate();
    if (valid) {
        waitLoader("Please wait while we authenticate you...", true);
        var param = [{ "name": "EmailAddress", "value": $("#Email_log").val() }, { "name": "Password", "value": $("#Password_log").val() }];
        Selector(param, "../../Default.aspx/CustomerLogin").then(function (result) {
            var dt = JSON.parse(result.d);
            if (dt.length > 0) {
                loginStatus();
                $("body").find(".iqwerty_toast_animated").remove();
                SuccMessage("Authenticaiton successfull!.");
                location.reload();
            }
            else {
                ErrMessage("Invalid userName or Password !");
            }
        });
    } else {
        return false;
    }
    return false;
}
function Logout() {
    var param = [];
    Selector(param, "../../Default.aspx/Logout").then(function (result) {
        SuccMessage(result.d);
        loginStatus();
    });
    return false;
}
function passwordmatch() {
    if ($("#Password1").val() === $("#Password2").val() && $("#Password1").val().length > 3) {
        $("#Password1").css('border-color', 'green');
        $("#Password2").css('border-color', 'green');
    }
    else {
        $("#Password1").css('border-color', 'red');
        $("#Password2").css('border-color', 'red');
    }
}
function changeLanguage(lan) {
    var str = window.location.href;
    if (lan == 1) {
        if (str.indexOf('Arabic') > -1 && str.indexOf('Default') > -1) {
            location.href = "../Default.aspx";
        }
        else if (str.indexOf('Arabic') > -1) {
            location.href = str.replace("Arabic", "WebPages");
        }
    }
    else if (lan == 2) {
        if (str.indexOf('WebPages') > -1) {
            location.href = str.replace("WebPages", "Arabic");
        }
        else {
            location.href = "../Arabic/Default.aspx";
        }

    }
}

$(window).load(function () {

    if (parseInt(sessionStorage.getItem("__customerID")) !== -1 && sessionStorage.getItem("__customerID") !== undefined) {

        $("#CustomerName").removeAttr('hidden');
        $(".hide-links").removeClass("hide-links");
        $("#btn-login").hide();
        $("#btn-regbox").hide();
        $("#CustomerName").text(sessionStorage.getItem("customerName"));
    }
    else {
        $("#btn-login").removeAttr('hidden');
        $("#btn-regbox").removeAttr('hidden');
        $("#CustomerName").attr('hidden', 'hidden');
        $(".hide-links").addClass('hide-links');
    }
});
function loginStatus() {
    location.reload();
}

