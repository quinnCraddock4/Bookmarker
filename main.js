function makeIndent(indentLength) {
    return ".".repeat(indentLength);
  }
  function addToPage(bookmarkItem){
    const cooUl = document.querySelector('div');
    //cooUl.setAttribute('onclick',bookmarkItem.url)
    const newItem = document.createElement("button")
    newItem.innerText = bookmarkItem.title
    newItem.setAttribute('onclick',"location.href=" + bookmarkItem.url)
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
  
  document.addEventListener('DOMContentLoaded', async () => {
    let gettingTree = chrome.bookmarks.getTree();
    gettingTree.then(logTree, onRejected);
    const cooUl = document.querySelector('#myUL');
    const newItem = document.createElement("li")
    newItem.innerHTML = "<a href=>websiteDope</a>"
    cooUl.append(newItem)
  })