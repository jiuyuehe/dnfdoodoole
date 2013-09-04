//var date = new Date();
////存储各种时间格式，方便以后扩展
//var time = {
//    date: date,
//    year : date.getFullYear(),
//    month : date.getFullYear() + "-" + (date.getMonth()+1),
//    day : date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate(),
//    minute : date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes()
//}


PageClick = function (pageIndex){

    var success = function(msg){

    };

    var error = function(msg){

    }


    var data = {"pageIndex":pageIndex,"pageSize":pageSize};

    var url = "/admin/getUserPage";

    ajaxPost(url,data,success,error);


}




function ajaxPost(url, data, success, error) {

    var res = $.ajax({
        type: "POST",
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

