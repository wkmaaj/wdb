if($("body")) {
    console.log("HALLO!");
}
$("li>span").click(function() {
    // $(this).parent().css("display", "none");
    $(this).parent().toggleClass("completed");
})