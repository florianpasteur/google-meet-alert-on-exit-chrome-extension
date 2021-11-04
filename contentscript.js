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

window.onbeforeunload = function(event){
    if (findElementByText('You')) {
        event.preventDefault();
        console.log(event);

        setInterval(() => {
             window.onbeforeunload = null;
             window.location.href = window.location.href + '?rejoin=true';
         }, 100);
        event.returnValue = `You're about to leave the meeting`;
    }
};


if (window.location.href.indexOf('rejoin=true') >= 0) {
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
}
