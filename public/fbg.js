
window.fbAsyncInit = function() {
  FB.init({
    appId      : '1129771820404590',
    xfbml      : true,
    version    : 'v2.8'
  });
  FB.AppEvents.logPageView();

  FB.getLoginStatus(function(response){
    fbApiInit = true;
    FB.api(
      '/me',  // 10152759836492400
      'GET',
      {"fields":"id,name, friends"},
      function(response) {
        // Insert your code here
        if (response && !response.error) {
          console.log ("success");
          console.log (JSON.stringify(response));
        }
        else {
          console.log ("failure"); 
          console.log (response.error);
        }
      }
    );
  });
};

(function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = "//connect.facebook.net/en_US/sdk.js";
   fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));
 

