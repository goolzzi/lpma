/**
 * Gatsby's Browser APIs in this file.
 * */

module.exports.onClientEntry = () => {
  //console.log("onClientEntry");
  // callAnalyticsAPI();
};

module.exports.onInitialClientRender = () => {
  //console.log("ReactDOM.render has executed");
};

import createHistory from "history/createBrowserHistory";

const history = createHistory();

history.listen((location, action) => {
  console.log(
    `The current URL is ${location.pathname}${location.search}${location.hash}`,
  );
  console.log(`The last navigation action was ${action}`);
});

module.exports.replaceHistory = () => history;
