function ExecuteQueryCommand(param, proc) {
    return $.ajax({
        url: "../../../api/DataBase/ExecuteQueryCommand/",
        type: "POST",
        datatype: "json",
        data: JSON.stringify({ paramsList: param, procName: proc }),
        contentType: "application/json; charset=utf-8",
        cache: false,
        success: function (data) {
            console.log(data);
        },
        async: true,
        error: errorFn
    });
}
function ExecuteNonQueryCommand(param, proc) {
    return $.ajax({
        url: "api/DataBase/ExecuteNonQueryCommand/",
        type: "POST",
        datatype: "json",
        data: JSON.stringify({
            "data": param,
            "proc": proc
        }),
        contentType: "application/json; charset=utf-8",
        success: function (data) {
        },
        error: errorFn
    });
}
function ExecuteNonQueryCommandWithOUTPUT(param, proc) {
    return $.ajax({
        url: "api/DataBase/",
        type: "POST",
        datatype: "json",
        data: JSON.stringify({
            "data": param,
            "proc": proc
        }),
        contentType: "application/json; charset=utf-8",
        success: function (data) {
        },
        error: errorFn
    });
}


function UserLogin(param, proc) {
    return $.ajax({
        url: "../../../UserLogin.aspx/Login",
        type: "POST",
        datatype: "json",
        data: JSON.stringify({
            "data": param,
            "proc": proc
        }),
        contentType: "application/json; charset=utf-8",
        success: function (data) {

        },
        error: errorFn
    });
}

function UserLogout() {
    return $.ajax({
        url: "../../../UserLogin.aspx/LogOut",
        type: "POST",
        datatype: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d === "success") {
                window.location.replace("../../../../../../UserLogin.aspx");
            }
        },
        error: errorFn
    });
}

function errorFn(err, status, xhr) {
    alert(status);
    $(".accordion-list-loader").hide();
}
