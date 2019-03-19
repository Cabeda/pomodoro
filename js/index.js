var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Title = /** @class */ (function (_super) {
    __extends(Title, _super);
    function Title() {
        var _this = _super.call(this) || this;
        _this.state = {
            visible: false
        };
        _this.toggleInfo = _this.toggleInfo.bind(_this);
        return _this;
    }
    Title.prototype.toggleInfo = function () {
        this.setState(function (prevState, props) {
            return { visible: !prevState.visible };
        });
    };
    Title.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement("div", { className: "col" },
                React.createElement("h1", { className: "text-center" },
                    "Pomodoro Clock ",
                    React.createElement("i", { className: "fa fa-info-circle", "aria-hidden": "true", onClick: this.toggleInfo }))),
            React.createElement("div", { className: "col info", hidden: !this.state.visible },
                React.createElement("h4", { className: "text-center" },
                    " Click ",
                    React.createElement("a", { target: "_blank", href: "https://en.wikipedia.org/wiki/Pomodoro_Technique" }, "here"),
                    " to go to Wikipedia"))));
    };
    ;
    return Title;
}(React.Component));
var Background = /** @class */ (function (_super) {
    __extends(Background, _super);
    function Background() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Background.prototype.render = function () {
        var divStyle = {
            color: 'blue',
            height: this.props.percentage,
            backgroundColor: this.props.state ? 'rgba(124,252,0,0.7)' : 'rgba(255,160,122,0.7)'
        };
        return (React.createElement("div", { style: divStyle, className: "background" }));
    };
    return Background;
}(React.Component));
function Timer(props) {
    return (React.createElement("div", null,
        React.createElement("h1", null,
            props.minutes,
            ":",
            props.seconds < 10 ? 0 : "",
            props.seconds),
        React.createElement("h4", null, props.name)));
}
var Buttons = /** @class */ (function (_super) {
    __extends(Buttons, _super);
    function Buttons() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Buttons.prototype.onInput = function () {
        var breakInput = document.getElementById("breakInput");
        var sessionInput = document.getElementById("sessionInput");
        var currentVal = input.value;
        this.setState({
            value: currentVal
        });
    };
    Buttons.prototype.render = function () {
        return (React.createElement("div", { "class": "btn-group", role: "group" },
            React.createElement("button", { className: "btn btn-primary", type: "button", onClick: this.props.startTimer }, "Start"),
            React.createElement("button", { className: "btn btn-warning", type: "button", onClick: this.props.stopTimer }, "Stop"),
            React.createElement("button", { className: "btn btn-danger", type: "button", onClick: this.props.resetTimer }, "Reset")));
    };
    return Buttons;
}(React.Component));
var Slider = /** @class */ (function (_super) {
    __extends(Slider, _super);
    function Slider(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            value: _this.props.defaultValue
        };
        return _this;
    }
    Slider.prototype.onInput = function () {
        var input = document.getElementById(this.props.name);
        var currentVal = input.value;
        this.props.setTime(currentVal);
        this.setState({
            value: currentVal
        });
    };
    Slider.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement("h4", null, this.props.name),
            React.createElement("div", { className: "range-slider" },
                React.createElement("input", { id: this.props.name, className: "range-slider__range", type: "range", min: this.props.min, max: this.props.max, step: "1", defaultValue: this.props.defaultValue, onInput: this.onInput.bind(this) }),
                React.createElement("span", { className: "range-slider__value" }, this.state.value))));
    };
    return Slider;
}(React.Component));
var Clock = /** @class */ (function (_super) {
    __extends(Clock, _super);
    function Clock() {
        var _this = _super.call(this) || this;
        _this.state = {
            time: 0,
            seconds: 0,
            sessionTime: 25,
            breakTime: 5,
            min: 1,
            max: 30,
            status: true,
            intervalId: null,
            statusName: "Session Time"
        };
        _this.startTimer = _this.startTimer.bind(_this);
        _this.stopTimer = _this.stopTimer.bind(_this);
        _this.resetTimer = _this.resetTimer.bind(_this);
        _this.setBreakTime = _this.setBreakTime.bind(_this);
        _this.setSessionTime = _this.setSessionTime.bind(_this);
        _this.getPercentage = _this.getPercentage.bind(_this);
        _this.countDown = _this.countDown.bind(_this);
        _this.changeStatus = _this.changeStatus.bind(_this);
        _this.decrementSeconds = _this.decrementSeconds.bind(_this);
        return _this;
    }
    Clock.prototype.componentWillMount = function () {
        this.setState({ time: this.state.sessionTime });
    };
    Clock.prototype.startTimer = function () {
        if (!this.state.intervalId) {
            this.state.intervalId = setInterval(this.countDown, 1000);
        }
    };
    Clock.prototype.stopTimer = function () {
        if (this.state.intervalId)
            clearInterval(this.state.intervalId);
        this.setState({ intervalId: null });
    };
    Clock.prototype.resetTimer = function () {
        if (this.state.intervalId)
            clearInterval(this.state.intervalId);
        this.setState({
            time: this.state.sessionTime,
            seconds: 0,
            sessionTime: 25,
            breakTime: 5,
            min: 1,
            max: 30,
            status: true,
            intervalId: null,
            statusName: "Session Time"
        });
    };
    Clock.prototype.setBreakTime = function (time) {
        this.setState({
            breakTime: time
        });
        if (!this.state.status) {
            this.setState({
                time: time,
                seconds: 0
            });
        }
    };
    Clock.prototype.setSessionTime = function (time) {
        this.setState({ sessionTime: time });
        if (this.state.status) {
            this.setState({ time: time, seconds: 0
            });
        }
    };
    Clock.prototype.countDown = function () {
        if (this.state.time == 0 && this.state.seconds == 0) {
            this.changeStatus();
        }
        else {
            this.decrementSeconds();
        }
    };
    Clock.prototype.changeStatus = function () {
        this.setState(function (prevState, props) {
            return {
                status: !prevState.status,
                statusName: !prevState.status ? "Session Time" : "Break Time",
                time: !prevState.status ? prevState.sessionTime : prevState.breakTime
            };
        });
    };
    Clock.prototype.decrementSeconds = function () {
        if (this.state.seconds === 0) {
            this.setState(function (prevState, props) { return { time: prevState.time - 1, seconds: 59 }; });
        }
        else {
            this.setState(function (prevState, props) { return { seconds: prevState.seconds - 1 }; });
        }
    };
    Clock.prototype.getPercentage = function () {
        var maxSeconds = this.state.status ? this.state.sessionTime * 60 : this.state.breakTime * 60;
        maxSeconds !== 0 ? maxSeconds : 1;
        var seconds = ((this.state.time) * 60) + this.state.seconds;
        return 100 - (seconds * 100 / maxSeconds) + "%";
    };
    Clock.prototype.render = function () {
        return (React.createElement("div", { className: "fullWidth" },
            React.createElement("div", { className: "row" },
                React.createElement("div", { className: "col" },
                    React.createElement(Slider, { name: "Break", min: this.state.min, max: this.state.max, defaultValue: "5", setTime: this.setBreakTime })),
                React.createElement("div", { className: "col" },
                    React.createElement(Slider, { name: "Session", min: this.state.min, max: this.state.max, defaultValue: "25", setTime: this.setSessionTime }))),
            React.createElement(Timer, { minutes: this.state.time, seconds: this.state.seconds, name: this.state.statusName }),
            React.createElement(Buttons, { startTimer: this.startTimer, stopTimer: this.stopTimer, resetTimer: this.resetTimer }),
            React.createElement(Background, { state: this.state.status, percentage: this.getPercentage() })));
    };
    return Clock;
}(React.Component));
ReactDOM.render(React.createElement("div", { className: "" },
    React.createElement(Title, null),
    React.createElement("div", { className: "container text-center" },
        React.createElement(Clock, null))), document.getElementById('root'));