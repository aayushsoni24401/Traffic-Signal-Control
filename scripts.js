$(document).ready(function(){
    let signalInterval;
    let currentSignalIndex = 0;
    let running = false;

    $('#startButton').click(function(){
        const sequence = $('#sequence').val().split(',');
        const greenInterval = parseInt($('#greenInterval').val());
        const yellowInterval = parseInt($('#yellowInterval').val());

        if(!sequence || !greenInterval || !yellowInterval){
            alert('All Fields are required.');
            return;
        }

        if(running){
            alert('Signal is Already Running!');
            return;
        }

        //send details to server
        $.ajax({
            url: 'start.php',
            type: 'POST',
            data: {
                sequence: $('#sequence').val(),
                greenInterval: greenInterval,
                yellowInterval: yellowInterval
            },
            success: function(response) {
                $('#signalStatus').html(`<div class="alert alert-success">${response}</div>`);
                running: true;
                currentSignalIndex = 0;
                startSignalCycle(sequence, greenInterval, yellowInterval);
            },
            error: function(){
                alert('Failed to Start the Signal.');
            }
        });
    });

    $('#stopButton').click(function(){
        if(signalInterval){
            clearInterval(signalInterval);
        }
        running: false;
        resetSignals();
        $('#signalStatus').html(`<div class="alert alert-info">Signals Stopped!</div>`);

        //Notify server to stop signals
        $.ajax({
            url: 'stop.php',
            type: 'POST',
            success: function(response){
                $('#signalStatus').html(`<div class="alert alert-info">${response}</div>`);
            },
            error: function(){
                alert('Failed to Stop the Signal!');
            }
        });
    });

    function startSignalCycle(sequence, greenInterval, yellowInterval){
        const totalInterval = (greenInterval + yellowInterval) * 1000;

        signalInterval = setInterval(function(){
            const currentSignal = sequence[currentSignalIndex % sequence.length].trim();

            resetSignals();
            $(`#signal${currentSignal}`).removeClass('red').addClass('green');

            setTimeout(function(){
                $(`#signal${currentSignal}`).removeClass('green').addClass('yellow');
            }, greenInterval * 1000);

            currentSignalIndex++;
        }, totalInterval);
    }

    function resetSignals(){
        $('.signal').removeClass('green yellow').addClass('red');
    }

    resetSignals();
});
