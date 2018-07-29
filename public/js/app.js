
$("#login").on("click", function(e){
    e.preventDefault();
    console.log("login clicked");
    
    $.ajax({
        method: "GET",
        url: "/auth/google"

    }).then(function(response){
        console.log(response);
    })

})