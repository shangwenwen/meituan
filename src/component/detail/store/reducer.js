import { fromJS } from "immutable";
import {
  GET_DATA,
  CATE_DATA,
  JIU_CATE_DATA
} from "./constant";
const defaultState = fromJS({
  tags: [],
  comments: [],
  total: 0,
  totalCate: 0,
  tagsCate: [],
  commentsCate: [],
  jiuList: [],
  jiuData: []
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case GET_DATA:
      return state
        .set("tags", action.pyload.tags)
        .set("comments", action.pyload.comments)
        .set("total", action.pyload.total);
    case CATE_DATA:
      return state
        .set("tagsCate", action.pyload.tags)
        .set("commentsCate", action.pyload.comments)
        .set("totalCate", action.pyload.total);
    case JIU_CATE_DATA:
      return state
        .set("jiuList", action.pyload.list.data.data)
        .set("jiuData", action.pyload.data.data.data);
    default:
      return state;
  }
};
