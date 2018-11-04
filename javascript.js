
$(document).ready(function () {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyBfS0-ska6i0DCYSt1gB9KjG2b1yEmyGyo",
        authDomain: "train-schedule-e12b4.firebaseapp.com",
        databaseURL: "https://train-schedule-e12b4.firebaseio.com",
        projectId: "train-schedule-e12b4",
        storageBucket: "",
        messagingSenderId: "267924499900"
    };
    firebase.initializeApp(config);
    var database = firebase.database();

    database.ref().child('train-schedule-e12b4').on('value', function (snapshot) {
        $('tbody').empty();
    }, function (err) {
        console.log(err);
    });

    database.ref().on("child_added", function (snapshot) {
        console.log(snapshot.val());
        var snap_val = snapshot.val();
        var tName = snap_val.train;
        var dest = snap_val.destination;
        var freq = snap_val.frequency;
        var ftime = snap_val.firstTime;

        var t_remainder = moment().diff(moment.unix(ftime), "minutes") % freq;
        console.log("reminder:" + t_remainder);
        var m = freq - t_remainder;

        $("#train-table").append("<tr>" + "<td>" + tName + "</td>" + "<td>" + dest + "</td>" + "<td>" + freq + "</td>" + "<td>" + ftime + "</td>" + "<td>" + m + "</td>" + "</tr>");
    });

    $("#add-train-btn").on("click", function (event) {
        event.preventDefault();

        var train = $("#train-name-input").val();
        var destination = $("#destination-input").val();
        var firstTime = $("#first-time-input").val();
        var frequency = $("#frequency-input").val();

        $("#train-name-input").val("");
        $("#destination-input").val("");
        $("#first-time-input").val("");
        $("#frequency-input").val("");


        database.ref().push({
            "train": train,
            "destination": destination,
            "firstTime": firstTime,
            "frequency": frequency

        });


        //moment JS
        var tFrequency = frequency;

        //First Train Time
        var start = firstTime;

        // First Time (pushed back 1 year to make sure it comes before current time)
        var firstTimeConverted = moment(start, "HH:mm").subtract(1, "years");
        console.log(firstTimeConverted);

        // Current Time
        var currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

        // Difference between the times
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);

        // Time apart (remainder)
        var tRemainder = diffTime % tFrequency;
        console.log(tRemainder);

        // Minute Until Train
        var tMinutesTillTrain = tFrequency - tRemainder;
        console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

        // Next Train
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

        var arrivalTime = moment(nextTrain).format("hh:mm");
        //append data:
        $("#train-table tbody").append(
            `
    <tr>
        <td>${train}</td>
        <td>${destination}</td>
        <td>${frequency}</td>
        <td>${arrivalTime}</td>
        <td>${tMinutesTillTrain}</td>
        
    </tr>
    `
        );

    });

});