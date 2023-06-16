//* vars
const test_widget = document.getElementById('test_widget');
const startDate = dayjs().startOf('month').format('YYYY-MM-DD'); 
const endDate = dayjs().endOf('month').format('YYYY-MM-DD');
const currentMonth = dayjs().month();
const options_btn = document.getElementById('options_btn');
const submit = document.getElementById('submit');
const options_container = document.getElementById('options-container');
const user_input_modal = document.getElementById('user_input');
const modal_content = document.getElementById('modal-content');

//* User Info
const goals_form = document.getElementById('goals_form')
const user_name = document.getElementById('user_name')
const rev_goal = document.getElementById('rev_goal')
const influence_goal = document.getElementById('influence_goal')

//* User Output goals
const user_name_storage = document.getElementById('user_name_storage')
const rev_goal_storage = document.getElementById('rev_goal_storage')
const influence_goal_storage = document.getElementById('influence_goal_storage')
const percent_rev = document.getElementById('percent_rev')
const percent_inf = document.getElementById('percent_inf')



//* Goals
const goals_container = document.getElementById('goals_container');
const goals_btn = document.getElementById('goals_btn');

//* GLOBALS
var api_storage;
var reverb_monthly_rev = 0;
var teachable_monthly_rev = 0;
var influence_number = 1000;

//* Options Buttons
const youtube_btn = document.getElementById('youtube');
const teachable_btn = document.getElementById('teachable');
const reverb_btn = document.getElementById('reverb');
const placeholder_button = document.querySelectorAll('.soon')

//* Data Structure for local storage
const example_btn = document.getElementById('example_btn');

var dataStructure = {
  user: {
    name: 'Will',
    monthly_rev: 20000,
    influence: 10000,
  },
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
  user: {
    name: '',
    monthly_rev: 0,
    influence: 0,
  },
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


/**
 * This is the main function
 */
function main(){
  api_storage = getStorage();
  setStorage(api_storage);
  console.log(api_storage);
}


//check storage for widgets. if they are there. make the widget
function checkStorage(){
  updateUserInfo()
  clearWidgets();
  var promises = [];
  console.log("checking storage...")
  if (api_storage.youtube.channelName !== ''){
    console.log("Youtube credentials found!")
    //var promise = createYoutubeWidget();
    //promises.push(promise);
  }
  if (api_storage.teachable.apiKey !== ''){
    console.log("Teachable credentials found!")
    var promise2 = createTeachableWidget();
    promises.push(promise2)
  }
  if (api_storage.reverb.apiKey !== ''){
    var promise3 = console.log("Reverb credentials found!")
    createReverbWidget();
    promises.push(promise3)
  }
  Promise.all(promises).then(function(){
    getCompare();
  })
    
  
  
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
    showOptions();
    showGoals();
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

//? Placeholders
for (let i = 0; i < placeholder_button.length; i++){
  placeholder_button[i].addEventListener("click", function(){
    console.log("You made it to a placeholder")
    user_input_modal.classList.add('is-active');
    modal_content.innerHTML =
    '<h1>COMING SOON</h1>' +
    '<p>This Widget is unavailable at this time due to early development. We hope to have it active for you soon.</p>'
  })
}

//? User Data Listeners
goals_form.addEventListener("submit", function(){
  api_storage.user.name = user_name.value
  api_storage.user.monthly_rev = rev_goal.value
  api_storage.user.influence = influence_goal.value
  setStorage(api_storage)
  console.log(api_storage)
})

function updateUserInfo() {
  user_name_storage.textContent = api_storage.user.name
  rev_goal_storage.textContent = api_storage.user.monthly_rev
  influence_goal_storage.textContent = api_storage.user.influence
}


example_btn.addEventListener("click", function(){
  localStorage.removeItem('api_storage')
  api_storage = dataStructure;
  console.log(api_storage)
  setStorage(api_storage);
  getStorage();
})

function showOptions(){
  options_container.style.display = "flex";
};

function hideOptions(){
  options_container.style.display = "none";
};

submit.addEventListener("click", function(){
  hideOptions();
});


options_btn.addEventListener("click", function(){
  if (options_container.style.display === "none"){
    showOptions();
    options_btn.textContent = "Hide More Widgets"
  } else {
    hideOptions()
    options_btn.textContent = "Add More Widgets"
  }
});

/**
 * Shows the goals container for inputting goals to achieve
 */
function showGoals(){
  goals_container.style.display = "flex";
}

function hideGoals(){
  goals_container.style.display = "none";
}

goals_btn.addEventListener("click", function(){
  if (goals_container.style.display === "none"){
    showGoals();
    goals_btn.textContent = "Hide Goals"
  } else {
    hideGoals();
    goals_btn.textContent = "Set Goals"
  }
});


//* Goal compared
function getCompare() {
  console.log(api_storage.user.monthly_rev)
  var goal_rev =  (((reverb_monthly_rev + teachable_monthly_rev) / api_storage.user.monthly_rev)*100).toFixed(2)
  var influence_comp = (influence_number / api_storage.user.influence)*100
  console.log("goal rev: " + goal_rev)
  console.log("influencer: " + influence_comp)
  percent_rev.textContent = goal_rev + '%'
  percent_inf.textContent = influence_comp + '%'
}



//*** Social Widgets ****/

//! YouTube ////////////////////////
function createYoutubeWidget() {
  var YouTubeNameSearch = 'https://www.googleapis.com/youtube/v3/search?part=id&type=channel&q=' + api_storage.youtube.channelName + '&key=' + api_storage.youtube.apiKey;

  //? convert name to channelID
  return fetch(YouTubeNameSearch)
      .then(function (response) {
        return response.json();
      })
      .then(function (data){
      console.log(data)
      api_storage.youtube.channelId = data.items[0].id.channelId;

      var YouTubeData = 'https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=' + api_storage.youtube.channelId + '&key=' + api_storage.youtube.apiKey;
      //? get title, sub count, video count, view count.
      return fetch(YouTubeData)
          .then(function (response) {
            return response.json();
          })
          .then(function (data){
            var channelName = data.items[0].snippet.title
            var subscriberCount = data.items[0].statistics.subscriberCount
            var videoCount = data.items[0].statistics.videoCount
            var viewCount = data.items[0].statistics.viewCount
            influence_number = subscriberCount;

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
  return fetch('https://developers.teachable.com/v1/transactions?per=10000', options)
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
      return fetch('https://developers.teachable.com/v1/transactions?start=' + startDate + '&end=' + endDate, options)
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
          teachable_monthly_rev = monthly_rev;
  
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

  return fetch(reverb_api, {
      method: 'GET',
      headers: {
          'Authorization': `Bearer ${api_storage.reverb.apiKey}`
      }
  }).then(function(response){
      return response.json();
  }).then(function(data){
      var total_rev = 0;
      for (var i in data.payments) {
          var payment = data.payments[i].amount_item.amount_cents / 100
          total_rev += payment
          var date = data.payments[i].received_at
          var month = dayjs(date).month()
          if (month === currentMonth) {
            reverb_monthly_rev += payment
            console.log("reverb monthly " + reverb_monthly_rev)
          }
      }
      //? Generate Reverb Widget 
      const teachWidget = document.createElement("div");
      teachWidget.setAttribute("class", "widget");
      teachWidget.innerHTML = '<h1>Reverb</h1>' + 
      '<div>Monthly Revenue: $'+ reverb_monthly_rev + '</div>' +
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

//? Modal Listner stuff
document.addEventListener('DOMContentLoaded', () => {
  // Functions to open and close a modal
  function openModal($el) {
    $el.classList.add('is-active');
  }

  function closeModal($el) {
    $el.classList.remove('is-active');
  }

  function closeAllModals() {
    (document.querySelectorAll('.modal') || []).forEach(($modal) => {
      closeModal($modal);
    });
  }

  // Add a click event on buttons to open a specific modal
  (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
    const modal = $trigger.dataset.target;
    const $target = document.getElementById(modal);

    $trigger.addEventListener('click', () => {
      openModal($target);
    });
  });

  // Add a click event on various child elements to close the parent modal
  (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
    const $target = $close.closest('.modal');

    $close.addEventListener('click', () => {
      closeModal($target);
    });
  });

  // Add a keyboard event to close all modals
  document.addEventListener('keydown', (event) => {
    const e = event || window.event;

    if (e.keyCode === 27) { // Escape key
      closeAllModals();
    }
  });
});

main();