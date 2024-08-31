function exportChat() {
    const chatbox = document.getElementById('chatbox');
    const messages = Array.from(chatbox.children).map(messageElem => ({
        type: messageElem.className.includes('user') ? 'user' : 'bot',
        text: messageElem.textContent
    }));
    
    const blob = new Blob([JSON.stringify(messages, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'chat-history.json';
    a.click();
    URL.revokeObjectURL(url);
}

function importChat(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(event) {
        try {
            const messages = JSON.parse(event.target.result);
            const chatbox = document.getElementById('chatbox');
            chatbox.innerHTML = '';

            messages.forEach(message => {
                const messageElem = document.createElement('div');
                messageElem.className = `message ${message.type}`;
                messageElem.textContent = message.text;
                chatbox.appendChild(messageElem);
            });

            chatbox.scrollTop = chatbox.scrollHeight;
        } catch (error) {
            console.error('Error parsing JSON file:', error);
            alert('Failed to import chat history.');
        }
    };
    reader.readAsText(file);
}

document.getElementById('exportButton').addEventListener('click', exportChat);
document.getElementById('importButton').addEventListener('click', () => document.getElementById('importFile').click());
document.getElementById('importFile').addEventListener('change', importChat);
