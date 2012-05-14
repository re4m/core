/* Contao Open Source CMS, (C) 2005-2012 Leo Feyer, LGPL license */
var SORT_INDEX,THOUSANDS_SEPARATOR=",",DECIMAL_SEPARATOR=".",TableSort=new Class({initialize:function(a,b,c){var d=$(a);b&&(THOUSANDS_SEPARATOR=b),c&&(DECIMAL_SEPARATOR=c);if(d==null)return;if(!d.rows||d.rows.length<1||!d.tHead||d.tHead.rows.length<1)return;var e=null,f=Cookie.read("TS_"+a.toUpperCase());if(f!==null)var e=f.split("|");var g=d.tHead.rows[d.tHead.rows.length-1];for(var h=0;h<g.cells.length;h++){if(g.cells[h].className.indexOf("unsortable")!=-1)continue;var i=g.cells[h],j=i.innerHTML,k=(new Element("a")).addClass("pointer");k.innerHTML=j,i.innerHTML="",k.addEvent("click",function(a,b){this.resort(a,b)}.pass([h,i],this)),k.injectInside(i),e!==null&&e[0]==h&&($(i).addClass(e[1]=="desc"?"asc":"desc"),this.resort(e[0],i))}},resort:function(a,b){var c=$(b);if(c==null)return;var d=c.getParent("tr"),e=d.getParent("table");if(e==null||e.tBodies[0].rows.length<2)return;SORT_INDEX=a;var f=0,g="";while(g==""&&e.tBodies[0].rows[f])g=e.tBodies[0].rows[f].cells[a].innerHTML.replace(/<[^>]+>/ig,"").clean(),f++;var h=new Array;for(var f=0;f<e.tBodies[0].rows.length;f++)h[f]=e.tBodies[0].rows[f];b.className.indexOf("date")!=-1||g.match(/^\d{1,4}[\/\. -]\d{1,2}[\/\. -]\d{1,4}$/)?h.sort(this.sortDate):b.className.indexOf("currency")!=-1||g.match(/^[£$€Û¢´]/)||g.match(/^-?[\d\.,]+[£$€]$/)?h.sort(this.sortNumeric):b.className.indexOf("numeric")!=-1||g.match(/^-?[\d\.,]+(E[-+][\d]+)?$/)||g.match(/^-?[\d\.,]+%?$/)?h.sort(this.sortNumeric):h.sort(this.sortCaseInsensitive);if(b.className.indexOf("asc")==-1){var i=d.getChildren();for(var f=0;f<i.length;f++)i[f].removeClass("asc"),i[f].removeClass("desc");b.addClass("asc"),Cookie.write("TS_"+e.id.toUpperCase(),a+"|asc",{path:"/"})}else{var i=d.getChildren();for(var f=0;f<i.length;f++)i[f].removeClass("asc"),i[f].removeClass("desc");b.addClass("desc"),Cookie.write("TS_"+e.id.toUpperCase(),a+"|desc",{path:"/"}),h.reverse()}for(f=0;f<h.length;f++){var k=h[f].className;k=k.replace(/row_\d+/,"").replace(/odd|even|row_first|row_last/g,"").clean(),k+=" row_"+f,f==0&&(k+=" row_first"),f>=h.length-1&&(k+=" row_last"),k+=f%2==0?" even":" odd",h[f].className=k.trim();for(j=0;j<h[f].cells.length;j++){var k=h[f].cells[j].className;k=k.replace(/col_\d+/,"").replace(/odd|even|col_first|col_last/g,"").clean(),k+=" col_"+j,j==0&&(k+=" col_first"),j>=h[f].cells.length-1&&(k+=" col_last"),h[f].cells[j].className=k.trim()}e.tBodies[0].appendChild(h[f])}},sortDate:function(a,b){aa=a.cells[SORT_INDEX].innerHTML.replace(/<[^>]+>/ig,"").clean(),bb=b.cells[SORT_INDEX].innerHTML.replace(/<[^>]+>/ig,"").clean();var c=aa.replace(/[\/\.-]/g," ").split(" "),d=bb.replace(/[\/\.-]/g," ").split(" ");if(aa.match(/^\d{1,2}[\/\. -]\d{1,2}[\/\. -]\d{2,4}$/))var e=(c[2].length==4?c[2]:"19"+c[2])+(c[1].length==2?c[1]:"0"+c[1])+(c[0].length==2?c[0]:"0"+c[0]),f=(d[2].length==4?d[2]:"19"+d[2])+(d[1].length==2?d[1]:"0"+d[1])+(d[0].length==2?d[0]:"0"+d[0]);if(aa.match(/^\d{2,4}[\/\. -]\d{1,2}[\/\. -]\d{1,2}$/))var e=(c[0].length==4?c[0]:"19"+c[0])+(c[1].length==2?c[1]:"0"+c[1])+(c[2].length==2?c[2]:"0"+c[2]),f=(d[0].length==4?d[0]:"19"+d[0])+(d[1].length==2?d[1]:"0"+d[1])+(d[2].length==2?d[2]:"0"+d[2]);return e==f?0:e<f?-1:1},sortNumeric:function(a,b){var c=new RegExp("\\"+THOUSANDS_SEPARATOR,"g");return aa=a.cells[SORT_INDEX].innerHTML.replace(c,""),bb=b.cells[SORT_INDEX].innerHTML.replace(c,""),DECIMAL_SEPARATOR!="."&&(aa=aa.replace(DECIMAL_SEPARATOR,"."),bb=bb.replace(DECIMAL_SEPARATOR,".")),aa=aa.replace(/<[^>]+>/i).replace(/[^0-9\.,-]/g,"").clean(),bb=bb.replace(/<[^>]+>/i).replace(/[^0-9\.,-]/g,"").clean(),aa=parseFloat(aa),isNaN(aa)&&(aa=0),bb=parseFloat(bb),isNaN(bb)&&(bb=0),aa-bb},sortCaseInsensitive:function(a,b){return aa=a.cells[SORT_INDEX].innerHTML.replace(/<[^>]+>/ig,"").clean().toLowerCase(),bb=b.cells[SORT_INDEX].innerHTML.replace(/<[^>]+>/ig,"").clean().toLowerCase(),aa==bb?0:aa<bb?-1:1}});