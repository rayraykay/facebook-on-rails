function processRawCommentsAndReplies (rawReplyList, rawCommentList, statusList) {
    let commentList = processRawComments(rawCommentList, statusList)

    // doing the above first to force processRawComments to occur first
    return ({
        commentList: commentList,
        replyList: processRawReplies(rawReplyList, statusList, commentList),
    });
}

// i'm sure these functions can be much more easily
// optimized, but whatever

// now process rawCommentList into the data structure we need
// each status will have a corresponding array of comments in
// the commentList property in the state

// the data structure generation here has horrible time complexity,
// but whatever
function processRawComments (rawCommentList, statusList) {
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

// process the raw list of replies into the data structure we need
// it will essentially be a 3D array, where the first index is the
// status, the second index is the comment, and the third indexes
// the individual replies

// this also has horrible time complexity, but whatever

// this function assumes that the status and comment lists have been
// sorted and created
function processRawReplies (rawReplyList, statusList, commentList) {
    let replyListToAssign = [];

    for (let i = 0; i < statusList.length; i++) {
        let toPushHigherLevel = [];

        for (let j = 0; j < commentList[i].length; j++) {
            let toPushLowerLevel = [];

            for (let k = 0; k < rawReplyList.length; k++) {
                if (statusList[i].id == rawReplyList[k].status_id && commentList[i][j].id == rawReplyList[k].comment_id) {
                    toPushLowerLevel.push(rawReplyList[k]);
                }
            }

            toPushHigherLevel.push(toPushLowerLevel);
        }

        replyListToAssign.push(toPushHigherLevel);
    }

    return replyListToAssign;
}

function processRawLikes (rawLikeList, rawStatusList) {
    let likeList = [];

    for (let i = 0; i < rawStatusList.length; i++) {
        let toPush = [];

        for (let j = 0; j < rawLikeList.length; j++) {
            if (rawLikeList[j].status_id == rawStatusList[i].id) {
                toPush.push(rawLikeList[j]);
            }
        }

        likeList.push(toPush);
    }

    return likeList;
}
