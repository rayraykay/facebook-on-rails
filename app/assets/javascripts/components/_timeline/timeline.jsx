class Timeline extends React.Component {
    render () {
        let statusList = []; // the statuses as list items

        for (let i = 0; i < this.props.statusList.length; i++) {
            statusList.unshift(
                <div className="status" key={i}>
                    <Status     // general props
                     	        rootObject={this.props.rootObject}

                                // props for status
                                key={i}
                                allUsers={this.props.allUsers}
                                statusObject={this.props.statusList[i]}
                                statusIndex={i} // in status list array
                                likeList={this.props.likeList[i]}

                                // props for comments
                                commentList={this.props.commentList[i]}
                                beingCommented={this.props.beingCommented[i]}
                                commentInputText={this.props.commentInputText[i]}
                                handleBeingCommented={() => this.props.handleBeingCommented(i)}
                                handleCommentInputChange={
                                    (text) => this.props.handleCommentInputChange(text, i)
                                }

                                // props for replies
                                replyList={this.props.replyList[i]}
                                replyInputText={this.props.replyInputText[i]}
                                />
                </div>
            );
        }

        return (<div className="timeline">
                    <ul>{statusList}</ul>
                </div>);
    }
}
