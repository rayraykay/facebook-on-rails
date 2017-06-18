function create_array (length, default_val) {
    let ret = [];

    for (let i = 0; i < length; i++)
        ret.push(default_val);

    return ret;
}

function find_user_by_name (json_response, username) {
    for (let i = 0; i < json_response.length; i++) {
        if (json_response[i].username.toString() == username) {
            return json_response[i];
        }
    }

    return null;
}

function find_item_by_id (json_response, id) {
    for (let i = 0; i < json_response.length; i++) {
        if (json_response[i].id == id) {
            return json_response[i];
        }
    }

    return null;
}
