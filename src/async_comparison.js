// Async Library Comparison
// ------------------------
//
// I wanna compare 
// Setup
// -----

// Those are our two tasks to use with jQuery deferred's
function getPost(id) {
  // Retrieve a post when given an id
  return $.getJSON('/posts/'+ id).then(function(data, status, xhr) {
      return data;
  });
}

function getUser(id) {
  // Retrieve the user data when given an id
  return $.getJSON('/users/'+ id).then(function(data, status, xhr) {
      return data;
  });
}

// Those are our two tasks to use with taskgroup
function getPost(id, complete) {
  $.getJSON('/posts/' + id).then(function(data, status, xhr) {
    return complete(null, data);
  });
}

function getUser(id, complete) {
  $.getJSON('/users/'+ id).then(function(data, status, xhr) {
      return complete(null, data);
  });
}

// Series
// ------

// Retrieve sequentialy first a post, and then the author for this post.
function authorForPost(id) {
  var postPromise = getPost(id),
      deferred = $.Deferred();

  postPromise.then(function (post) {
    authorPromise = getUser(post.authorId);

    authorPromise.then(function (author) {
      deferred.resolve(author);
    });
  });

  return deferred.promise();
}

// TaskGroup
function authorForPost(id) {
  return new TaskGroup({
    tasks: [
      getPost,
      getUser
    ]
  }).run(id);
}

// Parallel
// --------

// deferred's
function getTwoUsers(idA, idB) {
    var userPromiseA = getUser(idA),
        userPromiseB = getUser(idB);

    return $.when(userPromiseA, userPromiseB);
}

// TaskGroup
function getTwoUsers(idA, idB) {
  var tasks = new TaskGroup({concurrency: 0});

  tasks.addTask(function (idA, complete) {
    getUser(idA, complete);
  });
}
// Combining sequential and parallel operations
// --------------------------------------------
