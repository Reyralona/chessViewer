/* default FEN: rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR */

var FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR"

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

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
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

function clearBoard() {
    for (let i = 0; i < boardConfig.length; i++) {
        if (boardConfig[i] !== "X") {
            let id = document.getElementById(boardConfig[i].slice(1))
            id.innerHTML = ``
        }
    }
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
                id.innerHTML = `<img id="white${type}" src="images/white${type}.png" draggable="false">`
            }
            if (blackPieces.includes(type)) {
                type = type.toUpperCase()
                id.innerHTML = `<img id="black${type}" src="images/black${type}.png" draggable="false">`
            }
        }
    }
}

function resetBoard(){
    clearBoard()
    drawBoard(FEN)
}

async function moveSound(){
    audio = new Audio("sounds/move.mp3")
    await audio.play()
}

async function playGame(fenSequence, speed) {
    for (let i = 0; i < fenSequence.length; i++) {
        await delay(speed)
        clearBoard()
        drawBoard(fenSequence[i])
        moveSound()

    }
}

game = [
    "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1",
    "rnbqkbnr/pppp1ppp/4p3/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2",
    "rnbqkbnr/pppp1ppp/4p3/8/3PP3/8/PPP2PPP/RNBQKBNR b KQkq d3 0 2",
    "rnbqkbnr/ppp2ppp/4p3/3p4/3PP3/8/PPP2PPP/RNBQKBNR w KQkq d6 0 3",
    "rnbqkbnr/ppp2ppp/4p3/3pP3/3P4/8/PPP2PPP/RNBQKBNR b KQkq - 0 3",
    "rnbqkbnr/pp3ppp/4p3/2ppP3/3P4/8/PPP2PPP/RNBQKBNR w KQkq c6 0 4",
    "rnbqkbnr/pp3ppp/4p3/2ppP3/3P4/2P5/PP3PPP/RNBQKBNR b KQkq - 0 4",
    "rnb1kbnr/pp3ppp/1q2p3/2ppP3/3P4/2P5/PP3PPP/RNBQKBNR w KQkq - 1 5",
    "rnb1kbnr/pp3ppp/1q2p3/2ppP3/3P4/2P2N2/PP3PPP/RNBQKB1R b KQkq - 2 5",
    "rn2kbnr/pp1b1ppp/1q2p3/2ppP3/3P4/2P2N2/PP3PPP/RNBQKB1R w KQkq - 3 6",
    "rn2kbnr/pp1b1ppp/1q2p3/2ppP3/3P4/2PB1N2/PP3PPP/RNBQK2R b KQkq - 4 6",
    "rn2kbnr/pp1b1ppp/1q2p3/3pP3/3p4/2PB1N2/PP3PPP/RNBQK2R w KQkq - 0 7",
    "rn2kbnr/pp1b1ppp/1q2p3/3pP3/3p4/2PB1N2/PP3PPP/RNBQ1RK1 b kq - 1 7",
    "r3kbnr/pp1b1ppp/1qn1p3/3pP3/3p4/2PB1N2/PP3PPP/RNBQ1RK1 w kq - 2 8",
    "r3kbnr/pp1b1ppp/1qn1p3/3pP3/3p4/2PB1N2/PP3PPP/RNBQR1K1 b kq - 3 8",
    "r3kb1r/pp1bnppp/1qn1p3/3pP3/3p4/2PB1N2/PP3PPP/RNBQR1K1 w kq - 4 9",
    "r3kb1r/pp1bnppp/1qn1p3/3pP3/3p3P/2PB1N2/PP3PP1/RNBQR1K1 b kq h3 0 9",
    "r3kb1r/1p1bnppp/pqn1p3/3pP3/3p3P/2PB1N2/PP3PP1/RNBQR1K1 w kq - 0 10",
    "r3kb1r/1p1bnppp/pqn1p3/3pP2P/3p4/2PB1N2/PP3PP1/RNBQR1K1 b kq - 0 10",
    "r3kb1r/1p1bnpp1/pqn1p2p/3pP2P/3p4/2PB1N2/PP3PP1/RNBQR1K1 w kq - 0 11",
    "r3kb1r/1p1bnpp1/pqn1p2p/3pP2P/3p4/2PB1N2/PP1N1PP1/R1BQR1K1 b kq - 1 11",
    "r3kb1r/1p1bnpp1/pqn1p2p/3pP2P/8/2pB1N2/PP1N1PP1/R1BQR1K1 w kq - 0 12",
    "r3kb1r/1p1bnpp1/pqn1p2p/3pP2P/8/2PB1N2/P2N1PP1/R1BQR1K1 b kq - 0 12",
    "r3kb1r/1pqbnpp1/p1n1p2p/3pP2P/8/2PB1N2/P2N1PP1/R1BQR1K1 w kq - 1 13",
    "r3kb1r/1pqbnpp1/p1n1p2p/3pP2P/2P5/3B1N2/P2N1PP1/R1BQR1K1 b kq - 0 13",
    "r3kb1r/1pqbnpp1/p3p2p/3pP2P/1nP5/3B1N2/P2N1PP1/R1BQR1K1 w kq - 1 14",
    "r3kb1r/1pqbnpp1/p3p2p/3pP2P/1nP5/5N2/P2N1PP1/R1BQRBK1 b kq - 2 14",
    "r3kb1r/1pqbnpp1/p3p2p/4P2P/1np5/5N2/P2N1PP1/R1BQRBK1 w kq - 0 15",
    "r3kb1r/1pqbnpp1/p3p2p/4P2P/1nN5/5N2/P4PP1/R1BQRBK1 b kq - 0 15",
    "r3kb1r/1pqb1pp1/p3p2p/3nP2P/1nN5/5N2/P4PP1/R1BQRBK1 w kq - 1 16",
    "r3kb1r/1pqb1pp1/p3p2p/3nP2P/1nN5/5N2/PB3PP1/R2QRBK1 b kq - 2 16",
    "r3k2r/1pqb1pp1/p3p2p/2bnP2P/1nN5/5N2/PB3PP1/R2QRBK1 w kq - 3 17",
    "r3k2r/1pqb1pp1/p2Np2p/2bnP2P/1n6/5N2/PB3PP1/R2QRBK1 b kq - 4 17",
    "r4k1r/1pqb1pp1/p2Np2p/2bnP2P/1n6/5N2/PB3PP1/R2QRBK1 w - - 5 18",
    "r4k1r/1pqb1pp1/p2Np2p/2bnP2P/1n6/5N2/PB1Q1PP1/R3RBK1 b - - 6 18",
    "r4k1r/1p1b1pp1/pq1Np2p/2bnP2P/1n6/5N2/PB1Q1PP1/R3RBK1 w - - 7 19",
    "r4k1r/1p1b1pp1/pq1Np2p/2bnP2P/1n6/5N2/PB1Q1PP1/1R2RBK1 b - - 8 19",
    "r4k1r/qp1b1pp1/p2Np2p/2bnP2P/1n6/5N2/PB1Q1PP1/1R2RBK1 w - - 9 20",
    "r4k1r/qp1b1pp1/p2Np2p/2bnP2P/1n1B4/5N2/P2Q1PP1/1R2RBK1 b - - 10 20",
    "r4k1r/qp1b1pp1/p2Np2p/3nP2P/1n1b4/5N2/P2Q1PP1/1R2RBK1 w - - 0 21",
    "r4k1r/qp1b1pp1/p2Np2p/3nP2P/1n1N4/8/P2Q1PP1/1R2RBK1 b - - 0 21",
    "r4k1r/1p1b1pp1/p2Np2p/2qnP2P/1n1N4/8/P2Q1PP1/1R2RBK1 w - - 1 22",
    "r4k1r/1p1b1pp1/p2Np2p/2qnP2P/1n1N4/P7/3Q1PP1/1R2RBK1 b - - 0 22",
    "r4k1r/1p1b1pp1/p1nNp2p/2qnP2P/3N4/P7/3Q1PP1/1R2RBK1 w - - 1 23",
    "r4k1r/1R1b1pp1/p1nNp2p/2qnP2P/3N4/P7/3Q1PP1/4RBK1 b - - 0 23",
    "3r1k1r/1R1b1pp1/p1nNp2p/2qnP2P/3N4/P7/3Q1PP1/4RBK1 w - - 1 24",
    "3r1k1r/1R1b1pp1/p1NNp2p/2qnP2P/8/P7/3Q1PP1/4RBK1 b - - 0 24",
    "3r1k1r/1R3pp1/p1bNp2p/2qnP2P/8/P7/3Q1PP1/4RBK1 w - - 0 25",
    "3r1k1r/1R3pp1/p1bNp2p/2qnP2P/8/P7/3Q1PP1/2R2BK1 b - - 1 25",
    "3r1k1r/1R3pp1/p1bqp2p/3nP2P/8/P7/3Q1PP1/2R2BK1 w - - 0 26",
    "3r1k1r/1R3pp1/p1bPp2p/3n3P/8/P7/3Q1PP1/2R2BK1 b - - 0 26",
    "3r1k1r/1b3pp1/p2Pp2p/3n3P/8/P7/3Q1PP1/2R2BK1 w - - 0 27",
    "3r1k1r/1b3pp1/p2Pp2p/3n3P/8/P7/1Q3PP1/2R2BK1 b - - 1 27",
    "b2r1k1r/5pp1/p2Pp2p/3n3P/8/P7/1Q3PP1/2R2BK1 w - - 2 28",
    "b2r1k1r/5pp1/B2Pp2p/3n3P/8/P7/1Q3PP1/2R3K1 b - - 0 28",
    "b2r2kr/5pp1/B2Pp2p/3n3P/8/P7/1Q3PP1/2R3K1 w - - 1 29",
    "b1Rr2kr/5pp1/B2Pp2p/3n3P/8/P7/1Q3PP1/6K1 b - - 2 29",
    "b1r3kr/5pp1/B2Pp2p/3n3P/8/P7/1Q3PP1/6K1 w - - 0 30",
    "b1B3kr/5pp1/3Pp2p/3n3P/8/P7/1Q3PP1/6K1 b - - 0 30",
    "b1B4r/5ppk/3Pp2p/3n3P/8/P7/1Q3PP1/6K1 w - - 1 31",
    "b1B4r/3P1ppk/4p2p/3n3P/8/P7/1Q3PP1/6K1 b - - 0 31",
    "b1B4r/3P1ppk/4pn1p/7P/8/P7/1Q3PP1/6K1 w - - 1 32",
    "b1B4r/3P1ppk/4pn1p/7P/8/P7/2Q2PP1/6K1 b - - 2 32",
    "2B4r/3P1ppk/4pn1p/7P/4b3/P7/2Q2PP1/6K1 w - - 3 33",
    "2B4r/2QP1ppk/4pn1p/7P/4b3/P7/5PP1/6K1 b - - 4 33",
]

drawBoard(FEN)
