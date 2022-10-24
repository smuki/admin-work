import {provideStore as provideLoginUserStore} from './useProvideStore';


export default function provideStore(app){
    provideLoginUserStore(app);
}