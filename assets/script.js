const test_widget = document.getElementById('test_widget');


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
const channelName = 'film_friends'
var channelId = 'UCgeSDwPH-6ttgxdPANBjQPQ';
var YouTubeNameSearch = 'https://www.googleapis.com/youtube/v3/search?part=id&type=channel&q=' + channelName + '&key=' + YouTubeAPIKey;
var YouTubeData = 'https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=' + channelId + '&key=' + YouTubeAPIKey;

/*
//? convert name to channelID
fetch(YouTubeNameSearch)
    .then(function (response) {
        return response.json();
    })
    .then(function (data){
        console.log(data)
        channelId = data.items[0].id.channelId;
        console.log(channelId)
    })

*/

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

    const startDate = dayjs().startOf('month').format('YYYY-MM-DD'); 
    const endDate = dayjs().endOf('month').format('YYYY-MM-DD');

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
        '<div>Monthly Revenue: '+ monthly_rev + '</div>' +
        '<div>Total Revenue TD: '+ total_rev + '</div>' + 
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

//*** Merch Widgets ****/
//! T-Spring
//! Threads
//! UberPrints
//! Vista Print
//! Awesome Merch
//! Captiv8

