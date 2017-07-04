function subscribeToTimeline () {
    // see if you can delete room later
    App.cable.subscriptions.create({
        channel: "TimelineChannel",
        testparam: "Hello I am in cable_helpers and testing whether backend can receive me as a connection",
    },
    {
        received: (response) => { console.log(response.test); }
    });
}
