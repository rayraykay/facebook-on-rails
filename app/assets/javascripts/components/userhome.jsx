class Userhome extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            user_id: this.props.current_user,

            searchBarText: "",

            statusList: [],
            statusBoxText: "",

            commentList: [],
            commentInputText: [],
            beingCommented: [],
        };
    }

    handleSearchBarChange (text) {
        this.setState({
            searchBarText: text
        });
    }

    handleInputChange (text) {
        this.setState({
            statusBoxText: text
        });
    }

    handleNewStatus (postType, postData) {
        let toPush;

        if (postType === "link") {
            toPush = <a href={this.state.statusBoxText}>LINK</a>;
        }
        else {
            toPush = this.state.statusBoxText;
        }

        // add new status
        const newStatusList = this.state.statusList.slice();
        newStatusList.push(toPush);

        // add empty array for comments
        const newCommentList = this.state.commentList.slice();
        newCommentList.push([]);

        // add empty array for comment input boxes
        const newcommentInputText = this.state.commentInputText.slice();
        newcommentInputText.push("");

        // add a false flag into beingCommented
        const newBeingCommented = this.state.beingCommented.slice();
        newBeingCommented.push(false);

        this.setState({
            statusList: newStatusList,
            statusBoxText: "",

            commentList: newCommentList,
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

        this.setState({
            beingCommented: newBeingCommented
        });
    }

    handleCommentInputChange (text, statusIndex) {
        let newcommentInputText = this.state.commentInputText.slice();
        newcommentInputText[statusIndex] = text;

        this.setState({
            commentInputText: newcommentInputText
        });
    }

    componentDidMount () {
        this.refreshStateFromDatabase();
    }

    refreshStateFromDatabase () {
        $.ajax({
            url:        "users.json",
            type:       "GET",
            dataType:   "json",
        })
        .done(
            (response) => {
                window.alert("GET success from database, length of user database is " + response.length +
                  ", current user is " + find_user_by_id(response, this.state.user_id).username);
            }
        )
        .fail(
            (response) => { window.alert('Failure to GET from database', response); }
        );
    }

    render () {
        return (
            <div className="userhome">
                <h1>React: {this.state.user_id}</h1>
            </div>
        );
    }
}
