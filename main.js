let bookmarkTree= null
function makeIndent(indentLength) {
    return ".".repeat(indentLength);
  }
  function addToPage(bookmarkItem){
    const cooUl = document.querySelector('#myUL');
    const newItem = document.createElement("li")
    newItem.innerHTML = `<a href=${bookmarkItem.url}>${bookmarkItem.title}</a>`
    newItem.addEventListener('click', (e) =>{
      console.log(e.ctrlKey)
      if(e.ctrlKey){
        e.preventDefault()
        chrome.bookmarks.remove(bookmarkItem.id)
        newItem.innerHTML = ""
      }
      else if(!e.ctrlKey){
        console.log("THIS STAMENT LITERALLY IS FALSE")
        window.open(bookmarkItem.url)
      }
    })
    cooUl.append(newItem)
  }
   
  
  function logItems(bookmarkItem, indent) {
    console.log(bookmarkItem)
    if (bookmarkItem.url) {
      addToPage(bookmarkItem);
      // create button
      // button id button
    } else {
      console.log(`${makeIndent(indent)}Folder`);
      indent++;
    }
    if (bookmarkItem.children) {
      for (const child of bookmarkItem.children) {
        logItems(child, indent);
      }
    }
    indent--;
  }
  
  function logTree(bookmarkItems) {
    logItems(bookmarkItems[0], 0);
  }
  
  function onRejected(error) {
    console.log(`An error: ${error}`);
  }
  function nameSort(){
    input = document.getElementById('myInput');
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName('li');
    console.log(li[1])
    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("a")[0];
      console.log(typeof a.href)
      txtValue = a.textContent || a.innerText;
      console.log(txtValue.toUpperCase())
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
  }
  function linkSort(){
    input = document.getElementById('myInput');
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName('li');
    console.log(li[1])
    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("a")[0];
      console.log(typeof a.href)
      txtValue = a.textContent || a.innerText;
      console.log(txtValue.toUpperCase())
      if (a.href.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
  }
  document.addEventListener('DOMContentLoaded', async () => {
    let gettingTree = chrome.bookmarks.getTree();
    gettingTree.then(logTree, onRejected);
    const cooUl = document.querySelector('#myUL');
    const newItem = document.createElement("li")
    newItem.innerHTML = "<a href=>websiteDope</a>"
    cooUl.append(newItem)
    let searchBar = document.querySelector("input")
    let bookmarkTree= null
    console.log(searchBar)
    let theActualTree = null
    let treeValue = chrome.bookmarks.getTree()
    let arrayOfBookmarks = null
    treeValue.then((value)=>{
      theActualTree = value
      arrayOfBookmarks = treeToArray(theActualTree[0],0)
      console.log(arrayOfBookmarks)
    })
    searchBar.addEventListener("keyup", () =>{
      let filterMenu = document.getElementById("filterMenu")
      console.log(filterMenu.value + "filter")
      if(filterMenu.value === "url"){
        linkSort()
      }
      if(filterMenu.value === "name"){
        console.log("tree")
        console.log(theActualTree[0])
        //console.log("hii")
        nameSort()
      }
      if(filterMenu.value ==="recent"){
        console.log("rahhhhhhhh")
        recentSort(arrayOfBookmarks)
      }
    })
  })

  function recentSort(bookmarksArray){
    console.log("before")
    console.log(bookmarksArray)
    bookmarksArray.sort((a, b) => a.dateAdded > b.dateAdded ? -1 : 1)
    console.log("after")
    console.log(bookmarksArray)
    ul = document.getElementById("myUL");
    ul.innerHTML = ""
    for(item in bookmarksArray){
      addToPage(bookmarksArray[item])
    }
  }
   
  function treeToArray(bookmarkItem, indent, arrayOut=[]) {
    console.log(bookmarkItem.children)
    if (bookmarkItem.url) {
      console.log("item pushed")
      arrayOut.push(bookmarkItem);
      // create button
      // button id button
    } else {
      indent++;
    }
    if (bookmarkItem.children) {
      for (const child of bookmarkItem.children) {
        treeToArray(child, indent,arrayOut);
      }
    }
    indent--;
    return arrayOut
  }