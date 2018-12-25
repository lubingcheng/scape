var map, legend;
var gis = {
    point:null,
    //初始化地图
    init: function (callback) {
        require(["esri/map", "esri/dijit/Search", "dojo/domReady!"], function (Map, Search) {
            map = new Map("map", {
                center: [-73.875, 40.664],
                zoom: 11,
                basemap: "gray"
            });
            map.on("load", callback);
            var search = new Search({
                map: map
            }, "search");
            search.startup();
            map.on("click", function (event) { 
                if (event.graphic)  return; 
                var point = event.mapPoint;
                map.infoWindow.setTitle("新增兴趣点");
                var content = '<div>名称：<input id="txtName" style="width:210px;"/></div>'
                            + '<div>标注：<textarea id="txtContent" style="width:210px;"></textarea></div>'
                            + '<div style="text-align:center;"><button onclick="sunmitMark()">添加</button></div>';
                map.infoWindow.setContent(content);
                map.infoWindow.show(point);
                gis.point = point;
            });
            gis.getMark();
            var input = document.getElementsByClassName("searchInput");
            input[0].placeholder = "Search";
        });
    },
    addGreen: function () {
        require(["esri/layers/GraphicsLayer", "esri/symbols/SimpleFillSymbol", "esri/symbols/SimpleLineSymbol", "esri/Color", "esri/graphic"],
            function (GraphicsLayer, SimpleFillSymbol, SimpleLineSymbol, Color, Graphic) {
                var layer = new GraphicsLayer();
                map.addLayer(layer);

                var features = green.features;
                var symbol = {
                    "label": "绿地",
                    "color": [22, 160, 93, 255],
                    "outline": {
                        "color": [22, 160, 93, 255],
                        "width": 1,
                        "type": "esriSLS",
                        "style": "esriSLSSolid"
                    },
                    "type": "esriSFS",
                    "style": "esriSFSSolid"
                };
                var infoTemplate = {
                    "title": "${park_name}",
                    "content": "<table>"
                        + "<tr><td>park_name:</td><td>${park_name}</td></tr>"
                        + "<tr><td>landuse:</td><td>${landuse}</td></tr>"
                        + "<tr><td>sub_code:</td><td>${sub_code}</td></tr>"
                        + "<tr><td>parknum:</td><td>${parknum}</td></tr>"
                        + "<tr><td>source_id:</td><td>${source_id}</td></tr>"
                }
                for (var i = 0; i < features.length; i++) {
                    var geometry = features[i];
                    geometry.symbol = symbol;
                    geometry.infoTemplate = infoTemplate;
                    var graphic = new Graphic(geometry);
                    layer.add(graphic);
                }


            });
    },
    addGreenBuffer: function () {
        require(["esri/layers/GraphicsLayer", "esri/symbols/SimpleFillSymbol", "esri/symbols/SimpleLineSymbol", "esri/Color", "esri/graphic"],
            function (GraphicsLayer, SimpleFillSymbol, SimpleLineSymbol, Color, Graphic) {
                var layer = new GraphicsLayer();
                map.addLayer(layer);

                var features = greenBuffer.features;
                var symbol = {
                    "label": "绿地",
                    "color": [255, 50, 50, 100],
                    "outline": {
                        "color": [100, 0, 0, 100],
                        "width": 0,
                        "type": "esriSLS",
                        "style": "esriSLSSolid"
                    },
                    "type": "esriSFS",
                    "style": "esriSFSSolid"
                };
                var infoTemplate = {
                    "title": "${park_name}",
                    "content": "<table>"
                        + "<tr><td>park_name:</td><td>${park_name}</td></tr>"
                        + "<tr><td>landuse:</td><td>${landuse}</td></tr>"
                        + "<tr><td>sub_code:</td><td>${sub_code}</td></tr>"
                        + "<tr><td>parknum:</td><td>${parknum}</td></tr>"
                        + "<tr><td>source_id:</td><td>${source_id}</td></tr>"
                }
                for (var i = 0; i < features.length; i++) {
                    var geometry = features[i];
                    geometry.symbol = symbol;
                    geometry.infoTemplate = infoTemplate;
                    var graphic = new Graphic(geometry);
                    layer.add(graphic);
                }


            });
    },
    addRegion: function () {
        require(["esri/layers/GraphicsLayer", "esri/symbols/SimpleFillSymbol", "esri/symbols/SimpleLineSymbol", "esri/Color", "esri/graphic"],
           function (GraphicsLayer, SimpleFillSymbol, SimpleLineSymbol, Color, Graphic) {
               var layer = new GraphicsLayer();
               map.addLayer(layer);

               var features = region.features;
               var symbol = {
                   "color": [22, 160, 93, 0],
                   "outline": {
                       "color": [222, 84, 72, 200],
                       "width": 0.5,
                       "type": "esriSLS",
                       "style": "esriSLSSolid"
                   },
                   "type": "esriSFS",
                   "style": "esriSFSSolid"
               };
               var infoTemplate = {
                   "title": "${park_name}",
                   "content": "<table>"
                       + "<tr><td>park_name:</td><td>${park_name}</td></tr>"
                       + "<tr><td>landuse:</td><td>${landuse}</td></tr>"
                       + "<tr><td>sub_code:</td><td>${sub_code}</td></tr>"
                       + "<tr><td>parknum:</td><td>${parknum}</td></tr>"
                       + "<tr><td>source_id:</td><td>${source_id}</td></tr>"
               }
               for (var i = 0; i < features.length; i++) {
                   var geometry = features[i];
                   geometry.symbol = symbol;
                   //geometry.infoTemplate = infoTemplate;
                   var graphic = new Graphic(geometry);
                   layer.add(graphic);
               }


           });
    },
    //加载绿地图层
    addGreenLayer: function (type) {
        var _this = this;
        require(["esri/layers/FeatureLayer",
            "esri/renderers/SimpleRenderer",
            "esri/renderers/UniqueValueRenderer",
            "esri/dijit/Legend",
            "esri/renderers/HeatmapRenderer",
            "esri/InfoTemplate",
            "dojo/dom",
            "dojo/dom-construct",
            "dojo/_base/connect",
            "dojo/domReady!"],
            function (FeatureLayer, SimpleRenderer, UniqueValueRenderer, Legend, HeatmapRenderer,InfoTemplate,
                dom, domConstruct, connect) {
                var featureLayer = new FeatureLayer("https://services2.arcgis.com/IsDCghZ73NgoYoz5/arcgis/rest/services/Green_Space_Paton/FeatureServer/0", { outFields: ["*"] });
                var infoTemplate = {
                    "title": "${park_name}",
                    "content": "<table>"
                        + "<tr><td>park_name:</td><td>${park_name}</td></tr>"
                        + "<tr><td>landuse:</td><td>${landuse}</td></tr>"
                        + "<tr><td>sub_code:</td><td>${sub_code}</td></tr>"
                        + "<tr><td>parknum:</td><td>${parknum}</td></tr>"
                        + "<tr><td>source_id:</td><td>${source_id}</td></tr>"
                } 
                var template = new InfoTemplate(infoTemplate); 
                featureLayer.setInfoTemplate(template);

                var simpleRenderer = {
                    "type": "simple",
                    "label": "",
                    "description": "",
                    "symbol": {
                        "color": [22, 160, 93, 200],
                        "type": "esriSFS",
                        "style": "esriSFSSolid",
                        "outline": {
                            "color": [22, 160, 93, 200],
                            "width": 1,
                            "type": "esriSLS",
                            "style": "esriSLSSolid"
                        }
                    }
                }
                var typeRenderer = {
                    "type": "uniqueValue",
                    "field1": "landuse",
                    "defaultSymbol": {
                        "color": [22, 160, 93, 200],
                        "outline": {
                            "color": [22, 160, 93, 200],
                            "width": 1,
                            "type": "esriSLS",
                            "style": "esriSLSNull"
                        },
                        "type": "esriSFS",
                        "style": "esriSFSNull"
                    },
                    "uniqueValueInfos": [{
                        "value": "Flagship Park",
                        "symbol": {
                            "color": [255, 0, 0, 128],
                            "outline": {
                                "color": [255, 0, 0, 128],
                                "width": 1,
                                "type": "esriSLS",
                                "style": "esriSLSSolid"
                            },
                            "type": "esriSFS",
                            "style": "esriSFSSolid"
                        }
                    }, {
                        "value": "Waterfront Facility",
                        "symbol": {
                            "color": [0, 255, 0, 128],
                            "outline": {
                                "color": [0, 255, 0, 128],
                                "width": 1,
                                "type": "esriSLS",
                                "style": "esriSLSSolid"
                            },
                            "type": "esriSFS",
                            "style": "esriSFSSolid"
                        }
                    }, {
                        "value": "Undeveloped",
                        "symbol": {
                            "color": [0, 255, 0, 128],
                            "outline": {
                                "color": [0, 255, 0, 128],
                                "width": 1,
                                "type": "esriSLS",
                                "style": "esriSLSSolid"
                            },
                            "type": "esriSFS",
                            "style": "esriSFSSolid"
                        }
                    }, {
                        "value": "Triangle/Plaza",
                        "symbol": {
                            "color": [0, 255, 255, 128],
                            "outline": {
                                "color": [0, 255, 255, 128],
                                "width": 1,
                                "type": "esriSLS",
                                "style": "esriSLSSolid"
                            },
                            "type": "esriSFS",
                            "style": "esriSFSSolid"
                        }
                    }, {
                        "value": "Neighborhood Park",
                        "symbol": {
                            "color": [255, 255, 0, 128],
                            "outline": {
                                "color": [255, 255, 0, 255],
                                "width": 1,
                                "type": "esriSLS",
                                "style": "esriSLSSolid"
                            },
                            "type": "esriSFS",
                            "style": "esriSFSSolid"
                        }
                    }, {
                        "value": "School Yard to Playground",
                        "symbol": {
                            "color": [0, 0, 255, 128],
                            "outline": {
                                "color": [0, 0, 255, 255],
                                "width": 1,
                                "type": "esriSLS",
                                "style": "esriSLSSolid"
                            },
                            "type": "esriSFS",
                            "style": "esriSFSSolid"
                        }
                    }, {
                        "value": "Recreation Field/Courts",
                        "symbol": {
                            "color": [0, 0, 255, 128],
                            "outline": {
                                "color": [0, 0, 255, 255],
                                "width": 1,
                                "type": "esriSLS",
                                "style": "esriSLSSolid"
                            },
                            "type": "esriSFS",
                            "style": "esriSFSSolid"
                        }
                    }, {
                        "value": "Playground",
                        "symbol": {
                            "color": [0, 0, 255, 128],
                            "outline": {
                                "color": [0, 0, 255, 255],
                                "width": 1,
                                "type": "esriSLS",
                                "style": "esriSLSSolid"
                            },
                            "type": "esriSFS",
                            "style": "esriSFSSolid"
                        }
                    }, {
                        "value": "Parkway",
                        "symbol": {
                            "color": [0, 0, 255, 128],
                            "outline": {
                                "color": [0, 0, 255, 255],
                                "width": 1,
                                "type": "esriSLS",
                                "style": "esriSLSSolid"
                            },
                            "type": "esriSFS",
                            "style": "esriSFSSolid"
                        }
                    }, {
                        "value": "Jointly Operated Playground",
                        "symbol": {
                            "color": [0, 0, 255, 128],
                            "outline": {
                                "color": [0, 0, 255, 255],
                                "width": 1,
                                "type": "esriSLS",
                                "style": "esriSLSSolid"
                            },
                            "type": "esriSFS",
                            "style": "esriSFSSolid"
                        }
                    }, {
                        "value": "Mall",
                        "symbol": {
                            "color": [0, 0, 255, 128],
                            "outline": {
                                "color": [0, 0, 255, 255],
                                "width": 1,
                                "type": "esriSLS",
                                "style": "esriSLSSolid"
                            },
                            "type": "esriSFS",
                            "style": "esriSFSSolid"
                        }
                    }, {
                        "value": "Nature Area",
                        "symbol": {
                            "color": [0, 0, 255, 128],
                            "outline": {
                                "color": [0, 0, 255, 255],
                                "width": 1,
                                "type": "esriSLS",
                                "style": "esriSLSSolid"
                            },
                            "type": "esriSFS",
                            "style": "esriSFSSolid"
                        }
                    }, {
                        "value": "Retired N/A",
                        "symbol": {
                            "color": [0, 0, 255, 128],
                            "outline": {
                                "color": [0, 0, 255, 255],
                                "width": 1,
                                "type": "esriSLS",
                                "style": "esriSLSSolid"
                            },
                            "type": "esriSFS",
                            "style": "esriSFSSolid"
                        }
                    }, {
                        "value": " ",
                        "label": "null",
                        "symbol": {
                            "color": [100, 100, 100, 128],
                            "outline": {
                                "color": [100, 100, 100, 128],
                                "width": 1,
                                "type": "esriSLS",
                                "style": "esriSLSSolid"
                            },
                            "type": "esriSFS",
                            "style": "esriSFSSolid"
                        }
                    }
                    ]
                }
                var stateRenderer = {
                    "type": "uniqueValue",
                    "field1": "status",
                    "defaultSymbol": {
                        "color": [22, 160, 93, 200],
                        "outline": {
                            "color": [22, 160, 93, 200],
                            "width": 1,
                            "type": "esriSLS",
                            "style": "esriSLSNull"
                        },
                        "type": "esriSFS",
                        "style": "esriSFSNull"
                    },
                    "uniqueValueInfos": [{
                        "value": "Unchanged",
                        "symbol": {
                            "color": [22, 160, 93, 128],
                            "outline": {
                                "color": [22, 160, 93, 128],
                                "width": 1,
                                "type": "esriSLS",
                                "style": "esriSLSSolid"
                            },
                            "type": "esriSFS",
                            "style": "esriSFSSolid"
                        }
                    }, {
                        "value": "New",
                        "symbol": {
                            "color": [255, 0, 0, 128],
                            "outline": {
                                "color": [255, 0, 0, 255],
                                "width": 1,
                                "type": "esriSLS",
                                "style": "esriSLSSolid"
                            },
                            "type": "esriSFS",
                            "style": "esriSFSSolid"
                        }
                    }, {
                        "value": "Updated",
                        "symbol": {
                            "color": [255, 255, 0, 128],
                            "outline": {
                                "color": [255, 255, 0, 255],
                                "width": 1,
                                "type": "esriSLS",
                                "style": "esriSLSSolid"
                            },
                            "type": "esriSFS",
                            "style": "esriSFSSolid"
                        }
                    }
                    ]
                }

                var renderer;
                if (type == "type") {
                    _this.getSymbol(featureLayer, "landuse", function (rendererJson) {
                        
                        renderer = new UniqueValueRenderer(rendererJson);
                        featureLayer.setRenderer(renderer);
                        map.addLayer(featureLayer);
                        createLegend("Landuse");
                    });

                } else if (type == "hot") {
                    _this.getHot(featureLayer);
                } else if (type == "buffer") {
                    renderer = new UniqueValueRenderer(simpleRenderer);
                    featureLayer.setRenderer(renderer);
                    map.addLayer(featureLayer);
                    _this.getBuffer(featureLayer);
                }
                else if (type == "state") {
                    renderer = new UniqueValueRenderer(stateRenderer);
                    createLegend("Status");
                    featureLayer.setRenderer(renderer);
                    map.addLayer(featureLayer);
                }
                else {
                    renderer = new SimpleRenderer(simpleRenderer);
                    createLegend("纽约绿地");
                    featureLayer.setRenderer(renderer);
                    map.addLayer(featureLayer);
                }



                function createLegend(title) {
                    //If applicable, destroy previous legend
                    if (legend) {
                        legend.destroy();
                        domConstruct.destroy(dom.byId("legendDiv"));
                    }

                    // create a new div for the legend
                    var legendDiv = domConstruct.create("div", {
                        id: "legendDiv"
                    }, dom.byId("legendWrapper"));

                    legend = new Legend({
                        map: map,
                        layerInfos: [{
                            layer: featureLayer,
                            title: title
                        }]
                    }, legendDiv);
                    legend.startup();
                }
            });
    },
    //计算渲染样式
    getSymbol: function (featureLayer, field, callback) {
        require([
            "esri/layers/FeatureLayer", "esri/tasks/query"
        ], function (FeatureLayer, Query) {
            var query = new Query();
            //query.objectIds = [features[0].attributes.OBJECTID];
            query.outFields = ["*"];
            query.where = "shape__Area>0.000001";
            // Query for the features with the given object ID
            featureLayer.queryFeatures(query, function (featureSet) {
                var attrStr = "";
                for (var i = 0; i < featureSet.features.length; i++) {
                    var feature = featureSet.features[i]; 
                    var value = feature.attributes[field];
                    if (value.length == 0 || value == " ")
                        continue;
                    if (attrStr.indexOf(value) == -1) {
                        attrStr += value + ",";
                    }
                }
                var attrAry = attrStr.split(',');
                var symbolAry = [];
                for (var i = 0; i < attrAry.length; i++) {
                    if (attrAry[i] == "")
                        continue;
                    var clr = rgb();
                    var symbol = {
                        "value": attrAry[i],
                        "symbol": {
                            "color": clr,
                            "outline": {
                                "color": clr,
                                "width": 1,
                                "type": "esriSLS",
                                "style": "esriSLSSolid"
                            },
                            "type": "esriSFS",
                            "style": "esriSFSSolid"
                        }
                    }
                    symbolAry.push(symbol);
                }

                var rederer = {
                    "type": "uniqueValue",
                    "field1": field,
                    "defaultSymbol": {
                        "color": [22, 160, 93, 200],
                        "outline": {
                            "color": [22, 160, 93, 200],
                            "width": 1,
                            "type": "esriSLS",
                            "style": "esriSLSNull"
                        },
                        "type": "esriSFS",
                        "style": "esriSFSNull"
                    },
                    "uniqueValueInfos": symbolAry
                }
                callback(rederer);

                function rgb() {
                    var r = Math.floor(Math.random() * 256);
                    var g = Math.floor(Math.random() * 256);
                    var b = Math.floor(Math.random() * 256);
                    return [r, g, b, 200];//所有方法的拼接都可以用ES6新特性`其他字符串{$变量名}`替换
                }
            });
        });
    },
    //加载热力图
    getHot: function (featureLayer) {
        require([
            "esri/layers/FeatureLayer",
            "esri/tasks/query",
            "esri/renderers/HeatmapRenderer",
            "esri/graphic",
            "esri/InfoTemplate",
        ], function (FeatureLayer, Query, HeatmapRenderer, Graphic, InfoTemplate) {
            var query = new Query();
            query.outFields = ["*"];
            query.where = "shape__Area>0.000001";
            featureLayer.queryFeatures(query, function (featureSet) {
                var featureCollection = {
                    layerDefinition: {
                        "geometryType": "esriGeometryPoint",
                        "objectIdField": "OBJECTID",
                        "fields": featureSet.fields
                    }
                };
                var heatLayer = new FeatureLayer(featureCollection);
                var infoTemplate = {
                    "title": "${park_name}",
                    "content": "<table>"
                        + "<tr><td>park_name:</td><td>${park_name}</td></tr>"
                        + "<tr><td>landuse:</td><td>${landuse}</td></tr>"
                        + "<tr><td>sub_code:</td><td>${sub_code}</td></tr>"
                        + "<tr><td>parknum:</td><td>${parknum}</td></tr>"
                        + "<tr><td>source_id:</td><td>${source_id}</td></tr>"
                }
                var template = new InfoTemplate(infoTemplate);
                heatLayer.setInfoTemplate(template);
                map.addLayer(heatLayer);

                for (var i = 0; i < featureSet.features.length; i++) {
                    var feature = featureSet.features[i];
                    var point = feature.geometry.getCentroid();
                    point.spatialReference = null;
                    var grajson = {
                        geometry: point,
                        attributes: feature.attributes,
                    }
                    var gra = new Graphic(grajson)
                    heatLayer.add(gra);
                }
                var heatmapRenderer = new HeatmapRenderer({
                    colors: ["rgba(0, 255, 0, 0)", "rgb(0, 255, 0)", "rgb(255, 255, 0)", "rgb(255, 0, 0)", ],
                });
                heatLayer.setRenderer(heatmapRenderer);
                heatLayer.redraw();

            });
        });
    },
    //加载缓冲区
    getBuffer: function (featureLayer) {
        require([
            "esri/layers/FeatureLayer",
            "esri/tasks/query",
            "esri/renderers/HeatmapRenderer",
            "esri/graphic",
            "esri/geometry/geometryEngine",
            "esri/symbols/SimpleFillSymbol",
            "esri/Color",
            "esri/graphicsUtils",
            "esri/geometry/normalizeUtils",
            "esri/tasks/GeometryService",
            "esri/tasks/BufferParameters",
            "dojo/_base/array",
        ], function (FeatureLayer, Query, HeatmapRenderer, Graphic, geometryEngine, SimpleFillSymbol, Color,
            graphicsUtils, normalizeUtils, GeometryService, BufferParameters, array) {
            var query = new Query();
            query.outFields = ["*"];
            query.where = "shape__Area>0.000001";
            featureLayer.queryFeatures(query, function (featureSet) {
                
                var geos = [];
                for (var i = 0; i < featureSet.features.length; i++) {
                    var feature = featureSet.features[i];
                    feature.geometry.spatialReference = map.spatialReference;
                    geos.push(feature.geometry);
                }

                //var geometryService = new GeometryService("https://utility.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer");
                var geometryService = new GeometryService("http://172.16.12.172:6080/arcgis/rest/services/Utilities/Geometry/GeometryServer");
                var params = new BufferParameters();
                params.distances = [2];
                params.outSpatialReference = map.spatialReference;
                params.unit = "kilometers";
                params.geometries = geos; 
                geometryService.buffer(params, function (bufferedGeometries) {
                    
                    var symbol = new SimpleFillSymbol();
                    symbol.setColor(new Color([100, 100, 100, 0.25]));
                    symbol.setOutline(null);
                    array.forEach(bufferedGeometries, function (geometry) {
                        map.graphics.add(new Graphic(geometry, symbol));
                    });
                });
                return;
                var geometries = graphicsUtils.getGeometries(featureSet.features);
                var bufferedGeometries = geometryEngine.geodesicBuffer(geos, [2], "kilometers");
                var symbol = new SimpleFillSymbol();
                symbol.setColor(new Color([100, 100, 100, 0.25]));
                symbol.setOutline(null);
                array.forEach(bufferedGeometries, function (geometry) {
                    map.graphics.add(new Graphic(geometry, symbol));
                });
                return;

                var featureCollection = {
                    layerDefinition: {
                        "geometryType": "esriGeometryPoint",
                        "objectIdField": "OBJECTID",
                        "fields": featureSet.fields
                    }
                };
                var heatLayer = new FeatureLayer(featureCollection);
                map.addLayer(heatLayer);
                for (var i = 0; i < featureSet.features.length; i++) {
                    var feature = featureSet.features[i];
                    var point = feature.geometry.getCentroid();
                    point.spatialReference = null;
                    var grajson = {
                        geometry: point,
                        attributes: feature.attributes,
                    }
                    var gra = new Graphic(grajson)
                    heatLayer.add(gra);
                }
                var heatmapRenderer = new HeatmapRenderer({
                    colors: ["rgba(0, 255, 0, 0)", "rgb(0, 255, 0)", "rgb(255, 255, 0)", "rgb(255, 0, 0)", ],
                });
                heatLayer.setRenderer(heatmapRenderer);
                heatLayer.redraw();

            });
        });
    },
    //获取数据库的标记点数据
    getMark: function () {
        var pra = { type: "get" };
        $.post("../data/data.ashx", pra, function (result) { 
            var data = eval("(" + result + ")").rows; 
            require([
            "esri/layers/GraphicsLayer", "esri/graphic", "esri/renderers/SimpleRenderer"
            ], function (GraphicsLayer, Graphic, SimpleRenderer) {
                var layer;
                if (map.getLayer("marklayer")) {
                    layer = map.getLayer("marklayer")
                }
                else
                    layer = new GraphicsLayer({ id: "marklayer" });
                layer.clear();
                var btnDel = '<div style="text-align:center;"><button onclick="delMark(\'${id}\')">删除</button></div>';
                var infoTemplate = {
                    "title": "${name}",
                    "content": "${content}" + btnDel
                }
                for (var i = 0; i < data.length; i++) {
                    var point = new Graphic({
                        geometry: { x: Number(data[i].lon), y: Number(data[i].lat) },
                        attributes: data[i],
                        infoTemplate: infoTemplate,
                    })
                    layer.add(point);
                }
                var renderer = {
                    "type": "simple", 
                    "symbol": {
                        "url": "../star.png",
                        "height": 15,
                        "width": 15,
                        "type": "esriPMS"
                    }
                };
                layer.setRenderer(new SimpleRenderer(renderer));
                map.addLayer(layer);
            });
        });
    },
    //坐标转换
    MercatorToXY: function (mercator) { 
        var x = mercator.x / 20037508.34 * 180;
        var y = mercator.y / 20037508.34 * 180;
        y = 180 / Math.PI * (2 * Math.atan(Math.exp(y * Math.PI / 180)) - Math.PI / 2); 
        return { x: x, y: y };
    }
}
//新增标记点
function sunmitMark(){
    var name = document.getElementById('txtName').value;
    if (!name) {
        alert("名称不可为空！");
        return;
    }
    var content = document.getElementById('txtContent').value;
    var mark = gis.MercatorToXY(gis.point);
    mark.name = name;
    mark.content = content;
    mark.type = "add";
    $.post("../data/data.ashx", mark, function (result) { 
        gis.getMark();
        map.infoWindow.hide();
    }); 
    
}
//删除标记点
function delMark(id) {
    debugger;
    var pra = {
        type: "del",
        id: id, 
    };
    $.post("../data/data.ashx", pra, function (result) {
        debugger;
        gis.getMark();
        map.infoWindow.hide();
    });
}