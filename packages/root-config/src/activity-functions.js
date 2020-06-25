export function prefix(location, ...prefixes) {
  return prefixes.some(
    prefix => location.href.indexOf(`${location.origin}/${prefix}`) !== -1
  );
}

export function dashboard(location) {
  return prefix(location, 'dashboard');
}


export function layout(location) {
  // The navbar is always active
  return true;
}

export function notFound(location) {
  // The navbar is always active
  return !prefix(location, 'dashboard');
}