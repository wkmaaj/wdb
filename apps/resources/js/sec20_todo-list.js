if($("body")) {
    console.log("HALLO!");
}
$("li>span").click(function(event) {
    // will fade out the parent element over a period of 1s then call the function to have it removed
    $(this).parent().fadeOut(1000, function() {
        // this refers to the parent and not the child from the line above
        $(this).remove();
    });
    // ref: https://www.tutorialspoint.com/jquery/event-stoppropagation.htm
    event.stopPropagation();
})