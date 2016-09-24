/**
 * Unite Analytics Viz Template
 * @author Kania Azrina | azrina@un.org
 **/

/* Scroll container handler */
// Sets the container div height correctly on page load
$("#scroll-container").height($("body").height());

// Will reset the container div height correctly if window size changes
$(window).resize(function() {
  $("#scroll-container").height($("body").height());
});

/* Tooltip */
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

/* Copy to Clipboard */

function copyTextToClipboard(text) {
  var textArea = document.createElement("textarea");
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();

  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
  } catch (err) {
    console.log('Oops, unable to copy');
  }

  document.body.removeChild(textArea);
}

var copyBtn = document.querySelector("#copyBtn");

copyBtn.addEventListener('click', function(event) {
  copyTextToClipboard('https://unite.un.org/sites/unite.un.org/files/app-budget-v-2-2/index.html#/');
  $('#copyBtn').attr('data-original-title','Link Copied!')
                .tooltip('fixTitle')
                .tooltip('show');
});

/* remove loading animation after loaded */
// IE10+
document.getElementsByTagName( "html" )[0].classList.remove( "loading" );

// All browsers
document.getElementsByTagName( "html" )[0].className.replace( /loading/, "" );

// Or with jQuery
$( "html" ).removeClass( "loading" );