class StatusInput extends React.Component {
    render () {
        return (
            <div className="status-input">
                <input  type="text"
                        onChange={(e) => this.props.handleInputChange(e.target.value)}
                        value={this.props.text}>
                </input>
                <button onClick={() => this.props.onClick("text")}>Post</button>
            </div>
        );
    }
}
