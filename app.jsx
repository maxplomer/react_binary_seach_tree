var Tree = React.createClass({
  getInitialState: function() {
    var myState= {
      tree: [],
      newNodeValue: null
    };

    return myState;
  },

  handleChange: function(event) {
    this.setState({newNodeValue: event.target.value});
  },

  addToTree: function() {
    var tree = this.state.tree;
    tree.push(Number(this.state.newNodeValue));
    this.setState({tree: tree});

    this.setState({newNodeValue: null});
  },

  componentDidUpdate: function() {

  },

  render: function() {
    return (
      <div>
        <input type="number" min="0" step="1" value={this.state.newNodeValue} onChange={this.handleChange} placeholder="Enter integer"/>
        <button onClick={this.addToTree}>Add to tree</button>
        <br/>
        { JSON.stringify(this.state.tree) }
      </div>
    );
  }
});

React.render(<Tree/>, document.body);