class NASA extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: null,
        }
    }

    render() {
        return (
            <div>
                <h1>NASA Near Earth Object Monitor</h1>
                <div>
                    <h3>Enter a date:</h3>
                    <input id="date" type="date"></input>
                </div>
            </div>
        );
    }
}

/* --------------------------------- */

ReactDOM.render(
	<NASA/>,
	document.getElementById('root')
  );