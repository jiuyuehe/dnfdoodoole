/**
 * Created with JetBrains WebStorm.
 * User: jiuyuehe
 * Date: 13-8-5
 * Time: 下午9:46
 * To change this template use File | Settings | File Templates.
 */

var weaps = [
    {"name": "one", "level": 50, "color": 1, "icon": "2.ico", "up": 1},
    {"name": "two", "level": 55, "color": 2, "icon": "2.ico", "up": 2},
    {"name": "three", "level": 60, "color": 3, "icon": "2.ico", "up": 3},
    {"name": "four", "level": 65, "color": 4, "icon": "2.ico", "up": 4},
    {"name": "five", "level": 70, "color": 5, "icon": "2.ico", "up": 5},
    {"name": "six", "level": 80, "color": 6, "icon": "2.ico", "up": 6}
];


function showWeaps() {
    var list = " <li><img src='/images/2.ico' class='img-rounded px-28'  onclick='choose()'/></li>";
    var l = [];

    for (var i = 0; i < weaps.length; i++) {
        //  $(".list-inline").html(list);
        l += list;
    }
    $(".list-inline").html(l);
}


function choose() {
    var ico = $("img")[1].src;


    var img = "<img class='px-64' src=\"" + ico + "\">";


    $("#show").append(img);

}


function up() {
    /*  var data =[1,2,3,4,5,6];

     var sum = 0;
     data.forEach(function(value){ sum +=value});

     alert(sum);

     data.forEach(function(v,i,a){a[i] = v+1});

     alert(data);*/

//    a = [1,2,3,5,7,9,12];
//    b = a.map(function(x){return x*x;});
//    alert(b)
//
//    var  sun = a.reduce(function(x,y){return x+y},0);
//         alert(sun);
//    var product = a.reduce(function(x,y){return x*y},1);
//         alert(product);


//    small = a.filter(function(x){return x<7;});
//    console.log(small);
//
//    big = a.filter(function(x,i){return i%2==0;});
//    console.log(big);

    // alert(Math.random());

    var ups = 0;

    vNum = Math.random();
    vNum = Math.round(vNum * 10);

    if (ups == 0) {

    }


}


function getCode() {

    var success = function (msg) {
        $("#code").val(msg.vcode);
    }

    var reerror = function (status) {
        alert(status);
    }

    ajaxPost("/getCode", null, success, reerror);
}


function doregister() {

    var tip = $("#regtip");
    var success = function (msg) {
        if (msg.error) {
            tip.html(msg.error);
            tip.addClass("alert-danger");
        }
        if (msg.success) {
            tip.removeClass("alert-danger");
            tip.addClass("alert-success");
            tip.html(msg.success);
            window.location.href = "/";
        }

    }
    var niname = $("#niname").val();

    if (niname.length > 16 || niname.length < 2) {
        $("#niname").parent().parent().addClass("has-error");
        tip.html("昵称输入不符合要求！");
        tip.addClass("alert-danger");
        return;
    }

    var reerror = function (status) {
        alert("服务器发生错误");
    }

    var password = $("#password").val();
    var repassword = $("#repassword").val();

    if (password.length > 16 || password.length < 6) {
        $("#password").parent().parent().addClass("has-error");
        tip.html("密码输入不合法！");
        tip.addClass("alert-danger")
        return;
    }

    if (password != repassword) {
        $("#repassword").parent().parent().addClass("has-error");
        tip.html("重复密码输入错误");
        tip.addClass("alert-danger")
        return;
    }

    var email = $("#email").val();
    var fe = testemail(email);
    if (fe == false) {
        $("#email").parent().parent().addClass("has-error");
        tip.html("email输入错误");
        tip.addClass("alert-danger");
        return;
    }
    var data = {"niname": niname, "password": password, "password_re": repassword, "email": email, "code": $("#code").val()};
    ajaxPost("/reg", data, success, reerror);

}


function testemail(str) {
    var reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;

    if (reg.test(str)) {
        return true;
    } else {
        return false;
    }

}


function dologin() {
    var login_tip = $("#logintip");
    $.ajax({
        cache: true,
        type: "POST",
        url: "/login",
        data: $('#login_form').serialize(),// 你的formid
        async: false,
        error: function (request) {
            alert("Connection error");
        },
        success: function (data) {
            //$("").parent().html(data);
            if(data.error){
                login_tip.html(data.error);
                login_tip.addClass("alert-danger");
            }
            if(data.success){
                login_tip.removeClass("alert-danger");
                login_tip.html(data.success);
                login_tip.addClass("alert-success");
                window.location.href = "/";
            }
        }
    });

}


function ajaxPost(url, data, success, error) {

    var res = $.ajax({
        type: "POST",
        url: url,
        data: data
    });

    res.done(function (msg) {
        // $.parseJSON(json_data);
        // var code =  JSON.stringify(msg);
        //$("#code").val(msg.vcode);
        success(msg);
    });

    res.fail(function (jqXHR, textStatus) {
        //alert( "Request failed: " + textStatus );
        error();
    });

}