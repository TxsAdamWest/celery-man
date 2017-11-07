// var turnButton = document.querySelector("#turnBtn")

var veggie = document.querySelector('#veggie')

var veggieState = {
    showing: true,
    facingRight: true,
    top: 0,
    left: 0
}

//Unused fading effect
function veggieBeGone() {
    if (veggieState.showing === true) {
        veggie.style.opacity = 0;
        veggieState.showing = false;
    } else {
        veggie.style.opacity = 1;
        veggieState.showing = true;
    }
}

//TODO:  Create object to contain global variables.
var count = 0;
var laps = 0;
var controlState = 1;


function startRace() {

    window.addEventListener('keydown', veggieControl);

    $(".start").remove();
    $(".announcer")[0].innerHTML = "Go!";
    $(".timer-box").show();

    var veggieContainer = $(".veggie-container")[0];
    console.log(veggieContainer);
    $(veggieContainer).css("border", "3px solid green");

    $("body").append("<audio class='go' autoplay loop controls><source src='./assets/audio/marioparty2.mp3'></audio>");


    var timerCount = $("#timer-count")[0].innerHTML;
    // console.log(timerCount)
    setInterval(function(timerCount) {
        count += 1;

        $("#timer-count")[0].innerHTML = count / 10;
        console.log(timerCount);
    }, 100);

    $(startBtn).hide();
}

startBtn.addEventListener('click', startRace);

// console.log(parseInt($(veggie).css("left")))



// me: when the space bar is pressed, veggie should flip from right to left. 

function veggieControl(eventObj, count) {

    // var speed = 10;

    console.log(controlState, " << controlState")
    if (controlState > 0) {

        if (eventObj.keyCode === 32) {
            if (veggieState.facingRight === true) {
                veggie.style.transform = 'rotateY(180deg)';
                veggieState.facingRight = false;
                console.log('veggieState.Showing is ' + veggieState.showing);
                // console.log('veggieState.facingRight is ' + veggieState.facingRight)
            } else {
                veggie.style.transform = 'rotateY(0deg)';
                veggieState.facingRight = true;
                // console.log('veggieState.showing is ' + veggieState.showing)
                // console.log('veggieState.facingRight is ' + veggieState.facingRight)
            }
        }

        if (eventObj.keyCode === 38) {
            console.log("38 up");
            veggieState.top -= 10;
            veggie.style.top = veggieState.top + 'px';
        }

        if (eventObj.keyCode === 40) {
            console.log("40 down");
            veggieState.top += 10;
            veggie.style.top = veggieState.top + 'px';
        }

        if (eventObj.keyCode === 37) {
            // console.log('37 left')
            veggieState.left -= 10;
            veggie.style.transform = 'rotateY(180deg)';
            veggie.style.left = veggieState.left + 'px';
        }

        if (eventObj.keyCode === 39) {
            // console.log('39 right
            // console.log($(veggie).css("left"))

            veggieState.left += 30;
            veggie.style.transform = 'rotateY(0deg)';
            veggie.style.left = veggieState.left + 'px';
        }

    }

    function reset(count) {
        veggieState.left = 0;
        veggie.style.left = veggieState.left + 'px';
        $("#lap-count")[0].innerHTML = count / 10;

        laps += 1;

        $("#lap-count")[0].innerHTML = laps;
        // timerCount = 0;
    }

    //Finish Lap
    if (parseInt($(veggie).css("left")) > 920) {

        //Victory Condition
        if (laps > 4) {
            alert("You did it! Your final time was " + $("#timer-count")[0].innerHTML + " seconds!");
            $(".veggie-container").remove();
            $(".timer-box").hide();
            $(".instructions").hide();
            $("#victory-image").css("opacity", 1);
            $(".announcer")[0].innerHTML = "YOU WIN!!";
            $(".announcer").css("font-size", "3em");
            $(".announcer").css("color", "green");
            $(".announcer").addClass("zoomInUp");
            controlState = 0;
        } else {
            alert("Keep going! Your time is " + $("#timer-count")[0].innerHTML + " seconds!");
            reset(count); //TODO: For later replayability, make counter reset to 0.
        }
    }

}