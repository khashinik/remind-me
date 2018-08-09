// var model = require("../models");

var currentUser = JSON.parse(sessionStorage.getItem("cUser"));
console.log("Current User: " + JSON.stringify(currentUser));
var picture = $("<img>");
picture.attr("src", currentUser.photo);
// var name = $("<div>").text(currentUser.uName);
// name.text(" " + currentUser.uName);

$("#inputEmail1").val(currentUser.email);

$("#userinfo").append(picture);
// $("#userinfo").append(name);
$.ajax({
    method: "GET",
    url: "/api/reminders/"+ currentUser.id,

}).then(function(response){
    console.log(JSON.stringify(response));
    var name = $("<div>");
    name.text(response[0].userName);
    $("#userinfo").append(name);
    for (ele in response){
        
    var histDiv = $("#userHist");
    var userRow = $("<div>");
    userRow.text("Created by: " + response[ele].userName);
    var dateCreated = $("<div>");
    dateCreated.text("Date Created: " + response[ele].createdAt);
    var deliverDateDiv = $("<div>");
    deliverDateDiv.text("Delivery Date: " + response[ele].deliveryDate);
    histDiv.append(userRow);
    histDiv.append(dateCreated);
    histDiv.append(deliverDateDiv);

    }


});


$("#subbutt").on("click", function(e){
    e.preventDefault();
    console.log("Sub butt pressed");
    var newReminder={
        deliveryDate: $("#Inputdate").val(),
        deliveryTime: $("#Inputtime").val(),
        message: $("#remindermesage").val(),
        deliveryMethod: 1,
        userName: currentUser.uName,
        userID: currentUser.id
    
    };
    console.log("reminderToSave: " + JSON.stringify(newReminder));
    $.ajax({
        method: "post",
        data: newReminder,
        url: "/api/createreminder"
    }).then(function(response){
        console.log("response: " + JSON.stringify(response));
    });
});