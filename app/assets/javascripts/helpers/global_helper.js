function create_array (length, default_val) {
    let ret = [];

    for (let i = 0; i < length; i++)
        ret.push(default_val);

    return ret;
}

// general functions for data structures

function find_item_by_id (json_response, id) {
    for (let i = 0; i < json_response.length; i++) {
        if (json_response[i].id == id) {
            return json_response[i];
        }
    }

    return null;
}

// specifically for users

function find_user_by_name (json_response, username) {
    for (let i = 0; i < json_response.length; i++) {
        if (json_response[i].username.toString() == username) {
            return json_response[i];
        }
    }

    return null;
}

// debuggers
function printReplyListData (replyList) {
    console.log("There are " + replyList.length + " upper levels in replies");
    for (let i = 0; i < replyList.length; i++) {
        console.log("In status " + i + ", there are " + replyList[i].length + " lower levels");
    }
}
