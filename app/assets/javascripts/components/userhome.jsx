class Userhome extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            user_id: this.props.current_user,
            allUsers: [],

            searchBarText: "",

            statusList: [],
            statusBoxText: "",

            commentList: [],
            commentInputText: [],
            beingCommented: [],

            replyList: [],
            replyInputText: []
        };
    }

    handleSearchBarChange (text) {
        this.setState({ searchBarText: text });
    }

    componentWillMount () {
        this.refreshStateFromDatabase();
    }

    // this function has horrible time complexity, but whatever haha
    refreshStateFromDatabase () {
        var self = this;

        // get all the information from the userhome index
        $.ajax({
            url:        "/timeline",
            type:       "GET",
            dataType:   "json",

        })
        .done(
            (response) => {
                console.log("Successfully GETed all data");

                let commentsAndReplies = processRawCommentsAndReplies(response.replies, response.comments, response.statuses);

                let replyInputText = create_array(commentsAndReplies.replyList.length, []);
                for (let i = 0; i < commentsAndReplies.replyList.length; i++) {
                    replyInputText[i] = create_array(commentsAndReplies.replyList[i].length, "");
                }

                this.setState({
                    allUsers:           response.users,

                    statusList:         response.statuses,

                    commentList:        commentsAndReplies.commentList,
                    commentInputText:   create_array(response.statuses.length, ""),
                    beingCommented:     create_array(response.statuses.length, false),

                    replyList:          commentsAndReplies.replyList,
                    replyInputText:     replyInputText,
                });
            }
        )
        .fail( (response) => {
                window.alert("Failure to GET data");
                console.log("Failure to GET data");
            }
        );
    }

    render () {
        return (
            <div className="userhome">
                <h2>Here's what's going on today, boy</h2>
                <StatusInput    rootObject={this}
                                onClick={(postType) => this.handleNewStatus(postType)}
                                text={this.state.statusBoxText}
                />
                <Timeline   // general props
                            rootObject={this}

                            // status props
                            allUsers={this.state.allUsers}
                            statusList={this.state.statusList}

                            commentList={this.state.commentList}
                            beingCommented={this.state.beingCommented}
                            commentInputText={this.state.commentInputText}
                            handleBeingCommented={(statusIndex) => this.handleBeingCommented(statusIndex)}
                            handleCommentInputChange={
                                (text, statusIndex) => this.handleCommentInputChange(text, statusIndex)
                            }

                            // reply props
                            replyList={this.state.replyList}
                            replyInputText={this.state.replyInputText}
                />
            </div>
        );
    }
}
