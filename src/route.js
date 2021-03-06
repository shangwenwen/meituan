import React, { PureComponent } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import loadable from "@loadable/component";
import Home from "./component/Home";
import Error from "./component/404";
import Register from "./common/Register";
import Search from "./component/search";
import Meishi from "./component/detail/meishi";
import Cate from "./component/detail/cate";
import Jiudian from "./component/detail/jiudian";
import ScrollToTop from "./ScrollToTop";
import App from "./app";
const Login = loadable(() => import("./common/Login"));
const Zhao = loadable(()=>import("./common/zhao"));

// 路由配置
export default class route extends PureComponent {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <ScrollToTop>
            <Switch>
              <Route path="/zhao" component={Zhao} />
              <Route path="/register" component={Register} />
              <Route path="/login" component={Login} />
              <Route
                path="/"
                render={() => {
                  return (
                    <App>
                      <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/s/:content" component={Search}></Route>
                        <Route path="/meishi/:id" component={Meishi}></Route>
                        <Route path="/cate/:id" component={Cate}></Route>
                        <Route path="/jiudian/:id" component={Jiudian}></Route>
                        <Route component={Error} />
                      </Switch>
                    </App>
                  );
                }}
              />
            </Switch>
          </ScrollToTop>
        </BrowserRouter>
      </Provider>
    );
  }
}
