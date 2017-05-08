  var network = null;
  var offsetx, offsety, scale, positionx, positiony, duration, easingFunction, doButton, focusButton, showButton;
  var statusUpdateSpan;
  var finishMessage = '';
  var showInterval = false;
  var showPhase = 1;
  var amountOfNodes = 5;
  var data = {
  nodes: nodes,
  edges: edges
};

  function destroy() {
    if (network !== null) {
      network.destroy();
      network = null;
    }
  }
  function draw() {
    destroy();
    statusUpdateSpan = document.getElementById('statusUpdate');
    doButton = document.getElementById('btnDo');
    focusButton = document.getElementById('btnFocus');
    showButton = document.getElementById('btnShow');

    // create a network
    var container = document.getElementById('mynetwork');
    var options = {
      physics: {
        stabilization: {
          iterations: 1200
        }
      }
    };
    network = new vis.Network(container, data, options);

    // add event listeners
    network.on('select', function(params) {
      document.getElementById('selection').innerHTML = 'Selection: ' + params.nodes;
    });
    network.on('animationFinished', function() {
      statusUpdateSpan.innerHTML = finishMessage;
    })
  }
console.log(data.nodes._data)
var results = $.map( data.nodes._data, function(e,i){
  if( e.label === 'PG 3' ) return e.id;
});
var my = [];
for (i = 0; i < nodes.length; i++) {
  my[i] = data.nodes._data[i].label;
}
console.log(my)
$( function() {
    var availableTags =
      my
    ;
    $( "#_nodes2" ).autocomplete({
      source: availableTags
    });
  } );
  function fitAnimated() {
      var options = {offset: {x:0,y:0},
        duration: 500,
      };
      network.fit({animation:options});
    }
        // MAPPING FUNCTION TO FIND BY LABEL
  function focusNode() {
    input_val = document.getElementById("_nodes2");
    node_num = input_val.value;
    console.log(node_num)
    var results = $.map( data.nodes._data, function(e,i){
      if( e.label === String(node_num) ) return e.id;
    });
    var nodeId = results

    var options = {
      // position: {x:positionx,y:positiony}, // this is not relevant when focusing on nodes
      scale: 2.0,
      offset: {x:0,y:0},
      animation: {
        duration: 500
      }
    };
    statusUpdateSpan.innerHTML = 'Focusing on PG: ' + nodeId;
    finishMessage = 'PG: ' + nodeId + ' in focus.';
    network.focus(nodeId, options);
  }
