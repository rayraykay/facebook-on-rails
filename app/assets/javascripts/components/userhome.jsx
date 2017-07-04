class Userhome extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            user_id: this.props.current_user,
            allUsers: [],

            searchBarText: "",
            searchResult: null,

            statusList: [],
            statusBoxText: "",
            likeList: [],

            commentList: [],
            commentInputText: [],
            beingCommented: [],

            replyList: [],
            replyInputText: [],
        };
    }

    componentWillMount () {
        this.refreshStateFromDatabase();
        subscribeToTimeline(this);
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
                    likeList:           processRawLikes(response.likes, response.statuses),

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
                <SearchBar  rootObject={this}
                            text={this.state.searchBarText}
                            searchResult={this.state.searchResult}
                />

                <h2>Here's what's going on today, boy</h2>
                <StatusInput    rootObject={this}
                                text={this.state.statusBoxText}
                />
                <Timeline   // general props
                            rootObject={this}

                            // status props
                            allUsers={this.state.allUsers}
                            statusList={this.state.statusList}
                            likeList={this.state.likeList}

                            commentList={this.state.commentList}
                            beingCommented={this.state.beingCommented}
                            commentInputText={this.state.commentInputText}

                            // reply props
                            replyList={this.state.replyList}
                            replyInputText={this.state.replyInputText}
                />
            </div>
        );
    }
}
