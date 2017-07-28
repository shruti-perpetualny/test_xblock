function TestXBlockEdit(runtime, element) {

   // $(element).find('.save-button').bind('click', function() {
   //      var handlerUrl = runtime.handlerUrl(element, 'studio_submit');

   //      var para = $('.para').val();
   //      var data = {
   //          paragraph: para
   //      };

   //      var test = JSON.stringify(data);

   //      runtime.notify('save', {state: 'start'});
   //      $.post(handlerUrl, JSON.stringify(data)).done(function(response) {
   //          runtime.notify('save', {state:'end'});
   //      });
   //  });

   //  $(element).find('.cancel-button').bind('click', function() {
   //      runtime.notify('cancel', {});
   //  });
    // $('#sel-input').click(function(){
    //   console.log(jQuery().jquery);
    //   console.log($('textarea').selection())
    // alert($('textarea').selection());

    // $('textarea').focus();
    // }); 

    $(element).find('.action-cancel').bind('click', function() {
         runtime.notify('cancel', {});
    });

    $('#save').click(function(){
        var para=$('#para_edit').val();
        $('li#show').show();
        $('li#edit').hide();
        $('#result').text(para);

    });
    $('#edit_para').click(function(){
        var para=$('#para_edit').val();
        $('li#show').hide();
        $('li#edit').show();
        $('#keyword').hide();

    });

    $(element).find('.action-save').bind('click', function() {
        var data = {
            'display_name': $('#edit_display_name').val(),
            'paragraph': $('#para_edit').val()
        };
        
         runtime.notify('save', {state: 'start'});
        
        var handlerUrl = runtime.handlerUrl(element, 'studio_submit');
        $.post(handlerUrl, JSON.stringify(data)).done(function(response) {
            if (response.result === 'success') {
                 runtime.notify('save', {state: 'end'});
                
                // Reload the whole page :
                // window.location.reload(false);
            } else {
                 runtime.notify('error', {msg: response.message})
           
            }
        });
    });

   // $('#send').click(function(){
       
   //      var data = {
   //          'keyword': $('input#key').val(),
   //          'defination': $('input#def').val()
   //      };
        
   //       runtime.notify('save', {state: 'start'});
        
   //      var handlerUrl = runtime.handlerUrl(element, 'studio_send');
        
   //      $.post(handlerUrl, JSON.stringify(data)).done(function(response) {
   //          if (response.result === 'success') {
   //               runtime.notify('save', {state: 'end'});
                
   //              //Reload the whole page :
   //              window.location.reload(false);
   //          } else {
   //              runtime.notify('error', {msg: response.message})
                
   //          }
   //      });        
        
   //  });


   $('#send').click(function(){
       
        var data = {
            'keyword': $('input#key').val(),
            'defination': $('input#def').val()
        };
        runtime.notify('save', {state: 'start'});

        var handlerUrl = runtime.handlerUrl(element, 'studio_send');

         $.ajax({
        type: "POST",
        url: handlerUrl,
        data: JSON.stringify(data),
        dataType: "json",
        success: function(result) {
               runtime.notify('save', {state: 'end'});

        },
        error: function(err) {
            runtime.notify('error', {msg: response.message})
        }
        });
    });

     $('#sel-textarea').click(function(){
      var x= getSelectedTextWithin(document.getElementById('result'));
      if (x == "")
        {
          console.log("plz click on paragraph give below");
        } 
      else {
        $('#def').val("");
        $("#key").val(x);
        $('#keyword').show();
      }      
        
    });


    function getSelectedTextWithin(el) {
    var selectedText = "";
    if (typeof window.getSelection != "undefined") {
        var sel = window.getSelection(), rangeCount;
        if ( (rangeCount = sel.rangeCount) > 0 ) {
            var range = document.createRange();
            for (var i = 0, selRange; i < rangeCount; ++i) {
                range.selectNodeContents(el);
                selRange = sel.getRangeAt(i);
                if (selRange.compareBoundaryPoints(range.START_TO_END, range) == 1 && selRange.compareBoundaryPoints(range.END_TO_START, range) == -1) {
                    if (selRange.compareBoundaryPoints(range.START_TO_START, range) == 1) {
                        range.setStart(selRange.startContainer, selRange.startOffset);
                    }
                    if (selRange.compareBoundaryPoints(range.END_TO_END, range) == -1) {
                        range.setEnd(selRange.endContainer, selRange.endOffset);
                    }
                    selectedText += range.toString();
                }
            }
        }
    } else if (typeof document.selection != "undefined" && document.selection.type == "Text") {
        var selTextRange = document.selection.createRange();
        var textRange = selTextRange.duplicate();
        textRange.moveToElementText(el);
        if (selTextRange.compareEndPoints("EndToStart", textRange) == 1 && selTextRange.compareEndPoints("StartToEnd", textRange) == -1) {
            if (selTextRange.compareEndPoints("StartToStart", textRange) == 1) {
                textRange.setEndPoint("StartToStart", selTextRange);
            }
            if (selTextRange.compareEndPoints("EndToEnd", textRange) == -1) {
                textRange.setEndPoint("EndToEnd", selTextRange);
            }
            selectedText = textRange.text;
        }
    }
    return selectedText;
  }

   


}
