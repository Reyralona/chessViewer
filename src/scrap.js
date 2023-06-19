
/* default FEN: rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR */

var FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR"
var emptyFEN = "8/8/8/8/8/8/8/8"
var blackPieces = ["r", "n", "b", "q", "k", "p"]
var whitePieces = ["R", "N", "B", "Q", "K", "P"]
var digits = ["1", "2", "3", "4", "5", "6", "7", "8"]
var boardPositions = [
    "a8", "b8", "c8", "d8", "e8", "f8", "g8", "h8",
    "a7", "b7", "c7", "d7", "e7", "f7", "g7", "h7",
    "a6", "b6", "c6", "d6", "e6", "f6", "g6", "h6",
    "a5", "b5", "c5", "d5", "e5", "f5", "g5", "h5",
    "a4", "b4", "c4", "d4", "e4", "f4", "g4", "h4",
    "a3", "b3", "c3", "d3", "e3", "f3", "g3", "h3",
    "a2", "b2", "c2", "d2", "e2", "f2", "g2", "h2",
    "a1", "b1", "c1", "d1", "e1", "f1", "g1", "h1"]

var game = "1. e4 e6 2. d4 d5 3. e5 c5 4. c3 Qb6 5. Nf3 Bd7 6. Bd3 cxd4 7. O-O Nc6 8. Re1 \
Nge7 9. h4 a6 10. h5 h6 11. Nbd2 dxc3 12. bxc3 Qc7 13. c4 Nb4 14. Bf1 dxc4 15. \
Nxc4 Ned5 16. Bb2 Bc5 17. Nd6+ Kf8 18. Qd2 Qb6 19. Rab1 Qa7 20. Bd4 Bxd4 21. \
Nxd4 Qc5 22. a3 Nc6 23. Rxb7 Rd8 24. Nxc6 Bxc6 25. Rc1 Qxd6 26. exd6 Bxb7 27. \
Qb2 Ba8 28. Bxa6 Kg8 29. Rc8 Rxc8 30. Bxc8 Kh7 31. d7 Nf6 32. Qc2+ Be4 33. Qc7 "

var pieceNames = new Map()
pieceNames.set("K", ["king", "k"])
pieceNames.set("B", ["bishop", "b"])
pieceNames.set("N", ["knight", "n"])
pieceNames.set("Q", ["queen", "q"])
pieceNames.set("R", ["rook", "r"])
pieceNames.set("P", ["Pawn", "p"])

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

function setCharAt(str, index, chr) {
    if (index > str.length - 1) return str;
    return str.substring(0, index) + chr + str.substring(index + 1);
}

function isLetter(c) {
    return c.toLowerCase() != c.toUpperCase();
}

function formatFen(str) {
    let f = str
    for (let i = 0; i < str.length; i++) {
        if (digits.includes(str[i])) {
            index = digits.indexOf(str[i])
            f = f.replace(str[i], "X".repeat(index + 1))
        }
        if (str[i] == "/") {
            f = f.replace(str[i], "")
        }
    }
    return f
}

function boardSet(fen) {
    out = []
    for (let i = 0; i < 64; i++) {
        if (fen[i] == "X") {
            out.push("X")
        }
        if (blackPieces.includes(fen[i])) {
            out.push(fen[i] + boardPositions[i])
        }
        if (whitePieces.includes(fen[i])) {
            out.push(fen[i] + boardPositions[i])
        }

    }
    return out
}

function drawBoard(fen) {
    boardConfig = boardSet(formatFen(fen))
    for (let i = 0; i < boardConfig.length; i++) {
        if (boardConfig[i] !== "X") {
            let id = document.getElementById(boardConfig[i].slice(1))
            let type = boardConfig[i][0]
            if (whitePieces.includes(type)) {
                id.innerHTML = `<img id="white${type}" src="images/white${type}.png">`
            }
            if (blackPieces.includes(type)) {
                type = type.toUpperCase()
                id.innerHTML = `<img id="black${type}" src="images/black${type}.png">`
            }
        }
    }
}

function gameArray(moveset) {
    moveset = moveset.split(" ")
    let out = []
    for (let i = 0; i < moveset.length; i++) {
        // let moveIndex = moveset[i].replace(".", "")
        let whiteMove = ["white", moveset[i + 1].replace("+", "").replace("x", "")]
        let blackMove = ["black", moveset[i + 2].replace("+", "").replace("x", "")]
        out.push([whiteMove, blackMove])
        i = i + 2
    }

    return out
}

function getMove(move) {
    let moveColor = move[0]
    let movePiece = move[1][0]

    if (movePiece !== undefined) {

        if (move[1].length === 4) {
            if (pieceNames.has(movePiece)) {
                return ([moveColor, pieceNames.get(movePiece)[0], "to", move[1].slice(2, 4)])
            }
        } else {
            if (isLetter(movePiece) && digits.includes(move[1][1])) {
                return ([moveColor, "pawn to", move[1]])
            }
            if (movePiece === movePiece.toLowerCase() && isLetter(move[1][1]) && digits.includes(move[1][2])) {
                return ([moveColor, "pawn to", move[1].slice(1, 3)])
            }
            if (pieceNames.has(movePiece)) {
                return ([moveColor, pieceNames.get(movePiece)[0], "to", move[1].slice(1, 3)])
            }
            if (move[1] === "O-O") {
                return ([moveColor, "castles king-side"])
            }
            if (move[1] === "O-O-O") {
                return ([moveColor, "castles queen-side"])
            }
        }
    }
}

// move : Nb1 - Nc3 (knight b1 to knight b3)
function UpdateBoard(move) {
    outFen = FEN
    for (let i = 0; i < FEN.length; i++) {
        if (move[i] !== "X") {
            outFen[i] = move[i]   
        }
    }
    return outFen
}

async function playGame(game, speed) {
    game = gameArray(game)
    for (let i = 0; i < game.length; i++) {

        FEN = UpdateBoard(moveToFen(getMove(game[i][0])))
        drawBoard(FEN)
        await delay(speed)


        FEN = UpdateBoard(moveToFen(getMove(game[i][1])))
        drawBoard(FEN)
        await delay(speed)

    }

}

function moveToFen(move) {
    let outFen = formatFen(emptyFEN)
    if (move !== undefined) {
        let coor = boardPositions.indexOf(move[move.length - 1])
        let piece = pieceNames.get(move[1][0].toUpperCase())

        if (move[0] === "white") {
            if (piece !== undefined) {
                outFen = setCharAt(outFen, coor, piece[1].toUpperCase())
            }
            else if (move[1] == "castles king-side") {
                outFen = setCharAt(outFen, 62, "K")
                outFen = setCharAt(outFen, 61, "R")
            }
            else if (move[1] == "castles queen-side") {
                outFen = setCharAt(outFen, 58, "K")
                outFen = setCharAt(outFen, 59, "R")
            }
        }
        if (move[0] === "black") {
            if (piece !== undefined) {
                outFen = setCharAt(outFen, coor, piece[1].toLowerCase())
            }
            else if (move[1] == "castles king-side") {
                outFen = setCharAt(outFen, 6, "k")
                outFen = setCharAt(outFen, 5, "r")
            }
            else if (move[1] == "castles queen-side") {
                outFen = setCharAt(outFen, 2, "k")
                outFen = setCharAt(outFen, 3, "r")
            }
        }
        return outFen
    }

}

FEN = formatFen(FEN)
drawBoard(FEN)
playGame(game, 100)