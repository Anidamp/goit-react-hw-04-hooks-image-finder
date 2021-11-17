import PropTypes from "prop-types";
import { LoadMore } from "./Button.styled";

export default function Button({ onClick }) {
  return (
    <LoadMore type="button" onClick={onClick}>
      Load more
    </LoadMore>
  );
}

Button.prototype = {
  onClick: PropTypes.func.isRequired,
};