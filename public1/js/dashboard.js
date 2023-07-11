let ui=new firebaseui.auth.AuthUI(auth);
let login=document.querySelector('.login');
const blogSection=document.querySelector('.blogs-section');
auth.onAuthStateChanged((user)=>{
    if(user){
        getUserWrittenBlogs(); 
        login.style.display="none"; 
         
    }else{
        setupLoginButton();
    }
})


const setupLoginButton=()=>{
    ui.start("#loginUI",{
        callbacks:{
            signInSuccessWithAuthResult:function(authResult,redirectURL){
                login.style.display="none";
                return false;
            }

        },
        signInFlow:"popup",
        signInOptions:[firebase.auth.GoogleAuthProvider.PROVIDER_ID]
    })
}
const createBlog=(blog)=>{
    let data = blog.data();
    blogSection.innerHTML += `
    <div class="blog-card">
        <img src="${data.bannerImage}" class="blog-image" alt="">
        <h1 class="blog-title">${data.title.substring(0, 100) + '...'}</h1>
        <p class="blog-overview">${data.article.substring(0, 200) + '...'}</p>
        <a href="/${blog.id}" class="btn dark">read</a>
        <a href="/${blog.id}/editor" class="btn grey">edit</a>
        <a href="#" onclick="deleteBlog('${blog.id}')" class="btn danger">delete</a>
    </div>
    `;
}
const deleteBlog=(id)=>{
    db.collection("Blogish").doc(id).delete().then(()=>{
        location.reload();

    })
    .catch((error)=>{
        console.log("Error deleting");
    })
}
const getUserWrittenBlogs=()=>{
    if (auth.currentUser) {
        db.collection("Blogish")
            .where("Author", "==", auth.currentUser.email.split("@")[0])
            .get()
            .then((Blogish)=>{
                Blogish.forEach((blog)=>{
                    createBlog(blog);
                })
        
            })

            .catch((error) => {
                console.error("Error getting user-written blogs:", error);
            });
        }   else {
                console.error("User is not authenticated");
            }
}




  

