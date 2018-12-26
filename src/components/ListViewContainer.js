import React, {Component} from 'react';

class ListViewContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {

            stepIndex: 0,
            text: 'Type \'Start\' to begin a story. For list of available commands type \'Help\'.',
            actions: [{
                id: 'start',
                text: 'initialize the start of the quest'
            }],
            isHelpMode: false

        };
    }

    updateStepIndex(direction){
        this.setState((prevState, props)=>{
            return {
                stepIndex: direction === 'back'? prevState.stepIndex -- : prevState.stepIndex ++
            }
        })
    }

    fetchStory(params){
        let url = `textQuest/1.0/story/?stepId=${params.stepIndex}`;
        if (params.action){
            url = url.concat(`&action=${params.action}`)
        }


        const story = RestAPI('/api').get(url, {withCredentials: true});
        story.then( resultStory => {
            let data = resultStory.data;
            this.setState((prevState, props) => {
                return {
                    text: data.text,
                    actions: data.actions,
                    stepIndex: prevState.stepIndex+1,
                    playState: params.action.toLocaleLowerCase() === 'play',
                    isHelpMode: false
                };
            });

        }).catch( (error) => {
        });
    }


    toggleHelp(){
        this.setState((prevState, props)=>{
            return {
                isHelpMode: true
            }
        });
    }

    toggleBack(command){
        console.log(command, this.state.stepIndex, 'COMMAND')
        this.setState((prevState, props)=>{
            return {
                stepIndex: this.state.stepIndex === 1 ? 0 : prevState.stepIndex-2
            }
        }, ()=>{
            let params = {
                stepIndex: this.state.stepIndex,
                action: command
            };
            this.fetchStory(params);
        });
    }


    render() {
        return (
            <div className="Cmd">
                <CmdOutput storyText={this.state.text} helpActions={this.state.actions} isHelpMode={this.state.isHelpMode}/>
                {this.state.playState ? (
                    <CmdInteractiveInput updateStepIndex={this.updateStepIndex.bind(this)} stepIndex={this.state.stepIndex}/>
                ):(
                    <CmdInput fetchSTory={this.fetchStory.bind(this)}
                              updateStepIndex={this.updateStepIndex.bind(this)}
                              stepIndex={this.state.stepIndex}
                              toggleHelp={this.toggleHelp.bind(this)}
                              toggleBack={this.toggleBack.bind(this)}
                    />
                )
                }
            </div>
        );
    }
}

export default ListViewContainer;