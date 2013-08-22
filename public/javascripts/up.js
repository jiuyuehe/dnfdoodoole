/**
 * Created with JetBrains WebStorm.
 * User: jiuyuehe
 * Date: 13-8-5
 * Time: 下午9:46
 * To change this template use File | Settings | File Templates.
 */

var weaps=[
    {"name":"one","level":50,"color":1,"icon":"2.ico","up":1},
    {"name":"two","level":55,"color":2,"icon":"2.ico","up":2},
    {"name":"three","level":60,"color":3,"icon":"2.ico","up":3},
    {"name":"four","level":65,"color":4,"icon":"2.ico","up":4},
    {"name":"five","level":70,"color":5,"icon":"2.ico","up":5},
    {"name":"six","level":80,"color":6,"icon":"2.ico","up":6}
   ];


function showWeaps(){
    var list =" <li><img src='/images/2.ico' class='img-rounded px-28'  onclick='choose()'/></li>";
    var l=[];

    for(var i=0; i<weaps.length;i++){
      //  $(".list-inline").html(list);
       l +=list;
    }
    $(".list-inline").html(l);
}



function choose(){
    var ico = $("img")[1].src;


    var img = "<img class='px-64' src=\""+ico+"\">";


    $("#show").append(img);

}


function up (){
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
    vNum = Math.round(vNum*10);

    if(ups==0){

    }


}


function getCode(){
    $.ajax()
}

function doregister(){

}