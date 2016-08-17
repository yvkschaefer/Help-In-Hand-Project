var React = require('react');
var $ = require('jquery');
var Link = require('react-router').Link;

var ReactCheckboxGroup = require('react-checkbox-group');

var CheckboxGroup = ReactCheckboxGroup.CheckboxGroup;
var Checkbox = ReactCheckboxGroup.Checkbox;

// a variable illnesses that contain all illnesses, as well as all symptoms of each illness
var illnesses = {
    depression: {
        id: 'depression',
        name: 'Depression',
        symptoms: ['dep1', 'dep2', 'dep3']
    },
    grief: {
        id: 'grief',
        name: 'Grief',
        symptoms: ['grief1', 'grief2', 'grief3']
    },
    suicidalThought: {
        id: 'suicidalThought',
        name: 'SuicidalThought',
        symptoms: ['suicidalThought1', 'suicidalThought2', 'suicidalThought3', 'suicidalThought4']
    }
};

// making an array of illnessesList containing each object of illness from variable illnesses
var illnessesList = [illnesses.depression, illnesses.grief, illnesses.suicidalThought];

var Forms = React.createClass({
    getInitialState: function() {
        return {
            selectedIllnesses: [],
            selectedSymptoms: {}
        };
    },
    // takes care of all user inputs that are text, such as name, nationality, etc. only setState when clicked on submit.
    _handleSubmit: function(e) {
        e.preventDefault();
        
        // this.refs.userInput.value contains the value that the user entered inside the text box
        // console.log('AGE:', this.refs.userInputAge.value);
        this.setState({
            age: this.refs.userInputAge.value,
            nationality: this.refs.userInputNationality.value,
            career: this.refs.userInputCareer.value,
            userInputDescriptionInOwnWords: this.refs.userInputDescriptionInOwnWords.value
        });
    },
    // takes care of all user input that are radio button, such as gender, sexual orientation, and income
    _handleChangeRadio: function(e) {
        this.setState({
            // [e.target.name] is gender, and e.target.value is male, for example
            [e.target.name]: e.target.value
        });
    },
    // next two functions take care of user input checkboxes for illnesses and symptoms of each illness
    // newValue is an array of objects. Each object is an illness that contains its id and its symptoms
    // newValue only contains the objects of illnesses that was checked!
    _handleIllness: function(newValue) {
        // console.log("newValue:", newValue)
        var that = this;
        var newSelectedSymptoms = {};
        
        newValue.forEach(function(illness) {
            // using 'that' rather than 'this' since it is in a new function, and we can't access the properties of 'this' inside.
            // illness.id contains the name of the illness, so we are storing an object with key being illnessName and value being all the checked symptoms respective to their illness
            // for example, depression: [depressionSymptom2, depressionSymptom5]
            newSelectedSymptoms[illness.id] = that.state.selectedSymptoms[illness.id];
        });
        
        // At this point, newSelectedSymptoms object will contain illness objects which each containing their respective checked symptoms
        // console.log("newSelectedSymptoms:", newSelectedSymptoms);
        
        this.setState({
            selectedIllnesses: newValue, 
            selectedSymptoms: newSelectedSymptoms
            
        })
    },
    // illnessId contains the name of the checked illnesses
    _handleSymptoms: function(illnessId) {
        // console.log("illnessId:", illnessId);
        
        var that = this;
        return function(newSymptoms) {
            // newSymptoms is an array of symptoms. It is a different array for different illnesses.
            // console.log("newSymptoms", newSymptoms)
            //console.log("HI", that.state.selectedSymptoms)
            
            // for next ~6 lines, we store all the selectedSymptoms object in that.state inside a new variable selectedSymptoms.
            // we then only update the object inside selectedSymptoms that has the name as the illnessId, giving the value of array of checked newSymptoms.
            // finally, we setState the whole selectedSymptoms object which only the object with specific illnessId was modified.
            var selectedSymptoms = that.state.selectedSymptoms;
            selectedSymptoms[illnessId] = newSymptoms;
            
            that.setState({
                selectedSymptoms: selectedSymptoms
            });
        }
    },
    render: function() {
         console.log("PRINT ALL STATE:", this.state);
        var that = this;
        // from here on, every time there is a props called key is to avoid the error of the necessity of unique key
        
        // this part is for Main Symptoms section
        var symptoms = this.state.selectedIllnesses.map(function(illness) {
            return (
                <CheckboxGroup value={that.state.selectedSymptoms[illness.id]} onChange={that._handleSymptoms(illness.id)} key={illness.id}>
                {
                    illness.symptoms.map(function(symptom) {
                        return <div key={symptom}><label><Checkbox value={symptom}/> {symptom}</label></div>;
                    })
                }
                </CheckboxGroup>
            )
        });
        
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
                    <CheckboxGroup value={this.state.selectedIllnesses} onChange={this._handleIllness} name="major_illnesses">
                        {
                            Object.keys(illnesses).map(function(illness) {
                                return <div key={illness}><label><Checkbox value={illnesses[illness]}/> {illness}</label></div>;
                            })
                        }
                    </CheckboxGroup>
                    
                    <br/>
                    Main Symptoms: (Select all that apply) <br/><br/>
                    {symptoms}
                    
                    <br/><br/>
                    Description in your own words: <br/>
                    <input className="descrip_own_words" type="text" ref="userInputDescriptionInOwnWords" />  <br/><br/>

                    <button className="submit_form"> Submit! </button>
                </form>
                
            </div>
        
        );
    }
  
});


module.exports = Forms;