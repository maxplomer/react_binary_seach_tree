var RenderTree = React.createClass({
  numberOfElementsInRow: function(row) {
    return Math.pow(2, row)
  },

  numberOfRowsInArray: function(arrayLength) {
    var result = 0;
    
    while (arrayLength > 0) {
      var numElements = this.numberOfElementsInRow(result);
      arrayLength -= numElements;
      result += 1;
    }

    return result;
  },

  getMarginMultiplier: function(base) {
    //base is row counted from bottom
    if (base == 0 ) { return 0; }
    var result = 1;
    var mult = 2;

    for (var i=1; i<base; i++) {
      result += mult;
      mult *= 2;
    }

    return result;
  },

  render: function() {
    var treeArray = this.props.treeArray.slice(0)
    var result = [];
    var row = 0;
    var numberOfRows = this.numberOfRowsInArray(this.props.treeArray.length);

    while (treeArray.length > 0) {
      var numElements = this.numberOfElementsInRow(row);
      var rowHtml = [];

      var marginMultiplier = this.getMarginMultiplier(numberOfRows - row - 1)
      var amountOfMargin = marginMultiplier * 31;

      var nodeStyle = {
        marginLeft: amountOfMargin + 'px',
        marginRight: amountOfMargin + 'px'
      };

      for (var i=0; i<numElements; i++) {
        rowHtml.push(<span className="node-holder" style={nodeStyle}>{treeArray.shift()}</span>);
      }
      result.push(<div className="row-holder">{rowHtml}</div>);
      row += 1;
    }

    return (
      <div className="tree-holder">
        { result }
      </div>
    );
  }
});

var Tree = React.createClass({
  getInitialState: function() {
    var myState;
    var storedData = sessionStorage.getItem( 'data' );

    if (storedData == null) {
      myState = {
        tree: [],
        newNodeValue: null
      };
    } else  {
      myState = JSON.parse(storedData);
    }

    return myState;
  },

  handleChange: function(event) {
    this.setState({newNodeValue: event.target.value});
  },

  addToTree: function(e) {
    e.preventDefault();

    var tree = this.state.tree;
    tree.push(Number(this.state.newNodeValue));
    this.setState({tree: tree});

    this.setState({newNodeValue: null});
  },

  clearTree: function() {
    this.setState({tree: []});
  },

  heapifyTree: function() {
    var tree = this.state.tree;

    for (var i=1; i<tree.length; i++) {
      //move up
      var child = i;
      while (child > 0) {
        var parent = Math.floor((child - 1) / 2);
        if (tree[parent] < tree[child]) {
          var tempValue = tree[child];
          tree[child] = tree[parent];
          tree[parent] = tempValue;
          child = parent;
        } else {
          break;
        }
      }
    }

    this.setState({tree: tree});
  },

  componentDidUpdate: function() {
    sessionStorage.setItem( 'data', JSON.stringify(this.state) );
  },

  render: function() {
    return (
      <div>
        Add to tree:
        <br/>
        <form onSubmit={this.addToTree}>
          <input className="integer-input" type="number" min="0" max="99999" step="1" value={this.state.newNodeValue} onChange={this.handleChange} placeholder="Enter integer"/>
          &nbsp;&nbsp;&nbsp;
          <button type="submit">Add</button>
        </form>
        <br/>

        Tree in array form:
        <br/>
        { JSON.stringify(this.state.tree) }
        &nbsp;&nbsp;&nbsp;
        <button onClick={this.clearTree}>Clear tree</button>
        &nbsp;&nbsp;&nbsp;
        <button onClick={this.heapifyTree}>Heapify tree</button>
        <br/><br/>

        Tree in visual form:
        <RenderTree treeArray={this.state.tree}/>
      </div>
    );
  }
});

React.render(<Tree/>, document.body);