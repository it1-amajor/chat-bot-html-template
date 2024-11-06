const firebaseConfig = {
    apiKey: "AIzaSyAtawCQW5dLx-ScTIb3fyRW0n6UimMvhPQ",
    authDomain: "cvtest-b12d0.firebaseapp.com",
    projectId: "cvtest-b12d0",
    storageBucket: "cvtest-b12d0.firebasestorage.app",
    messagingSenderId: "548869568345",
    appId: "1:548869568345:web:146550422c722f49b87e48"
};

const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const todayElement = document.getElementById('today');
const todayDate = new Date();
const formattedDate = todayDate.toLocaleDateString('it-IT');

todayElement.textContent = formattedDate;



// Assuming Firebase is already initialized elsewhere
function saveData(chatContent, newQuestion) {
    // Ensure the chat content is not empty before saving
    if (!chatContent || chatContent.trim() === "") {
        console.error("No chat content to save");
        return;
    }

    // Use the correct database URL as mentioned in the error message
    const dbRef = firebase.app().database("https://cvtest-b12d0-default-rtdb.europe-west1.firebasedatabase.app").ref('compilazioni').push();

    dbRef.set({
        'nominiativo': document.getElementById('nominativo').value,
        'ragione-sociale': document.getElementById('ragione-sociale').value,
        'esito': newQuestion,
        'chatBody': chatContent
    })
        .then(() => {

        })
        .catch(error => {
        });
}



function initChatBubbles() {
    let flowPosition = 0;
    let flowPositionPreview = 0;

    function createChatBubble(className, content) {
        const bubble = document.createElement('div');
        bubble.className = 'chat-bubble ' + className;
        bubble.innerHTML = content;
        return bubble;
    }

    function addChatBubblesToChatBody(domanda = 'Domanda Nuova', isNotFinal = true, emoticon = null, color = null) {
        const chatBody = document.querySelector('.chat-screen .chat-body');

        let newQuestion = createChatBubble('you', domanda);

        // If the chat is final, modify the bubble and save the chat body (text only)
        if (!isNotFinal) {
            newQuestion.innerHTML = "ESITO: <br>" + emoticon + ' ' + domanda;
            newQuestion.style.width = '100%';

            if (color === 'Yellow') {
                newQuestion.style.color = 'Black';
            }
            newQuestion.style.background = color;
        }

        chatBody.appendChild(newQuestion);

        // If not final, add response bubbles and loading animation
        if (isNotFinal) {
            const responseYes = createChatBubble('me', 'Si');
            const responseNo = createChatBubble('me', 'No');
            const loadingBubble = createLoadingBubble();
            chatBody.appendChild(responseYes);
            chatBody.appendChild(responseNo);
            chatBody.appendChild(loadingBubble);
        }
        else{
           let auxText = chatBody.innerText.split("ESITO:");
            const textToSend = auxText[0].slice(0, -6) + lastClickedBubble.innerText + auxText[1];
            saveData(textToSend, domanda);
        }

        // Scroll to the bottom of the chat body
        chatBody.scrollTop = chatBody.scrollHeight;
    }


    addChatBubblesToChatBody(flowChart[flowPosition].domanda);

    let meChatBubbles = document.querySelectorAll('.chat-screen .chat-body .chat-bubble.me');
    let lastClickedBubble = null;


    function resetStyles(bubble) {
        bubble.style.background = ' #FFFFFF';
        bubble.style.color = '#888ea8';
    }

    function showAllBubbles(bubble) {
        bubble.style.display = 'none'
        const youChatBubbles = document.querySelectorAll('.chat-screen .chat-body .chat-bubble.you');
        youChatBubbles[youChatBubbles.length - 2].style.display = 'none';

        Array.from(meChatBubbles).slice(-2).forEach(function (otherBubble) {
            otherBubble.style.display = 'none';
        });

        Array.from(meChatBubbles).slice(-2).forEach(function (otherBubble) {
            otherBubble.style.transition = 'opacity 0.1s';
            otherBubble.style.opacity = 1;
            setTimeout(function () {
                otherBubble.style.display = 'block';
            }, 200);
        });
        flowPosition = flowPositionPreview;
    }

    function handleBubbleClick(bubble) {
        if (lastClickedBubble === bubble) {
            resetStyles(bubble);
            lastClickedBubble = null;
            showAllBubbles(bubble);
        } else {
            if (lastClickedBubble) {
                resetStyles(lastClickedBubble);
            }

            lastClickedBubble = bubble;
            flowPositionPreview = flowPosition;
            flowPosition = flowChart[flowPosition][bubble.innerHTML.trim().toLowerCase()];

            Array.from(meChatBubbles).slice(0, -2).forEach(function (otherBubble) {
                otherBubble.style.cursor = 'auto';
                const clonedElement = otherBubble.cloneNode(true);
                otherBubble.parentNode.replaceChild(clonedElement, otherBubble);
            });


            Array.from(meChatBubbles).slice(-2).filter(function (bubble) {
                return bubble !== lastClickedBubble;
            }).forEach(function (otherBubble) {
                if (otherBubble !== bubble) {
                    otherBubble.style.transition = 'opacity 0.1s';
                    otherBubble.style.opacity = 0;
                    setTimeout(function () {
                        otherBubble.style.display = 'none';
                    }, 200);
                }
            });


            document.querySelectorAll('.chat-screen .chat-body .chat-bubble.you').forEach(function (youBubble) {
                const svgElement = youBubble.querySelector('svg');
                if (svgElement) {
                    youBubble.remove();
                }
            });


            if (flowChart[flowPosition]) {
                addChatBubblesToChatBody(flowChart[flowPosition].domanda);
            }
            else {
                addChatBubblesToChatBody(flowPosition.esito, isNotFinal = false, flowPosition.emoticon, flowPosition.colore);
            }




            // Add event listeners to the new chat bubbles
            initBubbleListeners();
        }
    }


    function createLoadingBubble() {
        const loadingBubble = document.createElement('div');
        loadingBubble.className = 'chat-bubble you';
        loadingBubble.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto;display: block;shape-rendering: auto;width: 43px;height: 20px;" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
            <circle cx="0" cy="44.1678" r="15" fill="#ffffff">
                <animate attributeName="cy" calcMode="spline"
                    keySplines="0 0.5 0.5 1;0.5 0 1 0.5;0.5 0.5 0.5 0.5"
                    repeatCount="indefinite"
                    values="57.5;42.5;57.5;57.5"
                    keyTimes="0;0.3;0.6;1" dur="1s" begin="-0.6s"></animate>
            </circle> <circle cx="45" cy="43.0965" r="15"
                fill="#ffffff">
                <animate attributeName="cy" calcMode="spline"
                    keySplines="0 0.5 0.5 1;0.5 0 1 0.5;0.5 0.5 0.5 0.5"
                    repeatCount="indefinite"
                    values="57.5;42.5;57.5;57.5"
                    keyTimes="0;0.3;0.6;1" dur="1s"
                    begin="-0.39999999999999997s"></animate>
            </circle> <circle cx="90" cy="52.0442" r="15"
                fill="#ffffff">
                <animate attributeName="cy" calcMode="spline"
                    keySplines="0 0.5 0.5 1;0.5 0 1 0.5;0.5 0.5 0.5 0.5"
                    repeatCount="indefinite"
                    values="57.5;42.5;57.5;57.5"
                    keyTimes="0;0.3;0.6;1" dur="1s"
                    begin="-0.19999999999999998s"></animate>
            </circle></svg>`;
        return loadingBubble;
    }

    function initBubbleListeners() {
        meChatBubbles = document.querySelectorAll('.chat-screen .chat-body .chat-bubble.me');
        Array.from(meChatBubbles).slice(-2).forEach(function (bubble) {
            bubble.addEventListener('click', function () {
                const lastYouChatBubble = document.querySelector('.chat-screen .chat-body .chat-bubble.you:last-child');
                if (lastYouChatBubble && !lastYouChatBubble.innerText.includes("Bollino"))
                    handleBubbleClick(bubble);
                else {
                    resetStyles(bubble);
                    bubble.style.cursor = 'auto';
                }
            });
        });
    }

    // Initial event listeners setup
    initBubbleListeners();
}


document.getElementById('myForm').addEventListener('submit', function (event) {
    // Prevent form submission
    event.preventDefault();

    // Clear previous error messages
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(function (message) {
        message.style.display = 'none';
    });

    // Get input values
    const nominativo = document.getElementById('nominativo');
    const ragioneSociale = document.getElementById('ragione-sociale');

    let isValid = true;

    // Validate Nominativo
    if (nominativo.value.trim() === '') {
        isValid = false;
        nominativo.classList.add('is-invalid');
        document.getElementById('nominativoError').style.display = 'block';
    } else {
        nominativo.classList.remove('is-invalid');
    }

    // Validate Ragione Sociale
    if (ragioneSociale.value.trim() === '') {
        isValid = false;
        ragioneSociale.classList.add('is-invalid');
        document.getElementById('ragioneSocialeError').style.display = 'block';
    } else {
        ragioneSociale.classList.remove('is-invalid');
    }

    // If valid, submit the form
    if (isValid) {

        $('.chat-mail').addClass('hide');
        $('.chat-body').removeClass('hide');
        $('.chat-input').removeClass('hide');
        $('.chat-header-option').removeClass('hide');

    }
});

// Initialize chat bubbles
initChatBubbles();