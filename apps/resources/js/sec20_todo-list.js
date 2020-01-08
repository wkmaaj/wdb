if($("body")) {
    console.log("HALLO!");
}

$("ul").on("click", "li", function() {
    $(this).toggleClass("completed");
});

$("ul").on("click", "li>span", function(e) {
    // will fade out the parent element over a period of 1s then call the function to have it removed
    $(this).parent().fadeOut(1000, function() {
        // this refers to the parent and not the child from the line above
        $(this).remove();
    });
    // ref: https://www.tutorialspoint.com/jquery/event-stoppropagation.htm
    e.stopPropagation();
});

$("input[type='text']").keypress(function(e) {
    if(e.which === 13) {
        $("ul").append("<li><span>X</span> " + $(this).val() + "</li>");
        console.log("Added new ToDo: " + $(this).val());
        $(this).val("");
    }
});