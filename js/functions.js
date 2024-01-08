function initChatBubbles() {
    let i = 0;

    function createChatBubble(className, content) {
        const bubble = document.createElement('div');
        bubble.className = 'chat-bubble ' + className;
        bubble.innerHTML = content;
        return bubble;
    }


    function addChatBubblesToChatBody(domanda = 'Domanda Nuova') {
        const chatBody = document.querySelector('.chat-screen .chat-body');
        const newQuestion = createChatBubble('you', domanda);
        const responseYes = createChatBubble('me', 'Si');
        const responseNo = createChatBubble('me', 'No');
        const loadingBubble = createLoadingBubble();

        chatBody.appendChild(newQuestion);
        chatBody.appendChild(responseYes);
        chatBody.appendChild(responseNo);
        chatBody.appendChild(loadingBubble);


        chatBody.scrollTop = chatBody.scrollHeight;
    }

    addChatBubblesToChatBody("Come ti senti oggi?");

    let meChatBubbles = document.querySelectorAll('.chat-screen .chat-body .chat-bubble.me');
    let lastClickedBubble = null;


    function resetStyles(bubble) {
        bubble.style.background = 'linear-gradient(to right, #FFFFFF, #FFFFFF, #FFFFFF, #FFFFFF, #FFFFFF)';
        bubble.style.color = '#888ea8';
    }

    function showAllBubbles() {
        i--;
        const youChatBubbles = document.querySelectorAll('.chat-screen .chat-body .chat-bubble.you');
        youChatBubbles[youChatBubbles.length - 2].style.display = 'none';

        Array.from(meChatBubbles).slice(-2).forEach(function (otherBubble) {
            otherBubble.style.display = 'none';
        });

        Array.from(meChatBubbles).slice(-2).forEach(function (otherBubble) {
            otherBubble.style.display = 'block';
        });
    }

    function handleBubbleClick(bubble) {
        if (lastClickedBubble === bubble) {
            resetStyles(bubble);
            lastClickedBubble = null;
            bubble.style.display = 'none'
            showAllBubbles(bubble);
        } else {
            if (lastClickedBubble) {
                resetStyles(lastClickedBubble);
            }

            bubble.style.background = '#940425';
            bubble.style.color = 'white';

            const youChatBubbles = document.querySelectorAll('.chat-screen .chat-body .chat-bubble.you');
            const lastYouBubbleMessage = youChatBubbles.length > 1 ? youChatBubbles.item(youChatBubbles.length - 2).innerHTML : null;


            console.log(lastYouBubbleMessage);

            lastClickedBubble = bubble;

            Array.from(meChatBubbles).slice(0, -2).forEach(function (otherBubble) {
                otherBubble.style.cursor = 'auto';
                const clonedElement = otherBubble.cloneNode(true);
                otherBubble.parentNode.replaceChild(clonedElement, otherBubble);
            });


            Array.from(meChatBubbles).slice(-2).filter(function (bubble) {
                return bubble !== lastClickedBubble;
            }).forEach(function (otherBubble) {
                if (otherBubble !== bubble) {
                    otherBubble.style.transition = 'opacity 0.4s';
                    otherBubble.style.opacity = 0;
                    setTimeout(function () {
                        otherBubble.style.display = 'none';
                    }, 500);
                }
            });


            document.querySelectorAll('.chat-screen .chat-body .chat-bubble.you').forEach(function (youBubble) {
                const svgElement = youBubble.querySelector('svg');
                if (svgElement) {
                    youBubble.remove();
                }
            });
            
            i++;
            addChatBubblesToChatBody("Domanda "+ i);
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
                handleBubbleClick(bubble);

            });
        });
    }

    // Initial event listeners setup
    initBubbleListeners();
}

// Initialize chat bubbles
initChatBubbles();