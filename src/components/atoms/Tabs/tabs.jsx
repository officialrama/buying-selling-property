import React, { Component } from "react";

class Tabs extends Component {
  state = {
    selected: this.props.selected || 0,
  };

  handleChange(index) {
    this.setState({ selected: index });
  }

  render() {
    return (
      <div>
        <div className="tabs__wrapper">
          <ul className="tabs__flex">
            {(() => {
              if (this.props?.isCalc) {
                return (
                  <div>
                    <li>
                      <p className="tabs__active">
                        {this.props?.children[1]?.props?.title}
                      </p>
                    </li>
                  </div>
                );
              } else {
                return this.props?.children.map((data, index) => {
                  return (
                    <li key={index}>
                      <p
                        className={
                          index === this.state.selected
                            ? "tabs__active"
                            : "tabs__idle"
                        }
                        onClick={() => this.handleChange(index)}
                      >
                        {data.props.title}
                      </p>
                    </li>
                  );
                });
              }
            })()}
          </ul>
        </div>
        <div className="w-[100%]">
          {(() => {
            if (this.props?.isCalc) {
              return this.props?.children[1];
            } else {
              return this.props?.children[this.state.selected];
            }
          })()}
        </div>
      </div>
    );
  }
}

export default Tabs;
