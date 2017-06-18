function processRawComments (rawCommentList, statusList) {
    // now process rawCommentList into the data structure we need
    // each status will have a corresponding array of comments in
    // the commentList property in the state

    // the data structure generation here has horrible time complexity,
    // but whatever
    let commentListToAssign = [];

    for (let i = 0; i < statusList.length; i++) {
        let toPush = [];

        for (let j = 0; j < rawCommentList.length; j++) {
            if (statusList[i].id == rawCommentList[j].status_id) {
                toPush.push(rawCommentList[j]);
            }
        }

        // push even if empty
        commentListToAssign.push(toPush);
    }

    return commentListToAssign;
}
