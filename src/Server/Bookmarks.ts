
import Django from './Django'

//
// Search type constants
//
export const SearchTypes = {
 SEARCH_NONE : 0,
 SEARCH_TAGS : 1,
 SEARCH_TEXT : 2,
 SEARCH_BOTH : 3
};

interface tagsEntry {
  name : string
}

interface addEntry {
    id      : string;
    title   : string;
    desc    : string;
    url     : string;
    tags    : tagsEntry[];
    public  : boolean;
}

interface tagInfo {
    id: number;
    name: string;
}

interface taglistResults {
    results: tagInfo[];
    next: string;
}

export default class Bookmarks
{
    djangoSite_    : Django;
    bookmarksUrl_  : string;

    constructor( djangoSite: Django ) {
        this.djangoSite_ = djangoSite;

        console.log( "Bookmarks app at : " + this.djangoSite_.getDomain() );
        this.bookmarksUrl_ = this.djangoSite_.getDomain() + "/v1/bookmarks/";
    };

    /**
     * Most basic bookmark list query.
     * 
     * @param {*} pageSize
     */
    async getBookmarks( pageSize: number )
    {
        let respObj = null;
        try {
            let fullUrl = this.bookmarksUrl_ + '?page_size=' + pageSize.toString() ; //+ "&page_num=" + page.toString() ;
            console.log( "getBookmarks with URL: " + fullUrl );
            const response = await this.djangoSite_.get( fullUrl );
            respObj = JSON.parse(response)
            console.log( "getBookmarks : bookmarks count = ", respObj['results'] );
        }
        catch( err ) {
            console.log( "getBookmarks Failed!!", err );
            //url = null;
        }
        return respObj;
    }

    async getBookmarksUrl( fullUrl: string )
    {
        let respObj = null;
        try {
            console.log( "getBookmarksUrl with URL: " + this.djangoSite_.getDomain() + fullUrl );
            const response = await this.djangoSite_.get( this.djangoSite_.getDomain() + fullUrl );
            respObj = JSON.parse(response)
            console.log( "getBookmarksUrl : bookmarks count = ", respObj['results'] );
        }
        catch( err ) {
            console.log( "getBookmarksUrl Failed!!", err );
        }
        return respObj;
    }

    async delete( id: string )
    {
        let respObj = null;
        let url = this.bookmarksUrl_ + id;
        try {
            const response = await this.djangoSite_.delete( url );
            console.log("delete : ", response )
        }
        catch( err ) {
            console.log( "deleteBookmarks Failed!!", err );
        }
        return respObj;
    }

    async search( searchTerm:string, searchType:number, pageSize:string )
    {
        let respObj = null;
        let url = this.bookmarksUrl_;
        if( searchType === SearchTypes.SEARCH_BOTH || searchType === SearchTypes.SEARCH_TAGS ) 
            url += "tags/" + searchTerm + "/";
        url += "?page_size=" + pageSize;
        try {
            console.log( "tag-search url:" + url )
            const response = await this.djangoSite_.get( url );
            respObj = JSON.parse(response)
            console.log( "searchBookmarks : tags count = ", respObj['count'] );

            if( respObj["count"] === "0" && searchType !== SearchTypes.SEARCH_NONE ) {
                // Not used as a tag, try to do regular search
                url = this.bookmarksUrl_ + "search/" + searchTerm + "/";
                url += "?page_size=" + pageSize;
                const resp2 = await this.djangoSite_.get( url );
                respObj = JSON.parse( resp2 )
            }
        }
        catch( err ) {
            console.log( "search() Failed!!", err );
        }
        return respObj;
    }

    async add( entry: addEntry ) {
        let addUrl = '',  respObj;
        let usePost = true;

        if( entry['id'] !== "-1" ) {
            usePost = false;
            addUrl = this.bookmarksUrl_ + entry['id']; // Modifying this one really
        }
        else
            addUrl = this.bookmarksUrl_

        try {
            let sendObject = JSON.stringify({title: entry.title, 
                description: entry.desc, 
                url: entry.url, 
                tags: entry.tags,
                public: entry.public });

            const response = await this.djangoSite_.post( addUrl, sendObject, usePost );
            respObj = JSON.parse(response)
            //console.log( "addBookmark2 : tags count = ", respObj['count'] );

        }
        catch( err ) {
            console.log( "addBookmark Failed!!", err );
        }
        return respObj
    }

    /**
     * Retrieve existing bookmark info.
     * 
     * @param {*} bmID ID of the bookmark.
     */
    async get( bmID : string )
    {
        let url = this.bookmarksUrl_ + bmID 
        let respObj;

        try {
            const response = await this.djangoSite_.get( url );
            respObj = JSON.parse(response)   
        }
        catch( err ) {
            console.log( "Failed!!", err );
        }
        return respObj;
    }

    async urlCheck( urlToCheck : string )
    {
        let url = this.bookmarksUrl_ + "?url=" + urlToCheck;
        let respObj = null;

        try {
            // First check if it is already in the database. 
            const response = await this.djangoSite_.get( url );
            respObj = JSON.parse( response )
            if( respObj.count === 0 ) {
                // If didn't find it in database, use pageinfo service to query the page itself for details.
                respObj = null;
            }
        }
        catch( err ) {
            console.log( "Failed!!", err );
        }
        return respObj;
    }

    /**
     * Async function that obtains the list of tags. Always returns a Promise object !!
     * The actual tags can be processed in the caller's '.then()' handler function.
     * 
     * @param {*} apiDomain the base path where the bookmarks app is accessible, without the actual
     * url. Like /bookmarks/ .
     */
    async getTags()
    {
        let url = this.bookmarksUrl_ + "tags/?page_size=200"
        let tags : string[] = [];

        while( url != null )
        {
            try {
                const response = await this.djangoSite_.get( url );

                let respObj : taglistResults;
                respObj = JSON.parse(response)

                // If exists, this is the url for the next 'page' of results
                //url = respObj['next']

                // Put tag names into 'tags' which holds the full list
                //respObj.results.forEach( element => {
                //    tags.push( element.name )
                //}); 
                for( let tag of respObj.results ) {
                    tags.push( tag.name )
                }
            }
            catch( err ) {
                console.log( "Failed!!", err );
            }
        }
        //console.log( "There are " , tags.length , " tags." )
        return tags
    }    
}

