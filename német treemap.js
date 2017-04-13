var OSDE = OSDE ? OSDE : {}; // OSDE változót használja, ha már létezik, egyébként üres az OSDE

OSDE.TreeMap = function(elementID) {
  var self = this,
    $treemap = $(elementID);

  var treemap = null,
        div = null;

  function create() { // létrehozza a treemap elemet
    var width = $treemap.width(),
        height = $treemap.height();

    $treemap.empty();

    treemap = d3.layout.treemap()
      .size([width, height])
      .sticky(true)
      .sort(function(a, b) { return Math.abs(a.value) - Math.abs(b.value); })
      .value(function(d) { return Math.abs(d.value); });

    div = d3.select("#treemap").append("div")
      .style("position", "relative")
      .style("width", width + "px")
      .style("height", height + "px");
  }

  self.render = function render(data, dimension) { //minden alkalommal csak a treemap-en szereplõ adatokat jeleníti meg, ezért elõször létrehozza a keretet, utána leválogatja az adatokat, majd utána rajzolja meg a div-eket
    // TODO: remove elements, don't create each time.
    create();

    var root = {
      children: []
    };
    for (var i = 0; i < data.cells.length; i += 1) { // létrehozza az adatszerkezetet, amit majd felrajzol a treemapbe
      root.children.push({
        name: data.cells[i]._current_label,
        value: data.cells[i]._value,
        value_fmt: data.cells[i]._value_fmt,
        percentage: data.cells[i]._percentage,
        href: data.cells[i]._url,
        color: data.cells[i]._color
      });
    }
    var node = div.datum(root).selectAll(".node") // itt rajzolja fel a treemap csempéit
        .data(treemap.nodes)
      .enter().append("a")
        .attr("href", function(d) { return d.href; }) //a hivatkozás, hogy rákattintva tudja az újabb adatot kérni
        .attr("class", "node")
        .call(positionNode)
        .style("background", '#fff')
        .classed("big", function(d) { return d.value > data.summary._value / 50 })
        .html(function(d) {
        if (d.percentage < 0.03) {
          return '';
        }
          return d.children ? null : '<span class="amount">' + d.value_fmt + '</span>' + d.name;
        })
        .on("mouseover", function(d) { // egérrel fölémenve kicsit besötétíti
          d3.select(this).transition().duration(200)
            .style({'background': d3.rgb(d.color).darker() });
        })
        .on("mouseout", function(d) {
          d3.select(this).transition().duration(500)
            .style({'background': d.color});
        })
        .transition() //nem egyszerre, hanem sorba rajzolja ki a csempéket
        .duration(500)
        .delay(function(d, i) { return Math.min(i * 30, 1500); })
        .style("background", function(d) { return d.color; });
  }

  function positionNode() {
      this.style("left", function(d) { return d.x + "px"; })
          .style("top", function(d) { return d.y + "px"; })
          .style("width", function(d) { return Math.max(0, d.dx - 1) + "px"; })
          .style("height", function(d) { return Math.max(0, d.dy - 1) + "px"; });
    }
};
var OSDE = OSDE ? OSDE : {};

OSDE.Table = function(elementID) {
  var self = this,
    $table = $(elementID),
    template = Handlebars.compile($('#table-template').html());

  self.render = function render(data, dimension) {
    $table.html(template(data));
    $table.find('.show-small').click(function() {
      $table.find('.small').slideDown('fast');
      $table.find('.hide-small').show();
      $table.find('.show-small').hide();
      return false;
    })
    $table.find('.hide-small').click(function() {
      $table.find('.small').slideUp('fast');
      $table.find('.show-small').show();
      $table.find('.hide-small').hide();
      return false;
    })
  }
};

$(function(){ // a funkció nagy része az adatok lekérésérõl szól, a végén van az adatösszerakás és megjelenítés, amik érdekesek
  var site = JSON.parse($('#site-config').html()), //itt egy német opendata portálról szedegeti le a cuccokat
      siteName = $('#site-name').html(),
      filtersTemplate = Handlebars.compile($('#filters-template').html()),
      embedTemplate = Handlebars.compile($('#embed-template').html()),
      $embedCode = $('#embed-code'),
      baseFilters = {},
      $filterValues = [],
      SLICER_URL = 'https://db.offenerhaushalt.de/api/babbage';

  site.api = SLICER_URL + '/cubes/' + site.dataset;
  site.keyrefs = [];
  site.labelrefs = [];
  site.dimensions = {};

  $.ajax({ url: site.api + '/model', dataType: 'json'})
  .then(function(result) {
    if (typeof site.aggregate == "undefined") {
      if (typeof result.model.aggregate != "undefined") {
        site.aggregate = result.model.aggregate;
      } else if (typeof result.model.aggregates != "undefined") {
        var aggs = $.map(result.model.aggregates, function(a, _) {
          if (typeof a.function == "undefined" || a.function != 'sum') {
            return null;
          }
          return a;
        });
        if (aggs.length > 0) {
          site.aggregate = aggs[0].ref;
        }
      }
    }

    $.each(result.model.dimensions, function(name, dim) {
      site.dimensions[name] = {
        'key_ref': dim['key_ref'],
        'label_ref': dim['label_ref'],
        'attributes': []
      };

      $.each(dim['attributes'], function(k, a) {
        site.dimensions[name].attributes.push(a['ref']);
      });
    });

    $.each(site.dimensions, function(name, dim) {
      site.keyrefs[name] = dim.key_ref
      site.labelrefs[name] = dim.label_ref

      $.each(dim.attributes, function(k, attr) {
        site.keyrefs[attr.ref] = attr.ref
        site.labelrefs[attr.ref] = attr.ref
      });
    });
  }).then(function() {
    var def = $.Deferred(), dfds = [];
    for (var i in site.filters) {
      var filter = site.filters[i];
      dfds.push($.ajax({ url: site.api + '/members/' + filter.field, dataType: 'json' }));
    }
    $.when.apply($, dfds).then(function() {
      var ret = $.map(arguments, function(a) {
        return a[0];
      });
      def.resolve(ret);
    });
    return def;
  }).then(function(fmems) {
    for (var i in site.filters) {
      baseFilters[site.filters[i].field] = site.filters[i].default;

      site.filters[i].values = $.map(fmems[i].data, function(v) {
        var f = site.filters[i].field;
        return {
          key: v[site.dimensions[f]['key_ref']],
          label: v[site.dimensions[f]['label_ref']]
        };
      });
    }

    $('#filters').append(filtersTemplate({ filters: site.filters }));
    $('#filters .dropdown-toggle').dropdown();
    $filterValues = $('.site-filters .value');
  }).then(function() {
    hashtrack.onhashchange(update);
  });

  var $hierarchyMenu = $('#hierarchy-menu'),
      $infobox = $('#infobox'),
      $parent = $('#parent'),
      treemap = new OSDE.TreeMap('#treemap'),
      table =  new OSDE.Table('#table');

  function getData(drilldown, cut) {
    var cutStr = $.map(cut, function(v, k) { if((v+'').length) { return site.keyrefs[k] + ':' + v; }});
    var drilldowns = [site.keyrefs[drilldown]]
    if (site.keyrefs[drilldown] != site.labelrefs[drilldown]) {
      drilldowns.push(site.labelrefs[drilldown]);
    }
    return $.ajax({
      url: site.api + '/aggregate',
      data: {
        drilldown: drilldowns.join('|'),
        cut: cutStr.join('|'),
        order: site.aggregate + ':desc',
        page: 0,
        pagesize: 500
      },
      dataType: 'json',
      cache: true
    });
  }

  $('#infobox-toggle').click(function(e) {
    var $e = $(e.target);
    if ($e.hasClass('active')) {
      $e.removeClass('active');
      $infobox.slideUp();
    } else {
      $e.addClass('active');
      $infobox.slideDown();
    }
    return false;
  });

  function parsePath(hash) {
    var path = {},
        location = hash.split('/'),
        levels = location.slice(1, location.length-1);

    path.hierarchyName = location[0];
    path.hierarchy = site.hierarchies[path.hierarchyName];
    path.hierarchy.cuts = path.hierarchy.cuts || {};
    path.level = levels.length;
    path.root = path.level == 0;
    path.bottom = path.level >= (path.hierarchy.drilldowns.length - 1);
    path.drilldown = path.hierarchy.drilldowns[path.level];
    path.args = OSDE.parseArgs(location[location.length-1]);

    $.each(levels, function(i, val) {
      path.args[path.hierarchy.drilldowns[i]] = decodeURIComponent(val);
    });
    return path;
  }

  function parentUrl(path) {
    if (path.level < 1) {
      return makeUrl(path, null);
    }
    var p = $.extend(true, {}, path);
    $.each(p.hierarchy.drilldowns, function(i, drilldown) {
      if (i >= (p.level-1) ) {
        delete p.args[drilldown];
      }
    });
    return makeUrl(p, {});
  }

  function makeUrl(path, modifiers) {
    var args = $.extend({}, path.args, modifiers),
        url = '#' + path.hierarchyName + '/';

    if (!modifiers) args = {};

    $.each(path.hierarchy.drilldowns, function(i, drilldown) {
      if (args[drilldown]) {
        url += encodeURIComponent(args[drilldown]) + '/';
        delete args[drilldown];
      }
    });
    return url + OSDE.mergeArgs(args);
  }

  function update() {
    var rawPath = window.location.hash.substring(1);
    if (!rawPath.length) {
      rawPath = site.default + '/'
    }

    var path = parsePath(rawPath),
        rootDimension = path.hierarchy.drilldowns[0],
        rootColor = null;
        color = d3.scale.ordinal().range(OSDE.categoryColors),
        cuts = $.extend({}, baseFilters, path.hierarchy.cuts || {}, path.args);

    $hierarchyMenu.find('.btn').removeClass('active');
    $hierarchyMenu.find('.btn.' + path.hierarchyName).addClass('active');

    $parent.unbind();
    if (path.root) {
      $parent.hide();
    } else {
      $parent.show();
      $parent.attr('href', parentUrl(path));
    }

    $filterValues.removeClass('active');
    $filterValues.each(function(i, f) {
      var $f = $(f), field = $f.data('field'), value = $f.data('value'), modifiers = {};
      modifiers[field] = value;
      $f.attr('href', makeUrl(path, modifiers));
      if (cuts[field] == value) {
        $f.addClass('active');
      }
    });

    $.each(site.filters, function(i, f) {
      var val = cuts[f.field], label = val;
      $.each(f.values, function(j, v) {
        if (v.key == val) {
          label = v.label;
        }
      });
      $('.site-filters strong[data-field="' + f.field + '"]').html(label || 'Alle');
    });

    var baseCuts = $.extend({}, baseFilters, path.hierarchy.cuts);
    getData(rootDimension, baseCuts).done(function(base) { // nagyjából itt fejezi be az adatok lekérését és állítja össze a saját adatfájlját és jeleníti meg

      $.each(base.cells, function(i, drilldown) {
        drilldown._color = color(i);
        var rootRef = site.keyrefs[rootDimension];
        if (cuts[rootDimension] && cuts[rootDimension] == drilldown[rootRef]) {
          rootColor = d3.rgb(drilldown._color);
        }
      });

      getData(path.drilldown, cuts).done(function(data) {
        var dimension = path.drilldown;

        if (dimension != rootDimension) {
          color = d3.scale.linear();
          color = color.interpolate(d3.interpolateRgb)
          color = color.range([rootColor.brighter(), rootColor.darker().darker()]);
          color = color.domain([data.total_cell_count, 0]);
        }

        data.summary._value = data.summary[site.aggregate];
        data.summary._value_fmt = OSDE.amount(data.summary._value);

        $.each(data.cells, function(e, cell) {
          cell._current_label = cell[site.labelrefs[dimension]];
          cell._current_key = cell[site.keyrefs[dimension]];
          cell._value = cell[site.aggregate];
          cell._value_fmt = OSDE.amount(cell._value);
          cell._percentage = cell[site.aggregate] / data.summary[site.aggregate];
          cell._small = cell._percentage < 0.01;
          cell._percentage_fmt = (cell._percentage * 100).toFixed(2) + '%';
          cell._percentage_fmt = cell._percentage_fmt.replace('.', ',');

          if (!path.bottom) {
            var modifiers = {};
            modifiers[dimension] = cell._current_key;
            cell._url = makeUrl(path, modifiers);
          } else {
            cell._no_url = true;
          }
          cell._color = color(e);

        });

        treemap.render(data, path.drilldown); // megalkotja a treemap-et
        table.render(data, path.drilldown); //megalkotja az alatta lévõ táblázatot
      });
    });
    $embedCode.text(embedTemplate({
      name: siteName,
      baseurl: document.location.href.split('#')[0],
      url: document.location.href,
      hash: document.location.hash,
    }));
  }

  // hashtrack.onhashchange(update);
});