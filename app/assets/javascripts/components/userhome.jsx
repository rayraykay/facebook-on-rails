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
                this.setState({
                    allUsers:           response.users,
                    statusList:         response.statuses,
                    commentList:        processRawComments(response.comments, response.statuses),
                    commentInputText:   create_array(response.statuses.length, ""),
                    beingCommented:     create_array(response.statuses.length, false),
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
                />
            </div>
        );
    }
}
