var database = firebase.database();

// database.ref().on("child_added", function (snapshot) {
//     console.log(snapshot.val());
// });

$("button").on("click", function (event) {
    event.preventDefault();

    var train = $("#train-name-input").val();
    var destination = $("#destination-input").val();
    var firstTime = $("#first-time-input").val();
    var frequency = $("#frequency-input").val();

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
        <td>${tMinutesTillTrain}</td>
        <td>${arrivalTime}</td>
    </tr>
    `
    );

});

$(document).ready(function () {
    $("#reset-train-btn").click(function () {
        /* Single line Reset function executes on click of Reset Button */
        $("#form")[0].reset();
    });
});