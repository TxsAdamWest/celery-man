// var turnButton = document.querySelector("#turnBtn")

var bmo = document.querySelector('#bmo')

var bmoState = {
    showing: true,
    facingRight: true,
    top: 0,
    left: 0,
}

function bmoBeGone() {
    if (bmoState.showing === true) {
        bmo.style.opacity = .0
        bmoState.showing = false
    } else {
        bmo.style.opacity = 1
        bmoState.showing = true
    }
}

function startRace() {

  window.addEventListener('keydown', bmoControl)

    $(".start").remove();
    $(".announcer")[0].innerHTML = "Go!";

    var bmoContainer = $(".bmo-container")[0];
    console.log(bmoContainer)
    $(bmoContainer).css("border" , "3px solid green");

    $("body").append("<audio class='go' autoplay loop controls><source src='./marioparty2.mp3'></audio>");

    var count = 0;

    var timerCount = $("#timer-count")[0].innerHTML;
    // console.log(timerCount)
    setInterval(function(timerCount) {
        count += 1;

        $("#timer-count")[0].innerHTML = count;
        console.log(timerCount);
    }, 100);

    $(startBtn).hide();
}

startBtn.addEventListener('click', startRace)

console.log(parseInt($(bmo).css("left")))



// me: when the space bar is pressed, bmo should flip from right to left. 

function bmoControl(eventObj, count) {
    if (eventObj.keyCode === 32) {
        if (bmoState.facingRight === true) {
            bmo.style.transform = 'rotateY(180deg)'
            bmoState.facingRight = false
            console.log('bmoState.Showing is ' + bmoState.showing)
            // console.log('bmoState.facingRight is ' + bmoState.facingRight)
        } else {
            bmo.style.transform = 'rotateY(0deg)'
            bmoState.facingRight = true
            // console.log('bmoState.showing is ' + bmoState.showing)
            // console.log('bmoState.facingRight is ' + bmoState.facingRight)
        }
    }

    if (eventObj.keyCode === 38) {
        console.log("38 up")
        bmoState.top -= 10
        bmo.style.top = bmoState.top + 'px'
    }

    if (eventObj.keyCode === 40) {
        console.log("40 down")
        bmoState.top += 10
        bmo.style.top = bmoState.top + 'px'
    }

    if (eventObj.keyCode === 37) {
        // console.log('37 left')
        bmoState.left -= 10
        bmo.style.transform = 'rotateY(180deg)'
        bmo.style.left = bmoState.left + 'px'
    }

    if (eventObj.keyCode === 39) {
        // console.log('39 right
        // console.log($(bmo).css("left"))

        bmoState.left += 5
        bmo.style.transform = 'rotateY(0deg)'
        bmo.style.left = bmoState.left + 'px'
    }

    //Victory Condition
    if (parseInt($(bmo).css("left")) > 920) {

        var finishTime = $("#timer-count")[0].innerHTML;

        console.log( finishTime / 6 );


        alert("You win! Your time was " + $("#timer-count")[0].innerHTML + " seconds!");

        var bmoPosition = $("#bmo").css("left");
        bmoPosition = 0;
        count = 0;
    }
}

