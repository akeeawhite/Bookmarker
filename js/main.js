/*Original Code By: Traversy Media
  Edited By: Akeea White
  Date: 12/26/2018
*/
// Listen for form submit
document.getElementById('bookmarkForm').addEventListener("submit", saveBookmark);

//Save Bookmark
function saveBookmark(e){
    //Get form values
    var siteName = document.getElementById('siteName').value; //collects name of site
    var siteUrl = document.getElementById('siteUrl').value; //collects url of site

    if(!validateForm(siteName, siteUrl)){
        return false;
    }

    //Creates an array or list of the site name and url
    var bookmark = {
        name: siteName,
        url: siteUrl
    }

  //Test if bookmarks is null
  if(localStorage.getItem('bookmarks') === null) {
    //Initialize Array
    var bookmarks = [];
    //Add to the Array
    bookmarks.push(bookmark);
    //Set to local Storage(Turns JSON into string)
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  } else {
    //Get bookmarks from local storage(Turns string into JSON)
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //Add bookmark to array
    bookmarks.push(bookmark);
    //reset back to LocalStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }

  //Clear form
  document.getElementById('bookmarkForm').reset();

  //Re-fetch bookmarks
  fetchBookmarks();
    
  //Prevent form from submitting
  e.preventDefault();
}

//Delete Bookmark
function deleteBookmark(url){
    //Get bookmarks from localstorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //Loop through bookmarks
    for(var i =0;i < bookmarks.length;i++){
      if(bookmarks[i].url == url){
        //Remove from array
        bookmarks.splice(i, 1);
      }
    }
    //Reset to LocalStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    //Re-fetch bookmarks
    fetchBookmarks();
}

//Fetch bookmarks
function fetchBookmarks(){
    //Get bookmarks from local storage(Turns string into JSON)
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //Get output results
    var results = document.getElementById('results');
     
    //Bulid Output (i stands for iteration of a bookmark)
    results.innerHTML = '';
    for(var i = 0;i < bookmarks.length;i++){
       var name = bookmarks[i].name;
       var url = bookmarks[i].url;

       results.innerHTML += '<div class="card bg-light text-dark card-body mt-3">'+
                                '<h3>'+name+
                                ' <a class="btn btn-default" target="_blank" href="'+addhttp(url)+'">Visit</a> ' +
                                ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> ' +
                                '</h3>'+
                                '</div>';
     }
}



//Validate form
function validateForm(siteName, siteUrl){
    if(!siteName || !siteUrl){
        alert('Please add the website name and address');
        return false;
    }

    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if(!siteUrl.match(regex)){
      alert('Please use valid URL');
      return false;
    }

    return true;
}

function addhttp(url) {
    if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
        url = "http://" + url;
    }
    return url;
}


 /*
    //Local Storage
    localStorage.setItem('test', 'Hello World');
    console.log(localStorage.setItem('test'));
    localStorage.removeItem('test');
    console.log(localStorage.setItem('test'));
*/