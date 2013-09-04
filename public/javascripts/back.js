function backLogin() {
    var login_tip = $(".panel");
    $.ajax({
        cache: true,
        type: "POST",
        url: "/admin_login",
        data: $('#mgr_login').serialize(),// 你的formid
        async: false,
        error: function (request) {
            alert("Connection error");
        },
        success: function (data) {
            //$("").parent().html(data);
            if (data.error) {
                alert(data.error)
                login_tip.html(data.error);
                login_tip.addClass("alert-danger");
            }
            if (data.success) {
                login_tip.removeClass("alert-danger");
                login_tip.html(data.success);
                login_tip.addClass("alert-success");
                window.location.href = "/admin/main";
            }
        }
    });
}

function load_weapon_list() {
    PageClick(1);

}

PageClick = function (pageIndex) {

    var success = function (msg) {

        var html = "";

        var pageCount = msg.pageCount;

        if (msg.weaponList.length > 0) {
            msg.weaponList.forEach(function (weapon) {
                html += '<tr><td>1</td><td>1</td><td></td><td></td><td></td><td></td><td></td></tr>';
            });
        }

        alert(html)

        $(table).innerHTML = html;

    };

    var error = function (msg) {
        alert(msg.error);
    }


    var data = {"pageIndex": pageIndex, "pageSize": 5};

    var url = "/admin/weaponList";

    ajaxPost(url, data, success, error);

}


function ajaxPost(url, data, success, error) {

    var res = $.ajax({
        type: "GET",
        url: url,
        data: data
    });

    res.done(function (msg) {
        success(msg);
    });

    res.fail(function (jqXHR, textStatus) {
        error();
    });
}

