$(document).ready(function() {

  $(".delete-link").click(function(e) {
    e.preventDefault();
    console.log("this is the href: " + $(this).attr("href"));
    $.ajax({
      url: $(this).attr("href"),
      method: 'DELETE'
    }).done(function(data) {
      window.location.href="/topics";
    });
  });

  $(".put-form").submit(function(e) {
  e.preventDefault();
  alert("edit attempted");
  if ($("#title")) {
    console.log($("#title"));
    // while(true){
    // }
  }
  $.ajax({
    url: $(this).attr('action'),
    method: 'PUT',
    data: $("#title").serialize()
  }).done(function(data) {
    alert("got to the promise");
    $(this).remove();
    window.location.href="/topics";
    });
  });
});