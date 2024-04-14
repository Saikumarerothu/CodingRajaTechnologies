const blogTitleField = document.querySelector('.title');
const articleField = document.querySelector('.article');
const bannerImage = document.querySelector('#banner-upload');
const banner = document.querySelector('.banner');
let bannerpath;
const publishBtn = document.querySelector('.publish-Btn');
const uploadInput = document.querySelector('#image-upload');
const months = ["Jan", "Feb", "Mar", "Apr", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const uploadImage = (uploadFile, uploadType) => {
    const [file] = uploadFile.files;
    if (file && file.type.includes("image")) {
        const formdata = new FormData();
        formdata.append('image', file);
        fetch('/upload', {
            method: 'post',
            body: formdata
        }).then(res => res.text())
        .then(data => {
            if (uploadType == "image") {
                addImage(data, file.name);
            } else {
                bannerpath = `${location.origin}/${data}`;
                banner.style.backgroundImage = `url("${bannerpath}")`;
            }
        })
    } else {
        alert("Upload image only");
    }
}

bannerImage.addEventListener('change', () => {
    uploadImage(bannerImage, "banner");
});

uploadInput.addEventListener('change', () => {
    uploadImage(uploadInput, "image");
});

const addImage = (imagepath, alt) => {
    let curPos = articleField.selectionStart;
    let textToInsert = `\rUploaded![${alt}](${imagepath})\r`;
    articleField.value = articleField.value.slice(0, curPos) + textToInsert + articleField.value.slice(curPos);
};

publishBtn.addEventListener('click', () => {
    if (articleField.value.length && blogTitleField.value.length) {
        let docName;
        if(blogId[0]=='editor')
        {
            let letters = 'abcdefghijklmnopqrstuvwxyz';
            let blogTitle = blogTitleField.value.split(" ").join("-");
            let id = '';
            for (let i = 0; i < 4; i++) {
                id += letters[Math.floor(Math.random() * letters.length)];
            }
            let docName = `${blogTitle}-${id}`;
        }else{
            docName=decodeURI(blogId[0]);
        }
        
        let currentDate = new Date();
        let publishedDate = `${currentDate.getDate()} ${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
        db.collection("blogs").doc(docName).set({
            title: blogTitleField.value,
            article: articleField.value,
            bannerImage: bannerpath,
            publishedAt: publishedDate,
            author: auth.currentUser.email.split("@")[0]
        }).then(() => {
            location.href = `${docName}`;
        }).catch((err) => {
            console.error(err);
        });
    }
});

auth.onAuthStateChanged((user)=>{
    if(!user){
        location.replace("/admin");
    }
})
let blogId =location.pathname.split("/");
blogId.shift();
if(blogId[0]!="editor"){
    let docRef =db.collection("blogs").doc(decodeURI(blogId[0]));
    docRef.get().then((doc)=>
    {
        if(doc.exists){
            let data=doc.data();
            bannerpath=data.bannerImage;
            banner.style.backgroundImage=`url(${bannerpath})`;
            blogTitleField.value=data.title;
            articleField.value=data.article;
        }
        else{
            location.replace("/");
        }
    })
}
