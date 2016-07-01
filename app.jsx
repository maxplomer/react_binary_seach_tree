var Tree = React.createClass({
  getInitialState: function() {
    var myState= { tree: [] };

    return myState;
  },

  handleChange: function(event) {

  },

  componentDidUpdate: function() {

  },

  render: function() {
    return (
      <div>
        HELLOWORLD
      </div>
    );
  }
});

React.render(<Tree/>, document.body);