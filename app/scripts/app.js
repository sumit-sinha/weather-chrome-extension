class Extension extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedCity: 'London',
            dropdownClass: ''
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        e.preventDefault();
        this.setState(prevState => {
            if (prevState.dropdownClass === '') {
                prevState.dropdownClass = 'show';
            } else {
                prevState.dropdownClass = '';
            }

            return prevState;
        });
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    prepareRandomWeather() {
        const weatherPattern = this.getRandomInt(1, 5);
        switch (weatherPattern) {
            case 1:
                this.setState(prevState => ({
                    weather: 'sunny',
                    weatherDescription: 'Sunny weather'
                }));
                break;
            case 2:
                this.setState(prevState => ({
                    weather: 'rain',
                    weatherDescription: 'It\'s going to rain'
                }));
                break;
            case 3:
                this.setState(prevState => ({
                    weather: 'slight-cloud',
                    weatherDescription: 'Cloud cover but no rain'
                }));
                break;
            case 4:
                this.setState(prevState => ({
                    weather: 'cloudy',
                    weatherDescription: 'Cloud cover with slight drizzle'
                }));
                break;
            default:
                break;
        }

        this.setState(prevState => ({
            temprature: this.getRandomInt(1, 45)
        }));

        this.setState(prevState => ({
            humidity: this.getRandomInt(1, 99)
        }));

        this.setState(prevState => ({
            wind: this.getRandomInt(1, 110)
        }));
    }

    onCityClick(e, location) {
        e.preventDefault();
        this.setState(prevState => ({
            selectedCity: location
        }));
        
        this.handleClick(e);

        this.prepareRandomWeather();

        /*
        // since data is always same for this sample request there commenting the below code
        function reqListener () {
            const response = JSON.parse(this.responseText);
            
        }

        var oReq = new XMLHttpRequest();
        oReq.addEventListener("load", reqListener);
        oReq.open("GET", "https://cors-anywhere.herokuapp.com/http://samples.openweathermap.org/data/2.5/weather?q=" 
                        + location 
                        + "&appid=b1b15e88fa797225412429c1c50c122a1");
        oReq.send();*/
    }

    render() {
        return React.createElement('div',
            { className: 'container' },
            React.createElement('div', {
                    className: 'row'
                },
                React.createElement('div',{
                        className: 'col-12 city-label'
                    },
                    React.createElement('p', null, 'City:')
                ),
                React.createElement('div',{
                        className: 'col-12 city-dropdown'
                    },
                    React.createElement('div', {
                            className: "dropdown " + this.state.dropdownClass
                        },
                        React.createElement(
                            'button', { 
                                onClick: this.handleClick,
                                className: 'btn btn-secondary dropdown-toggle',
                                type: 'button',
                                id: 'dropdownMenuButton',
                                'data-toggle': 'dropdown',
                                'aria-haspopup': 'true',
                                'aria-expanded': 'false'
                            },
                            this.state.selectedCity
                        ),
                        React.createElement('div', {
                                className: "dropdown-menu " + this.state.dropdownClass,
                                'aria-labelledby': 'dropdownMenuButton'
                            },
                            React.createElement('a', {
                                    onClick: e => this.onCityClick(e, 'London'),
                                    className: 'dropdown-item',
                                    href: 'javascript:void(0);' 
                                },'London'),
                            React.createElement('a', {
                                    onClick: e => this.onCityClick(e, 'Paris'),
                                    className: 'dropdown-item',
                                    href: 'javascript:void(0);'
                                },'Paris'),
                            React.createElement('a', {
                                    onClick: e => this.onCityClick(e, 'Sydney'),
                                    className: 'dropdown-item',
                                    href: 'javascript:void(0);'
                                }, 'Sydney')
                        )
                    )
                )
            ),
            React.createElement('div', {
                    className: 'row'
                },
                React.createElement('div', {
                        className: 'col-12 weather-image'
                    },
                    React.createElement('div', { className: this.state.weather }),
                    React.createElement('p', null, this.state.weatherDescription)
                )
            ),
            React.createElement('div', {
                    className: 'row weather-info'
                },
                React.createElement('div', {
                        className: 'col-4'
                    },
                    React.createElement('p', null, 'Temp'),
                    React.createElement('p', null, this.state.temprature, ' C')
                ),
                React.createElement('div', {
                        className: 'col-4' 
                    },
                    React.createElement('p', null, 'Humidity'),
                    React.createElement('p', null, this.state.humidity)
                ),
                React.createElement( 'div', {
                        className: 'col-4'
                    },
                    React.createElement('p', null, 'Wind'),
                    React.createElement('p', null, this.state.wind)
                )
            )
        );
    }

    componentDidMount() {
        this.prepareRandomWeather();
    }
}

ReactDOM.render(React.createElement(Extension, null), document.getElementById('root'));