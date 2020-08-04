$(".save-note").on("click", function(event){
    event.preventDefault();
    //Taking the notes entered by the user
    let newNotes = {
        title: $("").val().trim(),
        text: $("").val().trim(),
    }
    console.log(newNotes)
});
