// A $( document ).ready() block.
$(document).ready(function () {
  console.log("ready!");


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAxARraYn2o3Vtf6keE0x96v_49-0RJZlE",
    authDomain: "train-sched-1a038.firebaseapp.com",
    databaseURL: "https://train-sched-1a038.firebaseio.com",
    projectId: "train-sched-1a038",
    storageBucket: "train-sched-1a038.appspot.com",
    messagingSenderId: "258312501679"
  };
  firebase.initializeApp(config);

  var dataRef = firebase.database();

  // Initial Values
  var trainName = "";
  var destination = "";
  var firstTrainTime = 0;
  var frequency = "";

  // Capture Button Click
  $("#submit").on("click", function (event) {
    event.preventDefault();
    console.log("button was clicked")

    // YOUR TASK!!!
    // Code in the logic for storing and retrieving the most recent user.
    // Don't forget to provide initial data to your Firebase database.
    trainName = $("#trainName-input").val().trim();
    destination = $("#destination-input").val().trim();
    firstTrainTime = $("#firstTrainTime-input").val().trim();
    frequency = $("#frequency-input").val().trim();

    console.log(trainName);
    console.log(destination);
    console.log(firstTrainTime);
    console.log(frequency);

    // Code for the push
    dataRef.ref().push({

      trainName: trainName,
      destination: destination,
      firsttraintime: firstTrainTime,
      frequency: frequency,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
  });
  dataRef.ref().on("child_added", function (childSnapshot) {
    $("tbody").append("<tr><td>" + childSnapshot.val().trainName + "</td><td>" + childSnapshot.val().destination + "</td><td>" + childSnapshot.val().firstTrainTime + "</td><td>" + childSnapshot.val().frequency + "</td></tr>");
  });


});

// {/* <tr>
//                     <th id="tn1" scope="row"></th>
//                     <td id="dstn1"></td>
//                     <td id="freq1"></td>
//                     <td id="na1"></td>
//                     <td id="mq1"></td>
//                 </tr> */}