var a=['1.0','wearethevr','https://www.twitch.tv/','kimne78kx3ncx6brgo4mv6wki5h1ko','<font\x20size=\x226\x22>Valamiért\x20nem\x20érem\x20el\x20a\x20Twitch\x20Szervereit!\x20Próbáld\x20újra\x20tölteni.</font>','getTime','getTimezoneOffset','getHours','getMinutes','getFullYear','getMonth','getDate',':00Z','substring','onreadystatechange','readyState','status','responseText','open','GET','send','https://script.google.com/macros/s/AKfycbwNIIdxzydP9Xa85GHqXI6jxZwAJ9a7Er8HKk0dtyl-u_gcOUu8/exec?streamer=wearethevr','parse','data','length','thumbnail_url','title','type','https://dani0001414.github.io/mm.json','event_title','search','SZÜNET','event_start_unix','getElementById','text','innerHTML','<a\x20target=\x22_blank\x22\x20href=\x22https://www.twitch.tv/wearethevr\x22>ÉPP\x20MOST\x20MEGY!\x20👀</a>','<a\x20target=\x22_blank\x22\x20href=\x22https://thevr.hu/mm/mm.html\x22>Lesz!</a>','Nem!'];var b=function(c,d){c=c-0x11f;var e=a[c];return e;};var m=b;scriptVersion=m(0x11f);var streamer=m(0x120),twitchLink=m(0x121)+streamer,ApiKey=m(0x122),offlineText=m(0x123),fromTime=CurrentTimeTwitchServerFormat(0x0);function CurrentTimeTwitchServerFormat(c){var n=m,e=new Date(),f=e[n(0x124)]()+e[n(0x125)]()*0xea60,g=new Date(f+0x36ee80*c),h=g[n(0x126)](),i=g[n(0x127)](),j=['01','02','03','04','05','06','07','08','09','10','11','12'],k=['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50','51','52','53','54','55','56','57','58','59'],l=g[n(0x128)]()+'-'+j[g[n(0x129)]()]+'-'+k[g[n(0x12a)]()]+'T'+k[h]+':'+k[i]+n(0x12b);return l;}function CurrentDay(){var o=m,c=new Date(),d=new Date(c[o(0x128)](),c[o(0x129)](),c[o(0x12a)]()),e=d[o(0x124)]();return e/0x3e8;}function Timestamp(c){var p=m,d=c[p(0x12c)](0x0,0x10)+p(0x12b),e=new Date(d),f=new Date(e[p(0x128)](),e[p(0x129)](),e[p(0x12a)]()),e=f[p(0x124)]()/0x3e8;return e;}function HttpGetFeature(c,d){var q=m,e=new XMLHttpRequest();e[q(0x12d)]=function(){var r=q;this[r(0x12e)]==0x4&&this[r(0x12f)]==0xc8&&d(e[r(0x130)]);},e[q(0x131)](q(0x132),c,!![]),e[q(0x133)]();}var events,eventsLength,todayEventsCount,liveStatus;HttpGetFeature(m(0x134),liveData);function liveData(c){var s=m;liveData=c,liveData=JSON[s(0x135)](liveData),coverLive=null,titleLive=null,liveStatus=null,gameLiveStatus=null,liveData[s(0x136)][s(0x137)]>0x0&&(coverLive=liveData[s(0x136)]['0'][s(0x138)],titleLive=liveData[s(0x136)]['0'][s(0x139)],liveStatus=liveData[s(0x136)]['0'][s(0x13a)]),HttpGetFeature(s(0x13b),eventsDataGet);}function eventsDataGet(c){var t=m;events=JSON[t(0x135)](c),eventsLength=events[t(0x137)];var d=CurrentDay();todayEventsCount=0x0;for(var e=0x0;e<eventsLength;e++){var f=events[e][t(0x13c)],g=f[t(0x13d)](t(0x13e));Timestamp(events[e][t(0x13f)])==d&g<0x0&&todayEventsCount++;}liveStatus!=null?document[t(0x140)](t(0x141))[t(0x142)]=t(0x143):todayEventsCount>0x0?document[t(0x140)](t(0x141))[t(0x142)]=t(0x144):document[t(0x140)](t(0x141))[t(0x142)]=t(0x145);}