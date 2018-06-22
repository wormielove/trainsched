// A $( document ).ready() block.
$(document).ready(function () {
    $("#tbody").empty();
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
      firstTrainTime: firstTrainTime,
      frequency: frequency,
      
    });
  });
  dataRef.ref().on("child_added", function (childSnapshot) {
    var snap = childSnapshot.val()
   
   var tFirstTrain = childSnapshot.val().firstTrainTime;
   var timeArr = tFirstTrain.split(":");
   var trainTime = moment().hours(timeArr[0]).minutes(timeArr[1]);
   var currentTime = moment();

   var minsAway = currentTime.diff(trainTime, "minutes")
   var freqNum = parseInt(snap.frequency.split(' ')[0])
   console.log(freqNum, typeof freqNum)
   var remainder = minsAway % (freqNum)
   var minsArrival = freqNum - remainder
   var nextArrivalTime = moment().add(minsArrival).format("HH:mm")
   console.log(freqNum - remainder);

   $("tbody").append(
    "<tr><td>" + snap.trainName + 
    "</td><td>" + snap.destination + 
    "</td><td>" + snap.frequency + 
    "</td><td>" + nextArrivalTime + 
    "</td><td>" + minsArrival +
    "</td></tr>"
    );
                      
   
  });

});
