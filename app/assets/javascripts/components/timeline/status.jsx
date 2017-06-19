class Status extends React.Component {
    handleNewComment (rootObject, statusIndex, statusID) {
        $.ajax({
            url:        "/comments/create",
            type:       "POST",
            dataType:   "json",
            data:       { comment: {
                            content:    rootObject.state.commentInputText[statusIndex],
                            status_id:  statusID,
                            user_id:    rootObject.state.user_id }
                        }
        })
        .done( () => {
                console.log("Comment POST success.");
                rootObject.refreshStateFromDatabase();
        })
        .fail( () => console.log("Failure to POST comment") );
    }

    handleBeingCommented (rootObject, statusIndex) {
        let newBeingCommented = rootObject.state.beingCommented.slice();
        newBeingCommented[statusIndex] = !newBeingCommented[statusIndex];

        rootObject.setState({ beingCommented: newBeingCommented });
    }

    handleCommentInputChange (rootObject, text, statusIndex) {
        let newCommentInputText = rootObject.state.commentInputText.slice();
        newCommentInputText[statusIndex] = text;

        rootObject.setState({ commentInputText: newCommentInputText });
    }

    likeStatus (rootObject, statusID) {
        $.ajax({
            url:        "/likes/create",
            type:       "POST",
            dataType:   "json",
            data:       { like: {
                            user_id: rootObject.state.user_id,
                            status_id: statusID }
                        }
        })
        .done( () => {
            console.log("like POST success.");
            rootObject.refreshStateFromDatabase();
        })
        .fail( (response) => {
            console.log("Failure to POST like");
            console.log(response)
            window.alert("Failure to POST like");
        } );
    }

    unlikeStatus (rootObject, statusID) {
        $.ajax({
            url:        "/likes/delete",
            type:       "DELETE",
            dataType:   "json",
            data:       { like: {
                            user_id: rootObject.state.user_id,
                            status_id: statusID }
                        }
        })
        .done( () => {
            console.log("like DELETE success.");
            rootObject.refreshStateFromDatabase();
        })
        .fail( () => {
            console.log("Failure to DELETE like");
            window.alert("Failure to DELETE like");
        } );
    }

    render () {
        // process like button and like count
        let likeCount = null;
        if (this.props.likeList.length) {
            likeCount = (<div className="like-count"><h4>{this.props.likeList.length} likes</h4></div>);
        }

        // first assume that the user has not pressed like until you find a like in the list
        let hasPressed = false;
        for (let i = 0; i < this.props.likeList.length && !hasPressed; i++) {
            if (this.props.likeList[i].user_id == this.props.rootObject.state.user_id) {
                hasPressed = true;
            }
        }

        let likeButton;
        if (!hasPressed) {
            likeButton = <div className="like-button">
                            <button onClick={() => this.likeStatus(this.props.rootObject, this.props.statusObject.id)}>Like</button>
                         </div>;
        }
        else {
            likeButton = <div className="like-button">
                            <button onClick={() => this.unlikeStatus(this.props.rootObject, this.props.statusObject.id)}>Unlike</button>
                         </div>
        }

        // code for handling the user's input for a comment if the reply button is pressed
        let commentElement;

        if (this.props.beingCommented) {
            commentElement = (<div className="comment-input">
                                <input  placeholder="Write a comment..."
                                        type="text"
                                        value={this.props.commentInputText}
                                        onChange={(e) => this.handleCommentInputChange(this.props.rootObject,
                                                            e.target.value, this.props.statusIndex)}>
                                </input>
                                <button onClick={() => this.handleNewComment(this.props.rootObject,
                                                            this.props.statusIndex, this.props.statusObject.id)}>
                                    Post Comment
                                </button>
                             </div>);
        }
        else {
            commentElement = <button onClick={() => this.handleBeingCommented(this.props.rootObject, this.props.statusIndex)}>Comment</button>;
        }

        // handling the actual texts of comments
        let commentList = [];

        for (let i = 0; i < this.props.commentList.length; i++) {
            commentList.push(
                <Comment    // general props
                            key={i}
                            rootObject={this.props.rootObject}

                            // status index in statusList that this comments belongs to
                            statusIndex={this.props.statusIndex}

                            // comment props
                            commentObject={this.props.commentList[i]}
                            text={this.props.commentList[i].content}
                            commentIndex={i}

                            // reply props
                            replyList={this.props.replyList[i]}
                            replyInputText={this.props.replyInputText[i]}
                            />
            );
        }

        let username = find_item_by_id(this.props.allUsers, this.props.statusObject.user_id).username.toString();
        let content = this.props.statusObject.content;

        return (
            <div className="status">
                <li>
                    <h3 className="username">Poster: {username}</h3>
                    <p>{content}</p>
                    {likeCount}
                    {commentElement}
               </li>

               {likeButton}

               <ul>{commentList}</ul>
            </div>
        );
    }
}
