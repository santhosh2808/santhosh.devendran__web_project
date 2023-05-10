
const unic_user_id = JSON.parse(localStorage.getItem("user_id"));

if (unic_user_id === ""||unic_user_id=== null) {
  window.location.href = "../../index.html";
}


const unic_id = JSON.parse(localStorage.getItem("user_id"));
const user_records = JSON.parse(localStorage.getItem("user_list"));
let post_feedd = JSON.parse(localStorage.getItem("post_feedd")) || [];
const follow_data = JSON.parse(localStorage.getItem("follow_data")) || [];
let new_post = false;
const existingDiv = document.querySelector(".create_new_post");
const post_textarea = document.getElementById("post_content");
const content_count_limit = document.getElementById(
  "content_count_limit"
);
let for_row = 1;
let length_for_row = 0;
// find user
  const user_data = user_records.find(e=>e.user_name == unic_id);

// let for_row_dec;

// for enter butten input
let push_content = "";
post_textarea.addEventListener("keydown", function textarea(e) {
  if (e.keyCode === 13) {
    e.preventDefault();
    // eslint-disable-next-line no-multi-assign
    push_content = post_textarea.value += "\n";
  } else {
    push_content = post_textarea.value;
  }
});

post_textarea.addEventListener("input", function posttextarea() {
  const post_textareaa = document.getElementById("post_content").value;
  const content_count = post_textareaa.length;
  let for_style = 46;
  length_for_row = 38;

  // for limit value show

  content_count_limit.innerHTML = `${content_count}/200`;

  switch (true) {
    case length_for_row * for_row === content_count:
      for_row++;
      post_textarea.setAttribute("rows", for_row);
      for_style += 16 * (for_row - 1);

      content_count_limit.setAttribute(
        "style",
        ` top:${for_style}px; position: relative; font-size: 13px;`
      );

      break;
    case for_row > 2 && content_count === length_for_row * (for_row - 1):
      for_row--;
      post_textarea.setAttribute("rows", for_row);
      for_style += 15 * (for_row - 1);
      content_count_limit.setAttribute(
        "style",
        ` top:${for_style}px; position: relative; font-size: 13px;`
      );
      break;
  }
});

//  API for store image in cloud
// post image Upload API
const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dvb2bkrx9/upload";
const CLOUDINARY_UPLOAD_PRESET = "sk3iuzma";

const imgPreview = document.getElementById("imgBox2");
const fileUpload = document.getElementById("post_img_upload");
let post_img = "";

fileUpload.addEventListener("change", function (event) {
  const file = event.target.files[0];
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

  axios({
    url: CLOUDINARY_URL,
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: formData,
  })
    .then(function (res) {
      console.log(res);
      imgPreview.src = res.data.secure_url;
      // Store the URL in localStorage
      post_img = res.data.secure_url;
      console.log(post_img);
    })
    .catch(function (err) {
      console.error(err);
    });
});

// name for create post  ////////////////////////

const name = `${user_data.first_name} ${user_data.last_name}`;

// creating new post
// document.getElementById("post_content").value

function create_new_post() {

  // push_content = post_textarea.value;

  if (push_content.length === 0) {
    alert("fill anything in the post field");
  } else if (push_content.length === 1) {
    alert("fill anything in the post field");
  } else {
    const user_profile_img = "../assets/img/user/DS profile img.jpg";
    const user_profile_alt = "";
    const user_name = name;
    const post_content = push_content;
    const post_img_src = post_img;
    const like_value = 0;
    const like_count = 0;
    const comand_value = 0;
    const comand_count = 0;
    const post_id = uuidv4();

    post_feedd.push({
      post_id,
      unic_id,
      user_profile: {
        img: user_profile_img,
        alt: user_profile_alt,
      },
      user_name,
      post_content,
      post_img: {
        src: post_img_src,
        alt: "",
      },
      like: like_count,
      comand: comand_count,
      delete_bn: post_id,
    });

    post_img="";
    localStorage.setItem("post_feedd", JSON.stringify(post_feedd));
    new_post = true;
    post_feedd.splice(0, post_feedd.length - 1);
    post_feed_loop(post_feedd);
    post_feedd = JSON.parse(localStorage.getItem("post_feedd"));
  }
}

// for read post /////////////////////////////////////////////////////

post_feed_loop(post_feedd);

function post_feed_loop(post_feedd) {
  for (const element of post_feedd) {
    //  <div class="post"> </div>
    div_post = document.createElement("div");
    div_post.setAttribute("class", "post");

    //  <div class="user_list"> </div>
    div_user_list = document.createElement("div");
    div_user_list.setAttribute("class", "user_list");
    div_post.append(div_user_list);

    //  <div class="img"> </div>
    div_img = document.createElement("div");
    div_img.setAttribute("class", "img");
    div_user_list.append(div_img);

    //<a href="./details.html"></a>
    a_img = document.createElement("a");
    a_img.setAttribute(
      "href",
      "./profile page/user profile/elon musk.html"
    );
    div_img.append(a_img);

    //  <img user profile />
    img_a = document.createElement("img");
    const post_user_id=element.unic_id;
    const findElementUser=user_records.find(element=>element.user_name===post_user_id);
    console.log(findElementUser);
    console.log(element.unic_id);
    if(findElementUser.user_dp===""){
        img_a.setAttribute("src","https://res.cloudinary.com/dvb2bkrx9/image/upload/v1683662312/wyli3r0rjpxk5cnq2dze.jpg");
      }else{
        img_a.setAttribute("src",findElementUser.user_dp );
      }
    img_a.setAttribute("alt", "profile");
    img_a.setAttribute("class", "profile_img");
    a_img.append(img_a);

    //  <div class="user"> </div>
    div_user = document.createElement("div");
    div_user.setAttribute("class", "user");
    div_user_list.append(div_user);

    //<a href="./details.html"></a>
    a_user = document.createElement("a");
    `${a_user.setAttribute(
      "href",
      `../pages/profile page/profile.html?user_id=${element.unic_id}`
    )}user_unic_id=${element.unic_id}`;
    div_user.append(a_user);

    //  <p> user name</p>
    p_user_name = document.createElement("p");
    p_user_name.setAttribute("class", "user_name");
    p_user_name.innerText = element.user_name;
    a_user.append(p_user_name);

    //  <p> post cuntent</p>
    p_post_cuntent = document.createElement("p");
    p_post_cuntent.setAttribute("class", "post_cuntent");
    p_post_cuntent.innerText = element.post_content;
    div_user.append(p_post_cuntent);

    if (element.post_img.src) {
      //  <div class="post_img"> </div>
      post_post_img = document.createElement("div");
      post_post_img.setAttribute("class", "post_img");
      div_post.append(post_post_img);

      //  <img user post />
      img_post = document.createElement("img");
      img_post.setAttribute("src", element.post_img.src);
      img_post.setAttribute("alt", "post");
      post_post_img.append(img_post);
    }

    //  <div class="like_comand"> </div>
    div_like_comand = document.createElement("div");
    div_like_comand.setAttribute("class", "like_comand");
    div_post.append(div_like_comand);

    //  <div class="like"> </div>
    div_like = document.createElement("div");
    div_like.setAttribute("class", "like");
    div_like_comand.append(div_like);

    // <i for like
    i_like = document.createElement("i");
    i_like.setAttribute("id", element.post_id);
    i_like.innerText = element.like;
    const like_data = JSON.parse(localStorage.getItem("like_data")) || [];
    const like_icon = like_data.find(
      (e) => e.liked == element.post_id && e.who_liked == unic_id
    );
    if (like_icon == undefined) {
      i_like.setAttribute("class", "fa fa-heart-o");
      i_like.setAttribute("style", "font-size:16px;color: black;");
    } else {
      i_like.setAttribute("class", "fa fa-heart");
      i_like.setAttribute("style", "font-size:16px;color: red;");
    }

    div_like.append(i_like);

    i_like.addEventListener("click", function () {
      const liked = this.id;
      const who_liked = unic_id;

      const like_bn = document.getElementById(liked);
      const like_data =
        JSON.parse(localStorage.getItem("like_data")) || [];
      if (like_data.length === 0) {
        like_data.push({
          liked,
          who_liked,
          notification: false,
        });
        console.log(like_data);
        like_bn.setAttribute("class", "fa fa-heart");
        like_bn.setAttribute("style", "font-size:16px;color: red;");
        localStorage.setItem("like_data", JSON.stringify(like_data));
        // instend add like count
        const find_post = post_feedd.find((e) => e.post_id === liked);
        const new_count = find_post.like + 1;
        like_bn.innerText = new_count;
      } else {
        const user_l_data = like_data.find(
          (e) => e.liked === liked && e.who_liked === unic_id
        );
        const indexOfuser_f = like_data.indexOf(user_l_data);
        if (user_l_data === undefined) {
          like_data.push({
            liked,
            who_liked,
            notification: false,
          });
          like_bn.setAttribute("class", "fa fa-heart");
          like_bn.setAttribute("style", "font-size:16px;color: red;");
          localStorage.setItem("like_data", JSON.stringify(like_data));
          // instend add like count
          const find_post = post_feedd.find((e) => e.post_id === liked);
          const new_count = find_post.like + 1;
          like_bn.innerText = new_count;
        } else {
          like_data.splice(indexOfuser_f, 1);
          localStorage.setItem("like_data", JSON.stringify(like_data));
          like_bn.setAttribute("class", "fa fa-heart-o");
          like_bn.setAttribute("style", "font-size:16px;color: Black;");
          // instend add like count
          const find_post = post_feedd.find((e) => e.post_id === liked);
          if (find_post.like >= 1) {
            const new_count = find_post.like - 1;
            like_bn.innerText = new_count;
          }
        }
      }

      //  for like count set
      //  add comand count in post details

      const filterlike = like_data.filter((like) => like.liked == liked);

      const find_post = post_feedd.find((e) => e.post_id === liked);
      find_post.like = filterlike.length;

      localStorage.setItem("post_feedd", JSON.stringify(post_feedd));
    });

    //  a tag for  comment///////
    a_div_cmt = document.createElement("a");
    a_div_cmt.setAttribute(
      "href",
      `./post details/elon musk/comment - post1.html?post_id=${element.post_id}`
    );
    div_like_comand.append(a_div_cmt);

    //  <div class="comand"> </div>
    div_comand = document.createElement("div");
    div_comand.setAttribute("class", "comand");
    a_div_cmt.append(div_comand);

    // <i for comand
    i_comand = document.createElement("i");
    i_comand.setAttribute("class", "fa fa-comment-o");
    i_comand.innerText = element.comand;
    i_comand.setAttribute("style", "font-size:16px;color: black;");
    div_comand.append(i_comand);

    if (new_post) {
      existingDiv.insertAdjacentElement("afterend", div_post);
      new_post = false;
    } else {
      document.querySelector(".post_list").append(div_post);
    }
  }
}

// top user list /////////////////////

const top_user_2 = JSON.parse(localStorage.getItem("user_list"));
const top_user = top_user_2.filter((e) => e.user_name !== unic_id);


for (let j = 0; j < top_user.length; j++) {
  const user_name = `${top_user[j].first_name} ${top_user[j].last_name}`;

  //  <div class="top_user"> </div>
  div_top_user = document.createElement("div");
  div_top_user.setAttribute("class", "top_user");

  //  <div class="img"> </div>
  div_img = document.createElement("div");
  div_img.setAttribute("class", "img");
  div_top_user.append(div_img);

  //  <img profile_img />
  img_profile_img = document.createElement("img");
  if(top_user[j].user_dp===""){
    img_profile_img.setAttribute("src","https://res.cloudinary.com/dvb2bkrx9/image/upload/v1683662312/wyli3r0rjpxk5cnq2dze.jpg");
  }else{
    img_profile_img.setAttribute("src",top_user[j].user_dp );
  }
  
  img_profile_img.setAttribute("alt", "profile");
  img_profile_img.setAttribute("class", "profile_img");
  div_img.append(img_profile_img);

  //  <div class="user_list"> </div>
  div_user_list = document.createElement("div");
  div_user_list.setAttribute("class", "user_list");
  div_top_user.append(div_user_list);

  // <p tag for user name
  p_user_name = document.createElement("p");
  p_user_name.setAttribute("class", "user_name");
  p_user_name.innerText = user_name;
  div_user_list.append(p_user_name);

  //<span> tag for gray
  span_gray = document.createElement("span");
  span_gray.setAttribute("class", "gray");
  span_gray.innerText = top_user[j].user_name;
  div_user_list.append(span_gray);

  //div_follow_button /////

  div_follow_button = document.createElement("div");
  div_follow_button.setAttribute("class", "follow_button");
  div_top_user.append(div_follow_button);

  // button_follow

  button_follow = document.createElement("button");
  const user_f_data = follow_data.find(
    (e) => e.followee == unic_id && e.following == top_user[j].user_name
  );

  if (user_f_data == undefined) {
    button_follow.innerText = "follow";
  } else {
    button_follow.innerText = "Unfollow";
  }
  button_follow.setAttribute("id", top_user[j].user_name);
  div_follow_button.append(button_follow);

  button_follow.addEventListener("click", function () {
    const following = this.id;
    const followee = unic_id;

    const follow_bn = document.getElementById(following);
    const follow_data =
      JSON.parse(localStorage.getItem("follow_data")) || [];
    if (follow_data.length === 0) {
      follow_data.push({
        following,
        followee,
        notification: false,
      });
      console.log(follow_data);
      follow_bn.innerHTML = "Unfollow";
      localStorage.setItem("follow_data", JSON.stringify(follow_data));
    } else {
      const user_f_data = follow_data.find(
        (e) => e.followee == unic_id && e.following == following
      );
      const indexOfuser_f = follow_data.indexOf(user_f_data);
      if (user_f_data == undefined) {
        follow_data.push({
          following,
          followee,
          notification: false,
        });
        follow_bn.innerText = "Unfollow";
        localStorage.setItem("follow_data", JSON.stringify(follow_data));
      } else {
        follow_data.splice(indexOfuser_f, 1);
        localStorage.setItem("follow_data", JSON.stringify(follow_data));
        follow_bn.innerText = "follow";
      }
    }
  });

  document.querySelector(".right_bottom").append(div_top_user);
}

//  create post profile photo

let profile_img=document.getElementById("cr_po_profile");

if(user_data.user_dp===""){
    profile_img.src="../assets/img/933-9332131_profile-picture-default-png.png"
}
else{
    profile_img.src=user_data.user_dp;
}
