var activatedButton = document.getElementsByClassName("platforms");





//*** Social Widgets ****/
//! YouTube
const YouTubeAPIKey = 'AIzaSyCuc2AbssrSaVUQ7-1RvIUgJLXgUpWq7cU'; 
const channelName = 'film_friends'
var channelId = 'UCgeSDwPH-6ttgxdPANBjQPQ';
var YouTubeNameSearch = 'https://www.googleapis.com/youtube/v3/search?part=id&type=channel&q=' + channelName + '&key=' + YouTubeAPIKey;
var YouTubeData = 'https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=' + channelId + '&key=' + YouTubeAPIKey;

/*
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

fetch(YouTubeData)
    .then(function (response) {
        return response.json();
    })
    .then(function (data){
        console.log("Channel: " + data.items[0].snippet.title)
        console.log("Subscribers: " + data.items[0].statistics.subscriberCount)
        console.log("Video Count: " + data.items[0].statistics.videoCount)
        console.log("Views: " + data.items[0].statistics.viewCount)

    })



//! Meta (FB and IG)
//! TikTok 
//! Twitch
//! Snap Chat
//! Patreon


//*** Online Courses Widgets ****/
//! Teachable
const options = {
  method: 'GET',
  headers: {accept: 'application/json', apiKey: 'B0RD3UreiCuqORd5bau5CKx3MC0s4pTN'}
};

fetch('https://developers.teachable.com/v1/transactions?per=10000', options)
  .then(function (response){
    return response.json();
  })
  .then(function (data) {
    var total_rev = 0;
    for (var i in data['transactions']){
        total_rev += data['transactions'][i].revenue
    }
    
    //Move the decimal 
    total_rev = total_rev / 100
    console.log("(Teachable) Total Revenue TD: "+ total_rev)
})

const startDate = dayjs().startOf('month').format('YYYY-MM-DD'); 
const endDate = dayjs().endOf('month').format('YYYY-MM-DD');

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