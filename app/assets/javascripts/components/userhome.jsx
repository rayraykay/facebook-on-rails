class Userhome extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            user_id: this.props.current_user,
            allUsers: [],

            searchBarText: "",

            statusList: [],
            statusBoxText: "",

            rawCommentList: [],
            commentList: [],
            commentInputText: [],
            beingCommented: [],
        };
    }

    handleSearchBarChange (text) {
        this.setState({ searchBarText: text });
    }

    handleInputChange (text) {
        this.setState({ statusBoxText: text });
    }

    handleNewStatus (postType, postData) {
        if (postType === "image") {
            console.log("images to be added later");
        }

        // add new status to database
        $.ajax({
            url: "statuses",
            type: "POST",
            data: {
                status: {
                    content: this.state.statusBoxText,
                    user_id: this.state.user_id
                }
            }
        })
        .done( () => console.log("Success: Status successfully entered into database") )
        .fail( () => {
            console.log("Error: Status post ERROR");
            window.alert("Error: Status post ERROR");
        } );

        // add empty array for comment input boxes
        const newcommentInputText = this.state.commentInputText.slice();
        newcommentInputText.push("");

        // add a false flag into beingCommented
        const newBeingCommented = this.state.beingCommented.slice();
        newBeingCommented.push(false);

        this.refreshStateFromDatabase();
        this.setState({
            statusBoxText: "",

            commentInputText: newcommentInputText,
            beingCommented: newBeingCommented,
        });
    }

    handleNewComment (statusIndex) {
        // add new comment, clear the input box, and revert back to the
        // button
        let newCommentList = this.state.commentList.slice();
        newCommentList[statusIndex].push(this.state.commentInputText[statusIndex]);

        let newCommentInputText = this.state.commentInputText.slice();
        newCommentInputText[statusIndex] = "";

        let newBeingCommented = this.state.beingCommented.slice();
        newBeingCommented[statusIndex] = !newBeingCommented[statusIndex];

        this.setState({
            commentList: newCommentList,
            commentInputText: newCommentInputText,
            beingCommented: newBeingCommented
        });
    }

    handleBeingCommented (statusIndex) {
        let newBeingCommented = this.state.beingCommented.slice();
        newBeingCommented[statusIndex] = !newBeingCommented[statusIndex];

        this.setState({ beingCommented: newBeingCommented });
    }

    handleCommentInputChange (text, statusIndex) {
        let newCommentInputText = this.state.commentInputText.slice();
        newCommentInputText[statusIndex] = text;

        this.setState({
            commentInputText: newCommentInputText
        });
    }

    componentWillMount () {
        this.refreshStateFromDatabase();
    }

    // this function has horrible time complexity, but whatever haha
    refreshStateFromDatabase () {
        // refresh users
        $.ajax({
            url:        "/users",
            type:       "GET",
            dataType:   "json",
        })
        .done(
            (response) => {
                this.setState({ allUsers: response.data });
                console.log("Successfuly GETed users");
            }
        )
        .fail(
            (response) => { window.alert('Failure to GET users from database', response); }
        );

        // refresh statuses
        $.ajax({
            url:        "statuses.json",
            type:       "GET",
            dataType:   "json",
        })
        .done(
            (response) => {
                console.log("Successfully GETed statuses");
                this.setState({ statusList: response });
                this.refreshComments();
            }
        )
        .fail(
            (response) => { window.alert('Failure to GET statuses from database', response); }
        );
    }

    // for debugging
    test (location) {
        console.log(this.state.statusList.length + " statuses in " + location);
    }

    // only to be called after statuses have been loaded
    refreshComments () {
        $.ajax({
            url:        "comments.json",
            type:       "GET",
            dataType:   "json",
        })
        .done(
            (response) => {
                console.log("Successfully GETed comments");
                this.setState({ rawCommentList: this.processRawComments(response) });
            }
        )
        .fail(
            (response) => { window.alert('Failure to GET comments from database', response); }
        );
    }

    processRawComments (rawCommentList) {
        // now process rawCommentList into the data structure we need
        // each status will have a corresponding array of comments in
        // the commentList property in the state

        // the data structure generation here has horrible time complexity,
        // but whatever
        let commentListToAssign = [];

        for (let i = 0; i < this.state.statusList.length; i++) {
            let toPush = [];

            for (let j = 0; j < rawCommentList.length; j++) {
                if (this.state.statusList[i].id == rawCommentList[j].status_id) {
                    toPush.push(rawCommentList[j]);
                }
            }

            // only push if not empty
            if (toPush.length) {
                commentListToAssign.push(toPush);
            }
        }

        return commentListToAssign;
    }

    render () {
        return (
            <div className="userhome">
                <h2>Here's what's going on today, boy</h2>
                <StatusInput    onClick={(postType) => this.handleNewStatus(postType)}
                                handleInputChange={(inputText) => this.handleInputChange(inputText)}
                                text={this.state.statusBoxText}
                />
                <Timeline   allUsers={this.state.allUsers}
                            statusList={this.state.statusList}

                            commentList={this.state.commentList}
                            beingCommented={this.state.beingCommented}
                            commentInputText={this.state.commentInputText}
                            handleBeingCommented={(statusIndex) => this.handleBeingCommented(statusIndex)}
                            handleCommentInputChange={
                                (text, statusIndex) => this.handleCommentInputChange(text, statusIndex)
                            }
                            handleNewComment={(statusIndex) => this.handleNewComment(statusIndex)}/>
            </div>
        );
    }
}
