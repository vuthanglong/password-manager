const keyword = document.getElementById("keyword");
const ans1 = document.getElementById("question1");
const ans2 = document.getElementById("question2");
const form = document.getElementById("form");
const errorElement = document.getElementById("error");
const cfBtn = document.getElementById("myBtn");
const test = document.getElementById("test");
var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];
var targets = document.querySelectorAll(".target");

function ascii(a) {
  return a.charCodeAt(0);
}

function squeeze(arr) {
  var i = 0;
  while (arr.length < 8) {
    arr.push(
      arr[i] % 2 === 0
        ? arr[i] + (arr[i] % (16 - i))
        : arr[i] - (arr[i] % (16 + i))
    );
    i++;
  }
  while (arr.length > 8) {
    var len = arr.length;
    arr[len - 2] = (arr[len - 1] + arr[len - 2]) / 2;
    arr.pop();
  }
  return arr;
}

function generatePassword(args) {
  var keys = squeeze(keyword.value.split("").map(ascii));
  var target = squeeze(args.split("").map(ascii));
  var key1 = ascii(ans1.value);
  var key2 = ascii(ans2.value);
  var charSet = [
    "abcdefghijklmnopqrstuvwxyz",
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    "0123456789",
    "!@#$%^&*()_+~`|}{[]:;?><,./-=",
  ];
  var password = "";
  for (var i = 0; i < 4; i++) {
    password += charSet[0].charAt(
      (keys[(key2 + i) % 8] * Math.pow(key1, i + 1) * target[(key2 + i) % 8]) %
        26
    );
    password += charSet[1].charAt(
      (keys[(key2 * 2 + i) % 8] *
        Math.pow(key1, i + 2) *
        target[(key2 + i) % 8]) %
        26
    );
    password += charSet[2].charAt(
      (keys[(key2 * 3 + i) % 8] *
        Math.pow(key1, i + 3) *
        target[(key2 + i) % 8]) %
        charSet[2].length
    );
    password += charSet[3].charAt(
      (keys[(key2 * 4 + i) % 8] *
        Math.pow(key1, i + 4) *
        target[(key2 + i) % 8]) %
        charSet[3].length
    );
  }
  var j = -1;
  password = password
    .split("")
    .sort(function () {
      j++;
      if (j < 8) return -(target[j] % 2);
      return -(keys[j] % 2);
    })
    .join("");
  return password;
}

btn.onclick = function () {
  console.log(targets);
  for (i = 0; i < targets.length; i++) {
    console.log(targets[i].innerText);
  }
  if (keyword.value === "" || keyword.value == null) {
    console.log("Keyword is required");
  } else {
    modal.style.display = "block";
    test.innerText = "";
    for (i = 0; i < targets.length; i++) {
      test.innerText +=
        targets[i].textContent +
        ": " +
        generatePassword(targets[i].textContent) +
        "\n";
    }
  }
};

span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

form.addEventListener("submit", (e) => {
  let messages = [];
  if (keyword.value === "" || keyword.value == null) {
    messages.push("Keyword is required");
  }
  if (messages.length > 0) {
    errorElement.innerText = messages.join(", ");
  }
  console.log(keyword.value);
  e.preventDefault();
});
