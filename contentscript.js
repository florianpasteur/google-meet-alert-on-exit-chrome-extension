window.onbeforeunload = function(event){
    event.preventDefault();
    console.log(event);

    return `You're about to leave the meeting`;
};

