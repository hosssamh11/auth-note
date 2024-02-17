// set cookie
function setcookie(name,value,day){
     const date = new Date();
  date.setTime(date.getTime() + day * 24 * 60 * 60 * 1000);

  const expires = "expires=" + date.toUTCString();

  document.cookie = `${name}=${value}; ${expires}; path=/`;
}
// get cookie
function getcookie(name){
    const arr=decodeURIComponent(document.cookie)
    const decArr=arr.split("; ")
    let result = null
    decArr.forEach((cookie)=>{
    if (cookie.indexOf(name) === 0) {
      result = cookie.substring(name.length + 1);
    }
    })
    return result
}
// delete cookie
function deteleCookie(name){
    setcookie(name,null,null)
}
// login
function login(){
    const username = document.getElementById("username").value
    const password=document.getElementById("password").value
    if (username === "admin" && password === "123") {
        setcookie("loginadmin", username, 3);
        window.location.href = "index.html";
    }else alert("please enter a valid username or password");
}
// logout
function logout(){
    deteleCookie("loginadmin")
    window.location.href = "login.html";
}
// check login

