import React from "react";
import cx from "classnames";
import { connect } from "react-redux";
import { setFilter } from "../redux/actions";
import { VISIBILITY_FILTERS } from "../constants";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const VisibilityFilters = ({ activeFilter, setFilter }) => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        setFilter(event.target.textContent);
    }    
  return (
    <div className="visibility-filters">
      <Tabs value={value} onChange={handleChange} indicatorColor="primary">
      {Object.keys(VISIBILITY_FILTERS).map(filterKey => {
        const currentFilter = VISIBILITY_FILTERS[filterKey];
        return (
        <Tab label={currentFilter} className={cx("filter",currentFilter === activeFilter && "filter--active")} />
        );
      })}
      </Tabs>  
    </div>
  );
};

const mapStateToProps = state => {
  return { activeFilter: state.visibilityFilter };
};

export default connect(
  mapStateToProps,
  { setFilter }
)(VisibilityFilters);