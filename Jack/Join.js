// Get elements
const searchBar = document.getElementById('search-bar');
const channelsList = document.getElementById('channel-list');
const chatMessagesContainer = document.querySelector('.chat-messages');
const messageInput = document.querySelector('.chat-input input');

// To be replaced with real data from Firestore)
const channels = [
    { name: "CS101 Introduction to Computer Science", id: "CS101" },
    { name: "SOEN249 Software Engineering", id: "SOEN249" },
    { name: "MATH220 Discrete Mathematics", id: "MATH220" },
    { name: "ENGR200 Engineering Design", id: "ENGR200" }
];

// Function to populate the channel list
function populateChannelList(channels) {
    // Clear the existing channels
    channelsList.innerHTML = '';

    channels.forEach(channel => {
        const channelDiv = document.createElement('div');
        channelDiv.classList.add('channel');
        channelDiv.setAttribute('data-channel', channel.id);

        const channelSpan = document.createElement('span');
        channelSpan.textContent = channel.name;

        const joinButton = document.createElement('button');
        joinButton.classList.add('join-button');
        joinButton.textContent = 'Join';

        // Joining channel alert
        joinButton.addEventListener('click', function () {
            alert(`Joining channel: ${channel.name}`);
            // Update firestore
        });

        channelDiv.appendChild(channelSpan);
        channelDiv.appendChild(joinButton);
        channelsList.appendChild(channelDiv);
    });
}

// Call the function to populate the channel list initially
populateChannelList(channels);

// Event listener for search bar
searchBar.addEventListener('input', function () {
    const searchQuery = searchBar.value.toLowerCase();
    const filteredChannels = channels.filter(channel => 
        channel.name.toLowerCase().includes(searchQuery)
    );

    // Populate the channel list with filtered results
    populateChannelList(filteredChannels);
});

// Event listener for clicking on a channel
channelsList.addEventListener('click', function (event) {
    const clickedChannel = event.target.closest('.channel');

    if (clickedChannel) {
        const channelName = clickedChannel.querySelector('span').textContent;
        loadMessagesForChannel(channelName);
    }
});

// Function to load messages for the selected channel
function loadMessagesForChannel(channelName) {
    chatMessagesContainer.innerHTML = ''; // Clear existing messages

    // Example messages for the selected channel
    const messages = [
        { sender: 'Professor', text: 'Welcome to the class!', time: '10:00 AM' },
        { sender: 'Student', text: 'Hello everyone!', time: '10:05 AM' }
    ];

    messages.forEach(message => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', 'received');
        messageElement.innerHTML = `
            <div class="message-sender">${message.sender}</div>
            <div class="message-text">${message.text}</div>
            <div class="message-timestamp">${message.time}</div>
        `;
        chatMessagesContainer.appendChild(messageElement);
    });

    // Update chat header to show the current channel
    document.querySelector('.chat-header').textContent = channelName;
}

// Event listener for sending messages
document.querySelector('.send-button').addEventListener('click', function () {
    const messageText = messageInput.value.trim();
    if (messageText !== "") {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', 'sent');
        messageElement.innerHTML = `
            <div class="message-sender">You</div>
            <div class="message-text">${messageText}</div>
        `;
        chatMessagesContainer.appendChild(messageElement);
        messageInput.value = ''; // Clear the input field
    }
});

// Event listener for pressing Enter key to send message
messageInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        document.querySelector('.send-button').click();
    }
});
