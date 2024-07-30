window.raptor = (function () {
    var theChosenImage = './raptor.png';
    var theChosenTune = './raptor-sound.mp3';
    var setImageAndTune = function (image, tune) {
        theChosenImage = image;
        theChosenTune = tune;
        insertDom();
    }
    function insertDom() {
        // image and audio
        var mainImageMarkup = '<img id="theMegazord" style="display: none" src="' + theChosenImage + '">';
        var mainAudioMarkup = '<audio id="theMegazordCall" preload="auto"><source src="' + theChosenTune + '" type="audio/mpeg" ></audio>';
        $('body').append(mainImageMarkup);
        $('body').append(mainAudioMarkup);
    }

    // The starting position begins near the right-hand side of your browser.
    const theChosenStartPosition = '-400';
    // The ending position ends towards the left-hand side of your browser.
    const theChosenEndPosition = '-400';
    const theChosenSpeed = 3200;

    var showed = false;
    function getShowed() {
        return showed;
    }
    var showing = false;
    function itsMorphinTime() {
        showed = true;
        if (showing) return;
        showing = true;

        // Clever girl
        var megazord = $('#theMegazord').css({
            "position": "fixed",
            "bottom": "-1000px",
            "right": parseInt(theChosenStartPosition, 10) + "px",
            "display": "block",
            "z-index": "9999"
        });

        // Get the guitar
        playSound();

        // Play the guitar solo
        function playSound() {
            document.getElementById('theMegazordCall').play();
        }

        // Movement hilarity
        megazord.animate({
                "bottom": "0"
            }, 300,
            function () {
                $(this).animate({
                        "bottom": "-30px"
                    }, 300,
                    function () {
                        var top_left_image_position = (($(this).position().left) - parseInt(theChosenEndPosition, 10));
                        $(this).delay(300).animate({
                                "right": parseInt(top_left_image_position, 10) + parseInt(theChosenStartPosition, 10)
                            }, parseInt(theChosenSpeed, 10),
                            function () {
                                megazord = $('#theMegazord').css({
                                    "bottom": "-1000px",
                                    "right": parseInt(theChosenStartPosition, 10) + "px"
                                });
                                // 等待声音结束
                                setTimeout(function () {
                                    showing = false;
                                }, 500);
                            }
                        );
                    }
                );
            }
        );
    }
    return {
        setImageAndTune: setImageAndTune,
        showed: getShowed,
        itsMorphinTime: itsMorphinTime
    }
})();
