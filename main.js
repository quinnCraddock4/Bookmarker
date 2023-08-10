function makeIndent(indentLength) {
    return ".".repeat(indentLength);
  }
  function addToPage(bookmarkItem){
    const cooUl = document.querySelector('#myUL');
    const newItem = document.createElement("li")
    newItem.innerHTML = `<a href=${bookmarkItem.url}>${bookmarkItem.title}</a>`
    newItem.addEventListener('click', () =>{
      window.open(bookmarkItem.url)
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
    console.log(searchBar)
    searchBar.addEventListener("keyup", () =>{
      let filterMenu = document.getElementById("filterMenu")
      console.log(filterMenu.value + "filter")
      if(filterMenu.value === "url"){
        linkSort()
      }
      if(filterMenu.value === "name"){
        nameSort()
      }
    })
  })