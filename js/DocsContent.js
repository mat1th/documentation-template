docs.content = (function () {
  'use strict';

  var init = function () {

    //Start getting the content;
    listContent({
      filePath: 'content',
      files: ['inleiding.md',
        'test.md',
      ]
    });
  };

  var listContent = function (settings) {

    var newData = new docs.helper.getData();

    settings.files.forEach(function (file) {
      newData.get(settings.filePath + '/' + file, function (response) {
        var jsonml = markdown.parse(response);
        findHeadings(jsonml);
      });
    });
  };

  var findHeadings = function (jsonml) {
    var parsedHeadings = addRandomIdHeadings(jsonml);

    //render the html with the id's
    addContent(markdown.renderJsonML(markdown.toHTMLTree(parsedHeadings.jsonml)));

    //create the nav
    createNav(parsedHeadings.headings);
  };
  var addRandomIdHeadings = function (jsonml) {
    var headings = [];
    jsonml.forEach(function (element) {
      if (element !== 'markdown') { //get only the elements
        if (element[0] === 'header') { // get only the header elements
          if (element[1].level < 3) { //get only the h1 and h2 elements
            // gif headers a random id;
            element[1].id = docs.helper.randomString();
            headings.push(element);
          }
        }
      }
    });
    return {
      headings: headings,
      jsonml: jsonml
    };
  };
  var createNav = function (list) {
    var ul = docs.helper.select('.navigation-list');
    var li = document.createElement('li');
    var innerUl = document.createElement('ul');
    var listItem = [];
    innerUl.classList.add('child');

    list.forEach(function (item) {
      var innerLi = document.createElement('li');
      var link = document.createElement('a');

      if (item[1].level === 1) {

        createLink(link, item[2], item[1].id); // -> <a href="#id"> title </a>

        li.appendChild(link);
        listItem.push(li);

      } else if (item[1].level === 2) {

        createLink(link, item[2], item[1].id); // -> <a href="#id"> title </a>

        innerLi.appendChild(link);
        innerUl.appendChild(innerLi);
        listItem[0].appendChild(innerUl);
      }
    });
    //add the new navigation to the side bar;
    ul.appendChild(listItem[0]);

    //create the gumshoe;
    docs.nav.gumshoeStarter();
  };

  var createLink = function (link, text, id) {
    //set the innerHTML
    link.innerHTML = text;
    //set the id
    docs.helper.setAtribute(link, 'href', '#' + id);
  };

  var addContent = function (html) {
    var section = document.createElement('section');
    var main = docs.helper.select('main');

    section.innerHTML = html;
    main.appendChild(section);
  };

  return {
    init: init
  };

}());
