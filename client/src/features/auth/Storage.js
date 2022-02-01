var Storage = (function() {

    var getData = function() {
      var user = JSON.parse(localStorage.getItem('carrent-user'));
      return user
    };
    var getToken = function() {
      var tkn = localStorage.getItem('carrent-tkn');
      return tkn
    };
  
    var setData = function(user) {
      localStorage.setItem('carrent-user', JSON.stringify(user));
    };
    var setToken = function(tkn) {
      localStorage.setItem('carrent-tkn', tkn);
    };

    var logout = function() {
      localStorage.removeItem('carrent-user');
      localStorage.removeItem('carrent-tkn');
    };


    return {
      getData: getData,
      setData: setData,
      logout:logout,
      setToken:setToken,
      getToken:getToken,
    }
  
  })();
  
  export default Storage;