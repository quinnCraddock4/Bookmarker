function makeIndent(indentLength) {
    return ".".repeat(indentLength);
  }
  
  function logItems(bookmarkItem, indent) {
    if (bookmarkItem.url) {
      console.log(makeIndent(indent) + bookmarkItem.title);
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
    console.log(bookmarkItems)
    logItems(bookmarkItems[0], 0);
  }
  
  function onRejected(error) {
    console.log(`An error: ${error}`);
  }
  
  let gettingTree = chrome.bookmarks.getTree();
  gettingTree.then(logTree, onRejected);