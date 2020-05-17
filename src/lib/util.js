/**
 * isDomAvailable
 * @description Checks to see if the DOM is available by checking the existence of the window and document
 * @see https://github.com/facebook/fbjs/blob/master/packages/fbjs/src/core/ExecutionEnvironment.js#L12
 */

export function isDomAvailable() {
  return typeof window !== 'undefined' && !!window.document && !!window.document.createElement;
}

/**
 * returnsToBr
 */

export function returnsToBr( string ) {
  if ( typeof string !== 'string' ) {
    throw new Error( `Failed to convert returns: Invalid type ${typeof string}` );
  }

  return string.replace( /\n/g, '<br />' );
}

/**
 * formatPhone
 */

export function formatPhone( number ) {
  const numberString = `${number}`;
  const area = numberString.substring( 0, 3 );
  const prefix = numberString.substring( 3, 6 );
  const line = numberString.substring( 6, 10 );
  return `(${area}) ${prefix}-${line}`;
}
