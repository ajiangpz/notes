
var length=2;
function  a(){
    console.log(length);
}
function b(){
    var length=1;
    a();
}
b();