
export default class Util
{

  getCookie( cname :string ) :string
  {
    let cookieValue = "";
    if (document.cookie && document.cookie !== '') {
        let cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, cname.length + 1) === (cname + '=')) {
                cookieValue = decodeURIComponent(cookie.substring( cname.length + 1));
                break;
            }
        }
    }
    return cookieValue;
  }

  setCookie(cname:string, cvalue:string, exdays:number )
  {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    console.log("setCookie : new value : " + document.cookie );
  }

  deleteCookie(cname: string ) 
  {
    document.cookie = cname + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }
}