import {decorate, observable, computed, action} from "mobx"
import RestAPI from '../api';

class VersionStore {
    year = '';
    hospital_type = '';

    hospital_types_list = [
        {
            value: '0',
            label: '',
        },
        {
            value: '1',
            label: 'כללים',
        },
        {
            value: '2',
            label: 'גריאטריים',
        },
        {
            value: '3',
            label: 'פסיכיאטריים',
        }
    ];

    constructor(year='', hospital_type=''){
        this.year = year;
        this.hospital_type = hospital_type;
    }

    init(type){
        let initByType = {
            'new':()=>{
                this.last_version();
            }
        };
        return initByType[type]? initByType[type](): '';
    }


    last_version(){
        let url = 'last_version/';
        const last_version = RestAPI().get(url, {withCredentials: true});
        last_version.then(result => {
            let number = result.data.vers_number;
               this.version_number = number;
        }).catch((error) => {
            console.log(error);
        });
    }

    human_hospital_type(code){
        let hospital = this.hospital_types_list.find(el=>el.value ===code);
        return hospital? hospital.label: '';
    }
    get version_name(){
        let hospitalLabel = this.human_hospital_type(this.hospital_type);
        return `${this.year}-${hospitalLabel}`;
    }

    updateProperty = (name,event)=> {
        this[name]= event.target.value;
    };
}

decorate(VersionStore, {
    year: observable,
    hospital_type: observable,
    version_name: computed,
    init: action,
    last_version: action
});

const versionStore =  new VersionStore();
export default versionStore;