var allRole = ["鬼剑士", "格斗家", "魔法师", "圣骑士", "神枪手", "刺客"];
var weaponColor = ["史诗", '粉色', '领主粉', '异界', '紫色', '蓝色', '白色'];
var allType = ['武器', '防具', '首饰', '特殊装备'];

/***
 * 后台登录
 */
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

/***
 * 添加武器
 */
function addWeapons() {
    $.ajax({
        cache: true,
        type: "POST",
        url: "/admin/addWeapon",
        data: $('#weapon_form').serialize(),// 你的formid
        async: false,
        error: function (request) {
            alert("Connection error");
        },
        success: function (data) {
            if (data.error) {
                alert(data.error);
            }
            if (data.success) {
                alert(data.success);
                window.location.href = "/admin/toAddWeapon";
            }
        }
    });
}

/**
 * 加载分页界面
 * @type {number}
 */
var indexPage = 1;
var pageCount = 0;

function load_weapon_list() {
    PageClick(indexPage);

}
/**
 * 前一页
 */
function prefixPage() {
    indexPage--;
    PageClick(indexPage);


}
/**
 * 后一页
 */
function nextPage() {
    indexPage++;
    PageClick(indexPage);

}

PageClick = function (pageIndex) {

    success = function (msg) {
        var html = "";
        pageCount = msg.pageCount;

        if (msg.weaponList.length > 0) {
            msg.weaponList.forEach(function (weapon, index) {

                var num = ++index;

                html += "<tr><td>" + num + "</td><td>" + weapon.name + "</td><td>" +
                    "<img class='img-circle  px-64' src=\"../images/pics/" + weapon.pic + "\">" + "</td><td>" + weapon.level
                    + "</td><td>" + allRole[weapon.playRole] + "</td><td>" + weaponColor[weapon.color] + "</td><td>" +
                    allType[weapon.type] + "</td><td>" +
                    weapon.uploader + "</td><td>删除</td></tr>";
            });
        }
        $("tr").not(".th").remove();
        $("table").append(html);
        var lis = $('ul.pagination').children('li');
        if (indexPage == 1) {
            lis.eq(1).addClass("disabled");
            lis.last().children("a").empty();
            lis.last().children("a").append("共" + pageCount + "页");
            if (indexPage == pageCount) {
                lis.eq(2).addClass("disabled");
            }else{
                lis.eq(2).removeClass("disabled");
            }
        } else {
            lis.eq(0).removeClass("disabled");
            lis.eq(1).removeClass("disabled");
            if (indexPage == pageCount) {
                lis.eq(2).addClass("disabled");
            }
        }

    };

    error = function (msg) {
        alert("错误呀！" + msg.error);
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

