class StatusInput extends React.Component {
    handleInputChange (rootObject, text) {
        rootObject.setState({ statusBoxText: text });
    }

    handleNewStatus (rootObject, postType, postData) {
        if (postType === "image") {
            console.log("images to be added later");
        }

        // add new status to database
        $.ajax({
            url: "/statuses/create",
            type: "POST",
            data: {
                status: {
                    content: rootObject.state.statusBoxText,
                    user_id: rootObject.state.user_id
                }
            }
        })
        .done( () => {
            console.log("Success: Status successfully entered into database");
            rootObject.refreshStateFromDatabase();
        } )
        .fail( () => {
            console.log("Error: Status post ERROR");
            window.alert("Error: Status post ERROR");
        } );

        // add empty array for comment input boxes
        const newCommentInputText = rootObject.state.commentInputText.slice();
        newCommentInputText.push("");

        // add a false flag into beingCommented
        const newBeingCommented = rootObject.state.beingCommented.slice();
        newBeingCommented.push(false);

        rootObject.setState({
            statusBoxText: "",

            commentInputText: newCommentInputText,
            beingCommented: newBeingCommented,
        });
    }

    render () {
        return (
            <div className="status-input">
                <input  type="text"
                        onChange={(e) => this.handleInputChange(this.props.rootObject, e.target.value)}
                        value={this.props.text}>
                </input>
                <button onClick={() => this.handleNewStatus(this.props.rootObject, "text")}>Post</button>
            </div>
        );
    }
}
