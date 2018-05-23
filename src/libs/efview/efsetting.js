import services from './services';

let Efsetting = {
    dict: {
        resources: services.dict,
        method: 'omd.dict.getbymultidictgroupcode',
        response: 'dict'
    },
    account: {
        resources: '/bh/account',
        method: '',
        response: 'account'
    }
};

export default Efsetting;
