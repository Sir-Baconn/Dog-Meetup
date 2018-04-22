$(".joinBtn").click(function(){
    console.log($(this).parent().parent().attr('data-meetupsid'));
    var data = {
        'idrequested_meetups': $(this).parent().parent().attr('data-meetupsid'),
        'dogid': $(this).parent().parent().attr('data-dogid')
    };
    $.ajax({
        url: "",
        data: data,
        type: "GET",
        success: function(responseID){
            $("li[data-meetupsid=" + responseID + "]").fadeOut("slow", function(){
                $(this).remove();
            });
        },
        error: console.error
    });
});