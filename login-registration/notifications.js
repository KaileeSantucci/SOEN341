document.addEventListener("DOMContentLoaded", function () {
    const notificationsContainer = document.getElementById("notifications-container");

    // Example dummy notifications (Replace with real data later)
    const notifications = [
        { message: "You have a new message from Jack.", type: "message" },
        { message: "Jennifer added you as a friend.", type: "friend_request" },
        { message: "Your study session starts in 30 minutes.", type: "reminder" }
    ];

    // Clear loading text
    notificationsContainer.innerHTML = "";

    // Loop through notifications and display them
    notifications.forEach((notif) => {
        const notifElement = document.createElement("div");
        notifElement.classList.add("notification");
        notifElement.textContent = notif.message;
        notificationsContainer.appendChild(notifElement);
    });
});
