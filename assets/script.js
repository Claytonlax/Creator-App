const test_widget = document.getElementById('test_widget');
const startDate = dayjs().startOf('month').format('YYYY-MM-DD'); 
const endDate = dayjs().endOf('month').format('YYYY-MM-DD');
const currentMonth = dayjs().month();
const options_btn = document.getElementById('options_btn');
const submit = document.getElementById('submit');
const options_container = document.getElementById('options_container');
const user_input_modal = document.getElementById('user_input');
const modal_content = document.getElementById('modal-content');
const placeholder_button = document.getElementById('soon')


//* GLOBALS
var api_storage;

//* Options Buttons
const youtube_btn = document.getElementById('youtube');
const teachable_btn = document.getElementById('teachable');
const reverb_btn = document.getElementById('reverb');

//* Data Structure for local storage
var dataStructure = {
  youtube: {
    widget_name: 'youtubeWidget',
    apiKey: 'AIzaSyCuc2AbssrSaVUQ7-1RvIUgJLXgUpWq7cU',
    channelName: 'film_friends',
    channelId: '',
  },
  teachable: {
    widget_name: 'teachableWidget',
    apiKey: 'B0RD3UreiCuqORd5bau5CKx3MC0s4pTN'
  },
  reverb:{
    widget_name: 'reverbWidget',
    apiKey: '6bface44d1572b16cdd61888bb393cff99142a84dc746d1a01934fd11aefea09'
  }
}

var placeholderDataStructure = {
  youtube: {
    widget_name: 'youtubeWidget',
    apiKey: 'AIzaSyCuc2AbssrSaVUQ7-1RvIUgJLXgUpWq7cU',
    channelName: '',
    channelId: '',
  },
  teachable: {
    widget_name: 'teachableWidget',
    apiKey: ''
  },
  reverb:{
    widget_name: 'reverbWidget',
    apiKey: ''
  }
}

//* App Startup

function main(){
  api_storage = getStorage();
  setStorage(api_storage);
  console.log(api_storage);
}

//check storage for widgets. if they are there. make the widget
function checkStorage(){
  clearWidgets();
  console.log("checking storage...")
  if (api_storage.youtube.channelName !== ''){
    console.log("Youtube credentials found!")
    createYoutubeWidget();
  }
  if (api_storage.teachable.apiKey !== ''){
    console.log("Teachable credentials found!")
    createTeachableWidget();
  }
  if (api_storage.reverb.apiKey !== ''){
    console.log("Reverb credentials found!")
    createReverbWidget();
  }
}


function clearWidgets() {
  test_widget.innerHTML = ''; // clears the widgets out
}



//* Local Storage functions
function getStorage(){
  clearWidgets();
  api_storage = localStorage.getItem('api_storage');
  if (api_storage) {
    api_storage = JSON.parse(api_storage);
    checkStorage();
  } else {
    console.log("No credentials Found")
    api_storage = placeholderDataStructure;
    options_container.removeAttribute("class", "hide")
  }
  return api_storage;
}

function setStorage(api_storage) {
  localStorage.setItem('api_storage', JSON.stringify(api_storage));
}

//* Options Listeners

//? Youtube Options
youtube_btn.addEventListener("click", function(){
  user_input_modal.classList.add('is-active');
  modal_content.innerHTML = '<form id="youtube_form">' +
  '<h1>YouTube</h1>' +
  '<p>Please provide your YouTube channel name.</p>' +
  '<label>Channel Name</label>' +
  '<input id="channel_input" placeholder="Mr.Beast"></input>' +
  '<br/>' +
  '<button type="submit">Submit</button>' +
  '</form>'

  // Add form submission listener to created elements
  var youtubeForm = document.getElementById('youtube_form');
  youtubeForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission from refreshing the page

    // Get the input value from created elements
    var channelInput = document.getElementById('channel_input');
    api_storage.youtube.channelName = channelInput.value;

    // create the widget and set the storage varaibles
    setStorage(api_storage);
    api_storage = getStorage();
    createYoutubeWidget();

    // Close the modal
    user_input_modal.classList.remove('is-active');
    hideOptions();
  });
})

//? Teachable Options
teachable_btn.addEventListener("click", function(){
  user_input_modal.classList.add('is-active');
  modal_content.innerHTML = '<form id="teachable_form">' +
  '<h1>Teachable</h1>' +
  '<p>Please provide your unique Teachable api key.</p>' +
  '<label>Unique API key</label>' +
  '<input id="teachable_api_key" placeholder="74h29183hh48390204845ubBHHDhak"></input>' +
  '<br/>' +
  '<button type="submit">Submit</button>' +
  '</form>';

  // Add form submission listener to created elements
  var teachable_form = document.getElementById('teachable_form');
  teachable_form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission from refreshing the page

    // Get the input value from created elements
    var teachable_api_key = document.getElementById('teachable_api_key');
    api_storage.teachable.apiKey = teachable_api_key.value;

    // create the widget and set the storage varaibles
    setStorage(api_storage);
    api_storage = getStorage();
    createTeachableWidget();

    // Close the modal
    user_input_modal.classList.remove('is-active');
    hideOptions();
  });
})

//? Reverb Options
reverb_btn.addEventListener("click", function(){
  user_input_modal.classList.add('is-active');
  modal_content.innerHTML = '<form id="reverb_form">' +
  '<h1>Reverb</h1>' +
  '<p>Please provide your unique Reverb api key.</p>' +
  '<label>Unique API key</label>' +
  '<input id="reverb_api_key" placeholder="74h29183hh48390204845ubBHHDhak"></input>' +
  '<br/>' +
  '<button type="submit">Submit</button>' +
  '</form>';

  // Add form submission listener to created elements
  var reverb_form = document.getElementById('reverb_form');
  reverb_form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission from refreshing the page

    // Get the input value from created elements
    var reverb_api_key = document.getElementById('reverb_api_key');
    api_storage.reverb.apiKey = reverb_api_key.value;

    // create the widget and set the storage varaibles
    setStorage(api_storage);
    api_storage = getStorage();
    createTeachableWidget();

    // Close the modal
    user_input_modal.classList.remove('is-active');
    hideOptions();
  });
})

placeholder_button.addEventListener("click", function(){
  console.log("You made it to a placeholder")
  user_input_modal.classList.add('is-active');
  modal_content.innerHTML =
  '<h1>COMING SOON</h1>' +
  '<p>This Widget is unablaible at this time due to early development. We hope to have it active for you soon.</p>'

  // Close the modal
})




function showOptions(){
  options_container.removeAttribute("class", "hide");
};

function hideOptions(){
  options_container.classList.add('hide')
};

submit.addEventListener("click", function(){
  hideOptions();
});


options_btn.addEventListener("click", function(){
  showOptions();
});




/*
- if NO local storage, start out on the "Add Widget" page

- check local storage 
- for each index, 
  - Check the name, if the name matches a name of widgets, Fire that custom widget
  - make a widget with title and 3 stats
  - change color of the widget to match the color stated (use actual app reference)

*/

//*** Social Widgets ****/

//! YouTube ////////////////////////
function createYoutubeWidget() {
  var YouTubeNameSearch = 'https://www.googleapis.com/youtube/v3/search?part=id&type=channel&q=' + api_storage.youtube.channelName + '&key=' + api_storage.youtube.apiKey;

  //? convert name to channelID
  fetch(YouTubeNameSearch)
      .then(function (response) {
        return response.json();
      })
      .then(function (data){
      console.log(data)
      api_storage.youtube.channelId = data.items[0].id.channelId;

      var YouTubeData = 'https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=' + api_storage.youtube.channelId + '&key=' + api_storage.youtube.apiKey;
      //? get title, sub count, video count, view count.
      fetch(YouTubeData)
          .then(function (response) {
            return response.json();
          })
          .then(function (data){
            var channelName = data.items[0].snippet.title
            var subscriberCount = data.items[0].statistics.subscriberCount
            var videoCount = data.items[0].statistics.videoCount
            var viewCount = data.items[0].statistics.viewCount

            //? Generate Youtube Widget
            const ytWidget = document.createElement("div");
            ytWidget.setAttribute("class", "widget");
            ytWidget.innerHTML = '<h1>YouTube</h1>' + 
            '<div>Channel Name: ' + channelName + '</div>' +
            '<div>Subscriber Count: '+ subscriberCount + '</div>' +
            '<div>Video Count: '+ videoCount + '</div>' + 
            '<div>View Count: '+ viewCount + '</div>' +
            '<br/>'
            test_widget.appendChild(ytWidget)
      })
  })
}


//! Meta (FB and IG)
//! TikTok 
//! Twitch
//! Snap Chat
//! Patreon


//*** Online Courses Widgets ****/

//! Teachable ///////////////
function createTeachableWidget() {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json', 
      apiKey: `${api_storage.teachable.apiKey}`}
  };
  
  var total_rev;
  
  //? get total rev
  fetch('https://developers.teachable.com/v1/transactions?per=10000', options)
    .then(function (response){
      return response.json();
    })
    .then(function (data) {
      total_rev = 0;
      for (var i in data['transactions']){
          total_rev += data['transactions'][i].revenue
      }
      
      //Move the decimal 
      total_rev = total_rev / 100
      console.log("(Teachable) Total Revenue TD: "+ total_rev)
  
      //? get monthly rev
      fetch('https://developers.teachable.com/v1/transactions?start=' + startDate + '&end=' + endDate, options)
        .then(function (response){
          return response.json();
        })
        .then(function (data){
          var monthly_rev = 0;
          for (var i in data['transactions']){
              monthly_rev += data['transactions'][i].revenue
          }
          
          //Move the decimal 
          monthly_rev = monthly_rev / 100
          console.log("(Teachable) Monthly Revenue: " + monthly_rev)
  
          //? Generate Teachable Widget
          const teachWidget = document.createElement("div");
          teachWidget.setAttribute("class", "widget");
          teachWidget.innerHTML = '<h1>Teachable</h1>' + 
          '<div>Monthly Revenue: $'+ monthly_rev + '</div>' +
          '<div>Total Revenue TD: $'+ total_rev + '</div>' + 
          '<br/>'
  
          test_widget.appendChild(teachWidget)
    })
  })
}


//! Kajabi
//! Skillshare
//! Udemy
//! Thinkific

//*** Music Widgets ****/
//! Spotify
//! Apple Music

//*** E-Commerce Widgets ****/
//! Shopify
//! Wix
//! Squarespace
//! Amazon
//! REVERB
function createReverbWidget(){
  const reverb_api = 'https://api.reverb.com/api/my/payments/selling'

  fetch(reverb_api, {
      method: 'GET',
      headers: {
          'Authorization': `Bearer ${api_storage.reverb.apiKey}`
      }
  }).then(function(response){
      return response.json();
  }).then(function(data){
      var total_rev = 0;
      var monthly_rev = 0;
      for (var i in data.payments) {
          var payment = data.payments[i].amount_item.amount_cents / 100
          total_rev += payment
          var date = data.payments[i].received_at
          var month = dayjs(date).month()
          if (month === currentMonth) {
            monthly_rev += payment
          }
      }
      //? Generate Reverb Widget 
      const teachWidget = document.createElement("div");
      teachWidget.setAttribute("class", "widget");
      teachWidget.innerHTML = '<h1>Reverb</h1>' + 
      '<div>Monthly Revenue: $'+ monthly_rev + '</div>' +
      '<div>Total Revenue TD: $'+ total_rev + '</div>' + 
      '<br/>'
      test_widget.appendChild(teachWidget)

  })
}


//*** Merch Widgets ****/
//! T-Spring
//! Threads
//! UberPrints
//! Vista Print
//! Awesome Merch
//! Captiv8



main();