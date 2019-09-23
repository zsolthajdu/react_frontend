
import Django from './Django'


export class PageInfoApp
{
    djangoSite_ : Django;
    pageinfoUrl_ : string;

    constructor( djangoSite: Django ) {
        this.djangoSite_ = djangoSite;
        this.pageinfoUrl_ = djangoSite.getDomain() + "/pageinfo/";
    }

    /**
     * Try to use the 'pageinfo' django app to get some basic information about the typed url
     * https://github.com/zsolthajdu/django_pageinfo
     */
    async getPageInfo( urlToCheck : string )
    {
        let respObj;
        let sendObject = JSON.stringify({ url: urlToCheck } );

        try {
            const response = await this.djangoSite_.post( this.pageinfoUrl_, sendObject, true );
            respObj = JSON.parse(response)
            //console.log( "addBookmark2 : tags count = ", respObj['count'] );

        }
        catch( err ) {
            console.log( "getPageInfo Failed , err = ", err );
        }
        return respObj;
    }
}