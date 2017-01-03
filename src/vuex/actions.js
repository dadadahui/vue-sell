/**
 * Created by jhh on 2016/12/29.
 */
export const setRatingType = ({ dispatch },type) => {
  dispatch('SET_RATINGTYPE',type);
};

export const toggleContent = ({ dispatch }) => {
  dispatch('TOGGLE_CONTENT');
};

