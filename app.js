const convertions = {
    "A": ["Α", "𝘈"],
    "B": ["Β", "𝐵", "𝘉"],
    "C": ["𝘊"],
    "D": ["𝘋"],
    "E": ["Ε", "𝘌"],
    "F": ["𝘍"],
    "G": ["𝘎"],
    "H": ["Η", "𝘏"],
    "I": ["Ι", "𝘐"],
    "J": ["𝘑"],
    "K": ["Κ", "𝘒"],
    "L": ["𝘓"],
    "M": ["Μ", "𝘔"],
    "N": ["Ν", "𝘕"],
    "O": ["Ο", "𝘖"],
    "P": ["Ρ", "𝘗"],
    "Q": ["𝘘"],
    "R": ["𝘙"],
    "S": ["𝘚"],
    "T": ["Τ", "𝘛"],
    "U": ["∪", "⋃", "𝘜"],
    "V": ["∨", "⋁", "𝘝"],
    "W": ["𝘞"],
    "X": ["Χ", "𝘟"],
    "Y": ["Υ", "𝘠"],
    "Z": ["Ζ", "𝘡"],

    "a": ["𝘢"],
    "b": ["𝘣"],
    "c": ["𝘤"],
    "d": ["𝘥"],
    "e": ["𝘦"],
    "f": ["𝘧"],
    "g": ["𝘨"],
    "h": ["𝘩"],
    "i": ["𝘪"],
    "j": ["𝘫"],
    "k": ["𝘬"],
    "l": ["𝘭"],
    "m": ["𝘮"],
    "n": ["𝘯"],
    "o": ["ο", "ᴏ", "𝘰"],
    "p": ["𝘱"],
    "q": ["𝘲"],
    "r": ["𝘳"],
    "s": ["s", "𝘴"],
    "t": ["t", "𝘵"],
    "u": ["ᴜ", "𝘶"],
    "v": ["ν", "ᴠ", "𝘷"],
    "w": ["ᴡ", "𝘸"],
    "x": ["χ", "x", "𝘹"],
    "y": ["ʏ", "𝘺"],
    "z": ["z", "𝘻"]
}

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getEmpty () {
    return " ‏";
}

function getInput () {
    return document.getElementById("input").value;
}

function copyResultToClipboard () {
    let el = document.getElementById("result");
    el.select();el.setSelectionRange(0, 99999);
    document.execCommand("copy");
    document.getElementById("copy-btn").innerHTML = "Copied!";
    document.getElementById("copy-btn").setAttribute("disabled", "disabled");
    setTimeout(function () {
        document.getElementById("copy-btn").removeAttribute("disabled");
        document.getElementById("copy-btn").innerHTML = "Copy";
    }, 2000);
}

function getRandomItem(arr, _default) {
    if (arr == null) {
        return _default;
    }

    // get random index value
    const randomIndex = Math.floor(Math.random() * arr.length);
    // get random item
    const item = arr[randomIndex];
    // return the random item
    return item;
}

// Coming
function addTrashToText (text) {
    let chunks = text.split(" ");
    return chunks.join(getEmpty());
}

function replaceText (text) {
    let words = text.split(" ");
    let result = [];

    for (let word of words) {
        let output = [];
        for (let char of word) {
            let convert = (randomInteger(1, 3)) == 1;
    
            if (convert) {
                let replacement = getRandomItem(convertions[char], char);
                char = replacement;
            }
    
            output.push(char);
        }

        result.push(output.join(""))
    }

    return result.join(" ");
}

function setResult (text) {
    document.getElementById("result").innerHTML = "Loading...";
    setTimeout(() => {
        document.getElementById("result").innerHTML = text;
    }, 200);
}

function startConvert () {
    let input = getInput();
    let result = replaceText(input);
    setResult(result);
}
