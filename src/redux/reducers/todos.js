import { ADD_TODO, TOGGLE_TODO, EDIT_TODO, DELETE_TODO } from "../actionTypes";

const initialState = {
  allIds: [],
  byIds: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO: {
      const { id, content } = action.payload;
      return {
        ...state,
        allIds: [...state.allIds, id],
        byIds: {
          ...state.byIds,
          [id]: {
            content,
            completed: false
          }
        }
      };
    }

    case EDIT_TODO: {
      const { id, content } = action.payload;
      return {
        ...state,
        byIds: {
          ...state.byIds,
          [id]: {
            ...state.byIds[id],
            content,
          }
        }
      };
    }

    case DELETE_TODO: {
      const { id } = action.payload;
      let k = [...state.allIds]
      let byIds = state.byIds
      let i = k.indexOf(id);
      k.splice(i,1)
      delete byIds[id]
      return {
        ...state,
        allIds: k,
        byIds
      };
    }

    case TOGGLE_TODO: {
      const { id } = action.payload;
      return {
        ...state,
        byIds: {
          ...state.byIds,
          [id]: {
            ...state.byIds[id],
            completed: !state.byIds[id].completed
          }
        }
      };
    }

    default:
      return state;
  }
}