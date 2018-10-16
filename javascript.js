var database = firebase.database();

database.ref().on("child_added", function (snapshot) {
    console.log(snapshot.val());
    $("#train-table tbody").append(
        `
            <tr>
                <td>${snapshot.val().train}</td>
                <td>${snapshot.val().destination}</td>
                <td>${snapshot.val().firstTime}</td>
                <td></td>
                <td>${snapshot.val().frequency}</td>
                <td></td>
            </tr>
        `
    );
});

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

});