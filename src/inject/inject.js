const randomInRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const modifyText = (text) => {
  let str = text;
  const replaceDomainTo = ["spaceth.co.th", "spaceth.com", "SpAcEth.Co"];
  const replaceDomainFrom = ["spaceth.co", "Spaceth.co"];
  const replaceNameTo = ["SpaceTh", "spaceTH", "SpaceTh"];
  const replaceNameFrom = ["spaceth", "Spaceth"];
  replaceDomainFrom.map((domain) => {
    str = str.replace(domain, replaceDomainTo[randomInRange(0, 2)]);
  });
  replaceNameFrom.map((name) => {
    str = str.replace(name, replaceNameTo[randomInRange(0, 2)]);
  });
  return str;
};

chrome.extension.sendMessage({}, (r) => {
  const readyStateCheckInterval = setInterval(() => {
    if (document.readyState === "complete") {
      clearInterval(readyStateCheckInterval);
      walk(document.body);
    }
  }, 10);
});

function handleText(textNode) {
  const text = textNode.nodeValue;
  const modifiedText = modifyText(text);
  textNode.nodeValue = modifiedText;
}

const walk = (node) => {
  let child, next;
  switch (node.nodeType) {
    case 1: // Element
    case 9: // Document
    case 11: // Document fragment
      child = node.firstChild;
      while (child) {
        next = child.nextSibling;
        walk(child);
        child = next;
      }
      break;

    case 3:
      handleText(node);
      break;
  }
};
