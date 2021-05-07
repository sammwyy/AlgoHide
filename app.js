const convertions = {
    "A": ["Α", "𝘈", "𝘢", "Ӓ", "Ά", "А"],
    "B": ["Β", "𝐵", "𝘉", "ᛔ", "В", "Ƀ"],
    "C": ["𝘊", "𝘤", "Ƈ", "Ȼ", "ʗ", "Ϲ"],
    "D": ["𝘋", "𝘥", "Ɖ", "Ɗ", "ɗ", "ɖ"],
    "E": ["Ε", "𝘌", "ⴹ", "Ɇ", "Ȩ", "Ɛ"],
    "F": ["𝘍", "𝘧" ,"Ӻ", "Ϝ", "ϝ", "ƭ"],
    "G": ["𝘎", "𝘨", "ɡ", "ɠ", "ɢ", "ʛ"],
    "H": ["Η", "𝘏", "𝘩", "Ή", "Ҥ", "Ĥ"],
    "I": ["Ι", "𝘐", "𝘪", "Ȉ", "Ȋ", "Ί"],
    "J": ["𝘑", "𝘫", "ǰ", "Ĵ", "ɉ", "Ϳ"],
    "K": ["Κ", "𝘒", "ᛕ", "Ϗ", "Ҝ", "Ҟ"],
    "L": ["𝘓", "𝘭", "ȴ", "Ł", "Ĺ", "Ļ"],
    "M": ["Μ", "𝘔", "ᛖ", "Ϻ", "М", "Ӎ"],
    "N": ["Ν", "𝘕", "Ɲ", "𝘯", "Ŋ", "Ņ"],
    "O": ["Ο", "𝘖", "ο", "ᴏ", "𝘰", "Օ"],
    "P": ["Ρ", "𝘗", "𝘱", "Ƥ", "ƥ", "Р"],
    "Q": ["𝘘", "𝘲", "ɋ", "ʠ", "Ԛ"],
    "R": ["𝘙", "𝘳", "Ŗ", "Ʀ", "Ɍ", "Ԅ"],
    "S": ["𝘚", "s", "𝘴", "Ş", "Ƽ", "ѕ"],
    "T": ["Τ", "𝘛", "t", "𝘵", "ϯ", "Т"],
    "U": ["∪", "⋃", "𝘜", "ᴜ", "𝘶", "μ"],
    "V": ["∨", "⋁", "𝘝", "ν", "ᴠ", "𝘷"],
    "W": ["𝘞", "ᴡ", "𝘸", "Ɯ", "ш", "ᥕ"],
    "X": ["Χ", "𝘟", "χ", "x", "𝘹", "Ӿ"],
    "Y": ["Υ", "𝘠", "ʏ", "𝘺", "ᛘ", "Ⴤ"],
    "Z": ["Ζ", "𝘡", "z", "𝘻", "Ź", "Ż"],
}

var encodeLevel = 3;

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