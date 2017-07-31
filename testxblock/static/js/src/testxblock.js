/* Javascript for TestXBlock. */
function TestXBlock(runtime, element) {

     if(element.innerHTML) element = $(element);

     var handlerUrla = runtime.handlerUrl(element, 'get_keyword_student');
     var data={};

            $.ajax({

                type: "POST",
                url: handlerUrla,
                data: JSON.stringify(data),
                dataType: "json",
                success: updatepara,
                error: function(err) {
                    // alert("Failure!!")
                    console.log(err)
                }
            });
    function updatepara(result) {

        var keywordDictionary = result.keywords;
            $('body p').keywordize({
                dictionary: keywordDictionary
            }, function() {
                $('[title]').popup();
            });
    }
}
