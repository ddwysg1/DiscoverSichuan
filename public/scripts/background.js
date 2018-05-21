var counter = 0;

function changeBG() {
  var imgs = [
        'url("http://www.qiwen.org/uploads/allimg/150925/8-1509251041140-L.jpg")',
        'url("http://scmlzl.com/uploads/allimg/110614/9-110614103J1.jpg")',
        'url("http://pic.lvmama.com/uploads/pc/place2/2016-07-29/be8d1486-10b8-4ec2-902c-15a07f0494bb.jpg")',
        'url("http://www.230917.com/photo/pics/20141123/1416722289.jpg")',
        'url("http://img.171u.com/image/1312/1110534356959.jpg")',
        'url("http://www.discoversichuan.com/img/att/14/1.jpg")',
        'url("http://imglf1.ph.126.net/MnXBJf513UduK-OHmXPLgw==/1671116936831225320.jpg")',
        'url("http://n3-q.mafengwo.net/s6/M00/E7/34/wKgB4lJ_AI2AGtDuABkyVv5OVRs98.jpeg")'
      ];

  if (counter === imgs.length) {
    counter = 0;
  }
  document.body.style.backgroundImage = imgs[counter];

  counter++;
}

setInterval(changeBG, 7500);
