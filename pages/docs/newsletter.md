<p>
  Learn how to <a href="/guides/collect-emails-for-newsletter-with-jquery-and-ajax/">build your own signup form</a> with FormBucket.
</p>

<div>
<form id="subscribe"
      method="post"
      action="https://api-dev.formbucket.com/f/buk_antpmkYnKVDkSR6GhjrnW6A2">
  <input type="email"
         name="email"
         placeholder="Enter your email...">
  <button class="g-recaptcha" data-sitekey="6Lfl9kwUAAAAACYvtWvWx-Yux13ptKtBhSMDsx_P" data-callback='onSubmit'>Submit</button>

  <!-- <input type="submit" value="Get the Newsletter" /> -->
  <!-- <div class="g-recaptcha"
    data-sitekey="6Lfl9kwUAAAAACYvtWvWx-Yux13ptKtBhSMDsx_P"
    data-callback="onSubmit"
    data-size="invisible">
  </div> -->
</form>
<script>
function onSubmit(token) {
  $('#subscribe').submit();
}
$(function() {
  $('#subscribe').submit(function(event) {
    event.preventDefault();

    var subscribeForm = $(this);
    var subscribeButton = $('input[type=submit]', subscribeForm);

    if ($("input[name='email']").val() === '') {
      alert('Please enter an email address');
      return;
    }

    $.ajax({
      url: subscribeForm.prop('action'),
      type: 'POST',
      crossDomain: true,
      headers: {
        accept: 'application/javascript'
      },
      data: $('#subscribe').serialize(),
      beforeSend: function() {
        subscribeButton.prop('disabled', 'disabled');
      }
    })
      .done(function(response) {
        // You will do something WAY BETTER than alert
        // because you are an awesome designer.
        alert('Thanks for subscribing!');
      })
      .fail(function(response) {
        alert('Dang, something went wrong!');
        subscribeButton.prop('disabled', false);
      });

});
});
</script>
