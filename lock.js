// public domain
(function (w, d, undefined){

if (w.lk) return; else w.lk = {};

var h = d.head || d.getElementsByTagName('head')[0];

w.lk.opt = {
  // Время блокировки кнопки "Продолжить работу"
  time: 5,
  // Показывать скрипт каждый раз
  showEverytime: false,
  // Не показывать кнопку продолжить :(
  thereIsNoFuture: false,
  // Название сайта в заголовке
  siteName: location.hostname,
  // Ссылка на сайт в заголовке
  siteURL: window.location.protocol+"//"+window.location.host,
  // Адрес петиции
  voteURL: 'https://www.roi.ru/poll/petition/gosudarstvennoe_upravlenie1/otmenit-zakon-o-proizvolnyh-blokirovkah-internet-resursov-ot-02072013-187-fz-zakon-protiv-interneta/',

  // Пользователь будет публиковать адрес текущего сайта с якорем #block если установлен true
  shareLocalURL: false,
  // Адрес, который публикует пользователь в соцсетях. Якорь #block заставляет показать страницу блокировки в любом случае
  shareURL: 'http://showalert.org/#block',  
  // Ссылка на изображение, которое публикует пользователь в соцсетях
  shareImg: '//cdn.jsdelivr.net/jslock/images/lock.png',
  // Заголовок поста, который публикует пользователь в соцсетях
  shareTitle: 'Интернет-свобода под угрозой!',
  // Текст, который публикует пользователь в соцсетях 140 символов
  shareText: 'С 1 августа вступает в силу #ЗаконПротивИнтернета. У нас есть возможность остановить его. Важен каждый голос!',
  
  // Свой собственный текст обращения
  customMessage: '',
  // Показывать текст обращения
  showMessage: true,
  // Показывать инструкцию по регистрации
  showManual: true,

  // Дата, после которой скрипт не запустится (кроме якоря #block)
  deadline: +new Date("Thu Aug 02 2013 09:00:00 GMT+0400 (MSK)"),
  // Показывать только пользователям с русской локализацией системы/браузера
  onlyRusLang: false,
  // Идентификатор глобального счётчика Яндекс.Метрики. Если не хотите делиться статистикой, установите в false
  globalCounterId: 21749860,
  // Настройки личного счётчика Яндекс.Метрики. Установите id, если хотите получать статистику по своему сайту.
  localCounter: {
    id: 0,
    trackLinks:true,
    accurateTrackBounce:true
  },
  // Откуда берутся слайды
  slidePath: "//cdn.jsdelivr.net/jslock/slides/"
};

lk.stat = {
  showedSteps: 0
};

var documentReady = (function (w, d) {
  var inited = false, loaded = false, queue = [], done, old;

  function go() {
    if (!inited) {
      if (!d.body) return setTimeout(go, 13);
      inited = true;
      if (queue) {
        var j, k = 0;
        while ((j = queue[k++])) j.call(null)
        queue = null;
      }
    }
  }

  function check() {
    if (loaded) return;
    loaded = true;
    if (d.readyState === "complete") return go();
    if (d.addEventListener) {
      d.addEventListener("DOMContentLoaded", done, false);
      w.addEventListener("load", go, false)
    } else {
      if (d.attachEvent) {
        d.attachEvent("onreadystatechange", done);
        w.attachEvent("onload", go);
        var k = false;
        try {
          k = w.frameElement == null
        }
        catch (j) {}
        if (d.body.doScroll && k) ie();
      } else {
       old=w.onload;
       w.onload=function(e) {
         old(e);
         go()
       }
      }
    }
  }

  if (d.addEventListener) {
    done = function () {
      d.removeEventListener("DOMContentLoaded", done, false);
      go()
    }
  } else {
    if (d.attachEvent) {
      done = function () {
        if (d.readyState === "complete") {
          d.detachEvent("onreadystatechange", done);
          go()
        }
      }
    }
  }

  function ie() {
    if (inited) return;
    try {
      d.body.doScroll("left")
    }
    catch (j) {
      setTimeout(ie, 1);
      return
    }
    go()
  }

  return function (callback) {
    check();
    if (inited) {
      callback.call(null)
    } else {
      queue.push(callback)
    }
  }
})(w, d);

var getScroll = (w.pageXOffset != undefined) ?
  function() {
    return w.pageYOffset;
  } :
  function() {
    var html = d.documentElement;
    var body = d.body;
    var top = html.scrollTop || body && body.scrollTop || 0;
    top -= html.clientTop;
    return top;
  };

function getStorage(name) {
  if (w.sessionStorage && w.sessionStorage[name]) {
    return w.sessionStorage[name];
  }
  var matches = d.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setStorage(name, val, sec) {
  if (w.sessionStorage) {
    w.sessionStorage[name] = val;
  }
  var date = new Date(new Date().getTime() + sec * 1000);
  d.cookie = name + "=" + val + "; path=/; expires=" + date.toUTCString();
}

function hasClass(el,cls) {
  return el.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
}

function addClass(el,cls) {
  if (!hasClass(el,cls)) el.className += " "+cls;
}

function rmClass(el,cls) {
  if (hasClass(el,cls)) {
      var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
      el.className=el.className.replace(reg,' ');
  }
}

function jsonp(url) {
  s = d.createElement("script");
  s.type = "text/javascript";
  s.charset='UTF-8';
  s.async = true;
  s.src = url;
  h.appendChild(s);
}

lk.applySettings = function(settings) {
    for (var i in settings)
      lk.opt[i] = settings[i];
    if (lk.opt.shareLocalURL)
      lk.opt.shareURL = lk.opt.siteURL + '/#block';
};

lk.applySettings(w.LOCKR_SETTINGS);

var isExpires   = lk.opt.deadline && +new Date() > lk.opt.deadline;
var isRussian   = /^ru/.test(navigator.language);
var isOperaMini = (navigator.userAgent.indexOf('Opera Mini') > -1);
var isBlock     = w.location.hash == '#block'
var isSeenOld   = getStorage('alreadyseenlock');
var isSeenRoi   = getStorage('roi_alreadyseenlock');
var lockTime    = getStorage('timerstatelock') || lk.opt.time;

if (isOperaMini) return;
if (!w.lk.opt.showEverytime && isExpires) return;
if (!w.lk.opt.showEverytime && isSeenRoi && w.location.hash != '#block') return;
if (lk.opt.onlyRusLang && !isRussian) return;
if (lockTime) lockTime = parseInt(lockTime, 10);

lk.share = function(net) {
  function toURI(str) { return encodeURIComponent(str) }
  var url = '';
  switch (net) {
    case "v":
      url  = 'http://vkontakte.ru/share.php';
      url += '?url='         + toURI(lk.opt.shareURL);
      url += '&title='       + toURI(lk.opt.shareTitle);
      url += '&description=' + toURI(lk.opt.shareText);
      url += '&image='       + toURI(lk.opt.shareImg);
      url += '&noparse=true';
      break;

    case "o":
      url  = 'http://www.odnoklassniki.ru/dk?st.cmd=addShare&st.s=1';
      url += '&st.comments=' + toURI(lk.opt.shareText);
      url += '&st._surl='    + toURI(lk.opt.shareURL);
      break;

    case "f":
      url  = 'http://www.facebook.com/sharer.php?s=100';
      url += '&p[title]='     + toURI(lk.opt.shareTitle);
      url += '&p[summary]='   + toURI(lk.opt.shareText);
      url += '&p[url]='       + toURI(lk.opt.shareURL);
      url += '&p[images][0]=' + toURI(lk.opt.shareImg);
      break;

    case "t":
      url  = 'http://twitter.com/share';
      url += '?text='     + toURI(lk.opt.shareText);
      url += '&url='      + toURI(lk.opt.shareURL);
      url += '&counturl=' + toURI(lk.opt.shareURL);
      break;

    case "g":
      url  = 'https://plus.google.com/share';
      url += '?url=' + toURI(lk.opt.shareURL);
      break;

    case "m":
      url  = 'http://connect.mail.ru/share';
      url += '?url='         + toURI(lk.opt.shareURL);
      url += '&title='       + toURI(lk.opt.shareTitle);
      url += '&description=' + toURI(lk.opt.shareText);
      url += '&imageurl='    + toURI(lk.opt.shareImg);
      break;

    case "y":
      url  = 'http://wow.ya.ru/posts_share_link.xml';
      url += '?url='   + toURI(lk.opt.shareURL);
      url += '&title=' + toURI(lk.opt.shareTitle);
      url += '&body='  + toURI(lk.opt.shareText);
      break;

    case "j":
      url  = 'http://livejournal.com/update.bml';
      url += '?subject=' + toURI(lk.opt.shareTitle);
      url += '&event='   + toURI(lk.opt.shareText+'<br/><a href="'+lk.opt.shareURL+'">'+lk.opt.shareTitle+'</a>');
      url += '&transform=1';
      break;

    case "l":
      url  = 'http://www.liveinternet.ru/journal_post.php?action=n_add';
      url += '&cnurl='  + toURI(lk.opt.shareURL);
      url += '&cntitle=' + toURI(lk.opt.shareTitle);
      break;

    case "b":
      url  = 'http://blogger.com/blog-this.g?t';
      url += '&u=' + toURI(lk.opt.shareURL);
      url += '&n=' + toURI(lk.opt.shareTitle);
      break;
  }

  if (url) {
    w.open(url, '', 'toolbar=0,status=0,width=640,height=480');
    lk.sendStat({share:net});
  }
};

lk.votes = function(votes){
  var percent = votes/1000;
  if (percent > 100) percent = 100;

  d.getElementById('lkr-bar').style.width = percent+'%';
  d.getElementById('lkr-votes').innerHTML = votes.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');

};

lk.message = '<div class="lkr-h">Что случилось?</div>' +
'<p>21 июня Государственная Дума РФ <a target="_blank" href="http://lenta.ru/news/2013/06/21/piracylaw/">почти единогласно</a> и в кратчайшие сроки <a target="_blank" href="http://base.consultant.ru/cons/cgi/online.cgi?req=doc;base=LAW;n=148497">приняла закон № 187-ФЗ</a>, широко известный как «антипиратский закон» или «закон о произвольной блокировке» или «русская <a target="_blank" href="http://ru.wikipedia.org/wiki/Stop_Online_Piracy_Act">SOPA</a>». Блокирование будет производиться на стороне Российских провайдеров, <b>домен в иностранной зоне</b> и <b>размещение серверов</b> за границей РФ <b>не повлияет</b> на возможность блокировки.</p>' +
'<div class="lkr-h">Почему это плохо?</div>' + 
'<p>Этот закон даёт широкие возможности для злоупотреблений и недобросовестной конкурентной борьбы, когда злоумышленник может на любом сайте оставить комментарий со ссылкой на пиратский контент, что приведет к закрытию такого интернет-ресурса. Таким образом, под угрозой блокировки оказываются блоги, поисковики, принцип работы которых не позволяет устраивать предварительную модерацию выдачи, публичные торрент трекеры, файловые хранилища, видеохостинги, социальные сети, СМИ. Текст закона противоречит <a target="_blank" href="http://ru.wikipedia.org/wiki/%D0%92%D0%B5%D0%B1_2.0">принципам работы</a> современного свободного интернета.</p>' +
'<p>Более того, из-за технических особенностей организации Сети и невозможности провайдеров блокировать исключительно страницы с контентом, на который подана жалоба правообладателя, ограничение доступа будет распространяться на все ресурсы находящиеся на данном <a target="_blank" href="http://ru.wikipedia.org/wiki/IP-%D0%B0%D0%B4%D1%80%D0%B5%D1%81">IP-адресе</a> (они могут исчисляться <a target="_blank" href="http://habrastorage.org/storage2/39a/1e1/cc5/39a1e1cc541754eee30f8ca06710a217.png">тысячами</a>).</p>' +
'<div class="lkr-h"><a target="_blank" href="http://ru.wikipedia.org/wiki/Когда_они_пришли…">А я здесь при чём?</a></div>' + '<p>Компаниями <a target="_blank" href="http://clubs.ya.ru/company/replies.xml?item_no=67927">Яндекс</a>, <a target="_blank" href="http://googlerussiablog.blogspot.ru/2013/06/google.html">Google</a>, Российской ассоциацией электронных коммуникаций (<a target="_blank" href="http://raec.ru/times/detail/2625/">РАЭК</a>) были предложены поправки к закону, исключающие возможность ложной блокировки не причастных к нелегальной деятельности ресурсов, но Государственной Думой они <a target="_blank" href="http://habrahabr.ru/company/yandex/blog/184182/#comment_6402274">учтены не были</a>.</p>' +
'<p>Может сложиться иллюзия, что ограничения доступа можно обойти техническими средствами. Это не так. Не стоит надеяться на программистов. В случае, если законы подобного уровня проработки будут приниматься дальше, ничто не помешает запретить анонимные cистемы обмена информацией, такие как <a target="_blank" href="http://ru.wikipedia.org/wiki/I2P">I2P</a> или <a target="_blank" href="http://ru.wikipedia.org/wiki/Tor">TOR</a>, ввести лицензирование <a target="_blank" href="http://ru.wikipedia.org/wiki/VPN">VPN</a> и шифрованных туннелей. Если это допустить, то Интернет потеряет независимость.</p>' +
'<div class="lkr-h">Что можно сделать?</div>' + '<p>Ассоциацией пользователей интернета совместно с проектом <a target="_blank" href="http://rublacklist.net/">РосКомСвобода</a> на сайте «Российская общественная инициатива» был организован <a target="_blank" href="https://www.roi.ru/poll/petition/gosudarstvennoe_upravlenie1/otmenit-zakon-o-proizvolnyh-blokirovkah-internet-resursov-ot-02072013-187-fz-zakon-protiv-interneta/">сбор подписей</a> за отмену этого закона. Если под обращением удастся набрать 100.000 подписей, то эта инициатива будет рассмотрена государственными органами. Если вы согласны с тем, что в таком виде этот закон не должен существовать, пожалуйста, поставьте свою подпись под петицией и расскажите всем-всем-всем <span class="lkr-mark">#ЗаконПротивИнтернета</span></p>' +
'<div class="lkr-h">Как голосовать?</div>' + 
'<p>Регистрация на этом сайте считается трудным делом, поэтому мы написали подробную иллюстрированную инструкцию, которая поможет вам легко зарегистрироваться и проголосовать.</p>'

lk.html = '<div class="lkr-fill"></div>' +
'<div id="lkr-body" class="lkr-body">' +
  '<div class="lkr-msg">' +
    '<a href="' + lk.opt.siteURL + '" class="lkr-name">' + lk.opt.siteName + '</a>' +
    '<div class="lkr-cause">Cайт заблокирован по решению органов государственной власти*</div>' +
    '<div class="lkr-note">*Подобное сообщение вы скоро сможете наблюдать вместо любимых сайтов</div>' +
    '<div class="lkr-alert">' +
      '<p>Благодаря поддержке десятков тысяч людей мы <a target="_blank" href="http://www.onlinepetition.ru/%D0%BE%D1%82%D0%BC%D0%B5%D0%BD%D0%B8%D1%82%D1%8C-%D0%BF%D1%80%D0%B8%D0%BD%D1%8F%D1%82%D0%B8%D0%B5-%D0%B7%D0%B0%D0%BA%D0%BE%D0%BD%D0%BE%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%B0---292521-6-/petition.html">смогли собрать</a> более 100.000 подписей за отмену «антипиратского закона» на onlinepetition.ru!</p>' +
      '<p>Но это только первый шаг к успеху.</p>' + 
      '<p>Для того чтобы закон был рассмотрен государственными органами, необходимо повторить этот результат на официальном сайте «Российская общественная инициатива», созданном <a target="_blank"href="http://base.garant.ru/70326884/">по указу Владимира Путина</a>. В этом случае власти будут обязаны ответить на наши требования. Ваш голос поможет сохранить Интернет таким, каким мы его знаем. Будущее Рунета в ваших руках!</p>' +
      '<p>Кроме голосования за <a target="_blank" href="https://www.roi.ru/poll/?s_f_1=user_f_51=DESC">замечательные народные инициативы</a>, регистрация на &#171;Госуслугах&#187; имеет массу полезных функций. На данный момент через этот сайт любой гражданин РФ может оформить загранпаспорт, проверить наличие штрафов, узнать состояние пенсионных накоплений, получить информацию о налоговой задолженности и подать налоговую декларацию, зарегистрировать или снять с регистрации транспортное средство и многое, многое другое.</p>' + 
      '<p>Для регистрации вам понадобится <a target="_blank" href="http://ru.wikipedia.org/wiki/Страховой_номер_индивидуального_лицевого_счёта">номер страхового свидетельства СНИЛС</a>, и немного терпения. До голосования допускаются лица, достигшие 14 лет.</p>' + 
    '</div>' +
    '<div class="lkr-progress">' +
      '<div id="lkr-bar"></div>' +
      '<a class="lkr-stat" target="_blank" href="' + lk.opt.voteURL + '"><span id="lkr-votes">?</span> из 100.000 подписей собрано</a>' +
    '</div>' +
    ((lk.opt.showMessage) ? '<div class="lkr-info">' + ((lk.opt.customMessage) ? lk.opt.customMessage : lk.message) + '</div>' : '') +
    ((lk.opt.showManual) ? '<div class="lkr-man">' +
    '<img id="lkr-slide" src="">' +
    '<div id="lkr-nav">' +
      '<div class="lkr-btn lkr-off" id="lkr-back">Назад</div>' +
      '<div class="lkr-btn" id="lkr-next">Далее<span>: Соглашение с условиями регистрации</span></div>' +
    '</div>' +
    '<div id="lkr-step">' +
    '</div>' +
    '</div>' : '') +
    '<div class="lkr-btnfld'+((lk.opt.thereIsNoFuture) ? ' lkr-nofuture' : '')+'">' +
      '<a class="lkr-btn" id="lkr-pet" target="_blank" href="' + lk.opt.voteURL + '">Подписать петицию</a>' +
      '<a class="lkr-btn lkr-off" id="lkr-res" href="javascript:void(0)">Продолжить работу <span id="lkr-time"></span></a>' +
    '</div>' +
    '<div class="lkr-note">Поделитесь этой информацией с друзьями и знакомыми, для успеха важен каждый голос!</div>' +
    '<div id="lkr-share">' +
      '<a href="javascript:void(0)" id="lkr-v"></a>' +
      '<a href="javascript:void(0)" id="lkr-o"></a>' +
      '<a href="javascript:void(0)" id="lkr-f"></a>' +
      '<a href="javascript:void(0)" id="lkr-t"></a>' +
      '<a href="javascript:void(0)" id="lkr-g"></a>' +
      '<a href="javascript:void(0)" id="lkr-m"></a>' +
      '<a href="javascript:void(0)" id="lkr-y"></a>' +
      '<a href="javascript:void(0)" id="lkr-j"></a>' +
      '<a href="javascript:void(0)" id="lkr-l"></a>' +
      '<a href="javascript:void(0)" id="lkr-b"></a>' +
    '</div>' +
    '<div class="lkr-note">Разместите это обращение на личном сайте, вставив данный код в любую часть страницы</div>' +
    '<div class="lkr-note"><span class="lkr-mark">&lt;script src="//cdn.jsdelivr.net/jslock/lock.min.js"&gt;&lt;/script&gt;</span> Исходный код скрипта <a target="_blank" href="https://github.com/imShara/jslock-roi">на GitHub</a></div>' +
    '<div class="lkr-note lkr-about">По всем вопросам обращайтесь на Email: block.runet@gmail.com</div>' +
  '</div>';

if (lk.opt.globalCounterId)
lk.html += '<noscript><div><img src="//mc.yandex.ru/watch/' + lk.opt.globalCounterId + '" style="position:absolute; left:-9999px;" alt=""></div></noscript>';

if (lk.opt.localCounter.id)
lk.html += '<noscript><div><img src="//mc.yandex.ru/watch/' + lk.opt.localCounter.id + '" style="position:absolute; left:-9999px;" alt=""></div></noscript>';

lk.html += '</div>';

lk.css = ' .lkr-body * {margin:0; padding:0;}' +
'#lkr-v {' +
  'background: #49739f url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAASCAQAAAAqYpy5AAAA7ElEQVR4AWNgMGWwQoIWDEYMigwsDCDw6cHP9wj47eW7K+cX27ozcACl/v/7jwF+vit0A0r9evcfC3h+kIGBiQEK/oYDbQr4dxbCE9ZF0rWfAyR00hLC+/0WSVeVMIMAg/gJbSj3LELqf0n6xPgNuSn1YM5nlnyszvj9eWUegyxWqb+/P94+Mp1BAi71b/v/Nf/X/b8IU7C7BS5VIQix9M8cCP/bc7gLi0Qg9NweCM0mAJea9hMYbpwMYhzuUIF/cMcLBkb7pwatzQmrhcrcgdmFCXwY/v3BKlEHMunu/09I8N3/W/9X/7cFGQkAb0kIEqwXZq4AAAAASUVORK5CYII=) 10px 7px no-repeat;' +
'}' +
'#lkr-o {' +
  'background: #eb722e url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAVCAQAAADYpcc/AAABQklEQVQoFV3AQShDAQCH8X+iiBJGobWSipQbU45ULqiWi3ISN8qJxMVOXLiwy0RpSO2kNkgqLkpplSQBalBayQZ78/HeXnr5yVakOjWrWQ0qkUPFxMDV9tvN2939/vyI3LIVhKdwOFxQsUz+DrLCrJMBWOyX6T4C3wZt+kVjJgmJU+VISt3CS1S2hwBkPveLJH3cweWm8mXKPZ6H7zSFkj63IP3a1yOP3E3tqSf4upCJVgAjdRQ8DLw/Y+pVFn6clmWpUYs8dHOCAZwxoEp5Va/YWip+FJRXtXKpTDVqis4k49c7wpKMn26EJpfGYqHXSyyiiwT/pRmURBl+zo0XACPBLbN49Kc0tgxwHVGlHFzB0XQSIPMVmVa1bK6VcRz25lQlU2iCrE68WHZnlSeJrCH9wofloVwSqzwzLBs+Hjmg4Ac9RBkN375cUQAAAABJRU5ErkJggg==) 10px 5px no-repeat;' +
'}' +
'#lkr-f {' +
  'background: #3b5998 url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAUCAYAAABbLMdoAAAA0ElEQVR4AWMgABiBmJmQAnkgNuPn53fW0tLyBLIdgFgGQ6GkpKTxyZMnZ3/58uXhfyRw9+7dRhSVysrKsq9evTrzHwt48uRJG4riU6dO1f3HAX78+JGPohho6i40NelAbAzFoiiK3717dxCm6vfv31/QPcQExIJArA/CQAUsaPL6SFiA4fTp08EgT4Hwr1+/PsBM/vfv3x+QGAzfv3/fg+H27duZ/4kAX79+NWIA0lFEqP0DxJwkehAPGNmKGRkZ/6Ow8QBQBK0A4ndQ/ABdHgBXHR039iTthgAAAABJRU5ErkJggg==) 10px 5px no-repeat;' +
'}' +
'#lkr-t {' +
  'background: #00aced url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAASCAQAAAAeG12lAAABP0lEQVQYGYXATyhDcQAH8C89jSiVsLJcdlktCTWqrUhOKi6rXSjlaicnJ5VqJdIujnORIrVquUgJFSerAWbRVIg2a2bb23u/r81gb/98AKAWpSQYMQAb+qAH0IhO5HSb0Q4tyTp4tvnxrCTfbnwuWGanovPICa17F6BHgbGu2C1/vYcpDu3oABC/EIrPBRPq8O3cQ40X/4krNQMgEWBWaGdoFEY0IStxz2LHbAWQXOWXTCKwMTct2dArR6kRP6IOOWvDQuavTDxyqaSo8bSMvMDKtZdVvTqRlzzgP+R+5NHBqpQoJfyIuSlYkezGn/D4w54QLEvINOAPe5hmBeoStDjCO5YhTtmAIvUtpt1FNU0NEaIBBZphhmXCceVVM9Tapx6FaFW25SAFtR45yRoUYxud3GKQEaqM0E8P7dShxCchUcYb/lD8HQAAAABJRU5ErkJggg==) 6px 6px no-repeat;' +
'}' +
'#lkr-g {' +
  'background: #dd4c39 url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAVCAQAAADoKdYeAAABwElEQVQ4EY3AT0hTAQDH8d/syTKoMYeMTkWbMLyElboaxIuCsNolQikh8hSQl9QIoktBFdCxIgSEILyYHbUIqIvWBATSWiWlzkuha5Rt+Nre+wb7Y5M56aMit4Lap4hMmTJl6qC2q4r6c6eTA7wlSUmCFpUYMmWoaOtgf+433RK1XMGxUk/6Juq0JuaDmE8FtyO5TGZWRdl7YCWP+lVgyBjyw5BfhgxJX+7D0msV0eDYMHVGeeFj4WhXJ3R1hqPhqKTkMPx4r1oVZRZg+YLyWKCMpPQNcLLdbSqoy3zDIaQ8PHgTAUgE8OKVRCM5iD/THhly957C5qHKxHwQ86mEywAzjyMnOjp+TvKAGpXBA3j0D8cZZdFOQ/Kl/k96HBKvtEubcqlBITVPPwKYHFRINapi247W4Wupp9k3zhQOwNexYJM25O47u/KZJfppwkuQO+QgPqItqtR7xErl5tmpNRy2f9mrt/yqlHgOiz1a5/td+NSqSn+WYeyi1oldBUKqlP0Acy/UKEMFhnbPjdqzuFSJdiyIjxw6qf3aq5bm9ncDZDC1McKMg2OtTq9MWB+xmKFNmyHAea5zk0scwKUq/gJ9khLZHVPjngAAAABJRU5ErkJggg==) 6px 6px no-repeat;' +
'}' +
'#lkr-m {' +
  'background: #034a88 url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAXCAQAAACl4XcVAAACkUlEQVQ4EXXBYWyMdwDH8d/dI0NVcllZqJMM0SgioiO8wIsJqywxqWSbRBPEG6GMpLGIN9JIcEGwxqsCEZnZC42QxrLxZkCB6qUNqndNtKe9Xq931z7X5//1b4ETPh/l8GuMilSi+ZqvOSrWOA3TZ/k0Ibj4zM6m2u5wuj3d3vW45WrtnnnLNEl+feKrvDn/HOzv4hPZVP3JooXK00eGly2P3QOgjcOUs5TlrOcEMazelopfNEpv+deVpqJgOlmHI78CGqcCDZMYzhaS4MZ3rZajQTOndIfBRCmWVBhcfOS3S3uP7/iuVFPlKPDfXBOGVKR0uizn5jEwvUyTVFQX6o8zxHMbL8xddGTzgY0EvRjcr5Gj1ZOzSfC2SypsugiASytJrETzQHogLfETuImfp+j/ShiIM1LOvyHAUEVAwuEH85whEr6+Rri1Q9FaSJyV1kxyE5Ddp/cIegksWZ0HIHpRPWFo2yTVbwbTT0AfiYewZLX+CokG9b2EhhXSi8OQbFCOpjIsWQ+XQDqqvna4XSbFqqGrXjmur8KSdXcluJ1KPYGb26TURsi80tf6wH9jP5as21sh80w9f0Hzn/JRaAbg1FaN0hvOt7N7WrBkNZ+DZJ0yGyDTHpwgeUch07GtXDM0WdNmfR+5xhD58sf2tkK6UhR4KbhSpRHkmVvgZSPXH5x9drk/DiaFNb7k/O9gXCZK8kLgJtau0AjyOY3hnQZKTBY67rhx8Ko1iNHmKaQia1epUD6KqeQPqvgRRzLnGWIeMlpvUGRikO2tC41dqKn6RgEFNF4zVFI7hmoeUEOBPqCYMFbmVePfF3YfqjhUcSUUudYdvhHU55BPFQlyZQnqS8innJPU00YHj6hhgXK8Bh3H/nl3AW8IAAAAAElFTkSuQmCC) 5px 4px no-repeat;' +
'}' +
'#lkr-y {' +
  'background: #e22f2c url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAXCAQAAAB+Wt03AAABcUlEQVR4AW3QwSuDcRzH8c+0pWgLdiHJJBKhpLUSQzXl4kLJyT/htEqLxJ2bSgVWypmLUJmByZTAAIIys1l77Pn4PWP9tiev7/Hdt299kaUK7XCiFgYAubCjOjOWBb2qSl6tWmsAjz16d74CyT/JP6eLwM0YqbxD+jxMZ+UNuHST0QtInE9ndVdsZ2UTLIOWRIDC96XPBvO+yLFrYypVt9p6ykMfC0vdEXBny2v3FFgcgNEAGLpdt+vJBFO+Xr5eKY3AWhK9oybCGL8pPXAUgG+YVJ5ZzyIWP/ZTUDppE5MHzcMK+TiDlCMHhfFCSOE18mQWZphg2minEKiRNSfPD1S4PINOl9MVckCPxYxTSMbFJPTbAlu4zwx+kXUOW5UwNSq51wC96SE1ScaXVYUMNumrOXxGKruvXRSOG3V1aoCatrnK/3L+k49MvgHbHf/kiV4KihsI9lE4yLptut+kxgL8/vy6GRKt1IxAYB01pbL+AIS7N/GLPM0zAAAAAElFTkSuQmCC) 9px 4px no-repeat;' +
'}' +
'#lkr-j {' +
  'background: #223769 url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAXCAQAAACsCtdvAAAB/ElEQVQ4EX3ADWiMYQAH8P/rvorEbh+Hq7TtmspKqFjrqmbXlZSSKSVNzaqOKKpJQSkRWaIamHY1KkNZTMalrksy9xECZFtju/Pex2z38d77PH8l6+5m88NfFVgDJxphxzwMqO89kgqI6Xzi2UWUYw7K2oZxn0xP9IW86e+U3sOwYLa6GjWYj5xunbhPwQzzWnKPGwpKDV3S413t2ghv5+oXLn/eQamGKx0olR79cCvzjcdhXrL+yYnsI6bJkBdWFBPJTHTqZYthhzsZnh5W3SzXAxTdB2FGgThKfu53rEu/59t8Yq8bCu0ypsV3N0PBDBp0H+WYP/uYRt0XD1bVAnRRjwWralHAZSJK3vFAoU3+eH0TSwFxjBzqRhkK6KJQ39TUAXRKrcsDExfIASmu7IcZBTxFhnthBdihRbc7AVaI0Zy6swkKZtCg+yl7DsFCRfZH/ZZVMHGD1KKvbNUooF3+1JKtLii06iNf7m7agsbIdTLciWLcTBkLVzqAybb8GCcZ5Vf9VyKMUjxLhnpQ5l89foMKFwOpgZwKI4rRpL+Q4tqBy9vUc/hDPUmeWYFSXCkTufjwYGAfjAAw5SIHmzEbt1KS7/oa3LBDuWqjCHrwL+5ihNTjTy9YN7a3aKmPnZgbm3iPIvspnyTHHmB+rOZ5JshUEP/HRWzjw99Maio8U51lNgAAAABJRU5ErkJggg==) 7px 4px no-repeat;' +
'}' +
'#lkr-l {' +
  'background: #28819b url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAALklEQVR4AWMAAgc4Jh4g9PxHAkRqRtEz5AzABHQwgP6xMGqAAzZMwADCYHAbAACehY5EP8t3cgAAAABJRU5ErkJggg==) 8px 8px no-repeat;' +
'}' +
'#lkr-b {' +
  'background: #fc9948 url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAUCAYAAABvVQZ0AAABQklEQVR4AeXUsUsCYRjH8ccGhxqdsqGh6cYGmxwiagrXwCloCByKDPwXDoJuta2pocnBUZojCeK64xrDf0CPJPHyuPfXb7joeAgRdesD30Ffed5DHpWMHCuybVZmu6oys9gamypfKBRKnU7H6ff7XhzHn1D43qjX6z3U6/Xj9NI/5arV6sFgMHjDDIwxMS+9FpF10SzL2pxlkMaBdvrV/Op2u1eYw2Qy+ahUKquSFYZhgDm1Wi1LspIkiaB4nrcviu/7h1Da7faRZEEjx3HO9Wo0m81LKK7r3vGslK7TlmAxZjgcvnOdXvnk94Il+s/DgiDYkyl4vgMggSLGmC8otm3XsmuhazQaJ4bUH0EoURR5WILxePwo/AVcYAk453SFbgD4sgAALufc/rzYYC+YzzMr6ul5dsae2AjTjdLP1VheUt/I6kl2Tsxu2QAAAABJRU5ErkJggg==) 7px 6px no-repeat;' +
'}' +
'.lkr-fill {' +
  'position: fixed;' +
  'top: 0;' +
  'left: 0;' +
  'width: 100%;' +
  'height: 100%;' +
  'background: #111111;' +
  'z-index: 999998;' +
'}' +
'html .lkr-body {' +
  'position: absolute;' +
  'top: 0;' +
  'left: 0;' +
  'width: 100%;' +
  'color: #c9ccd4;' +
  'font-size: 16px;' +
  'font-family: Verdana, sans-serif;' +
  'z-index: 999999;' +
  'text-align: left;' +
  'text-shadow: none;' +
'}' +
'.lkr-body p {' +
  'margin: 10px;' +
'}' +
'.lkr-mark {' +
  'color: #aaa !important;' +
  'background-color: #202020 !important;' +
  'padding: 2px;' +
'}' +
'.lkr-h {' +
  'color: #e8ebf3;' +
  'font-size: 1.6em;' +
  'font-family: Georgia, serif;' +
  'text-align: center;' +
  'margin: 30px 0  10px 0;' +
'}' +
'.lkr-body a {' +
  'border: none !important;' +
'}' +
'.lkr-body a:hover {' +
  'border: none !important;' +
'}' +
'.lkr-msg {' +
  'max-width: 640px;' +
  'margin: 60px auto 20px auto;' +
'}' +
'a.lkr-name {' +
  'text-align: center;' +
  'font-size: 2.5em;' +
  'color: #e8ebf3 !important;' +
  'font-family: Georgia, serif;' +
  'text-decoration: none !important;' +
  'display: block;' +
'}' +
'html a.lkr-name:hover {' +
  'color: #fff !important;' +
'}' +
'.lkr-cause {' +
  'margin-top: 30px;' +
  'color: #e8ebf3;' +
  'text-align: center;' +
  'font-weight: 700;' +
  'font-size: 1em;' +
  'font-family: Georgia, serif;' +
'}' +
'.lkr-note {' +
  'margin: 10px;' +
  'color: #888;' +
  'text-align: center;' +
  'font-size: 0.7em;' +
'}' +
'.lkr-note a {' +
  'color: #888 !important;' +
  'text-decoration: underline !important;' +
'}' +
'.lkr-note a:hover {' +
  'color: #71acfb !important;' +
'}' +
'.lkr-alert {' +
  'margin: 20px 5%;' +
  'border-radius: 5px;' +
  'background: #abeb83;' +
  'color: #141414;' +
  'font-size: 0.8em;' +
  'overflow: hidden;' +
  '}' +
  '.lkr-progress {' +
  'margin: 20px 5% 40px 5%;' +
  'width: 90%;' +
  'height: 46px;' +
  'line-height: 46px;' +
  'font-family: Georgia;' +
  'border-radius: 5px;' +
  'background: #202020;' +
  'text-align: center;' +
  'font-weight: 700;' +
  'font-size: 1em;' +
  'overflow: hidden;' +
  'position: relative;' +
  'text-shadow: 1px 1px 1px rgba(0,0,0,.3);' +
'}' +
'.lkr-alert a {' +
  'color: #000;' +
  'text-decoration: underline !important;' +
'}' +
'#lkr-bar {' +
  'width: 0;' +
  'height: 100%;' +
  'background: #4184df;' +
  'border-radius: 5px;' +
  'box-shadow: inset -100px 0px 100px -50px rgba(255, 255, 255, .2);' +
'}' +
'.lkr-stat {' +
  'width: 100%;' +
  'height: 46px;' +
  'color: #e8ebf3 !important;' +
  'text-decoration: none !important;' +
  'line-height: 46px;' +
  'position: absolute;' +
  'top: 0;' +
  'left: 0;' +
'}' +
'html .lkr-stat:hover {' +
  'color: #fff !important;' +
'}' +
'.lkr-info {' +
  'font-size: 0.8em;' +
  'line-height: 1.3em;' +
'}' +
'.lkr-info a {' +
  'color: #e8ebf3 !important;' +
  'text-decoration: underline !important;' +
'}' +
'.lkr-info a:hover {' +
  'color: #71acfb !important;' +
'}' +
'.lkr-btn {' +
  'display: block;' +
  'border-radius: 5px;' +
  'background: #202020;' +
  'color: #c9ccd4 !important;' +
  'text-align: center;' +
  'padding: 14px 3%;' +
  'font-size: 0.9em;' +
  'margin: 0 5%;' +
  'text-shadow: 1px 1px 1px rgba(0,0,0,.3);' +
  'cursor: pointer;' +
'}' +
'a.lkr-btn, div.lkr-btn {' +
  'text-decoration: none !important;' +
'}' +
'.lkr-btn:hover {' +
  'color: #fff !important;' +
  'background: #4184df;' +
'}' +
'.lkr-btnfld, #lkr-nav {' +
  'overflow: hidden;' +
  'margin: 40px 0;' +
'}' +
'.lkr-btnfld .lkr-btn {' +
  'float: left;' +
  'width: 34%;' +
  'margin: 0 5%;' +
'}' +
'#lkr-pet:hover {' +
  'background: #91c76f;' +
'}' +
'.lkr-about {' +
  'margin-top: 100px;' +
'}' +
'#lkr-share {' +
  'overflow: hidden;' +
  'margin: 20px auto;' +
  'width: 400px;' +
'}' +
'#lkr-share a {' +
  'display: block;' +
  'float: left;' +
  'margin: 4px;' +
  'width: 32px;' +
  'height: 32px;' +
  'border-radius: 3px;' +
'}' +
'#lkr-share a:hover, #lkr-share a:focus {' +
  'margin: 6px 4px 2px 4px;' +
  'opacity: .6;' +
  'cursor: pointer;' +
'}' +
'.lkr-man {' +
  'margin: 40px 0;' +
'}' +
'#lkr-slide {' +
  'width: 100%;' +
'}' +
'.lkr-act {' +
  'font-size: 1.4em;' +
  'font-family: Georgia, serif;' +
  'margin: 20px 10px 10px 10px;' +
'}' +
'.lkr-act a {' +
  'color: #e8ebf3;' +
  'text-decoration: underline !important;' +
'}' +
'.lkr-act a:hover {' +
  'color: #71acfb;' +
'}' +
'.lkr-man p {' +
  'font-size: 0.8em;' +
  'color: #888;' +
  'margin: 0 10px 0 25px;' +
'}' +
'.lkr-man p a, .lkr-man li a {' +
  'color: #888 !important;' +
  'text-decoration: underline !important;' +
'}' +
'.lkr-man p a:hover {' +
  'color: #71acfb !important;' +
'}' +
'.lkr-columns {' +
  'list-style-type: none;' +
  'overflow: hidden;' +
  'margin-left: 20px;' +
'}' +
'.lkr-columns li {' +
  'float: left;' +
  'width: 50%;' +
  'margin: 0;' +
'}' +
'.lkr-columns li li {' +
  'float: none;' +
  'width: auto;' +
  'list-style-type: circle;' +
  'margin: 10px 10px 0 25px;' +
  'font-size: 0.8em;' +
  'color: #888;' +
'}' +
'#lkr-nav .lkr-btn {' +
  'float: left;' +
'}' +
'#lkr-back {' +
  'width: 14%;' +
'}' +
'#lkr-next {' +
  'width: 54%;' +
'}' +
'.lkr-off {' +
  'color: #444 !important;' +
  'text-shadow: none;' +
  'cursor: default;' +
'}' +
'.lkr-off:hover {' +
  'color: #444 !important;' +
  'background: #202020 !important;' +
'}' +
'.lkr-nofuture #lkr-pet {' +
  'width: auto;' +
  'float: none;' +
'}' +
'.lkr-nofuture #lkr-res {' +
  'display: none;' +
'}' +
'@media only screen and (max-width: 580px) {' +
    '#lkr-share a {' +
    'width: 64px;' +
    'height: 64px;' +
    'margin: 8px;' +
    'background-position: center !important;' +
  '}' +
  '#lkr-share a:hover, #lkr-share a:focus {' +
    'margin: 10px 8px 6px 8px;' +
  '}' +
  '.lkr-btnfld .lkr-btn {' +
    'float: none;' +
    'width: auto;' +
    'margin: 20px 5%;' +
  '}' +
  '#lkr-next, #lkr-back {' +
    'width: 34% !important;' +
  '}' +
  '#lkr-next span {' +
    'display: none;' +
  '}' +
  '.lkr-columns li {' +
    'float: none;' +
    'width: auto;' +
  '}' +
  '.lkr-body {' +
    'font-size: 120%;' +
  '}' +
'}' +
'@media only screen and (max-width: 420px) {' +
  '#lkr-share {' +
    'width: 160px;' +
  '}' +
'}';

lk.manual = {
  step:  0,
  method: '',
  slide: [
    {
      html:   '<div class="lkr-act">1. Зайдите на сайт <a target="_blank" href="http://gosuslugi.ru">gosuslugi.ru</a> и начните регистрацию</div>' +
              '<p>Для голосования на сайте &#171;Российская Общественная Инициатива&#187; (сокращённо РОИ) необходимо зарегистрироваться на портале &#171;Госуслуги&#187;. Чтобы начать регистрацию, зайдите на <a target="_blank" href="https://www.gosuslugi.ru/">главную страницу</a> портала &#171;Госуслуги&#187; и нажмите кнопку &#171;Регистрация&#187; в правом верхнем углу.</p>' +
              '<p>Если у вас уже есть учётная запись на портале &#171;Госуслуги&#187;, вы можете переходить к шагу &#171;Авторизация на сайте РОИ&#187;.</p>'
    },{
      btntxt: 'Cоглашение с условиями регистрации',
      html:   '<div class="lkr-act">2. Прочтите условия и нажмите &#171;Далее&#187;</div>' +
              '<p>На данной странице кратко описан весь процесс регистрации на &#171;Госуслугах&#187;. Ознакомьтесь с краткими условиями и нажмите кнопку &#171;Далее&#187;.</p>'
    },{
      btntxt: 'Условия работы с порталом',
      html:   '<div class="lkr-act">3. Отметьте галочку &#171;Подтвердить&#187; и нажмите &#171;Далее&#187;</div>' +
              '<p>Здесь описано, как будут использоваться введённые вами персональные данные. От вас требуется подтвердить согласие на их обработку.</p>'
    },{
      btntxt: 'Выберите способ активации',
      html:   '<div class="lkr-act">4. Способ подтверждения личности</div>' +
              '<p>Выберите один из двух способов получения кода активации: через Почту России или через центр обслуживания &#171;Ростелекома&#187;.</p>' +
              '<ul class="lkr-columns">' +
                '<li>' +
                  '<div class="lkr-act">Почта России</div>' +
                  '<ul>' +
                    '<li>Доступно каждому, но возможно большое время ожидания (до 30 дней и более).</li>' +
                    '<li>Письмо с кодом активации вы сможете получить в вашем почтовом отделении.</li>' +
                  '</ul>' +
                '</li>' +
                
                '<li>' +
                  '<div class="lkr-act">Ростелеком</div>' +
                  '<ul>' +
                    '<li>Не надо ждать, код можно получить уже в день регистрации за один визит.</li>' +
                    '<li>Обратите внимание, что такие центры есть не во всех населённых пунктах.</li>' +
                    '<li>Обязательно <a target="_blank" href="http://www.gosuslugi.ru/pgu/maps">убедитесь</a>, что у вас есть возможность добраться до такого центра.</li>' +
                  '</ul>' +
                '</li>' +
              '</ul>'
    },{
      btntxt: 'Заполнение формы регистрации',
      html  : '<div class="lkr-act">5. Заполните форму регистрации</div>' +
              '<p>Заполните форму, используя свои личные данные и номер СНИЛС. В случае получения кода активации через Почту России, необходимо ввести почтовый адрес для доставки письма с кодом. При активации через Ростелеком этого делать не требуется.</p>'
    },{
      btntxt: 'Создание пароля',
      html  : '<div class="lkr-act">6. Придумайте пароль и контрольный вопрос</div>' +
              '<p>Придумайте пароль для доступа к вашей учётной записи, а также контрольный вопрос. Контрольный вопрос и ответ на него используются для восстановления пароля в случае его утери.<p>'
    },{
      btntxt: 'Коды авторизации',
      html  : '<div class="lkr-act">7. Введите пришедшие коды подтверждения</div>' +
              '<p>Введите коды подтверждения контактных данных из сообщений, пришедших на ваш адрес электронной почты и мобильный телефон. При необходимости воспользуйтесь функцией &#171;Отправить код повторно&#187;. После получения и введения кодов подтверждения нажмите кнопку &#171;Далее&#187;</p>'    
    },{
      btntxt: 'Результат регистрации',
      html  : '<div class="lkr-act">8. Результат регистрации</div>' +
              '<p>Поздравляем, регистрация на портале &#171;Госуслуги&#187; завершена! В случае, если вы выбрали активацию через Ростелеком, вам будет предложено <a target="_blank" href="http://www.gosuslugi.ru/pgu/maps">найти центр обслуживания на карте</a>.</p>'   
    },{
      btntxt: 'Получение кода активации',
      html  : '<div class="lkr-act">9. Получите код активации</div>' +
              '<p>Теперь вам необходимо получить код активации выбранным ранее в процессе регистрации способом. Дождитесь письма с кодом, либо посетите офис обслуживания Ростелекома. В первом случае вам будет необходим паспорт гражданина РФ, во втором случае - паспорт и пенсионное свидетельство</p>'
    },{
      btntxt: 'Активация учётной записи',
      html  : '<div class="lkr-act">10. На сайте <a target="_blank" href="https://esia.gosuslugi.ru/sia-web/activation/Index.spr?type=rf">Госуслуг</a> нажмите &#171;Ввести код активации&#187;</div>' +
              '<p>Чтобы начать активацию вашей учётной записи на портале &#171;Госуслуги&#187;, зайдите на <a target="_blank" href="https://www.gosuslugi.ru/">главную страницу</a> портала, нажмите на кнопку &#171;Регистрация&#187; и на открывшейся странице нажмите кнопку &#171;Ввести код активации&#187;.</p>'
    },{
      btntxt: 'Ввод кода активации',
      html  : '<div class="lkr-act">11. Введите ваш СНИЛС, код активации и код с картинки</a></div>' +
              '<p>Введите ваш СНИЛС, код активации, полученный через &#171;Почту России&#187; либо &#171;Ростелеком&#187;, а также код, указанный на изображении.</p>'
    },{
      btntxt: 'Результат выполнения активации',
      html  : '<div class="lkr-act">12. Результат выполнения активации</a></div>' +
              '<p>Поздравляем! Ваша учётная запись на портале &#171;Госуслуги&#187; активирована. Теперь ей можно пользоваться для авторизации на сайте РОИ и голосования за инициативы.</p>'
    },{
      btntxt: 'Авторизация на сайте РОИ',
      html  : '<div class="lkr-act">13. &#171;Российская Общественная Инициатива&#187;, авторизация</a></div>' +
              '<p>Чтобы начать авторизацию на сайте РОИ, перейдите на <a target="_blank" href="https://www.roi.ru/">главную страницу</a> сайта и нажмите &#171;Вход&#187; в правом верхнем углу. Вы будете перенаправлены на страницу авторизации на портале &#171;Госуслуги&#187;.</p>'
    },{
      btntxt: 'Ввод авторизационных данных',
      html  : '<div class="lkr-act">14. Ввод данных авторизации на портале &#171;Госуслуги&#187;</a></div>' +
              '<p>На открывшейся странице введите свой СНИЛС и пароль для учётной записи на портале &#171;Госуслуги&#187;, после чего нажмите &#171;Войти&#187;. Вы будете перенаправлены обратно на сайт РОИ.</p>'
    },{
      btntxt: 'Ввод дополнительной информации',
      html  : '<div class="lkr-act">15. Ввод дополнительной информации</a></div>' +
              '<p>В случае если вы пользуетесь сайтом РОИ впервые, вам будет предложено ввести дополнительную информацию о себе. Укажите федеральный округ, регион и муниципалитет, в котором вы зарегистрированы, а также подтвердите, что вы старше 18-ти лет. После чего нажмите кнопку &#171;Сохранить&#187;.</p>' +
              '<p>Если вы пользовались сайтом РОИ ранее, вводить дополнительную информацию не потребуется и этот шаг можно пропустить.</p>'
    },{
      btntxt: 'Результат авторизации на РОИ',
      html  : '<div class="lkr-act">16. Результат авторизации на РОИ</a></div>' +
              '<p>Поздравляем! Вы успешно авторизовались на сайте РОИ и теперь можете пользоваться им для голосования за инициативы.</p>'
    },{
      btntxt: 'Поиск инициативы',
      html  : '<div class="lkr-act">17. Введите запрос в поле поиска</a></div>' +
              '<p>Для выбора инициативы в поддержку отмены закона о произвольных блокировках, введите её название (полностью или частично) в строку поиска и перейдите по ссылке, появившейся в выпадающем списке. Либо воспользуйтесь <a target="_blank" href="https://www.roi.ru/poll/petition/gosudarstvennoe_upravlenie1/otmenit-zakon-o-proizvolnyh-blokirovkah-internet-resursov-ot-02072013-187-fz-zakon-protiv-interneta/">прямой ссылкой</a> на инициативу.</p>'
    },{
      btntxt: 'Голосование за инициативу',
      html  : '<div class="lkr-act">18. Голосование за инициативу</a></div>' +
              '<p>Прокрутите открывшуюся страницу с описанием инициативы вниз, чтобы увидеть кнопки голосования. Чтобы проголосовать за инициативу, нажмите на кнопку &#171;+&#187;.</p>'
    },{
      btntxt: 'Конец',
      html  : '<div class="lkr-act">19. Результат голосования</a></div>' +
              '<p>Отдав свой голос за или против инициативы, вы увидите оповещение, подтверждающее, что ваш голос был учтён. В случае голосования ЗА инициативу оповещение будет выглядеть так, как показано выше.</p>' +
              '<p>Процедура голосования завершена! Спасибо за то, что выразили свою гражданскую позицию и поддержали нашу инициативу. Вместе мы будем продолжать бороться за независимость Рунета!</p>'
    }
  ]
};

lk.manual.nav = function(dir) {
  var next = d.getElementById('lkr-next');
  var back = d.getElementById('lkr-back');
  var slides = lk.manual.slide.length;

  if (lk.manual.step == 0 && dir > 0)
    rmClass(back, 'lkr-off');
  else if (lk.manual.step == 1 && dir < 0)
    addClass(back, 'lkr-off');
  else if (lk.manual.step == slides-2 && dir > 0)
    addClass(next, 'lkr-off');
  else if (lk.manual.step == slides-1 && dir < 0)
    rmClass(next, 'lkr-off');
  
  if (lk.manual.step+dir >= 0 && lk.manual.step+dir <= slides-1)
    lk.manual.step += dir;
  else 
    return;

    var step = d.getElementById('lkr-step');
    d.getElementById('lkr-slide').src = lk.opt.slidePath+'/'+lk.manual.step+'.png';
    d.getElementById('lkr-step').innerHTML = lk.manual.slide[lk.manual.step].html;

    var btntxt = '';

    if (lk.manual.slide[lk.manual.step+1] && lk.manual.slide[lk.manual.step+1].btntxt) {
      btntxt = ': ' + lk.manual.slide[lk.manual.step+1].btntxt;
      next.innerHTML = 'Далее<span>' + btntxt + '</span>';
    }

    for (i=1; i < 4; i++) {
      if (lk.manual.slide[lk.manual.step+i] && !lk.manual.slide[lk.manual.step+i].img) {
        lk.manual.slide[lk.manual.step+i].img = new Image();
        lk.manual.slide[lk.manual.step+i].img.src = lk.opt.slidePath+'/'+(lk.manual.step+i)+'.png';
      }
    }

    // get man deep for metrics
    if (lk.stat.showedSteps + dir > lk.stat.showedSteps)
      lk.stat.showedSteps = lk.stat.showedSteps + dir;
};

lk.timer = function() {
  var timerEl = d.getElementById('lkr-time');
  var resBtn = d.getElementById('lkr-res');
  if (lockTime == 0) {
    timerEl.parentNode.removeChild(timerEl);
    rmClass(resBtn, 'lkr-off');
  } else {
    timerEl.innerHTML='('+(lockTime--)+')';
    setStorage('timerstatelock', lockTime, 3456000);
    setTimeout(lk.timer, 1000);
  }
};

lk.sendStat = function(params) {
  if (lk.opt.globalCounterId)
    globalCounter.params(params);

  if (lk.opt.localCounter.id)
    localCounter.params(params);
};

// addEventListener, работающий и в IE 6-8.
lk.addEventListener = function(target, eventName, listener) {
  if (target.addEventListener)
    target.addEventListener(eventName, listener, false)
  else if (target.attachEvent)
    target.attachEvent("on" + eventName, listener);
}  

// removeEventListener, работающий и в IE 6-8.
lk.removeEventListener = function(target, eventName, listener) {
  if (target.removeEventListener)
    target.removeEventListener(eventName, listener, false)
  else if (target.detachEvent)
    target.detachEvent("on" + eventName, listener);
}  

if (lk.opt.globalCounterId) {
  var globalCounter = {
      params: function (params) {}
  };
}

if (lk.opt.localCounter.id) {
  var localCounter = {
      params: function (params) {}
  };
}

(function () {
    var c = "yandex_metrika_callbacks";
    (w[c] = w[c] || []).push(function() {
        try {
          if (lk.opt.globalCounterId) {
            globalCounter = new Ya.Metrika({
                id: lk.opt.globalCounterId,
                trackLinks:true,
                accurateTrackBounce:true
            });
            globalCounter.params({visit: true});
          }
          lk.sendStat({visit:true});

          if (lk.opt.localCounter.id) {
            localCounter = new Ya.Metrika(lk.optlocalCounter);
            localCounter.params({visit: true});
          }
        } catch(e) { }
    });

    var n = d.getElementsByTagName("script")[0],
    s = d.createElement("script"),
    f = function () { n.parentNode.insertBefore(s, n); };
    s.type = "text/javascript";
    s.async = true;
    s.src = (d.location.protocol == "https:" ? "https:" : "http:") + "//mc.yandex.ru/metrika/watch.js";

    if (w.opera == "[object Opera]") {
        d.addEventListener("DOMContentLoaded", f, false);
    } else { f(); }
})();

documentReady(function(){

  var style = d.createElement('style');
  style.type = 'text/css';
  if (style.styleSheet)
    style.styleSheet.cssText = lk.css;
  else
    style.appendChild(d.createTextNode(lk.css));
  h.appendChild(style);

  var div = d.createElement('div');
  div.id = 'lkr-page';
  div.innerHTML = lk.html;
  d.body.appendChild(div);

  d.getElementById('lkr-body').style.marginTop = getScroll()+'px';

  jsonp("//cdn.jsdelivr.net/jslock/votes.js");

  if (lk.opt.showManual) {
    lk.manual.nav(0);

    d.getElementById('lkr-nav').onclick = function(e) {
      if (!e) e = w.event;
      var target = e.target || e.srcElement;
      if (target.id == 'lkr-next' || target.parentNode.id == 'lkr-next')
        lk.manual.nav(1);
      else if (target.id == 'lkr-back' || target.parentNode.id == 'lkr-back')
        lk.manual.nav(-1);
    };
  }

  d.getElementById('lkr-share').onclick = function(e) {
    if (!e) e = w.event;
    var target = e.target || e.srcElement;
    if (target.tagName == "A")
      lk.share(target.id.substr(4, this.length));
  };

  if (!lk.opt.thereIsNoFuture) {
    lk.timer();
    d.getElementById('lkr-res').onclick = function() {
      if (lockTime) return;
        setStorage('roi_alreadyseenlock', '1', 3456000);
        var lkEl = d.getElementById('lkr-page');
        lkEl.parentNode.removeChild(lkEl);
      
      if (!lk.signed && !isSeenRoi) {
        lk.sendStat({skip:true});
      }

      lk.sendStat({stats:lk.stat.showedSteps});

    };
  }

  d.getElementById('lkr-pet').onclick = function() {
    setStorage('roi_seenpetition', '1', 3456000);
    
    if (!lk.signed && !isSeenRoi) {
      lk.sendStat({sign:true});
      lk.signed = true;
    }
  };

  // Обработчик ухода со страницы. Защищаемся от скоропалительного решения пользователя уйти,
  // не вчитываясь. 
  //
  // К сожалению, обработчик реагирует и на обновление страницы (F5).
  //
  // В Опере событие beforeunload не вызывается. Реализовать защиту нет возможности.
  //
  var warningBeforeUnload = function(event) {
    var userAgent = navigator.userAgent.toLowerCase();
    var messagePrefix = "Не спешите уходить. Сайт всё же доступен. Пожалуйста, ";
    
    // Здесь в комментариях описан вид окна-сообщения, которое выдаёт браузер.
    if (/chrome[ \/]/.test(userAgent)) {
      // <возвращаемая строка>
      // Вы действительно хотите покинуть эту страницу?
      // [Покинуть эту страницу]  [Остаться на этой странице]
      
      return messagePrefix + "нажмите «Остаться на этой странице» и просмотрите страницу внимательнее.";
    }
    else if (/webkit[ \/]/.test(userAgent)) {
      // Сафари
      
      // JavaScript
      // Вы действительно хотите уйти с этой страницы?
      // <возвращаемая строка>
      //         [Покинуть страницу]  [Остаться на странице]
      
      return messagePrefix + "нажмите «Остаться на странице» и просмотрите страницу внимательнее.";
    }
    else if (/ msie /.test(userAgent)) {
      // MSIE 6, 7, 8
      
      // Вы действительно хотите уйти с этой страницы?
      // <содержимое window.event.returnValue>
      // Чтобы продолжить, нажмите "ОК". Чтобы остаться на данной странице, нажмите "Отмена".
      //             [ОК]  [Отмена]
      
      w.event.returnValue = messagePrefix + "нажмите «Отмена» и просмотрите страницу внимательнее.";
    
      // MSIE 9, 10
      
      // Вы действительно хотите покинуть эту страницу?
      // Сообщение с веб-страницы:
      // <возвращаемая строка>
      // [Покинуть эту страницу]  
      // [Остаться на этой странице]
      
      return messagePrefix + "нажмите «Остаться на этой странице» и просмотрите страницу внимательнее.";
    }
    else if (userAgent.indexOf("compatible") < 0  &&  /mozilla/.test(userAgent)) {
      // Огнелис. В сообщение, выдаваемое браузером, текст не добавить. Зато работает alert 
      // (в отличие от других браузеров). Приходится делать два сообщения друг за другом.
      event.preventDefault();
      window.alert(messagePrefix +  
            "в следующем сообщении нажмите «Остаться на странице» и просмотрите страницу внимательнее.");
      return null;
    }
    else { // неизвестный браузер.
      return messagePrefix + "останьтесь и просмотрите страницу внимательнее.";
    }
  }

  var removeUnloadWarning = function(event){
    lk.removeEventListener(w, "beforeunload", warningBeforeUnload);
  }

  // Щелчок по любому A-элементу или по 'lkr-nav' трактуем как «пользователь читает» и убираем
  // обработчик ухода со страницы.
  lk.addEventListener(d.getElementById('lkr-nav'), "click", removeUnloadWarning);
  
  var anchors = d.getElementById('lkr-page').getElementsByTagName("a");
  for (var i = 0;  i < anchors.length;  ++ i) {
    lk.addEventListener(anchors[i], "click", removeUnloadWarning);
  }

  // Устанавливаем обработчик ухода со страницы.
  lk.addEventListener(w, "beforeunload", warningBeforeUnload);
});

})(window, document);
