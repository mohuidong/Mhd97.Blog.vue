import axios from 'axios'
import store from '../store/index'
import md5 from 'js-md5'
import router from "../router";

// 线上接口
const baseURL =  'http://api.mhd97.top/'
// axios.defaults.baseURL = 'http://api.mhd97.top/'

// const baseURL =  'http://192.168.1.177:8822'
// 代理：
// axios.defaults.baseURL = '/api'



// 添加响应拦截器（想改变回复再接收，就拦截response）
// axios.interceptors.response.use(function (response) {
//     // return Promise.resolve(response);
//     return response
// }, function (error) {
//     switch (error.request.status) {
//         case 401:
//             localStorage.removeItem('access_token');
//             this.$router.push('/login');
//             return Promise.reject(error)
//         default:
//             // console.dir(Promise.reject(error));
//             return Promise.reject(error);
//     }
// });

axios.interceptors.response.use(
    response => {

        return response;
    },
    error => {

        if (error.response) {
            console.log(error.response.data.status);
            switch (error.response.data.status) {
                case 401:
                    localStorage.removeItem('access_token');
                    router.replace({
                        path: '/login',
                        query: {redirect: router.currentRoute.fullPath}//登录成功后跳入浏览的当前页面
                    })
            }
        }
        return Promise.reject(error.response.data)
    });
export default {
    appid:'2080523',
    secret:'$2a$08$asgMIcvR1UAcSD0Jrv824e3Qk0D4sx16pJHQKkhZ8RcZLqJhGeb1i',
    ksort:function(inputArr, sort_flags){

        var tmp_arr = {},
            keys = [],
            sorter, i, k, that = this,
            strictForIn = false,
            populateArr = {};

        switch (sort_flags) {
            case 'SORT_STRING':
                // compare items as strings
                sorter = function (a, b) {
                    return that.strnatcmp(a, b);
                };
                break;
            case 'SORT_LOCALE_STRING':
                // compare items as strings, original by the current locale (set with  i18n_loc_set_default() as of PHP6)
                var loc = this.i18n_loc_get_default();
                sorter = this.php_js.i18nLocales[loc].sorting;
                break;
            case 'SORT_NUMERIC':
                // compare items numerically
                sorter = function (a, b) {
                    return ((a + 0) - (b + 0));
                };
                break;
            // case 'SORT_REGULAR': // compare items normally (don't change types)
            default:
                sorter = function (a, b) {
                    var aFloat = parseFloat(a),
                        bFloat = parseFloat(b),
                        aNumeric = aFloat + '' === a,
                        bNumeric = bFloat + '' === b;
                    if (aNumeric && bNumeric) {
                        return aFloat > bFloat ? 1 : aFloat < bFloat ? -1 : 0;
                    } else if (aNumeric && !bNumeric) {
                        return 1;
                    } else if (!aNumeric && bNumeric) {
                        return -1;
                    }
                    return a > b ? 1 : a < b ? -1 : 0;
                };
                break;
        }

        // Make a list of key names
        for (k in inputArr) {
            if (inputArr.hasOwnProperty(k)) {
                keys.push(k);
            }
        }
        keys.sort(sorter);

        // BEGIN REDUNDANT
        this.php_js = this.php_js || {};
        this.php_js.ini = this.php_js.ini || {};
        // END REDUNDANT
        strictForIn = this.php_js.ini['phpjs.strictForIn'] && this.php_js.ini['phpjs.strictForIn'].local_value && this.php_js
            .ini['phpjs.strictForIn'].local_value !== 'off';
        populateArr = strictForIn ? inputArr : populateArr;

        // Rebuild array with sorted key names
        for (i = 0; i < keys.length; i++) {
            k = keys[i];
            tmp_arr[k] = inputArr[k];
            if (strictForIn) {
                delete inputArr[k];
            }
        }
        for (i in tmp_arr) {
            if (tmp_arr.hasOwnProperty(i)) {
                populateArr[i] = tmp_arr[i];
            }
        }

        return strictForIn || populateArr;
    },

    handleUrl:function(url){
        let urlHash = {}
        let urlArray = url.split('?')
        if(urlArray.length > 1){
            urlArray[1].split('&').map((value)=>{
                let queryParameter =  value.split('=')
                if(queryParameter.length > 1 && queryParameter[0] !== 'sign' && queryParameter[0] !== 'access-token'){
                    urlHash[queryParameter[0]] =  queryParameter[1]
                }
                return true
            })
        }
        urlHash['appid'] = this.appid
        urlHash['timestamp'] = (Math.round(new Date() / 1000) + '' )

        // let token = store.state
        // if( token !== undefined ){
        //     urlHash['access-token'] = token
        // }
        let token = localStorage.getItem('access_token');
        if( token !== undefined ){
            urlHash['access-token'] = token
        }

        urlHash = this.ksort(urlHash)
        let resultQurry = ''
        for(let key in urlHash){
            resultQurry += ( key + '=' + urlHash[key] + '&' )
        }
        // 将选项按顺序拼接好后，哈希后再大写的结果
        let willSign = (md5((resultQurry.slice(0,-1)) + this.secret)).toUpperCase()
        return ( urlArray[0]+ '?' + resultQurry + 'sign=' + willSign )
    },
    get:function(url,opt={}){
        if('params' in opt){
            let paramsArray = []
            for(let key in opt['params']){
                let value = opt['params'][key]
                if(!value && value !== 0){
                    continue
                }
                paramsArray.push( key + '=' + value )
            }
            if( url.split('?').length > 1 ){
                url = url + '&' + paramsArray.join('&')
            }else {
                url  = url + '?' + paramsArray.join('&')
            }
        }
        delete opt['params']
        return axios({
            ...opt,
            method:"GET",
            url:this.handleUrl(url),
            baseURL
        })
    },
    post:function(url,data,opt={}){
        if('params' in opt){
            let paramsArray = []
            for(let key in opt['params']){
                paramsArray.push( key + '=' + opt['params'][key])
            }
            if( url.split('?').length > 1 ){
                url = url + '&' + paramsArray.join('&')
            }else {
                url  = url + '?' + paramsArray.join('&')
            }
        }
        delete opt['params']
        return axios({
            ...opt,
            method:"POST",
            url:this.handleUrl(url),
            data:data,
            baseURL
        })
    },
    put:function(url,data,opt={}){
        if('params' in opt){
            let paramsArray = []
            for(let key in opt['params']){
                paramsArray.push( key + '=' + opt['params'][key])
            }
            if( url.split('?').length > 1 ){
                url = url + '&' + paramsArray.join('&')
            }else {
                url  = url + '?' + paramsArray.join('&')
            }
        }
        delete opt['params']
        return axios({
            ...opt,
            method:"PUT",
            url:this.handleUrl(url),
            data:data,
            baseURL
        })
    },
    delete:function(url,data,opt={}){
        if('params' in opt){
            let paramsArray = []
            for(let key in opt['params']){
                paramsArray.push( key + '=' + opt['params'][key])
            }
            if( url.split('?').length > 1 ){
                url = url + '&' + paramsArray.join('&')
            }else {
                url  = url + '?' + paramsArray.join('&')
            }
        }
        delete opt['params']
        return axios({
            ...opt,
            method:"DELETE",
            url:this.handleUrl(url),
            data:data,
            baseURL
        })
    },
    jsonp:function(options){
        return new Promise((resolve,reject)=>{
            Jsonp(options.url,{param:'callback'},(err,res)=>{
                if(res){
                    if( res.status && res.status === 'success'){
                        resolve(res)
                    }else {
                        reject(res.message)
                    }
                }else {
                    reject(err)
                }
            })

        })
    }
}