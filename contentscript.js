// Sources: https://gist.github.com/florianpasteur/118d0e29313c3fb052f944bc001cde88
function findElementByText(text, searchStart = document.body, _document = document, ignoreSpace = false) {
    return _document
        .evaluate(
            `//*[${ignoreSpace ? 'normalize-space' : 'text'}()="${text}"]`,
            searchStart,
            null,
            XPathResult.ANY_TYPE,
            null
        )
        .iterateNext();
}

window.onbeforeunload = function (event) {
    if (findElementByText('You')) {
        event.preventDefault();
        console.log(event);

        setTimeout(() => {
            alert("Click ok to rejoin");
            window.onbeforeunload = null;
            localStorage.setItem(window.location.href, new Date().getTime().toString());
            window.location.reload();
        }, 100);
        event.returnValue = `You're about to leave the meeting`;
    }
};


if (localStorage.getItem(window.location.href)) {
    const refreshTimeAsked = parseInt(localStorage.getItem(window.location.href));
    localStorage.removeItem(window.location.href);

    // 1 min to reload otherwise we ignore entering in the room
    if (refreshTimeAsked > new Date().getTime() - 1000 * 60) {
        let nbOfAttempt = 0;
        console.log("Trying to rejoin");
        let watchProcess = setInterval(() => {
            if (!findElementByText('Getting ready...')) {
                findElementByText('Join now').click();
                clearInterval(watchProcess);
            }
            if (nbOfAttempt++ > 25) {
                clearInterval(watchProcess);
            }

            console.log(".");
        }, 250);
    } else {
        console.log("Timeout expired to re enter room")
    }
}
