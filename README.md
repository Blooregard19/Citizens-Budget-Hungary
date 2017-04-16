# Citizens-Budget-Hungary
Citizens' Budget for Hungary using d3.js treemap

További tennivalók:
- polgárok költségvetésénél az összehasonlításnál a forint összeget is ki lehet írni magyarázattal, hogy korábban kevesebb pénzt lehetett elkölteni
- szintén polgárok költségvetése modul lehet, hogy a régi szerkezetben ma mire mennyit költenénk
- polgárok költségvetése kiemelési metódus lehetne, hogy az aktuális mező ugyanolyan színű marad, a többi pedig elhalványul
- lehet, hogy be kellene vezetni egy statikus-interaktív gombot a nagyítás mellé, hogy nagyított változatban kikapcsolja az interaktivitást
linkek:
http://www.ksh.hu/interaktiv/kaleidoszkop/kaleidoszkop.html
http://www.nytimes.com/interactive/2012/02/13/us/politics/2013-budget-proposal-graphic.html?_r=1&
https://offenerhaushalt.de/haushalt/bawue/#einzelplan/
view-source:https://offenerhaushalt.de/haushalt/bawue/#funktionen/
https://offenerhaushalt.de/static/js/budget.js
http://widgets.scmp.com/infographic/20140304/budget2014/
view-source:http://widgets.scmp.com/infographic/20140304/budget2014/
http://bl.ocks.org/bycoffe/21061661b1450a4db92a
http://stackoverflow.com/questions/14438214/creating-a-dynamic-list-of-divs-with-d3
https://gist.github.com/emeeks/11310634
http://stackoverflow.com/questions/4550427/preferred-alternative-to-onmouseover-for-touch

Adatok manipulálása:
http://www.d3noob.org/2014/02/grouping-and-summing-data-using-d3nest.html
http://stackoverflow.com/questions/29155159/what-are-best-practices-for-json-data-aggregation
http://bl.ocks.org/phoebebright/raw/3176159/
http://www.jeromecukier.net/blog/2012/05/28/manipulating-data-like-a-boss-with-d3/
szűrés
http://bl.ocks.org/d3noob/8dc93bce7e7200ab487d
esetleg json-ból
https://www.dashingd3js.com/using-json-to-simplify-code

Kiválasztás, kivéve egy bizonyos classot
http://stackoverflow.com/questions/12321352/equivalent-of-jquerys-not-selector-in-d3-js
Több class alapján kiválasztani a megfelelő elemeket
http://stackoverflow.com/questions/17435838/how-to-use-d3-selectall-with-multiple-class-names
http://stackoverflow.com/questions/34783926/can-i-call-indexof-within-a-d3-selection

http://bl.ocks.org/jfreels/6734025
https://bost.ocks.org/mike/nest/
https://gist.github.com/LeeMendelowitz/11383724
https://bl.ocks.org/mbostock/4063582

Tervek:
1. olvassa be az adatokat és készítsen treemap-et (színezze ki funkciók szerint, írogassa ki a neveket, számokat, a beolvasott adatokat aggregálja a legmagasabb funkció szerint, mouseover hatások kezelése, esetleg jegyzetdobozok)
2. írja ki táblázatban a treemap mellé a megjelenített funkciókat
3. a táblázatra mouseover esetén emelje ki a megfelelő elemet (azon kívül mindegyik div alpha-ját kell növelni)
4. a treemap-et alkotó div-ek mozgatása
5. évek közötti összehasonlító (mozgatáson és kiíráson felül kiírhatja, hogy változatlan szerkezetben mennyit költenénk rá most)
6. lehessen váltani a treemap megjelenített csoportjai között (funkciók, fejezeti-intézményi)
7. bevételi oldal bemutatása
8. drilldown szintjeinek meghatározása
9. kiegészítő szövegek
10. színskálák használata
11. nagyító funkció
12. mobil felület sajátosságai
13. szövegelhelyező csempéken belül
14. stílus meghatározása (háttér, betűtípus és méret, színek)
15. színesítő szövegek magyarázathoz
