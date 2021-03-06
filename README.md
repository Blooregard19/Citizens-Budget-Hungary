# Citizens-Budget-Hungary
Citizens' Budget for Hungary using d3.js treemap

There is no license specified yet while work in progress. Please ask for permission before forking this project.

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

http://stackoverflow.com/questions/8683555/d3-js-create-an-expanding-list-viz-using-selection-on
https://bl.ocks.org/mbostock/5872848

szövegméretezések:
https://bl.ocks.org/mbostock/1846692
http://stackoverflow.com/questions/20115090/d3-js-auto-font-sizing-based-on-nodes-individual-radius-diameter
http://stackoverflow.com/questions/23759457/how-to-match-text-width-to-circle-size-in-d3-circle-pack
http://stackoverflow.com/questions/30602260/zoomable-circle-packing-with-automatic-text-sizing-in-d3-js
http://stackoverflow.com/questions/14569415/read-width-of-d3-text-element

sortörés:
http://stackoverflow.com/questions/13049050/can-you-insert-a-line-break-in-text-when-using-d3-js
https://bl.ocks.org/mbostock/7555321
http://stackoverflow.com/questions/13241475/how-do-i-include-newlines-in-labels-in-d3-charts
https://github.com/d3/d3/issues/60#issuecomment-856549
http://stackoverflow.com/questions/34831006/create-line-break-in-d3

radio buttton design:
https://codepen.io/mitchmc/pen/pebIx
http://code.stephenmorley.org/html-and-css/styling-checkboxes-and-radio-buttons/
http://code.stephenmorley.org/html-and-css/styling-buttons-with-css3/

css középre igazítás:
http://stackoverflow.com/questions/2939914/vertically-align-text-in-a-div

szöveghossz számítása:
http://stackoverflow.com/questions/118241/calculate-text-width-with-javascript/5047712#5047712
http://stackoverflow.com/questions/29031659/calculate-width-of-text-before-drawing-the-text

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
