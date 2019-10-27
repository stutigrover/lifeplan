import React from 'react';
import { Grid, TextField, Typography, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";

const styles = {
  fullContainer: {
    height: "100%"
  },
  textfieldStyle: {
    width: "100%"
  },
  fullWidth: {
    width: "100%"
  }
};

class App extends React.Component {

  constructor() {
    super();

    this.handleAge = this.handleAge.bind(this);
    this.handleIncome = this.handleIncome.bind(this);
    this.handleKids = this.handleKids.bind(this);
    this.handleLoans = this.handleLoans.bind(this);
    this.handleMortgage = this.handleMortgage.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.setState({
      age: 0,
      income: 0,
      kids: 0,
      loans: 0,
      mortgage: 0,
      clicked: false,
      message: ""
    });
  }

  handleAge(event) {
    this.setState({
      age: Number(event.target.value)
    })
  };

  handleIncome(event) {
    this.setState({
      income: Number(event.target.value)
    })
  };

  handleKids(event) {
    this.setState({
      kids: Number(event.target.value)
    })
  };

  handleLoans(event) {
    this.setState({
      loans: Number(event.target.value)
    })
  };

  handleMortgage(event) {
    this.setState({
      mortgage: Number(event.target.value)
    })
  };

  handleClick(event) {
    const { age, income, kids, loans, mortgage } = this.state;
    
    const cKid = 233610;
    const cVoc = 1000;
    const cLiv = 30000;
    
    let message = "";

    if(income * 0.85 < cLiv) {
      message = "Warning! You don't have enough money to support your life. ";
    }

    const saveReyr = income * 0.15;
    if(income - saveReyr - cLiv > cVoc) {
      message = "Congratulations! You are able to afford vocations! ";
    }

    const savYr = 67 - age;
    message += "You will have " + savYr + " to save for retirement and here is your saving plan: ";

    const debt = (loans + mortgage) / savYr * 1.05;
    const spend = income - cLiv - savYr - debt;

    message += "Each year, you will be spending $" + spend + ". ";

    if(spend > 0) {
      message += "You are able to eventually raise a kid. ";
    } else {
      message += "Please consider kids after you can support your life. ";
    }

    if(spend > (cKid / 20)) {
      message += "You are immediately able to have kid(s). ";
    } else {
      message += "We recommend investing in high-rate muni bonds and the stock markets if you plan to have " + kids + " kid(s). ";
    }

    this.setState({
      clicked: true,
      message: message
    })
  }

  render() {
    const { classes } = this.props;

    return (
      <Grid container direction="column" className={classes.fullContainer} justify="center" alignItems="center">
        <Grid item>
          <Typography variant="h1">
            Lifeplan
          </Typography>
        </Grid>
        <Grid item className={classes.fullWidth}>
          <TextField
            label="Your Age"
            margin="normal"
            type="number"
            className={classes.textfieldStyle}
            onChange={this.handleAge}
          />
        </Grid>
        <Grid item className={classes.fullWidth}>
          <TextField
            label="Yearly Income"
            margin="normal"
            type="number"
            className={classes.textfieldStyle}
            onChange={this.handleIncome}
          />
        </Grid>
        <Grid item className={classes.fullWidth}>
          <TextField
            label="Number of Kids Planned or Currently have"
            margin="normal"
            type="number"
            className={classes.textfieldStyle}
            onChange={this.handleKids}
          />
        </Grid>
        <Grid item className={classes.fullWidth}>
          <TextField
            label="Amount of Student Loans"
            margin="normal"
            type="number"
            className={classes.textfieldStyle}
            onChange={this.handleLoans}
          />
        </Grid>
        <Grid item className={classes.fullWidth}>
          <TextField
            label="Mortgage Amount"
            margin="normal"
            type="number"
            className={classes.textfieldStyle}
            onChange={this.handleMortgage}
          />
        </Grid>
        <Grid item>
          <Button variant="outlined" color="primary" onClick={this.handleClick}>
            Generate Report
          </Button>
        </Grid>

        {this.state && this.state.clicked &&
          <Grid item className={classes.fullWidth}>
            <Typography variant="h6">
              {this.state.message}
            </Typography>
          </Grid>
        }
      </Grid>
    );
  }
}

export default withStyles(styles)(App);
