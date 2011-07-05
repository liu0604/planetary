
var $ = jQuery;

$(function() {
      
      var imgDir = Drupal.extraInfo.root + 'sites/all/modules/local_comments/images/';
      
      infoBar
         .data
         .com
         .menu
         .add( menuItem( 'Create a new local thread', imgDir+'icon_comment.png' ), 
            function(e){
//		         var selectedClass = 'discussion-selected';
		         
		         var id         = infoBar.data.com.menu.menu().data('source').attr('id');
		         var textfield  = CKEDITOR ? $(CKEDITOR.instances['edit-comment-body-und-0-value'].document.getBody().$) : $('#edit-comment-body-und-0-value');
		         
//		         $('#comments .'+selectedClass).removeClass( selectedClass );
//		         $('.discussion-for-'+id.replace(/\./g, '\\.')).addClass( selectedClass );
		         
               $('input[name="eid"]').val( id );
               
               textfield.focus();
               $.scrollTo({
                     top   : $('#comment-body-add-more-wrapper').offset().top - 200, 
                     left  : $('#comment-body-add-more-wrapper').offset().left - 50
                  },
                  1500
               )
		      }, 
		      'local_comments_add'
         )
         .add( 
            menuItem( 'View local threads for this item', imgDir+'icon_comments.png' ),
            function(e){
               e.preventDefault();
               window.location = '/local_comments/showthread/' + GI('nodeId') + '/' + infoBar.data.com.menu.menu().data('source').attr('id');
            }, 
            'local_comments_view'
         );
                  
      infoBar
         .setTokenType(
            'localComment', {
               img   : imgDir+'sIcon_comments.png',
               msg   : 'View items with local comments attached'
      });
      
       $("a.local_comments").click(function(e){
          var href = e.target.href;
          if (href) {
            e.preventDefault();
            href = href.slice( href.lastIndexOf('/')+1 );
            var comment = $('#'+href.replace(/\./g, '\\.'));
            $.scrollTo({top:comment.offset().top - 200, left:comment.offset().left}, 1500);
            comment.glow('#FFFF99', 5000);
          }
      });
      
	   function menuItem( title, path, attributes ){
	      attributes = attributes || {};
		   return $(document.createElement('a'))
					   .attr({
						   'href'	: 'javascript:void(0)',
						   'class'	: infoBar.data.cls.popItem,
						   'title'	: title
					   })
					   .attr( attributes )
					   .append( 
						   $(document.createElement('img'))
							   .attr({
							      src   : path,
							      alt   : title
							   }) 
					   );
	   }

   function GI( name ){
      var wrapper = 'tInfoBar_info';
      var prefix  = 'info_';
      return $('#'+wrapper).find('#'+prefix+name).html();
   }

});
