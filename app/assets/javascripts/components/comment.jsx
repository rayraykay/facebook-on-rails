class Comment extends React.Component {
    render () {
        return (
            <div className="comment">
                <li>
                    {this.props.text}
                </li>
            </div>
        );
    }
}
