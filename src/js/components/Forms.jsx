var React = require('react');
var $ = require('jquery');
var Link = require('react-router').Link;

var depression = {
    name: 'depression', 
    symptoms: ['depression1', 'depression2', 'depression3', 'depression4', 'depression5']
};
var anger = {
    name: 'anger',
    symptoms: ['anger1', 'anger2', 'anger3', 'anger4', 'anger5', 'anger6', 'anger7']
};
var divorce = {
    name: 'divorce',
    symptoms: ['divorce1', 'divorce2',  'divorce3']
};
var grief = {
    name: 'grief',
    symptoms: ['grief1', 'grief2', 'grief3', 'grief4', 'grief5']
};
var suicidalThought = {
    name: 'suicidalThought',
    symptoms: ['suicidalThought1', 'suicidalThought2', 'suicidalThought3', 'suicidalThought4']
};
var other = {
    name: 'other',
    symptoms: ['other1', 'other2', 'other3', 'other4', 'other5', 'other6', 'other7', 'other8']
}

var Forms = React.createClass({
    getInitialState: function() {
        return {
            major_illness: [],
            main_symptoms: [depression, anger, divorce, grief, suicidalThought, other],
            users_symptoms: []
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
    _getSymptomsOfMainIllness: function() {
        
        var arrayOfMajorIllness = this.state.major_illness;
        var arrayOfListOfSymptoms = this.state.main_symptoms;
        //console.log("MAJOR ILLNESS:", arrayOfMajorIllness);
        //console.log("ARRAY OF LIST OF SYMPTOMS:", arrayOfListOfSymptoms);
        
        return (
            <div>
                
                {
                    arrayOfMajorIllness.map(function(eachIllness) {
                        //console.log("EACH ILLNESS:", eachIllness);
                         return arrayOfListOfSymptoms.map(function(eachSymptomList) {
                            //console.log("EACH SYMPTOMLIST", eachSymptomList);
                            if (eachIllness === eachSymptomList.name) {
                                //console.log("MAIN THING TO PRINT!:", eachSymptomList);
                                
                                return eachSymptomList.symptoms.map(function(eachSymptom) {
                                    return (<div> <input type="checkbox" name={eachSymptomList.name} value={eachSymptom}/> {eachSymptom} </div>)
                                })

                            }
                        })
                        
                    })
                }
                
            </div>
        )
        
        
    },
    render: function() {
        
        //console.log("PRINT ALL:", this.state);
        
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
                    <input type="checkbox" onChange={this._handleChangeCheckbox} name="major_illness" value="suicidalThought" /> Suicidal thought <br/>
                    <input type="checkbox" onChange={this._handleChangeCheckbox} name="major_illness" value="grief" /> Grief <br/>
                    <input type="checkbox" onChange={this._handleChangeCheckbox} name="major_illness" value="divorce" /> Divorce <br/>
                    <input type="checkbox" onChange={this._handleChangeCheckbox} name="major_illness" value="anger" /> Anger <br/>
                    <input type="checkbox" onChange={this._handleChangeCheckbox} name="major_illness" value="other" /> Other <br/><br/>
                    
                    Main Symptoms: (Select all that apply) <br/>
                    {this._getSymptomsOfMainIllness()}
                    
                    <button className="submit_form"> Submit! </button>
                    
                </form>
                
            </div>
        
        );
    }
  
});


module.exports = Forms;


// Description in your own words <br/>




                    // Main Symptoms: (Select all that apply) <br/>
                    // <input type="checkbox" onChange={this._handleChangeCheckbox} name="main_symptoms" value="symptom1" /> Symptom1 <br/>
                    // <input type="checkbox" onChange={this._handleChangeCheckbox} name="main_symptoms" value="symptom2" /> Symptom2 <br/>
                    // <input type="checkbox" onChange={this._handleChangeCheckbox} name="main_symptoms" value="symptom3" /> Symptom3 <br/>
                    // <input type="checkbox" onChange={this._handleChangeCheckbox} name="main_symptoms" value="symptom4" /> Symptom4 <br/>
                    // <input type="checkbox" onChange={this._handleChangeCheckbox} name="main_symptoms" value="symptom5" /> Symptom5 <br/>
                    // <input type="checkbox" onChange={this._handleChangeCheckbox} name="main_symptoms" value="symptom6" /> Symptom6 <br/><br/>