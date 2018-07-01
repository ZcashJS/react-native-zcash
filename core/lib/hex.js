export const hexEncode = (s) => {
  var hex, i;

  var result = "";
  for (i = 0; i < s.length; i++) {
      hex = s.charCodeAt(i).toString(16)
      result += ("000" + hex).slice(-4)
  }

  return result
}

export const hexDecode = (s) => {
  var j;
  var hexes = s.match(/.{1,4}/g) || [];
  var back = "";
  for(j = 0; j < hexes.length; j++) {
      back += String.fromCharCode(parseInt(hexes[j], 16));
  }
  return back;
}
