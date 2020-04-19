
import Util from './Util'

/**
 * Class that sends basic http requests to site hosting webapps.
 */
export default class Django
{
    domain_ : string;

    constructor()   
    {
        let colonPos = window.location.host.indexOf(":");
        let theHost = window.location.host;
        if( colonPos !== -1 )
            theHost = window.location.host.slice(0,colonPos );
    
        // Figure out REST api domain when object is constructed.
        // Gots to be https !!
        //this.domain_ = "https://" + theHost + ":8000";
        //this.domain_ = "http://192.168.234.95:8000";
        this.domain_ = "http://localhost";
    }

    getDomain() 
    {
        return this.domain_;
    }

    getAPIVersion()
    {
        return "v1";
    }

    async getUserToken( user: string, psw:string )
    {
        let tokenUrl = this.domain_ + "/v1/get-token/";
        let respObj = null;
    
        try {
            let sendObject = JSON.stringify({ username: user, password: psw } );
            console.log( "getUserToken : " + tokenUrl );
    
            let response: string;
            response = await this.post( tokenUrl, sendObject, true );
            respObj = JSON.parse(response)
            console.log( "getUserToken : Token = ", respObj['token'] );
        }
        catch( err ) {
            console.log( "getUserToken Failed!!", err );
        }
        return respObj
    }    


    //
    // GET request through Promise object
    // Can be called in a synchronous manner
    //
    // https://blog.bitsrc.io/keep-your-promises-in-typescript-using-async-await-7bdc57041308
    get( url:string ) : Promise<string>
    {
        return new Promise<string>( function(resolve,reject) {
            let xhr = new XMLHttpRequest();
            let util = new Util();

            xhr.open( 'GET', url );

            let csrftoken = util.getCookie('csrftoken');

            if( csrftoken != null )
                xhr.setRequestHeader("X-CSRFToken", csrftoken );

            let usertok = util.getCookie('usertoken');
            if(  usertok != null )
                xhr.setRequestHeader("Authorization", "Token "+ usertok );

            xhr.onload = function() {
                if( (xhr.status >= 200 && xhr.status < 300 ) || xhr.status===304 ) { // OK
                    resolve( xhr.response )
                }
                else 
                    reject( Error( xhr.statusText ) )
            };
            // Handle network errors
            xhr.onerror = function() {
                reject( Error('Network Error!' ) );
            };
            // Make the request
            xhr.send();
        } );
    }

    delete( url : string ) : Promise<string>
    {
        return new Promise<string>( function(resolve,reject) {
            let xhr = new XMLHttpRequest();
            let util = new Util();
            xhr.open( 'DELETE', url );

            let csrftoken = util.getCookie('csrftoken');
            if( csrftoken != null )
                xhr.setRequestHeader("X-CSRFToken", csrftoken);

            let usertok = util.getCookie('usertoken');
            if(  usertok != null )
                    xhr.setRequestHeader("Authorization", "Token "+ usertok );
        
            xhr.onload = function() {
                if( (xhr.status >= 200 && xhr.status < 300 ) || xhr.status===304 ) { // OK
                    resolve( xhr.response )
                }
                else {
                    reject( Error( xhr.statusText ) )
                }
            };
            // Handle network errors
            xhr.onerror = function() {
                reject( Error('Network Error!' ) );
            };
            // Make the request
            xhr.send();
        } );
    }


    /**
     * Same as the above but sends POST request
     * 
     * @param {*} url 
     * @param {*} csrftoken 
     * @param {*} content 
     * @param {*} usePost : boolean, true if POST request should be used, PUT for false
     */
    post( url : string, content: string, usePost:boolean ) : Promise<string>
    {
        return new Promise<string>( function(resolve,reject) {
            let xhr = new XMLHttpRequest();
            let util = new Util();

            if( usePost )
                xhr.open( 'POST', url );
            else 
                xhr.open( 'PUT', url );

            let csrftoken = util.getCookie('csrftoken');
            if( csrftoken !== null && csrftoken!=="" )
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            let usertok = util.getCookie('usertoken');
            if(  usertok !== null && usertok!=="" )
                xhr.setRequestHeader("Authorization", "Token "+ usertok );

            if( content !== null && content!=="")
                xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');

            xhr.onload = function() {
                if( (xhr.status >= 200 && xhr.status < 300 ) || xhr.status===304 ) { // OK
                    resolve( xhr.response )
                }
                else {
                    reject( Error( xhr.statusText ) )
                }
            };
            // Handle network errors
            xhr.onerror = function() {
                reject( Error('Network Error!' ) );
            };
            // Make the request
            xhr.send( content );
        } );
    }
}
