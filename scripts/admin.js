// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getDatabase, ref, set,push, remove, get,child } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js"; // Add this line



// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyCmnhphYClCa7sFcP4j_bFGv3R3_zoWdYI",
  authDomain: "admin-login-93141.firebaseapp.com",
  databaseURL: "https://admin-login-93141-default-rtdb.asia-southeast1.firebasedatabase.app/", // Correct URL
  projectId: "admin-login-93141",
  storageBucket: "admin-login-93141.appspot.com",
  messagingSenderId: "830952828374",
  appId: "1:830952828374:web:19b9cf90114af148b20877"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

const approveBtn = document.getElementById("approve-btn");

// Add Data
approveBtn.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent default form submission

    // Get values from the input fields
    const patientId = document.getElementById('patient-id-input').value.trim();
    const caregiverId = document.getElementById('caregiver-id-input').value.trim();
    const caregiverEmail = document.getElementById('caregiver-email-input').value.trim();

    const dataTable = document.getElementById("data-table").getElementsByTagName('tbody')[0];

    // Validate input fields
    if (!patientId || !caregiverId || !caregiverEmail) {
        alert('All fields are required!');
        return; // Stop further execution
    }

    // Simulate data processing
    console.log('Data is valid. Proceeding with:', {
        patientId,
        caregiverId,
        caregiverEmail
    });

    // Generate unique user ID
    const userId = push(child(ref(database), 'users')).key;

    // Save data to Firebase Realtime Database
    set(ref(database, 'users/' + userId), {
        patientid: patientId,
        caregiverid: caregiverId,
        caregiveremail: caregiverEmail, // Fixed
    })
    .then(() => {
        alert(' Data Saved'); // Success message
    })
    .catch((error) => {
        alert('Error: ' + error.message); // Error handling
    });
});

const readBtn = document.getElementById("view-btn");

// Add event listener for "Read Data" button (Read)
readBtn.addEventListener('click', (e) => {
    e.preventDefault();
    get(ref(database, 'users/'))
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




function renderTable(data) {
    const dataTable = document.getElementById("data-table").getElementsByTagName('tbody')[0];
    dataTable.innerHTML = '';

    for (let userId in data) {
      const user = data[userId];
      const row = dataTable.insertRow();
      const cell1 = row.insertCell(0);
      const cell2 = row.insertCell(1);
      const cell3 = row.insertCell(2);
      const cell4 = row.insertCell(3);

      cell1.textContent = user.patientid;
      cell2.textContent = user.caregiverid;
      cell3.textContent = user.caregiveremail;

      const editBtn = document.createElement('button');
      editBtn.textContent = 'Edit';
      editBtn.className = 'edit-btn';
      editBtn.onclick = () => editRecord(userId, user);

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Delete';
      deleteBtn.className = 'delete-btn';
      deleteBtn.onclick = () => deleteRecord(userId);

      cell4.appendChild(editBtn);
      cell4.appendChild(deleteBtn);
    }
  }




    // Edit Record
    function editRecord(userId, user) {
        document.getElementById("approve-btn").style.display = "none";

        document.getElementById('patient-id-input').value = user.patientid;
        document.getElementById('caregiver-id-input').value = user.caregiverid;
        document.getElementById('caregiver-email-input').value = user.caregiveremail;
  
        const saveBtn = document.createElement('button');
        saveBtn.textContent = 'Save';
        saveBtn.onclick = () => {
          const updatedPatientId = document.getElementById('patient-id-input').value.trim();
          const updatedCaregiverId = document.getElementById('caregiver-id-input').value.trim();
          const updatedCaregiverEmail = document.getElementById('caregiver-email-input').value.trim();
  
          if (!updatedPatientId || !updatedCaregiverId || !updatedCaregiverEmail) {
            alert('All fields are required!');
            return;
          }
  
          set(ref(database, 'users/' + userId), {
            patientid: updatedPatientId,
            caregiverid: updatedCaregiverId,
            caregiveremail: updatedCaregiverEmail,
          })
          .then(() => {
            alert('Record updated successfully');
            document.getElementById("view-btn").click(); // Refresh table
            saveBtn.remove(); // Remove Save button
          })
          .catch((error) => {
            alert('Error updating record: ' + error.message);
          });
        };
  
        document.getElementById('crud-form').appendChild(saveBtn);
      }

      

        // Delete Record
    function deleteRecord(userId) {
        if (confirm('Are you sure you want to delete this record?')) {
          set(ref(database, 'users/' + userId), null)
          .then(() => {
            alert('Record deleted successfully');
            document.getElementById("view-btn").click(); // Refresh table
          })
          .catch((error) => {
            alert('Error deleting record: ' + error.message);
          });
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
    

      const back = document.getElementById('Back-btn');
      back.addEventListener("click", function (event) {
        event.preventDefault();
        const auth = getAuth();
        signOut(auth).then(() => {
            alert("You have been Back.");
            window.location.href = "approve.html"; // or the appropriate redirect URL
        }).catch((error) => {
            alert("Error Back: " + error.message);
        });
        
        

      });
    
 