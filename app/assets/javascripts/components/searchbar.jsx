class SearchBar extends React.Component {
    handleSearchBarChange (rootObject, text) {
        rootObject.setState({ searchBarText: text });
    }

    getResults (rootObject) {
        $.ajax({
            url:        "/userhome/search",
            type:       "GET",
            dataType:   "json",
            data:       { query: rootObject.state.searchBarText },
        })
        .done(
            (response) => {
                console.log("Successfully GETed search result, " + response.result);
                rootObject.setState({ searchResult: response.result });
            }
        )
        .fail( (response) => {
                window.alert("Failed to GET search result");
                console.log("Failed to GET search result");
            }
        );
    }

    render () {
        let results = null;
        if (this.props.text != "") {
            results = <div><li>{this.props.searchResult}</li></div>
        }

        return (
            <div className="search">
                <input  placeholder="Search for a status..."
                        type="text"
                        value={this.props.text}
                        onChange={ (e) => {
                                        this.handleSearchBarChange(this.props.rootObject, e.target.value);
                                        this.getResults(this.props.rootObject);
                                    }
                                 }>
                </input>
                <ul>{results}</ul>
            </div>
        );
    }
}
