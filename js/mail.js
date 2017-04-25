var request;
$(document).ready(function () {
    var sentOnce = false;
    if (request) {
        request.abort();
    }
    $("#mail-form").on('submit' , function(event){

        if( !sentOnce){
            sentOnce = true;

            $('.after-email-thanks').css({display:'block'}).animate({
                height : 'auto'
            }, 500);

            $('#mail-form .btn').blur();
            if (request) {
                request.abort();
            }
            var $form = $(this);
            var $inputs = $form.find("input, textarea, button");
            var serializedData = $inputs.serialize();

            $inputs.prop("disabled", true);

            request = $.ajax({
                url: ".\\wp-content\\themes\\ocarinastudios\\mail.php",
                type: "post",
                data: serializedData
            });
            request
                .done(function (response, textStatus, jqXHR){
                })
                .fail(function (jqXHR, textStatus, errorThrown){
                    console.error(
                        "The following error occurred: "+
                        textStatus, errorThrown
                    );
                })
                .always(function () {
                    $inputs.prop("disabled", false);
                });
            event.preventDefault();
        }
    });
});


