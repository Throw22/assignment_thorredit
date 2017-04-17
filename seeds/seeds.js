var faker = require('faker');
var voca = require('voca');

const MULTIPLIER = 1;

function randomRating() {
  return Math.floor(Math.random() * 6);
}

function randomCommentableName(type) {
  type = voca.titleCase(type);
  var randomWord = faker.random.word();
  randomWord = voca.titleCase(randomWord);
  var names = [
    `${randomWord} is awesome`,
    `${type} ${randomWord}`,
    `${randomWord} ${type}`
  ];
  var index = Math.floor(Math.random() * names.length);
  return names[index];
}

module.exports = () => {
  // ----------------------------------------
  // Create Users
  // ----------------------------------------
  console.log('Creating Users');
  var users = [];
  for (let i = 0; i < MULTIPLIER * 2; i++) {
    var user = new User({
      fname: 'Foo',
      lname: 'Bar',
      username: `foobar${i}`,
      email: `foobar${i}@gmail.com`
    });
    users.push(user);
  }

  // ----------------------------------------
  // Posts
  // ----------------------------------------
  console.log('Creating Posts');
  var posts = [];
  for (let i = 0; i < MULTIPLIER * 100; i++) {
    var post = new Post({
      title: randomCommentableName('post'),
      body: randomCommentableName('body'),
      author: users[0],
      score: Math.floor(Math.random() * 100)
    });
    posts.push(post);
  }

  // ----------------------------------------
  // Comments
  // ----------------------------------------

  console.log('Creating Comments for Posts');
  var comments = [];
  for (let i = 0; i < MULTIPLIER * 100; i++) {
    var post = posts[i % posts.length];
    var user = users[1];
    var comment = new Comment({
      body: randomCommentableName('body'),
      author: users[1],
      score: Math.floor(Math.random() * 100)      
    });
    comments.push(comment);
    post.comments.push(comment);
  }

  // ----------------------------------------
  // Ratings
  // ----------------------------------------
  // console.log('Creating Ratings');
  // var ratings = [];
  // for (let i = 0; i < MULTIPLIER * 1000; i++) {
  //   var hotel = hotels[i % hotels.length];
  //   var motel = motels[i % motels.length];
  //   var user = users[1];
  //   var hotelRating = new Rating({
  //     ratable: hotel,
  //     user: user,
  //     value: randomRating()
  //   });
  //   var motelRating = new Rating({
  //     ratable: motel,
  //     user: user,
  //     value: randomRating()
  //   });
  //   hotel.ratings.push(hotelRating);
  //   motel.ratings.push(motelRating);
  //   ratings.push(hotelRating);
  //   ratings.push(motelRating);
  // }

  // ----------------------------------------
  // Finish
  // ----------------------------------------
  console.log('Saving...');
  var promises = [];
  [users, posts, comments].forEach(collection => {
    collection.forEach(model => {
      promises.push(model.save());
    });
  });
  return Promise.all(promises);
};
