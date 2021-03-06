const convertions = {
    "A": ["ฮ", "๐", "๐ข", "ำ", "ฮ", "ะ"],
    "B": ["ฮ", "๐ต", "๐", "แ", "ะ", "ษ"],
    "C": ["๐", "๐ค", "ฦ", "ศป", "ส", "ฯน"],
    "D": ["๐", "๐ฅ", "ฦ", "ฦ", "ษ", "ษ"],
    "E": ["ฮ", "๐", "โดน", "ษ", "ศจ", "ฦ"],
    "F": ["๐", "๐ง" ,"ำบ", "ฯ", "ฯ", "ฦญ"],
    "G": ["๐", "๐จ", "ษก", "ษ ", "ษข", "ส"],
    "H": ["ฮ", "๐", "๐ฉ", "ฮ", "าค", "ฤค"],
    "I": ["ฮ", "๐", "๐ช", "ศ", "ศ", "ฮ"],
    "J": ["๐", "๐ซ", "วฐ", "ฤด", "ษ", "อฟ"],
    "K": ["ฮ", "๐", "แ", "ฯ", "า", "า"],
    "L": ["๐", "๐ญ", "ศด", "ล", "ฤน", "ฤป"],
    "M": ["ฮ", "๐", "แ", "ฯบ", "ะ", "ำ"],
    "N": ["ฮ", "๐", "ฦ", "๐ฏ", "ล", "ล"],
    "O": ["ฮ", "๐", "ฮฟ", "แด", "๐ฐ", "ี"],
    "P": ["ฮก", "๐", "๐ฑ", "ฦค", "ฦฅ", "ะ "],
    "Q": ["๐", "๐ฒ", "ษ", "ส ", "ิ"],
    "R": ["๐", "๐ณ", "ล", "ฦฆ", "ษ", "ิ"],
    "S": ["๐", "s", "๐ด", "ล", "ฦผ", "ั"],
    "T": ["ฮค", "๐", "t", "๐ต", "ฯฏ", "ะข"],
    "U": ["โช", "โ", "๐", "แด", "๐ถ", "ฮผ"],
    "V": ["โจ", "โ", "๐", "ฮฝ", "แด ", "๐ท"],
    "W": ["๐", "แดก", "๐ธ", "ฦ", "ั", "แฅ"],
    "X": ["ฮง", "๐", "ฯ", "x", "๐น", "ำพ"],
    "Y": ["ฮฅ", "๐ ", "ส", "๐บ", "แ", "แ"],
    "Z": ["ฮ", "๐ก", "z", "๐ป", "ลน", "ลป"],
}

var encodeLevel = 3;

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getEmpty () {
    return " โ";
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
            let convert = (randomInteger(1, 5)) <= encodeLevel;

            if (convert) {
                let replacement = getRandomItem(convertions[char.toUpperCase()], char);
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

function updateEncodeDescription () {
    let str = "";

    if (encodeLevel == 1)
        str = "Soft encoder"

    else if (encodeLevel == 2)
        str = "Basic encoder"

    else if (encodeLevel == 3)
        str = "Normal encoder"

    else if (encodeLevel == 4)
        str = "Hard encoder"

    else
        str = "Extreme encoder"

    document.getElementById("encode-range-description").innerHTML = str + " (" + encodeLevel + ")";
}

window.addEventListener("load", () => {
    const el = document.getElementById("encode-range");
    el.addEventListener("change", (e) => {
        encodeLevel = e.target.value;
        updateEncodeDescription ();
    })
})