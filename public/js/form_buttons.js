var directions = [];

// // when the addStep button is clicked...
// document.getElementById("addStep").onclick = function() {
//     // add the value inside of directions input field to variable text
//     var text = document.getElementById("directions").value;

//     // add text to the end of the directions array
//     directions.push(text);

//     // add it to the list...?
// }




document.getElementById("addStep").onclick = function() {
    var text = document.getElementById("directions").value;
    directions.push(text);
    var li = "<li>" + text + "</li>";
    document.getElementById("stepsAdded").appendChild(li);
}