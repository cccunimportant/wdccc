# Vis.js 圖表繪製函式庫

Vis.js 官網： <http://visjs.org/>


## 簡單網路圖

檔案：  [simpleNetwork.html](http://ccc.nqu.edu.tw/db/jsb/code/visjs/simpleNetwork.html)

```html
<!doctype html>
<html>
<head>
  <title>Network | Basic usage</title>

  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/vis/4.8.1/vis.min.js"></script>
  <link href="https://cdnjs.cloudflare.com/ajax/libs/vis/4.8.1/vis.min.css" rel="stylesheet" type="text/css" />

  <style type="text/css">
    #mynetwork {
      width: 600px;
      height: 400px;
      border: 1px solid lightgray;
    }
  </style>
</head>
<body>

<p>
  Create a simple network with some nodes and edges.
</p>

<div id="mynetwork"></div>

<script type="text/javascript">
  // create an array with nodes
  var nodes = new vis.DataSet([
    {id: 1, label: 'Node 1'},
    {id: 2, label: 'Node 2'},
    {id: 3, label: 'Node 3'},
    {id: 4, label: 'Node 4'},
    {id: 5, label: 'Node 5'}
  ]);

  // create an array with edges
  var edges = new vis.DataSet([
    {from: 1, to: 3},
    {from: 1, to: 2},
    {from: 2, to: 4},
    {from: 2, to: 5}
  ]);

  // create a network
  var container = document.getElementById('mynetwork');
  var data = {
    nodes: nodes,
    edges: edges
  };
  var options = {};
  var network = new vis.Network(container, data, options);
</script>
</body>
</html>
```

## 簡單統計表

檔案： [graph3d.html](http://ccc.nqu.edu.tw/db/jsb/code/visjs/graph3d.html)

```html
<!doctype html>
<html>
<head>
  <title>Graph 3D demo</title>

  <style>
    body {font: 10pt arial;}
  </style>

  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/vis/4.8.1/vis.min.js"></script>

  <script type="text/javascript">
    var data = null;
    var graph = null;

    function custom(x, y) {
      return (Math.sin(x/50) * Math.cos(y/50) * 50 + 50);
    }

    // Called when the Visualization API is loaded.
    function drawVisualization() {
      // Create and populate a data table.
      data = new vis.DataSet();
      // create some nice looking data with sin/cos
      var counter = 0;
      var steps = 50;  // number of datapoints will be steps*steps
      var axisMax = 314;
      var axisStep = axisMax / steps;
      for (var x = 0; x < axisMax; x+=axisStep) {
        for (var y = 0; y < axisMax; y+=axisStep) {
          var value = custom(x,y);
          data.add({id:counter++,x:x,y:y,z:value,style:value});
        }
      }

      // specify options
      var options = {
        width:  '600px',
        height: '600px',
        style: 'surface',
        showPerspective: true,
        showGrid: true,
        showShadow: false,
        keepAspectRatio: true,
        verticalRatio: 0.5
      };

      // Instantiate our graph object.
      var container = document.getElementById('mygraph');
      graph = new vis.Graph3d(container, data, options);
    }
  </script>
</head>

<body onload="drawVisualization();">
<div id="mygraph"></div>

<div id="info"></div>
</body>
</html>
```

