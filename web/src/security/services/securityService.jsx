import $cookie from '../../core/util/cookie'

export const securityService={
    setCurrentUserInfo:(value)=>{
        $cookie.putObject('userInfo',value);
    },
    getCurrentUserInfo:()=>{
        return $cookie.getObject('userInfo');
    }
};