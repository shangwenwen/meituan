import React, { PureComponent } from "react";
import data from "../../config/offer.json";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getCheapHomeData } from "../store/createAction";
import "./index.less";

const mapStateToProps = state => {
  return {
    list: state.get("Home").get("cheap"),
    have: state.get("Home").get("cheapHave")
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getData(data) {
      dispatch(getCheapHomeData(data));
    }
  };
};

@connect(mapStateToProps, mapDispatchToProps)
class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      item: 0,
      url: "all",
      fangwen: []
    };
  }

  componentDidMount = () => {
    if (this.props.list.size === 0) {
      this.props.getData("all");
    }
  };

  mouseEnterEvent(data, url, have) {
    this.setState(
      {
        item: data,
        url,
        fangwen: have.toJS()
      },
      () => {
        const jia = this.state.fangwen;
        let flag = 0;
        for (let i = 0; i < jia.length; i++) {
          jia[i] === url && flag++;
        }
        if (flag === 0) {
          this.props.getData(url, have);
        }
      }
    );
  }

  render() {
    const { list, have } = this.props;
    let defaultList = list.toJS();
    let shuzu = null;
    if (defaultList.length === 0) {
      shuzu = [];
    } else {
      shuzu = defaultList[0].data;
    }
    for (let i = 0; i < defaultList.length; i++) {
      if (defaultList[i].url === this.state.url) {
        shuzu = defaultList[i].data;
      }
    }
    return (
      <div className="scenes-container">
        <div className="quality-container">
          <div
            className="index-nav-container undefined"
            style={{
              backgroundColor: "rgb(190, 164, 116)",
              backgroundImage:
                "linear-gradient(to right, rgb(255, 113, 74) 2%, rgb(252, 66, 66) 97%)"
            }}
          >
            <ul className="clearfix ">
              <li className="title nav-item mf-shang-hei-regular">狠优惠</li>
              {data.data.map((item, index) => {
                return (
                  <li
                    onMouseEnter={() =>
                      this.mouseEnterEvent(index, item.url, have)
                    }
                    className={[
                      "nav-item",
                      this.state.item === index && "active"
                    ].join(" ")}
                    key={index}
                  >
                    {item.title}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="cheap-area clearfix">
            {shuzu.map(item => {
              return (
                <Link key={item.id} to={item.iUrl} className="link cheap-card">
                  <div className="cheap-img">
                    <img src={item.imgUrl} alt={item.iUrl} />
                  </div>
                  <div className="poi-info">
                    <div className="title" title={item.title}>
                      {item.title}
                    </div>
                    <div className="sub-title" title={item.subTitle}>
                      {item.subTitle}
                    </div>
                    <div className="price-info">
                      <span className="current-price-wrapper">
                        <span className="price-symbol numfont">¥</span>
                        <span
                          className="current-price numfont"
                          title={item.currentPrice}
                        >
                          {item.currentPrice}
                        </span>
                      </span>
                      <span className="old-price" title={item.oldPrice}>
                        {item.oldPrice}
                      </span>
                      <span
                        className="sold bottom-right-info"
                        title={item.bottomInfo}
                      >
                        {item.bottomInfo}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
