
let div_list;
let div_profile;
let a;
let image_a;
let div_content;
let p;
let a_1;
let b;
let span_0;
let span_1;
let div_follow;
let button;

const notification_list = [
{
name: "Elon Musk",
image: {
      src: "../../assets/img/user/elon musk.jpg",
      alt: "profile_image",
},
content: "started following you.",
time: "2h",
},
{
name: "Elon Musk",
image: {
      src: "../../assets/img/user/elon musk.jpg",
      alt: "profile_image",
},
content: "Liked your post.",
time: "3h",
},
{
name: "Freshworks Inc",
image: {
      src: "../../assets/img/user/freshworks.jpg",
      alt: "profile_image",
},
content: "started following you.",
time: "2h",
},
{
name: "Girish Mathrubootham",
image: {
      src: "../../assets/img/user/girish sir.jpg",
      alt: "profile_image",
},
content: "started following you.",
time: "2h",
},
{
name: "Girish Mathrubootham",
image: {
      src: "../../assets/img/user/girish sir.jpg",
      alt: "profile_image",
},
content: "Liked your post.",
time: "2h",
},
{
name: "HVinoth",
image: {
      src: "../../assets/img/user/hvinoth.jpg",
      alt: "profile_image",
},
content: "started following you.",
time: "2h",
},
{
name: "Silambarasan TR",
image: {
      src: "../../assets/img/user/str.jpg",
      alt: "profile_image",
},
content: "started following you.",
time: "2h",
},
{
name: "HVinoth",
image: {
      src: "../../assets/img/user/hvinoth.jpg",
      alt: "profile_image",
},
content: "Liked your post.",
time: "2h",
},
{
name: "Silambarasan TR",
image: {
      src: "../../assets/img/user/str.jpg",
      alt: "profile_image",
},
content: "Liked your post.",
time: "2h",
},
];

for (let i = 0; i < 9; i++) {
  //  <div class="list"> </div>
div_list = document.createElement("div");
div_list.setAttribute("class", "list");
console.log(div_list);

//  <div class="profile"> </div>
div_profile = document.createElement("div");
div_profile.setAttribute("class", "profile");
div_list.append(div_profile);

//<a href="./details.html"></a>
a = document.createElement("a");
a.setAttribute("href", "../profile page/user profile/elon musk.html");
div_profile.append(a);

//  <img src="../../assets/img/user/elon musk.jpg" alt=""/>
img_a = document.createElement("img");
img_a.setAttribute("src", notification_list[i].image.src);
img_a.setAttribute("alt", notification_list[i].image.alt);
img_a.setAttribute("width", "50px");
img_a.setAttribute("height", "50px");
a.append(img_a);

//  <div class="list"> </div>
div_content = document.createElement("div");
div_content.setAttribute("class", "content");
div_list.append(div_content);

//  <p> </p>
p = document.createElement("p");
div_content.append(p);

//<a href="./details.html"></a>
a_1 = document.createElement("a");
a_1.setAttribute("href", "../profile page/user profile/elon musk.html");
p.append(a_1);

//  <b> </b>
b = document.createElement("b");
b.innerText = notification_list[i].name;
a_1.append(b);

//  <span>1 </span>
span_0 = document.createElement("span");
span_0.innerText = notification_list[i].content;
p.append(span_0);

//  <span> </span>
span_1 = document.createElement("span");
span_1.innerText = notification_list[i].time;
span_1.setAttribute("class", "time");
p.append(span_1);

//  <div class="follow"> </div>
div_follow = document.createElement("div");
div_follow.setAttribute("class", "follow");
div_list.append(div_follow);

//  <button> </button>
button = document.createElement("button");
button.innerText = "follow back";
div_follow.append(button);

document.querySelector(".notification_list").append(div_list);
}