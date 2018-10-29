/**
 * Created by liuyc14 on 2017/10/16.
 */
const devdomain = "https://api-dev.unifiedcloud.lenovo.com";
const productDomain = "https://api.unifiedcloud.lenovo.com";

enum ENV{
    dev = 'dev',
    production = 'production'
}

const getEnv = ():ENV =>{
    const href = location.href;
    let env = ENV.production;
    if(href.indexOf('5000') >= 0){
        env = ENV.dev;
    }
    else {
        env = ENV.production;
    }
    return env;
};

let env = getEnv();

export default {
    env: env,
    domain: {
        dev: devdomain,
        production: productDomain
    },
    getEnv: getEnv
};