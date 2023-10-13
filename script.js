$(document).ready(function() {
    var player = "X";
    const grid = {
        "tl": undefined, "tm": undefined, "tr": undefined, 
        "ml": undefined, "mm": undefined, "mr": undefined, 
        "bl": undefined, "bm": undefined, "br": undefined
    };
    const setGrid = ["tl", "tm", "tr", "ml", "mm", "mr", "bl", "bm", "br"]
    for(var i=0; i<7; i=i+3) {
        $('.game-row-' + i).each(function() {
            $(this).html("<div class='col-4'><button class='game-btn " + setGrid[i] +"'></button></div> \
            <div class='col-4'><button class='game-btn " + setGrid[i+1] +"'></button></div> \
            <div class='col-4'><button class='game-btn " + setGrid[i+2] +"'></button></div>")
        })
    }
    $('.game-btn').click(function() {
        var classArray = this.classList;
        classArray = Array.from(classArray);
        if (grid[classArray[1]] === undefined) {
            $(this).html("<p>" + player + "</p>");
            grid[classArray[1]] = player;
            
            // Check for win conditions
            if (checkWinConditions(player)) {
                endGame(true);
                return;
            }
            if (draw()) {
                endGame(false);
                return;
            }
            player = player == 'X' ? 'O' : 'X';
            $('#turn-display').html("Player " + player + "'s Turn");
        }
    });

    function checkWinConditions(currentPlayer) {
        var winConditions = [
            ["tl", "tm", "tr"],
            ["ml", "mm", "mr"],
            ["bl", "bm", "br"],
            ["tl", "ml", "bl"],
            ["tm", "mm", "bm"],
            ["tr", "mr", "br"],
            ["tl", "mm", "br"],
            ["tr", "mm", "bl"]
        ];

        for (var i = 0; i < winConditions.length; i++) {
            var a = winConditions[i][0];
            var b = winConditions[i][1];
            var c = winConditions[i][2];
            if (grid[a] === currentPlayer && grid[b] === currentPlayer && grid[c] === currentPlayer) {
                return true;
            }
        }
        return false;
    }

    function draw() {
        for (var item in grid) {
            if (grid[item] === undefined) {
                return false;
            }
        }
        return true;
    }
    function endGame(Win) {
        if (Win) {
            $('#turn-display').html(player + " Wins!!");
        } else {
            $('#turn-display').html("DRAW");
        }
        $('body').append(
            "<div class='playAgain container d-flex justify-content-center align-items-center' style='height: 15vh;'> \
                <button class='btn btn-primary btn-lg'>Play Again</button> \
            </div>"
        );
        for (var key in grid) {
            grid[key] = "L";
        }
        $(".playAgain button").click(resetGame);
    }

    function resetGame() {
        $(".playAgain").remove();
        $('.game-btn').html('');
        player = "X";
        for (var key in grid) {
            grid[key] = undefined;
        }
        $('#turn-display').html("Player " + player + "'s Turn");
    }
});
