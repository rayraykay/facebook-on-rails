class Status extends React.Component {
    render () {
        // code for handling the user's input for a comment if the reply button is pressed
        /*
        let commentElement;

        if (this.props.beingCommented) {
            commentElement = (<div className="comment-input">
                                <input  type="text"
                                        value={this.props.commentInputText}
                                        onChange={(e) => this.props.handleCommentInputChange(e.target.value)}>
                                </input>
                                <button onClick={this.props.handleNewComment}>Post Comment</button>
                             </div>);
        }
        else {
            commentElement = <button onClick={this.props.handleBeingCommented}>Comment</button>;
        }

        // handling the actual texts of comments
        let commentList = [];

        for (let i = 0; i < this.props.commentList.length; i++) {
            commentList.push(
                <Comment    key={i}
                            text={this.props.commentList[i].content}/>
            );
        }
        */
        return (
            <div className="status">
                <li>
                    <h3 className="username">Poster: {this.props.username}</h3>
                    <p>{this.props.text}</p>

               </li>
            </div>
        );
    }
}
