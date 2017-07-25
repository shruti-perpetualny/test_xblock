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

    $(element).find('.action-cancel').bind('click', function() {
        runtime.notify('cancel', {});
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
}
