class Comment extends React.Component {
    handleReplyInputChange (rootObject, statusIndex, commentIndex, text) {
        let newReplyInputText = rootObject.state.replyInputText.slice();
        newReplyInputText[statusIndex][commentIndex] = text;

        rootObject.setState({ replyInputText: newReplyInputText });
    }

    handleNewReply (rootObject, statusIndex, commentIndex, statusID, commentID) {
        $.ajax({
            url:        "/replies/create",
            type:       "POST",
            dataType:   "json",
            data:       { reply: {
                            content:    rootObject.state.replyInputText[statusIndex][commentIndex],
                            status_id:  statusID,
                            comment_id: commentID,
                            user_id:    rootObject.state.user_id }
                        }
        })
        .done( () => {
                console.log("Reply POST success.");
            }
        )
        .fail( () => {
            console.log(rootObject.state.replyInputText[statusIndex][commentIndex]);
            window.alert("Reply POST failure.");
            console.log("Reply POST failure.");
        });
    }

    render () {

        let replyList = [];

        for (let i = 0; i < this.props.replyList.length; i++) {
            replyList.push(
                <Reply content={this.props.replyList[i].content}
                       key={i}
                       username={find_item_by_id(this.props.allUsers, this.props.replyList[i].user_id).username.toString()}/>
            );
        }

        let username = find_item_by_id(this.props.allUsers, this.props.commentObject.user_id).username.toString();

        return (
            <div className="comment">
                <li>
                    <h5>Comment from: {username}</h5>
                    <p>{this.props.text}</p>

                    <div className="reply-input">
                        <input  placeholder="Write a reply..."
                                type="text"
                                value={this.props.replyInputText}
                                onChange={(e) => this.handleReplyInputChange(this.props.rootObject,
                                            this.props.statusIndex, this.props.commentIndex, e.target.value)}/>
                        <button onClick={() => this.handleNewReply(this.props.rootObject, this.props.statusIndex,
                                            this.props.commentIndex, this.props.commentObject.status_id, this.props.commentObject.id)}>
                                            Reply
                        </button>
                    </div>

                    <ul>{replyList}</ul>
                </li>
            </div>
        );
    }
}
