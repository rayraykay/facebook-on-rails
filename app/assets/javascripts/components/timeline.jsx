class Timeline extends React.Component {
    render () {
        let statusList = []; // the statuses as list items

        for (let i = 0; i < this.props.statusList.length; i++) {
            statusList.unshift(
                <div>
                    <Status 	key={i}
                                allUsers={this.props.allUsers}
                                username={find_item_by_id(this.props.allUsers, this.props.statusList[i].user_id).username.toString()}
								text={this.props.statusList[i].content}

                                // props for comments
                                commentList={this.props.commentList[i]}
                                beingCommented={this.props.beingCommented[i]}
                                commentInputText={this.props.commentInputText[i]}
                                handleBeingCommented={() => this.props.handleBeingCommented(i)}
                                handleCommentInputChange={
                                    (text) => this.props.handleCommentInputChange(text, i)
                                }
                                handleNewComment={() => this.props.handleNewComment(i)}/>
                </div>
            );
        }

        return (<div>
                    <ul>{statusList}</ul>
                </div>);
    }
}
