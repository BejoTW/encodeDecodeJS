// var key = "10001"; //65537 -> 0x10001
var key, bits, str;

var modulus = "92477b6291dea9dbc692cb481e9be506a2c73bf133f742698add7ab5f6c246d3 3afbe61b84bbd58cf8128e2ea62aafd340b234ad62e8ee5ee3949ae18c43eb15";
var pKey = "6f8c48e5d7d760371206f5f1f33c1d11df8d6b9628d63c604314c09fb8afca6e e9ab60d54dd90b6765c5c0a6683460ea40a761f7eefbf8ab19e0b404c2514ee3";
var p = "d6880aa89f9ad7a9cd92518877393b6e685b32a4bd0fbfc6f322cf1f71f09103";
var q = "ae8e0595a075610002f2002ad00de1ab63761283f8b9e09becfaf82826fbfc07";
var dmp1 = "4f74fc250eea8396b5b9161b5d6c27160fbb461104dd5992799bd25792f32c01";
var dmq1 = "47addde60e34faea2df43bc923137e02eaa6472db2e641c5c608369fef87a309";
var coeff = "d173c5dbed599fc03ecb0adb9252372b1d43ad28493703c158ad4660e2d65a4b";
var enStr = "737792c773763cc717848e242b969c63945aaf947d1941006084e4c8d935b817 e334198c6220f5c6937f1e30b63905c4625f574c00b8d95ac1d5d9e55fea21ce";

function do_encrypt() {
    alert("Encrypting...");
    var rsa = new RSAKey();
    rsa.setPublic(modulus, key);
    var res = rsa.encrypt(str);
    if (res) {
        enStr = linebrk(res, 64);
        alert(enStr);
    }
}
function do_decrypt() {
    alert("Decrypting...");
    var rsa = new RSAKey();
    rsa.setPrivateEx(modulus, key, null, p, q, dmp1, dmq1, coeff);

    var res = rsa.decrypt(enStr);
    if (res == null) {
        alert("Decryption failed");
    } else {
        alert(res);
    }
}
function do_genrsa() {
    var rsa = new RSAKey();
    alert("Generating RSA Key...");
    rsa.generate(parseInt(bits), key);
    modulus = linebrk(rsa.n.toString(16), 64);
    pKey = linebrk(rsa.d.toString(16), 64);
    p = linebrk(rsa.p.toString(16), 64);
    q = linebrk(rsa.q.toString(16), 64);
    dmp1 = linebrk(rsa.dmp1.toString(16), 64);
    dmq1 = linebrk(rsa.dmq1.toString(16), 64);
    coeff = linebrk(rsa.coeff.toString(16), 64);

}

function enDeSource() {

    var s = "var f = function (code) {if (code == pw) {return 'pass';} else {return 'fail';}};code = f(code);";
    var t = '0xa';
    var k = '';
    
    key = parseInt("8891").toString(16);
    bits = "512";
    str = 'var t="0x8";var pw="pw1234"';
    
    for (var i = 0, k = ''; i < s.length; i++) {
        var d = (s.charCodeAt(i) * (0x999%parseInt(t))).toString(16);
        while (d.length < 4) {
            d = '0' + d;
        }
        k += d;
    }

    do_genrsa();
    do_encrypt();
    do_decrypt();
    document.write('k:' + k + '<br>var modulus = "' + modulus + '+";<br>var pKey = "' + pKey + '";<br>var p = "' + p + '";<br>var q = "' + q + '";<br>var dmp1 = "' + dmp1 + '";<br>var dmq1 = "' + dmq1 + '";<br>var coeff = "' + coeff + '";<br>var enStr = "' + enStr + '";');
    return;
}
