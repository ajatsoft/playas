// react-testing-library renders your components to document.body,
// this will ensure they're removed after each test.
// import '@testing-library/react/cleanup-after-each'; NO necessary
// this adds jest-dom's custom assertions
import '@testing-library/jest-dom/extend-expect';


/**
 * fix: `matchMedia` not present, legacy browsers require a polyfill
 * https://stackoverflow.com/questions/41366380/matchmedia-not-present-when-testing-create-react-app-component-which-contain-rea
 */
global.matchMedia = global.matchMedia || function () {
  return {
    matches: false,
    addListener: function () { },
    removeListener: function () { }
  }
}



global.AmCharts = {
    makeChart: jest.fn()
}

// global.AmCharts = global.AmCharts || function() {
//   return {
//     makeChart: jest.fn()
//   }
// }