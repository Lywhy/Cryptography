const message = document.querySelector('#message')
const key = document.querySelector('#key')
const result = document.querySelector('#result')
const keyword = document.querySelector('#keyword')

function updateResult(res){
    result.value = res
}

function encryptor(){
    switch (key.value) {
        case 'caesar':         
            let text = message.value;
            let encryptedText = '';
            let step = +keyword.value
            console.log(step);
            if(!isNaN(step) && step > 0 && step < 26){
                for (let i = 0; i < text.length; i++) {
                    const char = text[i];
                    if (char === ' ') {
                        encryptedText += ' ';
                        continue;
                    }
                    let charCode = char.charCodeAt(0);
                    if (char >= 'A' && char <= 'Z') {
                        charCode = ((charCode - 65 + step) % 26) + 65;
                    } else if (char >= 'a' && char <= 'z') {
                        charCode = ((charCode - 97 + step) % 26) + 97;
                    }
                    encryptedText += String.fromCharCode(charCode);
                }
            } else{
                alert('Invalid step!')
                keyword.value = ''
            }
            updateResult(encryptedText);
            break;
        
        case 'vigenera':
            let vigenereText = message.value;
            let vigenereEncryptedText = '';
            let vigenereKeyword = keyword.value;
            vigenereText = vigenereText.toLowerCase();
            vigenereKeyword = vigenereKeyword.toLowerCase();
            if(isNaN(+vigenereKeyword) && vigenereKeyword.length > 0){
                for (let i = 0; i < vigenereText.length; i++) {
                    const plainCharCode = vigenereText.charCodeAt(i);
                    const keyCharCode = vigenereKeyword.charCodeAt(i % vigenereKeyword.length);
                    let encryptedCharCode;
                    if (plainCharCode >= 97 && plainCharCode <= 122) {
                        encryptedCharCode = (plainCharCode + keyCharCode - 194) % 26 + 97;
                    } else {
                        encryptedCharCode = plainCharCode;
                    }
                    vigenereEncryptedText += String.fromCharCode(encryptedCharCode);
                }
            } else{
                alert('Invalid keyword!')
                keyword.value = ''
            }
            updateResult(vigenereEncryptedText);
            break;
        
        case 'morse':
            const morseCode = {
                'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.', 'G': '--.', 'H': '....',
                'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---', 'P': '.--.',
                'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
                'Y': '-.--', 'Z': '--..',
                '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....',
                '6': '-....', '7': '--...', '8': '---..', '9': '----.', '0': '-----',
                ' ': ' ' 
            };
            let morseText = message.value;
            let morseEncryptedText = morseText.toUpperCase().split('').map(char => morseCode[char] || '').join(' ');
            updateResult(morseEncryptedText);
            break;

        case 'keysub':
            let keysubText = message.value.toUpperCase();
            const uniqueChars = Array.from(new Set(keyword.value));
            let keysubKeyword = uniqueChars.join('').toUpperCase();
            let keysubEncryptedMessage = "";

            for (let i = 0; i < keysubText.length; i++) {
                const char = keysubText[i];
                const charIndex = keysubKeyword.indexOf(char);
                if (charIndex !== -1) {
                    keysubEncryptedMessage += keysubKeyword[(charIndex + 3) % keysubKeyword.length];
                } else {
                    keysubEncryptedMessage += char;
                }
            }
            keyword.value = keysubKeyword
            updateResult(keysubEncryptedMessage);
            break;
            
        default:
            alert('Invalid key!')
            break;
    }
}

function decryptor(){
    switch (key.value) {
        case 'caesar':
            let encryptedMessage = message.value;
            let decryptedText = '';
            let step = +keyword.value
            if(!isNaN(step) && step > 0 && step < 26){
                for (let i = 0; i < encryptedMessage.length; i++) {
                    const char = encryptedMessage[i];
                    if (char === ' ') {
                        decryptedText += ' ';
                        continue;
                    }
                    let charCode = char.charCodeAt(0);
                    if (char >= 'A' && char <= 'Z') {
                        charCode = ((charCode - 65 + (26-step)) % 26) + 65;
                    } else if (char >= 'a' && char <= 'z') {
                        charCode = ((charCode - 97 + (26-step)) % 26) + 97;
                    }
                    decryptedText += String.fromCharCode(charCode);
                }
            } else {
                alert('Invalid step!')
                keyword.value = ''
            }
            updateResult(decryptedText);
            break;
        
            case 'vigenera':
                let vigenereEncryptedText = message.value;
                let vigenereDecryptedText = '';
                let vigenereKeyword = keyword.value;
                vigenereEncryptedText = vigenereEncryptedText.toLowerCase();
                vigenereKeyword = vigenereKeyword.toLowerCase();
                if(isNaN(+vigenereKeyword) && vigenereKeyword.length > 0){
                    for (let i = 0; i < vigenereEncryptedText.length; i++) {
                        const encryptedCharCode = vigenereEncryptedText.charCodeAt(i);
                        const keyCharCode = vigenereKeyword.charCodeAt(i % vigenereKeyword.length);
                        let decryptedCharCode;
                        
                        if (encryptedCharCode >= 97 && encryptedCharCode <= 122) {
                            decryptedCharCode = (encryptedCharCode - keyCharCode + 26) % 26 + 97;
                        } else {
                            decryptedCharCode = encryptedCharCode;
                        }
                        vigenereDecryptedText += String.fromCharCode(decryptedCharCode);
                    }
                } else{
                    alert('Invalid keyword!')
                    keyword.value = ''
                }
                updateResult(vigenereDecryptedText);
                break;

            case 'morse':
                const morseCode = {
                    '.-': 'A', '-...': 'B', '-.-.': 'C', '-..': 'D', '.': 'E', '..-.': 'F', '--.': 'G', '....': 'H',
                    '..': 'I', '.---': 'J', '-.-': 'K', '.-..': 'L', '--': 'M', '-.': 'N', '---': 'O', '.--.': 'P',
                    '--.-': 'Q', '.-.': 'R', '...': 'S', '-': 'T', '..-': 'U', '...-': 'V', '.--': 'W', '-..-': 'X',
                    '-.--': 'Y', '--..': 'Z',
                    '.----': '1', '..---': '2', '...--': '3', '....-': '4', '.....': '5',
                    '-....': '6', '--...': '7', '---..': '8', '----.': '9', '-----': '0',
                    ' ': ' '
                  };
                  let morseEncryptedText = message.value;
                  let morseDecryptedText = morseEncryptedText.toUpperCase().split(' ').map(code => morseCode[code] || '').join('');
                  updateResult(morseDecryptedText);
                  break;

            case 'keysub':
                let keysubEncryptedText = message.value.toUpperCase();
                const uniqueChars = Array.from(new Set(keyword.value));
                let keysubKeyword = uniqueChars.join('').toUpperCase();
                let keysubDecryptedMessage = "";
                for (let i = 0; i < keysubEncryptedText.length; i++) {
                    const char = keysubEncryptedText[i];
                    const charIndex = keysubKeyword.indexOf(char);
                    if (charIndex !== -1) {
                        keysubDecryptedMessage += keysubKeyword[(charIndex - 3 + keysubKeyword.length) % keysubKeyword.length];
                    } else {
                        keysubDecryptedMessage += char;
                    }
                }
                keyword.value = keysubKeyword
                updateResult(keysubDecryptedMessage);
                break;
    
        default:
            alert('Invalid key!')
            break;
    }
}

function checkData(){
    if(message.value === ''){
        alert('Fill message.')
        return false
    } else {
        return true
    }
}

let intervalId;
let elapsedTime = 0;
function startInterval() {
  intervalId = setInterval(() => {
    elapsedTime += 1000;
    const inputValue = key.value.trim().toLowerCase();
    if (elapsedTime >= 15000 || inputValue === 'stop') {
      clearInterval(intervalId);
    } else if (inputValue === 'caesar'){
        keyword.placeholder = 'Step example: 1...25'
    } else if (inputValue === 'vigenera'){
        keyword.placeholder = 'Key example: slime'
    } else if (inputValue === 'morse'){
        keyword.placeholder = ''
    } else if (inputValue === 'keysub'){
        keyword.placeholder = 'Key: a-Z length=26 and unique chars'
    } else{
        keyword.placeholder = ''
    }
  }, 1000);
}
startInterval();

document.querySelector('#encrypt').addEventListener('click',()=>{
    if(checkData()){
        encryptor()
    }
})

document.querySelector('#decrypt').addEventListener('click',()=>{
    if(checkData()){
        decryptor()
    }
})