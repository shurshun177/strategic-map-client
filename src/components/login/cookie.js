export default (cname) => {
  const name = `${cname}=`;
  const ca = document.cookie.split(';');
  let i = 0;
  for (i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
};
