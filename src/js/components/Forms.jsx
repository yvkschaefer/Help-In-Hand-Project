var React = require('react');
var $ = require('jquery');
var Link = require('react-router').Link;

var Forms = React.createClass({
    getInitialState: function() {
        return {
            major_illness: [],
            main_symptoms: []
        };
    },
    _handleSubmit: function(e) {
        e.preventDefault();
          
        //console.log('AGE:', this.refs.userInputAge.value);
        this.setState({
            age: this.refs.userInputAge.value,
            nationality: this.refs.userInputNationality.value,
            career: this.refs.userInputCareer.value
        });
    },
    _handleChangeRadio: function(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    },
    _handleChangeCheckbox: function(e) {
        
        var currentCategory = e.target.name;
        
        if (this.state[currentCategory].indexOf(e.target.value) === -1) {
            //console.log(currentCategory);
            this.setState({
                [e.target.name]: this.state[currentCategory].concat(e.target.value)
            });
            
        }
        else if ((this.state[currentCategory].indexOf(e.target.value) > -1)) {
            
            // console.log('prints when same box clicked more than once');
            //console.log('indexToremove', indexToRemove);
            var filteredArray = this.state[currentCategory].filter(function(categoryValue){
                return categoryValue !== e.target.value;
            })
            this.setState({
                [e.target.name]: filteredArray
            });
        }
        else {
            console.log("Something is not working here");
        }
        
    },
    render: function() {
        
        console.log("PRINT ALL:", this.state);
        
        return (
            <div className="questionnaire_forms">
            
                <form onSubmit={this._handleSubmit}>
                
                    <h3> Complete this form </h3>
                
                    Age: <input type="text" ref="userInputAge" /> <br/><br/>
                    
                    Gender: <br/>
                    <input type="radio" onChange={this._handleChangeRadio} name="gender" value="male" /> Male
                    <input type="radio" onChange={this._handleChangeRadio} name="gender" value="female" /> Female <br/><br/>

                    Nationality: <br/>
                    <input type="text" ref="userInputNationality" />  <br/><br/>
                    
                    Career: <br/>
                    <input type="text" ref="userInputCareer" />  <br/><br/>
                    
                    Sexual orientation: <br/>
                    <input type="radio" onChange={this._handleChangeRadio} name="sexual_orientation" value="heterosexual" /> Heterosexual <br/>
                    <input type="radio" onChange={this._handleChangeRadio} name="sexual_orientation" value="gay" /> Gay <br/>
                    <input type="radio" onChange={this._handleChangeRadio} name="sexual_orientation" value="lesbian" /> Lesbian <br/> 
                    <input type="radio" onChange={this._handleChangeRadio} name="sexual_orientation" value="bisexual" /> Bisexual <br/> 
                    <input type="radio" onChange={this._handleChangeRadio} name="sexual_orientation" value="transgender" /> Transgender <br/> 
                    <input type="radio" onChange={this._handleChangeRadio} name="sexual_orientation" value="other" /> Other <br/><br/> 
                    
                    Income: <br/>
                    <input type="radio" onChange={this._handleChangeRadio} name="income" value="0-20000" /> $0-$20000 <br/>
                    <input type="radio" onChange={this._handleChangeRadio} name="income" value="20000-40000" /> $20000-$40000 <br/>
                    <input type="radio" onChange={this._handleChangeRadio} name="income" value="40000-60000" /> $40000-$60000 <br/>
                    <input type="radio" onChange={this._handleChangeRadio} name="income" value="60000-80000" /> $60000-$80000 <br/>
                    <input type="radio" onChange={this._handleChangeRadio} name="income" value="80000-100000" /> $80000-$100000 <br/>
                    <input type="radio" onChange={this._handleChangeRadio} name="income" value="100000+" /> $100000+ <br/><br/>
                    
                    Major Illness: (Select all that apply) <br/>
                    <input type="checkbox" onChange={this._handleChangeCheckbox} name="major_illness" value="depression" /> Depression <br/>
                    <input type="checkbox" onChange={this._handleChangeCheckbox} name="major_illness" value="suicidal_thought" /> Suicidal thought <br/>
                    <input type="checkbox" onChange={this._handleChangeCheckbox} name="major_illness" value="grief" /> Grief <br/>
                    <input type="checkbox" onChange={this._handleChangeCheckbox} name="major_illness" value="divorce" /> Divorce <br/>
                    <input type="checkbox" onChange={this._handleChangeCheckbox} name="major_illness" value="anger" /> Anger <br/>
                    <input type="checkbox" onChange={this._handleChangeCheckbox} name="major_illness" value="other" /> Other <br/><br/>
                    
                    Main Symptoms: (Select all that apply) <br/>
                    <input type="checkbox" onChange={this._handleChangeCheckbox} name="main_symptoms" value="symptom1" /> Symptom1 <br/>
                    <input type="checkbox" onChange={this._handleChangeCheckbox} name="main_symptoms" value="symptom2" /> Symptom2 <br/>
                    <input type="checkbox" onChange={this._handleChangeCheckbox} name="main_symptoms" value="symptom3" /> Symptom3 <br/>
                    <input type="checkbox" onChange={this._handleChangeCheckbox} name="main_symptoms" value="symptom4" /> Symptom4 <br/>
                    <input type="checkbox" onChange={this._handleChangeCheckbox} name="main_symptoms" value="symptom5" /> Symptom5 <br/>
                    <input type="checkbox" onChange={this._handleChangeCheckbox} name="main_symptoms" value="symptom6" /> Symptom6 <br/><br/>                     
                    
                    
                    <button className="submit_form"> Submit! </button>
                    
                </form>
                
            </div>
        
        );
    }
  
});


module.exports = Forms;


// Description in your own words <br/>
