export default props => {
  props && !props.in && props.onExited();
  return props.in ? props.children() : null;
};
