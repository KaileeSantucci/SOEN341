// Import Firebase modules (Commented Out Until Setup, at which point this will validate realtime messaging)
/*
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, query, where, orderBy, getDocs, onSnapshot } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBnpMA3DvtiztJKAVmcok8lD956VexgzUY",
    authDomain: "soen341-classproject.firebaseapp.com",
    projectId: "soen341-classproject",
    storageBucket: "soen341-classproject.firebasestorage.app",
    messagingSenderId: "843482660549",
    appId: "1:843482660549:web:9baaec54f0434379b5baac",
    measurementId: "G-00WWZTY3BK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
*/
//jsscript for messaging html

// Get elements
const searchBar = document.getElementById('search-bar');
const peopleList = document.getElementById('people-list');
const chatMessagesContainer = document.querySelector('.chat-messages');
const messageInput = document.querySelector('.chat-input input');
const sendButton = document.querySelector('.send-button');
const offlineWarning = document.getElementById('offline-warning');

// Variable to store the current chat user
let currentChatUser = null;

// Event listener for the search bar
searchBar.addEventListener('input', function () {
    const searchQuery = searchBar.value.toLowerCase();
    updatePeopleList(searchQuery);
});

// Function to update the people list based on search query
function updatePeopleList(searchQuery) {
    const people = peopleList.getElementsByClassName('person');
    let foundMatch = false;

    Array.from(people).forEach(person => {
        const personName = person.textContent.toLowerCase();
        
        if (personName.includes(searchQuery)) {
            person.style.display = ''; // Show if it matches
            foundMatch = true;
        } else {
            person.style.display = 'none'; // Hide if it doesn't match
        }
    });

    // Show "No results found" if no match
    const noResultsMessage = document.getElementById("no-results");
    if (!foundMatch && searchQuery) {
        if (!noResultsMessage) {
            const noResults = document.createElement("p");
            noResults.id = "no-results";
            noResults.textContent = "No results found";
            peopleList.appendChild(noResults);
        }
    } else {
        if (noResultsMessage) {
            noResultsMessage.remove();
        }
    }
}

// Event listener for clicking on a person in the list
peopleList.addEventListener('click', function (event) {
    const clickedPerson = event.target.closest('.person');
    if (clickedPerson) {
        const personName = clickedPerson.textContent.trim().split(' ')[1];
        const personUid = clickedPerson.getAttribute('data-user-id');

        currentChatUser = { uid: personUid, name: personName };
        updateChatHeader(personName);
    }
});

// Function to update the chat header with the selected user's name
function updateChatHeader(name) {
    const chatHeader = document.querySelector('.chat-header');
    chatHeader.textContent = `👤 ${name}`;
}

// Listen for online/offline status changes
window.addEventListener("online", () => {
    offlineWarning.style.display = "none"; // Hide offline warning
});

window.addEventListener("offline", () => {
    offlineWarning.style.display = "block"; // Show offline warning
});

// Event listener for the "+" button
const plusIcon = document.getElementById("plus-icon");
plusIcon.addEventListener('click', function () {
    window.location.href = "Join.html";
});

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
