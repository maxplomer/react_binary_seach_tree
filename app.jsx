var Tree = React.createClass({
  getInitialState: function() {
    var myState= {
      tree: [1,2,3,4],
      newNodeValue: 1234
    };

    return myState;
  },

  handleChange: function(event) {
    this.setState({newNodeValue: event.target.value});
  },

  componentDidUpdate: function() {

  },

  render: function() {
    return (
      <div>
        <input type="number" min="0" step="1" value={this.state.newNodeValue} onChange={this.handleChange} placeholder="Enter integer"/>
        <button>Add to tree</button>
        <br/>
        { this.state.tree }
      </div>
    );
  }
});

React.render(<Tree/>, document.body);