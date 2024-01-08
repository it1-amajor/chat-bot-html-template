document.addEventListener('DOMContentLoaded', function () {
    const meChatBubbles = document.querySelectorAll('.chat-screen .chat-body .chat-bubble.me');
    const lastTwoBubbles = Array.from(meChatBubbles).slice(-2);
    let lastClickedBubble = null;

    function resetStyles(bubble) {
        bubble.style.background = 'linear-gradient(to right, #FFFFFF, #FFFFFF, #FFFFFF, #FFFFFF, #FFFFFF)';
        bubble.style.color = '#888ea8';
    }

    function showAllBubbles() {
        meChatBubbles.forEach(function (bubble) {
            bubble.style.transition = 'opacity 0.8s';
            bubble.style.opacity = 1;
            bubble.style.display = 'table';
        });
    }

    lastTwoBubbles.forEach(function (bubble) {
        bubble.addEventListener('click', function () {
            // Check if the clicked bubble is the same as the last clicked one
            if (lastClickedBubble === bubble) {
                resetStyles(bubble);
                lastClickedBubble = null;
                showAllBubbles();
            } else {
                // If it's a different bubble, undo the operation for the last clicked bubble (if any)
                if (lastClickedBubble) {
                    resetStyles(lastClickedBubble);
                }

                // Apply styles to the clicked chat bubble
                bubble.style.background = '#940425';
                bubble.style.color = 'white';

                // Update the last clicked bubble
                lastClickedBubble = bubble;

                // Hide other chat bubbles with fade-out animation
                lastTwoBubbles.forEach(function (otherBubble) {
                    if (otherBubble !== bubble) {
                        otherBubble.style.transition = 'opacity 0.8s';
                        otherBubble.style.opacity = 0;
                        setTimeout(function () {
                            otherBubble.style.display = 'none';
                        }, 500);
                    }
                });
            }
        });

        bubble.addEventListener('mouseenter', function () {
            // Change cursor to hand on hover
            bubble.style.cursor = 'pointer';
        });

        bubble.addEventListener('mouseleave', function () {
            // Reset cursor on leave
            bubble.style.cursor = 'auto';
        });
    });
});
