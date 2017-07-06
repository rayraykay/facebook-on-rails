class Reply extends React.Component {
    render () {
        return (
            <div className="reply">
                <li>
                    <h5>Reply from: {this.props.username}</h5>
                    <p>{this.props.content}</p>
                </li>
            </div>
        );
    }
}
