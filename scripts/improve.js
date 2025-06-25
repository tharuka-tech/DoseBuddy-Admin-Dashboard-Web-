// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getDatabase, ref, set, remove, get } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js"; // Add this line


// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyCmnhphYClCa7sFcP4j_bFGv3R3_zoWdYI",
    authDomain: "admin-login-93141.firebaseapp.com",
    databaseURL: "https://admin-login-93141-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "admin-login-93141",
    storageBucket: "admin-login-93141.appspot.com",
    messagingSenderId: "830952828374",
    appId: "1:830952828374:web:19b9cf90114af148b20877"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// DOM Elements
const readBtn = document.getElementById("view-btn");
const dataTable = document.getElementById("data-table").getElementsByTagName('tbody')[0];

// Event Listener for View Data
readBtn.addEventListener('click', (e) => {
    e.preventDefault();

    get(ref(database, 'improvemnt/'))
        .then((snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                renderTable(data);
            } else {
                alert('No data available!');
            }
        })
        .catch((error) => {
            alert('Error reading data: ' + error.message);
        });
});

// Render Table Function
function renderTable(data) {
    dataTable.innerHTML = ''; // Clear existing rows

    for (let userId in data) {
        const user = data[userId];
        const row = dataTable.insertRow();
        row.insertCell(0).textContent = user.patientid;
        row.insertCell(1).textContent = user.caregiverid;
        row.insertCell(2).textContent = user.caregiveremail;

        // Approve Button
        const approveBtn = document.createElement('button');
        approveBtn.textContent = 'Approve';
        approveBtn.className = 'approve-btn';
        approveBtn.onclick = () => approveRecord(userId, user);

        // Delete Button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Cansel';
        deleteBtn.className = 'delete-btn';
        deleteBtn.onclick = () => deleteRecord(userId);

        const actionsCell = row.insertCell(3);
        actionsCell.appendChild(approveBtn);
        actionsCell.appendChild(deleteBtn);
    }
}

// Approve Record Function
function approveRecord(userId, user) {
    if (confirm('Are you sure you want to approve this record?')) {
        const approvedRef = ref(database, 'users/' + userId);
        const originalRef = ref(database, 'improvemnt/' + userId);

        set(approvedRef, user) // Copy data to "approved"
            .then(() => remove(originalRef)) // Delete from "improvemnt"
            .then(() => {
                alert('Record approved successfully!');
                readBtn.click(); // Refresh table
            })
            .catch((error) => alert('Error approving record: ' + error.message));
    }
}

// cansel Record Function
function deleteRecord(userId) {
    if (confirm('Are you sure you want to cansel this record?')) {
        const recordRef = ref(database, 'improvemnt/' + userId);
        remove(recordRef)
            .then(() => {
                alert('Record cansel successfully!');
                readBtn.click(); // Refresh table
            })
            .catch((error) => alert('Error deleting record: ' + error.message));
    }
}



      const logout = document.getElementById('logout-btn');
      logout.addEventListener("click", function (event) {
        event.preventDefault();
        const auth = getAuth();
        signOut(auth).then(() => {
            alert("You have been logged out.");
            window.location.href = "index.html"; // or the appropriate redirect URL
        }).catch((error) => {
            alert("Error signing out: " + error.message);
        });
        
        

      });



      const approvedash = document.getElementById('approve-Dashboard');
      approvedash.addEventListener("click", function (event) {
        event.preventDefault();
        const auth = getAuth();
        signOut(auth).then(() => {
            alert("You have approve Dashboard.");
            window.location.href = "Dashboard.html"; // or the appropriate redirect URL
        }).catch((error) => {
            alert("Error Dashboard out: " + error.message);
        });
        
        

      });