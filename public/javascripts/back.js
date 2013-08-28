


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
            if(data.error){
                alert(data.error)
                login_tip.html(data.error);
                login_tip.addClass("alert-danger");
            }
            if(data.success){
                login_tip.removeClass("alert-danger");
                login_tip.html(data.success);
                login_tip.addClass("alert-success");
                window.location.href = "/admin/main";
            }
        }
    });

}