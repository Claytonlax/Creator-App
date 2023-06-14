const test_widget = document.getElementById('test_widget');
const startDate = dayjs().startOf('month').format('YYYY-MM-DD'); 
const endDate = dayjs().endOf('month').format('YYYY-MM-DD');
const currentMonth = dayjs().month();
const options_btn = document.getElementById('options_btn');
const submit = document.getElementById('submit');
const options_container = document.getElementById('options_container')
const user_input_modal = document.getElementById('user_input')
const modal_content = document.getElementById('modal-content')

//* GLOBALS
var youtube_channel_name;

//* Options Buttons
const youtube_btn = document.getElementById('youtube')

//! Local Storage

api_storage = getStorage();
setStorage(api_storage);
console.log(api_storage);


function getStorage(){
  var api_storage = localStorage.getItem('api_storage');
  if (api_storage) {
    api_storage = JSON.parse(api_storage);
  } else {
    api_storage = [];
    options_container.removeAttribute("class", "hide")
  }
  return api_storage;
}

function setStorage(api_storage) {
  localStorage.setItem('api_storage', JSON.stringify(api_storage));
}

//* Options Listeners
youtube_btn.addEventListener("click", function(){
  user_input_modal.classList.add('is-active');
  modal_content.innerHTML = '<form id="youtube_form">' +
  '<label>Channel Name</label>' +
  '<input id="channel_input" placeholder="Mr Beast">' +
  '</input><button type="submit">Submit</button>' +
  '</form>';

  // Add form submission listener
  var youtubeForm = document.getElementById('youtube_form');
  youtubeForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission from refreshing the page

    // Get the input value
    var channelInput = document.getElementById('channel_input');
    youtube_channel_name = channelInput.value;

    // Do something with the channelName value
    console.log('Channel Name:', youtube_channel_name);


    // Close the modal if needed
    user_input_modal.classList.remove('is-active');
  });
})




submit.addEventListener("click", function(){
  options_container.classList.add("hide")
})


options_btn.addEventListener("click", function(){
  options_container.removeAttribute("class", "hide")
})



/* SUDO CODE FOR LOCAL STORAGE 

var dataStructure: [
  {
    widget_name: '',
    widget_color: '',
    stat1: '',
    stat2: '',
    stat3: '',
  },
]

- if NO local storage, start out on the "Add Widget" page

- check local storage 
- for each index, 
  - Check the name, if the name matches a name of widgets, Fire that custom widget
  - make a widget with title and 3 stats
  - change color of the widget to match the color stated (use actual app reference)

*/

//*** Social Widgets ****/




//! YouTube ////////////////////////
const YouTubeAPIKey = 'AIzaSyCuc2AbssrSaVUQ7-1RvIUgJLXgUpWq7cU'; 
var channelId;
var YouTubeNameSearch = 'https://www.googleapis.com/youtube/v3/search?part=id&type=channel&q=' + youtube_channel_name + '&key=' + YouTubeAPIKey;
var YouTubeData = 'https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=' + channelId + '&key=' + YouTubeAPIKey;


//? convert name to channelID
fetch(YouTubeNameSearch)
    .then(function (response) {
        return response.json();
    })
    .then(function (data){
        console.log(data)
        channelId = data.items[0].id.channelId;
        console.log(channelId)

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




//! Meta (FB and IG)
//! TikTok 
//! Twitch
//! Snap Chat
//! Patreon


//*** Online Courses Widgets ****/

//! Teachable ///////////////
const options = {
  method: 'GET',
  headers: {accept: 'application/json', apiKey: 'B0RD3UreiCuqORd5bau5CKx3MC0s4pTN'}
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


        const teachWidget = document.createElement("div");
        teachWidget.setAttribute("class", "widget");
        teachWidget.innerHTML = '<h1>Teachable</h1>' + 
        '<div>Monthly Revenue: $'+ monthly_rev + '</div>' +
        '<div>Total Revenue TD: $'+ total_rev + '</div>' + 
        '<br/>'

        test_widget.appendChild(teachWidget)
  })
})


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
const reverb_api = 'https://api.reverb.com/api/my/payments/selling'


fetch(reverb_api, {
    method: 'GET',
    headers: {
        'Authorization': 'Bearer 6bface44d1572b16cdd61888bb393cff99142a84dc746d1a01934fd11aefea09'
    }
}).then(function(response){
    return response.json();
}).then(function(data){
    console.log(data);
    var total_rev = 0;
    var monthly_rev = 0;
    for (var i in data.payments) {
        var payment = data.payments[i].amount_item.amount_cents / 100
        total_rev += payment
        var date = data.payments[i].received_at
        var month = dayjs(date).month()
        if (month === currentMonth) {
          console.log(payment)
          monthly_rev += payment
        }
    }
    const teachWidget = document.createElement("div");
    teachWidget.setAttribute("class", "widget");
    teachWidget.innerHTML = '<h1>Reverb</h1>' + 
    '<div>Monthly Revenue: $'+ monthly_rev + '</div>' +
    '<div>Total Revenue TD: $'+ total_rev + '</div>' + 
    '<br/>'
    test_widget.appendChild(teachWidget)

    
})

//*** Merch Widgets ****/
//! T-Spring
//! Threads
//! UberPrints
//! Vista Print
//! Awesome Merch
//! Captiv8

