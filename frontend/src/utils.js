function isInputHasContext(domList = []) {
  if (!(domList.length >0  && domList && Array.isArray(domList))) return -1;//domList error
  let statusCode = 0; // success
  domList.forEach(dom => {
    if (dom.value === '') {
      statusCode = 1; //dom empty error
    }
  });
  return statusCode;
}

function clearDomValue(domList = []) {
  if (domList.length >0  && domList && Array.isArray(domList)) return;
  domList.forEach((dom) => {
    dom.value = ''
  })
}

export { isInputHasContext, clearDomValue }

