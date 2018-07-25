function Person(props) {
  return React.createElement(
    "div",
    { className: "person" },
    React.createElement(
      "h1",
      null,
      props.name
    ),
    React.createElement(
      "p",
      null,
      "Your Age: ",
      props.age
    )
  );
}

ReactDOM.render(React.createElement(Person, { name: "Max", age: "29" }), document.querySelector("#p1"));

ReactDOM.render(React.createElement(Person, { name: "Shawn", age: "24" }), document.querySelector("#p2"));

var app = React.createElement(
  "div",
  null,
  React.createElement(Person, { name: "Tom", age: "25" }),
  React.createElement(Person, { name: "Linda", age: "26" })
);

ReactDOM.render(app, document.querySelector("#app"));